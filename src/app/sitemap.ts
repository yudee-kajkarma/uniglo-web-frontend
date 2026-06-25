import type { MetadataRoute } from "next";
import {
    getDiamondTotalCount,
    getMelleTotalCount,
    getDiamondSitemapPage,
    getMelleSitemapPage,
} from "@/lib/seo/diamondServer";
import { buildDiamondUrl, buildMelleUrl } from "@/lib/seo/diamondSeo";

const BASE_URL = "https://www.uniglodiamonds.com";

// Records per dynamic sitemap shard. A sitemap may hold up to 50k URLs; we use
// a smaller page so each upstream fetch stays light and cacheable.
const SHARD_SIZE = 5000;
// Safety cap so a bad upstream count can't spawn unbounded shards.
const MAX_SHARDS_PER_TYPE = 60;

// Revalidate the generated sitemaps hourly (matches the page ISR window).
export const revalidate = 3600;

const HOME: string[] = [""];

const TOP_LEVEL_PAGES: string[] = [
    "about",
    "contact-us",
    "sell-your-diamonds",
    "privacy-policy",
    "terms-and-conditions",
    "inventory",
    "blogs",
];

const SERVICES_PAGES: string[] = [
    "diamond-manufacturing",
    "the-best-price-for-your-diamonds",
    "diamond-financing-options",
    "investment-diamonds",
    "partners",
    "security-seals",
];

const EDUCATION_PAGES: string[] = [
    "the-diamond-4cs",
    "diamond-certificates",
    "diamond-shapes",
    "fancy-colored-diamonds",
    "ethical-diamonds",
    "conflict-free-diamonds",
    "old-cut-diamonds",
    "supply-chain-policy-procedure",
];

const RESOURCES_PAGES: string[] = [
    "bulk-loose-lab-grown-diamonds",
    "buy-lab-grown-diamonds-wholesale",
    "guide-to-lab-grown-diamonds",
    "igi-certified-lab-grown-diamond-wholesale",
    "lab-grown-diamond-supplier-europe",
    "lab-grown-diamond-supplier-jewelers",
    "nivoda-lab-grown-diamond-supplier",
    "rapnet-diamond-supplier-antwerp",
    "source-lab-grown-diamonds-for-jewelers",
    "uniglo-diamonds-on-rapnet",
    "wedding-ring-engagement-ring-guide",
];

const BLOG_SLUGS: string[] = [
    "3-carat-diamond-ring-guide",
    "3-carat-lab-grown-diamond-price-2026",
    "3-carat-natural-diamond-price-2026",
    "4-carat-lab-grown-diamond-price-2026",
    "are-lab-grown-diamonds-ethical",
    "are-lab-grown-diamonds-real",
    "best-diamond-settings-for-engagement-rings",
    "best-diamond-shapes-for-engagement-rings",
    "best-diamond-size-for-engagement-ring",
    "circle-of-love-valentines-day-diamonds",
    "custom-diamond-jewelry-design-guide-2026",
    "cvd-vs-hpht-diamonds-which-is-better",
    "diamond-buying-checklist-2026",
    "diamond-certification-vs-appraisal",
    "diamond-color-vs-clarity-which-matters",
    "diamond-cut-vs-clarity-which-matters",
    "diamond-cut-vs-color-which-matters",
    "diamond-fluorescence-explained-good-or-bad",
    "diamond-resale-value-guide",
    "diamonds-are-not-made-from-coal",
    "disadvantages-of-lab-grown-diamonds",
    "do-lab-grown-diamonds-hold-value",
    "do-lab-grown-diamonds-pass-diamond-tester",
    "gia-certified-lab-grown-diamonds-guide",
    "how-are-lab-grown-diamonds-made-cvd-vs-hpht",
    "how-to-buy-diamond-online-safely",
    "how-to-choose-engagement-ring-guide",
    "how-to-clean-diamond-jewelry-at-home",
    "how-to-insure-diamond-jewelry",
    "how-to-know-if-diamond-ring-is-real",
    "how-to-measure-ring-size-at-home",
    "how-to-spot-fake-diamond",
    "how-to-store-diamond-jewelry-safely",
    "how-to-tell-if-a-diamond-is-real-at-home",
    "jewellery-that-speaks-love-valentines-day",
    "lab-grown-diamond-earrings-buying-guide",
    "lab-grown-diamond-engagement-rings",
    "lab-grown-diamond-necklace-buying-guide",
    "lab-grown-diamond-resale-value-2026",
    "lab-grown-diamond-rings-buying-guide-2026",
    "lab-grown-diamond-tennis-bracelet-buying-guide",
    "lab-grown-diamonds-in-belgium",
    "lab-grown-vs-natural-diamond-price-2026",
    "lab-grown-vs-natural-diamond-resale-value",
    "little-sparks-forever-love-valentines-day",
    "looks-expensive-diamond-edit",
    "natural-diamond-necklace-buying-guide",
    "natural-diamond-rings-buying-guide-2026",
    "natural-diamond-stud-earrings-buying-guide",
    "natural-diamond-tennis-bracelet-buying-guide",
    "natural-vs-lab-grown-diamonds-guide",
    "oval-diamond-obsession",
    "radiant-cut-diamond-guide",
    "si-vs-vs-diamonds-which-better",
    "vs-vs-vvs-diamonds-difference",
    "what-are-the-4-types-of-diamonds",
    "what-does-a-real-diamond-look-like",
    "what-is-a-lab-grown-diamond-guide",
    "what-is-diamond-certification-gia-vs-igi",
    "why-are-lab-grown-diamonds-cheaper-than-natural",
    "why-are-lab-grown-diamonds-so-expensive",
];

