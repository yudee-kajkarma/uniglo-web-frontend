import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "How to Clean Diamond Jewelry at Home (Safe Methods Guide 2026)",
    description:
        "Learn how to clean diamond rings, earrings, and necklaces at home safely. Step-by-step methods to keep your diamonds sparkling in 2026.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/how-to-clean-diamond-jewelry-at-home",
    },
};

const articleData: ArticleSection[] = [
    {
        heading: "Why Diamond Jewelry Loses Its Sparkle Over Time",
        content: [
            {
                type: "paragraph",
                text: "Diamonds do not lose their brilliance naturally, but oils, lotions, dust, and residue can block light and make them look dull. With more daily wear in 2026, regular cleaning is essential.",
            },
        ],
    },
    { heading: "How Often Should You Clean Your Diamond Jewelry?", content: [{ type: "paragraph", text: "For frequently worn pieces, clean every 1-2 weeks. For occasional wear, clean before or after use to prevent buildup." }] },
    {
        heading: "The Safest At-Home Cleaning Method",
        content: [
            { type: "bullet-list", items: ["Warm water", "Mild dish soap", "Soft toothbrush", "Lint-free cloth"] },
            { type: "paragraph", text: "Soak jewelry for 15-20 minutes, gently brush around the stone and setting, rinse thoroughly, and dry with a lint-free cloth." },
        ],
    },
    { heading: "Why Gentle Cleaning Works Best", content: [{ type: "paragraph", text: "Diamonds are hard, but settings are not. Gentle, consistent cleaning protects both brilliance and metal integrity." }] },
    { heading: "Can You Use Household Cleaners?", content: [{ type: "paragraph", text: "Avoid bleach, chlorine, and harsh chemicals. They can damage metals and weaken settings over time." }] },
    { heading: "Ultrasonic Cleaners: Are They Safe?", content: [{ type: "paragraph", text: "Ultrasonic cleaners can work but are not safe for every design or condition. If unsure, use manual cleaning." }] },
    { heading: "Cleaning Different Types of Diamond Jewelry", content: [{ type: "paragraph", text: "Rings collect the most residue, earrings need routine backing-area cleaning, and necklaces require chain and link care to prevent buildup." }] },
    { heading: "How to Keep Diamonds Clean Longer", content: [{ type: "paragraph", text: "Remove jewelry before lotions, perfumes, and household chemicals. Store pieces separately to reduce dust and friction." }] },
    { heading: "When Professional Cleaning Is Needed", content: [{ type: "paragraph", text: "Periodic professional cleaning helps reach hidden areas and includes setting checks for loose prongs or wear." }] },
    {
        heading: "Common Mistakes to Avoid",
        content: [
            {
                type: "bullet-list",
                items: ["Using harsh chemicals", "Scrubbing aggressively", "Skipping regular cleaning", "Ignoring the setting"],
            },
        ],
    },
    { heading: "Why Maintenance Matters for Long-Term Wear", content: [{ type: "paragraph", text: "Consistent care keeps jewelry bright and helps identify structural issues early before they become costly repairs." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Home cleaning is simple and effective when done gently and regularly. Consistency preserves sparkle, safety, and long-term wear quality." }] },
];

const faqData = [
    { question: "How often should I clean diamond jewelry?", answer: "Every 1-2 weeks for frequently worn pieces." },
    { question: "Can I use toothpaste to clean diamonds?", answer: "No, it can be abrasive and damage metal." },
    { question: "Is soap and water enough?", answer: "Yes, it is the safest and most effective routine method." },
    { question: "Are ultrasonic cleaners safe?", answer: "Not for all jewelry. Use with caution." },
    { question: "Can I use household cleaners?", answer: "Avoid harsh chemicals like bleach." },
    { question: "Why do diamonds look dull?", answer: "Because oils and dirt build up on the surface and setting." },
    { question: "Should I clean the setting too?", answer: "Yes, residue under and around settings affects appearance." },
    { question: "Can cleaning damage diamonds?", answer: "Not with gentle, safe methods." },
    { question: "Do I need professional cleaning?", answer: "Occasionally, for deep cleaning and inspection." },
    { question: "What is the safest cleaning method?", answer: "Warm water, mild soap, and a soft brush." },
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
                    How to Clean Diamond Jewelry at Home Safely and Effectively
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
