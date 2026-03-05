import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import BannerImage from "@/assets/fancy-colored-diamonds/fancybanner.jpeg";
import Image, { StaticImageData } from "next/image";

// Replace with your actual image paths
import BlueDiamondChart from "@/assets/fancy-colored-diamonds/blue-diamonds.png";
import YellowDiamondChart from "@/assets/fancy-colored-diamonds/green-diamonds.png";
import GreenDiamondChart from "@/assets/fancy-colored-diamonds/green-diamond.png";
import ContactBannerImage from "@/assets/banner_2.jpg";
import SubFooter from "@/components/shared/SubFooter";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fancy Colored Diamonds | Rare Blue, Yellow & Green Diamonds",
    description:
        "Discover fancy colored diamonds at Uniglo. From vivid blues to canary yellow & emerald green, shop GIA-certified gems for unique collections.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/fancy-colored-diamonds",
    },
};

const introData: ArticleSection[] = [
    {
        heading: "Fancy Coloured Diamonds – Blue, Yellow and Green Diamonds",
        content: [
            {
                type: "paragraph",
                text: "Fancy coloured diamonds represent some of the rarest and most captivating treasures in the world of fine gemstones. Unlike traditional white diamonds, these extraordinary stones display vivid natural colours formed deep within the Earth under highly specific geological conditions.",
            },
            {
                type: "paragraph",
                text: "Among the most desirable and investment-worthy fancy diamonds are blue, yellow, and green diamonds. Each of these colours is created by unique natural elements and processes, making them highly sought-after by collectors, investors, and jewellery enthusiasts worldwide.",
            },
        ],
    },
];

const blueData: ArticleSection[] = [
    {
        heading: "Blue Diamonds – Rare Beauty from the Depths of the Earth",
        content: [
            {
                type: "paragraph",
                text: "Blue diamonds are among the rarest and most valuable gemstones ever discovered. Their mesmerizing colour, combined with extreme scarcity, has made them legendary in both the jewellery market and popular culture.",
            },
        ],
    },
    {
        heading: "Origins and Rarity",
        content: [
            {
                type: "paragraph",
                text: "Historically, some of the earliest blue diamonds were discovered in India. Over time, additional deposits were found in select regions of Africa. However, blue diamonds remain exceptionally rare, with only a limited number entering the global market each year.",
            },
            {
                type: "paragraph",
                text: "Their rarity significantly increases their desirability — particularly among high-end collectors and diamond investors. Because supply is limited and demand continues to grow, blue diamonds have shown strong long-term value appreciation.",
            },
            {
                type: "paragraph",
                text: "Owning a natural blue diamond is often considered a privilege reserved for connoisseurs. These stones are not only valuable but also geological marvels formed billions of years ago under immense pressure deep beneath the Earth’s surface.",
            },
        ],
    },
    {
        heading: "What Gives Blue Diamonds Their Colour?",
        content: [
            {
                type: "paragraph",
                text: "Blue diamonds obtain their stunning hue from the presence of boron within their carbon structure. The higher the boron concentration, the deeper and more intense the blue colour.",
            },
            {
                type: "paragraph",
                text: "Scientific studies suggest that these diamonds crystallize at significantly deeper levels within the Earth compared to most other diamonds. Some research even indicates that their boron content may have originated from ancient oceanic crust material that was carried deep into the Earth’s mantle through tectonic processes.",
            },
            {
                type: "paragraph",
                text: "Despite their colour, blue diamonds are composed almost entirely of carbon, making them extremely durable and suitable for everyday jewellery wear.",
            },
            {
                type: "paragraph",
                text: "Many natural blue diamonds also contain subtle grey undertones, which can further influence their rarity and grading.",
            },
        ],
    },
    {
        heading: "Certification and Grading",
        content: [
            {
                type: "paragraph",
                text: "The colour of blue diamonds — like all fancy coloured diamonds — is determined by respected gemological laboratories such as the Gemological Institute of America (GIA).",
            },
            {
                type: "paragraph",
                text: "The GIA uses advanced technology and strict grading standards to evaluate:",
            },
            { type: "bullet-list", items: ["Hue", "Tone", "Saturation"] },
            {
                type: "paragraph",
                text: "For blue diamonds, deeper saturation levels such as Fancy Intense or Fancy Vivid command significantly higher prices.",
            },
        ],
    },
    {
        heading: "Famous Blue Diamonds",
        content: [
            {
                type: "paragraph",
                text: "One of the most iconic blue diamonds in history is the Hope Diamond. Known for its deep blue colour and fascinating history, it has become a symbol of mystery and luxury in popular culture.",
            },
        ],
    },
    {
        heading: "Investment Potential",
        content: [
            {
                type: "paragraph",
                text: "Because of their rarity and increasing demand, blue diamonds are considered strong investment assets. Over the years, auction prices for high-quality natural blue diamonds have consistently broken records. For investors seeking diversification into tangible luxury assets, blue diamonds offer both emotional and financial value.",
            },
        ],
    },
];

