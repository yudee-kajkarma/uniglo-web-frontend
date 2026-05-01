import React from "react";
import { Button } from "@/components/ui/button";
import { Diamond as DiamondIcon, Heart } from "lucide-react";
import {
    MelleDiamond,
    PublicMelleDiamond,
} from "@/interface/melleDiamondInterface";

interface MelleDiamondGridProps {
    data: (MelleDiamond | PublicMelleDiamond)[];
    onViewDetails: (diamond: MelleDiamond | PublicMelleDiamond) => void;
}

const formatRange = (min?: string, max?: string) => {
    const lo = min?.trim();
    const hi = max?.trim();
    if (!lo && !hi) return "";
    if (lo && hi && lo !== hi) return `${lo} – ${hi}`;
    return lo || hi || "";
};

export default function MelleDiamondGrid({
    data,
    onViewDetails,
}: MelleDiamondGridProps) {
    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 w-full">
                <p className="text-lg font-medium">No melee diamonds found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="bg-brand-gradient grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 font-lato pb-2 w-full px-1">
            {data.map((item) => {
                const measurements = formatRange(
                    item.measurementMin,
                    item.measurementMax,
                );
                const sieve = formatRange(item.sieveMin, item.sieveMax);
                const hasPrice =
                    (item as MelleDiamond).price !== undefined &&
                    (item as MelleDiamond).price !== null;

                return (
                    <div
                        key={item._id}
                        className="bg-white rounded-md shadow-sm border border-gray-200 flex flex-col relative hover:shadow-lg transition-all duration-200 group overflow-hidden"
                    >
                        <div className="aspect-square w-full flex items-center justify-center bg-gray-50 rounded-t-md overflow-hidden relative">
                            <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors z-10 bg-white/80 rounded-full p-1.5 shadow-sm">
                                <Heart className="w-4 h-4" />
                            </button>
                            <DiamondIcon className="w-24 h-24 text-gray-200" />
                        </div>

                        <div className="px-3 pt-3 pb-2">
                            <h3 className="font-bold text-[11px] sm:text-xs text-gray-900 uppercase tracking-wide leading-tight">
                                {item.shape} {item.color} {item.clarity}{" "}
                                {item.cut}
                            </h3>
                        </div>

                        <div className="px-3 pb-2">
                            <p className="text-[10px] text-gray-500">
                                {item.stockId}
                                {" • "}
                                <span className="uppercase">
                                    {item.melleCategory}
                                </span>
                                {" • "}
                                <span>{item.isLab ? "Lab" : "Natural"}</span>
                            </p>
                        </div>

                        <div className="px-3 pb-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-gray-600">
                            {item.avgPtr !== undefined && (
                                <div className="flex items-center justify-start gap-2">
                                    <span className="font-medium">Ptr:</span>
                                    <span>{item.avgPtr.toFixed(3)}</span>
                                </div>
                            )}
                            {item.carat !== undefined && (
                                <div className="flex items-center justify-start gap-2">
                                    <span className="font-medium">Ct:</span>
                                    <span>{item.carat.toFixed(5)}</span>
                                </div>
                            )}
                            {sieve && (
                                <div className="flex items-center justify-start gap-2 col-span-2">
                                    <span className="font-medium">Sieve:</span>
                                    <span>{sieve}</span>
                                </div>
                            )}
                            {measurements && (
                                <div className="flex items-center justify-start gap-2 col-span-2">
                                    <span className="font-medium">mm:</span>
                                    <span>{measurements}</span>
                                </div>
                            )}
                        </div>

                        {!hasPrice && (
                            <div className="px-3 pb-3 text-[10px] text-gray-500">
                                <p>Login to view price</p>
                            </div>
                        )}
                        {hasPrice && (
                            <div className="px-3 pb-3 text-xs font-semibold text-gray-900">
                                $
                                {(
                                    item as MelleDiamond
                                ).price?.toLocaleString()}
                            </div>
                        )}

                        <div className="mt-auto px-3 pb-3">
                            <Button
                                onClick={() => onViewDetails(item)}
                                className="gold-reveal-btn text-white text-[10px] sm:text-xs px-4 h-9 uppercase tracking-wider w-full shadow-sm font-semibold"
                            >
                                <span>View Details</span>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
