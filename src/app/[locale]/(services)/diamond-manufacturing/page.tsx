import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import BannerImage from "@/assets/services/diamond-manufacturing/finalbanner.jpg";
import ArticleLayout from "@/components/shared/ArticleLayout";
import { getTranslations } from "next-intl/server";

// Example images (replace with your actual paths)
import manufacturing1 from "@/assets/services/diamond-manufacturing/manufacturing1.jpeg";
import manufacturing2 from "@/assets/services/diamond-manufacturing/image-2.png";
import customDiamondImage from "@/assets/services/diamond-manufacturing/custom-diamond-manufacturing.png";
import whyChooseImage from "@/assets/services/diamond-manufacturing/image-3.png";
import contactUsImage from "@/assets/services/diamond-manufacturing/contact-us.jpg";
import Image from "next/image";
import { Metadata } from "next";

const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "Diamond Manufacturing in Antwerp, Belgium | Precision Cutting – Uniglo",
        "description": "Leading diamond manufacturer in Antwerp, Belgium offering custom cuts, loose diamonds, and bulk diamond production. Precision craftsmanship and superior quality by Uniglo."
    },
    "de": {
        "title": "Diamantenherstellung in Antwerpen, Belgien | Präzisionsschliff – Uniglo",
        "description": "Führender Diamantenhersteller in Antwerpen, Belgien, der maßgeschneiderte Schliffe, lose Diamanten und Massenproduktion von Diamanten anbietet. Präzise Handwerkskunst und erstklassige Qualität von Uniglo."
    },
    "nl": {
        "title": "Diamantproductie in Antwerpen, België | Precisieslijpen – Uniglo",
        "description": "Toonaangevende diamantfabrikant in Antwerpen, België die op maat gemaakte slijpvormen, losse diamanten en bulkproductie van diamanten aanbiedt. Precisievakmanschap en superieure kwaliteit door Uniglo."
    },
    "fr": {
        "title": "Fabrication de diamants à Anvers, Belgique | Taille de précision – Uniglo",
        "description": "Premier fabricant de diamants à Anvers, en Belgique, proposant des tailles personnalisées, des diamants en vrac et une production de diamants en gros. Un artisanat de précision et une qualité supérieure par Uniglo."
    },
    "it": {
        "title": "Produzione di diamanti ad Anversa, Belgio | Taglio di precisione – Uniglo",
        "description": "Produttore leader di diamanti ad Anversa, in Belgio, che offre tagli personalizzati, diamanti sfusi e produzione di diamanti in grandi volumi. Artigianato di precisione e qualità superiore da Uniglo."
    },
    "es": {
        "title": "Fabricación de diamantes en Amberes, Bélgica | Corte de precisión – Uniglo",
        "description": "Fabricante líder de diamantes en Amberes, Bélgica, que ofrece cortes personalizados, diamantes sueltos y producción de diamantes al por mayor. Artesanía de precisión y calidad superior por Uniglo."
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
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}diamond-manufacturing`,
        },
    };
}

const page = async () => {
    const t = await getTranslations();

    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text={t("nav.diamondManufacturing")}
                imageClassName="h-90 object-cover"
                textClassName="left-10 top-80  text-5xl"
            />

            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("diamondManufacturingPage.section1Title")}
                    subtitle={t("common.welcome")}
                    paragraphs={[
                        t("diamondManufacturingPage.section1Para1"),
                        t("diamondManufacturingPage.section1Para2"),
                    ]}
                    image={{
                        src: manufacturing1.src,
                        alt: t("diamondManufacturingPage.section1ImageAlt"),
                    }}
                    reverse={false}
                    floatImages={false}
                />

                <ArticleLayout
                    title={t("diamondManufacturingPage.section2Title")}
                    subtitle={t("common.welcome")}
                    paragraphs={[t("diamondManufacturingPage.section2Para")]}
                    bulletPoints={[
                        t("diamondManufacturingPage.bullet1"),
                        t("diamondManufacturingPage.bullet2"),
                        t("diamondManufacturingPage.bullet3"),
                        t("diamondManufacturingPage.bullet4"),
                        t("diamondManufacturingPage.bullet5"),
                    ]}
                    image={{
                        src: manufacturing2.src,
                        alt: t("diamondManufacturingPage.section2ImageAlt"),
                    }}
                    reverse={true}
                    floatImages={false}
                />
            </section>

            <section className="w-full bg-primary-purple-dark md:min-h-120 flex flex-col md:flex-row items-center justify-between   mb-16">
                <div className="md:w-1/2 w-full h-full flex flex-col justify-center z-10 px-8 py-10 md:py-0 md:pl-20 ">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6">
                        {t("diamondManufacturingPage.customTitle")}
                    </h2>
                    <p className="text-white font-lora text-lg max-w-xl">
                        {t("diamondManufacturingPage.customDescription")}
                    </p>
                </div>
                <div className="hidden  md:w-1/2 w-full h-full md:flex justify-end relative mt-10 md:mt-0">
                    <Image
                        src={customDiamondImage}
                        alt={t("diamondManufacturingPage.customImageAlt")}
                        className="w-full md:h-120 h-full object-cover  shadow-lg"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary-purple-dark via-primary-purple-dark/80 to-transparent pointer-events-none" />
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-20">
                {/* Why Choose Uniglo Diamonds Section */}
                <ArticleLayout
                    title={t("diamondManufacturingPage.whyChooseTitle")}
                    subtitle={t("common.welcome")}
                    paragraphs={[]}
                    bulletPoints={[
                        t("diamondManufacturingPage.whyBullet1"),
                        t("diamondManufacturingPage.whyBullet2"),
                        t("diamondManufacturingPage.whyBullet3"),
                        t("diamondManufacturingPage.whyBullet4"),
                        t("diamondManufacturingPage.whyBullet5"),
                    ]}
                    image={{
                        src: whyChooseImage.src,
                        alt: t("diamondManufacturingPage.whyChooseImageAlt"),
                    }}
                    reverse={true}
                    floatImages={false}
                />

                {/* Contact Us Today Section */}
                <div className="w-full mt-16 mb-10">
                    <div className="relative w-full h-[180px] md:h-[220px] rounded overflow-hidden flex items-center">
                        <Image
                            src={contactUsImage}
                            alt={t("diamondManufacturingPage.contactUsImageAlt")}
                            fill
                            className="object-cover"
                            style={{ zIndex: 1 }}
                        />
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <div className="relative z-20 px-8 md:px-16">
                            <h2 className="text-white font-bold text-3xl md:text-4xl font-cormorantGaramond mb-4 mt-6">
                                {t("diamondManufacturingPage.contactUsTitle")}
                            </h2>
                            <p className="text-white/60 font-lora text-lg max-w-4xl">
                                {t(
                                    "diamondManufacturingPage.contactUsDescription1",
                                )}
                                <br />
                                {t(
                                    "diamondManufacturingPage.contactUsDescription2",
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default page;