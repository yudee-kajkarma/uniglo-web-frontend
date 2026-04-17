"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Diamond as DiamondIcon,
    Scale,
    Palette,
    Eye,
    GemIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchMelleDiamondById } from "@/services/melleDiamondService";
import { MelleDiamond } from "@/interface/melleDiamondInterface";

interface MelleDiamondDetailViewProps {
    diamondId: string;
    isPublic?: boolean;
}

const formatRange = (min?: string, max?: string) => {
    const lo = min?.trim();
    const hi = max?.trim();
    if (!lo && !hi) return "-";
    if (lo && hi && lo !== hi) return `${lo} – ${hi}`;
    return lo || hi || "-";
};

export default function MelleDiamondDetailView({
    diamondId,
    isPublic = false,
}: MelleDiamondDetailViewProps) {
    const router = useRouter();
    const [diamond, setDiamond] = useState<MelleDiamond | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const id = decodeURIComponent(diamondId);
                const data = await fetchMelleDiamondById(id);
                if (cancelled) return;
                setDiamond(data);
            } catch (err) {
                if (cancelled) return;
                setError("Failed to load melee diamond details.");
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [diamondId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-pulse flex flex-col items-center">
                    <DiamondIcon className="h-12 w-12 text-[#49214c] animate-bounce" />
                    <p className="mt-4 text-gray-600">
                        Loading Melee Diamond Details...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !diamond) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <p className="text-red-500 text-lg">
                    {error || "Melee diamond not found"}
                </p>
                <Button onClick={() => router.back()} variant="outline">
                    Go Back
                </Button>
            </div>
        );
    }

    const TableSection = ({
        title,
        rows,
    }: {
        title: string;
        rows: { label: string; value: string | number | undefined }[];
    }) => (
        <div className="border font-lato border-[#e7d7b4] rounded-sm overflow-hidden h-fit">
            <div className="bg-[#26062b] text-white px-4 py-2 font-medium text-sm uppercase tracking-wide">
                {title}
            </div>
            <div className="bg-white">
                {rows.map((row, idx) => (
                    <div
                        key={idx}
                        className="flex border-b border-[#e7d7b4] last:border-0 text-sm"
                    >
                        <div className="w-1/2 px-4 py-1 font-semibold text-gray-800 border-r border-[#e7d7b4]">
                            {row.label}
                        </div>
                        <div className="w-1/2 px-4 py-1 text-gray-700">
                            {row.value === undefined ||
                            row.value === null ||
                            row.value === ""
                                ? "-"
                                : row.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const InfoCard = ({
        icon: Icon,
        title,
        subtitle,
    }: {
        icon: any;
        title: string;
        subtitle: string;
    }) => (
        <div className="border border-[#e7d7b4] rounded-lg p-4 flex flex-col gap-1 relative">
            <Icon className="w-5 h-5 text-gray-900 mb-1" />
            <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans pb-20 pt-5">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-start mb-6 gap-4">
                    <Button
                        className="gold-reveal-btn font-cormorantGaramond uppercase shadow-lg"
                        onClick={() => router.back()}
                    >
                        <span className="flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    <div className="lg:col-span-5">
                        <div className="aspect-square rounded-lg relative flex items-center justify-center border border-gray-100 bg-gray-50">
                            <DiamondIcon className="w-40 h-40 text-gray-200" />
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-8">
                        <div className="border-b border-primary-yellow-2 pb-4">
                            <p className="text-gray-900 font-lato text-2xl mb-1">
                                {diamond.shape} {diamond.color} {diamond.clarity}{" "}
                                {diamond.cut}
                            </p>
                            <h1 className="text-md font-cormorantGaramond font-medium text-gray-900 mb-2 flex items-center gap-2">
                                Stock ID:{" "}
                                <span className="font-bold">
                                    {diamond.stockId}
                                </span>
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>Category: {diamond.melleCategory}</span>
                                <span>•</span>
                                <span>
                                    Type: {diamond.isLab ? "Lab" : "Natural"}
                                </span>
                            </div>

                            {isPublic && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-yellow-800">
                                        <span className="font-semibold">
                                            Login required:
                                        </span>{" "}
                                        Please{" "}
                                        <Link
                                            href="/login"
                                            className="underline hover:text-yellow-900"
                                        >
                                            login
                                        </Link>{" "}
                                        to view pricing information.
                                    </p>
                                </div>
                            )}

                            {!isPublic && diamond.price !== undefined && (
                                <div className="flex items-baseline gap-3 mt-4">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${diamond.price.toLocaleString()} USD
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">
                                Melee Specifications
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <InfoCard
                                    icon={GemIcon}
                                    title="Shape"
                                    subtitle={diamond.shape}
                                />
                                <InfoCard
                                    icon={Scale}
                                    title="Carat"
                                    subtitle={`${diamond.carat?.toFixed(5) ?? "-"} ct`}
                                />
                                <InfoCard
                                    icon={Palette}
                                    title="Color"
                                    subtitle={diamond.color}
                                />
                                <InfoCard
                                    icon={Eye}
                                    title="Clarity"
                                    subtitle={diamond.clarity}
                                />
                            </div>
                        </div>

                        {isPublic && (
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond"
                                    onClick={() => router.push("/login")}
                                >
                                    <span>Login to Purchase</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                    <TableSection
                        title="Details"
                        rows={[
                            { label: "Stock ID", value: diamond.stockId },
                            { label: "Shape", value: diamond.shape },
                            { label: "Color", value: diamond.color },
                            { label: "Clarity", value: diamond.clarity },
                            { label: "Cut", value: diamond.cut },
                            {
                                label: "Category",
                                value: diamond.melleCategory,
                            },
                            {
                                label: "Type",
                                value: diamond.isLab ? "Lab" : "Natural",
                            },
                            {
                                label: "Avg Ptr",
                                value: diamond.avgPtr?.toFixed(3),
                            },
                            {
                                label: "Carat",
                                value: diamond.carat?.toFixed(5),
                            },
                        ]}
                    />
                    <TableSection
                        title="Measurements"
                        rows={[
                            {
                                label: "Sieve",
                                value: formatRange(
                                    diamond.sieveMin,
                                    diamond.sieveMax,
                                ),
                            },
                            {
                                label: "Measurement (mm)",
                                value: formatRange(
                                    diamond.measurementMin,
                                    diamond.measurementMax,
                                ),
                            },
                            {
                                label: "Added",
                                value: diamond.createdAt
                                    ? new Date(
                                          diamond.createdAt,
                                      ).toLocaleDateString()
                                    : "-",
                            },
                            {
                                label: "Updated",
                                value: diamond.updatedAt
                                    ? new Date(
                                          diamond.updatedAt,
                                      ).toLocaleDateString()
                                    : "-",
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
