"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export type JewelleryCategory = {
    title: string;
    description: string;
    linkLabel: string;
    href: string;
};

/**
 * Auto-advancing carousel for the Mother's Day "shop by jewellery type"
 * categories. Autoplay pauses on hover and on keyboard focus so the rotation
 * never fights a reader, and the dots below give direct manual control.
 */
export default function JewelleryTypeCarousel({
    categories,
}: {
    categories: JewelleryCategory[];
}) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [selected, setSelected] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => setSelected(api.selectedScrollSnap());
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api]);

    return (
        <div className="flex flex-col">
            <Carousel
                setApi={setApi}
                opts={{ loop: true, align: "start" }}
                plugins={[
                    Autoplay({
                        delay: 4500,
                        stopOnInteraction: false,
                        stopOnMouseEnter: true,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent className="ml-0">
                    {categories.map((category) => (
                        <CarouselItem
                            key={category.title}
                            className="pl-0 basis-full"
                        >
                            {/* Fixed min-height keeps the pinned footer below
                                from shifting as slides of differing length
                                rotate through — descriptions vary a lot
                                between locales. */}
                            <div className="min-h-[260px] md:min-h-[240px] flex flex-col">
                                <h3 className="font-cormorantGaramond text-3xl md:text-4xl text-[#1f2732] mb-4">
                                    {category.title}
                                </h3>
                                <p className="font-lora text-lg text-slate-600 leading-relaxed mb-6">
                                    {category.description}
                                </p>
                                <a
                                    href={category.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-lato text-xs uppercase tracking-[0.2em] text-[#bb923a] border-b border-[#bb923a] pb-1 self-start hover:opacity-70 transition-opacity"
                                >
                                    {category.linkLabel}
                                </a>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="flex items-center gap-3 mt-2">
                {categories.map((category, i) => (
                    <button
                        key={category.title}
                        type="button"
                        onClick={() => api?.scrollTo(i)}
                        aria-label={category.title}
                        aria-current={selected === i}
                        className={`h-px transition-all duration-300 cursor-pointer ${
                            selected === i
                                ? "w-12 bg-[#bb923a]"
                                : "w-6 bg-slate-300 hover:bg-slate-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
