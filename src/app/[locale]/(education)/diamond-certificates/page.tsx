import React from "react";
import { getTranslations } from "next-intl/server";
import BannerSection from "@/components/shared/BannerSection";
import EducationSidebar from "@/components/shared/EducationSidebar";
import BannerImage from "@/assets/diamond-certificates/bannerNew.png";
import SubFooter from "@/components/shared/SubFooter";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { Metadata } from "next";

// NOTE: metadata/canonical left untouched (English only) - same convention
// as the other education pages already wired.
const translations: Record<
    string,
    { title: string; description: string }
> = {
    "en": {
        "title": "GIA, IGI & HRD Diamond Certificates | Uniglo Diamonds",
        "description": "Ensure quality with GIA, IGI & HRD certified diamonds from Uniglo. Internationally recognized certificates with lifetime authenticity guarantee."
    },
    "de": {
        "title": "GIA-, IGI- & HRD-Diamantzertifikate | Uniglo Diamonds",
        "description": "Sichern Sie die Qualität mit GIA-, IGI- & HRD-zertifizierten Diamanten von Uniglo. International anerkannte Zertifikate mit lebenslanger Echtheitsgarantie."
    },
    "nl": {
        "title": "GIA-, IGI- & HRD-diamantcertificaten | Uniglo Diamonds",
        "description": "Verzeker uzelf von kwaliteit met GIA-, IGI- & HRD-gecertificeerde diamanten van Uniglo. Internationaal erkende certificaten mit levenslange echtheidsgarantie."
    },
    "fr": {
        "title": "Certificats de diamants GIA, IGI et HRD | Uniglo Diamonds",
        "description": "Assurez la qualité avec les diamants certifiés GIA, IGI et HRD d'Uniglo. Des certificats internationalement reconnus avec une garantie d'authenticité à vie."
    },
    "it": {
        "title": "Certificati dei diamanti GIA, IGI e HRD | Uniglo Diamonds",
        "description": "Garantisci la qualità con i diamanti certificati GIA, IGI e HRD di Uniglo. Certificati riconosciuti a livello internazionale con garanzia di autenticità a vita."
    },
    "es": {
        "title": "Certificados de diamantes GIA, IGI y HRD | Uniglo Diamonds",
        "description": "Garantice la calidad con diamantes certificados por GIA, IGI y HRD de Uniglo. Certificados reconocidos internacionalmente con garantía de autenticidad de por vida."
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
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}diamond-certificates`,
        },
    };
}

const Page = async () => {
    const t = await getTranslations("diamondCertificatesPage");

    const certificateData: ArticleSection[] = [
        {
            heading: t("portfolioHeading"),
            content: [
                { type: "paragraph", text: t("portfolioPara1") },
                { type: "paragraph", text: t("portfolioPara2") },
            ],
        },
        {
            heading: t("whatIsHeading"),
            content: [
                { type: "paragraph", text: t("whatIsPara1") },
                { type: "paragraph", text: t("whatIsIntro") },
                {
                    type: "bullet-list",
                    items: t.raw("whatIsBullets") as string[],
                },
                { type: "paragraph", text: t("whatIsPara2") },
                { type: "paragraph", text: t("whatIsPara3") },
            ],
        },
        {
            heading: t("whyEssentialHeading"),
            content: [
                { type: "paragraph", text: t("whyEssentialIntro") },
                { type: "paragraph", text: t("whyEssentialPara1") },
                { type: "paragraph", text: t("whyEssentialPara2") },
                { type: "paragraph", text: t("whyEssentialPara3") },
                { type: "paragraph", text: t("whyEssentialPara4") },
            ],
        },
        {
            heading: t("inspectionHeading"),
            content: [
                { type: "paragraph", text: t("inspectionPara1") },
                { type: "paragraph", text: t("inspectionPara2") },
                { type: "paragraph", text: t("inspectionPara3") },
            ],
        },
        {
            heading: t("differenceHeading"),
            content: [
                { type: "paragraph", text: t("differencePara1") },
                { type: "paragraph", text: t("gradingLabel") },
                {
                    type: "bullet-list",
                    items: t.raw("gradingBullets") as string[],
                },
                { type: "paragraph", text: t("appraisalLabel") },
                {
                    type: "bullet-list",
                    items: t.raw("appraisalBullets") as string[],
                },
                { type: "paragraph", text: t("differencePara2") },
            ],
        },
        {
            heading: t("labsHeading"),
            content: [
                { type: "paragraph", text: t("labsPara1") },
                { type: "paragraph", text: t("giaPara1") },
                { type: "paragraph", text: t("giaPara2") },
                { type: "paragraph", text: t("igiPara1") },
                { type: "paragraph", text: t("igiPara2") },
                { type: "paragraph", text: t("igiPara3") },
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            <BannerSection
                image={BannerImage}
                text={t("bannerText")}
                textClassName="left-10 top-90 text-5xl"
                imageClassName="h-100 object-cover"
            />

            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-12 mt-10">
                <div className="w-full lg:w-2/3 pb-10">
                    <DynamicArticle sections={certificateData} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default Page;