// services/melleDiamondService.ts
import apiClient from "@/lib/api";
import {
    MelleDiamond,
    MelleDiamondParams,
    MelleFilterOptions,
    PublicMelleDiamond,
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

    if (params.isLab !== undefined) q.append("isLab", String(params.isLab));

    if (params.minPrice !== undefined)
        q.append("price_MIN", params.minPrice.toString());
    if (params.maxPrice !== undefined)
        q.append("price_MAX", params.maxPrice.toString());

    if (params.minAvgPtr !== undefined)
        q.append("avgPtr_MIN", params.minAvgPtr.toString());
    if (params.maxAvgPtr !== undefined)
        q.append("avgPtr_MAX", params.maxAvgPtr.toString());

    if (params.minCarat !== undefined)
        q.append("carat_MIN", params.minCarat.toString());
    if (params.maxCarat !== undefined)
        q.append("carat_MAX", params.maxCarat.toString());

    if (params.searchTerm) q.append("searchTerm", params.searchTerm);

    return q;
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
): Promise<MelleDiamond> => {
    const res = await apiClient.get<ItemResponse<MelleDiamond>>(
        `/melle-diamonds/${encodeURIComponent(id)}`,
    );
    if (!res.data.success) {
        throw new Error(res.data.message || "Melle diamond not found");
    }
    return res.data.data;
};
