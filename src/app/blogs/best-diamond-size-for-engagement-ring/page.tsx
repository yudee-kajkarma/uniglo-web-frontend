import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Best Diamond Size for Engagement Rings (2026 Carat Guide)",
    description:
        "What diamond size should you choose? Learn the best carat sizes, finger fit, budget tips, and how big a diamond should be in 2026.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/best-diamond-size-for-engagement-ring",
    },
};

const articleData: ArticleSection[] = [
    {
        heading: "Why Diamond Size Is More Than Just Carat Weight",
        content: [
            {
                type: "paragraph",
                text: "Size decisions are not just about carat numbers. Two diamonds with the same carat weight can look very different based on cut, shape, and setting. In 2026, buyers focus on how the stone looks on the hand, not only on weight.",
            },
        ],
    },
    {
        heading: "Carat Weight vs Visual Size",
        content: [
            {
                type: "paragraph",
                text: "Carat measures weight, not face-up size. Visual size depends on surface area and proportions. A well-cut diamond can appear larger than a poorly cut diamond of the same weight.",
            },
        ],
    },
    {
        heading: "The Most Popular Diamond Sizes in 2026",
        content: [
            {
                type: "bullet-list",
                items: [
                    "0.50 - 0.75 carat: subtle and minimal",
                    "1.00 carat: the most popular balanced choice",
                    "1.50 - 2.00 carats: noticeable without overwhelming",
                    "2.00+ carats: strong statement presence",
                ],
            },
        ],
    },
    {
        heading: "How Diamond Shape Affects Size Appearance",
        content: [
            {
                type: "paragraph",
                text: "Elongated shapes such as oval, pear, and marquise often appear larger than round diamonds of the same carat. Round diamonds usually deliver stronger brilliance due to cut structure.",
            },
        ],
    },
    {
        heading: "The Role of Cut in Making a Diamond Look Bigger",
        content: [
            {
                type: "paragraph",
                text: "Cut quality has a major impact on apparent size. Better light return increases brightness and attention, often making a stone look larger than its carat weight suggests.",
            },
        ],
    },
    {
        heading: "Finger Size and Proportion",
        content: [
            {
                type: "paragraph",
                text: "A 1-carat diamond can look larger on a smaller finger and more subtle on a larger one. Balanced proportion matters more than chasing a single number.",
            },
        ],
    },
    {
        heading: "Setting Styles That Enhance Size",
        content: [
            {
                type: "paragraph",
                text: "Halo settings and thinner bands can make the center stone appear larger. Heavy bands may visually reduce center-stone impact.",
            },
        ],
    },
    {
        heading: "Budget vs Size: Finding the Right Balance",
        content: [
            {
                type: "paragraph",
                text: "Price rises quickly near key carat thresholds. Choosing slightly below milestones, such as 0.90 or 1.90 carats, can preserve appearance while reducing cost.",
            },
        ],
    },
    {
        heading: "Natural vs Lab Grown: Size Differences",
        content: [
            {
                type: "paragraph",
                text: "With lab grown diamonds, many buyers can choose larger sizes within the same budget. The visual physics are the same, but budget flexibility is greater.",
            },
        ],
    },
    {
        heading: "Common Mistakes Buyers Make",
        content: [
            {
                type: "paragraph",
                text: "A common mistake is focusing only on carat and ignoring cut quality and proportion. A smaller well-cut stone can outperform a larger poorly cut one.",
            },
        ],
    },
    {
        heading: "How to Decide the Right Size for You",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Personal style preference",
                    "Finger size and hand proportion",
                    "Budget flexibility",
                    "Desired level of visibility",
                ],
            },
        ],
    },
    {
        heading: "Final Thoughts",
        content: [
            {
                type: "paragraph",
                text: "The best size is not automatically the biggest one. The best size is the one that looks balanced, performs well, and fits your style and budget.",
            },
        ],
    },
];

const faqData = [
    { question: "What is the most popular diamond size?", answer: "Around 1 carat is the most common choice." },
    { question: "Does carat weight equal size?", answer: "No, visual size depends on cut and shape." },
    { question: "Which shape looks the biggest?", answer: "Elongated shapes like oval and marquise usually appear larger." },
    { question: "Can cut affect size appearance?", answer: "Yes, better cut often makes diamonds look bigger." },
    { question: "What size is best for small fingers?", answer: "0.50 to 1.00 carat often appears balanced." },
    { question: "Are larger diamonds always better?", answer: "No, proportion and cut quality matter more than size alone." },
    { question: "How can I make a diamond look bigger?", answer: "Use elongated shapes, strong cut quality, and size-enhancing settings." },
    { question: "Are lab grown diamonds bigger?", answer: "They can be chosen in larger sizes due to lower cost." },
    { question: "Should I hit exact carat numbers?", answer: "Not always. Slightly below can save money with similar appearance." },
    { question: "What should I prioritize?", answer: "A balance of size, cut, and overall ring proportion." },
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
                    What Is the Best Diamond Size for an Engagement Ring?
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
