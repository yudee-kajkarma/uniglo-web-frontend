import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/diamond-certificates/bannerNew.png";
import SubFooter from "@/components/shared/SubFooter";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GIA, IGI & HRD Diamond Certificates | Uniglo Diamonds",
    description:
        "Ensure quality with GIA, IGI & HRD certified diamonds from Uniglo. Internationally recognized certificates with lifetime authenticity guarantee.",
};

const certificateData: ArticleSection[] = [
    {
        heading: "Portfolio Building and Expert Diamond Certification Advice",
        content: [
            {
                type: "paragraph",
                text: "Building a diamond portfolio is more than simply purchasing beautiful stones — it is about making informed, strategic decisions backed by proper documentation and expert guidance. Whether you are buying a diamond for personal jewellery, long-term investment, or resale purposes, certification and professional grading play a critical role in protecting your investment.",
            },
            {
                type: "paragraph",
                text: "A diamond is a valuable and emotional purchase. To ensure complete transparency, every serious buyer should understand the importance of a diamond certificate and how it contributes to confidence, authenticity, and long-term value.",
            },
        ],
    },
    {
        heading: "What Is a Diamond Certificate?",
        content: [
            {
                type: "paragraph",
                text: "A diamond certificate — sometimes referred to as a diamond grading report or dossier — is an official document issued by an independent gemological laboratory. This document provides a detailed and unbiased assessment of a diamond’s unique characteristics.",
            },
            { type: "paragraph", text: "The certificate typically includes:" },
            {
                type: "bullet-list",
                items: [
                    "Cut grade",
                    "Carat weight",
                    "Colour grade",
                    "Clarity grade",
                    "Polish",
                    "Symmetry",
                    "Fluorescence",
                    "Measurements and proportions",
                ],
            },
            {
                type: "paragraph",
                text: "These characteristics collectively define a diamond’s identity. Much like a fingerprint, no two diamonds share the exact same grading combination.",
            },
            {
                type: "paragraph",
                text: "A grading certificate is not simply a piece of paper — it is proof of quality, authenticity, and transparency. It allows buyers to understand precisely what they are purchasing and ensures that the diamond’s attributes are evaluated according to international standards.",
            },
        ],
    },
    {
        heading: "Why Diamond Certification Is Essential",
        content: [
            {
                type: "paragraph",
                text: "Certification from a reputable laboratory is crucial for several reasons:",
            },
            {
                type: "paragraph",
                text: "1. Quality Assurance: Independent laboratories evaluate diamonds using standardized grading systems. This ensures unbiased and consistent results. Buyers can rely on the accuracy of the grading without concern for seller bias.",
            },
            {
                type: "paragraph",
                text: "2. Proof of Identity: A certificate acts as a diamond’s identity record. Many certified diamonds also have a microscopic laser inscription on the girdle referencing the certificate number for verification.",
            },
            {
                type: "paragraph",
                text: "3. Investment Protection: If you ever choose to insure, resell, or upgrade your diamond, a recognized grading report significantly simplifies valuation and transaction processes.",
            },
            {
                type: "paragraph",
                text: "4. Portfolio Building: For individuals building a diamond portfolio, certification ensures comparability across purchases. You can evaluate and track the quality of multiple stones with clarity and confidence.",
            },
        ],
    },
    {
        heading: "Diamond Inspection and Transparency at Uniglo",
        content: [
            {
                type: "paragraph",
                text: "At Uniglo, we specialize in certified, conflict-free diamonds and maintain strict quality standards. When you purchase a certified diamond from us, you receive the original grading certificate issued by a recognized laboratory.",
            },
            {
                type: "paragraph",
                text: "This certificate guarantees that the diamond you receive matches exactly what is documented in the grading report. It provides lifetime confidence in your purchase and serves as permanent documentation of your diamond’s specifications.",
            },
            {
                type: "paragraph",
                text: "We also offer professional diamond inspection to ensure that clients fully understand the characteristics of their selected stone before completing the purchase.",
            },
        ],
    },
    {
        heading: "Difference Between a Grading Certificate and an Appraisal",
        content: [
            {
                type: "paragraph",
                text: "It is important to distinguish between a grading certificate and an appraisal certificate, as they serve different purposes.",
            },
            { type: "paragraph", text: "Grading Certificate:" },
            {
                type: "bullet-list",
                items: [
                    "Issued by an independent gemological laboratory",
                    "Objectively evaluates the diamond’s 4Cs",
                    "Does not assign a retail value",
                    "Focuses purely on gemological characteristics",
                ],
            },
            { type: "paragraph", text: "Appraisal Certificate:" },
            {
                type: "bullet-list",
                items: [
                    "Assigns a monetary value to the diamond",
                    "Used mainly for insurance purposes",
                    "Influenced by market trends, supply and demand, and economic conditions",
                    "May not be as technically detailed as a grading report",
                ],
            },
            {
                type: "paragraph",
                text: "For investment security and portfolio development, a recognized grading certificate is far more critical than a basic appraisal.",
            },
        ],
    },
    {
        heading: "Globally Recognized Diamond Certification Laboratories",
        content: [
            {
                type: "paragraph",
                text: "When purchasing a diamond, certification should come from a reputable and internationally respected laboratory. The most widely recognized diamond grading institutes include:",
            },
            {
                type: "paragraph",
                text: "Gemological Institute of America (GIA): Established in 1931, GIA is considered the world’s foremost authority on diamonds, coloured stones, and pearls. It is a nonprofit public benefit organization known for setting the global standard for diamond grading, including the creation of the 4Cs system.",
            },
            {
                type: "paragraph",
                text: "GIA certificates are highly respected worldwide for their strict grading standards and consistency. For investors and serious buyers, GIA certification often represents the gold standard of quality assurance.",
            },
            {
                type: "paragraph",
                text: "International Gemological Institute (IGI): IGI is the world’s largest independent gem certification and appraisal institute for diamonds, coloured gemstones, and jewellery.",
            },
            {
                type: "paragraph",
                text: "An IGI certificate represents confidence, transparency, and global recognition. IGI serves both trade professionals and consumers, offering detailed grading reports that ensure clarity in purchasing decisions.",
            },
            {
                type: "paragraph",
                text: "For many buyers, IGI-certified diamonds provide a strong balance between reliability and market accessibility.",
            },
        ],
    },
];

const page = () => {
    return (
        <div className="min-h-screen">
            <BannerSection
                image={BannerImage}
                text="Diamond Certificates"
                textClassName="left-10 top-90 text-5xl"
                imageClassName="h-100 object-cover"
            />

            {/* Main Articles Content Section */}
            <section className="max-w-4xl mx-auto px-10 py-20 mb-10">
                <DynamicArticle sections={certificateData} />
            </section>

            <SubFooter />
        </div>
    );
};

export default page;
