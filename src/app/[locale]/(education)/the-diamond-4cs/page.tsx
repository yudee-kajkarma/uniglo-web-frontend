import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Diagram4Cs from "@/assets/diamond-4cs/image1.png";
import CutBanner from "@/assets/diamond-4cs/cut-banner.jpg";
import ColorScale from "@/assets/diamond-4cs/color-scale.jpg";
import ClarityBanner from "@/assets/diamond-4cs/clarity-banner.jpg";
import CaratBanner from "@/assets/diamond-4cs/carat-banner.jpg";
import AdImage from "@/assets/subFooter/recent-post.png";
import GiaLogo from "@/assets/our-partners/gia-removebg-preview.png";
import HrdLogo from "@/assets/our-partners/hrd-removebg-preview.png";
import IgiLogo from "@/assets/our-partners/igi.jpg";
import { Clock1, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import BannerImage from "@/assets/diamond-4cs/banner4c.jpeg";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { Metadata } from "next";

// NOTE: metadata/canonical left untouched (English only) - consistent with
// the same convention used on the supply-chain-policy page. Flag: en.json
// has no top-level "metadata" namespace at all yet (de.json does have
// metadata.diamond4Cs) - worth adding later if you want localized SEO tags.
const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Understanding the 4Cs of Diamonds | Cut, Color, Clarity, Carat",
        "description": "Master the 4Cs—Cut, Color, Clarity & Carat. Learn how diamond quality affects beauty and value. Buy with confidence at Uniglo Diamonds."
    },
    "de": {
        "title": "Die 4 Cs der Diamanten verstehen | Schliff, Farbe, Reinheit, Karat",
        "description": "Meistern Sie die 4 Cs – Schliff (Cut), Farbe (Color), Reinheit (Clarity) und Karat (Carat). Erfahren Sie, wie die Diamantenqualität Schönheit und Wert beeinflusst. Kaufen Sie vertrauensvoll bei Uniglo Diamonds."
    },
    "nl": {
        "title": "De 4 C's van diamanten begrijpen | Slijpvorm, Kleur, Zuiverheid, Karaat",
        "description": "Beheers de 4 C's – Cut, Color, Clarity & Carat. Leer hoe diamantkwaliteit invloed heeft op schoonheid en waarde. Koop met vertrouwen bij Uniglo Diamonds."
    },
    "fr": {
        "title": "Comprendre les 4C des diamants | Taille, Couleur, Pureté, Carat",
        "description": "Maîtrisez les 4C : taille (Cut), couleur (Color), pureté (Clarity) et carat (Carat). Découvrez comment la qualité d'un diamant influence sa beauté et sa valeur. Achetez en toute confiance chez Uniglo Diamonds."
    },
    "it": {
        "title": "Capire le 4C dei diamanti | Taglio, Colore, Purezza, Carato",
        "description": "Scopri le 4C: Taglio, Colore, Purezza e Carato. Impara come la qualità del diamante influisce su bellezza e valore. Acquista con fiducia su Uniglo Diamonds."
    },
    "es": {
        "title": "Comprender las 4C de los diamantes | Corte, Color, Claridad, Quilates",
        "description": "Domine las 4C: corte, color, claridad y quilates. Aprenda cómo afecta la calidad del diamante a su belleza y valor. Compre con confianza en Uniglo Diamonds."
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
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}the-diamond-4cs`,
        },
    };
}

const Page = async () => {
    const t = await getTranslations("diamond4CsPage");

    const introData: ArticleSection[] = [
        {
            heading: t("introHeading"),
            content: [
                { type: "paragraph", text: t("introPara1") },
                { type: "paragraph", text: t("introPara2") },
                { type: "paragraph", text: t("introPara3") },
            ],
        },
    ];

    const cutData1: ArticleSection[] = [
        {
            heading: t("cutHeading"),
            content: [
                { type: "paragraph", text: t("cutPara1") },
                { type: "paragraph", text: t("cutPara2") },
                {
                    type: "bullet-list",
                    items: t.raw("cutBullets1") as string[],
                },
                { type: "paragraph", text: t("cutPara3") },
                { type: "paragraph", text: t("cutPara4") },
                {
                    type: "bullet-list",
                    items: t.raw("cutBullets2") as string[],
                },
            ],
        },
    ];

    const cutData2: ArticleSection[] = [
        {
            content: [
                { type: "paragraph", text: t("cutPara5") },
                { type: "paragraph", text: t("cutPara6") },
            ],
        },
    ];

    const colorData1: ArticleSection[] = [
        {
            heading: t("colorHeading"),
            content: [
                { type: "paragraph", text: t("colorPara1") },
                { type: "paragraph", text: t("colorPara2") },
            ],
        },
    ];

    const colorData2: ArticleSection[] = [
        {
            heading: t("colorGradesHeading"),
            content: [
                {
                    type: "bullet-list",
                    items: t.raw("colorBullets") as string[],
                },
                { type: "paragraph", text: t("colorPara3") },
                { type: "paragraph", text: t("colorPara4") },
                { type: "paragraph", text: t("colorPara5") },
            ],
        },
    ];

    const clarityData1: ArticleSection[] = [
        {
            heading: t("clarityHeading"),
            content: [
                { type: "paragraph", text: t("clarityPara1") },
                { type: "paragraph", text: t("clarityPara2") },
                { type: "paragraph", text: t("clarityPara3") },
            ],
        },
    ];

    const clarityData2: ArticleSection[] = [
        {
            heading: t("clarityScaleHeading"),
            content: [
                {
                    type: "bullet-list",
                    items: t.raw("clarityBullets") as string[],
                },
                { type: "paragraph", text: t("clarityPara4") },
                { type: "paragraph", text: t("clarityPara5") },
            ],
        },
    ];

    const caratData1: ArticleSection[] = [
        {
            heading: t("caratHeading"),
            content: [
                { type: "paragraph", text: t("caratPara1") },
                { type: "paragraph", text: t("caratPara2") },
            ],
        },
    ];

    const caratData2: ArticleSection[] = [
        {
            content: [
                { type: "paragraph", text: t("caratExampleIntro") },
                {
                    type: "bullet-list",
                    items: t.raw("caratExampleBullets") as string[],
                },
                { type: "paragraph", text: t("caratKaratPara") },
                { type: "paragraph", text: t("caratTcwPara") },
                { type: "paragraph", text: t("caratChoosingPara") },
            ],
        },
        {
            heading: t("whyMattersHeading"),
            content: [
                { type: "paragraph", text: t("whyMattersIntro") },
                {
                    type: "bullet-list",
                    items: t.raw("whyMattersBullets") as string[],
                },
                { type: "paragraph", text: t("whyMattersPara") },
            ],
        },
        {
            heading: t("certifiedHeading"),
            content: [
                { type: "paragraph", text: t("certifiedPara1") },
                { type: "paragraph", text: t("certifiedPara2") },
            ],
        },
        {
            heading: t("browseHeading"),
            content: [
                { type: "paragraph", text: t("browsePara1") },
                { type: "paragraph", text: t("browsePara2") },
            ],
        },
        {
            heading: t("finalHeading"),
            content: [
                { type: "paragraph", text: t("finalPara1") },
                { type: "paragraph", text: t("finalPara2") },
            ],
        },
    ];

    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-90 text-5xl"
                imageClassName="h-100 object-cover"
            />
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 mt-10">
                {/* Main Content Column */}
                <div className="w-full lg:w-2/3 pb-10">
                    {/* Intro Section */}
                    <div className="mb-10 flex justify-center">
                        <Image
                            src={Diagram4Cs}
                            alt={t("diagramAlt")}
                            className="max-w-md w-full h-auto object-contain"
                        />
                    </div>

                    <div className="mb-12">
                        <DynamicArticle sections={introData} />
                    </div>

                    {/* 1. Cut */}
                    <div className="mb-12">
                        <DynamicArticle sections={cutData1} />

                        <div className="relative w-full h-40 my-8 overflow-hidden">
                            <Image
                                src={CutBanner}
                                alt={t("cutBannerAlt")}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    {t("cutBannerCaption")}
                                </p>
                            </div>
                        </div>

                        <DynamicArticle sections={cutData2} />
                    </div>

                    {/* 2. Color */}
                    <div className="mb-12">
                        <DynamicArticle sections={colorData1} />

                        <div className="my-8">
                            <Image
                                src={ColorScale}
                                alt={t("colorScaleAlt")}
                                className="w-full h-auto object-cover "
                            />
                        </div>

                        <DynamicArticle sections={colorData2} />
                    </div>

                    {/* 3. Clarity */}
                    <div className="mb-12">
                        <DynamicArticle sections={clarityData1} />

                        <div className="relative w-full h-32 my-8 overflow-hidden">
                            <Image
                                src={ClarityBanner}
                                alt={t("clarityBannerAlt")}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    {t("clarityBannerCaption")}
                                </p>
                            </div>
                        </div>

                        <DynamicArticle sections={clarityData2} />
                    </div>

                    {/* 4. Carat */}
                    <div className="mb-12">
                        <DynamicArticle sections={caratData1} />

                        <div className="relative w-full h-32 my-8 overflow-hidden">
                            <Image
                                src={CaratBanner}
                                alt={t("caratBannerAlt")}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    {t("caratBannerCaption")}
                                </p>
                            </div>
                        </div>

                        <DynamicArticle sections={caratData2} />
                    </div>
                </div>

                {/* Sidebar Column */}
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default Page;