// components/seo/DiamondHubPage.tsx
//
// Server-rendered, crawlable hub/listing pages for the diamond catalogue.
// These pages exist so every /diamonds/[slug] detail page is reachable
// through plain <a href> links (hub -> detail), giving search engines a
// crawl path and internal link signals the client-rendered /inventory grid
// cannot provide. Keep them lightweight: text links, no client JS.

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    getDiamondSitemapPage,
    getMelleSitemapPage,
} from "@/lib/seo/diamondServer";
import {
    buildDiamondPath,
    buildMellePath,
    formatCarat,
    labName,
    SITE_URL,
} from "@/lib/seo/diamondSeo";
import { getShapeFullName } from "@/interface/diamondInterface";

export const HUB_PAGE_SIZE = 100;

export type HubKind = "natural" | "lab-grown" | "melee";

const HUBS: Record<
    HubKind,
    { path: string; heading: string; title: string; description: string }
> = {
    natural: {
        path: "/diamonds/natural",
        heading: "Natural Diamonds",
        title: "Natural Diamonds | Certified Loose Stones | Uniglo Diamonds",
        description:
            "Browse our full inventory of certified natural loose diamonds. Every stone is independently graded and available for wholesale enquiry in Antwerp.",
    },
    "lab-grown": {
        path: "/diamonds/lab-grown",
        heading: "Lab Grown Diamonds",
        title: "Lab Grown Diamonds | Certified Loose Stones | Uniglo Diamonds",
        description:
            "Browse our full inventory of certified lab grown loose diamonds. IGI and GIA graded stones available for wholesale enquiry in Antwerp.",
    },
    melee: {
        path: "/diamonds/melee",
        heading: "Melee Diamonds",
        title: "Melee Diamonds | Wholesale Parcels | Uniglo Diamonds",
        description:
            "Browse our melee diamond parcels — natural and lab grown, sorted by sieve size, colour and clarity. Available for wholesale enquiry.",
    },
};

/** Parse and validate the ?page= search param; null means invalid. */
export const parseHubPage = (raw?: string): number | null => {
    if (raw === undefined) return 1;
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1) return null;
    return n;
};

const hubPageUrl = (hub: HubKind, page: number): string =>
    page <= 1 ? HUBS[hub].path : `${HUBS[hub].path}?page=${page}`;

/** Metadata (title/canonical/robots) for a hub page. */
export const hubMetadata = (hub: HubKind, page: number | null): Metadata => {
    if (page === null) return { robots: { index: false, follow: false } };
    const def = HUBS[hub];
    const suffix = page > 1 ? ` – Page ${page}` : "";
    return {
        title: def.title.replace(" |", `${suffix} |`),
        description: def.description,
        alternates: { canonical: `${SITE_URL}${hubPageUrl(hub, page)}` },
        robots: { index: true, follow: true },
    };
};

/** Window of page numbers around the current page: 1 … p-2..p+2 … last */
const pageWindow = (current: number, total: number): number[] => {
    const pages = new Set<number>([1, total]);
    for (let p = current - 2; p <= current + 2; p++) {
        if (p >= 1 && p <= total) pages.add(p);
    }
    return [...pages].sort((a, b) => a - b);
};

function HubPagination({
    hub,
    page,
    totalPages,
}: {
    hub: HubKind;
    page: number;
    totalPages: number;
}) {
    if (totalPages <= 1) return null;
    const numbers = pageWindow(page, totalPages);
    return (
        <nav
            aria-label="Pagination"
            className="flex flex-wrap items-center gap-2 pt-8 text-sm"
        >
            {page > 1 && (
                <Link
                    href={hubPageUrl(hub, page - 1)}
                    className="px-3 py-1.5 border border-gray-300 rounded hover:border-gray-500 transition-colors"
                >
                    ← Previous
                </Link>
            )}
            {numbers.map((n, i) => (
                <span key={n} className="flex items-center gap-2">
                    {i > 0 && numbers[i - 1] !== n - 1 && (
                        <span className="text-gray-400">…</span>
                    )}
                    {n === page ? (
                        <span className="px-3 py-1.5 bg-gray-900 text-white rounded">
                            {n}
                        </span>
                    ) : (
                        <Link
                            href={hubPageUrl(hub, n)}
                            className="px-3 py-1.5 border border-gray-300 rounded hover:border-gray-500 transition-colors"
                        >
                            {n}
                        </Link>
                    )}
                </span>
            ))}
            {page < totalPages && (
                <Link
                    href={hubPageUrl(hub, page + 1)}
                    className="px-3 py-1.5 border border-gray-300 rounded hover:border-gray-500 transition-colors"
                >
                    Next →
                </Link>
            )}
        </nav>
    );
}

