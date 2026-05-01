import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Diamond Buying Checklist 2026: What to Know Before You Buy",
    description:
        "Use this diamond buying checklist before you purchase. Learn what to check, avoid mistakes, and choose the best diamond in 2026.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/diamond-buying-checklist-2026",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why a Checklist Makes the Entire Process Easier", content: [{ type: "paragraph", text: "A checklist simplifies complex buying decisions by breaking them into clear steps and reducing guesswork." }] },
    { heading: "Step 1: Define Your Purpose Before Anything Else", content: [{ type: "paragraph", text: "Clarify whether the purchase is for an engagement, gift, or long-term piece. Purpose shapes all later decisions." }] },
    { heading: "Step 2: Set a Budget That Works for You", content: [{ type: "paragraph", text: "Set a comfortable spending range and optimize value inside it, rather than following outdated spending rules." }] },
    { heading: "Step 3: Choose the Diamond Shape First", content: [{ type: "paragraph", text: "Shape is the strongest visual identity factor and helps narrow the rest of the decision process." }] },
    { heading: "Step 4: Prioritize Cut Quality", content: [{ type: "paragraph", text: "Cut quality has the biggest effect on brightness and sparkle. It should be a top priority." }] },
    { heading: "Step 5: Balance Color and Clarity", content: [{ type: "paragraph", text: "Target practical value ranges such as near-colorless and eye-clean clarity instead of maximum grades." }] },
    { heading: "Step 6: Decide on Carat Weight Based on Proportion", content: [{ type: "paragraph", text: "Choose carat based on overall appearance and hand proportion, not number alone." }] },
    { heading: "Step 7: Always Check Certification", content: [{ type: "paragraph", text: "Use recognized lab certification to verify quality and compare options accurately." }] },
    { heading: "Step 8: Review Images or See the Diamond Clearly", content: [{ type: "paragraph", text: "Visual review connects technical specs to real appearance and helps avoid surprises." }] },
    { heading: "Step 9: Choose the Right Setting", content: [{ type: "paragraph", text: "Select a setting that complements the stone and fits daily wear needs." }] },
    { heading: "Step 10: Consider Natural vs Lab Grown Options", content: [{ type: "paragraph", text: "Both are real diamonds. Choose based on rarity preference, budget flexibility, and long-term goals." }] },
    {
        heading: "Step 11: Check Policies and After-Sale Support",
        content: [
            { type: "bullet-list", items: ["Return policy", "Warranty or maintenance support", "Upgrade options"] },
        ],
    },
    { heading: "Step 12: Take Time Before Making the Final Decision", content: [{ type: "paragraph", text: "Compare options, revisit priorities, and avoid rushed decisions to improve final satisfaction." }] },
    {
        heading: "Common Mistakes to Avoid",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Focusing only on carat",
                    "Ignoring cut quality",
                    "Overpaying for unnecessary clarity",
                    "Skipping certification",
                    "Rushing the purchase",
                ],
            },
        ],
    },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "A checklist does not limit choice. It structures decisions so your final diamond feels intentional, balanced, and confident." }] },
];

const faqData = [
    { question: "What should I check before buying a diamond?", answer: "Cut, color, clarity, carat, and certification." },
    { question: "What is the most important factor?", answer: "Cut quality usually has the biggest visual impact." },
    { question: "Should I prioritize size or quality?", answer: "Balance both, with strong emphasis on cut." },
    { question: "Do I need certification?", answer: "Yes, for quality verification and trust." },
    { question: "What color grade is best?", answer: "G-H often gives strong appearance and value." },
    { question: "What clarity is recommended?", answer: "VS2-SI1 is commonly a practical eye-clean range." },
    { question: "Should I buy natural or lab grown?", answer: "Choose based on preference, budget, and purpose." },
    { question: "How do I avoid mistakes?", answer: "Follow a structured buying checklist." },
    { question: "Is online buying safe?", answer: "Yes, with certification and transparent seller verification." },
    { question: "Should I rush the purchase?", answer: "No, take time to compare and confirm your choice." },
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
                    The Ultimate Diamond Buying Checklist: What to Know Before You Buy
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
