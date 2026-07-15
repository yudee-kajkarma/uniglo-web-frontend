import React from "react";
import Image, { StaticImageData } from "next/image";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

import BannerImage from "@/assets/fancy-colored-diamonds/fancybanner.jpeg";
import BlueDiamondChart from "@/assets/fancy-colored-diamonds/blue-diamonds.png";
import GreenDiamondChart from "@/assets/fancy-colored-diamonds/green-diamonds.png";
import ContactBannerImage from "@/assets/banner_2.jpg";

// NOTE: metadata/canonical left untouched (English only) — same convention
// as the other education pages already wired.
const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Fancy Colored Diamonds | Rare Blue, Yellow & Green Diamonds",
        "description": "Discover fancy colored diamonds at Uniglo. From vivid blues to canary yellow & emerald green, shop GIA-certified gems for unique collections."
    },
    "de": {
        "title": "Fancy Farbige Diamanten | Seltene blaue, gelbe & grüne Diamanten",
        "description": "Entdecken Sie farbige Diamanten (Fancy Diamonds) bei Uniglo. Von leuchtendem Blau über Kanariengelb bis hin zu Smaragdgrün – kaufen Sie GIA-zertifizierte Edelsteine für einzigartige Kollektionen."
    },
    "nl": {
        "title": "Fancy gekleurde diamanten | Zeldzame blauwe, gele & groene diamanten",
        "description": "Ontdek fancy gekleurde diamanten bij Uniglo. Van diepblauw tot kanariegeel & smaragdgroen, vind GIA-gecertificeerde edelstenen voor unieke collecties."
    },
    "fr": {
        "title": "Diamants de couleur fantaisie | Diamants rares bleus, jaunes et verts",
        "description": "Découvrez des diamants de couleur fantaisie chez Uniglo. Du bleu vif au jaune canari et vert émeraude, achetez des gemmes certifiées GIA pour des collections uniques."
    },
    "it": {
        "title": "Diamanti colorati Fancy | Rari diamanti blu, gialli e verdi",
        "description": "Scopri i diamanti colorati fancy di Uniglo. Dal blu vivido al giallo canarino e verde smeraldo, acquista gemme certificate GIA per collezioni uniche."
    },
    "es": {
        "title": "Diamantes de colores de fantasía | Raros diamantes azules, amarillos y verdes",
        "description": "Descubra diamantes de colores de fantasía (fancy) en Uniglo. Desde azules intensos hasta amarillos canario y verdes esmeralda, compre gemas certificadas por GIA para colecciones exclusivas."
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
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}fancy-colored-diamonds`,
        },
    };
}

const Page = async () => {
    const t = await getTranslations("fancyColoredDiamondsPage");

    // Intro
    const introData: ArticleSection[] = [
        {
            heading: t("introHeading"),
            content: [
                { type: "paragraph", text: t("introPara1") },
                { type: "paragraph", text: t("introPara2") },
            ],
        },
    ];

    // Blue
    const blueData: ArticleSection[] = [
        {
            heading: t("blue.introHeading"),
            content: [
                { type: "paragraph", text: t("blue.introPara") },
            ],
        },
        {
            heading: t("blue.originsHeading"),
            content: [
                { type: "paragraph", text: t("blue.originsPara1") },
                { type: "paragraph", text: t("blue.originsPara2") },
                { type: "paragraph", text: t("blue.originsPara3") },
            ],
        },
        {
            heading: t("blue.colorHeading"),
            content: [
                { type: "paragraph", text: t("blue.colorPara1") },
                { type: "paragraph", text: t("blue.colorPara2") },
                { type: "paragraph", text: t("blue.colorPara3") },
                { type: "paragraph", text: t("blue.colorPara4") },
            ],
        },
        {
            heading: t("blue.certHeading"),
            content: [
                { type: "paragraph", text: t("blue.certPara1") },
                { type: "paragraph", text: t("blue.certPara2") },
                {
                    type: "bullet-list",
                    items: t.raw("blue.certBullets") as string[],
                },
                { type: "paragraph", text: t("blue.certPara3") },
            ],
        },
        {
            heading: t("blue.famousHeading"),
            content: [
                { type: "paragraph", text: t("blue.famousPara") },
            ],
        },
        {
            heading: t("blue.investHeading"),
            content: [
                { type: "paragraph", text: t("blue.investPara") },
            ],
        },
    ];

    // Yellow — note "value" section has two bullet lists (suffixed Bullets1/Bullets2)
    const yellowData: ArticleSection[] = [
        {
            heading: t("yellow.introHeading"),
            content: [
                { type: "paragraph", text: t("yellow.introPara") },
            ],
        },
        {
            heading: t("yellow.colorHeading"),
            content: [
                { type: "paragraph", text: t("yellow.colorPara1") },
                { type: "paragraph", text: t("yellow.colorPara2") },
            ],
        },
        {
            heading: t("yellow.gradingHeading"),
            content: [
                { type: "paragraph", text: t("yellow.gradingPara1") },
                {
                    type: "bullet-list",
                    items: t.raw("yellow.gradingBullets") as string[],
                },
                { type: "paragraph", text: t("yellow.gradingPara2") },
                { type: "paragraph", text: t("yellow.gradingPara3") },
            ],
        },
        {
            heading: t("yellow.canaryHeading"),
            content: [
                { type: "paragraph", text: t("yellow.canaryPara1") },
                { type: "paragraph", text: t("yellow.canaryPara2") },
            ],
        },
        {
            heading: t("yellow.valueHeading"),
            content: [
                { type: "paragraph", text: t("yellow.valuePara1") },
                {
                    type: "bullet-list",
                    items: t.raw("yellow.valueBullets1") as string[],
                },
                { type: "paragraph", text: t("yellow.valuePara2") },
                {
                    type: "bullet-list",
                    items: t.raw("yellow.valueBullets2") as string[],
                },
                { type: "paragraph", text: t("yellow.valuePara3") },
            ],
        },
        {
            heading: t("yellow.settingHeading"),
            content: [
                { type: "paragraph", text: t("yellow.settingPara1") },
                {
                    type: "bullet-list",
                    items: t.raw("yellow.settingBullets") as string[],
                },
                { type: "paragraph", text: t("yellow.settingPara2") },
            ],
        },
    ];

    // Green — note "types" section uses paragraph items with inline "1."/"2."
    // rather than a numbered-list type. Preserved as-is.
    const greenData: ArticleSection[] = [
        {
            heading: t("green.introHeading"),
            content: [
                { type: "paragraph", text: t("green.introPara") },
            ],
        },
        {
            heading: t("green.formationHeading"),
            content: [
                { type: "paragraph", text: t("green.formationPara1") },
                { type: "paragraph", text: t("green.formationPara2") },
                { type: "paragraph", text: t("green.formationPara3") },
            ],
        },
        {
            heading: t("green.typesHeading"),
            content: [
                { type: "paragraph", text: t("green.typesPara1") },
                { type: "paragraph", text: t("green.typesPara2") },
                { type: "paragraph", text: t("green.typesPara3") },
                { type: "paragraph", text: t("green.typesPara4") },
            ],
        },
        {
            heading: t("green.investHeading"),
            content: [
                { type: "paragraph", text: t("green.investPara1") },
                { type: "paragraph", text: t("green.investPara2") },
            ],
        },
        {
            heading: t("green.beautyHeading"),
            content: [
                { type: "paragraph", text: t("green.beautyPara") },
            ],
        },
    ];

    // Yellow chart asset is currently missing from the assets folder.
    // Using the existing blue chart as a temporary fallback so the page builds.
    // TODO: replace with src/assets/fancy-colored-diamonds/yellow-diamonds.png
    //       once the yellow chart image is added.
    const YellowDiamondChart: StaticImageData = BlueDiamondChart;

    const coloredDiamondSections: {
        id: string;
        chartImage: StaticImageData;
        chartTitle: string;
        sections: ArticleSection[];
    }[] = [
        {
            id: "blue",
            chartImage: BlueDiamondChart,
            chartTitle: t("charts.blue"),
            sections: blueData,
        },
        {
            id: "yellow",
            chartImage: YellowDiamondChart,
            chartTitle: t("charts.yellow"),
            sections: yellowData,
        },
        {
            id: "green",
            chartImage: GreenDiamondChart,
            chartTitle: t("charts.green"),
            sections: greenData,
        },
    ];

    // Outro — "cert" section has two bullet lists (certBullets / certBullets2)
    const outroData: ArticleSection[] = [
        {
            heading: t("outro.whyHeading"),
            content: [
                { type: "paragraph", text: t("outro.whyPara1") },
                {
                    type: "bullet-list",
                    items: t.raw("outro.whyBullets") as string[],
                },
                { type: "paragraph", text: t("outro.whyPara2") },
                { type: "paragraph", text: t("outro.whyPara3") },
            ],
        },
        {
            heading: t("outro.certHeading"),
            content: [
                { type: "paragraph", text: t("outro.certPara1") },
                { type: "paragraph", text: t("outro.certPara2") },
                {
                    type: "bullet-list",
                    items: t.raw("outro.certBullets") as string[],
                },
                { type: "paragraph", text: t("outro.certPara3") },
                { type: "paragraph", text: t("outro.certPara4") },
                {
                    type: "bullet-list",
                    items: t.raw("outro.certBullets2") as string[],
                },
                { type: "paragraph", text: t("outro.certPara5") },
                { type: "paragraph", text: t("outro.certPara6") },
            ],
        },
    ];

    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-80 text-5xl text-white"
                imageClassName="h-90 object-cover"
            />

            <div className="max-w-[1400px] mx-auto px-4 flex flex-col xl:flex-row gap-12 mt-10">
                <div className="w-full xl:w-3/4">
                    {/* Intro Section */}
                    <section className="mt-10">
                        <DynamicArticle sections={introData} />
                    </section>

                    {/* Colored Diamonds Sections (with chart images preserved) */}
                    <div>
                        {coloredDiamondSections.map((diamond) => (
                            <section
                                key={diamond.id}
                                className="py-20 mt-10 border-t border-slate-200"
                            >
                                <div className="max-w-7xl mx-auto">
                                    {/* Chart Section */}
                                    <div className="mb-16">
                                        <div className="flex justify-center">
                                            <Image
                                                src={diamond.chartImage}
                                                alt={diamond.chartTitle}
                                                className="w-full max-w-7xl h-auto object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Content Section rendered dynamically */}
                                    <div>
                                        <DynamicArticle
                                            sections={diamond.sections}
                                        />
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Outro Section */}
                    <section className="py-20 border-t border-slate-200">
                        <DynamicArticle sections={outroData} />
                    </section>
                </div>

                {/* Sidebar */}
                <div className="w-full xl:w-1/4 pt-10 lg:pt-0">
                    <EducationSidebar className="w-full space-y-10 lg:sticky lg:top-24" />
                </div>
            </div>

            {/* Contact CTA Banner */}
            <section className="w-full container mx-auto relative py-16 px-4 mt-10 mb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={ContactBannerImage}
                        alt="Contact Banner Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center min-h-[150px]">
                    <div className="text-center">
                        <p className="text-white text-xl md:text-2xl font-lora leading-relaxed max-w-4xl">
                            {t("contactBannerText")}{" "}
                            <a
                                href="#contact"
                                className="underline hover:text-[#bb923a] transition-colors font-semibold"
                            >
                                {t("contactBannerLinkText")}
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
