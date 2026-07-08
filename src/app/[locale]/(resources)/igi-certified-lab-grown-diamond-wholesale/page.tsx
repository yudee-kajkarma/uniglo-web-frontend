import React from "react";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import SubFooter from "@/components/shared/SubFooter";
import FAQSection from "@/components/shared/FAQSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
    params: Promise<{ locale: string }> | { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    const locale = resolvedParams.locale;
    const t = await getTranslations({ locale, namespace: "IGICertifiedLabGrownDiamondPage" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
        alternates: {
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}igi-certified-lab-grown-diamond-wholesale`,
        },
    };
}

const IGICertifiedLabGrownDiamondPage = async ({ params }: Props) => {
    const resolvedParams = await Promise.resolve(params);
    const locale = resolvedParams.locale;
    const t = await getTranslations({ locale, namespace: "IGICertifiedLabGrownDiamondPage" });

    // Retrieve translated arrays and objects from the localization json files
    const articleData = t.raw("article") as ArticleSection[];
    const faqData = t.raw("faq") as { question: string; answer: string }[];
    const pageTitle = t("h1");
    const faqSectionTitle = t("faqSectionTitle");

    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        {pageTitle}
                    </h1>
                    <DynamicArticle sections={articleData} />
                    <FAQSection
                        faqs={faqData}
                        title={faqSectionTitle}
                        className="mt-12"
                    />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default IGICertifiedLabGrownDiamondPage;
