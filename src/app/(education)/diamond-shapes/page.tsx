import React from "react";
import Image, { StaticImageData } from "next/image";
import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import BannerImage from "@/assets/diamond-shape/banner.jpeg";
import SubFooter from "@/components/shared/SubFooter";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

// Diamond shape images
import RoundDiamonds from "@/assets/shapes/round.png";
import PrincessDiamonds from "@/assets/shapes/princess.png";
import CushionDiamonds from "@/assets/shapes/cushion.png";
import EmeraldDiamonds from "@/assets/shapes/emerald.png";
import OvalDiamonds from "@/assets/shapes/oval.png";
import RadiantDiamonds from "@/assets/shapes/radiant.png";
import AssherDiamonds from "@/assets/shapes/asscher.png";
import MarquiseDiamonds from "@/assets/shapes/marquise.png";
import HeartDiamonds from "@/assets/shapes/heart.png";
import PearDiamonds from "@/assets/shapes/pear.png";
import { Metadata } from "next";

const introData: ArticleSection[] = [
    {
        heading: "Selecting the Perfect Diamond Shape – A Complete Guide",
        content: [
            {
                type: "paragraph",
                text: "Choosing the perfect diamond shape is one of the most exciting steps when purchasing an engagement ring, wedding band, anniversary gift, or investment stone. The shape of a diamond refers to its physical outline or form — and it is usually the very first feature people notice. Before considering carat weight, clarity, or even budget, most buyers are naturally drawn to a particular shape that reflects their personality, style, and emotional connection to the occasion. ",
            },
            {
                type: "paragraph",
                text: "Whether your choice is influenced by timeless elegance, modern trends, symbolic meaning, or value considerations, understanding diamond shapes in detail will help you make a confident and informed decision. Each shape offers its own character, brilliance pattern, and visual impact — and each interacts differently with the famous 4Cs: cut, colour, clarity, and carat weight.",
            },
            {
                type: "paragraph",
                text: "This comprehensive guide will walk you through the differences between diamond shape and cut, the importance of proportions, and a detailed overview of the most popular diamond shapes available today.",
            },
        ],
    },
    {
        heading: "Diamond Shape vs. Diamond Cut – Understanding the Difference",
        content: [
            {
                type: "paragraph",
                text: "One of the most common misconceptions in diamond buying is confusing “shape” with “cut.” While they are related, they are not the same.",
            },
            {
                type: "bullet-list",
                items: [
                    "Diamond Shape refers to the outer appearance or silhouette of the stone — for example, round, oval, princess, or emerald.",
                    "Diamond Cut, on the other hand, refers to how well the diamond’s facets are proportioned, aligned, and polished. It determines how effectively the stone reflects and refracts light.",
                ],
            },
            {
                type: "paragraph",
                text: "A diamond of any shape can have different cut grades, such as Very Good or Excellent. The cut grade directly influences brilliance (white light reflection), fire (rainbow dispersion), and scintillation (sparkle pattern).",
            },
            {
                type: "paragraph",
                text: "At Uniglo Diamonds, we recommend selecting diamonds with a cut grade of Very Good or Excellent to maximize beauty and value. Even the most elegant shape can appear dull if poorly cut, while a well-cut diamond will radiate exceptional brilliance regardless of shape.",
            },
        ],
    },
    {
        heading: "Length-to-Width Ratio",
        content: [
            {
                type: "paragraph",
                text: "Another important factor in selecting a shape is the length-to-width ratio.",
            },
            {
                type: "bullet-list",
                items: [
                    "A higher ratio results in a longer, more elongated appearance.",
                    "A lower ratio produces a more square or circular look.",
                ],
            },
            {
                type: "paragraph",
                text: "For elongated shapes like oval, marquise, and pear, the ratio significantly impacts visual style and finger coverage. Choosing the right proportions ensures the diamond complements your hand and ring setting beautifully.",
            },
        ],
    },
    {
        heading: "Popular Diamond Shapes Explained",
        content: [
            {
                type: "paragraph",
                text: "Each diamond shape has unique features, brilliance patterns, and aesthetic appeal. Below is a detailed guide to the most sought-after diamond shapes.",
            },
        ],
    },
];

