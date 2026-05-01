import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Best Diamond Shapes for Engagement Rings (2026 Guide & Comparison)",
    description:
        "Round, oval, cushion or emerald? Discover the best diamond shapes for engagement rings in 2026 and how to choose the right one.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/best-diamond-shapes-for-engagement-rings",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Diamond Shape Is One of the Most Important Decisions", content: [{ type: "paragraph", text: "Shape sets the entire personality of the ring. In 2026, buyers are choosing shapes by style and wear preference rather than default convention." }] },
    { heading: "Round Brilliant: The Benchmark for Sparkle", content: [{ type: "paragraph", text: "Round offers the strongest light return and remains the most popular option for maximum brilliance." }] },
    { heading: "Oval: The Modern Favorite", content: [{ type: "paragraph", text: "Oval appears larger per carat and gives a slimming finger effect while retaining strong sparkle." }] },
    { heading: "Cushion Cut: Soft and Vintage-Inspired", content: [{ type: "paragraph", text: "Cushion blends classic softness with modern adaptability and is often chosen for romantic, timeless style." }] },
    { heading: "Emerald Cut: Clean and Elegant", content: [{ type: "paragraph", text: "Emerald emphasizes clarity and symmetry through step facets, delivering refined flashes rather than intense sparkle." }] },
    { heading: "Princess Cut: Sharp and Contemporary", content: [{ type: "paragraph", text: "Princess gives strong brilliance in a square profile and is often viewed as a modern value alternative to round." }] },
    { heading: "Pear Shape: Distinctive and Versatile", content: [{ type: "paragraph", text: "Pear combines elegance and individuality with elongated visual presence and directional styling options." }] },
    { heading: "Marquise: Maximum Size Appearance", content: [{ type: "paragraph", text: "Marquise maximizes face-up spread and is ideal for buyers who want dramatic visual size." }] },
    { heading: "Radiant: A Balance Between Brilliant and Step Cuts", content: [{ type: "paragraph", text: "Radiant offers strong sparkle with structured shape, often balancing brightness and distinct geometry." }] },
    { heading: "How Shape Affects Price and Value", content: [{ type: "paragraph", text: "Round is usually highest-priced; many fancy shapes offer larger visual spread for similar budget." }] },
    { heading: "How to Choose the Right Shape for You", content: [{ type: "paragraph", text: "Choose based on style, finger look, sparkle preference, durability needs, and budget efficiency." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Shape is the design foundation. The right choice aligns personal style, light performance, and value expectations." }] },
];

const faqData = [
    { question: "What is the most popular diamond shape?", answer: "Round brilliant remains the most popular." },
    { question: "Which shape looks biggest?", answer: "Oval and marquise often look larger face-up." },
    { question: "What shape is best for sparkle?", answer: "Round brilliant is typically strongest for sparkle." },
    { question: "Are fancy shapes cheaper than round?", answer: "Often yes, depending on grade and demand." },
    { question: "Which shape is best for modern look?", answer: "Princess and radiant are common modern picks." },
    { question: "What shape hides inclusions best?", answer: "Brilliant-style cuts such as round and radiant are generally forgiving." },
    { question: "Are elongated shapes better for finger appearance?", answer: "They often create a longer, slimmer look." },
    { question: "What are unique shape options?", answer: "Pear and marquise are distinctive alternatives." },
    { question: "Does shape affect durability?", answer: "Yes, pointed corners and tips may need protective settings." },
    { question: "How do I choose the right shape?", answer: "Match shape to style, budget, and visual preference." },
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
                    Best Diamond Shapes for Engagement Rings: Complete 2026 Guide
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
