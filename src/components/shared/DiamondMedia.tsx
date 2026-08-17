import { Diamond, PublicDiamond } from "@/interface/diamondInterface";
import { Gem, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";

export type DiamondMediaLabels = {
    videoTitle: string;
    noVideo: string;
    previousImage: string;
    nextImage: string;
    goToImage: string;
    noImage: string;
    imageAlt: string;
    diamondAlt: string;
};

const DEFAULT_LABELS: DiamondMediaLabels = {
    videoTitle: "Diamond Video",
    noVideo: "No Video",
    previousImage: "Previous image",
    nextImage: "Next image",
    goToImage: "Go to image [index]",
    noImage: "No Image",
    imageAlt: "Diamond image [index]",
    diamondAlt: "Diamond",
};

export const DiamondImage = ({
    diamond,
    showdefault,
    showVideo = false,
    showCarousel = false,
    showStill = true,
    labels = DEFAULT_LABELS,
}: {
    diamond?: Diamond | PublicDiamond;
    showdefault?: boolean;
    showVideo?: boolean;
    showCarousel?: boolean;
    showStill?: boolean;
    labels?: DiamondMediaLabels;
}) => {
    const [error, setError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [videoLinkError, setVideoLinkError] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Filter and sort the images
    const imageUrls = useMemo(() => {
        const rawImageUrls = diamond?.imageUrls || [];
        if (!rawImageUrls.length) return [];

        // 1. Filter out all URLs that contain "small"
        const filtered = rawImageUrls.filter((url) => !url.includes("small"));

        // 2. Find the index of the "still.jpg" image
        const stillIndex = filtered.findIndex((url) => url.includes("still"));

        // 3. If found and it's not already at the front, move it to index 0
        if (stillIndex > 0) {
            const [stillImage] = filtered.splice(stillIndex, 1);
            filtered.unshift(stillImage);
        }

        return filtered;
    }, [diamond?.imageUrls]);

    const hasImages = imageUrls.length > 0;
    const hasMultipleImages = imageUrls.length > 1;
    const videoUrl = diamond?.videoUrls?.[0];
    const videoLink = diamond?.videoLink;
    const webLink = diamond?.webLink;

    // Isolate the exact "still" image, avoiding "still_small"
    const stillImageUrl = imageUrls.find(
        (url) => url.includes("still") && !url.includes("small"),
    );

    const loadingOverlay = isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent z-20">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        ) : null;

    // 1. Show video in iframe if showVideo is true
    if (showVideo) {
        // Try videoUrl first, then fallback to videoLink
        const activeVideoSrc =
            videoUrl && !videoError
                ? videoUrl
                : videoLink && !videoLinkError
                  ? videoLink
                  : null;

        if (activeVideoSrc) {
            return (
                <div className="relative w-full h-full">
                    {loadingOverlay}
                    <iframe
                        src={activeVideoSrc}
                        title={labels.videoTitle}
                        className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                        allowFullScreen
                        loading="lazy"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            if (activeVideoSrc === videoUrl) {
                                setVideoError(true);
                            } else {
                                setVideoLinkError(true);
                            }
                            setIsLoading(true);
                        }}
                    />
                </div>
            );
        }

        // Both videoUrl and videoLink failed or not present
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-sm font-medium">{labels.noVideo}</span>
            </div>
        );
    }

    // 2. Show carousel if requested, multiple images exist, AND showStill is false
    if (showCarousel && hasMultipleImages && !showStill) {
        return (
            <div className="relative w-full h-full flex items-center justify-center">
                {loadingOverlay}
                <Image
                    src={imageUrls[carouselIndex]}
                    alt={labels.imageAlt.replace(
                        "[index]",
                        String(carouselIndex + 1),
                    )}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`max-h-full max-w-full object-contain mix-blend-multiply p-4 transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setError(true);
                        setIsLoading(false);
                    }}
                />

                {/* Previous Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLoading(true);
                        setCarouselIndex((prev) =>
                            prev === 0 ? imageUrls.length - 1 : prev - 1,
                        );
                    }}
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/80 shadow border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label={labels.previousImage}
                >
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>

                {/* Next Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLoading(true);
                        setCarouselIndex((prev) =>
                            prev === imageUrls.length - 1 ? 0 : prev + 1,
                        );
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/80 shadow border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label={labels.nextImage}
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
                                setIsLoading(true);
                                setCarouselIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                idx === carouselIndex
                                    ? "bg-gray-800"
                                    : "bg-gray-300"
                            }`}
                            aria-label={labels.goToImage.replace(
                                "[index]",
                                String(idx + 1),
                            )}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // 3. Show single image (Prioritize specific still image if prop is true, then default)
    const src =
        showStill && stillImageUrl
            ? stillImageUrl
            : hasImages
              ? imageUrls[0]
              : webLink;

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
                <span className="text-sm font-medium">{labels.noImage}</span>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {loadingOverlay}
            <Image
                src={src}
                alt={labels.diamondAlt}
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