const yellowData: ArticleSection[] = [
    {
        heading: "Yellow Diamonds – Radiant Sunshine in a Gem",
        content: [
            {
                type: "paragraph",
                text: "Yellow diamonds are among the most popular fancy coloured diamonds. Their vibrant glow resembles sunlight captured within a gemstone, making them a joyful and eye-catching choice for jewellery.",
            },
        ],
    },
    {
        heading: "What Causes the Yellow Colour?",
        content: [
            {
                type: "paragraph",
                text: "Yellow diamonds owe their colour to the presence of nitrogen during their formation. Nitrogen atoms absorb blue light, which results in the diamond reflecting a yellow hue.",
            },
            {
                type: "paragraph",
                text: "The intensity of yellow can range from very light to deep, vivid shades.",
            },
        ],
    },
    {
        heading: "Understanding Yellow Diamond Grading",
        content: [
            {
                type: "paragraph",
                text: "Fancy yellow diamonds are graded based on colour intensity, including:",
            },
            {
                type: "bullet-list",
                items: [
                    "Fancy Light Yellow",
                    "Fancy Yellow",
                    "Fancy Intense Yellow",
                    "Fancy Vivid Yellow",
                ],
            },
            {
                type: "paragraph",
                text: "The stronger and more saturated the yellow, the higher the value.",
            },
            {
                type: "paragraph",
                text: "When yellow diamonds display secondary hues such as orange or green, their value may increase depending on the attractiveness and rarity of the combination.",
            },
        ],
    },
    {
        heading: "Canary Yellow Diamonds",
        content: [
            {
                type: "paragraph",
                text: "When a yellow diamond displays a rich, deep, and intense golden tone, it is often referred to as a Canary Yellow Diamond or simply “Canary.”",
            },
            {
                type: "paragraph",
                text: "This term became popular in the late 1800s when vibrant yellow diamonds were discovered in South Africa’s Cape Colony mines. These diamonds are particularly admired for their bold and luxurious appearance.",
            },
        ],
    },
    {
        heading: "Investment and Value Considerations",
        content: [
            {
                type: "paragraph",
                text: "Compared to other fancy coloured diamonds like blue or green, yellow diamonds are relatively more affordable. This is largely because they are more commonly found. However, pricing still depends heavily on:",
            },
            {
                type: "bullet-list",
                items: [
                    "Colour intensity",
                    "Cut quality",
                    "Clarity",
                    "Carat weight",
                    "Presence of secondary hues",
                ],
            },
            {
                type: "paragraph",
                text: "Even slight colour variations can significantly impact value. For example:",
            },
            {
                type: "bullet-list",
                items: [
                    "A pure vivid yellow stone commands a premium.",
                    "A noticeable brownish tint may reduce value.",
                    "Orange or green modifiers may increase desirability.",
                ],
            },
            {
                type: "paragraph",
                text: "Before investing in yellow diamonds, consulting with experienced diamond professionals is highly recommended.",
            },
        ],
    },
    {
        heading: "Setting Considerations",
        content: [
            {
                type: "paragraph",
                text: "When purchasing a yellow diamond for jewellery, the metal setting plays a critical role.",
            },
            {
                type: "bullet-list",
                items: [
                    "Yellow gold enhances warmth and harmony.",
                    "White gold or platinum creates contrast, making the diamond appear more vibrant.",
                ],
            },
            {
                type: "paragraph",
                text: "Choosing the right setting ensures the diamond’s colour stands out beautifully.",
            },
        ],
    },
];

