// lib/jewels/catalog.ts
//
// Server-side reader for the Uniglo Jewels storefront catalog. Used by the
// Antwerp Mother's Day landing page to show the six-piece gift edit.
//
// Two calls are needed per product:
//   1. /store/catalog?search=<handle>  -> listing fields (title, image, price)
//   2. /store/products/<id>            -> variant metadata.woo_id
// The catalog listing does not expose woo_id, and the storefront product URL
// requires it as the ?vid= parameter.

const API_BASE =
    process.env.UNIGLO_JEWELS_API_URL ??
    "https://uniglow-jewels-service-dev.caratlogic.com";

// Medusa publishable key ("pk_" prefix) — designed to be sent from public
// storefronts, so a checked-in default is safe. Override per environment.
const API_KEY =
    process.env.UNIGLO_JEWELS_PUBLISHABLE_KEY ??
    "pk_1a776bcae483135f828cfb1111d867d4f4c8db99e6ab791ed62b4d351d807ac2";

const STOREFRONT = "https://www.uniglojewels.com";

// Catalog is re-read hourly; the gift edit is curated, not real-time stock.
const REVALIDATE_SECONDS = 3600;

export type JewelsCategory = "necklaces" | "earrings" | "bracelets" | "rings";

export type GiftEditProduct = {
    id: string;
    title: string;
    image: string | null;
    price: number | null;
    currency: string;
    metal: string | null;
    /** "natural" | "labGrown" | null — resolved to a translated label by the caller. */
    stoneOrigin: "natural" | "labGrown" | null;
    detail: string | null;
    category: JewelsCategory;
    url: string;
};

// Most products exist in both a natural and a lab-grown variant. Without a
// ?stone_type filter the catalog picks the lab-grown one, so the two slots the
// brief specifies as natural are pinned explicitly.
const STONE_TYPE_FILTER = {
    natural: "Natural Diamond DEF Color - VVS VS Clarity",
    labGrown: "Lab-Grown Diamond DEF Color - VVS VS Clarity",
} as const;

/**
 * The six pieces named in the campaign brief, in its stated order: an everyday
 * natural necklace, a lab-grown solitaire necklace, classic natural studs, a
 * fashion pair, a bracelet and a symbolic ring. Pinned by handle so the edit
 * stays curated; if a handle disappears from the catalog we fall back to the
 * newest piece in the same category rather than dropping the card.
 */
const GIFT_EDIT: {
    category: JewelsCategory;
    handle: string;
    stone?: keyof typeof STONE_TYPE_FILTER;
}[] = [
    { category: "necklaces", handle: "soft-heart-necklace", stone: "natural" },
    { category: "necklaces", handle: "alma-emerald-diamond-solitaire-necklace" },
    {
        category: "earrings",
        handle: "double-delight-diamond-stud-earrings",
        stone: "natural",
    },
    {
        category: "earrings",
        handle: "peony-flower-fashion-diamond-stud-earrings",
    },
    { category: "bracelets", handle: "millie-five-stone-round-fashion-bracelet" },
    {
        category: "rings",
        handle: "violeta-two-stone-oval-and-pear-toi-et-moi-grown-diamond-ring",
    },
];

type CatalogProduct = {
    id: string;
    title: string;
    handle: string;
    thumbnail: string | null;
    previewImage: string | null;
    from_price: number | null;
    currency: string;
    style: string | null;
    shape: string | null;
    selected_variant_id: string | null;
    selected_sku: string | null;
    selected_options: Record<string, string> | null;
};

const headers = { "x-publishable-api-key": API_KEY };

