import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

import BannerImage from "@/assets/ethical-diamonds/bannerNewEthical.jpeg";

// NOTE: metadata/canonical left untouched (English only) — same convention
// as the other education pages already wired.
export const metadata: Metadata = {
    title: "Ethical & Conflict-Free Diamonds | Kimberley Process Certified",
    description:
        "Buy 100% ethically sourced, conflict-free natural diamonds from Uniglo. We follow Kimberley Process & World Diamond Council standards.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/ethical-diamonds",
    },
};

const Page = async () => {
    const t = await getTranslations("ethicalDiamondsPage");

    // Section 1
    const ethicalData1: ArticleSection[] = [
        {
            heading: t("section1.introHeading"),
            content: [
                { type: "paragraph", text: t("section1.introPara1") },
                { type: "paragraph", text: t("section1.introPara2") },
                { type: "paragraph", text: t("section1.introPara3") },
            ],
        },
        {
            heading: t("section1.meaningHeading"),
            content: [
                { type: "paragraph", text: t("section1.meaningPara1") },
                { type: "paragraph", text: t("section1.meaningPara2") },
                { type: "paragraph", text: t("section1.meaningPara3") },
            ],
        },
        {
            heading: t("section1.standardsHeading"),
            content: [
                { type: "paragraph", text: t("section1.standardsPara1") },
                { type: "paragraph", text: t("section1.standardsPara2") },
                { type: "paragraph", text: t("section1.standardsPara3") },
            ],
        },
        {
            heading: t("section1.screeningHeading"),
            content: [
                { type: "paragraph", text: t("section1.screeningPara1") },
                { type: "paragraph", text: t("section1.screeningPara2") },
                {
                    type: "bullet-list",
                    items: t.raw("section1.screeningBullets") as string[],
                },
                { type: "paragraph", text: t("section1.screeningPara3") },
                { type: "paragraph", text: t("section1.screeningPara4") },
                { type: "paragraph", text: t("section1.screeningPara5") },
            ],
        },
    ];

    // Section 2
    const ethicalData2: ArticleSection[] = [
        {
            heading: t("section2.sourcingHeading"),
            content: [
                { type: "paragraph", text: t("section2.sourcingPara1") },
                {
                    type: "bullet-list",
                    items: t.raw("section2.sourcingBullets") as string[],
                },
                { type: "paragraph", text: t("section2.sourcingPara2") },
                { type: "paragraph", text: t("section2.sourcingPara3") },
            ],
        },
        {
            heading: t("section2.excellenceHeading"),
            content: [
                { type: "paragraph", text: t("section2.excellencePara1") },
                {
                    type: "bullet-list",
                    items: t.raw("section2.excellenceBullets") as string[],
                },
                { type: "paragraph", text: t("section2.excellencePara2") },
                { type: "paragraph", text: t("section2.excellencePara3") },
                { type: "paragraph", text: t("section2.excellencePara4") },
            ],
        },
        {
            heading: t("section2.transparencyHeading"),
            content: [
                { type: "paragraph", text: t("section2.transparencyPara1") },
                { type: "paragraph", text: t("section2.transparencyPara2") },
                { type: "paragraph", text: t("section2.transparencyPara3") },
            ],
        },
        {
            heading: t("section2.mattersHeading"),
            content: [
                { type: "paragraph", text: t("section2.mattersPara1") },
                { type: "paragraph", text: t("section2.mattersPara2") },
                { type: "paragraph", text: t("section2.mattersPara3") },
            ],
        },
    ];

    // Trust section — original had: heading → para → "Every diamond reflects:" → bullets → close → final
    const trustData: ArticleSection[] = [
        {
            heading: t("trust.heading"),
            content: [
                { type: "paragraph", text: t("trust.introPara") },
                { type: "paragraph", text: t("trust.introPara2") },
                {
                    type: "bullet-list",
                    items: t.raw("trust.pillars") as string[],
                },
                { type: "paragraph", text: t("trust.pillarsClosingPara") },
                { type: "paragraph", text: t("trust.closingPara") },
            ],
        },
    ];

    // Translated commitments list (14 items)
    const commitments = t.raw("commitments.items") as string[];

    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            <div className="max-w-[1400px] mx-auto px-4 flex flex-col xl:flex-row gap-12 mt-20 mb-20">
                <div className="w-full xl:w-3/4">
                    {/* Article Section 1 */}
                    <section className="mb-10">
                        <DynamicArticle sections={ethicalData1} />
                    </section>

                    {/* Article Section 2 */}
                    <section className="mb-20">
                        <DynamicArticle sections={ethicalData2} />
                    </section>

                    {/* Trust Content Section */}
                    <section className="mb-20">
                        <DynamicArticle sections={trustData} />
                    </section>

                    {/* Commitments List */}
                    <section className="mb-20">
                        <h2 className="text-3xl font-lora mb-8">
                            {t("commitments.heading")}
                        </h2>
                        <ul className="space-y-3 list-disc pl-6">
                            {commitments.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="text-slate-700 leading-relaxed"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
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
