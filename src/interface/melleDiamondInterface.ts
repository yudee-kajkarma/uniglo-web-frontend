// interfaces/melleDiamond.interface.ts
// Mirrors the contract documented in Melle-Diamonds-API.md.

export type MelleShape = "RBC" | string;
export type MelleColor = "D-F" | "GH" | "HI" | string;
export type MelleClarity = "I1" | "SI1" | "SI2" | "VS" | "VVS" | string;
export type MelleCut = "Very Good" | string;
export type MelleCategory = "BM" | string;

/** Round melee (RBC) vs fancy shape master inventory. */
export type MelleInventoryKind = "round" | "fancy";

export const MELLE_ROUND_SHAPE_CODES = new Set(["RBC", "RD"]);

export function isMelleRoundShape(shape: string): boolean {
    return MELLE_ROUND_SHAPE_CODES.has(shape.trim().toUpperCase());
}

/** Round shapes first (RBC, RD), then alphabetical. */
export function sortMelleShapesForDisplay(shapes: string[]): string[] {
    const roundOrder = ["RBC", "RD"];
    return [...shapes].sort((a, b) => {
        const aRound = isMelleRoundShape(a);
        const bRound = isMelleRoundShape(b);
        if (aRound !== bRound) return aRound ? -1 : 1;
        const ai = roundOrder.indexOf(a.toUpperCase());
        const bi = roundOrder.indexOf(b.toUpperCase());
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return a.localeCompare(b);
    });
}

export function shapesForMelleInventoryKind(
    shapes: string[],
    kind: MelleInventoryKind,
): string[] {
    const filtered =
        kind === "round"
            ? shapes.filter(isMelleRoundShape)
            : shapes.filter((s) => !isMelleRoundShape(s));
    return sortMelleShapesForDisplay(filtered);
}

export interface MelleDiamond {
    _id: string;
    stockId: string;
    shape: MelleShape;
    price: number;
    clarity: MelleClarity;
    cut: MelleCut;
    color: MelleColor;
    avgPtr: number;
    sieveMax: string;
    sieveMin: string;
    measurementMax: string;
    measurementMin: string;
    /** Fancy-shape length (e.g. "120"); empty for round/melee rows. */
    measurementLength?: string;
    /** Fancy-shape breadth (e.g. "80"); empty for round/melee rows. */
    measurementBreadth?: string;
    /** Image URLs from Excel import or manual admin entry. */
    images?: string[];
    carat: number;
    /** Available carat weight in stock; defaults to 100. */
    availableCarat?: number;
    isLab: boolean;
    /** HPHT or CVD for lab-grown stones; empty string otherwise. */
    labType?: string;
    melleCategory: MelleCategory;
    __v?: number;
    createdAt: string;
    updatedAt: string;
}

// Public/safe variant — identical to MelleDiamond minus `price` when the
// safe endpoint strips it server-side. We type it optional so the same UI
// components can render either shape.
export interface PublicMelleDiamond extends Omit<MelleDiamond, "price"> {
    price?: number;
}

export interface MelleNumericRange {
    min: number;
    max: number;
}

// Sieve grades are categorical strings ("0", "00", "000", "1.5"…) where
// leading zeros are significant — "00" is a finer grade than "0". The
// backend therefore returns them as a fixed list of buckets instead of a
// numeric min/max range.
export interface MelleSieveOption {
    sieveMin: string;
    sieveMax: string;
    label: string;
}

export interface MelleFilterOptions {
    shapes: MelleShape[];
    colors: MelleColor[];
    clarities: MelleClarity[];
    cuts: MelleCut[];
    melleCategories: MelleCategory[];
    labTypes: string[];
    isLabOptions: boolean[];
    priceRange: MelleNumericRange;
    avgPtrRange: MelleNumericRange;
    caratRange: MelleNumericRange;
    measurementRange: MelleNumericRange;
    lengthRange: MelleNumericRange;
    breadthRange: MelleNumericRange;
    lengthOptions: string[];
    breadthOptions: string[];
    sieveOptions: MelleSieveOption[];
}

// UI-side state the Melle filter component owns.
export interface MelleFilterState {
    /** Round (RBC/mm+sieve) vs fancy (length+breadth) inventory view. */
    inventoryKind: MelleInventoryKind;
    shape: MelleShape[];
    color: MelleColor[];
    clarity: MelleClarity[];
    cut: MelleCut[];
    melleCategory: MelleCategory[];
    labType: string[];
    isLab: boolean | undefined;
    priceRange: [number, number];
    avgPtrRanges: [number, number][];
    caratRanges: [number, number][];
    /** Round inventory: mm min/max via input boxes. */
    measurementMmRange: [number, number];
    lengthValues: string[];
    breadthValues: string[];
    sieveRanges: [string, string][];
    searchTerm: string | undefined;
}

// Body used to create a melle diamond. Server generates _id, stockId,
// carat, createdAt, updatedAt, __v — do not send those.
export interface CreateMelleDiamondBody {
    shape: MelleShape;
    price: number;
    color: MelleColor;
    clarity: MelleClarity;
    avgPtr: number;
    measurementMin: string;
    measurementMax: string;
    measurementLength?: string;
    measurementBreadth?: string;
    images?: string[];
    sieveMin: string;
    sieveMax: string;
    isLab: boolean;
    labType?: string;
    melleCategory: MelleCategory;
    cut?: MelleCut;
    availableCarat?: number;
}

export type UpdateMelleDiamondBody = Partial<CreateMelleDiamondBody>;

// Flattened params the service layer accepts. The service is responsible
// for serializing into the Melle API's MIN/MAX suffix style.
export interface MelleDiamondParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    shape?: MelleShape[];
    color?: MelleColor[];
    clarity?: MelleClarity[];
    cut?: MelleCut[];
    melleCategory?: MelleCategory[];
    labType?: string[];
    isLab?: boolean;
    minPrice?: number;
    maxPrice?: number;
    avgPtrRanges?: [number, number][];
    caratRanges?: [number, number][];
    measurementRanges?: [number, number][];
    lengthValues?: string[];
    breadthValues?: string[];
    sieveRanges?: [string, string][];
    searchTerm?: string;
}
