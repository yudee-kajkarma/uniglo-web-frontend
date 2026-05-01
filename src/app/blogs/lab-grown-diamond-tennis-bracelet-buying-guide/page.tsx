import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Lab Grown Diamond Tennis Bracelet Guide 2026: Size, Quality & Tips",
    description:
        "Buying a lab grown diamond tennis bracelet? Learn how to choose size, diamond quality, settings, and what to look for in 2026.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/lab-grown-diamond-tennis-bracelet-buying-guide",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Tennis Bracelets Are a Modern Staple", content: [{ type: "paragraph", text: "Lab grown options have made tennis bracelets more accessible while keeping the same luxury visual language." }] },
    { heading: "Why Diamond Matching Is Everything", content: [{ type: "paragraph", text: "Consistency in color, clarity, and size across stones defines quality more than any single diamond in the bracelet." }] },
    { heading: "Understanding Total Carat Weight", content: [{ type: "paragraph", text: "Total carat is distributed across many stones. Individual stone size determines visual texture and statement level." }] },
    { heading: "Choosing the Right Diamond Size", content: [{ type: "paragraph", text: "Smaller stones suit daily comfort; larger stones create stronger visual impact." }] },
    { heading: "Setting Styles and Their Impact", content: [{ type: "paragraph", text: "Four-prong enhances brilliance, channel improves protection and daily durability." }] },
    { heading: "Why Consistent Color and Clarity Matter", content: [{ type: "paragraph", text: "Uniform grading ranges preserve a continuous sparkle line." }] },
    { heading: "Metal Choices and Their Influence", content: [{ type: "paragraph", text: "White metals provide modern brightness; yellow and rose add warmth and character." }] },
    { heading: "Why Craftsmanship Is Critical", content: [{ type: "paragraph", text: "Link engineering, setting security, and finish quality determine both durability and feel." }] },
    { heading: "Certification and Quality Assurance", content: [{ type: "paragraph", text: "Overall quality assurance and transparent stone sourcing are essential in multi-stone jewelry." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "The best tennis bracelet is about harmony across stones, secure construction, and comfortable fit." }] },
];

const faqData = [
    { question: "What is a lab grown diamond tennis bracelet?", answer: "A bracelet with a continuous line of lab grown diamonds." },
    { question: "What is total carat weight?", answer: "Combined weight of all stones in the bracelet." },
    { question: "Why is matching important?", answer: "It ensures seamless and uniform appearance." },
    { question: "What setting is best?", answer: "Four-prong for sparkle, channel for durability." },
    { question: "Are they good for daily wear?", answer: "Yes, with appropriate setting and build quality." },
    { question: "What color range is recommended?", answer: "Consistent near-colorless ranges are commonly used." },
    { question: "Do they need certification?", answer: "Yes, quality assurance is important for trust and comparison." },
    { question: "What metal is best?", answer: "Platinum, white gold, and yellow gold are common options." },
    { question: "How should it fit?", answer: "Comfortably with slight movement." },
    { question: "What should I prioritize?", answer: "Matching, craftsmanship, setting security, and fit." },
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
                    Lab Grown Diamond Tennis Bracelets: How to Choose the Right One
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