type ShapeSection = {
    name: string;
    image: StaticImageData;
    content: ArticleSection[];
};

const shapeSections: ShapeSection[] = [
    {
        name: "Round",
        image: RoundDiamonds,
        content: [
            {
                heading: "Round Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "The round brilliant cut is the most popular diamond shape in the world. Known for its timeless appeal, it remains the top choice for engagement rings across generations.",
                    },
                    {
                        type: "paragraph",
                        text: "Designed with 58 precisely arranged facets, round diamonds are engineered to maximize light reflection. This makes them the most brilliant and sparkly of all shapes.",
                    },
                ],
            },
            {
                heading: "Why Choose Round Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Exceptional brilliance and fire",
                            "Classic, versatile appearance",
                            "Works beautifully in almost all ring settings",
                            "Strong resale value due to high demand",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Round diamonds are ideal for those who value tradition, elegance, and maximum sparkle.",
                    },
                ],
            },
        ],
    },
    {
        name: "Princess",
        image: PrincessDiamonds,
        content: [
            {
                heading: "Princess Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "Princess cut diamonds are the second most popular choice after round diamonds. They feature a square or slightly rectangular shape with pointed corners and brilliant-style faceting.",
                    },
                    {
                        type: "paragraph",
                        text: "Princess cuts offer modern sophistication while maintaining impressive sparkle. They are often chosen for contemporary engagement ring designs.",
                    },
                ],
            },
            {
                heading: "Why Choose Princess Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Modern, geometric aesthetic",
                            "Strong brilliance similar to round diamonds",
                            "Excellent value compared to round cuts",
                            "Versatile for solitaire or halo settings",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Their clean lines and sharp corners make them especially appealing to buyers seeking a bold, fashionable look.",
                    },
                ],
            },
        ],
    },
    {
        name: "Cushion",
        image: CushionDiamonds,
        content: [
            {
                heading: "Cushion Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "The cushion cut combines a square shape with softly rounded corners, resembling a pillow. It has been popular for over a century and is often associated with vintage-inspired designs.",
                    },
                    {
                        type: "paragraph",
                        text: "Cushion diamonds can display either a classic chunky facet pattern or a more brilliant, modern sparkle depending on the cut style.",
                    },
                ],
            },
            {
                heading: "Why Choose Cushion Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Romantic, antique charm",
                            "Soft and elegant appearance",
                            "Adapts well to many ring styles",
                            "Strong fire and brilliance",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Cushion cuts are perfect for those who appreciate timeless beauty with a hint of vintage glamour.",
                    },
                ],
            },
        ],
    },
    {
        name: "Emerald",
        image: EmeraldDiamonds,
        content: [
            {
                heading: "Emerald Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "Emerald cut diamonds feature a rectangular shape with trimmed corners and step-cut facets. Instead of intense sparkle, they produce a sophisticated “hall of mirrors” effect.",
                    },
                    {
                        type: "paragraph",
                        text: "This shape emphasizes clarity more than any other, as its large open table makes inclusions easier to see. Therefore, higher clarity grades are recommended for emerald cuts.",
                    },
                ],
            },
            {
                heading: "Why Choose Emerald Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Elegant, refined appearance",
                            "Unique step-cut brilliance",
                            "Larger visual surface area",
                            "Timeless, sophisticated appeal",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Emerald cuts are ideal for individuals who prefer understated luxury over dramatic sparkle.",
                    },
                ],
            },
        ],
    },
    {
        name: "Oval",
        image: OvalDiamonds,
        content: [
            {
                heading: "Oval Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "Oval diamonds combine the brilliance of round diamonds with an elongated silhouette. They are known for creating the illusion of greater size compared to other shapes of the same carat weight.",
                    },
                    {
                        type: "paragraph",
                        text: "Their elongated form can also make fingers appear longer and slimmer.",
                    },
                ],
            },
            {
                heading: "Why Choose Oval Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Excellent brilliance",
                            "Appears larger than round diamonds of equal weight",
                            "Elegant and flattering shape",
                            "Popular for modern engagement rings",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Oval diamonds are a favorite for those who want sparkle with a distinctive twist.",
                    },
                ],
            },
        ],
    },
    {
        name: "Radiant",
        image: RadiantDiamonds,
        content: [
            {
                heading: "Radiant Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "Radiant cut diamonds blend the rectangular outline of emerald cuts with the brilliance of round cuts. Featuring trimmed corners and brilliant-style faceting, they deliver intense sparkle.",
                    },
                    {
                        type: "paragraph",
                        text: "Radiant diamonds are durable and versatile, making them suitable for various settings.",
                    },
                ],
            },
            {
                heading: "Why Choose Radiant Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "High brilliance and fire",
                            "Strong, durable corners",
                            "Modern yet refined look",
                            "Hides inclusions better than step cuts",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "They are perfect for buyers who love rectangular shapes but desire maximum sparkle.",
                    },
                ],
            },
        ],
    },
    {
        name: "Asscher",
        image: AssherDiamonds,
        content: [
            {
                heading: "Asscher Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "The Asscher cut is a square step-cut diamond with deeply trimmed corners and a distinctive vintage look. It offers a prismatic brilliance and symmetrical facet pattern.",
                    },
                    {
                        type: "paragraph",
                        text: "Like emerald cuts, Asscher diamonds highlight clarity and symmetry rather than intense sparkle.",
                    },
                ],
            },
            {
                heading: "Why Choose Asscher Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Art Deco elegance",
                            "Unique geometric design",
                            "Sophisticated light reflection",
                            "Rare and distinctive choice",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Asscher cuts appeal to buyers who appreciate architectural precision and heritage design.",
                    },
                ],
            },
        ],
    },
    {
        name: "Marquise",
        image: MarquiseDiamonds,
        content: [
            {
                heading: "Marquise Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "Marquise diamonds feature a long, narrow shape with pointed ends and a curved center, resembling the hull of a boat. This shape maximizes surface area, often appearing larger than other shapes of equal carat weight.",
                    },
                ],
            },
            {
                heading: "Why Choose Marquise Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Largest face-up appearance per carat",
                            "Dramatic and eye-catching",
                            "Elongates the finger beautifully",
                            "Excellent for maximizing carat weight",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Marquise diamonds are bold and elegant, ideal for making a strong visual statement.",
                    },
                ],
            },
        ],
    },
    {
        name: "Heart",
        image: HeartDiamonds,
        content: [
            {
                heading: "Heart Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "The heart-shaped diamond is one of the most romantic and symbolic shapes available. Representing love and devotion, it is often chosen for special anniversary or sentimental jewellery pieces.",
                    },
                    {
                        type: "paragraph",
                        text: "Heart diamonds require exceptional cutting precision to maintain symmetry between the two halves.",
                    },
                ],
            },
            {
                heading: "Why Choose Heart Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Strong romantic symbolism",
                            "Rare and distinctive",
                            "Bold visual impact",
                            "Ideal for meaningful occasions",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "This shape is perfect for those who want their jewellery to tell an emotional story.",
                    },
                ],
            },
        ],
    },
    {
        name: "Pear",
        image: PearDiamonds,
        content: [
            {
                heading: "Pear Diamonds",
                content: [
                    {
                        type: "paragraph",
                        text: "Pear-shaped diamonds, also known as teardrop diamonds, combine the round and marquise shapes. They feature one rounded end and one pointed tip.",
                    },
                    {
                        type: "paragraph",
                        text: "They offer excellent brilliance and elongation, making them both elegant and eye-catching.",
                    },
                ],
            },
            {
                heading: "Why Choose Pear Diamonds?",
                content: [
                    {
                        type: "bullet-list",
                        items: [
                            "Unique and graceful silhouette",
                            "Appears larger than many other shapes",
                            "Versatile for pendants and rings",
                            "Elegant and contemporary",
                        ],
                    },
                    {
                        type: "paragraph",
                        text: "Pear diamonds are ideal for buyers who want sophistication with a modern edge.",
                    },
                ],
            },
        ],
    },
];

