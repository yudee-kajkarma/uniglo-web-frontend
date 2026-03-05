import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import SubFooter from "@/components/shared/SubFooter";
import BannerImage from "@/assets/fancy-colored-diamonds/banner.png";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Diamons Are Not Made from Coal | Uniglo Diamonds",
    description:
        "Discover the truth about diamond formation. Learn why diamonds are not made from coal and how they are actually formed deep within the Earth’s mantle.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/diamonds-are-not-made-from-coal",
    },
};

const articleData: ArticleSection[] = [
    {
        content: [
            {
                type: "paragraph",
                text: "Many people believe that diamonds are made from coal. It is a very common idea. But the truth is different. Diamonds are not formed from coal. In this blog, we will clearly explain how diamonds are formed, what they are made of, and how lab-made diamonds are created.",
            },
            {
                type: "paragraph",
                text: "In this blog, we will explain clearly:",
            },
            {
                type: "bullet-list",
                items: [
                    "Are diamonds made from coal?",
                    "How diamonds are formed from coal – is it true?",
                    "Do diamonds come from coal?",
                    "Are diamonds made of coal?",
                    "Can you make a diamond?",
                ],
            },
            {
                type: "paragraph",
                text: "Let’s understand the real truth behind diamond formation.",
            },
        ],
    },
    {
        heading: "Are Diamonds Made from Coal?",
        content: [
            {
                type: "paragraph",
                text: "The simple answer is no. Diamonds are not made from coal. This is one of the biggest myths about diamonds.",
            },
            {
                type: "paragraph",
                text: "Coal is formed from ancient plants that lived on Earth’s surface millions of years ago. Diamonds, on the other hand, are formed deep inside the Earth’s mantle, about 140–200 kilometers below the surface, under extremely high pressure and temperature.",
            },
            {
                type: "paragraph",
                text: "Most natural diamonds are much older than most coal deposits. Diamonds are around 1 to 3 billion years old, while most coal is less than 300 million years old. This means diamonds were already formed long before much of the coal even existed.",
            },
        ],
    },
    {
        heading: "How Diamonds Are Really Formed",
        content: [
            {
                type: "paragraph",
                text: "Diamonds are made from pure carbon, but not from coal.",
            },
            {
                type: "paragraph",
                text: "Here is how the process works:",
            },
            {
                type: "numbered-list",
                items: [
                    "Carbon exists deep in the Earth’s mantle.",
                    "The carbon atoms are exposed to very high pressure (over 725,000 pounds per square inch).",
                    "The temperature reaches around 1,000–1,300°C.",
                    "Under these extreme conditions, carbon atoms bond in a special crystal structure.",
                    "Over billions of years, this forms a diamond.",
                ],
            },
            {
                type: "paragraph",
                text: "Later, volcanic eruptions bring these diamonds closer to the Earth’s surface through special volcanic rocks called kimberlite pipes.",
            },
        ],
    },
    {
        heading: "Do Diamonds Come from Coal?",
        content: [
            {
                type: "paragraph",
                text: "Many people search online: “Do diamonds come from coal?” The truth is — almost never.",
            },
            {
                type: "paragraph",
                text: "While both coal and diamonds contain carbon, their origins are completely different.",
            },
            {
                type: "bullet-list",
                items: [
                    "Coal comes from plant material.",
                    "Diamonds come from carbon deep in the Earth’s mantle.",
                ],
            },
            {
                type: "paragraph",
                text: "In very rare cases, tiny diamonds have been found in subduction zones (where tectonic plates move), but even these are not formed from coal in the traditional sense. So the answer to “Do diamonds come from coal?” is scientifically no.",
            },
        ],
    },
    {
        heading: "Are Diamonds Made of Coal?",
        content: [
            {
                type: "paragraph",
                text: "Another common question is: “Are diamonds made of coal?” No, diamonds are not made of coal.",
            },
            {
                type: "paragraph",
                text: "Coal and diamonds are both carbon-based, but they are structured very differently.",
            },
            {
                type: "bullet-list",
                items: [
                    "In coal, carbon atoms are arranged randomly.",
                    "In diamonds, carbon atoms are arranged in a strong crystal lattice structure.",
                ],
            },
            {
                type: "paragraph",
                text: "This crystal structure is what makes diamonds extremely hard, brilliant and sparkly, and perfect for fine jewelry. This is why diamonds are the hardest natural material on Earth.",
            },
        ],
    },
    {
        heading: "How Diamonds Are Formed from Coal – The Myth Explained",
        content: [
            {
                type: "paragraph",
                text: "The idea that diamonds are formed from coal likely came from the fact that both are made of carbon.",
            },
            {
                type: "paragraph",
                text: "However:",
            },
            {
                type: "bullet-list",
                items: [
                    "Most diamonds formed long before coal deposits existed.",
                    "The carbon source for diamonds is usually from deep Earth processes, not plant material.",
                    "Geological studies confirm that coal plays almost no role in natural diamond formation.",
                ],
            },
            {
                type: "paragraph",
                text: "So when people search for “how diamonds are formed from coal”, they are usually discovering this myth. Understanding the truth helps build trust when buying diamonds, especially when investing in high-quality stones.",
            },
            {
                type: "paragraph",
                text: "Can you make a diamond? Modern technology allows us to create lab-grown diamonds that are chemically and physically identical to naturally mined diamonds, without the billions of years of waiting.",
            },
        ],
    },
];

const BlogPage = () => {
    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text="Diamonds Are Not Made from Coal"
                textClassName="left-10 top-1/2 text-4xl md:text-5xl"
                imageClassName="h-64 md:h-96 object-cover"
            />
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        Diamonds Are Not Made from Coal – The Truth Behind Their
                        Formation
                    </h1>
                    <DynamicArticle sections={articleData} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;
