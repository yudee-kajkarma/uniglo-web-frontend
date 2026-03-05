import React from "react";
import Image from "next/image";
import Diagram4Cs from "@/assets/diamond-4cs/image1.png";
import CutBanner from "@/assets/diamond-4cs/cut-banner.jpg";
import ColorScale from "@/assets/diamond-4cs/color-scale.jpg";
import ClarityBanner from "@/assets/diamond-4cs/clarity-banner.jpg";
import CaratBanner from "@/assets/diamond-4cs/carat-banner.jpg";
import AdImage from "@/assets/subFooter/recent-post.png";
import GiaLogo from "@/assets/our-partners/gia-removebg-preview.png";
import HrdLogo from "@/assets/our-partners/hrd-removebg-preview.png";
import IgiLogo from "@/assets/our-partners/igi.jpg";
import { Clock1, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/diamond-4cs/banner4c.jpeg";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Understanding the 4Cs of Diamonds | Cut, Color, Clarity, Carat",
    description:
        "Master the 4Cs—Cut, Color, Clarity & Carat. Learn how diamond quality affects beauty and value. Buy with confidence at Uniglo Diamonds.",
    alternates: {
        canonical: "www.uniglodiamonds.com/the-diamond-4cs",
    },
};

const introData: ArticleSection[] = [
    {
        heading:
            "The Diamonds 4Cs – Your Complete Guide to Understanding Diamond Quality",
        content: [
            {
                type: "paragraph",
                text: "Choosing a diamond is not just about making a purchase — it is about selecting a symbol of love, commitment, celebration, and legacy. Every diamond carries a story that began billions of years ago, formed deep beneath the Earth’s surface under intense heat and pressure. No two diamonds are exactly alike. Like snowflakes, each stone is a unique creation of nature with its own characteristics and personality.",
            },
            {
                type: "paragraph",
                text: "While diamonds have always been admired for their beauty, rarity, and emotional significance, the jewellery industry needed a universal method to evaluate and communicate their quality. That system is known worldwide as the 4Cs of Diamond Quality: Cut, Colour, Clarity, and Carat Weight.",
            },
            {
                type: "paragraph",
                text: "Developed and standardized by the Gemological Institute of America (GIA), the 4Cs created a global language that allows buyers, sellers, and experts to understand exactly what defines a diamond’s value and appearance. Understanding the 4Cs not only helps you make an informed decision but also enhances your appreciation and enjoyment of your diamond long after the purchase.",
            },
        ],
    },
];

const cutData1: ArticleSection[] = [
    {
        heading: "1. Diamond Cut – The Secret Behind Brilliance",
        content: [
            {
                type: "paragraph",
                text: "When it comes to beauty, cut is the most important characteristic of a diamond. It is often confused with shape (such as round, oval, or princess), but cut actually refers to how well a diamond’s facets interact with light.",
            },
            {
                type: "paragraph",
                text: "A well-cut diamond sparkles intensely because it reflects light properly. The brilliance you see is the result of three light effects:",
            },
            {
                type: "bullet-list",
                items: [
                    "Brightness – The reflection of white light from the surface and inside the diamond.",
                    "Fire – The dispersion of light into rainbow colors.",
                    "Scintillation – The sparkle and pattern of light and dark flashes when the diamond moves.",
                ],
            },
            {
                type: "paragraph",
                text: "If a diamond is cut too shallow, light escapes from the bottom, making it appear dull. If it is cut too deep, light leaks out from the sides. Only when a diamond is cut with ideal proportions does light return through the top (called the table), creating exceptional brilliance.",
            },
            {
                type: "paragraph",
                text: "Professional grading evaluates several factors, including:",
            },
            {
                type: "bullet-list",
                items: [
                    "Proportions relative to weight",
                    "Symmetry of facets",
                    "Polish quality",
                    "Girdle thickness (which affects durability)",
                ],
            },
        ],
    },
];

const cutData2: ArticleSection[] = [
    {
        content: [
            {
                type: "paragraph",
                text: "A diamond’s cut grade is an objective assessment of craftsmanship. It takes extraordinary skill and experience to cut a diamond in a way that maximizes its natural beauty. In many ways, diamond cutting is both science and art — a reflection of the expertise of the master craftsman who shaped it.",
            },
            {
                type: "paragraph",
                text: "For buyers seeking maximum sparkle, prioritizing an excellent or ideal cut grade is often the smartest decision.",
            },
        ],
    },
];

