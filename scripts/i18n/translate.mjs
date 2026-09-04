#!/usr/bin/env node
/**
 * Machine translation for next-intl message namespaces, with terminology locked
 * to the wording the site already uses.
 *
 *   node scripts/i18n/translate.mjs models
 *   node scripts/i18n/translate.mjs terms "tennis bracelet"
 *   node scripts/i18n/translate.mjs translate <namespace> [--locales nl,fr] [--force]
 *   node scripts/i18n/translate.mjs check [namespace]
 *   node scripts/i18n/translate.mjs merge <namespace> --after <existingKey>
 *
 * Design notes
 * ------------
 * Translation never asks the model to reproduce the JSON tree. The tree is
 * walked locally, translatable leaves are pulled into a flat {id: string} map,
 * only that map round-trips through the API, and the results are written back
 * to the exact same paths. Structure, key order, `type` discriminators and
 * hrefs therefore cannot drift no matter what the model returns.
 *
 * Output lands in scripts/i18n/staging/<locale>/<namespace>.json for review.
 * `merge` is a separate, deliberate step — nothing touches messages/*.json
 * until a human has looked at the staged files.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const MESSAGES = path.join(ROOT, "messages");
const STAGING = path.join(HERE, "staging");
const GLOSSARY_PATH = path.join(HERE, "glossary.json");

const SOURCE_LOCALE = "en";
const TARGET_LOCALES = ["nl", "fr", "de", "es", "it"];

const LOCALE_NAMES = {
    nl: "Dutch (Belgium/Netherlands business register)",
    fr: "French (France/Belgium business register)",
    de: "German (Germany/Austria business register)",
    es: "Spanish (Spain, European Spanish)",
    it: "Italian (Italy)",
};

/* Leaves under these keys are identifiers or URLs, never prose. Translating a
   `type` would break the ContentBlock union; translating an `href` would break
   every link on the page. */
const PROTECTED_KEYS = new Set([
    "type",
    "href",
    "src",
    "url",
    "slug",
    "id",
    "width",
    "height",
    "image",
    "namespace",
]);

/* Values that are plainly not prose, whatever key they sit under. */
const NON_PROSE = [
    /^https?:\/\//i,
    /^\/[\w\-/.]*$/, // internal path
    /^[\w.-]+@[\w.-]+$/, // email
    /^[\d\s:–\-.,/]+$/, // pure numerics/times/dates
];

const BATCH_CHARS = 6000;
const BATCH_ITEMS = 50;
const CONCURRENCY = 4;
const MAX_ATTEMPTS = 3;

// ---------------------------------------------------------------- utilities

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

/** messages/*.json are CRLF, 2-space, no trailing newline. */
const writeMessages = (locale, obj) =>
    fs.writeFileSync(
        path.join(MESSAGES, `${locale}.json`),
        JSON.stringify(obj, null, 2).replace(/\n/g, "\r\n"),
        "utf8"
    );

/** Minimal .env reader — the repo has no dotenv dependency. */
function loadEnv() {
    for (const name of [".env.local", ".env"]) {
        const file = path.join(ROOT, name);
        if (!fs.existsSync(file)) continue;
        for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
            const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
            if (!m) continue;
            const value = m[2].replace(/^["']|["']$/g, "");
            if (!process.env[m[1]]) process.env[m[1]] = value;
        }
    }
}

function requireKey() {
    loadEnv();
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
        console.error(
            "OPENAI_API_KEY is not set.\n" +
                "Add it to .env.local (already covered by .gitignore):\n" +
                "  OPENAI_API_KEY=sk-...\n" +
                "  OPENAI_MODEL=<model id>            # optional, see `translate.mjs models`"
        );
        process.exit(1);
    }
    return key;
}

const isProse = (key, value) =>
    typeof value === "string" &&
    value.trim() !== "" &&
    !PROTECTED_KEYS.has(key) &&
    !NON_PROSE.some((re) => re.test(value.trim()));

/**
 * Walk an object collecting every scalar leaf, tagged with whether it is
 * translatable prose. Callers filter; the dry run reports on both halves, so
 * both must come from this one walk with one path format.
 * Returns [{ path: (string|number)[], key, value, translatable }].
 */
