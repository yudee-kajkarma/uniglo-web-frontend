import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "What Are the 4 Types of Diamonds? Type I vs Type II Explained (2026)",
    description:
        "Learn the 4 types of diamonds (Type Ia, Ib, IIa, IIb) and what they mean for quality, rarity, and value in this simple 2026 buyer guide.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/what-are-the-4-types-of-diamonds",
    },
};

const articleData: ArticleSection[] = [
    {
        heading: "Why Diamond Types Matter More Than Most Buyers Realize",
        content: [
            {
                type: "paragraph",
                text: "Most buyers are familiar with the 4Cs, cut, color, clarity, and carat. But there's another classification that operates behind the scenes, one that even many experienced shoppers overlook: diamond type.",
            },
            {
                type: "paragraph",
                text: "This classification isn't about how a diamond looks on the surface. It's about what's happening at a microscopic level, specifically, the presence of certain elements inside the diamond's crystal structure. These elements influence how a diamond forms, how rare it is, and in some cases, how it behaves under light.",
            },
            {
                type: "paragraph",
                text: "Understanding diamond types doesn't mean you need to become a gemologist. But it does give you a deeper layer of clarity, especially if you're trying to understand why some diamonds are considered exceptionally rare while others are more common.",
            },
        ],
    },
    {
        heading: "The Science Behind Diamond Types (Simplified)",
        content: [
            {
                type: "paragraph",
                text: "At their core, all diamonds are made of carbon. What separates one type from another is whether tiny amounts of other elements, primarily nitrogen or boron, are present within the crystal.",
            },
            {
                type: "paragraph",
                text: "These trace elements affect how the diamond absorbs light and, in some cases, its color and electrical properties. Based on this, diamonds are divided into two main categories: Type I and Type II.",
            },
            {
                type: "paragraph",
                text: "From there, each category is further split into subtypes, creating the four classifications that are used worldwide today.",
            },
        ],
    },
    {
        heading: "Type I Diamonds: The Most Common Category",
        content: [
            {
                type: "paragraph",
                text: "Type I diamonds make up roughly 98% of all natural diamonds, making them by far the most common.",
            },
            {
                type: "paragraph",
                text: "What defines this category is the presence of nitrogen within the crystal structure. This nitrogen doesn't necessarily make the diamond inferior, it simply means the diamond formed under conditions where nitrogen atoms were incorporated into its structure.",
            },
            {
                type: "paragraph",
                text: "Type I diamonds are divided into two subcategories, each with its own characteristics.",
            },
        ],
    },
    {
        heading: "Type Ia Diamonds: The Majority of Natural Diamonds",
        content: [
            {
                type: "paragraph",
                text: "Type Ia diamonds are the most widely found in nature.",
            },
            {
                type: "paragraph",
                text: "In these diamonds, nitrogen atoms are grouped together in clusters. This clustering can slightly affect how the diamond absorbs light, often resulting in a faint yellow tint, even if it's not immediately visible.",
            },
            {
                type: "paragraph",
                text: "Despite this, many high-quality diamonds, including those used in fine jewelry, fall into this category. They can still achieve excellent grades in color and clarity, especially when well-cut.",
            },
            {
                type: "paragraph",
                text: "For most buyers, Type Ia diamonds represent the standard experience of what a natural diamond looks like.",
            },
        ],
    },
    {
        heading: "Type Ib Diamonds: Rare but Distinct",
        content: [
            {
                type: "paragraph",
                text: "Type Ib diamonds are much less common, accounting for only about 0.1% of natural diamonds.",
            },
            {
                type: "paragraph",
                text: "Unlike Type Ia, the nitrogen atoms in Type Ib diamonds are isolated rather than clustered. This structural difference leads to stronger color effects, often producing vivid yellow, orange, or even brown hues.",
            },
            {
                type: "paragraph",
                text: "Because of their rarity and color intensity, Type Ib diamonds are sometimes associated with fancy color diamonds. However, not all fancy color diamonds fall into this category.",
            },
        ],
    },
    {
        heading: "Type II Diamonds: The Rarest and Most Valuable",
        content: [
            {
                type: "paragraph",
                text: "Type II diamonds are defined by the absence of measurable nitrogen, making them significantly rarer than Type I diamonds.",
            },
            {
                type: "paragraph",
                text: "This lack of nitrogen allows for greater optical purity, which is why many of the world's most famous diamonds fall into this category. They are further divided into Type IIa and Type IIb.",
            },
        ],
    },
    {
        heading: "Type IIa Diamonds: Exceptional Purity and Rarity",
        content: [
            {
                type: "paragraph",
                text: "Type IIa diamonds are often considered the purest form of diamond.",
            },
            {
                type: "paragraph",
                text: "They contain almost no impurities, which gives them exceptional transparency and brilliance. Many of the most valuable and historically significant diamonds belong to this category.",
            },
            {
                type: "paragraph",
                text: "Because of their rarity, Type IIa diamonds are often associated with premium or investment-grade stones. They are typically colorless or near colorless, although some can exhibit unique shades like pink or brown.",
            },
            {
                type: "paragraph",
                text: "Their combination of purity and scarcity makes them highly sought after among collectors and high-end buyers.",
            },
            {
                type: "paragraph",
                text: "At Uniglo Diamonds, sourcing Type IIa stones is a priority for clients seeking rare, high-quality diamonds with exceptional characteristics.",
            },
        ],
    },
    {
        heading: "Type IIb Diamonds: Electrically Conductive and Rare",
        content: [
            {
                type: "paragraph",
                text: "Type IIb diamonds are even rarer than Type IIa.",
            },
            {
                type: "paragraph",
                text: "What sets them apart is the presence of boron, an element that gives these diamonds a distinctive blue or gray color. This is also what makes them electrically conductive, a property almost unheard of in other diamonds.",
            },
            {
                type: "paragraph",
                text: "Famous blue diamonds, including some of the most recognizable stones in the world, fall into this category. Their rarity and unique properties make them highly valuable and scientifically interesting.",
            },
        ],
    },
    {
        heading: "Where Do Lab Grown Diamonds Fit In?",
        content: [
            {
                type: "paragraph",
                text: "Lab grown diamonds do not follow the same natural formation process, but they still fall within the same classification system.",
            },
            {
                type: "paragraph",
                text: "Depending on how they are created, lab grown diamonds are often classified as Type IIa, especially those produced using advanced methods that result in high purity and minimal nitrogen content.",
            },
            {
                type: "paragraph",
                text: "This means that, from a structural standpoint, many lab grown diamonds share characteristics with some of the rarest natural diamonds.",
            },
            {
                type: "paragraph",
                text: "However, the key difference remains their origin, not their composition or classification.",
            },
        ],
    },
    {
        heading: "Why Diamond Type Doesn't Replace the 4Cs",
        content: [
            {
                type: "paragraph",
                text: "While diamond type provides valuable insight, it doesn't replace the traditional grading system.",
            },
            {
                type: "paragraph",
                text: "The 4Cs still determine how a diamond looks and performs visually. A Type IIa diamond, for example, may be extremely pure, but if it's poorly cut, it won't display the brilliance expected from a high-quality stone.",
            },
            {
                type: "paragraph",
                text: "Similarly, a Type Ia diamond can still appear stunning if it has an excellent cut and strong clarity.",
            },
            {
                type: "paragraph",
                text: "This is why professionals consider diamond type as an additional layer of information rather than a standalone factor.",
            },
        ],
    },
    {
        heading: "What This Means for Buyers",
        content: [
            {
                type: "paragraph",
                text: "For most buyers, understanding diamond types is about awareness rather than decision-making pressure.",
            },
            {
                type: "paragraph",
                text: "If you're purchasing a diamond for its beauty and emotional value, the 4Cs will remain your primary focus. However, if you're exploring rare or high-end stones, knowing the difference between Type I and Type II can provide valuable context.",
            },
            {
                type: "paragraph",
                text: "It explains why certain diamonds command higher prices, why some are considered exceptional, and how subtle differences at the atomic level can influence the overall story of a stone.",
            },
        ],
    },
    {
        heading: "Final Thoughts",
        content: [
            {
                type: "paragraph",
                text: "The idea that all diamonds are the same couldn't be further from the truth. Beneath their surface brilliance lies a complex structure shaped by elements most people never see.",
            },
            {
                type: "paragraph",
                text: "From nitrogen-rich Type I diamonds to the ultra-pure Type IIa stones and the rare blue Type IIb, each classification tells a different story about how the diamond formed and what makes it unique.",
            },
            {
                type: "paragraph",
                text: "For buyers willing to look beyond the basics, this knowledge adds depth to the experience, turning a simple purchase into a more informed and meaningful choice.",
            },
            {
                type: "paragraph",
                text: "Because when you understand what makes a diamond truly rare, doesn't it change the way you see it?",
            },
        ],
    },
];

