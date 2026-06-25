import type { MetadataRoute } from "next";

const BASE_URL = "https://www.uniglodiamonds.com";

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
    "are-lab-grown-diamonds-real",
    "are-lab-grown-diamonds-worth-it",
    "bulk-loose-lab-grown-diamonds",
    "buy-lab-grown-diamonds-wholesale",
    "gia-certified-lab-grown-diamonds",
    "guide-to-lab-grown-diamonds",
    "igi-certified-lab-grown-diamond-wholesale",
    "igi-certified-lab-grown-diamonds",
    "lab-grown-diamond-prices",
    "lab-grown-diamond-supplier",
    "lab-grown-diamond-supplier-europe",
    "lab-grown-diamond-supplier-jewelers",
    "lab-grown-diamonds",
    "lab-grown-diamonds-vs-moissanite",
    "lab-grown-diamonds-vs-natural-diamonds",
    "loose-lab-grown-diamonds",
    "nivoda-lab-grown-diamond-supplier",
    "rapnet-diamond-supplier-antwerp",
    "source-lab-grown-diamonds-for-jewelers",
    "uniglo-diamonds-on-rapnet",
    "wedding-ring-engagement-ring-guide",
    "wholesale-lab-grown-diamonds",
];

const BLOG_SLUGS: string[] = [
    "3-carat-diamond-ring-guide",
    "3-carat-lab-grown-diamond-price-2026",
    "3-carat-natural-diamond-price-2026",
    "4-carat-lab-grown-diamond-price-2026",
    "antwerp-certified-lab-grown-diamonds-hrd-certificate-guide",
    "are-lab-grown-diamonds-ethical",
    "are-lab-grown-diamonds-real",
    "best-diamond-settings-for-engagement-rings",
    "best-diamond-shapes-for-engagement-rings",
    "best-diamond-size-for-engagement-ring",
    "best-place-to-buy-lab-grown-diamonds-antwerp",
    "cheap-diamonds-antwerp-vs-lab-grown-diamond-value",
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
    "how-to-buy-lab-grown-diamond-ring-antwerp",
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
    "lab-grown-diamonds-belgium-buyers-guide",
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
    "where-to-buy-lab-grown-diamonds-online-belgium",
    "why-are-lab-grown-diamonds-cheaper-than-natural",
    "why-are-lab-grown-diamonds-so-expensive",
];

const buildUrl = (path: string) =>
    path ? `${BASE_URL}/${path}` : `${BASE_URL}/`;

export default function sitemap(): MetadataRoute.Sitemap {
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
}