function collectAll(node, trail = [], key = "", out = []) {
    if (Array.isArray(node)) {
        node.forEach((v, i) => collectAll(v, [...trail, i], key, out));
    } else if (node && typeof node === "object") {
        for (const [k, v] of Object.entries(node)) {
            collectAll(v, [...trail, k], k, out);
        }
    } else {
        out.push({ path: trail, key, value: node, translatable: isProse(key, node) });
    }
    return out;
}

const collectLeaves = (node) => collectAll(node).filter((l) => l.translatable);

/**
 * Resolve a dotted namespace like "BlogsPage.posts.93" to the object that holds
 * it. Top-level namespaces are just the one-segment case, so both commands can
 * treat nested message groups exactly like top-level ones.
 */
function resolveNamespace(root, dotted) {
    const parts = dotted.split(".");
    let parent = root;
    for (const step of parts.slice(0, -1)) {
        if (parent[step] === undefined) return { parent: null, key: null, value: undefined };
        parent = parent[step];
    }
    const key = parts[parts.length - 1];
    return { parent, key, value: parent?.[key] };
}

function setAtPath(root, trail, value) {
    let node = root;
    for (let i = 0; i < trail.length - 1; i++) node = node[trail[i]];
    node[trail[trail.length - 1]] = value;
}

/** Every leaf path in an object, for shape comparison. */
function keyPaths(value, prefix = "") {
    if (Array.isArray(value))
        return value.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`));
    if (value && typeof value === "object")
        return Object.entries(value).flatMap(([k, v]) =>
            keyPaths(v, prefix ? `${prefix}.${k}` : k)
        );
    return [prefix];
}

async function pool(items, limit, worker) {
    const results = new Array(items.length);
    let cursor = 0;
    const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (cursor < items.length) {
            const i = cursor++;
            results[i] = await worker(items[i], i);
        }
    });
    await Promise.all(runners);
    return results;
}

// -------------------------------------------------------------- openai calls

async function openai(pathname, body, { method = "POST" } = {}) {
    const key = requireKey();
    const base = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    const res = await fetch(`${base}${pathname}`, {
        method,
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`OpenAI ${res.status} ${res.statusText}: ${text.slice(0, 600)}`);
    }
    return res.json();
}

function model() {
    const m = process.env.OPENAI_MODEL;
    if (!m) {
        console.error(
            "OPENAI_MODEL is not set. Run `node scripts/i18n/translate.mjs models`\n" +
                "to list the model ids your account can actually reach, then add the exact\n" +
                "id to .env.local as OPENAI_MODEL=<id>."
        );
        process.exit(1);
    }
    return m;
}

// ------------------------------------------------------------------ prompting

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Whole-word containment. Substring matching would fire "cut" inside "execute"
 * and "carat" inside "caratage", producing bogus glossary rules and warnings.
 */
function hasTerm(text, term) {
    return new RegExp(`(^|[^\\p{L}])${escapeRe(term)}([^\\p{L}]|$)`, "iu").test(text);
}

/**
 * Same, but tolerating a regular English plural. Without this, "retailers" and
 * "suppliers" never match their singular glossary entries and the terminology
 * rules silently fail to apply to most real sentences.
 */
function hasSourceTerm(text, term) {
    return new RegExp(`(^|[^\\p{L}])${escapeRe(term)}s?([^\\p{L}]|$)`, "iu").test(text);
}

function glossaryFor(locale, glossary, sourceText) {
    // Only include terms that actually occur in this batch, so the prompt stays
    // focused instead of carrying 60 irrelevant rules.
    const rows = [];
    for (const entry of glossary.terms) {
        if (!hasSourceTerm(sourceText, entry.en)) continue;
        const target = entry[locale];
        if (!target) continue;
        const avoid = entry.avoid?.[locale];
        rows.push(
            `- "${entry.en}" -> "${target}"` +
                (avoid?.length ? ` (never: ${avoid.map((a) => `"${a}"`).join(", ")})` : "")
        );
    }
    return rows;
}

function systemPrompt(locale, glossaryRows, keepVerbatim) {
    return [
        `You are a professional translator localising website copy for Uniglo Diamonds,`,
        `an Antwerp diamond and fine-jewellery company, from English into ${LOCALE_NAMES[locale]}.`,
        ``,
        `You receive a JSON object mapping string ids to English strings. Return a JSON`,
        `object with EXACTLY the same ids, where each value is the translation.`,
        `Return nothing but that JSON object.`,
        ``,
        `Rules:`,
        `1. Translate every string. Never merge, split, reorder or drop ids.`,
        `2. Register: professional, factual B2B/retail marketing prose. Match the source`,
        `   tone; do not add enthusiasm, marketing filler, or new claims.`,
        `3. Keep markdown links intact: in "[label](target)" translate only the label`,
        `   text and reproduce "(target)" character for character.`,
        `4. Reproduce verbatim, untranslated: brand names (Uniglo Diamonds, Uniglo Jewels),`,
        `   laboratory names (GIA, IGI, HRD), proper nouns of venues and events, stand and`,
        `   product codes, postcodes, prices, measurements, times and dates in numeric form.`,
        `5. Do not translate text inside quotation marks that names a product or SKU.`,
        `6. Preserve the source's typographic characters (curly apostrophes, en dashes).`,
        `7. Never output placeholder text, notes, or explanations.`,
        glossaryRows.length
            ? `\nRequired terminology — use these renderings exactly, including inflected forms:\n${glossaryRows.join("\n")}`
            : ``,
        keepVerbatim.length
            ? `\nThese tokens appear in the source and must appear unchanged in your output:\n${keepVerbatim.map((t) => `- ${t}`).join("\n")}`
            : ``,
    ]
        .filter(Boolean)
        .join("\n");
}

