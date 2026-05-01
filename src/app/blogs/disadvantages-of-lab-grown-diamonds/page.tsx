import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Disadvantages of Lab Grown Diamonds: 7 Things Buyers Should Know (2026)",
    description:
        "What are the disadvantages of lab grown diamonds? Learn the real downsides, resale value, perception, and what sellers do not always explain in 2026.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/disadvantages-of-lab-grown-diamonds",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why It Is Important to Look Beyond the Hype", content: [{ type: "paragraph", text: "Lab grown diamonds are popular and visually identical to natural diamonds, but buyers should also understand limitations, not only benefits." }] },
    { heading: "Resale Value Is Typically Lower", content: [{ type: "paragraph", text: "Lab grown diamonds usually retain a smaller share of purchase price in resale markets, often around 10% to 30% depending on quality and timing." }] },
    { heading: "Abundance Limits Long-Term Scarcity", content: [{ type: "paragraph", text: "Because lab grown diamonds are scalable in production, they do not follow the same scarcity dynamics as natural diamonds." }] },
    { heading: "Perception Still Matters in Certain Circles", content: [{ type: "paragraph", text: "Some buyers still value natural origin symbolism and legacy perception, so social and cultural preferences may influence decisions." }] },
    { heading: "Energy Use During Production", content: [{ type: "paragraph", text: "Lab grown diamonds avoid mining but still require substantial energy. Sustainability profiles vary by producer and energy source." }] },
    { heading: "Size vs Prestige Trade-Off", content: [{ type: "paragraph", text: "Lab grown makes larger stones accessible, but some buyers still prioritize natural rarity and perceived prestige over size." }] },
    { heading: "Market Price Fluctuations", content: [{ type: "paragraph", text: "Prices in some lab grown categories have adjusted quickly as production scales, especially in lower-grade segments." }] },
    { heading: "Quality Variation Across the Market", content: [{ type: "paragraph", text: "Not all lab grown diamonds are finished to the same standard. Certification and careful selection are essential." }] },
    { heading: "How Buyers Can Navigate These Disadvantages", content: [{ type: "paragraph", text: "Choose based on your own priorities: size and design impact versus long-term perception and resale flexibility." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Understanding limitations does not mean avoiding lab grown diamonds. It means buying with realistic expectations and better clarity." }] },
];

const faqData = [
    { question: "What are the main disadvantages of lab grown diamonds?", answer: "Lower resale retention, abundance, perception differences, and price fluctuations." },
    { question: "Do lab grown diamonds lose value?", answer: "They typically retain a lower resale percentage than natural diamonds." },
    { question: "Are lab grown diamonds less rare?", answer: "Yes, they are produced in controlled environments at scale." },
    { question: "Do lab grown diamonds have environmental impact?", answer: "Yes, production uses energy and impact varies by source." },
    { question: "Are lab grown diamonds less prestigious?", answer: "Perception varies by buyer and cultural context." },
    { question: "Do lab grown diamonds fluctuate in price?", answer: "Yes, especially in lower-grade categories." },
    { question: "Is quality consistent across all lab grown diamonds?", answer: "No, production and finishing quality can vary." },
    { question: "Are lab grown diamonds a good choice?", answer: "Yes, if they match your priorities and expectations." },
    { question: "Can lab grown diamonds be resold easily?", answer: "They can be resold, but retention is usually lower." },
    { question: "Should I avoid lab grown diamonds because of these disadvantages?", answer: "Not necessarily. Understanding trade-offs helps you choose better." },
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
                    Disadvantages of Lab Grown Diamonds: 7 Things Sellers Do Not Tell You
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
