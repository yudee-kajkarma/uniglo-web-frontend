import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import bannerImage from "@/assets/sell-your-diamonds/banner.png";
import sellyourdiamondsImage from "@/assets/sell-your-diamonds/img1_compressed.jpeg";
import adviceImage from "@/assets/sell-your-diamonds/new1.jpeg";
import benefitImage from "@/assets/sell-your-diamonds/img3.jpg";
import ReasonImage from "@/assets/sell-your-diamonds/ing4.jpg";
import { Button } from "@/components/ui/button";
import CertificatesMarqueeSection from "@/components/shared/CertificatesMarqueeSection";
import Image from "next/image";
import appointmentRing from "@/assets/sell-your-diamonds/online-inventory-banner.png";
import ArticleLayout from "@/components/shared/ArticleLayout";
import SellDiamondForm from "@/components/shared/SellDiamondForm";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    const seo = {
        en: {
            title: "Diamond Buyers in Antwerp, Belgium | Sell Diamonds Securely – Uniglo",
            description: "Looking to sell diamonds or diamond jewellery in Antwerp, Belgium? Uniglo offers professional appraisal, recutting advice, certification, and immediate payment."
        },
        de: {
            title: "Diamantenankauf in Antwerpen, Belgien | Diamanten Sicher Verkaufen – Uniglo",
            description: "Möchten Sie Diamanten oder Diamantschmuck in Antwerpen, Belgien verkaufen? Uniglo bietet professionelle Bewertung, Beratung zum Nachschleifen, Zertifizierung und sofortige Zahlung."
        },
        nl: {
            title: "Diamantinkoop in Antwerpen, België | Diamanten Veilig Verkopen – Uniglo",
            description: "Wilt u diamanten of diamantjuwelen verkopen in Antwerpen, België? Uniglo biedt professionele taxatie, advies over herslijpen, certificering en directe betaling."
        },
        fr: {
            title: "Acheteurs de Diamants à Anvers, Belgique | Vendre des Diamants en Toute Sécurité – Uniglo",
            description: "Vous cherchez à vendre des diamants ou des bijoux en diamant à Anvers, Belgique ? Uniglo propose une évaluation professionnelle, des conseils de retaillage, une certification et un paiement immédiat."
        },
        it: {
            title: "Acquirenti di Diamanti ad Anversa, Belgio | Vendi Diamanti in Sicurezza – Uniglo",
            description: "Desideri vendere diamanti o gioielli con diamanti ad Anversa, Belgio? Uniglo offre valutazioni professionali, consulenza sul taglio, certificazione e pagamento immediato."
        },
        es: {
            title: "Compradores de Diamantes en Amberes, Bélgica | Venda Diamantes de Forma Segura – Uniglo",
            description: "¿Desea vender diamantes o joyas con diamantes en Amberes, Bélgica? Uniglo ofrece tasación profesional, asesoramiento de retallado, certificación y pago inmediato."
        }
    };

    const currentSeo = seo[locale as keyof typeof seo] || seo.en;

    return {
        title: currentSeo.title,
        description: currentSeo.description,
        alternates: {
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}sell-your-diamonds`,
        },
    };
}

const Page = () => {
    const t = useTranslations("sellDiamondsPage");

    const articleData = [
        {
            subtitle: t("article1Subtitle"),
            title: t("article1Title"),
            image: sellyourdiamondsImage,
            reverse: false,
            paragraphs: [t("article1Para1"), t("article1Para2"), t("article1Para3")],
        },
        {
            subtitle: t("article2Subtitle"),
            title: t("article2Title"),
            image: adviceImage,
            reverse: true,
            paragraphs: [t("article2Para1"), t("article2Para2")],
            buttonText: t("contactUsButton"),
        },
        {
            subtitle: t("article3Subtitle"),
            title: t("article3Title"),
            image: ReasonImage,
            reverse: false,
            paragraphs: [t("article3Para1"), t("article3Para2")],
            buttonText: t("contactUsButton"),
        },
        {
            subtitle: t("article4Subtitle"),
            title: t("article4Title"),
            image: benefitImage,
            reverse: true,
            paragraphs: [
                t("article4Para1"),
                t("article4Para2"),
                t("article4Para3"),
                t("article4Para4"),
                t("article4Para5"),
            ],
        },
    ];

    return (
        <div className="min-h-screen ">
            <BannerSection
                image={bannerImage}
                text={t("bannerText")}
                textClassName="right-10 top-80 text-5xl"
                imageClassName="h-90 object-cover  "
            />

            {/* Articles Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {articleData.map((data, index) => (
                    <ArticleLayout
                        key={index}
                        title={data.title}
                        subtitle={data.subtitle}
                        paragraphs={data.paragraphs}
                        image={{
                            src: data.image.src,
                            alt: data.title,
                        }}
                        reverse={data.reverse}
                        buttonText={data.buttonText}
                    />
                ))}
            </section>

            {/* No Hidden Costs Section */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-semibold font-cormorantGaramond text-gray-900 mb-6">
                        {t("noHiddenCostsTitle")}
                    </h2>
                    <p className="text-gray-600 text-lg font-lora leading-relaxed">
                        {t("noHiddenCostsPara")}
                    </p>
                </div>
            </section>

            {/* Certificates Marquee Section */}
            <CertificatesMarqueeSection />

            {/* Sell Your Diamonds Form Section */}
            <SellDiamondForm
                title={t("formTitle")}
                subtitle={t("formSubtitle")}
            />

            {/* Make an Appointment Section */}
            <section className="bg-brand-gradient py-20 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:items-stretch gap-0 md:gap-0 rounded-lg overflow-hidden">
                    {/* Left: Inventory Promo */}
                    <div className="bg-black flex flex-col items-center justify-center p-10 min-h-[400px] md:w-1/3">
                        <div className="flex flex-col items-center">
                            <h3 className="text-white text-3xl md:text-4xl font-cormorantGaramond text-center mb-8">
                                {t("browseThousandsLine1")}
                                <br />
                                {t("browseThousandsLine2")}
                            </h3>
                            <Button className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition px-8 py-4 text-lg font-lora tracking-wide rounded-none mt-2">
                                {t("onlineInventoryButton")}
                            </Button>
                            <Image
                                src={appointmentRing}
                                alt="Diamond Ring"
                                width={250}
                                height={250}
                                className="mt-10 w-60 h-auto aspect-square object-contain"
                            />
                        </div>
                    </div>
                    {/* Right: Appointment Info */}
                    <div className="bg-primary-purple flex flex-col justify-center p-10 min-h-[400px]">
                        <span className="text-primary-yellow-1 text-sm uppercase font-lora tracking-widest mb-4 block">
                            {t("makeAppointmentLabel")}{" "}
                            <span className="inline-block align-middle w-8 h-px bg-primary-yellow-1 ml-2"></span>
                        </span>
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-white mb-8">
                            {t("findUsTitle")}
                        </h2>
                        <div className="mb-6">
                            <h4 className="text-2xl font-cormorantGaramond text-white mb-2">
                                {t("addressLabel")}
                            </h4>
                            <p className="text-white font-lora text-lg">
                                {t("addressText")}
                            </p>
                        </div>
                        <div className="mb-8">
                            <h4 className="text-2xl font-cormorantGaramond text-white mb-2">
                                {t("hoursLabel")}
                            </h4>
                            <p className="text-white font-lora text-lg">
                                {t("hoursWeekday")}
                                <br />
                                {t("hoursWeekend")}
                            </p>
                        </div>
                        <Button className="border-2 border-primary-yellow-1 text-white bg-transparent hover:bg-primary-yellow-1 hover:text-black transition px-8 py-4 text-lg font-lora tracking-wide rounded-none mt-2 gold-reveal-btn">
                            <span>{t("appointmentContactUsButton")}</span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;