const faqData = [
    {
        question: "What are the four types of diamonds?",
        answer: "Type Ia, Type Ib, Type IIa, and Type IIb.",
    },
    {
        question: "Which diamond type is the most common?",
        answer: "Type Ia diamonds are the most common in nature.",
    },
    {
        question: "Which diamond type is the rarest?",
        answer: "Type IIb diamonds are among the rarest.",
    },
    {
        question: "What is a Type IIa diamond?",
        answer: "A highly pure diamond with almost no nitrogen impurities.",
    },
    {
        question: "Do diamond types affect value?",
        answer: "Yes, rarer types like IIa and IIb can command higher value.",
    },
    {
        question: "Are lab grown diamonds Type IIa?",
        answer: "Many lab grown diamonds fall into the Type IIa category.",
    },
    {
        question: "What causes color in Type Ib diamonds?",
        answer: "Isolated nitrogen atoms create strong yellow or orange colors.",
    },
    {
        question: "Why are Type IIb diamonds blue?",
        answer: "They contain boron, which affects their color.",
    },
    {
        question: "Should I choose a diamond based on type?",
        answer: "It depends on your goals, but most buyers focus on the 4Cs first.",
    },
    {
        question: "Does diamond type affect sparkle?",
        answer: "Not directly, cut quality has a bigger impact on sparkle.",
    },
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

const BlogPage = () => {
    return (
        <div className="min-h-screen mb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        What Are the 4 Types of Diamonds? Type I, Type II & What Buyers Need to Know
                    </h1>
                    <DynamicArticle sections={articleData} />
                    <FAQSection
                        faqs={faqData}
                        title="Frequently Asked Questions"
                        className="mt-12"
                    />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;
