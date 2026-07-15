import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import EducationSidebar from "@/components/shared/EducationSidebar";

import BannerImage from "@/assets/old-diamonds/banner.jpg";
import SingleCutDiagram from "@/assets/old-diamonds/single-cut-diagram.png";
import RoseCutImage from "@/assets/old-diamonds/single-cut.png";
import OldMineCutImage from "@/assets/old-diamonds/old-mine-cut.png";
import OldEuropeanCutImage from "@/assets/old-diamonds/old-european-cut.png";
import ModernRoundBrilliantImage from "@/assets/old-diamonds/modern-round-brilliant.jpg";

// NOTE: metadata/canonical left untouched (English only) — same convention
// as the other education pages already wired.
const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Old Cut Diamonds | Antique & Vintage Diamond Cuts | Uniglo",
        "description": "Discover antique cut diamonds—from Rose to Old European & Old Mine cuts. Explore vintage stones with unique fire, romance & timeless elegance."
    },
    "de": {
        "title": "Altschliff-Diamanten | Antike & Vintage-Diamantschliffe | Uniglo",
        "description": "Entdecken Sie Diamanten im Altschliff – vom Rosenschliff über den Altschliff (Old European) bis hin zum Minenschliff (Old Mine). Entdecken Sie Vintage-Steine mit einzigartigem Feuer, Romantik und zeitloser Eleganz."
    },
    "nl": {
        "title": "Oud geslepen diamanten | Antieke & vintage diamantslijpsels | Uniglo",
        "description": "Ontdek antiek geslepen diamanten – van roosslijpsel tot Old European & Old Mine cuts. Ontdek vintage stenen met uniek vuur, romantiek & tijdloze elegantie."
    },
    "fr": {
        "title": "Diamants de taille ancienne | Tailles de diamants anciennes et vintage | Uniglo",
        "description": "Découvrez les diamants de taille ancienne, de la taille Rose aux tailles Old European et Old Mine. Explorez des pierres vintage au feu unique, romantiques et d'une élégance intemporelle."
    },
    "it": {
        "title": "Diamanti a taglio antico | Tagli di diamanti antichi e vintage | Uniglo",
        "description": "Scopri i diamanti a taglio antico: dal taglio a rosetta all'Old European e all'Old Mine. Esplora pietre vintage dal fuoco unico, romantiche e dall'eleganza senza tempo."
    },
    "es": {
        "title": "Diamantes de corte antiguo | Cortes de diamantes antigos y vintage | Uniglo",
        "description": "Descubra diamantes de corte antiguo: desde el corte rosa hasta los cortes Old European y Old Mine. Explore piedras vintage con fuego único, romance y elegancia atemporal."
    }
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = translations[locale] || translations.en;

    return {
        title: t.title,
        description: t.description,
        alternates: {
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}old-cut-diamonds`,
        },
    };
}

const Page = async () => {
    const t = await getTranslations("oldCutDiamondsPage");

    // NOTE: articles[0] (Single Cut) and oldCutTypes[0] (Old Mine Cut) are
    // duplicates of hardcoded data in the JSX sections below. They are
    // technically dead data (the slice(1, 2) pattern only renders the second
    // entry of each). Preserved for structural compatibility with the original
    // code, but the hardcoded sections are the ones actually displayed.
    const articles = [
        {
            title: t("singleCut.title"),
            subtitle: t("singleCut.label"),
            paragraphs: [t("singleCut.paragraph")],
            image: {
                src: SingleCutDiagram.src,
                alt: t("singleCut.diagramAlt"),
            },
            reverse: true,
            floatImages: true,
        },
        {
            title: t("roseCut.title"),
            subtitle: t("roseCut.label"),
            paragraphs: [
                t("roseCut.paragraph1"),
                t("roseCut.paragraph2"),
            ],
            image: {
                src: RoseCutImage.src,
                alt: t("roseCut.imageAlt"),
            },
            reverse: true,
            floatImages: true,
        },
    ];

    const oldCutTypes = [
        {
            title: t("oldMineCut.title"),
            description: t("oldMineCut.paragraph"),
            image: OldMineCutImage,
            reverse: false,
        },
        {
            title: t("oldEuropeanCut.title"),
            description: "",
            additionalText: "",
            image: OldEuropeanCutImage,
            reverse: true,
        },
    ];

    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row gap-12 mt-10 mb-20">
                <div className="w-full xl:w-3/4">
                    {/* Introduction Section */}
                    <section className="mt-10 mb-16">
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                            <p>{t("intro.para1")}</p>
                            <p>{t("intro.para2")}</p>
                            <p>{t("intro.para3")}</p>
                        </div>
                    </section>

                    {/* Antique Cuts Diagram Section (Single Cut rendered as hardcoded JSX) */}
                    <section className="max-w-7xl mx-auto px-10 mb-20">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            {/* Left: Diagrams */}
                            <div className="flex-1">
                                <Image
                                    src={SingleCutDiagram}
                                    alt={t("singleCut.diagramAlt")}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            {/* Right: Single Cut Article */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <h4 className="text-[#bb923a] font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                        {t("singleCut.label")}
                                    </h4>
                                    <span className="w-12 h-px bg-[#bb923a]"></span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                    {t("singleCut.title")}
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed font-lora text-justify">
                                    {t("singleCut.paragraph")}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Rose Cut Article */}
                    <section className="max-w-7xl mx-auto px-10 mb-20">
                        {articles.slice(1, 2).map((article, idx) => (
                            <ArticleLayout key={idx} {...article} />
                        ))}
                    </section>

                    {/* Old Mine Cut Banner Section (data hardcoded, rendered directly) */}
                    <section className="w-full bg-primary-purple-dark flex flex-col md:flex-row items-center justify-between my-16">
                        <div className="md:w-1/2 w-full h-full flex flex-col justify-center z-10 px-8 py-10 md:py-0 md:pl-20 max-w-7xl mx-auto">
                            <h2 className="text-white text-3xl md:text-6xl font-cormorantGaramond font-semibold mb-6">
                                {t("oldMineCut.title")}
                            </h2>
                            <p className="text-white/90 font-lora text-lg max-w-2xl">
                                {t("oldMineCut.paragraph")}
                            </p>
                        </div>
                        <div className="hidden md:w-1/2 w-full h-full md:flex justify-end relative mt-10 md:mt-0">
                            <Image
                                src={OldMineCutImage}
                                alt={t("oldMineCut.imageAlt")}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-primary-purple-dark via-primary-purple-dark/80 to-transparent pointer-events-none" />
                        </div>
                    </section>

                    {/* Old European Cut Article */}
                    <section className="max-w-7xl mx-auto px-10 mb-20">
                        {oldCutTypes.slice(1, 2).map((article, idx) => (
                            <ArticleLayout
                                key={idx}
                                title={article.title}
                                subtitle={t("oldEuropeanCut.label")}
                                paragraphs={t.raw(
                                    "oldEuropeanCut.paragraphs",
                                ) as string[]}
                                image={article.image}
                                reverse={article.reverse}
                            />
                        ))}
                    </section>

                    {/* Modern Round Brilliant Cut Banner Section */}
                    <section className="w-full relative py-24 px-4 overflow-hidden">
                        <div className="absolute inset-0">
                            <Image
                                src={ModernRoundBrilliantImage}
                                alt={t("modernRoundBrilliant.imageAlt")}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60"></div>
                        </div>

                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="flex items-center gap-12">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h4 className="text-[#bb923a] font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                            {t("modernRoundBrilliant.label")}
                                        </h4>
                                        <span className="w-12 h-px bg-[#bb923a]"></span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-white mb-8 leading-[1.1]">
                                        {t("modernRoundBrilliant.title")}
                                    </h2>
                                    <div className="space-y-6 text-white/90 font-lora text-lg leading-relaxed">
                                        <p>
                                            {t(
                                                "modernRoundBrilliant.paragraph1",
                                            )}
                                        </p>
                                        <p>
                                            {t(
                                                "modernRoundBrilliant.paragraph2",
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* Sidebar */}
                <div className="w-full xl:w-1/4">
                    <EducationSidebar className="w-full space-y-10 xl:sticky xl:top-24" />
                </div>
            </div>
        </div>
    );
};

export default Page;
