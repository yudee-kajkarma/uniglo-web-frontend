"use client";

import React, { useEffect, useState } from "react";
import {
    getCart,
    removeFromCart,
    clearCart,
    holdDiamond,
    addCartItemMessage,
    updateCartItemMessage,
    deleteCartItemMessage,
    markCartItemMessagesDelivered,
} from "@/services/cartService";
import { calculateTotalPrice, CartItem, CartItemMessage } from "@/interface/diamondInterface";
import {
    getCartLineId,
    isDiamondCartItem,
    isMelleCartItem,
} from "@/lib/cartItems";
import { DiamondAvailabilityStatusBadge } from "@/components/columns/DiamondColumns";
import {
    canModifyCartMessage,
    getCartMessageCounts,
    formatCartMessageDateTime,
    getCartItemMessages,
    getCartMessageAuthorLabel,
} from "@/lib/cartItemMessages";
import {
    Trash2,
    Download,
    GitCompare,
    Loader2,
    AlertTriangle,
    Clock,
    MessageSquare,
    Send,
    Pencil,
} from "lucide-react";
import { exportDiamondsToExcel } from "@/lib/exportDiamonds";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { emitNotificationsRefresh } from "@/services/notificationService";
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

// Helper to calculate total price
// const calculateTotal = (weight: number, pricePerCts: number) => {
//     if (!weight || !pricePerCts) return "-";
//     return (weight * pricePerCts).toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//     });
// };