const greenData: ArticleSection[] = [
    {
        heading: "Green Diamonds – Nature’s Rare Masterpiece",
        content: [
            {
                type: "paragraph",
                text: "Green diamonds are among the rarest fancy coloured diamonds in the world. Only a handful reach the global market each year, making them exceptionally valuable and highly coveted.",
            },
        ],
    },
    {
        heading: "Formation and Origin",
        content: [
            {
                type: "paragraph",
                text: "Green diamonds form at depths of approximately 150–200 kilometers beneath the Earth’s surface under extreme temperatures and pressures over millions of years.",
            },
            {
                type: "paragraph",
                text: "Their colour is not caused by a chemical element like boron or nitrogen. Instead, it results from natural radiation exposure over long geological periods. This radiation alters the diamond’s crystal lattice structure, producing a green hue.",
            },
            {
                type: "paragraph",
                text: "Many green diamonds originate from parts of South America and Africa, though production remains extremely limited.",
            },
        ],
    },
    {
        heading: "Types of Natural Green Diamonds",
        content: [
            {
                type: "paragraph",
                text: "Natural green diamonds generally fall into two categories:",
            },
            {
                type: "paragraph",
                text: "1. Green Surface Shade: In these diamonds, the green colour appears only on the outer layer of the stone due to surface radiation exposure. Once cut or polished, some of the colour may be removed.",
            },
            {
                type: "paragraph",
                text: "2. Green Body Colour: These diamonds display green colour throughout the entire stone. The hue is evenly distributed, resulting in stronger saturation and higher value.",
            },
            {
                type: "paragraph",
                text: "Green body colour diamonds are significantly rarer and more valuable than surface-shaded stones.",
            },
        ],
    },
    {
        heading: "Investment Trends",
        content: [
            {
                type: "paragraph",
                text: "Over recent years, green diamond prices have steadily increased. Due to their extreme rarity and growing demand, they are considered a strong long-term investment.",
            },
            {
                type: "paragraph",
                text: "High-quality natural green diamonds have achieved remarkable results at international auctions, attracting collectors seeking unique and limited assets.",
            },
        ],
    },
    {
        heading: "Beauty and Appeal",
        content: [
            {
                type: "paragraph",
                text: "Green diamonds are admired for their striking and elegant appearance. Their colour ranges from soft mint tones to deep forest green shades. The interaction between light and the stone’s crystal structure creates a captivating visual effect that sets them apart from other coloured diamonds.",
            },
        ],
    },
];

