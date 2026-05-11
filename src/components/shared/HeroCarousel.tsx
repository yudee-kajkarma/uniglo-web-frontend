"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

import banner0 from "@/assets/banner.jpeg";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpeg";

function CarouselCTA() {
    return (
        <Button
            className="purple-reveal-btn px-2 py-1 md:px-6 md:py-4 lg:px-10 lg:py-8 font-cormorantGaramond text-xs md:text-base lg:text-xl uppercase"
            size="lg"
            asChild
        >
            <Link href="/inventory">Browse Inventory</Link>
        </Button>
    );
}

export default function HeroCarousel() {
    return (
        <section className="w-full mt-[3px] flex items-center justify-center">
            <Carousel
                className="w-full p-2 md:p-0 m-0 border border-white"
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
            >
                <CarouselContent className="w-full p-0 m-0">
                    <CarouselItem className="p-0 m-0 w-full relative">
                        <Image
                            src={banner2}
                            alt="Uniglo Diamonds - Antwerp Diamond Heritage"
                            className="w-full h-auto md:min-h-screen object-cover rounded-xl"
                            sizes="100vw"
                            placeholder="blur"
                        />
                        <div className="absolute bottom-6 right-4 md:bottom-20 md:right-50 z-20">
                            <CarouselCTA />
                        </div>
                    </CarouselItem>
                    <CarouselItem className="p-0 m-0 w-full relative">
                        <Image
                            src={banner1}
                            alt="Uniglo Diamonds - Certified Diamond Excellence"
                            className="w-full h-auto md:min-h-screen object-cover rounded-xl"
                            sizes="100vw"
                            placeholder="blur"
                        />
                        <div className="absolute bottom-6 right-4 md:bottom-10 md:right-20 z-20">
                            <CarouselCTA />
                        </div>
                    </CarouselItem>
                    <CarouselItem className="p-0 m-0 w-full relative">
                        <Image
                            src={banner0}
                            alt="Uniglo Diamonds - Premium Diamond Collection"
                            className="w-full h-auto md:min-h-screen object-cover rounded-xl"
                            priority
                            sizes="100vw"
                            placeholder="blur"
                        />
                        <div className="absolute bottom-6 right-4 md:bottom-10 md:right-20 z-20">
                            <CarouselCTA />
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>
    );
}
