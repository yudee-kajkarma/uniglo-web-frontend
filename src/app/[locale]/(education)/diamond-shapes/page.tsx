import React from "react";
import Image, { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import BannerImage from "@/assets/diamond-shape/banner.jpeg";
import SubFooter from "@/components/shared/SubFooter";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

// Diamond shape images
import RoundDiamonds from "@/assets/shapes/round.png";
import PrincessDiamonds from "@/assets/shapes/princess.png";
import CushionDiamonds from "@/assets/shapes/cushion.png";
import EmeraldDiamonds from "@/assets/shapes/emerald.png";
import OvalDiamonds from "@/assets/shapes/oval.png";
import RadiantDiamonds from "@/assets/shapes/radiant.png";
import AssherDiamonds from "@/assets/shapes/asscher.png";
import MarquiseDiamonds from "@/assets/shapes/marquise.png";
import HeartDiamonds from "@/assets/shapes/heart.png";
import PearDiamonds from "@/assets/shapes/pear.png";
import { Metadata } from "next";

// NOTE: metadata/canonical left untouched (English only) - same convention
// as the other education pages already wired.
export const metadata: Metadata = {
    title: "Guide to Diamond Shapes | Round, Princess, Cushion & More",
    description:
        "Explore popular diamond shapes—from Round Brilliant to Emerald & Heart cuts. Discover how each shape impacts sparkle, style & value.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/diamond-shapes",
    },
};

type ShapeSection = {
    key: string;
    image: StaticImageData;
    content: ArticleSection[];
};

const Page = async () => {
    const t = await getTranslations("diamondShapesPage");

    const introData: ArticleSection[] = [
        {
            heading: t("introHeading"),
            content: [
                { type: "paragraph", text: t("introPara1") },
                { type: "paragraph", text: t("introPara2") },
                { type: "paragraph", text: t("introPara3") },
            ],
        },
        {
            heading: t("shapeVsCutHeading"),
            content: [
                { type: "paragraph", text: t("shapeVsCutPara1") },
                {
                    type: "bullet-list",
                    items: t.raw("shapeVsCutBullets") as string[],
                },
                { type: "paragraph", text: t("shapeVsCutPara2") },
                { type: "paragraph", text: t("shapeVsCutPara3") },
            ],
        },
        {
            heading: t("ratioHeading"),
            content: [
                { type: "paragraph", text: t("ratioPara1") },
                {
                    type: "bullet-list",
                    items: t.raw("ratioBullets") as string[],
                },
                { type: "paragraph", text: t("ratioPara2") },
            ],
        },
        {
            heading: t("popularHeading"),
            content: [{ type: "paragraph", text: t("popularPara1") }],
        },
    ];

    // Every shape follows the same structure: heading, 1-2 intro paragraphs,
    // "why choose" heading, bullets, closing paragraph. Marquise only has
    // ONE intro paragraph in the original content (flagged below).
    const buildShapeContent = (
        shapeKey: string,
        hasSecondPara = true,
    ): ArticleSection[] => {
        const paragraphs: ArticleSection["content"] = [
            { type: "paragraph", text: t(`shapes.${shapeKey}.para1`) },
        ];
        if (hasSecondPara) {
            paragraphs.push({
                type: "paragraph",
                text: t(`shapes.${shapeKey}.para2`),
            });
        }
        return [
            {
                heading: t(`shapes.${shapeKey}.heading`),
                content: paragraphs,
            },
            {
                heading: t(`shapes.${shapeKey}.whyHeading`),
                content: [
                    {
                        type: "bullet-list",
                        items: t.raw(`shapes.${shapeKey}.whyBullets`) as string[],
                    },
                    {
                        type: "paragraph",
                        text: t(`shapes.${shapeKey}.whyPara`),
                    },
                ],
            },
        ];
    };

    const shapeSections: ShapeSection[] = [
        { key: "round", image: RoundDiamonds, content: buildShapeContent("round") },
        { key: "princess", image: PrincessDiamonds, content: buildShapeContent("princess") },
        { key: "cushion", image: CushionDiamonds, content: buildShapeContent("cushion") },
        { key: "emerald", image: EmeraldDiamonds, content: buildShapeContent("emerald") },
        { key: "oval", image: OvalDiamonds, content: buildShapeContent("oval") },
        { key: "radiant", image: RadiantDiamonds, content: buildShapeContent("radiant") },
        { key: "asscher", image: AssherDiamonds, content: buildShapeContent("asscher") },
        // Marquise only has ONE intro paragraph in the original content
        { key: "marquise", image: MarquiseDiamonds, content: buildShapeContent("marquise", false) },
        { key: "heart", image: HeartDiamonds, content: buildShapeContent("heart") },
        { key: "pear", image: PearDiamonds, content: buildShapeContent("pear") },
    ];

    const outroData: ArticleSection[] = [
        {
            heading: t("financeHeading"),
            content: [
                { type: "paragraph", text: t("financePara1") },
                { type: "paragraph", text: t("financeIntro") },
                {
                    type: "bullet-list",
                    items: t.raw("financeBullets") as string[],
                },
                { type: "paragraph", text: t("financePara2") },
            ],
        },
        {
            heading: t("howToChooseHeading"),
            content: [
                { type: "paragraph", text: t("howToChoosePara1") },
                {
                    type: "numbered-list",
                    items: t.raw("howToChooseNumbered") as string[],
                },
                { type: "paragraph", text: t("howToChoosePara2") },
            ],
        },
        {
            heading: t("finalHeading"),
            content: [
                { type: "paragraph", text: t("finalPara1") },
                { type: "paragraph", text: t("finalPara2") },
                { type: "paragraph", text: t("finalPara3") },
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            <div className="max-w-[1400px] mx-auto px-4 flex flex-col xl:flex-row gap-12 mt-10 mb-20">
                <div className="w-full xl:w-3/4">
                    {/* Intro Section Rendering */}
                    <div className="mb-20">
                        <DynamicArticle sections={introData} />
                    </div>

                    {/* Shapes Iteration (Image & Text side by side) */}
                    <div className="space-y-20 border-t border-b border-slate-200 py-20 mb-20">
                        {shapeSections.map((shape, idx) => (
                            <div
                                key={shape.key}
                                className={`flex flex-col md:flex-row items-center md:items-start gap-12 ${
                                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                {/* Image side */}
                                <div className="w-full md:w-1/3 flex justify-center lg:sticky lg:top-24">
                                    <div className="bg-slate-50 border border-slate-200 p-8 w-full max-w-sm flex items-center justify-center rounded-sm">
                                        <Image
                                            src={shape.image}
                                            alt={t(`shapes.${shape.key}.name`)}
                                            className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-2/3">
                                    <DynamicArticle sections={shape.content} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Outro & Financing Section Rendering */}
                    <div>
                        <DynamicArticle sections={outroData} />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full xl:w-1/4">
                    <EducationSidebar className="w-full space-y-10 sticky top-24" />
                </div>
            </div>
        </div>
    );
};

export default Page;