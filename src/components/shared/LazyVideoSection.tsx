"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function LazyVideoSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[600px] flex items-center justify-start font-cormorantGaramond"
        >
            {/* Background Video — only loads when near viewport */}
            {isVisible && (
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/GettyImages.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Content */}
            <div className="relative z-10 max-w-2xl pl-5 md:pl-16">
                <span className="text-primary-yellow-1 text-lg uppercase font-lora tracking-widest mb-6 block">
                    A PARTNERSHIP OF VALUE
                </span>
                <h2 className="text-3xl md:text-5xl font-cormorantGaramond text-white font-semibold mb-6 leading-tight">
                    WHY SHOULD YOU BUY A<br />
                    DIAMOND FROM UNIGLO
                    <br />
                    DIAMONDS
                </h2>
                <p className="text-white font-lora text-xs md:text-lg mb-10">
                    Uniglo Diamonds has been selling diamonds in Antwerp,
                    Belgium for over three decades. We buy and sell diamonds,
                    ensuring a seamless and memorable experience. Since we
                    manufacture in our own facilities in Antwerp, we guarantee
                    low, wholesale pricing,
                </p>
                <Button
                    className="purple-reveal-btn px-10 py-6 text-lg font-cormorantGaramond"
                    size="lg"
                >
                    <span>ABOUT MORE</span>
                </Button>
            </div>
        </section>
    );
}
