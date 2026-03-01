import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
    Gem,
    SlidersHorizontal,
    ListChecks,
    Eye,
    Hammer,
    Package,
} from "lucide-react";

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

// 1. Service data array
const services = [
    {
        icon: Gem,
        title: "Diamond Manufacturing",
        description:
            "Uniglo Diamonds crafts exquisite, certified gems with precision and ethical sourcing. Trusted quality for your perfect diamond.",
    },
    {
        icon: SlidersHorizontal,
        title: "Free Estimations",
        description:
            "Uniglo Diamonds provides free, accurate estimations with no obligation, offering trusted insights into your diamond's true value.",
    },
    {
        icon: Package,
        title: "Financing",
        description:
            "Uniglo Diamonds offers flexible, easy financing options, allowing you to enjoy your diamond now with manageable payments over time.",
    },
    {
        icon: Hammer,
        title: "Investment",
        description:
            "Uniglo Diamonds provides expert guidance and certified, high-quality stones for secure diamond investments that grow in value.",
    },
    {
        icon: ListChecks,
        title: "Sealing",
        description:
            "Uniglo Diamonds provides secure, professional diamond sealing services to protect, preserve, and enhance your gem's authenticity and quality.",
    },
    {
        icon: Eye,
        title: "Partners",
        description:
            "Uniglo Diamonds partners globally, offering premium diamonds and tailored services to meet diverse client needs and standards.",
    },
];

const diamondShapes = [
    { name: "Round", src: "/shapes/round-diamond.png" },
    { name: "Oval", src: "/shapes/Oval-Diamond.png" },
    { name: "Cushion", src: "/shapes/cushion-diamond.png" },
    { name: "Pear", src: "/shapes/pear-diamond.png" },
    { name: "Princess", src: "/shapes/princess-diamond.png" },
    { name: "Emerald", src: "/shapes/emerald-diamond.png" },
    { name: "Marquise", src: "/shapes/marquise-diamond.png" },
    { name: "Asscher", src: "/shapes/asscher-diamond.png" },
    { name: "Radiant", src: "/shapes/radiant-diamond.png" },
    { name: "Heart", src: "/shapes/heart.png" },
];

const pyramidPattern = [4, 3, 2, 1];

let currentIndex = 0;
const rows = pyramidPattern.map((count) => {
    const chunk = diamondShapes.slice(currentIndex, currentIndex + count);
    currentIndex += count;
    return chunk;
});

const infoSections = [
    {
        image: sellDiamond,
        tag: "SELL YOUR DIAMONDS",
        title: "Why sell your diamonds to us?",
        description:
            "By quoting you a firm and precise value based on the 4C diamond criteria and market demand, we promise you the very best price for your valuable diamonds. With our ever-growing global customer base, we will always have a strong demand for your diamonds, 365 days a year.",
        button: "LEARN MORE",
        number: "01",
        reverse: false,
        link: "/sell-your-diamonds",
    },
    {
        image: diamondGuide,
        tag: "GUIDE",
        title: "Diamond Investment Guide: What You Need to Know Before Investing",
        description:
            "Diamonds have long been valued for their beauty and rarity, but they are increasingly being considered as an investment option. While diamonds don't provide dividends or interest, like stocks or bonds, they offer value through their inherent scarcity and long-term durability.",
        button: "LEARN MORE",
        number: "02",
        reverse: true,
        link: "/investment-diamonds",
    },
    {
        image: education,
        tag: "EDUCATION",
        title: "Every Stone Has A Different Story To Tell",
        description:
            "Every diamond is a unique miracle of nature, created billions of years ago deep below the Earth's surface by forces beyond our imagination. They are the ultimate symbols of love, emotion, commitment and purity. Like snowflakes, no two are exactly alike.",
        button: "LEARN MORE",
        number: "03",
        reverse: false,
        link: "/old-cut-diamonds",
    },
];

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

