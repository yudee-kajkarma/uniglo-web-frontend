# i18n translation tooling

Machine-translates a `messages/en.json` namespace into the five target locales
(`nl`, `fr`, `de`, `es`, `it`) with terminology locked to the wording the site
already uses, then stages the result for human review before anything is merged.

## Setup

Add to `.env.local` (already covered by `.gitignore` via `.env*`):

```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=<model id>
```

Run `node scripts/i18n/translate.mjs models` to list the exact model ids your key
can reach, and copy one into `OPENAI_MODEL`. There is no default — a wrong guess
would burn a whole run before failing.

`OPENAI_BASE_URL` can be set if you proxy the API.

## Commands

```bash
# List model ids available to your key
node scripts/i18n/translate.mjs models

# See how an English term is currently rendered in each locale, by looking up
# the same key paths in every message file. Use this to author glossary entries.
node scripts/i18n/translate.mjs terms "tennis bracelet"

# Audit shipped copy against the glossary (no API calls, no spend)
node scripts/i18n/translate.mjs check                       # everything
node scripts/i18n/translate.mjs check jewelleryShowLondonPage

# See exactly what would be sent, and what is held back, without spending
node scripts/i18n/translate.mjs translate <namespace> --dry

# Translate into scripts/i18n/staging/<locale>/<namespace>.json
node scripts/i18n/translate.mjs translate <namespace>
node scripts/i18n/translate.mjs translate <namespace> --locales fr,it --force

# After reviewing the staged files, insert them into messages/*.json
node scripts/i18n/translate.mjs merge <namespace> --after <existingKey>
```

`--after` names the existing top-level key the new namespace is placed behind.
Every other key keeps its position, so the diff stays a pure insertion instead of
a whole-file reshuffle.

## Why the JSON tree never goes through the model

The model is never asked to reproduce the JSON structure. The tree is walked
locally, translatable leaves are pulled into a flat `{id: string}` map, only that
map round-trips, and results are written back to the same paths. So structure,
key order and array lengths cannot drift.

Leaves under `type`, `href`, `src`, `url`, `slug`, `id`, `width`, `height`,
`image` are never sent — translating a `type` would break the `ContentBlock`
union in `DynamicArticle`, and translating an `href` would break every link.
Values that are plainly not prose (URLs, emails, bare numerics) are skipped too.
`--dry` prints exactly what was held back so you can confirm this per namespace.

## Validation

Each staged locale is checked and flagged before you read it:

| flag | meaning |
| --- | --- |
| `shape` | translated tree differs structurally from English |
| `link` | a markdown `[label](target)` target changed |
| `token` | a code/acronym/time present in the source is missing (`B41`, `GIA`, `09:00`) |
| `untranslated` | output is byte-identical to a source string of 7+ words |
| `glossary` | an `avoid` variant was used instead of the house term |
| `glossary-miss` | advisory — source had a glossary term, output lacks its stem. Inflection makes this approximate, so it means "read this one", not "this is wrong" |

`merge` independently re-verifies that every staged file has the same key shape
as English and refuses to write if not.

## The glossary

`glossary.json` holds the house term per locale plus `avoid` variants. The
targets were taken from what the shipped copy already says most often, not
invented — use `terms` to gather that evidence before adding an entry.

Only glossary terms that actually occur in a batch are injected into the prompt,
so the model gets a short focused rule list rather than the whole glossary.