const colorData1: ArticleSection[] = [
    {
        heading: "2. Diamond Colour – The Beauty of Purity",
        content: [
            {
                type: "paragraph",
                text: "Diamond colour refers to the presence — or absence — of visible colour within a stone. The most widely accepted grading system is the D-to-Z colour scale, developed by the Gemological Institute of America.",
            },
            {
                type: "paragraph",
                text: "This scale begins with D (colourless) and progresses to Z (light yellow or brown). The less colour a diamond contains, the higher its rarity and value.",
            },
        ],
    },
];

const colorData2: ArticleSection[] = [
    {
        heading: "Diamond Colour Grades Explained",
        content: [
            {
                type: "bullet-list",
                items: [
                    "D Grade – Absolutely colourless. Extremely rare and highly valuable.",
                    "E–F Grades – Colourless. Minute traces of colour detectable only by experts.",
                    "G–J Grades – Near colourless. Slight warmth visible only when compared side-by-side with higher grades.",
                    "K–M Grades – Faint yellow tint visible.",
                    "N–Z Grades – Very light to light yellow or brown colour noticeable.",
                ],
            },
            {
                type: "paragraph",
                text: "A chemically pure and structurally perfect diamond is completely colourless, similar to a drop of pure water. This purity makes it exceptionally rare.",
            },
            {
                type: "paragraph",
                text: "However, not all coloured diamonds fall within the D-to-Z scale. Diamonds that display strong natural colours — such as vivid yellow, pink, blue, or green — are known as fancy-colour diamonds. Some intense yellow diamonds can even be more valuable than a D-colour diamond due to their rarity and demand.",
            },
            {
                type: "paragraph",
                text: "When selecting a diamond, colour preference often depends on personal taste and budget. Many buyers choose near-colourless grades (G–J) for an excellent balance between value and visual appeal.",
            },
        ],
    },
];

const clarityData1: ArticleSection[] = [
    {
        heading: "3. Diamond Clarity – Nature’s Fingerprint",
        content: [
            {
                type: "paragraph",
                text: "Clarity measures the tiny natural characteristics formed inside or on the surface of a diamond during its creation process. These internal features are called inclusions, while surface features are called blemishes.",
            },
            {
                type: "paragraph",
                text: "Because diamonds are created under tremendous heat and pressure, most contain small imperfections. In fact, completely flawless diamonds are extremely rare.",
            },
            {
                type: "paragraph",
                text: "Clarity is graded using 10x magnification by trained professionals. The industry uses 6 main categories, divided into 11 specific grades:",
            },
        ],
    },
];

const clarityData2: ArticleSection[] = [
    {
        heading: "Diamond Clarity Scale",
        content: [
            {
                type: "bullet-list",
                items: [
                    "FL (Flawless) – No inclusions or blemishes visible under 10x magnification.",
                    "IF (Internally Flawless) – No inclusions; only minor surface blemishes.",
                    "VVS1 & VVS2 (Very, Very Slightly Included) – Inclusions extremely difficult to detect under 10x magnification.",
                    "VS1 & VS2 (Very Slightly Included) – Minor inclusions visible with effort under magnification.",
                    "SI1 & SI2 (Slightly Included) – Noticeable inclusions under 10x magnification.",
                    "I1, I2, I3 (Included) – Obvious inclusions that may affect brilliance and transparency.",
                ],
            },
            {
                type: "paragraph",
                text: "It is important to note that most inclusions are microscopic and do not impact the visible beauty of a diamond. In many cases, diamonds in the VS or SI range offer exceptional value because their imperfections are not visible to the naked eye.",
            },
            {
                type: "paragraph",
                text: "Clarity essentially represents nature’s fingerprint — proof that your diamond is a one-of-a-kind creation.",
            },
        ],
    },
];

const caratData1: ArticleSection[] = [
    {
        heading: "4. Diamond Carat – Understanding Weight vs. Size",
        content: [
            {
                type: "paragraph",
                text: "Carat weight is one of the most recognized aspects of diamond buying, yet it is often misunderstood. Carat refers to weight, not size.",
            },
            {
                type: "paragraph",
                text: "One carat equals 200 milligrams. While larger diamonds are generally more valuable, carat weight alone does not determine price. The other three Cs — cut, colour, and clarity — significantly influence overall value.",
            },
        ],
    },
];

