"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { fetchDiamondById } from "@/services/diamondService";
import {
    Diamond,
    PublicDiamond,
    calculateTotalPrice,
} from "@/interface/diamondInterface";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Diamond as DiamondIcon,
    Scale,
    Palette,
    Eye,
    Loader2,
    Clock,
    MessageSquare,
    GemIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { addToCart, holdDiamond } from "@/services/cartService";
import { createDiamondInquiry } from "@/services/inquiryService";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { Link, useRouter } from "@/i18n/navigation";
import SimilarDiamonds from "./SimilarDiamonds";
import { AdminHoldDialog } from "@/components/admin-hold-dialog";
import { useAuth } from "@/context/AuthContext";
import { DiamondImage } from "../shared/DiamondMedia";
import {
    type DiamondValueMessages,
    fillDiamondTemplate,
    getDiamondTemplateValues,
    getLocalizedShapeName,
} from "@/lib/i18n/diamondDetail";

interface DiamondDetailViewProps {
    diamondId: string;
    isPublic?: boolean;
    /** Server-fetched public diamond, used to render instantly + for SEO. */
    initialDiamond?: Diamond | PublicDiamond;
    /** Server-fetched similar stock refs. */
    initialSimilarIds?: string[];
    /** Server-rendered SEO content shown above the Similar Diamonds section. */
    seoContent?: React.ReactNode;
}

