import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Diamond Resale Value Explained: Do Diamonds Hold Value in 2026?",
    description:
        "Do diamonds hold value? Learn how resale value works, what affects it, and what to expect when selling a diamond in 2026.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/diamond-resale-value-guide",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why This Question Matters Before You Buy", content: [{ type: "paragraph", text: "Many buyers ask whether diamonds hold value. It is a practical question that helps set realistic expectations for resale or upgrades later." }] },
    { heading: "Do Diamonds Hold Their Value? The Real Answer", content: [{ type: "paragraph", text: "Diamonds retain intrinsic value, but resale value is typically lower than retail because retail includes markup, branding, and setting cost." }] },
    { heading: "What Determines Diamond Resale Value", content: [{ type: "bullet-list", items: ["4Cs quality", "Certification", "Market demand", "Size and rarity", "Condition"] }] },
    { heading: "Why Certification Plays a Major Role", content: [{ type: "paragraph", text: "Certified diamonds are easier to verify and price in resale markets, which usually improves buyer confidence and offer quality." }] },
    { heading: "Natural vs Lab Grown: Resale Differences", content: [{ type: "paragraph", text: "Natural diamonds often show more stable resale demand. Lab grown diamonds have resale value too, but follow different supply-driven pricing behavior." }] },
    { heading: "Why Larger Diamonds Retain Value Better", content: [{ type: "paragraph", text: "Larger stones are rarer and often attract stronger resale interest, especially when paired with high quality and trusted certification." }] },
    { heading: "The Impact of Cut, Color, and Clarity", content: [{ type: "paragraph", text: "Balanced quality, especially strong cut performance, tends to support better marketability and resale outcomes." }] },
    { heading: "Why Branded Jewelry Does Not Always Add Value", content: [{ type: "paragraph", text: "Branding can increase retail price, but resale buyers usually focus more on diamond quality and documentation." }] },
    { heading: "Where You Sell Matters", content: [{ type: "bullet-list", items: ["Jewelers or trade buyers", "Online resale platforms", "Auction channels"] }] },
    { heading: "Upgrade vs Resale: A Practical Alternative", content: [{ type: "paragraph", text: "Trade-in and upgrade programs can be more efficient than direct resale for buyers planning a larger or better stone later." }] },
    { heading: "Common Misconceptions About Diamond Value", content: [{ type: "paragraph", text: "Most retail diamonds are not designed to behave like financial assets. Expect market-based resale value, not full retail recovery." }] },
    { heading: "How to Maximize Resale Value", content: [{ type: "bullet-list", items: ["Buy certified", "Prioritize quality over branding", "Maintain condition", "Keep all documents"] }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Resale value depends on quality, certification, and market demand. Understanding this early helps you make smarter initial buying decisions." }] },
];

const faqData = [
    { question: "Do diamonds hold their value?", answer: "Yes, but resale is usually lower than retail purchase price." },
    { question: "Why is resale value lower than retail?", answer: "Retail includes markup and other non-stone costs." },
    { question: "Do certified diamonds sell better?", answer: "Yes, certification improves trust and pricing clarity." },
    { question: "Are natural diamonds better for resale?", answer: "They often show more stable resale demand." },
    { question: "Do lab grown diamonds have resale value?", answer: "Yes, but valuation dynamics differ from natural diamonds." },
    { question: "Does size affect resale value?", answer: "Yes, larger diamonds can retain value better." },
    { question: "Does brand affect resale?", answer: "Usually less than the diamond's underlying quality." },
    { question: "Where can I sell a diamond?", answer: "Jewelers, online marketplaces, and auctions are common options." },
    { question: "Can I upgrade instead of selling?", answer: "Yes, many jewelers provide trade-in and upgrade programs." },
    { question: "How can I maximize resale value?", answer: "Choose certified quality and maintain complete records." },
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
                    Diamond Resale Value: Do Diamonds Hold Their Value?
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
