import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/supply-chain/bannerSupply.jpeg";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import EducationSidebar from "@/components/shared/EducationSidebar";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
    title: "Ethical Diamond Sourcing Policy | Uniglo Diamonds",
    description:
        "Learn about Uniglo Diamonds’ commitment to ethical sourcing. We follow RJC standards, Kimberley Process & OECD guidelines for conflict-free diamonds.",
};

const page = () => {
    const t = useTranslations("supplyChainPage");

    const policyData: ArticleSection[] = [
        {
            heading: t("section1Heading"),
            content: [
                { type: "paragraph", text: t("section1Para1") },
                { type: "paragraph", text: t("section1Para2") },
            ],
        },
        {
            heading: t("section2Heading"),
            content: [
                { type: "paragraph", text: t("section2Para1") },
                { type: "paragraph", text: t("section2Intro") },
                {
                    type: "bullet-list",
                    items: t.raw("section2Bullets") as string[],
                },
                { type: "paragraph", text: t("section2Para3") },
            ],
        },
        {
            heading: t("section3Heading"),
            content: [
                { type: "paragraph", text: t("section3Para1") },
                { type: "paragraph", text: t("section3Intro") },
                {
                    type: "numbered-list",
                    items: t.raw("section3Steps") as string[],
                },
                { type: "paragraph", text: t("section3Para3") },
            ],
        },
        {
            heading: t("section4Heading"),
            content: [
                { type: "paragraph", text: t("section4Para1") },
                { type: "paragraph", text: t("section4Para2") },
            ],
        },
        {
            heading: t("section5Heading"),
            content: [
                { type: "paragraph", text: t("section5Para1") },
                { type: "paragraph", text: t("section5Intro") },
                {
                    type: "bullet-list",
                    items: t.raw("section5Bullets") as string[],
                },
                { type: "paragraph", text: t("section5Para3") },
            ],
        },
        {
            heading: t("section6Heading"),
            content: [
                { type: "paragraph", text: t("section6Para1") },
                { type: "paragraph", text: t("section6Intro") },
                {
                    type: "bullet-list",
                    items: t.raw("section6Bullets") as string[],
                },
                { type: "paragraph", text: t("section6Para3") },
            ],
        },
        {
            heading: t("section7Heading"),
            content: [
                { type: "paragraph", text: t("section7Para1") },
                { type: "paragraph", text: t("section7Intro") },
                {
                    type: "bullet-list",
                    items: t.raw("section7Bullets") as string[],
                },
                { type: "paragraph", text: t("section7Para3") },
            ],
        },
        {
            heading: t("section8Heading"),
            content: [
                { type: "paragraph", text: t("section8Para1") },
                { type: "paragraph", text: t("section8Intro") },
                {
                    type: "bullet-list",
                    items: t.raw("section8Bullets") as string[],
                },
                { type: "paragraph", text: t("section8Para3") },
            ],
        },
        {
            heading: t("section9Heading"),
            content: [
                { type: "paragraph", text: t("section9Para1") },
                { type: "paragraph", text: t("section9Intro") },
                {
                    type: "bullet-list",
                    items: t.raw("section9Bullets") as string[],
                },
                { type: "paragraph", text: t("section9Para3") },
            ],
        },
        {
            heading: t("section10Heading"),
            content: [
                { type: "paragraph", text: t("section10Para1") },
                { type: "paragraph", text: t("section10Para2") },
            ],
        },
        {
            heading: t("section11Heading"),
            content: [
                { type: "paragraph", text: t("section11Para1") },
                { type: "paragraph", text: t("section11Para2") },
            ],
        },
        {
            heading: t("section12Heading"),
            content: [
                { type: "paragraph", text: t("section12Para1") },
                { type: "paragraph", text: t("section12Para2") },
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            <BannerSection
                image={BannerImage}
                text={t("pageTitle")}
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 my-20 pb-20 flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-2/3">
                    <div className="text-primary-yellow-1 text-lg font-lora mb-2 uppercase tracking-wider">
                        {t("companyPolicyLabel")}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-10 text-[#1f2732]">
                        {t("pageTitle")}
                    </h1>

                    {/* Render Content Using Generic Component */}
                    <DynamicArticle sections={policyData} />
                </div>

                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </section>
        </div>
    );
};

export default page;