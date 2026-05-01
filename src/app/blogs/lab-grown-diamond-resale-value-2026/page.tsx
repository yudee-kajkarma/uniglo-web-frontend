import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Lab Grown Diamond Resale Value: What You Will Actually Get (2026 Guide)",
    description:
        "Thinking of selling a lab grown diamond? Learn real resale value, what affects price, and how to get the best offer in 2026.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/lab-grown-diamond-resale-value-2026",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Resale Reality Is Different from Buying Experience", content: [{ type: "paragraph", text: "Buying emphasizes emotion and presentation. Resale emphasizes verifiable quality, demand, and liquidity." }] },
    { heading: "What You Can Expect to Get in 2026", content: [{ type: "paragraph", text: "Resale outcomes vary, but quality and documentation strongly influence offers and buyer confidence." }] },
    { heading: "Why the Resale Percentage Is Lower", content: [{ type: "paragraph", text: "Growing supply and improving production efficiency can influence secondary-market pricing." }] },
    { heading: "The Importance of Certification When Selling", content: [{ type: "paragraph", text: "A recognized grading report helps buyers assess risk and compare value quickly." }] },
    { heading: "Why Where You Sell Matters", content: [{ type: "paragraph", text: "Specialized channels generally evaluate diamonds more accurately than general-purpose channels." }] },
    { heading: "How Quality Influences Resale Value", content: [{ type: "paragraph", text: "Higher quality and stronger grading tend to attract better interest in resale markets." }] },
    { heading: "Why Documentation Beyond Certification Helps", content: [{ type: "paragraph", text: "Invoices, records, and complete documentation can improve trust and transactional clarity." }] },
    { heading: "How Antwerp-Based Valuation Differs", content: [{ type: "paragraph", text: "Markets with deeper specialization may provide more precise valuation frameworks." }] },
    { heading: "Why Expectations Need to Be Realistic", content: [{ type: "paragraph", text: "Resale market behavior differs from retail and should be approached with realistic expectations." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Knowing resale mechanics in advance helps sellers navigate the process more confidently." }] },
];

const faqData = [
    { question: "What is the resale value of lab grown diamonds?", answer: "It varies by quality, documentation, and current market demand." },
    { question: "Why is resale lower than retail?", answer: "Retail includes markups and service layers not carried into secondary sales." },
    { question: "Does certification affect resale value?", answer: "Yes, certification usually improves buyer confidence." },
    { question: "Where should I sell my diamond?", answer: "Specialized buyers often provide better-informed valuations." },
    { question: "Do larger diamonds resell better?", answer: "Higher-quality larger stones can attract stronger demand." },
    { question: "Can I sell without a certificate?", answer: "Yes, but uncertified stones may receive weaker offers." },
    { question: "Does cut quality matter when selling?", answer: "Yes, cut affects visual appeal and valuation." },
    { question: "Why do pawn shops often offer less?", answer: "They may apply broader risk margins and simpler pricing models." },
    { question: "Is Antwerp better for valuation?", answer: "It is known for specialized diamond expertise." },
    { question: "Should I expect full purchase price back?", answer: "No, resale values are usually below retail purchase prices." },
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
                    Lab Grown Diamonds Resale Value: What You Will Actually Get When You Sell
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
