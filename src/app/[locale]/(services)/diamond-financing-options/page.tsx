import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/diamond-financing-options/banner1.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FinancingImg from "@/assets/services/diamond-financing-options/image-1.png"; // Update path as needed
import Image from "next/image";
import SubFooter from "@/components/shared/SubFooter";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
    title: "Diamond Financing Options | Buy Now Pay Later – Uniglo",
    description:
        "Flexible diamond financing with Uniglo. Buy now, pay later with custom instalment plans, tailored payment options, and possible no-interest schemes for diamond purchases.",
};

const page = async () => {
    const t = await getTranslations();

    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text={t("nav.diamondFinancingOptions")}
                textClassName="left-10 top-80 lg:text-5xl"
                imageClassName="h-90 object-cover"
            />
            {/* Article Section */}
            <section className="max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout
                    title={t("financingPage.title")}
                    subtitle={t("footer.footerServices.financing")}
                    paragraphs={[t("financingPage.para1")]}
                    image={{
                        src: FinancingImg.src,
                        alt: t("financingPage.imageAlt"),
                    }}
                    reverse={false}
                    floatImages={true}
                />
            </section>
            {/*  */}
            <section className="w-full bg-primary-purple-dark md:min-h-120 flex flex-col md:flex-row items-center justify-between my-16">
                <div className="md:w-1/2 w-full h-full flex flex-col justify-center z-10 px-8 py-10 md:py-0 md:pl-20 max-w-7xl mx-auto">
                    <h2 className="text-white text-3xl md:text-4xl font-cormorantGaramond font-semibold mb-6">
                        {t("financingPage.section2Title")}
                    </h2>
                    <ul className="list-disc pl-5 text-white/90 font-lora text-lg mb-4 space-y-2">
                        <li>{t("financingPage.bullet1")}</li>
                        <li>{t("financingPage.bullet2")}</li>
                    </ul>
                    <p className="text-white/90 font-lora text-lg max-w-2xl">
                        {t("financingPage.section2Para")}
                    </p>
                </div>
                <div className="hidden md:w-1/2 w-full h-full md:flex justify-end relative mt-10 md:mt-0">
                    <Image
                        src={require("@/assets/services/diamond-financing-options/banner3.png")}
                        alt={t("financingPage.section2ImageAlt")}
                        className="w-full md:h-120 h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary-purple-dark via-primary-purple-dark/80 to-transparent pointer-events-none" />
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;