export default function Home() {
    return (
        <div className="">
            {/* Hero Section : Carousel (client component island) */}
            <HeroCarousel />

            {/* Diamond Showcase Section */}
            <section className="py-20 bg-[#FBFBFB] text-center font-cormorantGaramond">
                <div className="mb-12 space-y-2">
                    <span className="text-primary text-sm uppercase tracking-widest ">
                        Diamond Cuts
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-primary-blue-1">
                        SHOP DIAMONDS BY SHAPE
                    </h2>
                    <p className="text-slate-500 font-ligh font-lora">
                        Browse a large collection of IGI, HRD and GIA certified
                        diamonds
                    </p>
                </div>

                {/* 3. Render the specific Rows */}
                <div className="flex flex-col items-center gap-y-10">
                    {rows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex justify-center gap-x-1 sm:gap-x-12 md:gap-x-30"
                        >
                            {row.map((shape) => (
                                <div
                                    key={shape.name}
                                    className="flex flex-col items-center group cursor-pointer w-20"
                                >
                                    {/* Image */}
                                    <div className="w-16 h-16 md:w-18 md:h-18 relative transition-transform hover:-translate-y-2 duration-300">
                                        <Image
                                            src={shape.src}
                                            alt={shape.name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-contain drop-shadow-md"
                                        />
                                    </div>
                                    {/* Text */}
                                    <span className="mt-3 font-serif text-sm md:text-lg text-slate-700">
                                        {shape.name}
                                    </span>
                                </div>
                            ))}
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
                            <span>VIEW ALL DIAMONDS</span>
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Uniglow Diamonds App Section */}
            <section className="bg-brand-gradient font-cormorantGaramond ">
                <div className="container mx-auto flex flex-col justify-center items-center">
                    <div className="mb-12 space-y-2 text-center pt-15">
                        <span className="text-primary text-sm uppercase tracking-widest  ">
                            Uniglo diamond app
                        </span>
                        <h2 className="text-3xl font-serif text-white">
                            Discover the UNIGLO DIAMONDS APP
                        </h2>
                        <p className="text-slate-500 font-ligh font-lora">
                            Browse a large collection of IGI, HRD and GIA
                            certified diamonds
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
                                    Diamond Search
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    Browse 1000&apos;s of natural & <br /> lab
                                    grown diamonds.
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
                                    Easy filtering
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    Narrow down search results <br /> with smart
                                    filters.
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
                                    Enquire
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    Add your favourite diamonds <br /> to your
                                    inquiry.
                                </p>
                            </div>
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
                                <div className="text-primary">
                                    <Eye strokeWidth={1.5} size={30} />
                                </div>
                                <h3 className="text-2xl text-white font-serif">
                                    360° diamond View
                                </h3>
                                <p className="text-slate-400 font-lora text-sm max-w-[250px]">
                                    See every detail in 360° <br /> diamond
                                    view.
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
                            DIAMOND TO JEWELRY
                        </span>
                        <h2 className="text-4xl font-semibold  font-cormorantGaramond  mt-2">
                            The Journey Of Elegance
                        </h2>
                        <p className="text-slate-500 font-lora text-sm mt-4">
                            See how every piece of diamond transforms from idea
                            to timeless jewelry.
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
                                Design Inspiration
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                Our designers craft timeless concepts, blending
                                tradition with modern elegance.
                            </p>
                        </div>
                        <div className="flex flex-col items-center px-6">
                            <Hammer
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                Artisan Crafting
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                Skilled artisans shape each piece with
                                precision, using only the finest materials.
                            </p>
                        </div>
                        <div className="flex flex-col items-center px-6">
                            <Package
                                size={64}
                                strokeWidth={0.9}
                                className="text-primary mb-6"
                            />
                            <h3 className="text-2xl font-semibold font-cormorantGaramond mb-3">
                                Delivered To You
                            </h3>
                            <p className="text-slate-500 font-lora text-sm">
                                Your jewelry arrives beautifully packaged, ready
                                to be worn and cherished.
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
                            YOUR 360 DIAMONDS SOLUTIONS
                        </span>
                        <h2 className="text-4xl font-cormorantGaramond text-white mt-2 mb-4">
                            Our Services
                        </h2>
                        <p className="text-slate-300/70 font-lora text-base max-w-7xl mx-auto">
                            Uniglo Diamonds is committed to giving you all the
                            relevant diamond expertise, guidance and product
                            range depending on your investment goals and
                            available funds, ensuring you make a sound, safe and
                            smart investment in diamonds.
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
                                <span>EXPLORE MORE</span>
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
