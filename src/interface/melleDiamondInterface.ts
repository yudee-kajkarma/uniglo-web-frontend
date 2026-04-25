// interfaces/melleDiamond.interface.ts
// Mirrors the contract documented in Melle-Diamonds-API.md.

export type MelleShape = "RBC" | string;
export type MelleColor = "D-F" | "GH" | "HI" | string;
export type MelleClarity = "I1" | "SI1" | "SI2" | "VS" | "VVS" | string;
export type MelleCut = "Very Good" | string;
export type MelleCategory = "BM" | string;

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
    carat: number;
    isLab: boolean;
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

export interface MelleFilterOptions {
    shapes: MelleShape[];
    colors: MelleColor[];
    clarities: MelleClarity[];
    cuts: MelleCut[];
    melleCategories: MelleCategory[];
    isLabOptions: boolean[];
    priceRange: MelleNumericRange;
    avgPtrRange: MelleNumericRange;
    caratRange: MelleNumericRange;
    measurementRange: MelleNumericRange;
    sieveRange: MelleNumericRange;
}

// UI-side state the Melle filter component owns.
export interface MelleFilterState {
    shape: MelleShape[];
    color: MelleColor[];
    clarity: MelleClarity[];
    cut: MelleCut[];
    melleCategory: MelleCategory[];
    isLab: boolean | undefined;
    priceRange: [number, number];
    avgPtrRange: [number, number];
    caratRange: [number, number];
    measurementRange: [number, number];
    sieveRange: [number, number];
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
    sieveMin: string;
    sieveMax: string;
    isLab: boolean;
    melleCategory: MelleCategory;
    cut?: MelleCut;
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
    isLab?: boolean;
    minPrice?: number;
    maxPrice?: number;
    minAvgPtr?: number;
    maxAvgPtr?: number;
    minCarat?: number;
    maxCarat?: number;
    minMeasurement?: number;
    maxMeasurement?: number;
    minSieve?: number;
    maxSieve?: number;
    searchTerm?: string;
}
