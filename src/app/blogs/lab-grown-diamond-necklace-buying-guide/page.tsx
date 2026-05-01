import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Lab Grown Diamond Necklace Guide 2026: Styles, Sizes & Buying Tips",
    description:
        "Discover how to choose a lab grown diamond necklace in 2026. Learn about styles, sizes, chain length, and quality before you buy.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/lab-grown-diamond-necklace-buying-guide",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Diamond Necklaces Have Become Everyday Jewelry", content: [{ type: "paragraph", text: "Lab grown availability has made diamond necklaces practical for daily use while preserving premium visual appeal." }] },
    { heading: "The Most Popular Lab Grown Diamond Necklace Styles", content: [{ type: "paragraph", text: "Solitaire pendants, tennis necklaces, halo pendants, and layered designs dominate current buying patterns." }] },
    { heading: "Choosing the Right Diamond Size", content: [{ type: "paragraph", text: "Size should be proportional to neckline and chain style. In multi-stone pieces, total carat and distribution matter more than one stone." }] },
    { heading: "Chain Length and Positioning", content: [{ type: "paragraph", text: "Length changes visual placement and styling flexibility. Layered looks rely on clear length spacing." }] },
    { heading: "Why Cut Quality Still Matters", content: [{ type: "paragraph", text: "Cut quality is the primary sparkle driver, especially important in solitaire-centered designs." }] },
    { heading: "Balancing Color and Clarity", content: [{ type: "paragraph", text: "Near-colorless, eye-clean ranges are commonly selected for balanced performance and value." }] },
    { heading: "Metal Choices and Their Effect on Appearance", content: [{ type: "paragraph", text: "Metal tone affects contrast, warmth, and overall style identity." }] },
    { heading: "Why Certification Is Important", content: [{ type: "paragraph", text: "Certification confirms quality and origin for informed comparison." }] },
    { heading: "Comfort and Everyday Wear", content: [{ type: "paragraph", text: "Weight balance, chain flexibility, and clasp reliability are critical for daily comfort." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "The right necklace blends diamond quality, chain proportion, and wear context into one cohesive design." }] },
];

const faqData = [
    { question: "What are lab grown diamond necklaces?", answer: "Necklaces featuring lab created real diamonds." },
    { question: "What styles are available?", answer: "Solitaire pendants, tennis styles, halo designs, and layered formats." },
    { question: "What size is best for a pendant?", answer: "Commonly moderate center sizes for balanced wear." },
    { question: "What chain length should I pick?", answer: "Shorter for classic placement, longer for relaxed modern styling." },
    { question: "Does cut quality matter?", answer: "Yes, cut has the biggest impact on sparkle." },
    { question: "What color grade is recommended?", answer: "Near-colorless ranges are popular for value and appearance." },
    { question: "Are lab grown diamonds durable?", answer: "Yes, they are highly durable." },
    { question: "Do necklaces need certification?", answer: "Yes, especially for single-diamond focal pieces." },
    { question: "Can I wear it daily?", answer: "Yes, especially with practical chain and setting choices." },
    { question: "What should I prioritize?", answer: "Balance between diamond, chain, and overall design." },
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
                    Lab Grown Diamond Necklaces: How to Choose the Right One in 2026
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
