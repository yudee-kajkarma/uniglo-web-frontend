import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/diamond-financing-options/banner.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FedexImage from "@/assets/services/investment/image-1.png";
import LoupeImage from "@/assets/services/investment/image-2.png"; // Update path as needed
import SubFooter from "@/components/shared/SubFooter";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Investment Diamonds | Expert Guidance – Uniglo Diamonds",
        "description": "Invest in certified diamonds with expert guidance from Uniglo Diamonds. Discover investment-grade stones to diversify your portfolio with stable, high-value assets."
    },
    "de": {
        "title": "Anlage-Diamanten | Expertenberatung – Uniglo Diamonds",
        "description": "Investieren Sie in zertifizierte Diamanten mit der Expertenberatung von Uniglo Diamonds. Entdecken Sie Steine in Investmentqualität, um Ihr Portfolio mit stabilen, wertvollen Vermögenswerten zu diversifizieren."
    },
    "nl": {
        "title": "Beleggingsdiamanten | Deskundige begeleiding – Uniglo Diamonds",
        "description": "Investeer in gecertificeerde diamanten met deskundige begeleiding van Uniglo Diamonds. Ontdek stenen van beleggingskwaliteit om uw portefeuille te diversifiëren met stabiele, waardevolle activa."
    },
    "fr": {
        "title": "Diamants d'investissement | Conseils d'experts – Uniglo Diamonds",
        "description": "Investissez dans des diamants certifiés grâce aux conseils d'experts de Uniglo Diamonds. Découvrez des pierres de qualité d'investissement pour diversifier votre portefeuille avec des actifs stables et de grande valeur."
    },
    "it": {
        "title": "Diamanti da investimento | Consulenza esperta – Uniglo Diamonds",
        "description": "Investi in diamanti certificati con la consulenza di esperti di Uniglo Diamonds. Scopri pietre di livello da investimento per diversificare il tuo portafoglio con beni stabili e di alto valore."
    },
    "es": {
        "title": "Diamantes de inversión | Asesoría de expertos – Uniglo Diamonds",
        "description": "Invierta en diamantes certificados con la guía experta de Uniglo Diamonds. Descubra piedras de grado de inversión para diversificar su cartera con activos estables y de alto valor."
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
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}investment-diamonds`,
        },
    };
}

const page = async () => {
    const t = await getTranslations();

    const articles = [
        {
            title: t("investmentPage.article1Title"),
            subtitle: t("common.welcome"),
            paragraphs: [
                t("investmentPage.article1Para1"),
                t("investmentPage.article1Para2"),
            ],
            image: {
                src: FedexImage.src,
                alt: t("investmentPage.article1ImageAlt"),
            },
            reverse: false,
            floatImages: true,
        },
        {
            title: t("investmentPage.article2Title"),
            subtitle: t("common.welcome"),
            paragraphs: [
                t("investmentPage.article2Para1"),
                t("investmentPage.article2Para2"),
                t("investmentPage.article2Para3"),
            ],
            image: {
                src: LoupeImage.src,
                alt: t("investmentPage.article2ImageAlt"),
            },
            reverse: true,
            floatImages: false,
        },
    ];

    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text={t("nav.investmentDiamonds")}
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 mt-20">
                {articles.map((article, idx) => (
                    <ArticleLayout key={idx} {...article} />
                ))}
            </section>
            <SubFooter />
        </div>
    );
};

export default page;