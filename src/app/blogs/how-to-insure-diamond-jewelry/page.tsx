import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "How to Insure Your Diamond Jewelry (2026 Guide & Cost Tips)",
    description:
        "Learn how to insure diamond jewelry, what it covers, costs, and how to protect your ring or diamonds in 2026.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/how-to-insure-diamond-jewelry",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Diamond Jewelry Insurance Is Often Overlooked", content: [{ type: "paragraph", text: "Many buyers focus on selecting the right diamond but delay protection planning. With more high-value pieces worn daily in 2026, insurance has become an essential ownership step." }] },
    { heading: "What Diamond Jewelry Insurance Actually Covers", content: [{ type: "bullet-list", items: ["Theft", "Loss", "Accidental damage", "Disappearance", "Repair or replacement in some policies"] }] },
    { heading: "Why Standard Insurance May Not Be Enough", content: [{ type: "paragraph", text: "Home or renters policies may have strict jewelry limits. Specialized jewelry insurance is often needed for full-value protection." }] },
    { heading: "The First Step: Get a Proper Valuation", content: [{ type: "paragraph", text: "Use appraisal, purchase documents, and certification reports to establish accurate current value before purchasing coverage." }] },
    { heading: "How Much Does Jewelry Insurance Cost?", content: [{ type: "paragraph", text: "Cost depends on value, location, deductible, and policy structure. It is usually a small annual percentage of item value." }] },
    { heading: "Replacement vs Cash Payout Policies", content: [{ type: "paragraph", text: "Some policies replace with a comparable item, while others provide cash payout. Understand this before buying a policy." }] },
    {
        heading: "Why Documentation Is Critical",
        content: [
            {
                type: "bullet-list",
                items: ["Purchase receipts", "Certification reports", "Photographs", "Appraisal documents"],
            },
        ],
    },
    { heading: "When Should You Get Insurance?", content: [{ type: "paragraph", text: "Immediately after purchase. Delays increase exposure to loss and damage without coverage." }] },
    { heading: "What to Look for in an Insurance Provider", content: [{ type: "bullet-list", items: ["Clear terms", "Simple claims process", "Replacement or payout flexibility", "Reliable support"] }] },
    { heading: "Common Mistakes Buyers Make", content: [{ type: "paragraph", text: "Common issues include underestimating value, skipping appraisal updates, and assuming standard insurance is enough." }] },
    { heading: "How Insurance Fits into Long-Term Ownership", content: [{ type: "paragraph", text: "Insurance should be reviewed over time. As values shift, update appraisals and policy limits to keep protection accurate." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Insurance is a practical protection layer for both financial and emotional value. Most owners never claim, but proper coverage prevents major loss if needed." }] },
];

const faqData = [
    { question: "Do I need insurance for diamond jewelry?", answer: "Yes, especially for high-value pieces." },
    { question: "What does jewelry insurance cover?", answer: "Loss, theft, damage, and disappearance depending on policy terms." },
    { question: "Is home insurance enough?", answer: "Often not for high-value items due to policy limits." },
    { question: "How much does insurance cost?", answer: "Usually a small annual percentage of jewelry value." },
    { question: "Do I need an appraisal?", answer: "Yes, for accurate valuation and coverage." },
    { question: "Can I insure lab grown diamonds?", answer: "Yes, both natural and lab grown can be insured." },
    { question: "What is replacement coverage?", answer: "The insurer replaces the piece with a comparable item." },
    { question: "What documents are needed?", answer: "Receipts, certification, photos, and appraisal records." },
    { question: "When should I get insurance?", answer: "As soon as possible after purchase." },
    { question: "Should I update my policy?", answer: "Yes, as market value changes over time." },
];

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

const BlogPage = () => (
    <div className="min-h-screen mb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
            <div className="flex-1 w-full lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                    How to Insure Your Diamond Jewelry: Complete 2026 Guide
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
