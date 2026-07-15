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
const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Conflict-free Diamonds & The Kimberley Process | Uniglo",
        "description": "What are conflict-free diamonds? Learn about the Kimberley Process & how Uniglo ensures every stone is ethically sourced & certified."
    },
    "de": {
        "title": "Konfliktfreie Diamanten & Der Kimberley-Prozess | Uniglo",
        "description": "Was sind konfliktfreie Diamanten? Erfahren Sie mehr über den Kimberley-Prozess & wie Uniglo sicherstellt, dass jeder Stein ethisch einwandfrei bezogen & zertifiziert ist."
    },
    "nl": {
        "title": "Conflictvrije diamanten & Het Kimberley-Proces | Uniglo",
        "description": "Wat zijn konfliktvrije diamanten? Leer meer over het Kimberley-Proces & hoe Uniglo ervoor zorgt dat elke steen ethisch verkregen & gecertificeerd is."
    },
    "fr": {
        "title": "Diamants sans conflit et processus de Kimberley | Uniglo",
        "description": "Que sont les diamants sans conflit ? Découvrez le processus de Kimberley et comment Uniglo garantit que chaque pierre est certifiée et de source éthique."
    },
    "it": {
        "title": "Diamanti conflict-free e il Processo di Kimberley | Uniglo",
        "description": "Cosa sono i diamanti conflict-free? Scopri il Processo di Kimberley e come Uniglo garantisce che ogni pietra sia certificata ed eticamente proveniente."
    },
    "es": {
        "title": "Diamantes libres de conflicto y el Proceso de Kimberley | Uniglo",
        "description": "¿Qué son los diamantes libres de conflicto? Conozca el Proceso de Kimberley y cómo Uniglo garantiza que cada piedra sea de origen ético y certificada."
    }
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = translations[locale] || translations.en;

    return {
        title: t.title,
        description: t.description,
        alternates: {
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}conflict-free-diamonds`,
        },
    };
}

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