export default function DiamondDetailView({
    diamondId,
    isPublic: isPublicProp,
    initialDiamond,
    initialSimilarIds,
    seoContent,
}: DiamondDetailViewProps) {
    const t = useTranslations("diamondDetail");
    const locale = useLocale();
    const router = useRouter();
    const valueMessages = t.raw("values") as DiamondValueMessages;
    const mediaLabels = {
        videoTitle: t("media.videoTitle"),
        noVideo: t("media.noVideo"),
        previousImage: t("media.previousImage"),
        nextImage: t("media.nextImage"),
        goToImage: t("media.goToImage"),
        noImage: t("media.noImage"),
        imageAlt: t("media.imageAlt"),
        diamondAlt: t("media.diamondAlt"),
    };
    const [diamond, setDiamond] = useState<Diamond | PublicDiamond | null>(
        initialDiamond ?? null,
    );
    const [similarDiamondIds, setSimilarDiamondIds] = useState<string[]>(
        initialSimilarIds ?? [],
    );
    const [loading, setLoading] = useState(!initialDiamond);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<
        "IMAGE" | "VIDEO" | "CERTIFICATE"
    >("IMAGE");
    const [holdLoading, setHoldLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const [showHoldDialog, setShowHoldDialog] = useState(false);
    const [showAdminHoldDialog, setShowAdminHoldDialog] = useState(false);
    const { user, isAuthenticated } = useAuth(); // Get current user for role check

    // When no explicit prop is given, public/auth status is derived from the
    // logged-in state (the SEO route renders this without a prop).
    const isPublic = isPublicProp ?? !isAuthenticated;

    // Check if user is admin or superadmin
    const isAdminOrSuperAdmin =
        user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

    // Inquiry states
    const [showInquiryDialog, setShowInquiryDialog] = useState(false);
    const [inquiryText, setInquiryText] = useState("");
    const [inquiryLoading, setInquiryLoading] = useState(false);

    // Type guard to check if diamond is Diamond (not PublicDiamond)
    const isDiamond = (d: Diamond | PublicDiamond): d is Diamond => {
        return "_id" in d;
    };

    useEffect(() => {
        // The server already supplied public data for SEO/instant render.
        // Only re-fetch for authenticated visitors (to load full priced data)
        // or when no initial data was provided.
        if (initialDiamond && !isAuthenticated) return;

        const loadDiamond = async () => {
            if (diamondId) {
                try {
                    setLoading(true);
                    const id = decodeURIComponent(diamondId as string);
                    const response = await fetchDiamondById(id, isPublic);
                    setDiamond(response.diamond);
                    setSimilarDiamondIds(response.similarDiamonds || []);
                } catch (err) {
                    setError(
                        t("ui.loadError"),
                    );
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadDiamond();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diamondId, isAuthenticated]);

    const handleHoldDiamondConfirm = async () => {
        if (!diamond?.stockRef) {
            toast.error(t("ui.stockReferenceUnavailable"));
            return;
        }

        try {
            setHoldLoading(true);
            const response = await holdDiamond([diamond.stockRef]);
            toast.success(response.message || t("ui.heldSuccessfully"));
            setShowHoldDialog(false);
        } catch (error: unknown) {
            toast.error(
                error instanceof Error ? error.message : t("ui.holdFailed"),
            );
        } finally {
            setHoldLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isDiamond(diamond!)) {
            toast.error(t("ui.loginToAddCart"));
            router.push("/login");
            return;
        }

        if (!diamond._id) {
            toast.error(t("ui.diamondIdUnavailable"));
            return;
        }

        try {
            setCartLoading(true);
            const response = await addToCart([diamond._id]);
            toast.success(response.message);
        } catch (error: unknown) {
            toast.error(
                error instanceof Error ? error.message : t("ui.addCartFailed"),
            );
        } finally {
            setCartLoading(false);
        }
    };

    const handleSubmitInquiry = async () => {
        if (!diamond?.stockRef) {
            toast.error(t("ui.stockReferenceUnavailable"));
            return;
        }

        if (!inquiryText.trim()) {
            toast.error(t("ui.enterInquiry"));
            return;
        }

        try {
            setInquiryLoading(true);
            const response = await createDiamondInquiry({
                stockRef: diamond.stockRef,
                query: inquiryText,
            });
            toast.success(response.message || t("ui.inquirySubmitted"));
            setShowInquiryDialog(false);
            setInquiryText("");
        } catch (error: unknown) {
            toast.error(
                error instanceof Error ? error.message : t("ui.inquiryFailed"),
            );
        } finally {
            setInquiryLoading(false);
        }
    };

    const getCertificateLink = (lab: string, certNo: string | undefined) => {
        if (!certNo) return null;

        const labUpper = lab.toUpperCase();

        switch (labUpper) {
            case "GIA":
                return `https://www.gia.edu/report-check?reportno=${certNo}`;
            case "IGI":
                return `https://www.igi.org/verify-your-report/?r=${certNo}`;
            case "HRD":
                return `https://my.hrdantwerp.com/Download/GetGradingReportPdf/?reportNumber=${certNo}`;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-pulse flex flex-col items-center">
                    <DiamondIcon className="h-12 w-12 text-[#49214c] animate-bounce" />
                    <p className="mt-4 text-gray-600">
                        {t("ui.loadingDetails")}
                    </p>
                </div>
            </div>
        );
    }

    if (error || !diamond) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <p className="text-red-500 text-lg">
                    {error || t("ui.notFound")}
                </p>
                <Button onClick={() => router.back()} variant="outline">
                    {t("ui.goBack")}
                </Button>
            </div>
        );
    }

    const shapeName = getLocalizedShapeName(diamond, valueMessages);
    const templateValues = getDiamondTemplateValues(diamond, valueMessages);
    const templateUi = (copy: string) =>
        fillDiamondTemplate(copy, templateValues);
    const tabs = [
        { id: "IMAGE", label: t("ui.image") },
        { id: "VIDEO", label: t("ui.video") },
        { id: "CERTIFICATE", label: t("ui.certificate") },
    ] as const;

    // Helper for the 3-column tables
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
                            {row.value || "-"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Helper for the full-width bottom rows
    const FullWidthRow = ({
        label,
        value,
    }: {
        label: string;
        value: string | undefined;
    }) => (
        <div className="flex border font-lato border-[#e7d7b4] border-t-0 first:border-t text-sm">
            <div className="w-[200px] min-w-[150px] px-4 py-1 font-semibold text-gray-800 border-r border-[#e7d7b4]">
                {label}
            </div>
            <div className="flex-1 px-4 py-1 text-gray-700">{value || "-"}</div>
        </div>
    );

    // Helper for Info Cards
    const InfoCard = ({
        icon: Icon,
        title,
        subtitle,
        desc,
    }: {
        icon: LucideIcon;
        title: string;
        subtitle: string;
        desc: string;
    }) => (
        <div className="border border-[#e7d7b4] rounded-lg p-4 flex flex-col gap-1 relative">
            <Icon className="w-5 h-5 text-gray-900 mb-1" />
            <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">{desc}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans pb-20 pt-5">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Top Navigation & Tabs */}
                <div className="flex flex-col md:flex-row md:items-center justify-start mb-6 gap-4">
                    <Button
                        className="gold-reveal-btn font-cormorantGaramond uppercase shadow-lg"
                        onClick={() => router.back()}
                    >
                        <span className="flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t("ui.back")}
                        </span>
                    </Button>
                    <div className="flex gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 text-sm font-medium border transition-colors uppercase shadow-lg ${
                                    activeTab === tab.id
                                        ? "bg-primary-yellow-2 border-0 text-gray-900"
                                        : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    {/* Left Column: Media Viewer */}
                    <div className="lg:col-span-5">
                        <div className="aspect-square rounded-lg relative flex items-center justify-center border border-gray-100 group">
                            {activeTab === "IMAGE" &&
                                (diamond ? (
                                    <DiamondImage
                                        diamond={diamond}
                                        showCarousel
                                        labels={mediaLabels}
                                    />
                                ) : (
                                    <DiamondIcon className="w-48 h-48 text-gray-200" />
                                ))}
                            {activeTab === "VIDEO" &&
                                (diamond ? (
                                    <DiamondImage
                                        diamond={diamond}
                                        showVideo
                                        labels={mediaLabels}
                                    />
                                ) : (
                                    <div className="text-gray-400">
                                        {t("ui.noVideoAvailable")}
                                    </div>
                                ))}
                            {activeTab === "CERTIFICATE" && (
                                <div className="text-gray-400">
                                    {t("ui.certificateView")}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Basic Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="border-b border-primary-yellow-2 pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-900 font-lato text-2xl mb-1">
                                        {shapeName} {diamond.weight}ct{" "}
                                        {diamond.color} {diamond.clarity}{" "}
                                        {isDiamond(diamond)
                                            ? templateValues.cut
                                            : ""}{" "}
                                        {isDiamond(diamond)
                                            ? templateValues.polish
                                            : ""}
                                    </p>
                                    <h1 className="text-md font-cormorantGaramond font-medium text-gray-900 mb-2 flex items-center gap-2">
                                        {t("ui.stockId")}:{" "}
                                        <span className="font-bold">
                                            {diamond.stockRef}
                                        </span>
                                    </h1>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        {isDiamond(diamond) ? (
                                            <>
                                                <span>
                                                    {t("ui.reportNumber")}:
                                                </span>
                                                {getCertificateLink(
                                                    diamond.lab,
                                                    diamond.certiNo,
                                                ) ? (
                                                    <a
                                                        href={
                                                            getCertificateLink(
                                                                diamond.lab,
                                                                diamond.certiNo,
                                                            )!
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:text-primary-yellow-3 underline font-semibold transition-colors"
                                                    >
                                                        {diamond.certiNo}
                                                    </a>
                                                ) : (
                                                    <span className="font-semibold">
                                                        {diamond.certiNo}
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <span>
                                                {t("ui.reportNumber")}: -
                                            </span>
                                        )}
                                        <span>•</span>
                                        <span>
                                            {t("ui.lab")}: {diamond.lab}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Login Required Banner for Public Users */}
                            {isPublic && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-yellow-800">
                                        <span className="font-semibold">
                                            {t("ui.loginRequired")}
                                        </span>{" "}
                                        {t("ui.please")}{" "}
                                        <Link
                                            href="/login"
                                            className="underline hover:text-yellow-900"
                                        >
                                            {t("ui.login")}
                                        </Link>{" "}
                                        {t("ui.toViewPricing")}
                                    </p>
                                </div>
                            )}

                            {/* Show price only for authenticated users */}
                            {isDiamond(diamond) && (
                                <div className="flex items-baseline gap-3 mt-4">
                                    <span className="text-3xl font-bold text-gray-900">
                                        $
                                        {calculateTotalPrice(
                                            diamond.weight,
                                            diamond.pricePerCts,
                                        )?.toLocaleString(locale) ||
                                            t("ui.notAvailable")}{" "}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 text-lg">
                                {t("ui.diamondSpecifications")}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <InfoCard
                                    icon={GemIcon}
                                    title={t("ui.shape")}
                                    subtitle={shapeName}
                                    desc=""
                                />
                                <InfoCard
                                    icon={Scale}
                                    title={t("ui.carat")}
                                    subtitle={`${diamond.weight} ct`}
                                    desc=""
                                />
                                <InfoCard
                                    icon={Palette}
                                    title={t("ui.color")}
                                    subtitle={diamond.color}
                                    desc=""
                                />
                                <InfoCard
                                    icon={Eye}
                                    title={t("ui.clarity")}
                                    subtitle={diamond.clarity}
                                    desc=""
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {/* Inquiry Dialog - Available for everyone */}
                            {!isPublic && isDiamond(diamond) && (
                                <Dialog
                                    open={showInquiryDialog}
                                    onOpenChange={setShowInquiryDialog}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50">
                                            <span className="flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4" />
                                                {t("ui.enquiry")}
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                {t("ui.diamondInquiry")}
                                            </DialogTitle>
                                            <DialogDescription>
                                                {templateUi(
                                                    t("ui.inquiryDescription"),
                                                )}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Textarea
                                                placeholder={t(
                                                    "ui.inquiryPlaceholder",
                                                )}
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
                                                {t("ui.cancel")}
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
                                                        {t("ui.sending")}
                                                    </>
                                                ) : (
                                                    t("ui.sendEnquiry")
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                            {/* Admin Hold Button - Only for ADMIN and SUPER_ADMIN */}
                            {!isPublic &&
                                isDiamond(diamond) &&
                                isAdminOrSuperAdmin && (
                                    <>
                                        <Button
                                            className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond"
                                            onClick={() =>
                                                setShowAdminHoldDialog(true)
                                            }
                                        >
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {t("ui.holdForUser")}
                                            </span>
                                        </Button>
                                        <AdminHoldDialog
                                            open={showAdminHoldDialog}
                                            onOpenChange={
                                                setShowAdminHoldDialog
                                            }
                                            stockRef={diamond.stockRef}
                                        />
                                    </>
                                )}

                            {/* Regular Hold Diamond - Only for regular users */}
                            {!isPublic && isDiamond(diamond) && (
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
                                                    t("ui.holdDiamond")
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
                                                {t("ui.holdQuestion")}
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                {t("ui.holdDescription")}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                disabled={holdLoading}
                                            >
                                                {t("ui.cancel")}
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
                                                        {t("ui.holding")}
                                                    </>
                                                ) : (
                                                    t("ui.holdDiamond")
                                                )}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}

                            {/* Add to Cart - Only for authenticated users */}
                            {!isPublic && isDiamond(diamond) && (
                                <Button
                                    className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond disabled:opacity-50"
                                    onClick={handleAddToCart}
                                    disabled={cartLoading}
                                >
                                    <span className="flex items-center gap-2">
                                        {cartLoading && (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        )}
                                        {t("ui.addToCart")}
                                    </span>
                                </Button>
                            )}

                            {/* Login prompt for public users */}
                            {isPublic && (
                                <Button
                                    className="flex-1 h-12 text-white font-semibold uppercase border-none gold-reveal-btn font-cormorantGaramond"
                                    onClick={() => router.push("/login")}
                                >
                                    <span>{t("ui.loginToPurchase")}</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Detailed Tables - Show limited info for public */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                    <TableSection
                        title={t("ui.details")}
                        rows={[
                            {
                                label: t("ui.stockRef"),
                                value: diamond.stockRef,
                            },
                            { label: t("ui.lab"), value: diamond.lab },
                            { label: t("ui.shape"), value: shapeName },
                            { label: t("ui.carat"), value: diamond.weight },
                            { label: t("ui.color"), value: diamond.color },
                            { label: t("ui.clarity"), value: diamond.clarity },
                            { label: t("ui.shade"), value: diamond.shade },
                            {
                                label: t("ui.cut"),
                                value: diamond.cutGrade
                                    ? templateValues.cut
                                    : undefined,
                            },
                            {
                                label: t("ui.polish"),
                                value: diamond.polish
                                    ? templateValues.polish
                                    : undefined,
                            },
                            {
                                label: t("ui.symmetry"),
                                value: diamond.symmetry
                                    ? templateValues.symmetry
                                    : undefined,
                            },
                            {
                                label: t("ui.fluorescence"),
                                value: templateValues.fluorescence,
                            },
                            {
                                label: t("ui.fluorColor"),
                                value: diamond.fluorescenceColor,
                            },
                        ]}
                    />
                    <TableSection
                        title={t("ui.measurements")}
                        rows={[
                            {
                                label: t("ui.measurement"),
                                value: diamond.measurements,
                            },
                            {
                                label: t("ui.tablePercent"),
                                value: diamond.tablePerc?.toFixed(2),
                            },
                            {
                                label: t("ui.depthPercent"),
                                value: diamond.depthPerc?.toFixed(2),
                            },
                            { label: t("ui.length"), value: diamond.length },
                            { label: t("ui.width"), value: diamond.width },
                            { label: t("ui.height"), value: diamond.height },
                            {
                                label: t("ui.ratio"),
                                value:
                                    diamond.length && diamond.width
                                        ? (
                                              diamond.length / diamond.width
                                          ).toFixed(2)
                                        : "-",
                            },
                            {
                                label: t("ui.crownAngle"),
                                value: diamond.crownAngle?.toFixed(2),
                            },
                            {
                                label: t("ui.crownHeight"),
                                value: diamond.crownHeight?.toFixed(2),
                            },
                            {
                                label: t("ui.pavilionAngle"),
                                value: diamond.pavalionAngle?.toFixed(2),
                            },
                            {
                                label: t("ui.pavilionHeight"),
                                value: diamond.pavalionDepth?.toFixed(2),
                            },
                            { label: t("ui.girdle"), value: diamond.girdle },
                            { label: t("ui.culet"), value: diamond.culetSize },
                        ]}
                    />
                    <TableSection
                        title={t("ui.additionalInfo")}
                        rows={[
                            {
                                label: t("ui.laserInscription"),
                                value: diamond.laserInscription,
                            },
                            {
                                label: t("ui.certificateIssueDate"),
                                value: diamond.certIssueDate
                                    ? new Date(
                                          diamond.certIssueDate,
                                      ).toLocaleDateString(locale)
                                    : "-",
                            },
                            { label: t("ui.origin"), value: diamond.origin },
                            { label: t("ui.country"), value: diamond.country },
                            { label: t("ui.milky"), value: diamond.milky },
                            {
                                label: t("ui.blackInclusion"),
                                value: diamond.blackinclusion,
                            },
                            {
                                label: t("ui.eyeClean"),
                                value: diamond.eyeClean,
                            },
                            {
                                label: t("ui.keyToSymbols"),
                                value: diamond.keyToSymbols?.length
                                    ? t("ui.yes")
                                    : t("ui.no"),
                            },
                        ]}
                    />
                </div>

                {/* Full Width Rows - Only show for authenticated users */}
                {isDiamond(diamond) && (
                    <div className="border border-[#e7d7b4] rounded-sm overflow-hidden mb-12">
                        <FullWidthRow
                            label={t("ui.keyToSymbols")}
                            value={diamond.keyToSymbols?.join(", ")}
                        />
                        <FullWidthRow
                            label={t("ui.reportComments")}
                            value={diamond.certComment}
                        />
                        <FullWidthRow
                            label={t("ui.hrcComments")}
                            value={diamond.memberComment}
                        />
                    </div>
                )}

                {/* SEO content (server-rendered) sits above similar diamonds */}
                {seoContent}

                {/* Similar Diamonds Section */}
                {similarDiamondIds.length > 0 && (
                    <SimilarDiamonds
                        similarDiamondIds={similarDiamondIds}
                        isPublic={isPublic}
                    />
                )}
            </div>
        </div>
    );
}