const getJson = async <T>(url: string): Promise<T | null> => {
    try {
        const res = await fetch(url, {
            headers,
            next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!res.ok) {
            console.error(`[jewels] ${res.status} for ${url}`);
            return null;
        }
        return (await res.json()) as T;
    } catch (err) {
        console.error(`[jewels] request failed for ${url}:`, err);
        return null;
    }
};

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

/**
 * Storefront product URL, matching the live uniglojewels.com scheme:
 * /ready-to-wear/view-product/<category>/<handle>-with-<metal>-metal-<sku>
 *   ?vid=<woo_id>&cat=<category>&urlCatSlug=<category>
 */
const buildProductUrl = ({
    category,
    handle,
    metal,
    sku,
    wooId,
}: {
    category: JewelsCategory;
    handle: string;
    metal: string | null;
    sku: string | null;
    wooId: string | null;
}): string => {
    const segments = [handle];
    if (metal) segments.push(`with-${slugify(metal)}-metal`);
    if (sku) segments.push(sku);

    const path = `${STOREFRONT}/ready-to-wear/view-product/${category}/${segments.join("-")}`;
    const query = new URLSearchParams();
    if (wooId) query.set("vid", wooId);
    query.set("cat", category);
    query.set("urlCatSlug", category);

    return `${path}?${query.toString()}`;
};

const fetchByHandle = async (
    category: JewelsCategory,
    handle: string,
    stone?: keyof typeof STONE_TYPE_FILTER,
): Promise<CatalogProduct | null> => {
    const query = new URLSearchParams({
        category,
        limit: "1",
        search: handle,
    });
    if (stone) query.set("stone_type", STONE_TYPE_FILTER[stone]);

    const body = await getJson<{ data?: { products?: CatalogProduct[] } }>(
        `${API_BASE}/store/catalog?${query.toString()}`,
    );
    return body?.data?.products?.[0] ?? null;
};

const fetchNewest = async (
    category: JewelsCategory,
): Promise<CatalogProduct | null> => {
    const url = `${API_BASE}/store/catalog?category=${category}&limit=1&sort=newest`;
    const body = await getJson<{ data?: { products?: CatalogProduct[] } }>(url);
    return body?.data?.products?.[0] ?? null;
};

/** Numeric WooCommerce variation id, needed as ?vid= on the storefront URL. */
const fetchWooId = async (
    productId: string,
    variantId: string | null,
): Promise<string | null> => {
    const body = await getJson<{
        product?: {
            variants?: {
                id: string;
                metadata?: Record<string, string> | null;
            }[];
        };
    }>(`${API_BASE}/store/products/${productId}`);

    const variants = body?.product?.variants;
    if (!variants?.length) return null;

    const variant =
        variants.find((v) => v.id === variantId) ?? variants[0];
    return variant?.metadata?.woo_id ?? null;
};

const resolveStoneOrigin = (
    options: Record<string, string> | null,
): "natural" | "labGrown" | null => {
    const stoneType = options?.["Stone Type"];
    if (!stoneType) return null;
    if (/lab[- ]?grown/i.test(stoneType)) return "labGrown";
    if (/natural/i.test(stoneType)) return "natural";
    return null;
};

/**
 * The six-piece Mother's Day gift edit, ready to render. Returns an empty
 * array if the catalog is unreachable — the page falls back to its
 * "contact our team" panel rather than showing a broken grid.
 */
export const getGiftEditProducts = async (): Promise<GiftEditProduct[]> => {
    const results = await Promise.all(
        GIFT_EDIT.map(async ({ category, handle, stone }) => {
            const product =
                (await fetchByHandle(category, handle, stone)) ??
                (await fetchNewest(category));
            if (!product) return null;

            const metal = product.selected_options?.["Metal"] ?? null;
            const wooId = await fetchWooId(
                product.id,
                product.selected_variant_id,
            );

            return {
                id: product.id,
                title: product.title,
                image: product.previewImage ?? product.thumbnail ?? null,
                price: product.from_price ?? null,
                currency: product.currency ?? "eur",
                metal,
                stoneOrigin: resolveStoneOrigin(product.selected_options),
                detail:
                    [product.shape, product.style]
                        .filter(Boolean)
                        .join(" · ") || null,
                category,
                url: buildProductUrl({
                    category,
                    handle: product.handle,
                    metal,
                    sku: product.selected_sku,
                    wooId,
                }),
            } satisfies GiftEditProduct;
        }),
    );

    // De-duplicate in case two slots fell back to the same newest piece.
    const seen = new Set<string>();
    return results.filter((p): p is GiftEditProduct => {
        if (!p || seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
    });
};