const outroData: ArticleSection[] = [
    {
        heading: "Financing Options for Your Diamond Purchase",
        content: [
            {
                type: "paragraph",
                text: "Selecting the perfect diamond is an investment — and flexible financing options can make the process easier.",
            },
            {
                type: "paragraph",
                text: "Uniglo offers interest-free diamond financing options:",
            },
            {
                type: "bullet-list",
                items: [
                    "Certified goods can be paid within 60 days of purchase under an interest-free plan.",
                    "Polished diamonds may qualify for 120-day interest-free financing.",
                ],
            },
            {
                type: "paragraph",
                text: "For detailed eligibility and terms, our customer care representatives are always available to assist.",
            },
        ],
    },
    {
        heading: "How to Choose the Right Diamond Shape",
        content: [
            {
                type: "paragraph",
                text: "When deciding on a diamond shape, consider the following:",
            },
            {
                type: "numbered-list",
                items: [
                    "Personal Style – Classic, modern, vintage, or bold?",
                    "Hand Proportion – Elongated shapes flatter shorter fingers.",
                    "Brilliance Preference – Do you prefer intense sparkle or subtle elegance?",
                    "Budget – Some shapes offer better value per carat than others.",
                    "Setting Style – Certain shapes suit specific ring designs better.",
                ],
            },
            {
                type: "paragraph",
                text: "Ultimately, the perfect diamond shape is one that resonates with your personality and enhances your emotional connection to the piece.",
            },
        ],
    },
    {
        heading: "Final Thoughts",
        content: [
            {
                type: "paragraph",
                text: "Selecting the perfect diamond shape is a deeply personal decision. Each shape tells its own story, reflects light in its own way, and highlights the 4Cs differently. From the unmatched brilliance of round diamonds to the vintage sophistication of emerald and Asscher cuts, every option offers unique beauty.",
            },
            {
                type: "paragraph",
                text: "Understanding the differences between shape and cut, considering proportions, and evaluating personal style will ensure that your choice is both meaningful and visually stunning.",
            },
            {
                type: "paragraph",
                text: "A diamond is more than a gemstone — it is a symbol of love, celebration, and legacy. Choosing the right shape ensures that your diamond not only shines brilliantly but also reflects who you are.",
            },
        ],
    },
];
export const metadata: Metadata = {
    title: "Guide to Diamond Shapes | Round, Princess, Cushion & More",
    description:
        "Explore popular diamond shapes—from Round Brilliant to Emerald & Heart cuts. Discover how each shape impacts sparkle, style & value.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/diamond-shapes",
    },
};
const page = () => {
    return (
        <div className="min-h-screen">
            <BannerSection
                image={BannerImage}
                text="Diamond Shape"
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />

            <div className="max-w-[1400px] mx-auto px-4 flex flex-col xl:flex-row gap-12 mt-10 mb-20">
                <div className="w-full xl:w-3/4">
                    {/* Intro Section Rendering */}
                    <div className="mb-20">
                        <DynamicArticle sections={introData} />
                    </div>

                    {/* Shapes Iteration (Image & Text side by side) */}
                    <div className="space-y-20 border-t border-b border-slate-200 py-20 mb-20">
                        {shapeSections.map((shape, idx) => (
                            <div
                                key={idx}
                                // Alternate layout so every second shape has image on the right
                                className={`flex flex-col md:flex-row items-center md:items-start gap-12 ${
                                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                {/* Image side */}
                                <div className="w-full md:w-1/3 flex justify-center lg:sticky lg:top-24">
                                    <div className="bg-slate-50 border border-slate-200 p-8 w-full max-w-sm flex items-center justify-center rounded-sm">
                                        <Image
                                            src={shape.image}
                                            alt={shape.name}
                                            className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-2/3">
                                    <DynamicArticle sections={shape.content} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Outro & Financing Section Rendering */}
                    <div>
                        <DynamicArticle sections={outroData} />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full xl:w-1/4">
                    <EducationSidebar className="w-full space-y-10 sticky top-24" />
                </div>
            </div>
        </div>
    );
};

export default page;
