import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "How to Choose the Perfect Engagement Ring (2026 Complete Guide)",
    description:
        "Not sure how to choose an engagement ring? Learn size, style, diamond quality, and budget tips in this complete 2026 guide.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/how-to-choose-engagement-ring-guide",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Choosing the Right Ring Feels So Overwhelming", content: [{ type: "paragraph", text: "Engagement ring decisions combine emotional significance with technical trade-offs, which can feel overwhelming without a clear sequence." }] },
    { heading: "Step 1: Understand Their Style First", content: [{ type: "paragraph", text: "Start with metal preference, design complexity, and everyday jewelry patterns to align ring style with personality." }] },
    { heading: "Step 2: Choose the Diamond Shape", content: [{ type: "paragraph", text: "Shape defines the ring’s visual identity, from classic round to modern oval or structured step cuts." }] },
    { heading: "Step 3: Set a Realistic Budget", content: [{ type: "paragraph", text: "Use a practical budget and allocate intentionally across diamond quality, size, and setting design." }] },
    { heading: "Step 4: Prioritize the Right Diamond Factors", content: [{ type: "paragraph", text: "Cut should lead for sparkle; color and clarity can be optimized to eye-visible value ranges." }] },
    { heading: "Step 5: Choose the Right Setting", content: [{ type: "paragraph", text: "Setting style changes both aesthetics and practicality. Choose one that complements the center stone." }] },
    { heading: "Step 6: Select the Metal", content: [{ type: "paragraph", text: "White gold, yellow gold, platinum, and rose each shape final tone and wear behavior." }] },
    { heading: "Step 7: Don’t Ignore Ring Size and Comfort", content: [{ type: "paragraph", text: "Fit and comfort matter for daily wear as much as visual design." }] },
    { heading: "Step 8: Always Choose Certified Diamonds", content: [{ type: "paragraph", text: "Certification verifies quality and supports confident comparison between options." }] },
    { heading: "Step 9: Consider Custom vs Ready-Made Rings", content: [{ type: "paragraph", text: "Custom maximizes personalization; ready-made speeds up the process." }] },
    { heading: "Step 10: Take Your Time Before Finalizing", content: [{ type: "paragraph", text: "Use comparison and reflection time to avoid rushed compromises." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "The best engagement ring is the one that aligns style, quality, comfort, and budget with lasting confidence." }] },
];

const faqData = [
    { question: "How do I choose the right engagement ring?", answer: "Start with style, then shape, quality, and setting." },
    { question: "What is most important?", answer: "Cut quality is the strongest visual factor." },
    { question: "How much should I spend?", answer: "Use a budget that fits your financial comfort." },
    { question: "What shape is most popular?", answer: "Round and oval are widely chosen." },
    { question: "Natural or lab grown?", answer: "Both are valid; choose by preference and budget." },
    { question: "Does certification matter?", answer: "Yes, it is essential for verified quality." },
    { question: "Can I customize a ring?", answer: "Yes, custom options are widely available." },
    { question: "What metal is best?", answer: "White gold, yellow gold, and platinum are common choices." },
    { question: "What if I do not know ring size?", answer: "Estimate first and resize if needed." },
    { question: "Online or in-store?", answer: "Both can work with proper verification and transparency." },
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
                    How to Choose the Perfect Engagement Ring: A Complete 2026 Guide
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
