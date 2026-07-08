import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/../public/uniglow-family/uniglo2.jpg";
// import BannerImage from "@/assets/services/the-best-price-for-your-diamonds/bannerNew.jpeg";
import React from "react";
import ArticleLayout from "@/components/shared/ArticleLayout";
import DiamondsBanner from "@/assets/services/the-best-price-for-your-diamonds/banner2.png";
import FedexImage from "@/assets/services/the-best-price-for-your-diamonds/fedex.jpg";
import SubFooter from "@/components/shared/SubFooter";
import SellDiamondForm from "@/components/shared/SellDiamondForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: "Diamond Buyers Antwerp, Belgium | Get Best Value for Diamonds – Uniglo",
    description:
        "Looking for the best diamond price in Antwerp? Uniglo offers professional evaluation, fair market offers, and fast payment for loose diamonds and jewellery.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/the-best-price-for-your-diamonds",
    },
};

const page = async () => {
    const t = await getTranslations();

    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text={t("bestPricePage.bannerText")}
                textClassName="left-10 top-80 text-5xl"
                imageClassName="h-90 object-cover"
            />
            {/* Article Section */}
            <section className=" max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout
                    title={t("bestPricePage.title")}
                    subtitle={t("common.welcome")}
                    paragraphs={[t("bestPricePage.para1")]}
                    bulletPoints={[
                        t("bestPricePage.bullet1"),
                        t("bestPricePage.bullet2"),
                        t("bestPricePage.bullet3"),
                        t("bestPricePage.bullet4"),
                    ]}
                    image={{
                        src: FedexImage.src,
                        alt: t("bestPricePage.imageAlt"),
                    }}
                    reverse={false}
                    floatImages={true}
                />
                <div className="mt-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                    {t("bestPricePage.closingParagraph")}
                </div>
            </section>
            {/* Banner Section */}
            <section className="mt-16 max-w-7xl mx-auto px-4">
                <div className="relative w-full h-56 md:h-64">
                    <img
                        src={DiamondsBanner.src}
                        alt={t("bestPricePage.bannerImageAlt")}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xl md:text-2xl font-lora text-center px-4 drop-shadow-lg">
                            {t("bestPricePage.bannerOverlayText")}
                        </span>
                    </div>
                </div>
            </section>
            {/* Pickup Form */}
            <SellDiamondForm />
            <SubFooter />
        </div>
    );
};

export default page;