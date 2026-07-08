import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
    Gem,
    SlidersHorizontal,
    ListChecks,
    Eye,
    Hammer,
    Package,
} from "lucide-react";
import { Metadata } from "next";

import sellDiamond from "@/assets/home/sell_diamonds.jpg";
import education from "@/assets/home/Education.jpg";
import diamondGuide from "@/assets/home/blog2.jpg";
import mobileAppMockup from "@/assets/mobile-app.png";

// Client components — only the interactive parts
import HeroCarousel from "@/components/shared/HeroCarousel";

// Dynamic imports for below-fold heavy components (code-split)
const CertificatesMarqueeSection = dynamic(
    () => import("@/components/shared/CertificatesMarqueeSection"),
    { ssr: true },
);
const LazyVideoSection = dynamic(
    () => import("@/components/shared/LazyVideoSection"),
);

const diamondShapes = [
    { nameKey: "shapeRound", src: "/shapes/round-diamond.png" },
    { nameKey: "shapeOval", src: "/shapes/Oval-Diamond.png" },
    { nameKey: "shapeCushion", src: "/shapes/cushion-diamond.png" },
    { nameKey: "shapePear", src: "/shapes/pear-diamond.png" },
    { nameKey: "shapePrincess", src: "/shapes/princess-diamond.png" },
    { nameKey: "shapeEmerald", src: "/shapes/emerald-diamond.png" },
    { nameKey: "shapeMarquise", src: "/shapes/marquise-diamond.png" },
    { nameKey: "shapeAsscher", src: "/shapes/asscher-diamond.png" },
    { nameKey: "shapeRadiant", src: "/shapes/radiant-diamond.png" },
    { nameKey: "shapeHeart", src: "/shapes/heart.png" },
];

const pyramidPattern = [4, 3, 2, 1];

let currentIndex = 0;
const rows = pyramidPattern.map((count) => {
    const chunk = diamondShapes.slice(currentIndex, currentIndex + count);
    currentIndex += count;
    return chunk;
});

// ServiceCard as a server component (no interactivity needed)
function ServiceCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ComponentType<{
        size?: number;
        strokeWidth?: number;
        className?: string;
    }>;
    title: string;
    description: string;
}) {
    return (
        <div className="purple-reveal-btn px-8 py-15 flex flex-col items-center justify-center text-center group ">
            <div className="flex flex-col items-center mb-4">
                <Icon
                    size={40}
                    strokeWidth={2}
                    className="text-primary mb-2 group-hover:text-primary-purple"
                />
            </div>
            <h3 className="text-3xl font-cormorantGaramond text-primary mb-2 group-hover:text-primary-purple">
                {title}
            </h3>
            <p className="text-slate-200 font-lora text-base max-w-sm group-hover:text-primary-purple">
                {description}
            </p>
        </div>
    );
}
export const metadata: Metadata = {
    title: "Uniglo Diamonds – Certified Natural & Lab Grown Diamonds",
    description:
        "Discover certified IGI, GIA & HRD diamonds at Uniglo Diamonds. Buy, sell, trade, invest & manufacture premium natural & lab grown stones with trusted expertise.",
};

