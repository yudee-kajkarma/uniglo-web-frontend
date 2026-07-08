import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

export const metadata: Metadata = {
    title: "Jewellery That Speaks Love This Valentine's Day | Uniglo Diamonds",
    description:
        "Discover jewellery that speaks love this Valentine's Day. Uniglo Jewels offers timeless, meaningful designs for every heart and every relationship.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/jewellery-that-speaks-love-valentines-day",
    },
};

const articleData: ArticleSection[] = [
    {
        content: [
            {
                type: "paragraph",
                text: "Love rarely announces itself anymore. It lives in quiet moments; in shared mornings, familiar laughter, and the comfort of being truly seen. Valentine\u2019s Day, once defined by grand gestures, has softened into something more personal. In that space, jewellery finds its most honest expression.",
            },
            {
                type: "paragraph",
                text: "At Uniglo Jewels, this belief shapes every design. Jewellery is not created to simply sparkle for a moment, but to stay; to become part of someone\u2019s everyday life, carrying meaning long after the day itself has passed.",
            },
        ],
    },
    {
        heading: "When Love Becomes Something You Wear",
        content: [
            {
                type: "paragraph",
                text: "There is an intimacy to jewellery that few gifts can match. A necklace resting near the heart. A ring that moves with every gesture. Earrings worn so often they begin to feel like a part of you. Over time, these pieces stop feeling new and start feeling familiar, collecting moments along the way.",
            },
            {
                type: "paragraph",
                text: "Uniglo Jewels designs with this closeness in mind. Each piece is meant to be lived in; worn through ordinary days and meaningful milestones alike. Jewellery becomes a quiet companion, holding memory without needing explanation.",
            },
        ],
    },
    {
        heading: "The Beauty of Choosing with Intention",
        content: [
            {
                type: "paragraph",
                text: "Modern love values thoughtfulness over excess. People are choosing gifts that reflect understanding rather than obligation. Jewellery, when chosen carefully, becomes a reflection of how well you know someone.",
            },
            {
                type: "paragraph",
                text: "A refined pendant might speak to quiet elegance. A structured ring might mirror confidence and strength. Delicate studs may become an everyday reminder of love woven into routine. At Uniglo Jewels, the focus remains on creating designs that allow these emotions to surface naturally; never loud, never overstated.",
            },
        ],
    },
    {
        heading: "Beyond Trends, Toward Emotion",
        content: [
            {
                type: "paragraph",
                text: "Trends move quickly. Meaning does not. Jewellery chosen for emotion rather than fashion carries a different kind of value; one that deepens with time.",
            },
            {
                type: "paragraph",
                text: "Uniglo Jewels stays rooted in clean design and thoughtful craftsmanship, allowing each piece to feel timeless rather than tied to a moment. When jewellery reflects personality instead of trends, it becomes something the wearer returns to again and again.",
            },
        ],
    },
    {
        heading: "Love in All Its Forms",
        content: [
            {
                type: "paragraph",
                text: "Valentine\u2019s Day today is broader, warmer, and more inclusive. It celebrates romantic love, yes; but also self-love, family bonds, and connections that grow quietly over time.",
            },
            {
                type: "paragraph",
                text: "More people are choosing to gift jewellery to themselves, marking personal milestones or honoring their own journeys. Others are sharing Valentine\u2019s Day with family, gifting meaningful pieces to children that may one day become their first keepsakes. Uniglo Jewels embraces this expanded view of love, creating jewellery that resonates across generations and relationships.",
            },
        ],
    },
    {
        heading: "Jewellery as Memory, Not Moment",
        content: [
            {
                type: "paragraph",
                text: "What sets jewellery apart is its ability to hold memory. Long after the occasion has passed, a piece can still bring back the feeling of being chosen, loved, and understood.",
            },
            {
                type: "paragraph",
                text: "This emotional longevity is central to the Uniglo Jewels philosophy. Jewellery is not meant to be worn once and forgotten. It is meant to stay; growing more meaningful with every passing year.",
            },
        ],
    },
    {
        heading: "Designed for Real Life at Uniglo Jewels",
        content: [
            {
                type: "paragraph",
                text: "At Uniglo Jewels, design begins with intention and restraint. Each piece balances elegance with wearability, allowing it to blend seamlessly into everyday life. Clean lines, thoughtful proportions, and quality craftsmanship ensure jewellery feels as natural on a quiet afternoon as it does on a special evening.",
            },
            {
                type: "paragraph",
                text: "These are pieces designed for real lives, real stories, and real moments; not just Valentine\u2019s Day, but every day that follows.",
            },
        ],
    },
    {
        heading: "A Love That Continues to Speak",
        content: [
            {
                type: "paragraph",
                text: "Valentine\u2019s Day may come and go, but love remains. Jewellery has the rare ability to carry that love forward; quietly, beautifully, and endlessly.",
            },
            {
                type: "paragraph",
                text: "This Valentine\u2019s Day, Uniglo Jewels invites you to choose a piece that speaks softly but clearly. One that doesn\u2019t just celebrate a moment, but becomes part of a story. Because the most meaningful love doesn\u2019t shout; it stays.",
            },
        ],
    },
];

const BlogPage = () => {
    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        Jewellery That Speaks Love This Valentine&apos;s Day
                    </h1>
                    <DynamicArticle sections={articleData} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;
