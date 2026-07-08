import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DiamondDetailView from "@/components/inventory/DiamondDetailView";
import DiamondSeoContent from "@/components/seo/DiamondSeoContent";
import { getPublicDiamondByStockRef } from "@/lib/seo/diamondServer";
import {
    getStockRefFromSlug,
    getDiamondMetaTitle,
    getDiamondMetaDescription,
    getDiamondPrimaryImage,
    buildDiamondUrl,
} from "@/lib/seo/diamondSeo";
import { buildDiamondJsonLd, jsonLdString } from "@/lib/seo/schema";

// On-demand ISR: nothing is prebuilt, each diamond page is generated lazily on
// first request and cached, then revalidated hourly. Returning an empty
// generateStaticParams opts the route into the static/ISR pipeline without
// prebuilding any paths.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    return [];
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const stockRef = getStockRefFromSlug(slug);
    const result = stockRef
        ? await getPublicDiamondByStockRef(stockRef)
        : null;

    if (!result) {
        return {
            title: "Diamond Not Found | Uniglo Diamonds",
            robots: { index: false, follow: true },
        };
    }

    const { diamond } = result;
    const title = getDiamondMetaTitle(diamond);
    const description = getDiamondMetaDescription(diamond);
    const url = buildDiamondUrl(diamond);
    const image = getDiamondPrimaryImage(diamond);

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: "website",
            siteName: "Uniglo Diamonds",
            images: image ? [{ url: image }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}

export default async function DiamondPage({ params }: PageProps) {
    const { slug } = await params;
    const stockRef = getStockRefFromSlug(slug);
    if (!stockRef) notFound();

    const result = await getPublicDiamondByStockRef(stockRef);
    if (!result) notFound();

    const { diamond, similarStockRefs } = result;
    const jsonLd = buildDiamondJsonLd(diamond);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
            />
            <DiamondDetailView
                diamondId={diamond.stockRef}
                initialDiamond={diamond}
                initialSimilarIds={similarStockRefs}
                seoContent={<DiamondSeoContent diamond={diamond} />}
            />
        </>
    );
}
