import React from "react";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
    params: Promise<{ locale: string }> | { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    const locale = resolvedParams.locale;
    const t = await getTranslations({ locale, namespace: "BlogPage" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
        alternates: {
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}blog/lab-grown-diamonds-belgium-buyers-guide`,
        },
    };
}

const BlogPage = async ({ params }: Props) => {
    const resolvedParams = await Promise.resolve(params);
    const locale = resolvedParams.locale;
    const t = await getTranslations({ locale, namespace: "BlogPage" });

    // Retrieve translated arrays and objects from the localization json files
    const articleData = t.raw("article") as ArticleSection[];
    const faqData = t.raw("faq") as { question: string; answer: string }[];
    const pageTitle = t("h1");
    const faqSectionTitle = t("faqSectionTitle");

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: t("blogSchemaHeadline"),
        description: t("blogSchemaDescription"),
        image: "https://www.uniglodiamonds.com/images/lab-grown-diamonds-belgium-buyers-guide.jpg",
        author: {
            "@type": "Organization",
            name: "Uniglo Diamonds",
        },
        publisher: {
            "@type": "Organization",
            name: "Uniglo Diamonds",
            logo: {
                "@type": "ImageObject",
                url: "https://www.uniglodiamonds.com/logo.png",
            },
        },
        datePublished: "2026-06-03",
        dateModified: "2026-06-03",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}blog/lab-grown-diamonds-belgium-buyers-guide`,
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: t("breadcrumbSchemaListItem3"),
                item: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}blog/lab-grown-diamonds-belgium-buyers-guide`,
            },
        ],
    };

    return (
        <div className="min-h-screen mb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
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

export default BlogPage;
