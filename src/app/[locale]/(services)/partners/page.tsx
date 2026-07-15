import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/services/partner/bannerPartners.jpeg";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FedexImage from "@/assets/services/partner/image1.jpeg";
import SubFooter from "@/components/shared/SubFooter";
import { getTranslations } from "next-intl/server";

const page = async () => {
    const t = await getTranslations();

    const article = {
        title: t("partnersPage.title"),
        subtitle: t("common.welcome"),
        paragraphs: [t("partnersPage.para1")],
        image: {
            src: FedexImage.src,
            alt: t("partnersPage.imageAlt"),
        },
        reverse: false,
        floatImages: true,
    };

    return (
        <div className="min-h-screen ">
            <BannerSection
                image={BannerImage}
                text={t("nav.partners")}
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 mt-20">
                <ArticleLayout {...article} />
            </section>
            <SubFooter />
        </div>
    );
};

export default page;