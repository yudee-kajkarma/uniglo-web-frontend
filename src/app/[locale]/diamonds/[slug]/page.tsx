import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import DiamondDetailView from "@/components/inventory/DiamondDetailView";
import DiamondSeoContent from "@/components/seo/DiamondSeoContent";
import { getPublicDiamondByStockRef } from "@/lib/seo/diamondServer";
import {
    getStockRefFromSlug,
    getDiamondPrimaryImage,
    getDiamondType,
    buildDiamondPath,
} from "@/lib/seo/diamondSeo";
import { buildDiamondJsonLd, jsonLdString } from "@/lib/seo/schema";
import { localeAlternates, localizedUrl } from "@/lib/seo/site";
import {
    type DiamondSeoMessages,
    type DiamondValueMessages,
    fillDiamondTemplate,
    getDiamondTemplateValues,
} from "@/lib/i18n/diamondDetail";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: "diamondDetail" });
    const seo = t.raw("seo") as DiamondSeoMessages;
    const stockRef = getStockRefFromSlug(slug);
    const result = stockRef
        ? await getPublicDiamondByStockRef(stockRef)
        : null;

    if (!result) {
        return {
            title: seo.notFoundTitle,
            robots: { index: false, follow: true },
        };
    }

    const { diamond } = result;
    const valueMessages = t.raw("values") as DiamondValueMessages;
    const values = getDiamondTemplateValues(diamond, valueMessages);
    const title = fillDiamondTemplate(seo.metaTitle, values);
    const description = fillDiamondTemplate(seo.metaDescription, values);
    const path = buildDiamondPath(diamond).replace(/^\//, "");
    const url = localizedUrl(locale, path);
    const image = getDiamondPrimaryImage(diamond);

    return {
        title,
        description,
        alternates: localeAlternates(path, locale),
        robots: { index: true, follow: true },
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
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: "diamondDetail" });
    const stockRef = getStockRefFromSlug(slug);
    if (!stockRef) notFound();

    const result = await getPublicDiamondByStockRef(stockRef);
    if (!result) notFound();

    const { diamond, similarStockRefs } = result;
    const seo = t.raw("seo") as DiamondSeoMessages;
    const valueMessages = t.raw("values") as DiamondValueMessages;
    const values = getDiamondTemplateValues(diamond, valueMessages);
    const title = fillDiamondTemplate(seo.metaTitle, values);
    const description = fillDiamondTemplate(seo.metaDescription, values);
    const productName = fillDiamondTemplate(seo.title, values);
    const path = buildDiamondPath(diamond).replace(/^\//, "");
    const url = localizedUrl(locale, path);
    const jsonLd = buildDiamondJsonLd(diamond, {
        url,
        title,
        description,
        productName,
        homeLabel: t("ui.home"),
    });
    const isNatural = getDiamondType(diamond) === "Natural";
    const hubPath = isNatural ? "/diamonds/natural" : "/diamonds/lab-grown";
    const hubLabel = isNatural
        ? t("ui.naturalDiamonds")
        : t("ui.labGrownDiamonds");

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
                    {t("ui.home")}
                </Link>
                {" / "}
                <Link href={hubPath} className="hover:underline">
                    {hubLabel}
                </Link>
                {" / "}
                <span className="text-gray-700">{diamond.stockRef}</span>
            </nav>
            <DiamondDetailView
                diamondId={diamond.stockRef}
                initialDiamond={diamond}
                initialSimilarIds={similarStockRefs}
                seoContent={<DiamondSeoContent diamond={diamond} />}
            />
        </>
    );
}
