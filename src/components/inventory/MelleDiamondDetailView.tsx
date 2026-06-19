"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Diamond as DiamondIcon,
    Scale,
    Palette,
    Eye,
    GemIcon,
    Clock,
    Loader2,
    MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AdminHoldDialog } from "@/components/admin-hold-dialog";
import { useAuth } from "@/context/AuthContext";
import { fetchMelleDiamondById } from "@/services/melleDiamondService";
import { addMelleToCart, holdDiamond } from "@/services/cartService";
import { MelleCartCaratDialog } from "@/components/dialogs/MelleCartCaratDialog";
import { createDiamondInquiry } from "@/services/inquiryService";
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

const formatMeasurementDisplay = (diamond: MelleDiamond) => {
    const len = diamond.measurementLength?.trim();
    const breadth = diamond.measurementBreadth?.trim();
    if (len || breadth) {
        if (len && breadth) return `${len} × ${breadth}`;
        return len || breadth || "-";
    }
    return formatRange(diamond.measurementMin, diamond.measurementMax);
};

export default function MelleDiamondDetailView({
    diamondId,
    isPublic = false,
}: MelleDiamondDetailViewProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [diamond, setDiamond] = useState<MelleDiamond | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [holdLoading, setHoldLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const [cartCaratDialogOpen, setCartCaratDialogOpen] = useState(false);
    const [showHoldDialog, setShowHoldDialog] = useState(false);
    const [showAdminHoldDialog, setShowAdminHoldDialog] = useState(false);

    const [showInquiryDialog, setShowInquiryDialog] = useState(false);
    const [inquiryText, setInquiryText] = useState("");
    const [inquiryLoading, setInquiryLoading] = useState(false);

    const isAdminOrSuperAdmin =
        user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const id = decodeURIComponent(diamondId);
                const data = await fetchMelleDiamondById(id, isPublic);
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
    }, [diamondId, isPublic]);

    const handleHoldDiamondConfirm = async () => {
        if (!diamond?.stockId) {
            toast.error("Stock ID not available");
            return;
        }
        try {
            setHoldLoading(true);
            const response = await holdDiamond([diamond.stockId]);
            toast.success(response.message || "Diamond held successfully");
            setShowHoldDialog(false);
        } catch (err: any) {
            toast.error(err || "Failed to hold diamond");
        } finally {
            setHoldLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!diamond?._id) {
            toast.error("Diamond ID not available");
            return;
        }
        setCartCaratDialogOpen(true);
    };

    const handleCartCaratConfirm = async (
        items: { melleId: string; requestedCarat: number }[],
    ) => {
        try {
            setCartLoading(true);
            const response = await addMelleToCart(items);
            toast.success(response.message);
        } finally {
            setCartLoading(false);
        }
    };

    const handleSubmitInquiry = async () => {
        if (!diamond?.stockId) {
            toast.error("Stock ID not available");
            return;
        }
        if (!inquiryText.trim()) {
            toast.error("Please enter your inquiry");
            return;
        }
        try {
            setInquiryLoading(true);
            const response = await createDiamondInquiry({
                stockRef: diamond.stockId,
                query: inquiryText,
            });
            toast.success(response.message || "Inquiry submitted successfully");
            setShowInquiryDialog(false);
            setInquiryText("");
        } catch (err: any) {
            toast.error(err || "Failed to submit inquiry");
        } finally {
            setInquiryLoading(false);
        }
    };

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
        <>
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
                        <div className="aspect-square rounded-lg relative flex items-center justify-center border border-gray-100 bg-gray-50 overflow-hidden">
                            {diamond.images?.[0] ? (
                                <Image
                                    src={diamond.images[0]}
                                    alt={`${diamond.shape} ${diamond.stockId}`}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            ) : (
                                <DiamondIcon className="w-40 h-40 text-gray-200" />
                            )}
                        </div>
                        {diamond.images && diamond.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2 mt-3">
                                {diamond.images.slice(1).map((url, idx) => (
                                    <div
                                        key={`${url}-${idx}`}
                                        className="relative aspect-square rounded border border-gray-200 overflow-hidden"
                                    >
                                        <Image
                                            src={url}
                                            alt={`${diamond.stockId} image ${idx + 2}`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-7 space-y-8">
                        <div className="border-b border-primary-yellow-2 pb-4">
                            <p className="text-gray-900 font-lato text-2xl mb-1">
                                {diamond.shape} {diamond.color}{" "}
                                {diamond.clarity} {diamond.cut}
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
                                    Type:{" "}
                                    {diamond.isLab
                                        ? diamond.labType
                                            ? `Lab (${diamond.labType})`
                                            : "Lab"
                                        : "Natural"}
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
                                    icon={Scale}
                                    title="Available Carat"
                                    subtitle={`${(diamond.availableCarat ?? 100).toFixed(2)} ct`}
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

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {!isPublic && (
                                <Dialog
                                    open={showInquiryDialog}
                                    onOpenChange={setShowInquiryDialog}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50">
                                            <span className="flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4" />
                                                Enquiry
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Melee Diamond Inquiry
                                            </DialogTitle>
                                            <DialogDescription>
                                                Submit your inquiry about this
                                                melee diamond. Stock ID:{" "}
                                                {diamond.stockId}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Textarea
                                                placeholder="Type your inquiry here... (e.g., Is this lot available for immediate purchase?)"
                                                value={inquiryText}
                                                onChange={(e) =>
                                                    setInquiryText(
                                                        e.target.value,
                                                    )
                                                }
                                                rows={6}
                                                className="resize-none"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowInquiryDialog(false);
                                                    setInquiryText("");
                                                }}
                                                disabled={inquiryLoading}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleSubmitInquiry}
                                                disabled={
                                                    inquiryLoading ||
                                                    !inquiryText.trim()
                                                }
                                                className="rounded-sm"
                                            >
                                                {inquiryLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    "Send Enquiry"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}

                            {!isPublic && isAdminOrSuperAdmin && (
                                <>
                                    <Button
                                        className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond"
                                        onClick={() =>
                                            setShowAdminHoldDialog(true)
                                        }
                                    >
                                        <span className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Hold for User
                                        </span>
                                    </Button>
                                    <AdminHoldDialog
                                        open={showAdminHoldDialog}
                                        onOpenChange={setShowAdminHoldDialog}
                                        stockRef={diamond.stockId}
                                    />
                                </>
                            )}

                            {!isPublic && (
                                <AlertDialog
                                    open={showHoldDialog}
                                    onOpenChange={setShowHoldDialog}
                                >
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50"
                                            disabled={holdLoading}
                                        >
                                            <span className="flex items-center gap-2">
                                                {holdLoading ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    "Hold Diamond"
                                                )}
                                            </span>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogMedia>
                                                <Clock className="text-primary-purple" />
                                            </AlertDialogMedia>
                                            <AlertDialogTitle>
                                                Hold this melee diamond?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will reserve the lot for
                                                you temporarily. You can view
                                                all your held diamonds in the
                                                enquiry section.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                disabled={holdLoading}
                                            >
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={
                                                    handleHoldDiamondConfirm
                                                }
                                                disabled={holdLoading}
                                                className="rounded-sm"
                                            >
                                                {holdLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        Holding...
                                                    </>
                                                ) : (
                                                    "Hold Diamond"
                                                )}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}

                            {!isPublic && (
                                <Button
                                    className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50"
                                    onClick={handleAddToCart}
                                    disabled={cartLoading}
                                >
                                    <span className="flex items-center gap-2">
                                        {cartLoading && (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        )}
                                        Add to Cart
                                    </span>
                                </Button>
                            )}

                            {isPublic && (
                                <Button
                                    className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond"
                                    onClick={() => router.push("/login")}
                                >
                                    <span>Login to Purchase</span>
                                </Button>
                            )}
                        </div>
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
                                value: diamond.isLab
                                    ? diamond.labType
                                        ? `Lab (${diamond.labType})`
                                        : "Lab"
                                    : "Natural",
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
                                value: formatMeasurementDisplay(diamond),
                            },
                            ...(diamond.measurementLength ||
                            diamond.measurementBreadth
                                ? [
                                      {
                                          label: "Length",
                                          value: diamond.measurementLength,
                                      },
                                      {
                                          label: "Breadth",
                                          value: diamond.measurementBreadth,
                                      },
                                  ]
                                : []),
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
        {diamond && (
            <MelleCartCaratDialog
                open={cartCaratDialogOpen}
                onOpenChange={setCartCaratDialogOpen}
                diamonds={[diamond]}
                onConfirm={handleCartCaratConfirm}
            />
        )}
        </>
    );
}
