import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

import WhyRingSizingImage from "@/assets/blogs/ringonfinger.png";
import RingSizingMethodsImage from "@/assets/blogs/steps.png";
import ExistingRingMethodImage from "@/assets/blogs/ringonscale.png";

export const metadata: Metadata = {
    title: "How to Measure Ring Size at Home | Uniglo Diamonds",
    description:
        "Learn 5 proven methods to measure your ring size at home with our expert guide. Includes a free US/UK/EU ring size chart and tips from Uniglo Diamond gemologists.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/how-to-measure-ring-size-at-home",
    },
};

const introSection: ArticleSection[] = [
    {
        content: [
            {
                type: "paragraph",
                text: "At Uniglo Diamond, our gemologists help customers find their perfect ring fit every single day. Whether you are choosing a lab-grown diamond engagement ring, a classic wedding band, or an anniversary piece, getting your ring size right from the start saves you time, money, and the frustration of resizing.",
            },
            {
                type: "paragraph",
                text: "This guide gives you 5 proven at-home methods, a complete US/UK/EU ring size chart, and the same expert tips our team uses in our showroom — so you can order with total confidence.",
            },
        ],
    },
    {
        heading: "Why Accurate Ring Sizing Matters",
        content: [
            {
                type: "paragraph",
                text: "A ring that is too tight cuts off circulation. One that is too loose spins, slides off, or falls into a drain. Beyond comfort, precision matters for several important reasons:",
            },
            {
                type: "bullet-list",
                items: [
                    "Eternity bands cannot be resized — rings set with diamonds or gemstones all the way around cannot be resized without removing stones. Getting it right the first time is essential.",
                    "Resizing costs money — professional resizing costs $50–$150+ and takes 1–2 weeks. It is an easily avoidable expense with careful at-home measurement.",
                    "Wide bands fit tighter — a 10mm band feels smaller than a 3mm band at the same ring size. Band width directly affects comfort.",
                    "Diamond settings can be damaged — resizing a diamond engagement ring puts stress on prong settings. The less resizing needed, the better for your stone.",
                ],
            },
        ],
    },
];

const methodsSections: ArticleSection[] = [
    {
        heading: "Method 1: The Paper Strip Method (Most Accurate DIY)",
        content: [
            {
                type: "numbered-list",
                items: [
                    "Cut a thin strip of paper roughly 6 inches long and 1/4 inch wide.",
                    "Wrap it snugly around the base of the finger you will wear the ring on — not the knuckle.",
                    "Use a fine pen to mark exactly where the paper overlaps.",
                    "Remove the paper and lay it flat against a ruler. Measure from the end to your mark in millimeters.",
                    "Match your measurement to the ring size chart later in this guide.",
                ],
            },
        ],
    },
    {
        heading: "Method 2: The String Method",
        content: [
            {
                type: "numbered-list",
                items: [
                    "Cut a piece of non-stretchy string, dental floss, or thin ribbon about 6 inches long.",
                    "Wrap it around the base of your finger where the ring will sit.",
                    "Mark where the string meets with a pen or pinch it with your fingernail.",
                    "Lay the string flat on a ruler and measure the marked length in millimeters.",
                    "Match to the ring size chart in this guide.",
                ],
            },
        ],
    },
    {
        heading: "Method 3: How to Measure Ring Size in Inches",
        content: [
            {
                type: "numbered-list",
                items: [
                    "Follow the paper or string method above to wrap your finger.",
                    "Measure the length in inches instead of millimeters.",
                    "Multiply your inches measurement by 25.4 to convert to millimeters.",
                    "Match that millimeter number to the circumference column in the ring size chart.",
                ],
            },
            {
                type: "paragraph",
                text: "Inches conversion formula: Inches measurement × 25.4 = Circumference in mm → Match to chart. Example: 2.36 inches × 25.4 = 59.9mm = US Ring Size 9",
            },
        ],
    },
    {
        heading: "Method 4: Using an Existing Ring",
        content: [
            {
                type: "numbered-list",
                items: [
                    "With a ruler: Place the ring flat on a surface. Measure the inside diameter in millimeters — from the inner edge on one side directly across to the inner edge on the other side.",
                    "Match that diameter measurement to the diameter column in the ring size chart.",
                    "With a printable chart: Print the Uniglo Diamond ring size guide at exactly 100% scale (never 'fit to page' — this distorts the circles).",
                    "Place your ring over the printed circles and find the one where the ring's inner edge lines up exactly.",
                ],
            },
        ],
    },
];