function HubShell({
    hub,
    page,
    totalPages,
    totalRecords,
    children,
}: {
    hub: HubKind;
    page: number;
    totalPages: number;
    totalRecords: number;
    children: React.ReactNode;
}) {
    const def = HUBS[hub];
    const others = (Object.keys(HUBS) as HubKind[]).filter((k) => k !== hub);
    return (
        <main className="max-w-6xl mx-auto px-4 py-10 font-lato">
            <h1 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-gray-900">
                {def.heading}
            </h1>
            <p className="mt-3 text-sm text-gray-600 max-w-3xl">
                {def.description}
            </p>
            <p className="mt-2 text-xs text-gray-500">
                {totalRecords.toLocaleString()} stones · page {page} of{" "}
                {totalPages} ·{" "}
                <Link href="/inventory" className="underline hover:text-gray-800">
                    search &amp; filter the full inventory
                </Link>
            </p>

            {children}

            <HubPagination hub={hub} page={page} totalPages={totalPages} />

            <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-2">
                <span className="font-medium text-gray-800">
                    Browse more:
                </span>
                {others.map((k) => (
                    <Link
                        key={k}
                        href={HUBS[k].path}
                        className="underline hover:text-gray-900"
                    >
                        {HUBS[k].heading}
                    </Link>
                ))}
                <Link href="/inventory" className="underline hover:text-gray-900">
                    Full Inventory
                </Link>
            </div>
        </main>
    );
}

/** Loose-diamond hub (natural or lab grown). */
export async function DiamondHubPage({
    hub,
    page,
}: {
    hub: "natural" | "lab-grown";
    page: number | null;
}) {
    if (page === null) notFound();
    const isNatural = hub === "natural";
    const { items, totalRecords } = await getDiamondSitemapPage(
        page,
        HUB_PAGE_SIZE,
        isNatural,
    );
    const totalPages = Math.max(1, Math.ceil(totalRecords / HUB_PAGE_SIZE));
    if (page > totalPages) notFound();

    const stones = items.filter((d) => d.stockRef);

    return (
        <HubShell
            hub={hub}
            page={page}
            totalPages={totalPages}
            totalRecords={totalRecords}
        >
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {stones.map((d) => (
                    <li key={d.stockRef}>
                        <Link
                            href={buildDiamondPath(d, isNatural)}
                            className="text-gray-800 hover:text-primary-yellow-1 underline-offset-2 hover:underline"
                        >
                            {formatCarat(d.weight)} Carat{" "}
                            {getShapeFullName(d.shape)}{" "}
                            {isNatural ? "Natural" : "Lab Grown"} Diamond –{" "}
                            {d.color} {d.clarity}, {labName(d.lab)} Certified
                        </Link>{" "}
                        <span className="text-gray-400 text-xs">
                            {d.stockRef}
                        </span>
                    </li>
                ))}
            </ul>
        </HubShell>
    );
}

/** Melee-diamond hub. */
export async function MelleHubPage({ page }: { page: number | null }) {
    if (page === null) notFound();
    const { items, totalRecords } = await getMelleSitemapPage(
        page,
        HUB_PAGE_SIZE,
    );
    const totalPages = Math.max(1, Math.ceil(totalRecords / HUB_PAGE_SIZE));
    if (page > totalPages) notFound();

    const parcels = items.filter((m) => m._id);

    return (
        <HubShell
            hub="melee"
            page={page}
            totalPages={totalPages}
            totalRecords={totalRecords}
        >
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {parcels.map((m) => (
                    <li key={m._id}>
                        <Link
                            href={buildMellePath(m)}
                            className="text-gray-800 hover:text-primary-yellow-1 underline-offset-2 hover:underline"
                        >
                            {m.isLab ? "Lab Grown" : "Natural"} {m.shape}{" "}
                            Melee Diamonds – {m.color} {m.clarity}
                        </Link>{" "}
                        <span className="text-gray-400 text-xs">
                            {m.stockId}
                        </span>
                    </li>
                ))}
            </ul>
        </HubShell>
    );
}
