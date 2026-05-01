import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "What Is Diamond Certification? GIA vs IGI Explained (2026 Guide)",
    description:
        "What is a diamond certificate and which one should you trust? Learn GIA vs IGI differences and how certification affects your purchase.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/what-is-diamond-certification-gia-vs-igi",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Certification Is Non-Negotiable in 2026", content: [{ type: "paragraph", text: "Certification is the core trust layer in modern diamond buying, especially for online comparison across sellers." }] },
    { heading: "What a Diamond Certificate Actually Is", content: [{ type: "paragraph", text: "A grading report is an independent lab evaluation of cut, color, clarity, carat, proportions, and other key details." }] },
    { heading: "Why Certification Matters More Than Appearance", content: [{ type: "paragraph", text: "Two similar-looking diamonds can vary materially in quality and price. Certification makes these differences measurable." }] },
    { heading: "The Most Trusted Certification Labs", content: [{ type: "paragraph", text: "GIA, IGI, and HRD are among the most recognized labs used across natural and lab grown markets." }] },
    { heading: "GIA vs IGI: What’s the Real Difference", content: [{ type: "paragraph", text: "GIA is often viewed as stricter benchmark grading; IGI is widely used, especially in lab grown segments with broad market acceptance." }] },
    { heading: "Why Lab Grown Diamonds Often Use IGI", content: [{ type: "paragraph", text: "IGI is common in lab grown supply chains due to scale and turnaround dynamics." }] },
    { heading: "What Information You Should Check in a Certificate", content: [{ type: "paragraph", text: "Focus on cut, proportions, polish, symmetry, fluorescence, and full 4Cs, not just headline carat or clarity." }] },
    { heading: "Laser Inscription and Verification", content: [{ type: "paragraph", text: "Laser inscription links the physical stone to its report and improves authentication confidence." }] },
    { heading: "Why Certification Impacts Price", content: [{ type: "paragraph", text: "Certified stones are easier to evaluate and compare, often supporting stronger trust and value retention." }] },
    { heading: "How to Use Certification in Your Buying Process", content: [{ type: "paragraph", text: "Use reports as comparison tools, verify numbers online, and pair report review with visual inspection." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Certification is the foundation of informed buying. Knowing how to read it is as important as having it." }] },
];

const faqData = [
    { question: "What is a diamond certificate?", answer: "An independent grading report describing diamond quality." },
    { question: "Is certification necessary?", answer: "Yes, for trust and accurate comparison." },
    { question: "Which lab is strictest?", answer: "GIA is widely viewed as a strict benchmark." },
    { question: "Is IGI reliable?", answer: "Yes, especially in lab grown categories." },
    { question: "What does a certificate include?", answer: "4Cs, proportions, symmetry, polish, fluorescence, and more." },
    { question: "What is laser inscription?", answer: "A report number etched on the diamond girdle." },
    { question: "Can I verify online?", answer: "Yes, via the issuing lab’s verification tools." },
    { question: "Do certified diamonds cost more?", answer: "They can, due to verified quality confidence." },
    { question: "Are all certifications equal?", answer: "No, grading strictness can vary by lab." },
    { question: "What should I check first?", answer: "Cut quality and full report consistency." },
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
                    What Is Diamond Certification? GIA vs IGI Explained
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