/** Tokens that must survive translation untouched. */
function verbatimTokens(strings) {
    const found = new Set();
    const patterns = [
        /\b[A-Z]{2,5}\d{0,3}\b/g, // GIA, IGI, HRD, B41, SKU-ish
        /\b[A-Z]{1,2}\d{1,2}\s?\d?[A-Z]{2}\b/g, // UK postcodes
        /\b\d{2}:\d{2}\b/g, // times
    ];
    // Acronyms that legitimately localise (ID -> pièce d'identité, VAT -> TVA)
    // would otherwise flag on every locale, drowning the real signal.
    const STOPWORDS = new Set(["I", "A", "THE", "UK", "AI", "OK", "ID", "VAT", "B2B", "EU"]);
    for (const s of strings) {
        for (const re of patterns) {
            for (const m of s.match(re) || []) {
                if (!STOPWORDS.has(m)) found.add(m);
            }
        }
    }
    return [...found];
}

async function translateBatch(locale, batch, glossary) {
    const payload = Object.fromEntries(batch.map((l, i) => [String(i), l.value]));
    const joined = batch.map((l) => l.value).join("\n");
    const rows = glossaryFor(locale, glossary, joined);
    const keep = verbatimTokens(batch.map((l) => l.value));

    let lastError;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const res = await openai("/chat/completions", {
                model: model(),
                messages: [
                    { role: "system", content: systemPrompt(locale, rows, keep) },
                    { role: "user", content: JSON.stringify(payload) },
                ],
                response_format: { type: "json_object" },
            });

            const raw = res.choices?.[0]?.message?.content ?? "";
            const jsonText = raw.trim().startsWith("{")
                ? raw.trim()
                : raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
            const parsed = JSON.parse(jsonText);

            const missing = Object.keys(payload).filter(
                (k) => typeof parsed[k] !== "string" || !parsed[k].trim()
            );
            if (missing.length) {
                throw new Error(`model omitted ids: ${missing.slice(0, 8).join(", ")}`);
            }
            return batch.map((leaf, i) => ({ ...leaf, translated: parsed[String(i)] }));
        } catch (err) {
            lastError = err;
            if (attempt < MAX_ATTEMPTS) {
                await new Promise((r) => setTimeout(r, 800 * attempt));
            }
        }
    }
    throw new Error(`[${locale}] batch failed after ${MAX_ATTEMPTS} attempts: ${lastError.message}`);
}

// ------------------------------------------------------------------ validation

const linkTargets = (s) => [...s.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);

