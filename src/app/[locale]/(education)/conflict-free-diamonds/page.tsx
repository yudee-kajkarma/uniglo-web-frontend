import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";

import BannerImage from "@/assets/conflict-free/banner1.png";

// NOTE: metadata/canonical left untouched (English only) — same convention
// as the other education pages already wired.
export const metadata: Metadata = {
    title: "Conflict-free Diamonds & The Kimberley Process | Uniglo",
    description:
        "What are conflict-free diamonds? Learn about the Kimberley Process & how Uniglo ensures every stone is ethically sourced & certified.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/conflict-free-diamonds",
    },
};

// Local type for the per-section translation shape
type SectionTranslation = {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    afterBullets?: string[];
};

const Page = async () => {
    const t = await getTranslations("conflictFreePage");

    // sections[0] uses paragraphs only (no bullets)
    // sections[1] uses paragraphs + bullets + afterBullets
    // sections[4] (Kimberley Works) uses paragraphs only with inline "1./2./3./4." markers
    // sections[5] (Why Matters) uses paragraphs only with inline lead phrases
    // sections[9] (Misconceptions) uses paragraphs only (Q&A style)
    // Each entry's `bullets` / `afterBullets` are optional in the JSON.
    const rawSections = t.raw("sections") as SectionTranslation[];

    const conflictFreeData: ArticleSection[] = rawSections.map((section) => {
        const content: ArticleSection["content"] = [];

        // Pre-bullet paragraphs
        section.paragraphs.forEach((text) => {
            content.push({ type: "paragraph", text });
        });

        // Optional bullet list
        if (section.bullets && section.bullets.length > 0) {
            content.push({
                type: "bullet-list",
                items: section.bullets,
            });
        }

        // Optional post-bullet paragraphs
        if (section.afterBullets && section.afterBullets.length > 0) {
            section.afterBullets.forEach((text) => {
                content.push({ type: "paragraph", text });
            });
        }

        return {
            heading: section.heading,
            content,
        };
    });

    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover transform scaleX(-1)"
            />

            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 mt-10">
                <div className="w-full lg:w-2/3 pb-10">
                    <DynamicArticle sections={conflictFreeData} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default Page;
