import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MelleDiamondDetailView from "@/components/inventory/MelleDiamondDetailView";
import MelleSeoContent from "@/components/seo/MelleSeoContent";
import { getPublicMelleById } from "@/lib/seo/diamondServer";
import {
    getMelleIdFromSlug,
    getMelleMetaTitle,
    getMelleMetaDescription,
    getMellePrimaryImage,
    buildMelleUrl,
} from "@/lib/seo/diamondSeo";
import { buildMelleJsonLd, jsonLdString } from "@/lib/seo/schema";

// On-demand ISR: lazily generated on first request, cached, revalidated hourly.
// Empty generateStaticParams opts into the static/ISR pipeline with nothing
// prebuilt.
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
    const id = getMelleIdFromSlug(slug);
    const melle = id ? await getPublicMelleById(id) : null;

    if (!melle) {
        return {
            title: "Melee Diamonds Not Found | Uniglo Diamonds",
            robots: { index: false, follow: true },
        };
    }

    const title = getMelleMetaTitle(melle);
    const description = getMelleMetaDescription(melle);
    const url = buildMelleUrl(melle);
    const image = getMellePrimaryImage(melle);

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

export default async function MeleePage({ params }: PageProps) {
    const { slug } = await params;
    const id = getMelleIdFromSlug(slug);
    if (!id) notFound();

    const melle = await getPublicMelleById(id);
    if (!melle) notFound();

    const jsonLd = buildMelleJsonLd(melle);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
            />
            <nav
                aria-label="Breadcrumb"
                className="max-w-7xl mx-auto px-4 pt-4 text-xs text-gray-500 font-lato"
            >
                <Link href="/" className="hover:underline">
                    Home
                </Link>
                {" / "}
                <Link href="/diamonds/melee" className="hover:underline">
                    Melee Diamonds
                </Link>
                {" / "}
                <span className="text-gray-700">{melle.stockId}</span>
            </nav>
            <MelleDiamondDetailView
                diamondId={melle._id}
                initialDiamond={melle}
                seoContent={<MelleSeoContent melle={melle} />}
            />
        </>
    );
}
