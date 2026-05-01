import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Lab Grown vs Natural Diamond Resale Value (2026 Comparison Guide)",
    description:
        "Compare lab grown vs natural diamond resale value in 2026. See real percentages, what affects resale, and what buyers should expect.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/lab-grown-vs-natural-diamond-resale-value",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Resale Value Is a Key Part of the Decision", content: [{ type: "paragraph", text: "Resale is not the only factor, but it shapes expectations for many buyers." }] },
    { heading: "The Real Resale Numbers in 2026", content: [{ type: "paragraph", text: "Lab grown and natural diamonds often follow different resale-retention patterns due to different supply and market structures." }] },
    { heading: "Why Natural Diamonds Retain More Value", content: [{ type: "paragraph", text: "Finite supply and long-established resale channels can support stronger retention in some natural categories." }] },
    { heading: "Why Lab Grown Diamonds Have Lower Retention", content: [{ type: "paragraph", text: "Scalable production and faster pricing adjustments can reduce resale retention in many segments." }] },
    { heading: "Why Neither Option Is Truly an Investment", content: [{ type: "paragraph", text: "Most diamonds are purchased for personal value, not guaranteed financial return." }] },
    { heading: "How Quality Influences Resale in Both Categories", content: [{ type: "paragraph", text: "Higher quality and better documentation tend to perform better regardless of origin." }] },
    { heading: "The Role of Certification in Value Retention", content: [{ type: "paragraph", text: "Certification from recognized labs helps improve trust, comparability, and resale confidence." }] },
    { heading: "Why Selling Channels Affect the Final Price", content: [{ type: "paragraph", text: "Channel choice can materially change outcomes; specialized buyers often evaluate with greater precision." }] },
    { heading: "How Buyers Should Think About Resale", content: [{ type: "paragraph", text: "Treat resale as a secondary factor and align your purchase with your primary goals." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Understanding category-specific resale behavior helps buyers choose with fewer surprises later." }] },
];

const faqData = [
    { question: "Do natural diamonds hold value better than lab grown?", answer: "Often they retain a higher percentage in many markets, though outcomes vary." },
    { question: "What is lab grown resale value like?", answer: "It depends on quality, documentation, and market timing." },
    { question: "What is natural resale value like?", answer: "It varies by quality and demand, often with different retention behavior." },
    { question: "Are diamonds a good investment?", answer: "Most are not purchased as pure investments." },
    { question: "Does quality affect resale value?", answer: "Yes, quality and cut strongly influence resale interest." },
    { question: "Do fancy colors behave differently?", answer: "Yes, rare categories can have distinct market dynamics." },
    { question: "Is certification important for resale?", answer: "Yes, it improves trust and valuation accuracy." },
    { question: "Where should I sell my diamond?", answer: "Specialized channels typically provide more precise offers." },
    { question: "Do lab grown diamonds lose value quickly?", answer: "Some segments can adjust faster due to changing supply." },
    { question: "Should resale affect my purchase decision?", answer: "It should be considered, but balanced against your personal priorities." },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

const BlogPage = () => (
    <div className="min-h-screen mb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
            <div className="flex-1 w-full lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                    Resale Value of Lab Grown Diamonds vs Natural: The Honest Numbers
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
