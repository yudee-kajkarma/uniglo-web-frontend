// lib/seo/diamondSeo.ts
//
// Pure, dependency-free SEO helpers shared by both server (metadata, content,
// JSON-LD, sitemap) and client (link building). Keep this file free of any
// server-only or browser-only imports so it can run in every context.

import {
    Diamond,
    PublicDiamond,
    getShapeFullName,
    getAvailabilityText,
} from "@/interface/diamondInterface";
import type {
    MelleDiamond,
    PublicMelleDiamond,
} from "@/interface/melleDiamondInterface";

export const SITE_URL = "https://www.uniglodiamonds.com";

export type AnyDiamond = Diamond | PublicDiamond;
export type AnyMelle = MelleDiamond | PublicMelleDiamond;
export type DiamondType = "Natural" | "Lab Grown";

// Delimiter that separates the human-readable keyword slug from the raw stock
// reference / id used to resolve the record. Chosen so it cannot collide with
// a normal kebab-cased keyword segment.
const SKU_DELIM = "-sku-";

/** Lowercase, hyphenate and strip anything that is not url-safe. */
export const kebab = (value: string | number | undefined | null): string =>
    String(value ?? "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

/** Carat weight as a fixed 2-decimal string, e.g. 1.5 -> "1.50". */
export const formatCarat = (weight: number | undefined): string => {
    const n = Number(weight);
    if (!Number.isFinite(n) || n <= 0) return "0.00";
    return n.toFixed(2);
};

/** Carat for url slugs, e.g. 1.5 -> "1-50". */
const caratSlug = (weight: number | undefined): string =>
    formatCarat(weight).replace(".", "-");

// --- Grade label maps (codes -> human readable) ----------------------------

const CUT_FINISH_LABELS: Record<string, string> = {
    EX: "Excellent",
    ID: "Ideal",
    VG: "Very Good",
    G: "Good",
    F: "Fair",
    P: "Poor",
    I: "Fair",
    NA: "Not Graded",
};

const FLUORESCENCE_LABELS: Record<string, string> = {
    NON: "None",
    NONE: "None",
    N: "None",
    VSL: "Very Slight",
    FNT: "Faint",
    FAINT: "Faint",
    SLT: "Slight",
    MED: "Medium",
    STG: "Strong",
    VST: "Very Strong",
};

const LAB_LABELS: Record<string, string> = {
    GIA: "GIA",
    IGI: "IGI",
    HRD: "HRD",
    GCAL: "GCAL",
    OTHERS: "Other Laboratory",
    OTHER: "Other Laboratory",
};

export const cutLabel = (code: string | undefined): string =>
    code ? (CUT_FINISH_LABELS[String(code).toUpperCase()] ?? String(code)) : "";

export const fluorescenceLabel = (code: string | undefined): string =>
    code
        ? (FLUORESCENCE_LABELS[String(code).toUpperCase()] ?? String(code))
        : "None";

export const labName = (code: string | undefined): string =>
    code ? (LAB_LABELS[String(code).toUpperCase()] ?? String(code)) : "GIA";

/** Short lab code for slugs/titles (gia, igi, ...). */
export const labCode = (code: string | undefined): string =>
    kebab(code || "gia");

// --- Natural vs Lab grown --------------------------------------------------

const LAB_REGEX =
    /\b(LAB[\s-]?GROWN|LABORATORY[\s-]?GROWN|LAB[\s-]?CREATED|MAN[\s-]?MADE|CVD|HPHT|SYNTHETIC|CREATED)\b/;

/**
 * Determine whether a diamond is natural or lab grown.
 *
 * Priority:
 *  1. Explicit boolean fields on the record (isLab / isNatural) — preferred,
 *     to be populated by the API per the agreed plan.
 *  2. Fragile fallback: scan certComment / treatment / enhancements text.
 *  3. Default to "Natural" when nothing indicates otherwise.
 */
export const getDiamondType = (diamond: AnyDiamond): DiamondType => {
    const d = diamond as unknown as Record<string, unknown>;
    if (typeof d.isLab === "boolean") return d.isLab ? "Lab Grown" : "Natural";
    if (typeof d.isNatural === "boolean")
        return d.isNatural ? "Natural" : "Lab Grown";

    const haystack = [d.certComment, d.treatment, d.enhancements, d.source]
        .filter((v) => typeof v === "string")
        .join(" ")
        .toUpperCase();
    if (LAB_REGEX.test(haystack)) return "Lab Grown";
    return "Natural";
};

const typeSlug = (type: DiamondType): string =>
    type === "Lab Grown" ? "lab-grown" : "natural";

// --- Loose diamond slug / path ---------------------------------------------

/**
 * Build the keyword-rich, unique slug for a loose diamond.
 * e.g. "1-50-carat-round-lab-grown-diamond-e-vs1-igi-sku-AB12345"
 *
 * `isNaturalOverride` lets callers that already know the origin (e.g. the
 * inventory natural/lab tab) produce the correct keyword even though the
 * record itself carries no natural/lab flag.
 */
export const buildDiamondSlug = (
    diamond: AnyDiamond,
    isNaturalOverride?: boolean,
): string => {
    const type: DiamondType =
        isNaturalOverride === undefined
            ? getDiamondType(diamond)
            : isNaturalOverride
              ? "Natural"
              : "Lab Grown";
    const keywords = [
        caratSlug(diamond.weight),
        "carat",
        kebab(getShapeFullName(diamond.shape)),
        typeSlug(type),
        "diamond",
        kebab(diamond.color),
        kebab(diamond.clarity),
        labCode(diamond.lab),
    ]
        .filter(Boolean)
        .join("-");
    return `${keywords}${SKU_DELIM}${encodeURIComponent(diamond.stockRef)}`;
};

const safeDecode = (value: string): string => {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};

/** Recover the raw stock reference from a loose-diamond slug. */
export const getStockRefFromSlug = (slug: string): string | null => {
    const decoded = safeDecode(slug);
    const idx = decoded.lastIndexOf(SKU_DELIM);
    if (idx === -1) return null;
    const ref = decoded.slice(idx + SKU_DELIM.length);
    return ref.trim() || null;
};

export const buildDiamondPath = (
    diamond: AnyDiamond,
    isNaturalOverride?: boolean,
): string => `/diamonds/${buildDiamondSlug(diamond, isNaturalOverride)}`;

export const buildDiamondUrl = (
    diamond: AnyDiamond,
    isNaturalOverride?: boolean,
): string => `${SITE_URL}${buildDiamondPath(diamond, isNaturalOverride)}`;

// --- Loose diamond meta ----------------------------------------------------

/**
 * Meta title, max ~60 chars where possible.
 * "[carat] Carat [shape] [type] Diamond | [colour] Colour, [clarity] Clarity, [lab] Certified"
 */
export const getDiamondMetaTitle = (diamond: AnyDiamond): string => {
    const type = getDiamondType(diamond);
    return `${formatCarat(diamond.weight)} Carat ${getShapeFullName(
        diamond.shape,
    )} ${type} Diamond | ${diamond.color} Colour, ${diamond.clarity} Clarity, ${labName(
        diamond.lab,
    )} Certified`;
};

export const getDiamondMetaDescription = (diamond: AnyDiamond): string => {
    const type = getDiamondType(diamond);
    return `View this ${formatCarat(diamond.weight)} carat ${getShapeFullName(
        diamond.shape,
    ).toLowerCase()} ${type.toLowerCase()} diamond with ${diamond.color} colour, ${
        diamond.clarity
    } clarity, ${cutLabel(diamond.cutGrade) || "graded"} cut, ${
        cutLabel(diamond.polish) || "fine"
    } polish and ${
        cutLabel(diamond.symmetry) || "balanced"
    } symmetry. Certified by ${labName(
        diamond.lab,
    )} and suitable for engagement rings, bespoke jewellery and fine diamond settings.`;
};

/** Best image for OpenGraph / schema. Prefers a non-thumbnail still image. */
export const getDiamondPrimaryImage = (
    diamond: AnyDiamond,
): string | undefined => {
    const urls = (diamond.imageUrls || []).filter(
        (u) => typeof u === "string" && u && !u.includes("small"),
    );
    const still = urls.find((u) => u.includes("still"));
    return still || urls[0] || diamond.webLink || undefined;
};

// --- Recommendations derived from grades -----------------------------------

export const getRecommendedMetal = (color: string | undefined): string => {
    const c = String(color || "").toUpperCase();
    if (["D", "E", "F"].includes(c)) return "platinum or white gold";
    if (["G", "H", "I", "J"].includes(c))
        return "white gold, platinum or yellow gold";
    return "yellow gold or rose gold";
};

export const getRecommendedSetting = (shapeFull: string): string => {
    const s = shapeFull.toLowerCase();
    if (["oval", "pear", "marquise", "emerald"].includes(s))
        return "a solitaire or three-stone setting";
    if (["round", "cushion", "princess"].includes(s))
        return "a solitaire or halo setting";
    return "a solitaire, halo or bespoke setting";
};

export { getShapeFullName, getAvailabilityText };

// ===========================================================================
//  MELEE DIAMONDS
// ===========================================================================

const MELLE_SHAPE_LABELS: Record<string, string> = {
    RBC: "Round Brilliant",
    RD: "Round",
};

export const melleShapeFullName = (shape: string | undefined): string => {
    if (!shape) return "Round";
    const key = String(shape).toUpperCase();
    return MELLE_SHAPE_LABELS[key] ?? getShapeFullName(shape);
};

export const getMelleType = (melle: AnyMelle): DiamondType =>
    melle.isLab ? "Lab Grown" : "Natural";

/** Sieve range label, e.g. "+0.5 -1" or single value. */
export const melleSieveLabel = (melle: AnyMelle): string => {
    const lo = melle.sieveMin?.trim();
    const hi = melle.sieveMax?.trim();
    if (lo && hi && lo !== hi) return `${lo} to ${hi}`;
    return lo || hi || "";
};

export const melleMeasurementLabel = (melle: AnyMelle): string => {
    const len = melle.measurementLength?.trim();
    const breadth = melle.measurementBreadth?.trim();
    if (len && breadth) return `${len} × ${breadth} mm`;
    if (len || breadth) return `${len || breadth} mm`;
    const lo = melle.measurementMin?.trim();
    const hi = melle.measurementMax?.trim();
    if (lo && hi && lo !== hi) return `${lo} – ${hi} mm`;
    return lo || hi ? `${lo || hi} mm` : "";
};

export const buildMelleSlug = (melle: AnyMelle): string => {
    const type = getMelleType(melle);
    const keywords = [
        typeSlug(type),
        kebab(melleShapeFullName(melle.shape)),
        "melee-diamonds",
        kebab(melle.color),
        kebab(melle.clarity),
        melle.sieveMin || melle.sieveMax
            ? `sieve-${kebab(melleSieveLabel(melle))}`
            : "",
    ]
        .filter(Boolean)
        .join("-");
    return `${keywords}${SKU_DELIM}${encodeURIComponent(melle._id)}`;
};

export const getMelleIdFromSlug = (slug: string): string | null => {
    const decoded = safeDecode(slug);
    const idx = decoded.lastIndexOf(SKU_DELIM);
    if (idx === -1) return null;
    const id = decoded.slice(idx + SKU_DELIM.length);
    return id.trim() || null;
};

export const buildMellePath = (melle: AnyMelle): string =>
    `/diamonds/melee/${buildMelleSlug(melle)}`;

export const buildMelleUrl = (melle: AnyMelle): string =>
    `${SITE_URL}${buildMellePath(melle)}`;

export const getMelleMetaTitle = (melle: AnyMelle): string => {
    const type = getMelleType(melle);
    const sieve = melleSieveLabel(melle);
    const sievePart = sieve ? ` (Sieve ${sieve})` : "";
    return `${melleShapeFullName(melle.shape)} ${melle.color} ${melle.clarity} ${type} Melee Diamonds${sievePart} | Uniglo Diamonds`;
};

export const getMelleMetaDescription = (melle: AnyMelle): string => {
    const type = getMelleType(melle);
    const sieve = melleSieveLabel(melle);
    const sievePart = sieve ? `, sieve size ${sieve}` : "";
    return `Buy ${melleShapeFullName(melle.shape).toLowerCase()} ${melle.color} ${
        melle.clarity
    } ${type.toLowerCase()} melee diamonds${sievePart} in calibrated parcels from Uniglo Diamonds. Ideal for pavé settings, halos and accent stones in fine jewellery. Wholesale supply from Antwerp.`;
};

export const getMellePrimaryImage = (melle: AnyMelle): string | undefined => {
    const urls = (melle.images || []).filter(
        (u) => typeof u === "string" && u,
    );
    return urls[0] || undefined;
};