const method5Section: ArticleSection[] = [
    {
        heading: "Method 5: Adjustable Ring Sizer Tool",
        content: [
            {
                type: "numbered-list",
                items: [
                    "Thread the pointed end through the buckle to form a loop.",
                    "Slide the loop onto your finger and tighten it gradually.",
                    "Ensure it passes over your knuckle with slight resistance but sits comfortably at the base.",
                    "Read the number on the sizer where it meets the buckle — that is your ring size.",
                ],
            },
        ],
    },
];

const remainingSections: ArticleSection[] = [
    {
        heading: "5 Expert Tips for a Perfect Ring Fit",
        content: [
            {
                type: "paragraph",
                text: "Our Uniglo Diamond gemologists share the most important advice they give customers before every ring purchase.",
            },
            {
                type: "numbered-list",
                items: [
                    "Measure more than once — Finger size changes with temperature, hydration, and time of day. Measure morning, afternoon, and evening — use the middle value.",
                    "Measure at the right time — Fingers are smallest in the morning and slightly larger in the afternoon and evening. Measure mid-to-late day for the most reliable everyday fit.",
                    "Account for band width — Wider bands cover more skin surface and feel tighter. Size up half a size for bands 8–10mm wide, and a full size for bands over 10mm.",
                    "Consider your knuckle — If your knuckle is noticeably wider than your finger base, size to fit over the knuckle. A ring adjuster or sizing bead can stop it spinning at the base.",
                ],
            },
        ],
    },
    {
        heading: "Sizing for Special Ring Styles",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Engagement Rings (Solitaire): Measure the left ring finger specifically. Most solitaires can be resized ±2 sizes, but precise sizing reduces stress on the prong setting.",
                    "Eternity Bands (CANNOT BE RESIZED): Diamonds set all the way around make resizing impossible. Take at least 5 measurements across 2 days before ordering.",
                    "Men's Wedding Bands: Wide flat bands (8mm+) require sizing up by half to one full size. If your partner normally wears a size 10, order a 10.5 for an 8mm band.",
                    "Stackable Rings: If stacking 3 or more rings, size each ring half a size larger than your normal measurement.",
                    "Halo Engagement Rings: More complex to resize than simple solitaires. Getting the right size from the start is especially important.",
                    "Three-Stone Rings: Can generally be resized 1–2 sizes in either direction. Standard sizing rules apply.",
                ],
            },
        ],
    },
    {
        heading: "Common Ring Sizing Mistakes to Avoid",
        content: [
            {
                type: "bullet-list",
                items: [
                    "Wrapping the string or paper too tightly — the wrap should feel snug like a ring, not compressed. You should be able to slide it off without effort.",
                    "Measuring when fingers are cold — cold temperatures shrink fingers. A cold-morning measurement can read up to half a size smaller than your true fit.",
                    "Ignoring band width when ordering — a 10mm band at size 6 will fit like a size 5.5. Always size up for wide bands.",
                    "Measuring only once — finger circumference can fluctuate by up to half a size across a single day. Always take at least 3 measurements at different times.",
                    "Printing a size chart at the wrong scale — always print at exactly 100% scale, never 'scale to fit page.' Scaling even 5% distorts the circles.",
                ],
            },
        ],
    },
];

