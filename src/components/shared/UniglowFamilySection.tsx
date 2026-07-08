"use client";
import React, { useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

const carouselImages = [
    "/uniglow-family/uniglo1.jpeg",
    "/uniglow-family/uniglo2.jpg",
];

const UniglowFamilySection = () => {
    const t = useTranslations();
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
    return (
        <section className="w-full py-20 bg-white font-cormorantGaramond">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* --- LEFT COLUMN: Image Carousel with Geometric Decor --- */}
                    <div className="relative mx-auto w-full max-w-[500px] ">
                        {/* Decorative Gold Box (Top Left) */}
                        <div className="absolute -top-4 -left-4 w-32 h-3/4 bg-primary-yellow-1 z-0" />

                        {/* Decorative Purple Box (Bottom Right) */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-3/4 bg-[#2E1035] z-0" />

                        {/* The Carousel */}
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full h-full bg-gray-100 shadow-xl"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent>
                                {carouselImages.map((src, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative aspect-6/7 w-full h-full overflow-hidden">
                                            <Image
                                                src={src}
                                                alt={`${t("aboutPage.theUnigloFamily")} ${
                                                    index + 1
                                                }`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {/* Optional: <CarouselPrevious /> <CarouselNext /> */}
                        </Carousel>
                    </div>

                    {/* --- RIGHT COLUMN: Text Content --- */}
                    <div className="flex flex-col space-y-6 text-center lg:text-left">
                        {/* Heading Group */}
                        <div>
                            <span className="text-primary text-sm uppercase  font-semibold mb-2 block">
                                {t("aboutPage.welcomeToUniglo")}
                            </span>
                            <h2 className="text-4xl font-serif text-[#1f2732]">
                                {t("aboutPage.theUnigloFamily")}
                            </h2>
                        </div>

                        {/* Paragraph Text */}
                        <div className=" font-lora space-y-4 leading-relaxed  text-sm">
                            <p>{t("aboutPage.familyDescription1")}</p>
                            <p>{t("aboutPage.familyDescription2")}</p>
                        </div>

                        {/* Stats Section */}
                        <div className="pt-4 pb-8 flex justify-center lg:justify-start gap-16 border-b border-gray-200/50">
                            <div className="text-center lg:text-left">
                                <span className="block text-5xl text-primary">
                                    1000+
                                </span>
                                <span className="text-sm uppercase tracking-wide mt-1 block">
                                    {t("aboutPage.clientsServed")}
                                </span>
                            </div>
                            <div className="text-center lg:text-left">
                                <span className="block text-5xl  text-primary">
                                    25+
                                </span>
                                <span className="text-sm uppercase tracking-wide mt-1 block">
                                    {t("aboutPage.yearsExperience")}
                                </span>
                            </div>
                        </div>

                        {/* Button (Using your custom class) */}
                        <div className="pt-4 flex justify-center lg:justify-start">
                            <Button
                                className="purple-reveal-btn p-6 uppercase"
                                size={"lg"}
                            >
                                <span>{t("aboutPage.aboutUsButton")}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UniglowFamilySection;