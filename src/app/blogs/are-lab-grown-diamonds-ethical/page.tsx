import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Are Lab Grown Diamonds Ethical? The Truth About Sustainability (2026)",
    description:
        "Are lab grown diamonds more ethical? Explore sustainability, environmental impact, and sourcing in this honest 2026 guide.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/are-lab-grown-diamonds-ethical",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Ethical Diamonds Became a Key Buying Factor", content: [{ type: "paragraph", text: "Modern buyers increasingly care about sourcing, transparency, and production impact, not only size and sparkle." }] },
    { heading: "What Makes a Diamond Ethical?", content: [{ type: "paragraph", text: "Ethics can include conflict-free sourcing, labor standards, environmental impact, and supply-chain transparency." }] },
    { heading: "The Key Advantage of Lab Grown Diamonds", content: [{ type: "paragraph", text: "Lab grown diamonds do not require mining, which can reduce land disruption and simplify source traceability." }] },
    { heading: "The Reality of Energy Use", content: [{ type: "paragraph", text: "Lab production uses significant energy. Sustainability depends on whether facilities use renewable or conventional power." }] },
    { heading: "How Natural Diamonds Address Ethical Concerns", content: [{ type: "paragraph", text: "Frameworks such as the Kimberley Process and additional traceability efforts have improved standards, though limitations remain." }] },
    { heading: "Traceability and Transparency", content: [{ type: "paragraph", text: "Controlled production can improve traceability for lab grown stones, while natural supply chains are often more complex." }] },
    { heading: "The Role of Consumer Perspective", content: [{ type: "paragraph", text: "Ethical preference is personal. Some prioritize no mining, others value natural origin and legacy, and many weigh both." }] },
    { heading: "Why the Lab vs Natural Debate Is Oversimplified", content: [{ type: "paragraph", text: "Both categories have strengths and trade-offs. Ethical evaluation depends on which factors matter most to the buyer." }] },
    { heading: "How Buyers Can Make an Informed Choice", content: [{ type: "paragraph", text: "Ask about certification, sourcing, energy practices, and traceability rather than relying on simplified labels." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "The most meaningful ethical choice is the one aligned with your own values and verified information." }] },
];

const faqData = [
    { question: "Are lab grown diamonds more ethical?", answer: "They are often considered more ethical due to no mining, but ethics depends on your criteria." },
    { question: "Do lab grown diamonds have environmental impact?", answer: "Yes, production uses energy and impact depends on energy source." },
    { question: "What is the Kimberley Process?", answer: "A framework intended to prevent trade in conflict diamonds." },
    { question: "Are natural diamonds ethical?", answer: "Many follow strict standards, but practices vary by source and company." },
    { question: "Are lab grown diamonds conflict-free?", answer: "They do not involve mining in conflict regions." },
    { question: "Do lab grown diamonds use renewable energy?", answer: "Some producers do, but not all." },
    { question: "Is traceability better with lab grown diamonds?", answer: "It is often easier due to controlled production." },
    { question: "Should ethics influence my purchase?", answer: "Yes, if sourcing and sustainability matter to you." },
    { question: "Are all lab grown diamonds equally sustainable?", answer: "No, sustainability varies by producer and energy mix." },
    { question: "What should I ask before buying?", answer: "Ask about certification, sourcing, and production practices." },
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
                    Are Lab Grown Diamonds More Ethical? The Real Sustainability Picture in 2026
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
