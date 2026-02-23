import { Diamond, PublicDiamond } from "@/interface/diamondInterface";
import { Gem, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"; // Added Loader2
import Image from "next/image";
import { useState, useEffect } from "react";

export const DiamondImage = ({
    diamond,
    showdefault,
    showVideo = false,
    showCarousel = false,
}: {
    diamond?: Diamond | PublicDiamond;
    showdefault?: boolean;
    showVideo?: boolean;
    showCarousel?: boolean;
}) => {
    const [error, setError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    const imageUrls = diamond?.imageUrls;
    const hasImages = imageUrls && imageUrls.length > 0;
    const hasMultipleImages = imageUrls && imageUrls.length > 1;
    const videoUrl = diamond?.videoUrls?.[0];
    const webLink = diamond?.webLink;

    // Reset loading state when carousel image changes
    useEffect(() => {
        setIsLoading(true);
    }, [carouselIndex]);

    // Reusable loading spinner overlay
    const LoadingOverlay = () =>
        isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent z-20">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        ) : null;

    // 1. Show video in iframe if showVideo is true and videoUrl exists
    if (showVideo && videoUrl && !videoError) {
        return (
            <div className="relative w-full h-full">
                <LoadingOverlay />
                <iframe
                    src={videoUrl}
                    title="Diamond Video"
                    className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                    allowFullScreen
                    loading="lazy" // Improves initial page load performance
                    onLoad={() => setIsLoading(false)} // Fires when iframe is ready
                    onError={() => {
                        setVideoError(true);
                        setIsLoading(false);
                    }}
                />
            </div>
        );
    }

    // 2. Show carousel if showCarousel is true and multiple images exist
    if (showCarousel && hasMultipleImages) {
        return (
            <div className="relative w-full h-full flex items-center justify-center">
                <LoadingOverlay />
                <Image
                    src={imageUrls[carouselIndex]}
                    alt={`diamond ${carouselIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw" // Helps Next.js optimize image size
                    className={`max-h-full max-w-full object-contain mix-blend-multiply p-4 transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                    onLoad={() => setIsLoading(false)} // Fires when image is ready
                    onError={() => {
                        setError(true);
                        setIsLoading(false);
                    }}
                />

                {/* Previous Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setCarouselIndex((prev) =>
                            prev === 0 ? imageUrls.length - 1 : prev - 1,
                        );
                    }}
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/80 shadow border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>

                {/* Next Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setCarouselIndex((prev) =>
                            prev === imageUrls.length - 1 ? 0 : prev + 1,
                        );
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/80 shadow border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                    {imageUrls.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCarouselIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                idx === carouselIndex
                                    ? "bg-gray-800"
                                    : "bg-gray-300"
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // 3. Show single image: prefer imageUrls[0], fallback to webLink
    const src = hasImages ? imageUrls[0] : webLink;

    if (!src || error) {
        if (showdefault) {
            return (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Gem className="text-gray-500 w-6" strokeWidth={1.5} />
                </div>
            );
        }
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-sm font-medium">No Image</span>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <LoadingOverlay />
            <Image
                src={src}
                alt="diamond"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`max-h-full max-w-full object-contain mix-blend-multiply p-4 transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setError(true);
                    setIsLoading(false);
                }}
            />
        </div>
    );
};
