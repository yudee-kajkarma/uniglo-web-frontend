import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import SubFooter from "@/components/shared/SubFooter";

import BannerImage from "@/assets/services/security-seals/banner11.png";
import FedexImage from "@/assets/services/security-seals/tamper-proff-seals1.jpeg";

// NOTE: metadata/canonical left untouched (English only) — same convention
// as the other education pages already wired.
const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Tamper-Proof Diamond Security Seals | Uniglo Diamonds",
        "description": "Protect your diamond with our tamper-proof sealing service. Secure containers link your stone to its IGI report for safety & authenticity."
    },
    "de": {
        "title": "Manipulationssichere Diamantensicherheitsversiegelungen | Uniglo Diamonds",
        "description": "Schützen Sie Ihren Diamanten mit unserem manipulationssicheren Versiegelungsservice. Sichere Behälter verknüpfen Ihren Stein mit seinem IGI-Bericht für maximale Sicherheit & Echtheit."
    },
    "nl": {
        "title": "Fraudebestendige diamantbeveiligingszegels | Uniglo Diamonds",
        "description": "Bescherm uw diamant met onze fraudebestendige verzegeling. Veilige verpakkingen koppelen uw steen aan het IGI-rapport voor veiligheid & echtheid."
    },
    "fr": {
        "title": "Scellés de sécurité inviolables pour diamants | Uniglo Diamonds",
        "description": "Protégez votre diamant grâce à notre service de scellage inviolable. Des conteneurs sécurisés relient votre pierre à son rapport IGI pour plus de sécurité et d'authenticité."
    },
    "it": {
        "title": "Sigilli di sicurezza antimanomissione per diamanti | Uniglo Diamonds",
        "description": "Proteggi il tuo diamante con il nostro servizio di sigillatura antimanomissione. I contenitori sicuri collegano la tua pietra al suo rapporto IGI per sicurezza e autenticità."
    },
    "es": {
        "title": "Sellos de seguridad inviolables para diamantes | Uniglo Diamonds",
        "description": "Proteja su diamante con nuestro servicio de sellado inviolable. Envases seguros vinculan su piedra con su reporte IGI para mayor seguridad y autenticidad."
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
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}security-seals`,
        },
    };
}

const Page = async () => {
    const t = await getTranslations("securitySealsPage");

    const article = {
        title: t("article.title"),
        subtitle: t("article.subtitle"),
        paragraphs: t.raw("article.paragraphs") as string[],
        image: {
            src: FedexImage.src,
            alt: t("imageAlt"),
        },
        reverse: false,
        floatImages: true,
    };

    return (
        <div className="min-h-screen">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-80 text-4xl lg:text-6xl text-black"
                imageClassName="h-90 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout {...article} />
                <div className="mt-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    {t("closingPara")}
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default Page;