const caratData2: ArticleSection[] = [
    {
        content: [
            { type: "paragraph", text: "For example:" },
            {
                type: "bullet-list",
                items: [
                    "A well-cut 0.90 carat diamond may appear larger than a poorly cut 1.00 carat diamond.",
                    "Two diamonds of equal carat weight can differ greatly in price depending on clarity and colour.",
                ],
            },
            {
                type: "paragraph",
                text: "It is also important not to confuse carat (ct) with karat (k), which measures the purity of gold.",
            },
            {
                type: "paragraph",
                text: "When purchasing jewellery with multiple diamonds, you may see the term Total Carat Weight (TCW). This refers to the combined weight of all diamonds in the piece.",
            },
            {
                type: "paragraph",
                text: "Choosing the right carat weight depends on personal preference, budget, and design style. Some buyers prioritize size, while others focus on brilliance and overall balance.",
            },
        ],
    },
    {
        heading: "Why the 4Cs Matter When Buying Diamonds",
        content: [
            {
                type: "paragraph",
                text: "Understanding the 4Cs empowers you to:",
            },
            {
                type: "bullet-list",
                items: [
                    "Compare diamonds accurately",
                    "Make confident purchasing decisions",
                    "Balance quality and budget",
                    "Appreciate the craftsmanship and rarity of your stone",
                ],
            },
            {
                type: "paragraph",
                text: "The 4Cs system ensures that diamond quality can be communicated clearly and universally. Whether you are browsing loose diamonds online or selecting a custom diamond ring, this knowledge enhances both your buying experience and your long-term satisfaction.",
            },
        ],
    },
    {
        heading: "Certified Diamonds and Trusted Grading",
        content: [
            {
                type: "paragraph",
                text: "When purchasing a diamond, always look for a grading certificate from a respected laboratory such as the Gemological Institute of America. A certified diamond guarantees that the 4Cs have been independently evaluated, giving you confidence and transparency.",
            },
            {
                type: "paragraph",
                text: "Certification protects your investment and ensures that you are receiving exactly what you pay for.",
            },
        ],
    },
    {
        heading: "Browse Thousands of Loose Diamonds Online",
        content: [
            {
                type: "paragraph",
                text: "If you are searching for the perfect diamond, explore our extensive online inventory featuring thousands of certified loose diamonds. Whether you are looking for an engagement ring, anniversary gift, or investment-grade stone, our collection offers exceptional quality across all 4Cs.",
            },
            {
                type: "paragraph",
                text: "From brilliant round diamonds to elegant fancy shapes, we help you find a stone that matches your vision, style, and budget.",
            },
        ],
    },
    {
        heading: "Final Thoughts",
        content: [
            {
                type: "paragraph",
                text: "A diamond is more than a gemstone — it is a timeless symbol of emotion, love, and legacy. By understanding Cut, Colour, Clarity, and Carat Weight, you gain the knowledge to choose a diamond that truly reflects your story.",
            },
            {
                type: "paragraph",
                text: "The 4Cs provide clarity, transparency, and confidence in every purchase. When you understand what makes a diamond sparkle, you do not just buy a stone — you select a masterpiece created by nature and perfected by craftsmanship.",
            },
        ],
    },
];

