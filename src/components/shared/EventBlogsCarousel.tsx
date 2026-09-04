"use client";

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";

export type EventBlogCard = {
    slug: string;
    image: string;
    title: string;
    /** Author + date, already joined and localised by the caller. */
    meta: string;
    excerpt: string;
};

/**
 * Carousel of the campaign's supporting blog posts, rendered with the same
 * card treatment as the /blogs listing so the two read as one set. Content
 * arrives pre-translated from the server component — the client side only
 * owns the embla wiring.
 */
export default function EventBlogsCarousel({
    posts,
    readMoreLabel,
}: {
    posts: EventBlogCard[];
    readMoreLabel: string;
}) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [selected, setSelected] = React.useState(0);
    const [snapCount, setSnapCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setSelected(api.selectedScrollSnap());
            setSnapCount(api.scrollSnapList().length);
        };
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api]);

    return (
        <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            plugins={[
                Autoplay({
                    delay: 5000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                }),
            ]}
            className="w-full"
        >
            <CarouselContent className="-ml-6">
                {posts.map((post) => (
                    <CarouselItem
                        key={post.slug}
                        className="pl-6 basis-full sm:basis-1/3 lg:basis-1/4"
                    >
                        <article className="flex flex-col h-full group">
                            <Link
                                href={`/blogs/${post.slug}`}
                                className="relative block w-full aspect-square overflow-hidden rounded-sm mb-6"
                            >
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </Link>

                            <h3 className="text-2xl md:text-3xl font-cormorantGaramond font-semibold text-[#bb923a] mb-3 leading-tight">
                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="hover:text-primary-purple2 transition-colors"
                                >
                                    {post.title}
                                </Link>
                            </h3>

                            <p className="text-primary-purple-dark font-lora text-sm mb-4">
                                {post.meta}
                            </p>

                            <p className="text-primary-purple-dark font-lora text-base leading-relaxed mb-6 grow line-clamp-3">
                                {post.excerpt}
                            </p>

                            <Link
                                href={`/blogs/${post.slug}`}
                                className="inline-block bg-[#bb923a] text-white px-6 py-2 text-sm font-bold font-lora uppercase tracking-wider hover:bg-[#9a7a2f] transition-colors w-fit rounded-sm"
                            >
                                {readMoreLabel}
                            </Link>
                        </article>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Controls sit below the track so the arrows never overhang the
                page gutter on narrow viewports. */}
            <div className="flex items-center justify-between gap-6 mt-10">
                <div className="flex items-center gap-3">
                    {Array.from({ length: snapCount }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => api?.scrollTo(i)}
                            aria-label={`${i + 1}`}
                            aria-current={selected === i}
                            className={`h-px transition-all duration-300 cursor-pointer ${
                                selected === i
                                    ? "w-12 bg-[#bb923a]"
                                    : "w-6 bg-slate-300 hover:bg-slate-400"
                            }`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <CarouselPrevious className="static size-10 translate-y-0 border-[#bb923a] text-[#bb923a] hover:bg-[#bb923a] hover:text-white" />
                    <CarouselNext className="static size-10 translate-y-0 border-[#bb923a] text-[#bb923a] hover:bg-[#bb923a] hover:text-white" />
                </div>
            </div>
        </Carousel>
    );
}
