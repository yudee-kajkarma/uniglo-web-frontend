import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/diamond-financing-options/banner.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FedexImage from "@/assets/services/investment/image-1.png";
import LoupeImage from "@/assets/services/investment/image-2.png"; // Update path as needed
import SubFooter from "@/components/shared/SubFooter";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: "Investment Diamonds | Expert Guidance – Uniglo Diamonds",
    description:
        "Invest in certified diamonds with expert guidance from Uniglo Diamonds. Discover investment-grade stones to diversify your portfolio with stable, high-value assets.",
};

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