// Helper for currency formatting
const formatCurrency = (value: number) => {
    if (!value) return "-";
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export default function CartPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetThreadId = searchParams.get("thread");
    const autoOpenedThreadRef = React.useRef<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [removing, setRemoving] = useState(false);
    const [showClearDialog, setShowClearDialog] = useState(false);
    const [holdLoading, setHoldLoading] = useState(false);
    const [showHoldDialog, setShowHoldDialog] = useState(false);
    const [expandedDiamondId, setExpandedDiamondId] = useState<string | null>(
        null,
    );
    const [messageText, setMessageText] = useState("");
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [deletingMessageId, setDeletingMessageId] = useState<string | null>(
        null,
    );
    const [editingMessageId, setEditingMessageId] = useState<string | null>(
        null,
    );
    const [isUpdatingMessage, setIsUpdatingMessage] = useState(false);

    const getCartThreadId = getCartLineId;

    const updateCartItemInState = (updatedItem: CartItem) => {
        const updatedLineId = getCartLineId(updatedItem);

        setCartItems((previousItems) =>
            previousItems.map((item) => {
                if (getCartLineId(item) !== updatedLineId) {
                    return item;
                }

                if (isMelleCartItem(updatedItem) && isMelleCartItem(item)) {
                    return { ...item, ...updatedItem };
                }

                if (isDiamondCartItem(updatedItem) && isDiamondCartItem(item)) {
                    return {
                        ...item,
                        ...updatedItem,
                        diamond: updatedItem.diamond || item.diamond,
                    };
                }

                return updatedItem;
            }),
        );
    };

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await getCart();
            if (response.success) {
                setCartItems(response.data.cart?.items || []);
            }
        } catch (err: unknown) {
            setError(
                err instanceof Error ? err.message : "Failed to load cart",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (!targetThreadId) {
            autoOpenedThreadRef.current = null;
            return;
        }

        if (autoOpenedThreadRef.current === targetThreadId || cartItems.length === 0) {
            return;
        }

        const targetItem = cartItems.find(
            (item) => getCartThreadId(item) === targetThreadId,
        );

        if (!targetItem || expandedDiamondId === targetThreadId) {
            return;
        }

        autoOpenedThreadRef.current = targetThreadId;

        void (async () => {
            setExpandedDiamondId(targetThreadId);
            setMessageText("");
            setEditingMessageId(null);

            try {
                const response =
                    await markCartItemMessagesDelivered(targetThreadId);
                if (response.data?.item) {
                    updateCartItemInState(response.data.item);
                }
                emitNotificationsRefresh();
            } catch (error) {
                console.error("Failed to mark cart messages delivered:", error);
            } finally {
                document
                    .getElementById(`cart-thread-${targetThreadId}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                router.replace("/cart", { scroll: false });
            }
        })();
    }, [cartItems, expandedDiamondId, router, targetThreadId]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(cartItems.map((item) => getCartLineId(item)));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleRemoveSelected = async () => {
        if (selectedIds.length === 0) return;

        try {
            setRemoving(true);

            // Remove all selected items
            await Promise.all(selectedIds.map((id) => removeFromCart(id)));

            toast.success(`${selectedIds.length} item(s) removed from cart`);
            setSelectedIds([]);
            await fetchCart();
        } catch (err: unknown) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : "Failed to remove items from cart",
            );
        } finally {
            setRemoving(false);
        }
    };

    const handleClearCartConfirm = async () => {
        try {
            setRemoving(true);
            await clearCart();
            toast.success("Cart cleared successfully");
            setSelectedIds([]);
            await fetchCart();
            setShowClearDialog(false);
        } catch (err: unknown) {
            toast.error(
                err instanceof Error ? err.message : "Failed to clear cart",
            );
        } finally {
            setRemoving(false);
        }
    };

    const handleCompare = () => {
        if (selectedIds.length < 2) {
            toast.warning("Please select at least 2 diamonds to compare");
            return;
        }

        // Get selected diamonds and create query string
        const selectedDiamonds = cartItems.filter(
            (item): item is Extract<CartItem, { diamond: unknown }> =>
                isDiamondCartItem(item) &&
                selectedIds.includes(getCartLineId(item)),
        );
        const queryString = selectedDiamonds
            .map((item) => item.diamond.certiNo)
            .join(",");

        router.push(`/compare?ids=${queryString}`);
    };

    const handleHoldSelected = async () => {
        if (selectedIds.length === 0) return;

        const selectedStockRefs = cartItems
            .filter(
                (item): item is Extract<CartItem, { diamond: unknown }> =>
                    isDiamondCartItem(item) &&
                    selectedIds.includes(getCartLineId(item)),
            )
            .map((item) => item.diamond.stockRef);

        try {
            setHoldLoading(true);
            const response = await holdDiamond(selectedStockRefs);
            toast.success(
                response.message ||
                    `${selectedStockRefs.length} diamond(s) held successfully`,
            );
            setShowHoldDialog(false);
            setSelectedIds([]);
            await fetchCart();
        } catch (error: unknown) {
            toast.error(
                error instanceof Error ? error.message : "Failed to hold diamonds",
            );
        } finally {
            setHoldLoading(false);
        }
    };

    const handleToggleMessages = (diamondId: string) => {
        setExpandedDiamondId((current) =>
            current === diamondId ? null : diamondId,
        );
        setMessageText("");
        setEditingMessageId(null);
    };

    const handleToggleMessagesWithDelivery = async (item: CartItem) => {
        const threadId = getCartThreadId(item);
        const shouldExpand = expandedDiamondId !== threadId;
        handleToggleMessages(threadId);

        if (!shouldExpand) {
            return;
        }

        try {
            const response = await markCartItemMessagesDelivered(threadId);
            if (response.data?.item) {
                updateCartItemInState(response.data.item);
            }
            emitNotificationsRefresh();
        } catch (error) {
            console.error("Failed to mark cart messages delivered:", error);
        }
    };

    const handleSubmitMessage = async (item: CartItem) => {
        if (!messageText.trim()) {
            toast.error("Please enter a message");
            return;
        }

        if (editingMessageId) {
            try {
                setIsUpdatingMessage(true);
                const response = await updateCartItemMessage(
                    getCartLineId(item),
                    editingMessageId,
                    messageText,
                );
                toast.success("Message updated");
                setEditingMessageId(null);
                setMessageText("");
                if (response.data?.item) {
                    updateCartItemInState(response.data.item);
                }
                emitNotificationsRefresh();
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Failed to update message";
                toast.error(errorMessage);
            } finally {
                setIsUpdatingMessage(false);
            }
            return;
        }

        try {
            setIsSendingMessage(true);
            const response = await addCartItemMessage(
                getCartLineId(item),
                messageText,
            );
            toast.success("Message sent");
            setMessageText("");
            if (response.data?.item) {
                updateCartItemInState(response.data.item);
            }
            emitNotificationsRefresh();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to send message";
            toast.error(errorMessage);
        } finally {
            setIsSendingMessage(false);
        }
    };

    const handleDeleteMessage = async (
        item: CartItem,
        messageId: string,
    ) => {
        try {
            setDeletingMessageId(messageId);
            const response = await deleteCartItemMessage(
                getCartLineId(item),
                messageId,
            );
            toast.success("Message deleted");
            if (response.data?.item) {
                updateCartItemInState(response.data.item);
            }
            emitNotificationsRefresh();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to delete message";
            toast.error(errorMessage);
        } finally {
            setDeletingMessageId(null);
        }
    };

    const handleStartEditMessage = (message: CartItemMessage) => {
        setEditingMessageId(message.id);
        setMessageText(message.message);
    };

    const handleCancelEditMessage = () => {
        setEditingMessageId(null);
        setMessageText("");
    };

    const isAllSelected =
        cartItems.length > 0 && selectedIds.length === cartItems.length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-[#bb923a]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4 font-lato">
                <p className="text-red-500">{error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-4 pb-8 pt-24 md:px-8 md:pt-32 font-lato">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-cormorantGaramond font-bold text-[#26062b]">
                    My Cart
                </h1>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-500 font-medium">
                <button
                    className="flex items-center gap-2 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedIds.length === 0 || removing}
                    onClick={handleRemoveSelected}
                >
                    {removing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Trash2 className="w-4 h-4" />
                    )}
                    <span>Remove from cart</span>
                </button>
                <button
                    className="flex items-center gap-2 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedIds.length < 2}
                    onClick={handleCompare}
                >
                    <GitCompare className="w-4 h-4" />
                    <span>
                        Compare stone{" "}
                        {selectedIds.length > 0 && `(${selectedIds.length})`}
                    </span>
                </button>

                <button
                    className="flex items-center gap-2 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={cartItems.length === 0}
                    onClick={() =>
                        exportDiamondsToExcel(
                            cartItems
                                .filter(isDiamondCartItem)
                                .map((item) => item.diamond),
                            "cart-diamonds",
                        )
                    }
                >
                    <Download className="w-4 h-4" />
                    <span>Export to Excel</span>
                </button>

                <AlertDialog
                    open={showHoldDialog}
                    onOpenChange={setShowHoldDialog}
                >
                    <AlertDialogTrigger asChild>
                        <button
                            className="flex items-center gap-1 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={selectedIds.length === 0 || holdLoading}
                        >
                            {holdLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                            ) : (
                                <Clock className="w-4 h-4 mr-1" />
                            )}
                            Hold Diamond
                            {selectedIds.length > 0
                                ? ` (${selectedIds.length})`
                                : ""}
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogMedia>
                                <Clock className="text-primary-purple" />
                            </AlertDialogMedia>
                            <AlertDialogTitle>
                                Hold selected diamonds?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will reserve {selectedIds.length}{" "}
                                diamond(s) for you temporarily. You can view all
                                your held diamonds in the hold section.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={holdLoading}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleHoldSelected}
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

                <AlertDialog
                    open={showClearDialog}
                    onOpenChange={setShowClearDialog}
                >
                    <AlertDialogTrigger asChild>
                        <button
                            className="flex items-center gap-1 hover:text-[#bb923a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartItems.length === 0 || removing}
                        >
                            {removing ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                            ) : (
                                <Trash2 className="w-4 h-4 mr-1" />
                            )}
                            Clear Cart
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogMedia>
                                <AlertTriangle className="text-amber-600" />
                            </AlertDialogMedia>
                            <AlertDialogTitle>
                                Clear entire cart?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will remove all items from your
                                cart. This cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                variant="destructive"
                                onClick={handleClearCartConfirm}
                                disabled={removing}
                                className="rounded-sm "
                            >
                                {removing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Clearing...
                                    </>
                                ) : (
                                    "Clear Cart"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {/* Table Container */}
            <div className="border border-[#e7d7b4] rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1400px]">
                        {/* Table Header */}
                        <thead className="bg-[#26062b] font-cormorantGaramond text-white text-sm uppercase tracking-wider font-medium">
                            <tr>
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-[#bb923a] cursor-pointer"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        disabled={cartItems.length === 0}
                                    />
                                </th>
                                <th className="p-4 text-left">Image</th>
                                <th className="p-4 text-left">Pct No</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Location</th>
                                <th className="p-4 text-left">Report No</th>
                                <th className="p-4 text-left">Lab</th>
                                <th className="p-4 text-left">Shape</th>
                                <th className="p-4 text-left">Carat</th>
                                <th className="p-4 text-left">Color</th>
                                <th className="p-4 text-left">Purity</th>
                                <th className="p-4 text-left">Cut</th>
                                <th className="p-4 text-left">Pol</th>
                                <th className="p-4 text-right">Rap.($)</th>
                                <th className="p-4 text-left">Length</th>
                                <th className="p-4 text-left">Width</th>
                                <th className="p-4 text-left">Depth</th>
                                <th className="p-4 text-right">$Total Price</th>
                                <th className="p-4 text-center">Message</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-sm text-gray-700">
                            {cartItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={19}
                                        className="p-12 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <p>Your cart is empty.</p>
                                            <Link
                                                href="/inventory"
                                                className="text-[#bb923a] underline hover:text-[#26062b]"
                                            >
                                                Browse Inventory
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                cartItems.map((item, index) => {
                                    const threadId = getCartThreadId(item);
                                    const isEven = index % 2 === 0;
                                    const messages = getCartItemMessages(item);
                                    const counts = getCartMessageCounts(
                                        item,
                                        "customer",
                                    );
                                    const isExpanded =
                                        expandedDiamondId === threadId;

                                    if (isMelleCartItem(item)) {
                                        const m = item.melle;
                                        const lineId = getCartLineId(item);
                                        const totalPrice =
                                            (m.price ?? 0) *
                                            (item.requestedCarat ?? 0);
                                        return (
                                            <React.Fragment key={threadId}>
                                                <tr
                                                    id={`cart-thread-${threadId}`}
                                                    className={`border-b font-lato border-[#e7d7b4] hover:bg-[#fffbf2] transition-colors ${
                                                        !isEven
                                                            ? "bg-[#fffbf2]/30"
                                                            : "bg-white"
                                                    }`}
                                                >
                                                    <td className="p-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 accent-[#bb923a] cursor-pointer"
                                                            checked={selectedIds.includes(
                                                                lineId,
                                                            )}
                                                            onChange={() =>
                                                                handleSelectOne(
                                                                    lineId,
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td className="p-2">—</td>
                                                    <td className="p-4">
                                                        <Link
                                                            href={`/inventory?view=${m._id}&type=melle`}
                                                            className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                                        >
                                                            {m.stockId}
                                                        </Link>
                                                    </td>
                                                    <td className="p-4">—</td>
                                                    <td className="p-4">—</td>
                                                    <td className="p-4">—</td>
                                                    <td className="p-4">
                                                        {m.isLab
                                                            ? "Lab"
                                                            : "Natural"}
                                                    </td>
                                                    <td className="p-4">
                                                        {m.shape}
                                                    </td>
                                                    <td className="p-4">
                                                        {item.requestedCarat.toFixed(
                                                            2,
                                                        )}{" "}
                                                        ct req.
                                                    </td>
                                                    <td className="p-4">
                                                        {m.color}
                                                    </td>
                                                    <td className="p-4">
                                                        {m.clarity}
                                                    </td>
                                                    <td className="p-4">
                                                        {m.cut || "—"}
                                                    </td>
                                                    <td className="p-4">—</td>
                                                    <td className="p-4 text-right">
                                                        {formatCurrency(
                                                            m.price ?? 0,
                                                        )}
                                                    </td>
                                                    <td className="p-4">—</td>
                                                    <td className="p-4">—</td>
                                                    <td className="p-4">—</td>
                                                    <td className="p-4 text-right font-bold text-[#bb923a]">
                                                        {formatCurrency(
                                                            totalPrice,
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleToggleMessagesWithDelivery(
                                                                    item,
                                                                )
                                                            }
                                                            className={`relative inline-flex items-center justify-center rounded-md p-1.5 transition-colors ${
                                                                isExpanded
                                                                    ? "bg-[#26062b]/10 text-[#26062b]"
                                                                    : "text-gray-500 hover:bg-gray-100 hover:text-[#26062b]"
                                                            }`}
                                                            aria-label={
                                                                isExpanded
                                                                    ? "Hide messages"
                                                                    : "Show messages"
                                                            }
                                                        >
                                                            <MessageSquare
                                                                size={16}
                                                            />
                                                            <span className="absolute -right-2 -top-2 rounded-full bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                                                                {
                                                                    counts.totalCount
                                                                }
                                                            </span>
                                                            {counts.unreadCount >
                                                                0 && (
                                                                <span className="absolute -bottom-2 -right-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                                                                    {
                                                                        counts.unreadCount
                                                                    }
                                                                </span>
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    }

                                    if (!isDiamondCartItem(item)) {
                                        return null;
                                    }

                                    const d = item.diamond;
                                    return (
                                        <React.Fragment key={threadId}>
                                        <tr
                                            id={`cart-thread-${threadId}`}
                                            className={`border-b font-lato border-[#e7d7b4] hover:bg-[#fffbf2] transition-colors ${
                                                !isEven
                                                    ? "bg-[#fffbf2]/30"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <td className="p-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-[#bb923a] cursor-pointer"
                                                    checked={selectedIds.includes(
                                                        d._id,
                                                    )}
                                                    onChange={() =>
                                                        handleSelectOne(d._id)
                                                    }
                                                />
                                            </td>
                                            <td className="p-2">
                                                <div className="w-12 h-12 relative bg-gray-100 rounded flex items-center justify-center overflow-hidden border border-gray-200">
                                                    {d.webLink ? (
                                                        <img
                                                            src={d.webLink}
                                                            alt={d.stockRef}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (
                                                                    e.target as HTMLImageElement
                                                                ).style.display =
                                                                    "none";
                                                                (
                                                                    e.target as HTMLImageElement
                                                                ).nextElementSibling?.classList.remove(
                                                                    "hidden",
                                                                );
                                                            }}
                                                        />
                                                    ) : null}
                                                    <span
                                                        className={`text-[10px] text-gray-400 ${
                                                            d.webLink
                                                                ? "hidden"
                                                                : ""
                                                        }`}
                                                    >
                                                        No img
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Link
                                                    href={`/inventory?view=${d.certiNo}`}
                                                    className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                                >
                                                    {d.stockRef}
                                                </Link>
                                            </td>
                                            <td className="p-4">
                                                <DiamondAvailabilityStatusBadge
                                                    availability={d.availability}
                                                />
                                            </td>
                                            <td className="p-4">
                                                {d.city || d.country || "MU"}
                                            </td>
                                            <td className="p-4">{d.certiNo}</td>
                                            <td className="p-4">{d.lab}</td>
                                            <td className="p-4">{d.shape}</td>
                                            <td className="p-4">
                                                {d.weight?.toFixed(2)}
                                            </td>
                                            <td className="p-4">{d.color}</td>
                                            <td className="p-4 text-[#3b82f6]">
                                                {d.clarity}
                                            </td>
                                            <td className="p-4">
                                                {d.cutGrade}
                                            </td>
                                            <td className="p-4">{d.polish}</td>
                                            <td className="p-4 text-right">
                                                {formatCurrency(d.priceListUSD)}
                                            </td>
                                            <td className="p-4">
                                                {d.measurements}
                                            </td>
                                            <td className="p-4">N/A</td>
                                            <td className="p-4">
                                                {d.depthPerc?.toFixed(2)}
                                            </td>
                                            <td className="p-4 text-right font-bold text-[#bb923a]">
                                                {formatCurrency(
                                                    calculateTotalPrice(
                                                        d.weight,
                                                        d.pricePerCts,
                                                    ),
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleToggleMessagesWithDelivery(
                                                            item,
                                                        )
                                                    }
                                                    className={`relative inline-flex items-center justify-center rounded-md p-1.5 transition-colors ${
                                                        isExpanded
                                                            ? "bg-[#26062b]/10 text-[#26062b]"
                                                            : "text-gray-500 hover:bg-gray-100 hover:text-[#26062b]"
                                                    }`}
                                                    aria-label={
                                                        isExpanded
                                                            ? "Hide messages"
                                                            : "Show messages"
                                                    }
                                                >
                                                    <MessageSquare size={16} />
                                                    <span className="absolute -right-2 -top-2 rounded-full bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                                                        {counts.totalCount}
                                                    </span>
                                                    {counts.unreadCount > 0 && (
                                                        <span className="absolute -bottom-2 -right-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                                                            {counts.unreadCount}
                                                        </span>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr
                                                className={`border-b font-lato border-[#e7d7b4] ${
                                                    !isEven
                                                        ? "bg-[#fffbf2]/30"
                                                        : "bg-white"
                                                }`}
                                            >
                                                <td colSpan={19} className="px-4 pt-4 pb-4">
                                                    <div className="space-y-3">
                                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                                            {messages.length > 0 ? (
                                                                messages.map(
                                                                    (message) => {
                                                                        const isEditing =
                                                                            editingMessageId ===
                                                                            message.id;
                                                                        const canModify =
                                                                            canModifyCartMessage(
                                                                                message,
                                                                                "customer",
                                                                            );
                                                                        const bubbleClass =
                                                                            message.senderRole ===
                                                                            "customer"
                                                                                ? "border-blue-200 bg-blue-50"
                                                                                : "border-green-200 bg-green-50";

                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    message.id
                                                                                }
                                                                                className={`rounded-md border p-3 text-sm text-gray-700 ${bubbleClass} ${
                                                                                    isEditing
                                                                                        ? "ring-2 ring-[#26062b]/20"
                                                                                        : ""
                                                                                }`}
                                                                            >
                                                                                <div className="flex items-start justify-between gap-3">
                                                                                    <div className="flex-1 space-y-2">
                                                                                        <p className="font-semibold text-[#26062b]">
                                                                                            {getCartMessageAuthorLabel(
                                                                                                message,
                                                                                                "customer",
                                                                                            )}
                                                                                        </p>
                                                                                        <p>
                                                                                            {
                                                                                                message.message
                                                                                            }
                                                                                        </p>
                                                                                        <p className="text-xs text-gray-500">
                                                                                            {formatCartMessageDateTime(
                                                                                                message.sentAt,
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2">
                                                                                        {canModify &&
                                                                                            !isEditing && (
                                                                                                <button
                                                                                                    type="button"
                                                                                                    onClick={() =>
                                                                                                        handleStartEditMessage(
                                                                                                            message,
                                                                                                        )
                                                                                                    }
                                                                                                    className="text-gray-500 hover:text-gray-700"
                                                                                                    aria-label="Edit message"
                                                                                                >
                                                                                                    <Pencil className="w-4 h-4" />
                                                                                                </button>
                                                                                            )}
                                                                                        {canModify && (
                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() =>
                                                                                                    handleDeleteMessage(
                                                                                                        item,
                                                                                                        message.id,
                                                                                                    )
                                                                                                }
                                                                                                disabled={
                                                                                                    deletingMessageId ===
                                                                                                    message.id
                                                                                                }
                                                                                                className="text-red-500 hover:text-red-700 disabled:opacity-50"
                                                                                                aria-label="Delete message"
                                                                                            >
                                                                                                {deletingMessageId ===
                                                                                                message.id ? (
                                                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                                                ) : (
                                                                                                    <Trash2 className="w-4 h-4" />
                                                                                                )}
                                                                                            </button>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    },
                                                                )
                                                            ) : (
                                                                <p className="text-xs text-gray-500 italic">
                                                                    No messages yet.
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Textarea
                                                                placeholder={
                                                                    editingMessageId
                                                                        ? "Update your message..."
                                                                        : "Type your message here..."
                                                                }
                                                                value={messageText}
                                                                onChange={(e) =>
                                                                    setMessageText(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="min-h-20 text-sm"
                                                                disabled={
                                                                    isSendingMessage ||
                                                                    isUpdatingMessage
                                                                }
                                                            />
                                                            <div className="flex justify-end gap-2">
                                                                {editingMessageId && (
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={
                                                                            handleCancelEditMessage
                                                                        }
                                                                        disabled={
                                                                            isUpdatingMessage
                                                                        }
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    onClick={() =>
                                                                        handleSubmitMessage(
                                                                            item,
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        isSendingMessage ||
                                                                        isUpdatingMessage ||
                                                                        !messageText.trim()
                                                                    }
                                                                    className="bg-[#26062b] hover:bg-[#26062b]/90 text-white"
                                                                >
                                                                    {isSendingMessage ||
                                                                    isUpdatingMessage ? (
                                                                        <>
                                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                            {editingMessageId
                                                                                ? "Updating..."
                                                                                : "Sending..."}
                                                                        </>
                                                                    ) : editingMessageId ? (
                                                                        "Update"
                                                                    ) : (
                                                                        <>
                                                                            <Send className="w-4 h-4 mr-2" />
                                                                            Send
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