function validate(locale, leaves, source, translated, glossary) {
    const problems = [];

    const srcPaths = keyPaths(source).sort();
    const outPaths = keyPaths(translated).sort();
    if (JSON.stringify(srcPaths) !== JSON.stringify(outPaths)) {
        problems.push({ kind: "shape", detail: "translated tree shape differs from source" });
    }

    for (const leaf of leaves) {
        const where = leaf.path.join(".");
        const src = leaf.value;
        const out = leaf.translated;

        const a = linkTargets(src);
        const b = linkTargets(out);
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            problems.push({
                kind: "link",
                where,
                detail: `link targets changed: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`,
            });
        }

        for (const token of verbatimTokens([src])) {
            if (!out.includes(token)) {
                problems.push({ kind: "token", where, detail: `lost "${token}"` });
            }
        }

        if (out.trim() === src.trim() && src.split(/\s+/).length > 6) {
            problems.push({ kind: "untranslated", where, detail: src.slice(0, 70) });
        }

        // The shipped copy uses curly apostrophes; a straight one is a visible
        // inconsistency in rendered text.
        if (/\p{L}'\p{L}/u.test(out)) {
            problems.push({
                kind: "typography",
                where,
                detail: `straight apostrophe in ${out.match(/\p{L}*'\p{L}*/u)[0]}`,
            });
        }

        for (const entry of glossary.terms) {
            for (const bad of entry.avoid?.[locale] || []) {
                if (hasTerm(out, bad)) {
                    problems.push({
                        kind: "glossary",
                        where,
                        detail: `used "${bad}", expected "${entry[locale]}"`,
                    });
                }
            }
            // Advisory only: the stem test cannot model every inflection, so a
            // hit here means "read this one", not "this is wrong".
            const stem = entry[locale]?.toLowerCase().slice(0, 6);
            if (entry[locale] && hasSourceTerm(src, entry.en) && !out.toLowerCase().includes(stem)) {
                problems.push({
                    kind: "glossary-miss",
                    where,
                    detail: `source has "${entry.en}" but output lacks "${entry[locale]}"`,
                });
            }
        }
    }
    return problems;
}

// -------------------------------------------------------------------- commands

async function cmdModels() {
    requireKey();
    const res = await openai("/models", null, { method: "GET" });
    const ids = res.data.map((m) => m.id).sort();
    console.log(`${ids.length} models available to this key:\n`);
    for (const id of ids) console.log("  " + id);
    console.log(`\nSet the one you want in .env.local:  OPENAI_MODEL=<id>`);
}

/**
 * Show how an English term is currently rendered in each locale, by looking up
 * the same key paths in every message file. Used to author glossary entries
 * from what the site already says rather than from guesswork.
 */
function cmdTerms(term) {
    if (!term) throw new Error('usage: terms "engagement ring"');
    const needle = term.toLowerCase();
    const en = readJson(path.join(MESSAGES, "en.json"));
    const hits = collectLeaves(en).filter((l) =>
        String(l.value).toLowerCase().includes(needle)
    );
    console.log(`"${term}" — ${hits.length} English strings contain it\n`);
    if (!hits.length) return;

    const sample = hits.slice(0, 12);
    for (const locale of TARGET_LOCALES) {
        const msgs = readJson(path.join(MESSAGES, `${locale}.json`));
        const counts = new Map();
        for (const hit of sample) {
            let node = msgs;
            for (const step of hit.path) {
                node = node?.[step];
                if (node === undefined) break;
            }
            if (typeof node !== "string") continue;
            // Print the aligned sentence so the operator can read the term in context.
            counts.set(node, (counts.get(node) || 0) + 1);
        }
        console.log(`== ${locale}`);
        for (const [text] of [...counts].slice(0, 4)) {
            console.log("   " + text.slice(0, 150));
        }
        console.log();
    }
}

function cmdCheck(namespaceFilter) {
    const glossary = readJson(GLOSSARY_PATH);
    let total = 0;
    for (const locale of TARGET_LOCALES) {
        const msgs = readJson(path.join(MESSAGES, `${locale}.json`));
        const scope = namespaceFilter ? { [namespaceFilter]: msgs[namespaceFilter] } : msgs;
        if (namespaceFilter && !msgs[namespaceFilter]) {
            console.log(`${locale}: namespace ${namespaceFilter} missing`);
            continue;
        }
        const found = [];
        for (const leaf of collectLeaves(scope)) {
            for (const entry of glossary.terms) {
                for (const bad of entry.avoid?.[locale] || []) {
                    if (hasTerm(String(leaf.value), bad)) {
                        found.push(
                            `  ${leaf.path.join(".")}\n     used "${bad}" — house term is "${entry[locale]}"`
                        );
                    }
                }
            }
        }
        total += found.length;
        console.log(`== ${locale}: ${found.length} glossary violation(s)`);
        found.slice(0, 25).forEach((f) => console.log(f));
    }
    console.log(`\ntotal violations: ${total}`);
    if (total) process.exitCode = 1;
}

