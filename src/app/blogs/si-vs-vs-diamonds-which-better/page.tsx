import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "SI vs VS Diamonds: Which Clarity Is Better Value? (2026 Guide)",
    description:
        "SI vs VS diamonds explained. Learn the difference, visibility, pricing, and which clarity grade gives the best value in 2026.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/si-vs-vs-diamonds-which-better",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why This Is One of the Most Important Buying Decisions", content: [{ type: "paragraph", text: "SI vs VS is where buyers often gain or lose value because this comparison can affect both visible appearance and price." }] },
    { heading: "What SI and VS Actually Mean", content: [{ type: "paragraph", text: "VS has smaller, harder-to-see inclusions than SI. Some SI stones are eye-clean, others are not." }] },
    { heading: "The Key Question: Can You See the Difference", content: [{ type: "paragraph", text: "VS is usually eye-clean. SI can vary by stone, making visual evaluation critical." }] },
    { heading: "What Eye-Clean Really Means in SI Diamonds", content: [{ type: "paragraph", text: "Eye-clean SI1 can look similar to VS in daily viewing, which is why it can offer strong value." }] },
    { heading: "Why VS Diamonds Are the Safer Choice", content: [{ type: "paragraph", text: "VS provides consistency with lower risk of visible inclusions." }] },
    { heading: "Why SI Diamonds Offer Better Value", content: [{ type: "paragraph", text: "Well-selected SI1 diamonds can reduce cost and free budget for cut or carat improvements." }] },
    { heading: "When SI Clarity Can Be Risky", content: [{ type: "paragraph", text: "Inclusion visibility varies, especially in SI2 or center-positioned inclusions, requiring close review." }] },
    { heading: "How Shape Affects SI vs VS Decision", content: [{ type: "paragraph", text: "Brilliant cuts can hide inclusions better; step cuts often need stricter clarity selection." }] },
    { heading: "How Cut Quality Changes Everything", content: [{ type: "paragraph", text: "Strong cut can reduce visual impact of minor inclusions and improve overall appearance." }] },
    { heading: "Practical Buying Strategy", content: [{ type: "paragraph", text: "Select eye-clean SI1 where possible, choose VS for certainty, and prioritize cut quality first." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "SI vs VS is a value decision: VS offers consistency, SI offers opportunity when selected carefully." }] },
];

const faqData = [
    { question: "What is the difference between SI and VS?", answer: "VS has fewer and smaller inclusions than SI." },
    { question: "Are SI diamonds eye-clean?", answer: "Some SI1 diamonds are, but it varies by stone." },
    { question: "Is VS worth the extra cost?", answer: "It can be, if you want consistency and lower inclusion risk." },
    { question: "Which clarity is best value?", answer: "Eye-clean SI1 often offers strong value." },
    { question: "Can you see inclusions in SI diamonds?", answer: "Sometimes, depending on inclusion type and placement." },
    { question: "Which shapes work best with SI?", answer: "Brilliant cuts are usually more forgiving." },
    { question: "Should I avoid SI2?", answer: "SI2 requires careful evaluation due to higher inclusion visibility risk." },
    { question: "Does cut affect clarity visibility?", answer: "Yes, better cut can help mask minor inclusions." },
    { question: "Are SI diamonds cheaper?", answer: "Yes, they are typically cheaper than VS." },
    { question: "What should I prioritize first?", answer: "Cut quality, then eye-clean clarity." },
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
                    SI vs VS Diamonds: Which Clarity Grade Should You Choose?
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
