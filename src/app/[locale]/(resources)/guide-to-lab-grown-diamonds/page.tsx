import React from "react";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import SubFooter from "@/components/shared/SubFooter";
import FAQSection from "@/components/shared/FAQSection";
import BannerImage from "@/assets/fancy-colored-diamonds/banner.png";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type PageProps = {
    params: { locale: string };
};

export async function generateMetadata({
    params: { locale },
}: PageProps): Promise<Metadata> {
    const t = await getTranslations({
        locale,
        namespace: "labGrownDiamondsPage",
    });

    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical: "https://www.uniglodiamonds.com/lab-grown-diamonds",
        },
    };
}

const LabGrownDiamondsPage = async ({ params: { locale } }: PageProps) => {
    const t = await getTranslations({
        locale,
        namespace: "labGrownDiamondsPage",
    });

    const articleData: ArticleSection[] = [
        {
            content: [
                { type: "paragraph", text: t("introPara1") },
                { type: "paragraph", text: t("introPara2") },
                { type: "paragraph", text: t("introPara3") },
            ],
        },
        {
            heading: t("whatAreLabGrown.heading"),
            content: [
                { type: "paragraph", text: t("whatAreLabGrown.para1") },
                { type: "paragraph", text: t("whatAreLabGrown.para2") },
                { type: "paragraph", text: t("whatAreLabGrown.para3") },
                { type: "paragraph", text: t("whatAreLabGrown.para4") },
                { type: "paragraph", text: t("whatAreLabGrown.para5") },
            ],
        },
        {
            heading: t("costSection.heading"),
            content: [
                { type: "paragraph", text: t("costSection.para1") },
                { type: "paragraph", text: t("costSection.para2") },
                { type: "paragraph", text: t("costSection.para3") },
                { type: "paragraph", text: t("costSection.priceRangesHeading") },
                {
                    type: "bullet-list",
                    items: t.raw("costSection.priceRangeBullets") as string[],
                },
                { type: "paragraph", text: t("costSection.para5") },
                { type: "paragraph", text: t("costSection.para6") },
                { type: "paragraph", text: t("costSection.para7") },
            ],
        },
        {
            heading: t("bestPlaceSection.heading"),
            content: [
                { type: "paragraph", text: t("bestPlaceSection.para1") },
                {
                    type: "paragraph",
                    text: t("bestPlaceSection.certificationHeading"),
                },
                {
                    type: "paragraph",
                    text: t("bestPlaceSection.certificationPara1"),
                },
                {
                    type: "bullet-list",
                    items: t.raw(
                        "bestPlaceSection.certificationBullets"
                    ) as string[],
                },
                {
                    type: "paragraph",
                    text: t("bestPlaceSection.certificationPara2"),
                },
                { type: "paragraph", text: t("bestPlaceSection.antwerpHeading") },
                { type: "paragraph", text: t("bestPlaceSection.antwerpPara1") },
                { type: "paragraph", text: t("bestPlaceSection.antwerpPara2") },
                {
                    type: "bullet-list",
                    items: t.raw("bestPlaceSection.antwerpBullets") as string[],
                },
                { type: "paragraph", text: t("bestPlaceSection.directHeading") },
                { type: "paragraph", text: t("bestPlaceSection.directPara1") },
                {
                    type: "bullet-list",
                    items: t.raw("bestPlaceSection.directBullets") as string[],
                },
                { type: "paragraph", text: t("bestPlaceSection.directPara2") },
            ],
        },
        {
            heading: t("whoShouldBuySection.heading"),
            content: [
                {
                    type: "paragraph",
                    text: t("whoShouldBuySection.jewelersHeading"),
                },
                {
                    type: "paragraph",
                    text: t("whoShouldBuySection.jewelersPara1"),
                },
                {
                    type: "bullet-list",
                    items: t.raw(
                        "whoShouldBuySection.jewelersBullets"
                    ) as string[],
                },
                {
                    type: "paragraph",
                    text: t("whoShouldBuySection.brandsHeading"),
                },
                { type: "paragraph", text: t("whoShouldBuySection.brandsPara1") },
                {
                    type: "paragraph",
                    text: t("whoShouldBuySection.privateHeading"),
                },
                {
                    type: "paragraph",
                    text: t("whoShouldBuySection.privatePara1"),
                },
            ],
        },
        {
            heading: t("evaluateSupplierSection.heading"),
            content: [
                { type: "paragraph", text: t("evaluateSupplierSection.para1") },
                {
                    type: "bullet-list",
                    items: t.raw("evaluateSupplierSection.bullets") as string[],
                },
            ],
        },
        {
            heading: t("cvdVsHptSection.heading"),
            content: [
                { type: "paragraph", text: t("cvdVsHptSection.para1") },
                { type: "paragraph", text: t("cvdVsHptSection.cvdPara") },
                { type: "paragraph", text: t("cvdVsHptSection.hphtPara") },
                { type: "paragraph", text: t("cvdVsHptSection.para4") },
            ],
        },
        {
            heading: t("whyUniglo.heading"),
            content: [
                { type: "paragraph", text: t("whyUniglo.para1") },
                {
                    type: "bullet-list",
                    items: t.raw("whyUniglo.bullets") as string[],
                },
            ],
        },
        {
            heading: t("europeMarketSection.heading"),
            content: [
                { type: "paragraph", text: t("europeMarketSection.para1") },
                { type: "paragraph", text: t("europeMarketSection.para2") },
                { type: "paragraph", text: t("europeMarketSection.para3") },
                { type: "paragraph", text: t("europeMarketSection.para4") },
            ],
        },
        {
            heading: t("enquirySection.heading"),
            content: [
                { type: "paragraph", text: t("enquirySection.para1") },
                { type: "paragraph", text: t("enquirySection.para2") },
                {
                    type: "bullet-list",
                    items: t.raw("enquirySection.bullets") as string[],
                },
                { type: "paragraph", text: t("enquirySection.para3") },
                { type: "paragraph", text: t("enquirySection.contactHeading") },
                { type: "paragraph", text: t("enquirySection.address") },
                { type: "paragraph", text: t("enquirySection.email") },
                { type: "paragraph", text: t("enquirySection.phone") },
                { type: "paragraph", text: t("enquirySection.para4") },
                { type: "paragraph", text: t("enquirySection.para5") },
            ],
        },
    ];

    const faqData = t.raw("faqs") as { question: string; answer: string }[];

    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        {t("pageHeading")}
                    </h1>
                    <DynamicArticle sections={articleData} />
                    <FAQSection
                        faqs={faqData}
                        title={t("faqTitle")}
                        className="mt-12"
                    />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default LabGrownDiamondsPage;