async function cmdTranslate(namespace, opts) {
    if (!namespace) throw new Error("usage: translate <namespace>");
    const glossary = readJson(GLOSSARY_PATH);
    const en = readJson(path.join(MESSAGES, "en.json"));
    const { value: source } = resolveNamespace(en, namespace);
    if (!source) throw new Error(`messages/en.json has no namespace "${namespace}"`);

    const locales = opts.locales ?? TARGET_LOCALES;
    const leaves = collectLeaves(source);
    const chars = leaves.reduce((n, l) => n + l.value.length, 0);
    console.log(
        `${namespace}: ${leaves.length} translatable strings, ${chars.toLocaleString()} chars ` +
            `-> ${locales.join(", ")}${opts.dry ? " (DRY RUN)" : ` using ${model()}`}\n`
    );

    if (opts.dry) {
        // Prove the protection logic without spending anything: everything the
        // walker held back is listed so `type`/`href` leakage is visible at a glance.
        const skipped = collectAll(source).filter((l) => !l.translatable);
        console.log(`held back (never sent to the model): ${skipped.length}`);
        const bySkipKey = {};
        for (const l of skipped) bySkipKey[l.key] = (bySkipKey[l.key] || 0) + 1;
        console.log("  " + JSON.stringify(bySkipKey));
        const sampleSkipped = [...new Set(skipped.map((l) => `${l.key}=${l.value}`))].slice(0, 6);
        console.log("  e.g. " + sampleSkipped.join(", "));
        const rows = glossaryFor(locales[0], readJson(GLOSSARY_PATH), leaves.map((l) => l.value).join("\n"));
        console.log(`\nglossary rules that would apply for ${locales[0]}: ${rows.length}`);
        rows.slice(0, 10).forEach((r) => console.log("  " + r));
        console.log(`\nverbatim tokens detected: ${verbatimTokens(leaves.map((l) => l.value)).join(", ") || "none"}`);
        return;
    }

    // Chunk once; every locale reuses the same batching.
    const batches = [];
    let current = [];
    let size = 0;
    for (const leaf of leaves) {
        if (current.length && (size + leaf.value.length > BATCH_CHARS || current.length >= BATCH_ITEMS)) {
            batches.push(current);
            current = [];
            size = 0;
        }
        current.push(leaf);
        size += leaf.value.length;
    }
    if (current.length) batches.push(current);

    for (const locale of locales) {
        const outFile = path.join(STAGING, locale, `${namespace}.json`);
        if (fs.existsSync(outFile) && !opts.force) {
            console.log(`${locale}: staged file exists, skipping (use --force to redo)`);
            continue;
        }

        const done = await pool(batches, CONCURRENCY, (batch) =>
            translateBatch(locale, batch, glossary)
        );
        const flat = done.flat();

        const translated = JSON.parse(JSON.stringify(source));
        for (const leaf of flat) setAtPath(translated, leaf.path, leaf.translated);

        const problems = validate(locale, flat, source, translated, glossary);

        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, JSON.stringify(translated, null, 2) + "\n", "utf8");

        const byKind = problems.reduce((acc, p) => {
            acc[p.kind] = (acc[p.kind] || 0) + 1;
            return acc;
        }, {});
        console.log(
            `${locale}: wrote ${path.relative(ROOT, outFile)} — ` +
                (problems.length
                    ? `${problems.length} flag(s) ${JSON.stringify(byKind)}`
                    : "clean")
        );
        for (const p of problems.slice(0, 12)) {
            console.log(`   [${p.kind}] ${p.where ?? ""} ${p.detail}`);
        }
        if (problems.length > 12) console.log(`   …${problems.length - 12} more`);
    }

    console.log(
        `\nReview the staged files, then merge with:\n` +
            `  node scripts/i18n/translate.mjs merge ${namespace} --after <existingKey>`
    );
}

