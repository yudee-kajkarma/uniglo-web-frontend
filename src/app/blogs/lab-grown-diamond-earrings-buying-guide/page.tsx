import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Lab Grown Diamond Earrings Guide 2026: Studs, Hoops & Buying Tips",
    description:
        "Looking for lab grown diamond earrings? Learn how to choose studs, hoops, sizes, and quality in this complete 2026 buying guide.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/lab-grown-diamond-earrings-buying-guide",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Diamond Earrings Are the Most Versatile Jewelry Piece", content: [{ type: "paragraph", text: "Diamond earrings work across daily and formal use. Lab grown options broaden style and size flexibility within budget." }] },
    { heading: "The Main Types of Lab Grown Diamond Earrings", content: [{ type: "paragraph", text: "Studs are timeless, hoops add motion and presence, and drops create vertical elegance for stronger statement wear." }] },
    { heading: "Understanding Total Carat Weight", content: [{ type: "paragraph", text: "TCW is combined weight across all diamonds in the pair. Visual impact per stone depends on style and distribution." }] },
    { heading: "Why Matching Matters in Stud Earrings", content: [{ type: "paragraph", text: "Stud pairs should match tightly in size, cut, color, and clarity to look balanced on both sides." }] },
    { heading: "Cut Quality and Its Impact on Appearance", content: [{ type: "paragraph", text: "Cut quality controls visible sparkle and should be prioritized over headline carat where possible." }] },
    { heading: "Choosing the Right Color and Clarity", content: [{ type: "paragraph", text: "Near-colorless and eye-clean ranges are popular for value-performance balance, especially when matched consistently." }] },
    { heading: "Setting Styles and Security", content: [{ type: "paragraph", text: "Prong settings maximize light; bezel settings increase protection. Choose based on wear profile and durability needs." }] },
    { heading: "Metal Choices and Their Effect", content: [{ type: "paragraph", text: "White, yellow, and rose metals each shift the visual tone and contrast of the diamonds." }] },
    { heading: "Why Certification Still Matters", content: [{ type: "paragraph", text: "Certification supports confidence in higher-value pieces and helps compare quality transparently." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "The best earrings combine matching, cut performance, secure setting, and comfort." }] },
];

const faqData = [
    { question: "What are lab grown diamond earrings?", answer: "Earrings featuring diamonds made in laboratory-controlled conditions." },
    { question: "What styles are available?", answer: "Studs, hoops, and drop earrings are the main categories." },
    { question: "What is TCW?", answer: "Total carat weight, the combined diamond weight in the pair." },
    { question: "Why is matching important for studs?", answer: "It keeps both sides visually consistent." },
    { question: "What cut is best?", answer: "Excellent or ideal cut is commonly preferred for strong sparkle." },
    { question: "What color grade is recommended?", answer: "Near-colorless ranges are popular for appearance and value." },
    { question: "Are lab grown earrings durable?", answer: "Yes, the diamonds are durable like natural diamonds." },
    { question: "Do earrings need certification?", answer: "Yes, especially for higher-value pieces." },
    { question: "What metal is best?", answer: "White gold, platinum, and yellow gold are all common choices." },
    { question: "What should I prioritize?", answer: "Matching, cut quality, setting security, and comfort." },
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
                    Lab Grown Diamond Earrings: How to Choose the Perfect Pair in 2026
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
