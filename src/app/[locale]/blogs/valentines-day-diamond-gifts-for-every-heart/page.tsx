import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// Localized Page Metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "circleOfLoveBlog",
    });

    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical:
                "https://www.uniglodiamonds.com/blogs/circle-of-love-valentines-day-diamonds",
        },
    };
}

const BlogPage = () => {
    const t = useTranslations("circleOfLoveBlog");
    
    // Retrieve translated sections array
    const articleData = t.raw("sections") as ArticleSection[];

    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        {t("title")}
                    </h1>
                    <DynamicArticle sections={articleData} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;