function cmdMerge(namespace, opts) {
    if (!namespace) throw new Error("usage: merge <namespace> --after <existingKey>");
    const anchor = opts.after;
    if (!anchor) throw new Error("--after <existingKey> is required (controls key placement)");

    // Default is the five targets; pass --locales en to seed a freshly authored
    // English namespace from staging/en/<namespace>.json first.
    const locales = opts.locales ?? TARGET_LOCALES;

    for (const locale of locales) {
        const staged = path.join(STAGING, locale, `${namespace}.json`);
        if (!fs.existsSync(staged)) throw new Error(`missing staged file: ${staged}`);
    }

    // Shape is compared against English — either the copy already in messages,
    // or the staged one when English is itself part of this merge.
    const englishSource = locales.includes(SOURCE_LOCALE)
        ? readJson(path.join(STAGING, SOURCE_LOCALE, `${namespace}.json`))
        : resolveNamespace(readJson(path.join(MESSAGES, "en.json")), namespace).value;
    if (!englishSource) throw new Error(`no English source for ${namespace}`);
    const shape = keyPaths(englishSource).sort();

    for (const locale of locales) {
        const data = readJson(path.join(STAGING, locale, `${namespace}.json`));
        const got = keyPaths(data).sort();
        if (JSON.stringify(got) !== JSON.stringify(shape)) {
            throw new Error(`${locale}: staged shape differs from en — refusing to merge`);
        }
    }

    for (const locale of locales) {
        const file = path.join(MESSAGES, `${locale}.json`);
        const msgs = readJson(file);
        const { parent, key: leafKey } = resolveNamespace(msgs, namespace);
        if (!parent) throw new Error(`${locale}: parent of "${namespace}" does not exist`);
        if (!(anchor in parent)) {
            throw new Error(`${locale}: anchor key "${anchor}" not found beside ${namespace}`);
        }

        const data = readJson(path.join(STAGING, locale, `${namespace}.json`));
        const keys = Object.keys(parent).filter((k) => k !== leafKey);
        const at = keys.indexOf(anchor);
        const ordered = [...keys.slice(0, at + 1), leafKey, ...keys.slice(at + 1)];

        const merged = { ...parent, [leafKey]: data };
        const rebuilt = {};
        for (const k of ordered) rebuilt[k] = merged[k];
        // Mutating the resolved parent in place keeps every ancestor untouched.
        for (const k of Object.keys(parent)) delete parent[k];
        Object.assign(parent, rebuilt);

        writeMessages(locale, msgs);
        console.log(`${locale}: merged ${namespace} after ${anchor}`);
    }
}

// ------------------------------------------------------------------------ main

function parseArgs(argv) {
    const positional = [];
    const opts = {};
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === "--force") opts.force = true;
        else if (a === "--dry" || a === "--dry-run") opts.dry = true;
        else if (a === "--locales") opts.locales = argv[++i].split(",").map((s) => s.trim());
        else if (a === "--after") opts.after = argv[++i];
        else positional.push(a);
    }
    return { positional, opts };
}

loadEnv(); // before any command reads OPENAI_MODEL / OPENAI_API_KEY
const { positional, opts } = parseArgs(process.argv.slice(2));
const [command, arg] = positional;

try {
    switch (command) {
        case "models":
            await cmdModels();
            break;
        case "terms":
            cmdTerms(positional.slice(1).join(" "));
            break;
        case "check":
            cmdCheck(arg);
            break;
        case "translate":
            await cmdTranslate(arg, opts);
            break;
        case "merge":
            cmdMerge(arg, opts);
            break;
        default:
            console.log(
                [
                    "usage:",
                    "  node scripts/i18n/translate.mjs models",
                    '  node scripts/i18n/translate.mjs terms "tennis bracelet"',
                    "  node scripts/i18n/translate.mjs translate <namespace> [--locales nl,fr] [--force] [--dry]",
                    "  node scripts/i18n/translate.mjs check [namespace]",
                    "  node scripts/i18n/translate.mjs merge <namespace> --after <existingKey>",
                ].join("\n")
            );
    }
} catch (err) {
    console.error("error: " + err.message);
    process.exit(1);
}