const page = () => {
    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text="The Diamond 4Cs"
                textClassName="left-10 top-90 text-5xl"
                imageClassName="h-100 object-cover"
            />
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 mt-10">
                {/* Main Content Column */}
                <div className="w-full lg:w-2/3 pb-10">
                    {/* Intro Section */}
                    <div className="mb-10 flex justify-center">
                        <Image
                            src={Diagram4Cs}
                            alt="The 4Cs of Diamond Quality"
                            className="max-w-md w-full h-auto object-contain"
                        />
                    </div>

                    <div className="mb-12">
                        <DynamicArticle sections={introData} />
                    </div>

                    {/* 1. Cut */}
                    <div className="mb-12">
                        <DynamicArticle sections={cutData1} />

                        <div className="relative w-full h-40 my-8 overflow-hidden">
                            <Image
                                src={CutBanner}
                                alt="Diamond Cut"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    A diamond’s cut grade is an objective
                                    assessment of how well the diamond’s facets
                                    interact with light.
                                </p>
                            </div>
                        </div>

                        <DynamicArticle sections={cutData2} />
                    </div>

                    {/* 2. Color */}
                    <div className="mb-12">
                        <DynamicArticle sections={colorData1} />

                        <div className="my-8">
                            <Image
                                src={ColorScale}
                                alt="Diamond Color Scale"
                                className="w-full h-auto object-cover "
                            />
                        </div>

                        <DynamicArticle sections={colorData2} />
                    </div>

                    {/* 3. Clarity */}
                    <div className="mb-12">
                        <DynamicArticle sections={clarityData1} />

                        <div className="relative w-full h-32 my-8 overflow-hidden">
                            <Image
                                src={ClarityBanner}
                                alt="Diamond Clarity"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    Clarity is the measure of the number and
                                    size of the tiny imperfections that occur in
                                    almost all diamonds.
                                </p>
                            </div>
                        </div>

                        <DynamicArticle sections={clarityData2} />
                    </div>

                    {/* 4. Carat */}
                    <div className="mb-12">
                        <DynamicArticle sections={caratData1} />

                        <div className="relative w-full h-32 my-8 overflow-hidden">
                            <Image
                                src={CaratBanner}
                                alt="Diamond Carat"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
                                <p className="text-white text-xl md:text-2xl font-cormorantGaramond text-center font-semibold">
                                    Carat weight refers to the weight of gems
                                    and diamonds, not the size!
                                </p>
                            </div>
                        </div>

                        <DynamicArticle sections={caratData2} />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="w-full lg:w-1/3 space-y-10">
                    {/* Popular Post */}
                    <div className="bg-[#f7f8fa] p-8 ">
                        <h4 className="text-2xl font-cormorantGaramond mb-6 border-b border-slate-200 pb-2">
                            Popular Post
                        </h4>
                        <ul className="space-y-4 font-lora text-slate-700">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Supply Chain Policy & Procedure
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    The Diamonds 4Cs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Diamonds Certificates
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Diamonds Shapes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-[#bb923a] transition-colors"
                                >
                                    Fancy Coloured Diamonds
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Our Partners */}
                    <div>
                        <h4 className="text-2xl font-cormorantGaramond mb-6 border-b border-slate-200 pb-2">
                            Our Partners
                        </h4>
                        <div className="flex gap-4 items-center justify-start">
                            <Image
                                src={GiaLogo}
                                alt="GIA"
                                width={60}
                                height={30}
                                className="object-contain"
                            />
                            <Image
                                src={HrdLogo}
                                alt="HRD"
                                width={80}
                                height={30}
                                className="object-contain"
                            />
                            <Image
                                src={IgiLogo}
                                alt="IGI"
                                width={60}
                                height={30}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Find Us */}
                    <div className="bg-[#f7f8fa] p-8 ">
                        <h4 className="text-2xl font-cormorantGaramond mb-6 border-b border-slate-200 pb-2">
                            Find Us
                        </h4>
                        <div className="space-y-6 font-lora text-slate-700 text-sm">
                            <div className="flex gap-3">
                                <span className="text-[#bb923a] text-xl">
                                    <MapPin />
                                </span>
                                <div>
                                    <strong className="block text-black mb-1">
                                        Address
                                    </strong>
                                    <p>
                                        Hoveniersstraat 30, Suite 662, Bus 250
                                        2018 Antwerp
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-[#bb923a] text-xl">
                                    <Clock1 />
                                </span>
                                <div>
                                    <strong className="block text-black mb-1">
                                        Hours
                                    </strong>
                                    <p>
                                        Monday—Friday: 10:00 – 18:00
                                        <br />
                                        Saturday & Sunday: On Appointment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ad Section */}
                    <div className="bg-black flex flex-col items-center justify-center p-10 min-h-[400px]">
                        <div className="flex flex-col items-center">
                            <h3 className="text-white text-3xl md:text-4xl font-cormorantGaramond text-center mb-8">
                                BROWSE THOUSANDS
                                <br />
                                OF LOOSE DIAMONDS
                            </h3>
                            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition px-8 py-4 text-lg font-lora tracking-wide rounded-none mt-2">
                                ONLINE INVENTORY
                            </Button>
                            <Image
                                src={AdImage}
                                alt="Diamond Ring"
                                width={250}
                                height={250}
                                className="mt-10 w-60 h-auto aspect-square object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
