import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

export const metadata: Metadata = {
    title: "Little Sparks, Forever Love: Valentine's Day Diamond Story | Uniglo Diamonds",
    description:
        "Discover diamond and lab-grown diamond jewelry for children this Valentine's Day. Uniglo Jewels offers meaningful gifts that grow with your little ones.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/little-sparks-forever-love-valentines-day",
    },
};

const articleData: ArticleSection[] = [
    {
        content: [
            {
                type: "paragraph",
                text: "Valentine's Day is not only about candlelit dinners and grand gestures. Sometimes, it is about kneeling down to tie a shoelace. Packing a lunchbox with a handwritten note. Watching tiny hands reach out to hold yours.",
            },
            {
                type: "paragraph",
                text: "Love, in its most honest form, begins at home.",
            },
            {
                type: "paragraph",
                text: "This year, Uniglo Jewels reimagines Valentine's gifting through something unexpected yet unforgettable; diamond and lab-grown diamond jewelry for children. Because even the smallest hearts deserve a sparkle that lasts forever.",
            },
        ],
    },
    {
        heading: "Tiny Diamonds, Big Promises",
        content: [
            {
                type: "paragraph",
                text: "A diamond is more than brilliance. It is strength formed under pressure. It is resilience shaped over time. And perhaps that is why it feels so poetic to gift one to your child.",
            },
            {
                type: "paragraph",
                text: "When you place a delicate diamond pendant around your daughter's neck or gift your son a subtle diamond charm bracelet, you are not simply giving jewelry. You are giving a symbol. A quiet promise.",
            },
            {
                type: "paragraph",
                text: "A promise that no matter how the world changes, your love will remain constant. Clear. Unbreakable.",
            },
            {
                type: "paragraph",
                text: "At Uniglo Jewels, each diamond piece for children is thoughtfully designed; soft edges, secure clasps, lightweight comfort; so that elegance meets everyday practicality. The sparkle is refined, never overwhelming. It complements innocence rather than competing with it.",
            },
            {
                type: "paragraph",
                text: "Because childhood is already luminous.",
            },
        ],
    },
    {
        heading: "The New Era of Love: Lab-Grown Diamonds",
        content: [
            {
                type: "paragraph",
                text: "Modern love is conscious. It is thoughtful. It cares not just about today, but about tomorrow.",
            },
            {
                type: "paragraph",
                text: "Lab-grown diamonds reflect that philosophy beautifully.",
            },
            {
                type: "paragraph",
                text: "Chemically, physically, and optically identical to mined diamonds, lab-grown diamonds carry the same fire and brilliance; without the environmental footprint of traditional mining. They represent innovation meeting emotion. Science meeting sentiment.",
            },
            {
                type: "paragraph",
                text: "Gifting lab-grown diamond jewelry to your child this Valentine's Day is more than a beautiful choice; it is a meaningful one. It tells them that love can be brilliant and responsible at the same time.",
            },
            {
                type: "paragraph",
                text: "At Uniglo Jewels, lab-grown diamond collections for children are crafted with the same meticulous attention to detail as natural diamonds. Whether it is a petite heart-shaped pendant, star-studded earrings, or a minimal solitaire bracelet, each piece celebrates the future; bright, ethical, and radiant.",
            },
        ],
    },
    {
        heading: "A First Diamond, A Lifetime Memory",
        content: [
            {
                type: "paragraph",
                text: "There is something magical about a \"first.\"",
            },
            {
                type: "paragraph",
                text: "First steps. First words. First day of school. First piece of diamond jewelry.",
            },
            {
                type: "paragraph",
                text: "A child may not understand the value of a diamond today; but one day, they will understand the love behind it. And that love will mean everything.",
            },
            {
                type: "paragraph",
                text: "Imagine her years from now; graduating, achieving, stepping into her own light; still wearing that Valentine's pendant you once gifted her. Or him carrying a diamond keepsake passed down as a reminder of where his strength began.",
            },
            {
                type: "paragraph",
                text: "Jewelry becomes part of their story.",
            },
            {
                type: "paragraph",
                text: "And stories, when told through diamonds, never fade.",
            },
        ],
    },
    {
        heading: "Beyond Romance: Celebrating Every Form of Love",
        content: [
            {
                type: "paragraph",
                text: "Valentine's Day does not belong to couples alone. It belongs to families. To parents and children. To bonds that do not need candlelight to feel extraordinary.",
            },
            {
                type: "paragraph",
                text: "Choosing diamond or lab-grown diamond jewelry for your children transforms Valentine's Day into a celebration of unconditional love. It shifts the narrative from romance to legacy.",
            },
            {
                type: "paragraph",
                text: "It says: You are cherished. You are valued. You shine already; but here is something to remind you.",
            },
        ],
    },
    {
        heading: "Designed for Today, Treasured for Tomorrow",
        content: [
            {
                type: "paragraph",
                text: "What sets Uniglo Jewels apart is not just craftsmanship; it is intention.",
            },
            {
                type: "paragraph",
                text: "Each children's diamond and lab-grown diamond piece is designed to be:",
            },
            {
                type: "bullet-list",
                items: [
                    "Lightweight for everyday wear",
                    "Safe with secure, comfortable fittings",
                    "Elegant yet playful",
                    "Timeless enough to grow with them",
                ],
            },
            {
                type: "paragraph",
                text: "Because love should not be outgrown.",
            },
            {
                type: "paragraph",
                text: "From minimal solitaires to tiny motifs shaped like stars, butterflies, and hearts, the designs strike the perfect balance between childhood charm and refined sophistication.",
            },
            {
                type: "paragraph",
                text: "They are not trends. They are heirlooms in the making.",
            },
        ],
    },
    {
        heading: "The Sparkle That Grows with Them",
        content: [
            {
                type: "paragraph",
                text: "Children grow quickly. Shoes are replaced. Clothes are outgrown. Toys are forgotten.",
            },
            {
                type: "paragraph",
                text: "But jewelry; especially diamond jewelry; stays.",
            },
            {
                type: "paragraph",
                text: "It moves from childhood to adolescence to adulthood. It becomes a quiet thread connecting every stage of life.",
            },
            {
                type: "paragraph",
                text: "This Valentine's Day, instead of gifting something that will fade, choose something that evolves.",
            },
            {
                type: "paragraph",
                text: "Choose brilliance that mirrors their potential. Choose clarity that reflects your intentions. Choose love that shines in every light.",
            },
            {
                type: "paragraph",
                text: "Choose Uniglo Jewels.",
            },
            {
                type: "paragraph",
                text: "Because sometimes, the smallest diamonds carry the biggest emotions. And sometimes, the tiniest treasures hold forever inside them.",
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
                        Little Sparks, Forever Love: A Valentine&apos;s Day Story in Diamond & Lab-Grown Diamond
                    </h1>
                    <DynamicArticle sections={articleData} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;
