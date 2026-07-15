import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

// NOTE: metadata/canonical left untouched (English only) — same convention
// as the other education pages already wired.
const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Rapnet Diamond Supplier | Uniglo Diamonds Antwerp Belgium",
        "description": "Rapnet verified supplier — Uniglo Diamonds, Antwerp. Buy IGI, GIA & HRD certified natural and lab grown diamonds wholesale through Rapnet. Direct Antwerp manufacturer. Find us on Rapnet today."
    },
    "de": {
        "title": "RapNet Diamantenlieferant | Uniglo Diamonds Antwerpen Belgien",
        "description": "Verifizierter RapNet-Lieferant — Uniglo Diamonds, Antwerpen. Kaufen Sie IGI-, GIA- & HRD-zertifizierte natürliche und im Labor gezüchtete Diamanten im Großhandel über RapNet. Direkter Hersteller aus Antwerpen. Finden Sie uns noch heute auf RapNet."
    },
    "nl": {
        "title": "RapNet diamantleverancier | Uniglo Diamonds Antwerpen België",
        "description": "Geverifieerde RapNet-leverancier — Uniglo Diamonds, Antwerpen. Koop IGI-, GIA- & HRD-gecertificeerde natuurlijke en in het lab gekweekte diamanten in de groothandel via RapNet. Directe Antwerpse fabrikant. Vind ons vandaag nog op RapNet."
    },
    "fr": {
        "title": "Fournisseur de diamants RapNet | Uniglo Diamonds Anvers Belgique",
        "description": "Fournisseur vérifié RapNet — Uniglo Diamonds, Anvers. Achetez en gros des diamants naturels et de laboratoire certifiés IGI, GIA & HRD via RapNet. Fabricant direct à Anvers. Retrouvez-nous sur RapNet dès aujourd'hui."
    },
    "it": {
        "title": "Fornitore di diamanti RapNet | Uniglo Diamonds Anversa Belgio",
        "description": "Fornitore verificato RapNet — Uniglo Diamonds, Anversa. Acquista diamanti naturali e coltivati in laboratorio certificati IGI, GIA e HRD all'ingrosso tramite RapNet. Produttore diretto ad Anversa. Trovaci su RapNet oggi stesso."
    },
    "es": {
        "title": "Proveedor de diamantes RapNet | Uniglo Diamonds Amberes Bélgica",
        "description": "Proveedor verificado de RapNet — Uniglo Diamonds, Amberes. Compre diamantes naturales y de laboratorio certificados por IGI, GIA y HRD al por mayor a través de RapNet. Fabricante directo de Amberes. Encuéntrenos en RapNet hoy."
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
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}rapnet-diamond-supplier-antwerp`,
        },
    };
}

// Local types for translation shapes
type SectionWithBullets = {
    heading: string;
    paragraphs: string[];
    bullets1?: string[];
    paragraphs2?: string[];
    bullets2?: string[];
    paragraphs3?: string[];
};

type FaqItem = { question: string; answer: string };

const RapnetDiamondSupplierPage = async () => {
    const t = await getTranslations("rapnetSupplierPage");

    // Build the lead intro as its own section (no heading) — matches the
    // original which had a content-only first entry.
    const introSection: ArticleSection = {
        content: (t.raw("intro") as string[]).map((text) => ({
            type: "paragraph",
            text,
        })),
    };

    // The 7 main sections — each may contain up to 3 paragraph groups
    // and up to 2 bullet lists (prefixed bullets1/bullets2 + paragraphs2/3).
    // This mirrors the original structure exactly.
    const rawSections = t.raw("sections") as SectionWithBullets[];

    const buildSection = (s: SectionWithBullets): ArticleSection => {
        const content: ArticleSection["content"] = [];

        s.paragraphs.forEach((text) => {
            content.push({ type: "paragraph", text });
        });

        if (s.bullets1 && s.bullets1.length > 0) {
            content.push({ type: "bullet-list", items: s.bullets1 });
        }

        if (s.paragraphs2 && s.paragraphs2.length > 0) {
            s.paragraphs2.forEach((text) => {
                content.push({ type: "paragraph", text });
            });
        }

        if (s.bullets2 && s.bullets2.length > 0) {
            content.push({ type: "bullet-list", items: s.bullets2 });
        }

        if (s.paragraphs3 && s.paragraphs3.length > 0) {
            s.paragraphs3.forEach((text) => {
                content.push({ type: "paragraph", text });
            });
        }

        return { heading: s.heading, content };
    };

    const articleData: ArticleSection[] = [
        introSection,
        ...rawSections.map(buildSection),
    ];

    // FAQ items
    const faqData = (t.raw("faq.items") as FaqItem[]).map((item) => ({
        question: item.question,
        answer: item.answer,
    }));

    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        {t("h1")}
                    </h1>
                    <DynamicArticle sections={articleData} />
                    <FAQSection
                        faqs={faqData}
                        title={t("faq.title")}
                        className="mt-12"
                    />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default RapnetDiamondSupplierPage;