export default async function Home() {
    const t = await getTranslations();

    const services = [
        {
            icon: Gem,
            title: t("footer.footerServices.manufacturing"),
            description: t("homePage.serviceManufacturingDesc"),
        },
        {
            icon: SlidersHorizontal,
            title: t("footer.footerServices.estimations"),
            description: t("homePage.serviceEstimationsDesc"),
        },
        {
            icon: Package,
            title: t("footer.footerServices.financing"),
            description: t("homePage.serviceFinancingDesc"),
        },
        {
            icon: Hammer,
            title: t("footer.footerServices.investment"),
            description: t("homePage.serviceInvestmentDesc"),
        },
        {
            icon: ListChecks,
            title: t("footer.footerServices.sealing"),
            description: t("homePage.serviceSealingDesc"),
        },
        {
            icon: Eye,
            title: t("footer.footerServices.partners"),
            description: t("homePage.servicePartnersDesc"),
        },
    ];

    const infoSections = [
        {
            image: sellDiamond,
            tag: t("homePage.sellYourDiamonds"),
            title: t("homePage.whySellYourDiamonds"),
            description: t("homePage.whySellDescription"),
            button: t("common.learnMore"),
            number: "01",
            reverse: false,
            link: "/sell-your-diamonds",
        },
        {
            image: diamondGuide,
            tag: t("homePage.guide"),
            title: t("homePage.diamondInvestmentGuide"),
            description: t("homePage.diamondInvestmentDescription"),
            button: t("common.learnMore"),
            number: "02",
            reverse: true,
            link: "/investment-diamonds",
        },
        {
            image: education,
            tag: t("homePage.education"),
            title: t("homePage.everyStoneStory"),
            description: t("homePage.everyStoneDescription"),
            button: t("common.learnMore"),
            number: "03",
            reverse: false,
            link: "/old-cut-diamonds",
        },
    ];

    return (
        <div className="">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: [
                            {
                                "@type": "Question",
                                name: "What is the customer service phone number of Uniglo Diamonds?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "You can contact Uniglo Diamonds customer support at +32 03 500 91 07. Alternatively, you may also reach them at +32 473 56 57 58 during business hours (Monday to Friday, 10:00 AM – 6:00 PM CET). For email support, you can write to suraj@uniglodiamonds.com",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "Are lab-grown diamonds available in Belgium?",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text: "Yes, lab-grown diamonds are widely available in Belgium, especially in Antwerp, which is one of the world's leading diamond trading hubs. While most lab-grown diamonds are manufactured in countries like India and China, Belgian suppliers specialize in trading, certification (such as IGI, GIA, and HRD), and global distribution. Buyers can find a wide range of certified lab-grown diamonds in different cuts, sizes, and colors, often at competitive prices compared to natural diamonds.",
                                },
                            },
                        ],
                    }),
                }}
            />
            {/* Hero Section : Carousel (client component island) */}
            <HeroCarousel />

            {/* Diamond Showcase Section */}
            <section className="py-20 bg-[#FBFBFB] text-center font-cormorantGaramond">
                <div className="mb-12 space-y-2">
                    <span className="text-primary text-sm uppercase tracking-widest ">
                        {t("homePage.diamondCuts")}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-primary-blue-1">
                        {t("homePage.shopDiamondsByShape")}
                    </h2>
                    <p className="text-slate-500 font-ligh font-lora">
                        {t("homePage.browseLargeCollection")}
                    </p>
                </div>

                {/* 3. Render the specific Rows */}
                <div className="flex flex-col items-center gap-y-10">
                    {rows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex justify-center gap-x-1 sm:gap-x-12 md:gap-x-30"
                        >
                            {row.map((shape) => {
                                const shapeName = t(`homePage.${shape.nameKey}`);
                                return (
                                    <div
                                        key={shape.nameKey}
                                        className="flex flex-col items-center group cursor-pointer w-20"
                                    >
                                        {/* Image */}
                                        <div className="w-16 h-16 md:w-18 md:h-18 relative transition-transform hover:-translate-y-2 duration-300">
                                            <Image
                                                src={shape.src}
                                                alt={shapeName}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-contain drop-shadow-md"
                                            />
                                        </div>
                                        {/* Text */}
                                        <span className="mt-3 font-serif text-sm md:text-lg text-slate-700">
                                            {shapeName}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="mt-16">
                    <Button
                        className="purple-reveal-btn p-6"
                        size={"lg"}
                        asChild
                    >
                        <Link href="/inventory">
                            <span>{t("common.viewAllDiamonds")}</span>
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Uniglow Diamonds App Section */}
            <section className="bg-brand-gradient font-cormorantGaramond ">
                <div className="container mx-auto flex flex-col justify-center items-center">
                    <div className="mb-12 space-y-2 text-center pt-15">
                        <span className="text-primary text-sm uppercase tracking-widest  ">
                            {t("homePage.unigloDiamondApp")}
                        </span>
                        <h2 className="text-3xl font-serif text-white">
                            {t("homePage.discoverUnigloDiamondsApp")}
                        </h2>
                        <p className="text-slate-500 font-ligh font-lora">
                            {t("homePage.browseLargeCollection")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 items-center w-full max-w-6xl">
                        {/* 1. Left Column (Features) */}
                        <div className="flex flex-col gap-16 order-2 lg:order-1">
                            <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
                                <div className="text-primary">
                                    <Gem strokeWidth={1.5} size={30} />
                                </div>
                                <h3 className="text-2xl text-white font-cormorantGaramond">
                                    {t("homePage.diamondSearch")}
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    {t("homePage.browse1000sNaturalLab")}
                                </p>
                            </div>
                            <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
                                <div className="text-primary">
                                    <SlidersHorizontal
                                        strokeWidth={1.5}
                                        size={30}
                                    />
                                </div>
                                <h3 className="text-2xl text-white font-cormorantGaramond">
                                    {t("homePage.easyFiltering")}
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    {t("homePage.narrowDownSearchResults")}
                                </p>
                            </div>
                        </div>

                        {/* 2. Center Column (Phone Image) */}
                        <div className="order-1 lg:order-2 flex justify-center relative py-8">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="relative w-[180px] md:w-[220px] h-[480px] md:h-[500px]">
                                <Image
                                    src={mobileAppMockup}
                                    alt="Uniglo App Interface"
                                    fill
                                    sizes="(max-width: 768px) 180px, 220px"
                                    className="object-contain drop-shadow-2xl z-10"
                                    placeholder="blur"
                                />
                            </div>
                        </div>

                        {/* 3. Right Column (Features) */}
                        <div className="flex flex-col gap-16 order-3">
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                                <div className="text-primary">
                                    <ListChecks strokeWidth={1.5} size={30} />
                                </div>
                                <h3 className="text-2xl text-white font-serif">
                                    {t("homePage.enquire")}
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    {t("homePage.addFavouriteDiamonds")}
                                </p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                                <div className="text-primary">
                                    <Eye strokeWidth={1.5} size={30} />
                                </div>
                                <h3 className="text-2xl text-white font-serif">
                                    {t("homePage.diamondView")}
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    {t("homePage.seeEveryDetail")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="bg-white py-24 font-cormorantGaramond">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="text-primary text-sm uppercase font-cormorantGaramond font-semibold">
                            {t("homePage.diamondToJewelry")}
                        </span>
                        <h2 className="text-4xl font-semibold  font-cormorantGaramond  mt-2">
                            {t("homePage.journeyOfElegance")}
                        </h2>
                        <p className="text-slate-500 font-lora text-sm mt-4">
                            {t("homePage.seeHowEveryPiece")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 text-center">
                        <div className="flex flex-col items-center px-6">
                            <Gem
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                {t("homePage.designInspiration")}
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                {t("homePage.ourDesignersCraft")}
                            </p>
                        </div>
                        <div className="flex flex-col items-center px-6">
                            <Hammer
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                {t("homePage.artisanCrafting")}
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                {t("homePage.skilledArtisansShape")}
                            </p>
                        </div>
                        <div className="flex flex-col items-center px-6">
                            <Package
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                {t("homePage.deliveredToYou")}
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                {t("homePage.yourJewelryArrives")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-brand-gradient py-24 font-cormorantGaramond">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <span className="text-primary text-sm uppercase tracking-widest font-lora">
                            {t("homePage.your360DiamondsSolutions")}
                        </span>
                        <h2 className="text-4xl font-cormorantGaramond text-white mt-2 mb-4">
                            {t("homePage.ourServices")}
                        </h2>
                        <p className="text-slate-300/70 font-lora text-base max-w-7xl mx-auto">
                            {t("homePage.committedToGiving")}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {services.map((service) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-10">
                        <Button
                            className="purple-reveal-btn px-10 py-6 font-serif text-base"
                            size="lg"
                            asChild
                        >
                            <Link href="/diamond-manufacturing">
                                <span>{t("common.exploreMore")}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Partners Marquee Section (dynamically imported) */}
            <CertificatesMarqueeSection />

            {/* Video Section (dynamically imported, client-only, lazy-loaded) */}
            <LazyVideoSection />

            {/* Services Description Section */}
            <section className="bg-white py-20 font-cormorantGaramond">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {infoSections.map((section) => (
                        <div
                            key={section.title}
                            className={
                                "flex flex-col md:flex-row items-center gap-8 py-12 border-b border-gray-300/60 " +
                                (section.reverse ? "md:flex-row-reverse" : "")
                            }
                        >
                            {/* Image */}
                            <div className="w-full md:w-1/2 flex justify-center">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    width={600}
                                    height={260}
                                    className="rounded-md object-cover"
                                    placeholder="blur"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            {/* Content */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center px-2">
                                <div className="flex items-center mb-2">
                                    <span className="text-primary text-4xl font-cormorantGaramond font-semibold mr-4">
                                        {section.number}
                                    </span>
                                    <span className="text-primary text-lg uppercase font-lora tracking-widest">
                                        {section.tag}
                                    </span>
                                </div>
                                <h3 className="text-4xl font-cormorantGaramond font-semibold mb-2">
                                    {section.title}
                                </h3>
                                <p className="text-slate-600 font-lora text-base mb-6 max-w-sm mt-10">
                                    {section.description}
                                </p>
                                <Button
                                    className="purple-reveal-btn px-8 py-6 font-cormorantGaramond text-base w-fit"
                                    size="lg"
                                    asChild
                                >
                                    <Link href={section.link}>
                                        <span>{section.button}</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}