const ringSizeChart = [
    { us: "4", circ: "46.8", diam: "14.9", circIn: '1.84"', uk: "H", eu: "47" },
    {
        us: "4.5",
        circ: "48.0",
        diam: "15.3",
        circIn: '1.89"',
        uk: "I",
        eu: "48",
    },
    {
        us: "5",
        circ: "49.3",
        diam: "15.7",
        circIn: '1.94"',
        uk: "J½",
        eu: "49",
    },
    {
        us: "5.5",
        circ: "50.6",
        diam: "16.1",
        circIn: '1.99"',
        uk: "K½",
        eu: "51",
    },
    {
        us: "6",
        circ: "51.9",
        diam: "16.5",
        circIn: '2.04"',
        uk: "L½",
        eu: "52",
    },
    {
        us: "6.5",
        circ: "53.1",
        diam: "16.9",
        circIn: '2.09"',
        uk: "M½",
        eu: "53",
    },
    {
        us: "7",
        circ: "54.4",
        diam: "17.3",
        circIn: '2.14"',
        uk: "N½",
        eu: "54",
    },
    {
        us: "7.5",
        circ: "55.7",
        diam: "17.7",
        circIn: '2.19"',
        uk: "O½",
        eu: "56",
    },
    {
        us: "8",
        circ: "57.0",
        diam: "18.1",
        circIn: '2.24"',
        uk: "P½",
        eu: "57",
    },
    {
        us: "8.5",
        circ: "58.3",
        diam: "18.6",
        circIn: '2.29"',
        uk: "Q½",
        eu: "58",
    },
    {
        us: "9",
        circ: "59.5",
        diam: "18.9",
        circIn: '2.34"',
        uk: "R½",
        eu: "60",
    },
    {
        us: "9.5",
        circ: "60.8",
        diam: "19.4",
        circIn: '2.39"',
        uk: "S½",
        eu: "61",
    },
    {
        us: "10",
        circ: "62.1",
        diam: "19.8",
        circIn: '2.44"',
        uk: "T½",
        eu: "62",
    },
    {
        us: "10.5",
        circ: "63.4",
        diam: "20.2",
        circIn: '2.49"',
        uk: "U½",
        eu: "63",
    },
    {
        us: "11",
        circ: "64.6",
        diam: "20.6",
        circIn: '2.54"',
        uk: "V½",
        eu: "65",
    },
    {
        us: "11.5",
        circ: "65.9",
        diam: "21.0",
        circIn: '2.59"',
        uk: "W½",
        eu: "66",
    },
    {
        us: "12",
        circ: "67.2",
        diam: "21.4",
        circIn: '2.64"',
        uk: "X½",
        eu: "67",
    },
    {
        us: "13",
        circ: "69.7",
        diam: "22.2",
        circIn: '2.74"',
        uk: "Z",
        eu: "70",
    },
];

const BlogPage = () => {
    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        How to Measure Ring Size at Home: 5 Proven Methods
                    </h1>

                    {/* Intro + Why Sizing Matters */}
                    <DynamicArticle sections={introSection} />

                    {/* Image: Why Ring Sizing Matters */}
                    <div className="my-8 w-full rounded-sm overflow-hidden">
                        <Image
                            src={WhyRingSizingImage}
                            alt="Why accurate ring sizing matters"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Methods intro heading */}
                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6 mt-10">
                        The 5 At-Home Ring Sizing Methods
                    </h2>

                    {/* Image: Ring Sizing Methods */}
                    <div className="mb-8 w-full rounded-sm overflow-hidden">
                        <Image
                            src={RingSizingMethodsImage}
                            alt="Ring sizing methods overview"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Methods 1–4 */}
                    <DynamicArticle sections={methodsSections} />

                    {/* Image: Existing Ring Method */}
                    <div className="my-8 w-full rounded-sm overflow-hidden">
                        <Image
                            src={ExistingRingMethodImage}
                            alt="Measuring ring size using an existing ring"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Method 5 */}
                    <DynamicArticle sections={method5Section} />

                    {/* Ring Size Chart */}
                    <div className="mt-10">
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                            Free Ring Size Chart: US, UK &amp; EU Conversion
                            (2026)
                        </h2>
                        <p className="text-slate-700 text-lg font-lora leading-relaxed mb-6">
                            Use this complete ring size chart to match your
                            millimeter measurement to your US ring size, and to
                            convert between international sizing systems.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm font-lora border-collapse">
                                <thead>
                                    <tr className="bg-[#1f2732] text-white">
                                        <th className="px-4 py-3 text-center font-semibold">
                                            US Size
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            Circ. (mm)
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            Diam. (mm)
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            Circ. (in)
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            UK Size
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            EU Size
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ringSizeChart.map((row, i) => (
                                        <tr
                                            key={row.us}
                                            className={
                                                i % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                            }
                                        >
                                            <td className="px-4 py-2 text-center font-semibold text-[#bb923a]">
                                                {row.us}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.circ}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.diam}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.circIn}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.uk}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.eu}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Expert tips, special styles, common mistakes */}
                    <DynamicArticle sections={remainingSections} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;
