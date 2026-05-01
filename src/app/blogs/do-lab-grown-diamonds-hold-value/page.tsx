import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Do Lab Grown Diamonds Hold Value? 2026 Resale Reality Explained",
    description:
        "Do lab grown diamonds hold their value? Learn real resale rates, what affects value, and what to expect in 2026 before you buy.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/do-lab-grown-diamonds-hold-value",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why This Question Matters Before You Buy", content: [{ type: "paragraph", text: "Many buyers want to know not only how a diamond looks now, but how it may perform in resale later." }] },
    { heading: "The Short Answer: Value Retention Is Lower", content: [{ type: "paragraph", text: "Lab grown diamonds do retain resale value, but often at a lower percentage than natural diamonds in many markets." }] },
    { heading: "Why Resale Value Works Differently for Lab Grown Diamonds", content: [{ type: "paragraph", text: "Scalable production can increase supply over time, which can put downward pressure on resale pricing." }] },
    { heading: "Retail Price vs Resale Price: Understanding the Gap", content: [{ type: "paragraph", text: "Retail includes markups and service layers, while resale reflects secondary-market demand at a specific point in time." }] },
    { heading: "Why Premium Lab Grown Diamonds Perform Better", content: [{ type: "paragraph", text: "Higher-quality and better-documented stones generally attract stronger resale interest than lower-tier alternatives." }] },
    { heading: "The Role of Certification in Resale", content: [{ type: "paragraph", text: "Certification improves buyer confidence and usually supports better resale outcomes." }] },
    { heading: "Where You Sell Matters More Than You Think", content: [{ type: "paragraph", text: "Specialized channels often produce more accurate offers than general marketplaces." }] },
    { heading: "Why Lab Grown Diamonds Are Still a Strong Choice", content: [{ type: "paragraph", text: "For many buyers, emotional value and design flexibility matter more than resale percentage alone." }] },
    { heading: "How to Approach the Decision as a Buyer", content: [{ type: "paragraph", text: "Separate purchase value from resale expectations and choose based on your actual priorities." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Understanding resale dynamics upfront helps buyers make confident and realistic decisions." }] },
];

const faqData = [
    { question: "Do lab grown diamonds hold their value?", answer: "They hold some resale value, but typically lower than natural diamonds." },
    { question: "What is typical resale value?", answer: "It varies by quality, certification, and market conditions." },
    { question: "Why is retention lower?", answer: "Because supply can expand with production capacity." },
    { question: "Are all lab grown diamonds equal in resale?", answer: "No, premium quality usually performs better." },
    { question: "Does certification affect resale?", answer: "Yes, it generally improves trust and sellability." },
    { question: "Where is the best place to sell?", answer: "Specialized buyers often provide more accurate valuations." },
    { question: "Do natural diamonds hold value better?", answer: "Often yes, but outcomes are still not guaranteed." },
    { question: "Should resale value affect my decision?", answer: "Yes, if long-term flexibility is important to you." },
    { question: "Are lab grown diamonds bad investments?", answer: "Most diamonds are not purchased as pure financial investments." },
    { question: "What should I focus on when buying?", answer: "Quality, certification, and your personal priorities." },
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
                    Do Lab Grown Diamonds Hold Their Value? The 2026 Resale Reality
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
