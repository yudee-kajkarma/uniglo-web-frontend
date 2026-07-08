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
export const metadata: Metadata = {
    title: "Tamper-Proof Diamond Security Seals | Uniglo Diamonds",
    description:
        "Protect your diamond with our tamper-proof sealing service. Secure containers link your stone to its IGI report for safety & authenticity.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/security-seals",
    },
};

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
