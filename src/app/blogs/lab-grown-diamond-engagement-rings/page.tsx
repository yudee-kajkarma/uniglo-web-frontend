import React from "react";
import { Metadata } from "next";
import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import BannerImage from "@/assets/fancy-colored-diamonds/banner.png";

export const metadata: Metadata = {
    title: "Lab Grown Diamond Engagement Rings | Uniglo Diamonds",
    description:
        "Shop stunning lab grown diamond engagement rings at Uniglo Diamonds. Ethical, affordable, and brilliant designs crafted for your perfect proposal.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/lab-grown-diamond-engagement-rings",
    },
};

const articleData: ArticleSection[] = [
    {
        content: [
            {
                type: "paragraph",
                text: "Are you searching for an engagement ring that combines beauty, ethics, and value? Lab grown diamond engagement rings are a modern choice for couples who want brilliance without compromise.",
            },
            {
                type: "paragraph",
                text: "In this guide, we explain what lab diamonds are, how they compare with mined diamonds, what styles are popular, and how to choose the right stone.",
            },
        ],
    },
    {
        heading: "What Are Lab Grown Diamond Engagement Rings?",
        content: [
            {
                type: "paragraph",
                text: "Lab grown engagement rings feature diamonds created in controlled laboratory environments using advanced technology.",
            },
            {
                type: "paragraph",
                text: "These diamonds are chemically, physically, and optically identical to natural diamonds. They are real diamonds, not simulants like cubic zirconia or moissanite.",
            },
            {
                type: "paragraph",
                text: "The two main production methods are HPHT (High Pressure High Temperature) and CVD (Chemical Vapor Deposition).",
            },
        ],
    },
    {
        heading: "Lab Grown vs Natural Diamonds",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Chemical composition: Both are pure carbon crystals.",
                    "Hardness: Both are 10 on the Mohs scale.",
                    "Appearance: Fire, brilliance, and sparkle are visually the same.",
                    "Price: Lab diamonds are often 50–70% less expensive.",
                    "Sourcing: Lab diamonds avoid destructive mining practices.",
                ],
            },
        ],
    },
    {
        heading: "Popular Styles of Lab Grown Diamond Rings",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Solitaire: Timeless and elegant with one center stone.",
                    "Halo: Extra sparkle with a border of smaller diamonds.",
                    "Three-stone: Symbolizes past, present, and future.",
                    "Pavé: Small diamonds set across the band for maximum shine.",
                    "Vintage-inspired: Milgrain details and classic romantic motifs.",
                ],
            },
        ],
    },
    {
        heading: "How to Choose a Lab Diamond: The 4Cs",
        content: [
            {
                type: "paragraph",
                text: "Cut: The most important factor for sparkle. Excellent or ideal cuts usually perform best.",
            },
            {
                type: "paragraph",
                text: "Color: For a bright white appearance, D–F is colorless; G–H offers strong value.",
            },
            {
                type: "paragraph",
                text: "Clarity: Many inclusions are not visible to the naked eye. Choose eye-clean clarity for value.",
            },
            {
                type: "paragraph",
                text: "Carat: Lab diamonds allow larger carat sizes at the same budget compared to mined stones.",
            },
        ],
    },
    {
        heading: "Why Choose Uniglo Diamonds?",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Certified diamonds (IGI or GIA)",
                    "Expert craftsmanship",
                    "Wide style selection",
                    "Competitive pricing",
                    "Ethical and sustainable focus",
                    "Personalized support from specialists",
                ],
            },
        ],
    },
    {
        heading: "Frequently Asked Questions",
        content: [
            {
                type: "paragraph",
                text: "Are lab grown diamonds real diamonds? Yes. They are real diamonds with the same core properties as mined diamonds.",
            },
            {
                type: "paragraph",
                text: "Do lab grown rings look different? No. They are visually identical in normal viewing conditions.",
            },
            {
                type: "paragraph",
                text: "Are diamonds made from coal? No. Diamonds form deep in the Earth from carbon under high pressure and heat.",
            },
            {
                type: "paragraph",
                text: "Can I customize my ring? Yes. You can customize shape, size, metal, and setting style.",
            },
            {
                type: "paragraph",
                text: "What metals are available? Common choices include platinum, 18k white gold, yellow gold, and rose gold.",
            },
        ],
    },
    {
        heading: "Care Tips for Your Ring",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Clean with mild soap, warm water, and a soft brush.",
                    "Avoid harsh chemicals like bleach or chlorine.",
                    "Store separately in a soft pouch or jewelry box.",
                    "Get annual professional inspections for prongs and settings.",
                    "Remove during heavy physical activity.",
                ],
            },
        ],
    },
    {
        heading: "Conclusion",
        content: [
            {
                type: "paragraph",
                text: "Lab grown diamond engagement rings deliver exceptional value, beauty, and responsible sourcing.",
            },
            {
                type: "paragraph",
                text: "If you want a brilliant ring with certified quality and modern ethics, this is one of the strongest choices available today.",
            },
        ],
    },
];

const BlogPage = () => {
    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text="Lab Grown Diamond Engagement Rings"
                textClassName="left-10 top-80 text-3xl md:text-5xl"
                imageClassName="h-64 md:h-96 object-cover"
            />
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        Lab Grown Diamond Engagement Rings: The Ultimate Guide
                    </h1>
                    <DynamicArticle sections={articleData} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;
