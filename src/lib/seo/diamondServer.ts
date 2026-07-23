// lib/seo/diamondServer.ts
//
// Server-only data access for SEO pages and the sitemap. Uses the native
// `fetch` (not the axios apiClient, which depends on localStorage) so the
// requests are statically cacheable and participate in Next.js ISR.
//
// All requests hit the PUBLIC / "safe" endpoints — no auth, no pricing — so
// the resulting pages can be statically rendered and revalidated.

import type { PublicDiamond } from "@/interface/diamondInterface";
import type { MelleDiamond } from "@/interface/melleDiamondInterface";
import { cache } from "react";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Revalidate cached upstream data hourly (on-demand ISR).
const REVALIDATE_SECONDS = 3600;

interface SafeListResponse {
    success: boolean;
    data: PublicDiamond[];
    pagination?: { totalRecords?: number; totalPages?: number };
}

interface SafeItemResponse {
    success: boolean;
    data: MelleDiamond;
}

interface MelleListResponse {
    success: boolean;
    data: MelleDiamond[];
    pagination?: { totalRecords?: number; totalPages?: number };
}

// A loose diamond plus the (optional) similar-diamond stock refs the API
// returns alongside it.
export interface DiamondWithSimilar {
    diamond: PublicDiamond;
    similarStockRefs: string[];
}

const safeJson = async <T>(url: string): Promise<T | null> => {
    const res = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: { Accept: "application/json" },
    });
    // Only a genuine upstream 404 means "record does not exist" — callers may
    // then render a 404 page. Any other failure (5xx, network error) throws so
    // the page fails with a retryable 500 instead of a cacheable false 404
    // that would drop a live diamond from the index.
    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error(`[seo] upstream ${res.status} for ${url}`);
    }
    return (await res.json()) as T;
};

// The safe record does not include a natural/lab flag, but the endpoint
// honours an `isNatural` filter — so we probe it to classify the stone and
// tag the result. `searchTerm + isNatural=true` returns the stone only when
// it is natural; otherwise it is lab grown.
const fetchSafeByStockRef = async (
    stockRef: string,
    isNatural?: boolean,
): Promise<PublicDiamond | null> => {
    const params = new URLSearchParams({ searchTerm: stockRef });
    if (isNatural !== undefined) params.set("isNatural", String(isNatural));
    const json = await safeJson<SafeListResponse>(
        `${API_BASE_URL}/diamonds/safe?${params.toString()}`,
    );
    if (!json?.success || !Array.isArray(json.data) || !json.data.length) {
        return null;
    }
    return (
        json.data.find(
            (d) =>
                String(d.stockRef).trim().toLowerCase() ===
                stockRef.trim().toLowerCase(),
        ) || json.data[0]
    );
};

/**
 * Fetch a single public loose diamond by its stock reference, classified as
 * natural or lab grown via the API's `isNatural` filter. Returns null when the
 * diamond no longer exists (so the page can 404).
 */
export const getPublicDiamondByStockRef = cache(
    async (stockRef: string): Promise<DiamondWithSimilar | null> => {
        // Natural stones resolve in a single request; lab stones cost a second.
        let isNatural: boolean | undefined = true;
        let match = await fetchSafeByStockRef(stockRef, true);
        if (!match) {
            isNatural = false;
            match = await fetchSafeByStockRef(stockRef, false);
        }
        if (!match) {
            // Endpoint may not support the combined filter — fall back to an
            // untyped lookup so the page still renders.
            isNatural = undefined;
            match = await fetchSafeByStockRef(stockRef);
        }
        if (!match) return null;

        // Tag the record so getDiamondType() resolves correctly downstream.
        const tagged = match as PublicDiamond & { isNatural?: boolean };
        if (isNatural !== undefined) tagged.isNatural = isNatural;

        const matchRecord = tagged as unknown as Record<string, unknown>;
        const similarStockRefs = Array.isArray(matchRecord.similar_diamonds)
            ? (matchRecord.similar_diamonds as string[])
            : [];

        return { diamond: tagged, similarStockRefs };
    },
);

/** Fetch a single public melee diamond by its _id. Null when missing. */
export const getPublicMelleById = cache(
    async (id: string): Promise<MelleDiamond | null> => {
        const url = `${API_BASE_URL}/melle-diamonds/safe/${encodeURIComponent(
            id,
        )}`;
        const json = await safeJson<SafeItemResponse>(url);
        if (!json?.success || !json.data) return null;
        return json.data;
    },
);

// --- Sitemap helpers -------------------------------------------------------

export interface SitemapPage<T> {
    items: T[];
    totalRecords: number;
}

/**
 * Page through public loose diamonds for the sitemap, filtered by origin so
 * the caller knows each diamond's type without an extra lookup. Only stockRef
 * and the grade fields needed to build a slug are used by callers.
 */
export const getDiamondSitemapPage = async (
    page: number,
    limit: number,
    isNatural?: boolean,
): Promise<SitemapPage<PublicDiamond>> => {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });
    if (isNatural !== undefined) params.set("isNatural", String(isNatural));
    const json = await safeJson<SafeListResponse>(
        `${API_BASE_URL}/diamonds/safe?${params.toString()}`,
    );
    return {
        items: json?.data ?? [],
        totalRecords: json?.pagination?.totalRecords ?? 0,
    };
};

export const getMelleSitemapPage = async (
    page: number,
    limit: number,
): Promise<SitemapPage<MelleDiamond>> => {
    const url = `${API_BASE_URL}/melle-diamonds/safe?page=${page}&limit=${limit}`;
    const json = await safeJson<MelleListResponse>(url);
    return {
        items: json?.data ?? [],
        totalRecords: json?.pagination?.totalRecords ?? 0,
    };
};

/** Total counts used to plan how many sitemap shards to emit. */
export const getDiamondTotalCount = cache(
    async (isNatural?: boolean): Promise<number> => {
        const { totalRecords } = await getDiamondSitemapPage(1, 1, isNatural);
        return totalRecords;
    },
);

export const getMelleTotalCount = cache(async (): Promise<number> => {
    const { totalRecords } = await getMelleSitemapPage(1, 1);
    return totalRecords;
});