const buildUrl = (path: string) =>
    path ? `${BASE_URL}/${path}` : `${BASE_URL}/`;

const shardCount = (total: number) =>
    Math.min(MAX_SHARDS_PER_TYPE, Math.ceil(total / SHARD_SIZE));

// Loose diamonds are sharded by origin (natural vs lab) so each emitted URL
// carries the correct type keyword — matching the page's canonical — without a
// per-diamond lookup.
const planShards = async (): Promise<{
    natural: number;
    lab: number;
    melle: number;
}> => {
    try {
        const [naturalCount, labCount, melleCount] = await Promise.all([
            getDiamondTotalCount(true),
            getDiamondTotalCount(false),
            getMelleTotalCount(),
        ]);
        return {
            natural: shardCount(naturalCount),
            lab: shardCount(labCount),
            melle: shardCount(melleCount),
        };
    } catch (err) {
        console.error("[sitemap] failed to plan shards:", err);
        return { natural: 0, lab: 0, melle: 0 };
    }
};

/**
 * Shard plan:
 *   id 0                         -> static marketing/content pages
 *   id 1 .. N                    -> natural loose diamond pages
 *   id N+1 .. N+L                -> lab grown loose diamond pages
 *   id N+L+1 .. N+L+M            -> melee diamond pages
 */
export async function generateSitemaps(): Promise<{ id: number }[]> {
    const { natural, lab, melle } = await planShards();
    const ids = [{ id: 0 }];
    for (let i = 1; i <= natural + lab + melle; i++) ids.push({ id: i });
    return ids;
}

const staticEntries = (): MetadataRoute.Sitemap => {
    const lastModified = new Date();
    const entry = (
        path: string,
        priority: number,
        changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    ): MetadataRoute.Sitemap[number] => ({
        url: buildUrl(path),
        lastModified,
        changeFrequency,
        priority,
    });

    return [
        ...HOME.map((p) => entry(p, 1.0, "weekly")),
        ...TOP_LEVEL_PAGES.map((p) => entry(p, 0.8, "monthly")),
        ...SERVICES_PAGES.map((p) => entry(p, 0.8, "monthly")),
        ...EDUCATION_PAGES.map((p) => entry(p, 0.8, "monthly")),
        ...RESOURCES_PAGES.map((p) => entry(p, 0.7, "monthly")),
        ...BLOG_SLUGS.map((slug) => entry(`blogs/${slug}`, 0.64, "monthly")),
    ];
};

export default async function sitemap({
    id,
}: {
    id: number;
}): Promise<MetadataRoute.Sitemap> {
    const shardId = Number(id);
    if (!Number.isFinite(shardId) || shardId <= 0) return staticEntries();

    try {
        const { natural, lab } = await planShards();

        const diamondEntry = (isNatural: boolean, page: number) =>
            getDiamondSitemapPage(page, SHARD_SIZE, isNatural).then(({ items }) =>
                items
                    .filter((d) => d.stockRef)
                    .map((d) => ({
                        url: buildDiamondUrl(d, isNatural),
                        lastModified:
                            (d as { updatedAt?: string }).updatedAt ?? undefined,
                        changeFrequency: "weekly" as const,
                        priority: 0.6,
                    })),
            );

        if (shardId <= natural) {
            return diamondEntry(true, shardId);
        }
        if (shardId <= natural + lab) {
            return diamondEntry(false, shardId - natural);
        }

        const mellePage = shardId - natural - lab;
        if (mellePage < 1) return [];
        const { items } = await getMelleSitemapPage(mellePage, SHARD_SIZE);
        return items
            .filter((m) => m._id)
            .map((m) => ({
                url: buildMelleUrl(m),
                lastModified: m.updatedAt ?? undefined,
                changeFrequency: "weekly" as const,
                priority: 0.5,
            }));
    } catch (err) {
        console.error("[sitemap] shard", id, "failed:", err);
        return [];
    }
}