const outroData: ArticleSection[] = [
    {
        heading: "Why Fancy Coloured Diamonds Are Valuable Investments",
        content: [
            {
                type: "paragraph",
                text: "Fancy coloured diamonds are increasingly viewed as alternative investment assets. Unlike traditional financial instruments, these diamonds:",
            },
            {
                type: "bullet-list",
                items: [
                    "Are tangible and portable",
                    "Have limited supply",
                    "Are resistant to inflation",
                    "Offer long-term appreciation potential",
                ],
            },
            {
                type: "paragraph",
                text: "Blue and green diamonds, in particular, have demonstrated significant price growth due to extreme scarcity. Yellow diamonds provide a more accessible entry point while still offering strong aesthetic and investment appeal.",
            },
            {
                type: "paragraph",
                text: "However, purchasing coloured diamonds requires careful evaluation of authenticity, certification, and market trends.",
            },
        ],
    },
    {
        heading: "The Importance of Certification",
        content: [
            {
                type: "paragraph",
                text: "When investing in coloured diamonds, always ensure certification from reputable laboratories such as the Gemological Institute of America.",
            },
            { type: "paragraph", text: "Certification verifies:" },
            {
                type: "bullet-list",
                items: [
                    "Natural origin of colour",
                    "Absence of treatments",
                    "Accurate colour grading",
                    "Authenticity of the stone",
                ],
            },
            {
                type: "paragraph",
                text: "Without certification, assessing the true value of a fancy coloured diamond becomes extremely difficult.",
            },
            {
                type: "paragraph",
                text: "Blue, yellow, and green diamonds represent the pinnacle of rarity, beauty, and geological wonder.",
            },
            {
                type: "bullet-list",
                items: [
                    "Blue diamonds captivate with their oceanic depth and extreme scarcity.",
                    "Yellow diamonds radiate warmth and optimism like captured sunlight.",
                    "Green diamonds enchant with their mysterious and natural elegance.",
                ],
            },
            {
                type: "paragraph",
                text: "Each colour tells a unique story shaped by nature over billions of years. Whether you are purchasing for personal jewellery, portfolio diversification, or long-term investment, fancy coloured diamonds offer both emotional significance and financial potential.",
            },
            {
                type: "paragraph",
                text: "Owning one is not just about possessing a gemstone — it is about holding a rare piece of Earth’s history, crafted by nature and treasured for generations.",
            },
        ],
    },
];

const coloredDiamondSections: {
    id: string;
    chartImage: StaticImageData;
    chartTitle: string;
    sections: ArticleSection[];
}[] = [
    {
        id: "blue",
        chartImage: BlueDiamondChart,
        chartTitle: "Color Chart For Blue Diamonds",
        sections: blueData,
    },
    {
        id: "yellow",
        chartImage: YellowDiamondChart,
        chartTitle: "Color Chart For Yellow Diamonds",
        sections: yellowData,
    },
    {
        id: "green",
        chartImage: GreenDiamondChart,
        chartTitle: "Color Chart For Green Diamonds",
        sections: greenData,
    },
];

const page = () => {
    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text="Fancy Colored Diamonds"
                textClassName="left-10 top-80 text-5xl text-white"
                imageClassName="h-90 object-cover"
            />

            {/* Intro Section */}
            <section className="max-w-7xl mx-auto px-4 mt-20">
                <DynamicArticle sections={introData} />
            </section>

            {/* Colored Diamonds Sections (with original Images preserving) */}
            <div className="max-w-7xl mx-auto px-4">
                {coloredDiamondSections.map((diamond) => (
                    <section
                        key={diamond.id}
                        className="py-20 mt-10 border-t border-slate-200"
                    >
                        <div className="max-w-7xl mx-auto">
                            {/* Chart Section */}
                            <div className="mb-16">
                                <div className="flex justify-center">
                                    <Image
                                        src={diamond.chartImage}
                                        alt={diamond.chartTitle}
                                        className="w-full max-w-7xl h-auto object-contain"
                                    />
                                </div>
                            </div>

                            {/* Content Section rendered dynamically */}
                            <div>
                                <DynamicArticle sections={diamond.sections} />
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Outro Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 border-t border-slate-200">
                <DynamicArticle sections={outroData} />
            </section>

            {/* Contact CTA Banner */}
            <section className="w-full container mx-auto relative py-16 px-4 mt-10 mb-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={ContactBannerImage}
                        alt="Contact Banner Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 flex items-center justify-center min-h-[150px]">
                    <div className="text-center">
                        <p className="text-white text-xl md:text-2xl font-lora leading-relaxed max-w-4xl">
                            Considering buying or selling fancy coloured
                            diamonds?{" "}
                            <a
                                href="#contact"
                                className="underline hover:text-[#bb923a] transition-colors font-semibold"
                            >
                                Contact us today!
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <SubFooter />
        </div>
    );
};

export default page;
