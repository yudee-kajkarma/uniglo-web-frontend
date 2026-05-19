// services/melleDiamondService.ts
import apiClient from "@/lib/api";
import {
    CreateMelleDiamondBody,
    MelleDiamond,
    MelleDiamondParams,
    MelleFilterOptions,
    PublicMelleDiamond,
    UpdateMelleDiamondBody,
} from "@/interface/melleDiamondInterface";

interface ApiPagination {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface ListResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    pagination: ApiPagination;
}

interface SearchResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    pagination?: ApiPagination;
}

interface ItemResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface MellePageResult<T> {
    data: T[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const buildMelleQuery = (params: MelleDiamondParams): URLSearchParams => {
    const q = new URLSearchParams();

    if (params.page) q.append("page", params.page.toString());
    if (params.limit) q.append("limit", params.limit.toString());
    if (params.sortBy) q.append("sortBy", params.sortBy);
    if (params.sortOrder) q.append("sortOrder", params.sortOrder);

    // Multi-select params. The doc shows single-value examples but search
    // endpoints typically accept repeated keys; the backend ignores extras
    // gracefully. If the backend ends up expecting CSV, swap to .join(",").
    params.shape?.forEach((s) => q.append("shape", s));
    params.color?.forEach((c) => q.append("color", c));
    params.clarity?.forEach((c) => q.append("clarity", c));
    params.cut?.forEach((c) => q.append("cut", c));
    params.melleCategory?.forEach((m) => q.append("melleCategory", m));

    if (params.labType?.length)
        q.append("labType", params.labType.join(","));

    if (params.isLab !== undefined) q.append("isLab", String(params.isLab));

    if (params.minPrice !== undefined)
        q.append("price_MIN", params.minPrice.toString());
    if (params.maxPrice !== undefined)
        q.append("price_MAX", params.maxPrice.toString());

    appendBucketRanges(q, "avgPtrRanges", params.avgPtrRanges);
    appendBucketRanges(q, "caratRanges", params.caratRanges);
    appendBucketRanges(q, "measurementRanges", params.measurementRanges);
    appendBucketRanges(q, "sieveRanges", params.sieveRanges);

    if (params.searchTerm) q.append("searchTerm", params.searchTerm);

    return q;
};

// Backend expects each range field as a single CSV value, e.g.
//   caratRanges=0.00005-0.000068,0.00002-0.00004
// Sieve buckets pass through as strings ("00-0,000-00") since sieve grades
// are categorical labels where leading zeros matter.
const appendBucketRanges = <T extends number | string>(
    q: URLSearchParams,
    field: string,
    ranges: [T, T][] | undefined,
) => {
    if (!ranges || ranges.length === 0) return;
    const csv = ranges.map(([min, max]) => `${min}-${max}`).join(",");
    q.append(field, csv);
};

const normalizePage = <T>(
    data: T[],
    pagination: ApiPagination | undefined,
    limit: number | undefined,
): MellePageResult<T> => {
    if (pagination) {
        return {
            data,
            totalCount: pagination.totalRecords,
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            hasNextPage: pagination.hasNextPage,
            hasPrevPage: pagination.hasPrevPage,
        };
    }
    // Search endpoint currently returns no pagination block — synthesize.
    const total = data.length;
    const perPage = limit ?? total ?? 1;
    return {
        data,
        totalCount: total,
        currentPage: 1,
        totalPages: Math.max(1, Math.ceil(total / Math.max(perPage, 1))),
        hasNextPage: false,
        hasPrevPage: false,
    };
};

export const fetchMelleDiamonds = async (
    params: MelleDiamondParams,
): Promise<MellePageResult<MelleDiamond>> => {
    const q = buildMelleQuery(params);
    const res = await apiClient.get<ListResponse<MelleDiamond>>(
        `/melle-diamonds?${q.toString()}`,
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch melle diamonds");
    }
    return normalizePage(res.data.data, res.data.pagination, params.limit);
};

export const searchMelleDiamonds = async (
    params: MelleDiamondParams,
): Promise<MellePageResult<MelleDiamond>> => {
    const q = buildMelleQuery(params);
    const res = await apiClient.get<SearchResponse<MelleDiamond>>(
        `/melle-diamonds/search?${q.toString()}`,
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Failed to search melle diamonds");
    }
    return normalizePage(res.data.data, res.data.pagination, params.limit);
};

// NOTE: The public/safe endpoint for melle diamonds is not yet documented
// in Melle-Diamonds-API.md. Path mirrors /diamonds/safe; adjust if the
// backend uses a different route.
export const fetchPublicMelleDiamonds = async (
    params: MelleDiamondParams,
): Promise<MellePageResult<PublicMelleDiamond>> => {
    const q = buildMelleQuery(params);
    const res = await apiClient.get<SearchResponse<PublicMelleDiamond>>(
        `/melle-diamonds/safe?${q.toString()}`,
    );
    if (!res.data.success) {
        throw new Error(
            res.data.message || "Failed to fetch public melle diamonds",
        );
    }
    return normalizePage(res.data.data, res.data.pagination, params.limit);
};

export const fetchMelleFilterOptions =
    async (): Promise<MelleFilterOptions> => {
        const res = await apiClient.get<ItemResponse<MelleFilterOptions>>(
            `/melle-diamonds/filter-options`,
        );
        if (!res.data.success) {
            throw new Error(
                res.data.message ||
                    "Failed to fetch melle diamond filter options",
            );
        }
        return res.data.data;
    };

export const fetchMelleDiamondById = async (
    id: string,
    isPublic = false,
): Promise<MelleDiamond> => {
    const res = await apiClient.get<ItemResponse<MelleDiamond>>(
        `/melle-diamonds/${isPublic ? "safe/" : ""}${encodeURIComponent(id)}`,
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Melle diamond not found");
    }
    return res.data.data;
};

// Admin-only mutations.

export const createMelleDiamond = async (
    body: CreateMelleDiamondBody,
): Promise<MelleDiamond> => {
    const res = await apiClient.post<ItemResponse<MelleDiamond>>(
        `/melle-diamonds`,
        body,
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Failed to create melle diamond");
    }
    return res.data.data;
};

export const updateMelleDiamond = async (
    id: string,
    body: UpdateMelleDiamondBody,
): Promise<MelleDiamond> => {
    const res = await apiClient.put<ItemResponse<MelleDiamond>>(
        `/melle-diamonds/${encodeURIComponent(id)}`,
        body,
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Failed to update melle diamond");
    }
    return res.data.data;
};

export interface ImportMelleDiamondsResult {
    inserted?: number;
    updated?: number;
    skipped?: number;
    errors?: { row: number; message: string }[];
    [key: string]: unknown;
}

export const importMelleDiamonds = async (input: {
    file: File;
    isLab: boolean;
    // melleCategory: string;
}): Promise<ImportMelleDiamondsResult> => {
    const formData = new FormData();
    formData.append("file", input.file);
    formData.append("isLab", String(input.isLab));
    // formData.append("melleCategory", input.melleCategory);

    const res = await apiClient.post<ItemResponse<ImportMelleDiamondsResult>>(
        `/melle-diamonds/import`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Failed to import melle diamonds");
    }
    return res.data.data;
};

// v2 import: flat Master Price List Excel. Type (Natural/Lab) and labType
// (HPHT/CVD) are derived per row from the TYPE column, so the dialog only
// needs the file.
export const importMelleDiamondsV2 = async (input: {
    file: File;
}): Promise<ImportMelleDiamondsResult> => {
    const formData = new FormData();
    formData.append("file", input.file);

    const res = await apiClient.post<ItemResponse<ImportMelleDiamondsResult>>(
        `/melle-diamonds/import-v2`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
    );
    if (!res.data.success) {
        throw new Error(
            res.data.message || "Failed to import melle diamonds (v2)",
        );
    }
    return res.data.data;
};

export const deleteMelleDiamond = async (id: string): Promise<void> => {
    const res = await apiClient.delete<{ success: boolean; message: string }>(
        `/melle-diamonds/${encodeURIComponent(id)}`,
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Failed to delete melle diamond");
    }
};

export interface BulkDeleteMelleDiamondsResult {
    deletedCount?: number;
    [key: string]: unknown;
}

export const bulkDeleteMelleDiamonds = async (
    ids: string[],
): Promise<BulkDeleteMelleDiamondsResult> => {
    const res = await apiClient.delete<
        ItemResponse<BulkDeleteMelleDiamondsResult>
    >(`/melle-diamonds`, { data: { ids } });
    if (!res.data.success) {
        throw new Error(res.data.message || "Failed to delete melle diamonds");
    }
    return res.data.data ?? {};
};
