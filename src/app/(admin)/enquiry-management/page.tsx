"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
    deleteCartItemMessage,
    getAllCarts,
    markAdminCartItemMessagesDelivered,
    replyToCartItem,
    updateCartItemMessage,
    getAllCheckouts,
    deleteCheckoutItemMessage,
    markAdminCheckoutItemMessagesDelivered,
    replyToCheckoutItem,
    updateCheckoutItemMessage,
    type AdminCartData,
} from "@/services/adminServices";
import {
    getAllAdminQueries,
    markQueryDelivered,
    replyToQuery,
} from "@/services/inquiryService";
import {
    CartItem,
    CartItemMessage,
    Diamond,
} from "@/interface/diamondInterface";
import { DiamondAvailabilityStatusBadge } from "@/components/columns/DiamondColumns";
import {
    canModifyCartMessage,
    getCartMessageCounts,
    formatCartMessageDateTime,
    getCartItemMessages,
    getCartMessageAuthorLabel,
} from "@/lib/cartItemMessages";
import {
    ChevronDown,
    ChevronUp,
    CheckCircle,
    XCircle,
    Clock,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    FileStack,
    Send,
    Loader2,
    ClockIcon,
    Search,
    X,
    MessageSquare,
    Trash2,
    Pencil,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ExtendHoldDialog from "@/components/admin/ExtendHoldDialog";
import { emitNotificationsRefresh } from "@/services/notificationService";
import { getQueryMessageCounts } from "@/lib/queryMessages";
import { getCartLineId, isMelleCartItem } from "@/lib/cartItems";

// --- Types ---
interface GroupedQuery {
    userId: string;
    userEmail: string;
    stockRef: string;
    diamondId: Diamond;
    query: string;
    status: "pending" | "answered" | "closed" | "replied";
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
    adminReply?: string;
    repliedAt?: string;
    repliedBy?: string;
    deliveredToAdminAt?: string;
    deliveredToCustomerAt?: string;
}

interface AdminQueriesData {
    email: string;
    queries: GroupedQuery[];
}

// --- Components ---

const StatCard = ({
    title,
    count,
    desc,
    icon: Icon,
}: {
    title: string;
    count: string | number;
    desc: string;
    icon: React.ElementType;
}) => (
    <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-2 text-gray-600">
            <Icon size={18} />
            <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <div>
            <div className="text-3xl font-bold text-gray-900 mb-1 leading-none font-cormorantGaramond">
                {count}
            </div>
            <p className="text-xs text-gray-400">{desc}</p>
        </div>
    </div>
);

// Admin message actions, injectable so the same table serves cart and the
// independent checkout feature (different endpoints, identical signatures).
type CartAdminApi = {
    reply: typeof replyToCartItem;
    update: typeof updateCartItemMessage;
    remove: typeof deleteCartItemMessage;
    markDelivered: typeof markAdminCartItemMessagesDelivered;
};

const CART_ADMIN_API: CartAdminApi = {
    reply: replyToCartItem,
    update: updateCartItemMessage,
    remove: deleteCartItemMessage,
    markDelivered: markAdminCartItemMessagesDelivered,
};

const CHECKOUT_ADMIN_API: CartAdminApi = {
    reply: replyToCheckoutItem,
    update: updateCheckoutItemMessage,
    remove: deleteCheckoutItemMessage,
    markDelivered: markAdminCheckoutItemMessagesDelivered,
};

const CartItemsTable = ({
    items,
    userId,
    onCartItemUpdated,
    autoExpandDiamondId,
    adminApi = CART_ADMIN_API,
}: {
    items: CartItem[];
    userId: string;
    onCartItemUpdated: (updatedItem: CartItem) => void;
    autoExpandDiamondId?: string | null;
    adminApi?: CartAdminApi;
}) => {
    const [expandedDiamondId, setExpandedDiamondId] = useState<string | null>(
        null,
    );
    const [replyText, setReplyText] = useState("");
    const [isReplying, setIsReplying] = useState(false);
    const [deletingMessageId, setDeletingMessageId] = useState<string | null>(
        null,
    );
    const [editingMessageId, setEditingMessageId] = useState<string | null>(
        null,
    );
    const [isUpdatingMessage, setIsUpdatingMessage] = useState(false);
    const autoOpenedThreadRef = React.useRef<string | null>(null);
    const getCartThreadId = getCartLineId;

    const columnCount = 17;

    useEffect(() => {
        if (!autoExpandDiamondId) {
            autoOpenedThreadRef.current = null;
            return;
        }

        if (
            autoOpenedThreadRef.current === autoExpandDiamondId ||
            expandedDiamondId === autoExpandDiamondId
        ) {
            return;
        }

        const targetItem = items.find(
            (item) => getCartThreadId(item) === autoExpandDiamondId,
        );

        if (!targetItem) {
            return;
        }

        autoOpenedThreadRef.current = autoExpandDiamondId;

        void (async () => {
            setExpandedDiamondId(autoExpandDiamondId);
            setReplyText("");
            setEditingMessageId(null);

            try {
                const response = await adminApi.markDelivered({
                    userId,
                    diamondId: autoExpandDiamondId,
                });
                if (response.data?.item) {
                    onCartItemUpdated(response.data.item);
                }
                emitNotificationsRefresh();
            } catch (error) {
                console.error(
                    "Failed to mark admin cart messages delivered:",
                    error,
                );
            } finally {
                document
                    .getElementById(`admin-cart-thread-${autoExpandDiamondId}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        })();
    }, [autoExpandDiamondId, expandedDiamondId, items, onCartItemUpdated, userId]);

    const handleToggleMessages = (diamondId: string) => {
        setExpandedDiamondId((current) =>
            current === diamondId ? null : diamondId,
        );
        setReplyText("");
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
            const response = await adminApi.markDelivered({
                userId,
                diamondId: threadId,
            });
            if (response.data?.item) {
                onCartItemUpdated(response.data.item);
            }
            emitNotificationsRefresh();
        } catch (error) {
            console.error("Failed to mark admin cart messages delivered:", error);
        }
    };

    const handleSubmitReply = async (item: CartItem) => {
        if (!replyText.trim()) {
            toast.error("Please enter a reply");
            return;
        }

        if (editingMessageId) {
            try {
                setIsUpdatingMessage(true);
                const response = await adminApi.update({
                    userId,
                    diamondId: getCartLineId(item),
                    messageId: editingMessageId,
                    message: replyText,
                });
                toast.success("Message updated");
                setEditingMessageId(null);
                setReplyText("");
                if (response.data?.item) {
                    onCartItemUpdated(response.data.item);
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
            setIsReplying(true);
            const response = await adminApi.reply({
                userId,
                diamondId: getCartLineId(item),
                reply: replyText,
            });
            toast.success("Reply sent successfully");
            setReplyText("");
            if (response.data?.item) {
                onCartItemUpdated(response.data.item);
            }
            emitNotificationsRefresh();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to send reply";
            toast.error(errorMessage);
        } finally {
            setIsReplying(false);
        }
    };

    const handleDeleteMessage = async (
        item: CartItem,
        messageId: string,
    ) => {
        try {
            setDeletingMessageId(messageId);
            const response = await adminApi.remove({
                userId,
                diamondId: getCartLineId(item),
                messageId,
            });
            toast.success("Message deleted");
            if (response.data?.item) {
                onCartItemUpdated(response.data.item);
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
        setReplyText(message.message);
    };

    const handleCancelEditMessage = () => {
        setEditingMessageId(null);
        setReplyText("");
    };

    const sortedItems = [...(items || [])].sort(
        (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
    );

    if (sortedItems.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500 italic">
                No items found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                        <th className="py-2 px-3">Stock Ref</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3">Loc.</th>
                        <th className="py-2 px-3">Number</th>
                        <th className="py-2 px-3">Lab</th>
                        <th className="py-2 px-3">Shape</th>
                        <th className="py-2 px-3">Carat</th>
                        <th className="py-2 px-3">Requested Ct.</th>
                        <th className="py-2 px-3">Pieces</th>
                        <th className="py-2 px-3">Color</th>
                        <th className="py-2 px-3">Clarity</th>
                        <th className="py-2 px-3">Cut</th>
                        <th className="py-2 px-3">Depth%</th>
                        <th className="py-2 px-3">Table%</th>
                        <th className="py-2 px-3">Price/Ct</th>
                        <th className="py-2 px-3 text-right">Total</th>
                        <th className="py-2 px-3 text-center">Message</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {sortedItems.map((item, idx) => {
                        const threadId = getCartThreadId(item);
                        const isExpanded = expandedDiamondId === threadId;
                        const messages = getCartItemMessages(item);
                        const counts = getCartMessageCounts(item, "admin");
                        const isMelle = isMelleCartItem(item);

                        const messageCell = (
                            <td className="py-2 px-3 text-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleToggleMessagesWithDelivery(item)
                                    }
                                    className={`relative inline-flex items-center justify-center rounded-md p-1.5 transition-colors ${
                                        isExpanded
                                            ? "bg-primary-purple/10 text-primary-purple"
                                            : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
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
                        );

                        let mainRow: React.ReactNode;

                        if (isMelle) {
                            const m = item.melle;
                            const totalPrice =
                                (m.price ?? 0) * (item.requestedCarat ?? 0);
                            // Per-piece figures come from the API; fall back to
                            // deriving them from the stone's per-piece carat.
                            const requestedPieces =
                                item.requestedPieces ??
                                (m.carat
                                    ? (item.requestedCarat ?? 0) / m.carat
                                    : undefined);
                            const pricePerPiece =
                                item.pricePerPiece ??
                                (m.carat ? (m.price ?? 0) * m.carat : undefined);

                            mainRow = (
                                    <tr
                                        id={`admin-cart-thread-${threadId}`}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="py-2 px-3 font-medium text-gray-700">
                                            <Link
                                                href={`/inventory?view=${m._id}&type=melle`}
                                                className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                            >
                                                {m.stockId}
                                            </Link>
                                        </td>
                                        <td className="py-2 px-3">-</td>
                                        <td className="py-2 px-3 text-gray-500">
                                            -
                                        </td>
                                        <td className="py-2 px-3 text-gray-500">
                                            -
                                        </td>
                                        <td className="py-2 px-3">
                                            {m.isLab
                                                ? m.labType
                                                    ? `Lab (${m.labType})`
                                                    : "Lab"
                                                : "Natural"}
                                        </td>
                                        <td className="py-2 px-3">{m.shape}</td>
                                        <td className="py-2 px-3">
                                            {m.carat?.toFixed(5) ?? "-"}
                                        </td>
                                        <td className="py-2 px-3 font-semibold text-primary-purple">
                                            {(item.requestedCarat ?? 0).toFixed(
                                                2,
                                            )}{" "}
                                            ct
                                        </td>
                                        <td className="py-2 px-3">
                                            {requestedPieces !== undefined
                                                ? `${Math.round(
                                                      requestedPieces,
                                                  ).toLocaleString()} pcs`
                                                : "—"}
                                        </td>
                                        <td className="py-2 px-3">{m.color}</td>
                                        <td className="py-2 px-3">
                                            {m.clarity}
                                        </td>
                                        <td className="py-2 px-3">
                                            {m.cut || "-"}
                                        </td>
                                        <td className="py-2 px-3">-</td>
                                        <td className="py-2 px-3">-</td>
                                        <td className="py-2 px-3">
                                            $
                                            {(m.price ?? 0).toLocaleString()}
                                            {pricePerPiece !== undefined && (
                                                <div className="text-xs text-gray-500">
                                                    {pricePerPiece.toLocaleString(
                                                        undefined,
                                                        {
                                                            style: "currency",
                                                            currency: "USD",
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 4,
                                                        },
                                                    )}
                                                    /pc
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-2 px-3 font-medium text-right">
                                            $
                                            {totalPrice.toLocaleString(
                                                undefined,
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                },
                                            )}
                                        </td>
                                        {messageCell}
                                    </tr>
                            );
                        } else {
                        const d = item.diamond;
                        const totalPrice = d.weight * d.pricePerCts;

                            mainRow = (
                                <tr
                                    id={`admin-cart-thread-${threadId}`}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="py-2 px-3 font-medium text-gray-700">
                                        <Link
                                            href={`/inventory?view=${d.certiNo}`}
                                            className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                        >
                                            {d.stockRef}
                                        </Link>
                                    </td>
                                    <td className="py-2 px-3">
                                        <DiamondAvailabilityStatusBadge
                                            availability={d.availability}
                                        />
                                    </td>
                                    <td className="py-2 px-3 text-gray-500">
                                        {d.country
                                            ? d.country
                                                  .substring(0, 2)
                                                  .toUpperCase()
                                            : "-"}
                                    </td>
                                    <td className="py-2 px-3 text-gray-500">
                                        {d.certiNo}
                                    </td>
                                    <td className="py-2 px-3">{d.lab}</td>
                                    <td className="py-2 px-3">{d.shape}</td>
                                    <td className="py-2 px-3">{d.weight}</td>
                                    <td className="py-2 px-3">-</td>
                                    <td className="py-2 px-3">—</td>
                                    <td className="py-2 px-3">{d.color}</td>
                                    <td className="py-2 px-3">{d.clarity}</td>
                                    <td className="py-2 px-3">{d.cutGrade}</td>
                                    <td className="py-2 px-3">{d.depthPerc}%</td>
                                    <td className="py-2 px-3">{d.tablePerc}%</td>
                                    <td className="py-2 px-3">
                                        ${d.pricePerCts.toLocaleString()}
                                    </td>
                                    <td className="py-2 px-3 font-medium text-right">
                                        $
                                        {totalPrice.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                    {messageCell}
                                </tr>
                            );
                        }

                        return (
                            <React.Fragment
                                key={
                                    threadId ||
                                    (isMelle
                                        ? item.melle._id
                                        : item.diamond._id) ||
                                    idx
                                }
                            >
                                {mainRow}
                                {isExpanded && (
                                    <tr className="bg-gray-50">
                                        <td
                                            colSpan={columnCount}
                                            className="px-3 py-3"
                                        >
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
                                                                        "admin",
                                                                    );
                                                                const bubbleClass =
                                                                    message.senderRole ===
                                                                    "admin"
                                                                        ? "border-green-100 bg-green-50"
                                                                        : "border-blue-100 bg-blue-50";

                                                                return (
                                                                    <div
                                                                        key={
                                                                            message.id
                                                                        }
                                                                        className={`rounded border p-3 text-sm text-gray-700 ${bubbleClass} ${
                                                                            isEditing
                                                                                ? "ring-2 ring-[#26062b]/20"
                                                                                : ""
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-start justify-between gap-3">
                                                                            <div className="flex-1 space-y-2">
                                                                                <p className="text-xs font-semibold text-gray-600">
                                                                                    {getCartMessageAuthorLabel(
                                                                                        message,
                                                                                        "admin",
                                                                                    )}
                                                                                </p>
                                                                                <p>
                                                                                    {
                                                                                        message.message
                                                                                    }
                                                                                </p>
                                                                                <p className="text-xs text-gray-500">
                                                                                    Sent{" "}
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
                                                            value={replyText}
                                                            onChange={(e) =>
                                                                setReplyText(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="min-h-20 text-sm"
                                                            disabled={
                                                                isReplying ||
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
                                                                    handleSubmitReply(
                                                                        item,
                                                                    )
                                                                }
                                                                disabled={
                                                                    isReplying ||
                                                                    isUpdatingMessage ||
                                                                    !replyText.trim()
                                                                }
                                                                className="bg-[#26062b] hover:bg-[#26062b]/90 text-white"
                                                            >
                                                                {isReplying ||
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
                    })}
                </tbody>
            </table>
        </div>
    );
};

const InnerDiamondTable = ({
    items,
    isHold = false,
    onExtendHold,
}: {
    items: { diamond: Diamond }[];
    isHold?: boolean;
    onExtendHold?: (stockRef: string) => void;
}) => {
    if (!items || items.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500 italic">
                No items found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                        <th className="py-2 px-3">Stock Ref</th>
                        <th className="py-2 px-3">Loc.</th>
                        <th className="py-2 px-3">Number</th>
                        <th className="py-2 px-3">Lab</th>
                        <th className="py-2 px-3">Shape</th>
                        <th className="py-2 px-3">Carat</th>
                        <th className="py-2 px-3">Color</th>
                        <th className="py-2 px-3">Clarity</th>
                        <th className="py-2 px-3">Cut</th>
                        <th className="py-2 px-3">Depth%</th>
                        <th className="py-2 px-3">Table%</th>
                        <th className="py-2 px-3">Price/Ct</th>
                        <th className="py-2 px-3 text-right">Total</th>
                        {isHold && <th className="py-2 px-3">Action</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map((item, idx) => {
                        const d = item.diamond;
                        const totalPrice = d.weight * d.pricePerCts;
                        return (
                            <tr key={d._id || idx} className="hover:bg-gray-50">
                                <td className="py-2 px-3 font-medium text-gray-700">
                                    <Link
                                        href={`/inventory?view=${d.certiNo}`}
                                        className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                    >
                                        {d.stockRef}
                                    </Link>
                                </td>
                                <td className="py-2 px-3 text-gray-500">
                                    {d.country
                                        ? d.country
                                              .substring(0, 2)
                                              .toUpperCase()
                                        : "-"}
                                </td>
                                <td className="py-2 px-3 text-gray-500">
                                    {d.certiNo}
                                </td>
                                <td className="py-2 px-3">{d.lab}</td>
                                <td className="py-2 px-3">{d.shape}</td>
                                <td className="py-2 px-3">{d.weight}</td>
                                <td className="py-2 px-3">{d.color}</td>
                                <td className="py-2 px-3">{d.clarity}</td>
                                <td className="py-2 px-3">{d.cutGrade}</td>
                                <td className="py-2 px-3">{d.depthPerc}%</td>
                                <td className="py-2 px-3">{d.tablePerc}%</td>
                                <td className="py-2 px-3">
                                    ${d.pricePerCts.toLocaleString()}
                                </td>
                                <td className="py-2 px-3 font-medium text-right">
                                    $
                                    {totalPrice.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </td>
                                {isHold && (
                                    <td className="py-2 px-3">
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                onExtendHold?.(d.stockRef)
                                            }
                                            className="flex items-center gap-1 text-xs bg-primary-purple hover:bg-primary-purple/90"
                                        >
                                            <ClockIcon size={12} />
                                            Extend
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const QueryItem = ({
    query,
    onReplySuccess,
    domId,
    highlight = false,
}: {
    query: GroupedQuery;
    onReplySuccess: () => void;
    domId?: string;
    highlight?: boolean;
}) => {
    const [replyText, setReplyText] = useState("");
    const [isReplying, setIsReplying] = useState(false);

    const handleSendReply = async () => {
        if (!replyText.trim()) {
            toast.error("Please enter a reply");
            return;
        }

        try {
            setIsReplying(true);
            await replyToQuery({
                queryId: query.id,
                reply: replyText,
            });
            toast.success("Reply sent successfully");
            setReplyText("");
            onReplySuccess();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to send reply";
            toast.error(errorMessage);
        } finally {
            setIsReplying(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: {
                bg: "bg-yellow-100",
                text: "text-yellow-800",
                label: "Pending",
            },
            replied: {
                bg: "bg-green-100",
                text: "text-green-800",
                label: "Replied",
            },
            answered: {
                bg: "bg-blue-100",
                text: "text-blue-800",
                label: "Answered",
            },
            closed: {
                bg: "bg-gray-100",
                text: "text-gray-800",
                label: "Closed",
            },
        };
        const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig.pending;
        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
            >
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            id={domId}
            className={`border rounded-lg p-4 bg-white ${
                highlight
                    ? "border-primary-purple ring-2 ring-primary-purple/20"
                    : "border-gray-200"
            }`}
        >
            {/* Query Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                            Stone: {query.stockRef}
                        </span>
                        {getStatusBadge(query.status)}
                    </div>
                    <p className="text-xs text-gray-500">
                        {formatDate(query.createdAt)}
                    </p>
                </div>
            </div>

            {/* Diamond Details */}
            <div className="bg-gray-50 rounded p-3 mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Diamond Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div>
                        <span className="text-gray-500">Shape:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.shape}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Carats:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.weight}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Color:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.color}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Clarity:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.clarity}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Cut:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.cutGrade}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Lab:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.lab}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Location:</span>{" "}
                        <span className="font-medium">
                            {query.diamondId.country
                                ?.substring(0, 2)
                                .toUpperCase() || "-"}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-500">Net Value:</span>{" "}
                        <span className="font-medium">
                            $
                            {(
                                query.diamondId.weight *
                                query.diamondId.pricePerCts
                            ).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Customer Query */}
            <div className="mb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Customer Query:
                </h4>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 border border-gray-100">
                    {query.query}
                </div>
            </div>

            {/* Admin Reply (if exists) */}
            {query.adminReply && (
                <div className="mb-3">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Your Reply:
                    </h4>
                    <div className="bg-green-50 p-3 rounded text-sm text-gray-700 border border-green-100">
                        {query.adminReply}
                        {query.repliedAt && (
                            <p className="text-xs text-gray-500 mt-2">
                                Replied on {formatDate(query.repliedAt)}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Reply Section */}
            {query.status !== "replied" && (
                <div>
                    <div className="flex gap-2">
                        <Textarea
                            placeholder="Type your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 text-sm min-h-20"
                            disabled={isReplying}
                        />
                    </div>
                    <div className="mt-2 flex justify-end">
                        <Button
                            onClick={handleSendReply}
                            disabled={isReplying || !replyText.trim()}
                            className="bg-[#26062b] hover:bg-[#26062b]/90 text-white"
                        >
                            {isReplying ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Reply
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const EnquiryRow = ({
    data,
    index,
    currentPage,
    limit,
    queriesData,
    onReplySuccess,
    onCartItemUpdated,
    onQueryUpdated,
    onExtendHoldSuccess,
    autoExpand = false,
    autoExpandCartThreadId,
    targetQueryId,
    mode = "cart",
}: {
    data: AdminCartData;
    index: number;
    currentPage: number;
    limit: number;
    queriesData?: AdminQueriesData;
    onReplySuccess: () => void;
    onCartItemUpdated: (userId: string, updatedItem: CartItem) => void;
    onQueryUpdated: (updatedQuery: GroupedQuery) => void;
    onExtendHoldSuccess: () => void;
    autoExpand?: boolean;
    autoExpandCartThreadId?: string | null;
    targetQueryId?: string | null;
    mode?: "cart" | "checkout";
}) => {
    const isCheckout = mode === "checkout";
    const [isExpanded, setIsExpanded] = useState(autoExpand);
    const autoHandledRef = React.useRef(false);
    const [extendHoldDialog, setExtendHoldDialog] = useState<{
        open: boolean;
        stockRef: string;
    }>({
        open: false,
        stockRef: "",
    });

    const { user, cart } = data;
    const customer = user.customerData;
    const business = customer?.businessInfo;
    const address = customer?.address;

    const fullName = customer
        ? `${customer.firstName} ${customer.lastName}`
        : user.username || "N/A";

    const displayAddress = address
        ? `${address.street}, ${address.city}`
        : "N/A";

    const serialNumber = (currentPage - 1) * limit + (index + 1);

    // Get queries for this user
    const userQueries = React.useMemo(
        () => queriesData?.queries || [],
        [queriesData],
    );

    const handleExtendHold = (stockRef: string) => {
        setExtendHoldDialog({ open: true, stockRef });
    };

    const handleToggleExpanded = async () => {
        const shouldExpand = !isExpanded;
        setIsExpanded(shouldExpand);

        if (!shouldExpand || userQueries.length === 0) {
            return;
        }

        const unreadQueries = userQueries.filter(
            (query) => getQueryMessageCounts(query, "admin").unreadCount > 0,
        );

        if (unreadQueries.length === 0) {
            return;
        }

        try {
            const responses = await Promise.all(
                unreadQueries.map((query) => markQueryDelivered(query.id)),
            );
            responses.forEach((response) => {
                if (response.data?.query) {
                    onQueryUpdated(response.data.query as GroupedQuery);
                }
            });
            emitNotificationsRefresh();
        } catch (error) {
            console.error("Failed to mark queries delivered:", error);
        }
    };

    const handleExtendHoldSuccess = () => {
        onExtendHoldSuccess();
        setExtendHoldDialog({ open: false, stockRef: "" });
    };

    useEffect(() => {
        if (!autoExpand || !isExpanded || autoHandledRef.current) {
            return;
        }

        const unreadQueries = userQueries.filter(
            (query) => getQueryMessageCounts(query, "admin").unreadCount > 0,
        );

        if (unreadQueries.length === 0) {
            autoHandledRef.current = true;
            return;
        }

        autoHandledRef.current = true;

        void (async () => {
            try {
                const responses = await Promise.all(
                    unreadQueries.map((query) => markQueryDelivered(query.id)),
                );
                responses.forEach((response) => {
                    if (response.data?.query) {
                        onQueryUpdated(response.data.query as GroupedQuery);
                    }
                });
                emitNotificationsRefresh();
            } catch (error) {
                console.error("Failed to mark queries delivered:", error);
            }
        })();
    }, [autoExpand, isExpanded, onQueryUpdated, userQueries]);

    useEffect(() => {
        if (!isExpanded) {
            return;
        }

        const targetId = targetQueryId
            ? `admin-query-${targetQueryId}`
            : autoExpandCartThreadId
              ? `admin-cart-thread-${autoExpandCartThreadId}`
              : null;

        if (!targetId) {
            return;
        }

        document
            .getElementById(targetId)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [autoExpandCartThreadId, isExpanded, targetQueryId]);

    return (
        <React.Fragment>
            <tr
                className={`border-b border-gray-100 transition-colors ${isExpanded ? "bg-gray-50" : "hover:bg-gray-50/50"}`}
            >
                <td className="px-4 py-4 text-sm text-gray-600">
                    {serialNumber}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {fullName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {user.username}
                </td>
                <td
                    className="px-4 py-4 text-sm text-gray-600 max-w-[150px] truncate"
                    title={user.email}
                >
                    {user.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {customer?.phoneNumber || customer?.countryCode
                        ? `${customer?.countryCode || ""} ${customer?.phoneNumber || ""}`
                        : "N/A"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {user.companyName || business?.companyName || "-"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {business?.businessType || "Other"}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {business?.vatNumber || "-"}
                </td>
                <td
                    className="px-4 py-4 text-sm text-gray-600 max-w-[150px] truncate"
                    title={displayAddress}
                >
                    {displayAddress}
                </td>
                <td className="px-4 py-4 text-center">
                    <button
                        onClick={handleToggleExpanded}
                        className="p-1 rounded-md hover:bg-gray-200 text-gray-500 transition-all"
                    >
                        {isExpanded ? (
                            <ChevronUp size={18} />
                        ) : (
                            <ChevronDown size={18} />
                        )}
                    </button>
                </td>
            </tr>
            {isExpanded && (
                <tr>
                    <td
                        colSpan={10}
                        className="px-6 py-4 bg-gray-50 border-b border-gray-100"
                    >
                        <div className="space-y-6">
                            {/* Cart / Checkout Items Section */}
                            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                                    {isCheckout ? "Items in checkout" : "Items in cart"}{" "}
                                    ({cart.items?.length || 0})
                                </div>
                                <CartItemsTable
                                    items={cart.items || []}
                                    userId={user._id}
                                    onCartItemUpdated={(updatedItem) =>
                                        onCartItemUpdated(
                                            user._id,
                                            updatedItem,
                                        )
                                    }
                                    autoExpandDiamondId={autoExpandCartThreadId}
                                    adminApi={
                                        isCheckout
                                            ? CHECKOUT_ADMIN_API
                                            : CART_ADMIN_API
                                    }
                                />
                            </div>

                            {/* Hold Items Section (cart only) */}
                            {!isCheckout && (
                                <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                                        Holded Items
                                    </div>
                                    <InnerDiamondTable
                                        items={cart.holdItems}
                                        isHold={true}
                                        onExtendHold={handleExtendHold}
                                    />
                                </div>
                            )}

                            {/* Enquiries Section (cart only) */}
                            {!isCheckout && userQueries.length > 0 && (
                                <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                                        Enquiries ({userQueries.length})
                                    </div>
                                    <div className="p-4 space-y-4">
                                        {userQueries.map((query) => (
                                            <QueryItem
                                                key={query.id}
                                                query={query}
                                                onReplySuccess={onReplySuccess}
                                                domId={`admin-query-${query.id}`}
                                                highlight={targetQueryId === query.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            )}

            {/* Extend Hold Dialog */}
            <ExtendHoldDialog
                open={extendHoldDialog.open}
                onClose={() =>
                    setExtendHoldDialog({ open: false, stockRef: "" })
                }
                stockRef={extendHoldDialog.stockRef}
                userId={user._id}
                onSuccess={handleExtendHoldSuccess}
            />
        </React.Fragment>
    );
};

function EnquiryManagementContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetUserId = searchParams.get("user");
    const targetCartThreadId = searchParams.get("cartThread");
    const targetQueryId = searchParams.get("query");
    const targetStockRef = searchParams.get("stockRef");
    const [carts, setCarts] = useState<AdminCartData[]>([]);
    const [cartView, setCartView] = useState<"cart" | "checkout">("cart");
    const [queries, setQueries] = useState<AdminQueriesData[]>([]);
    const [loading, setLoading] = useState(true);
    const [queriesLoading, setQueriesLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        recordsPerPage: 10,
    });

    useEffect(() => {
        if (!targetStockRef) {
            return;
        }

        const normalizedStockRef = targetStockRef.trim().toUpperCase();
        setSearchInput((prev) =>
            prev === normalizedStockRef ? prev : normalizedStockRef,
        );
        setActiveSearch((prev) =>
            prev === normalizedStockRef ? prev : normalizedStockRef,
        );
        setPagination((prev) =>
            prev.currentPage === 1 ? prev : { ...prev, currentPage: 1 },
        );
    }, [targetStockRef]);

    useEffect(() => {
        if (!targetUserId && !targetCartThreadId && !targetQueryId) {
            return;
        }

        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete("user");
        nextParams.delete("cartThread");
        nextParams.delete("query");

        const nextQueryString = nextParams.toString();
        router.replace(
            nextQueryString
                ? `/enquiry-management?${nextQueryString}`
                : "/enquiry-management",
            { scroll: false },
        );
    }, [router, searchParams, targetCartThreadId, targetQueryId, targetUserId]);

    const fetchQueries = async () => {
        try {
            setQueriesLoading(true);
            const response = await getAllAdminQueries();
            if (response.success) {
                setQueries(response.data.groupedQueries);
            }
        } catch (error) {
            console.error("Failed to fetch queries:", error);
            toast.error("Failed to fetch enquiries");
        } finally {
            setQueriesLoading(false);
        }
    };

    const fetchData = async (
        page: number,
        stockRef?: string,
        background = false,
    ) => {
        try {
            if (!background) {
                setLoading(true);
            }
            const fetcher =
                cartView === "checkout" ? getAllCheckouts : getAllCarts;
            const response = await fetcher({
                page,
                limit: 10,
                stockRef: stockRef || undefined,
                sortBy: "updatedAt",
                sortOrder: "desc",
            });
            if (response.success) {
                setCarts(response.data);
                setPagination(response.pagination);

                // Show info message if search is active
                if (stockRef && response.data.length === 0) {
                    toast.info(
                        `No results found for stock reference: ${stockRef}`,
                    );
                } else if (stockRef && response.data.length > 0) {
                    toast.success(
                        `Found ${response.data.length} customer(s) with stock reference: ${stockRef}`,
                    );
                }
            }
        } catch (error) {
            console.error("Failed to fetch carts:", error);
            toast.error("Failed to fetch customer data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.currentPage, activeSearch);
        fetchQueries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.currentPage, activeSearch, cartView]);

    const handleSwitchCartView = (next: "cart" | "checkout") => {
        if (next === cartView) return;
        setCarts([]);
        setCartView(next);
        setPagination((prev) =>
            prev.currentPage === 1 ? prev : { ...prev, currentPage: 1 },
        );
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, currentPage: newPage }));
        }
    };

    const handleSearch = () => {
        const trimmedSearch = searchInput.trim();
        if (!trimmedSearch) {
            toast.error("Please enter a stock reference to search");
            return;
        }
        setActiveSearch(trimmedSearch);
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
    };

    const handleClearSearch = () => {
        setSearchInput("");
        setActiveSearch("");
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleReplySuccess = () => {
        fetchQueries();
        emitNotificationsRefresh();
    };

    const handleCartItemUpdated = (
        userId: string,
        updatedItem: CartItem,
    ) => {
        const updatedLineId = getCartLineId(updatedItem);

        setCarts((previousCarts) =>
            previousCarts.map((entry) => {
                if (entry.user._id !== userId) {
                    return entry;
                }

                return {
                    ...entry,
                    cart: {
                        ...entry.cart,
                        items: entry.cart.items.map((item) => {
                            if (getCartLineId(item) !== updatedLineId) {
                                return item;
                            }

                            if (
                                isMelleCartItem(updatedItem) &&
                                isMelleCartItem(item)
                            ) {
                                return { ...item, ...updatedItem };
                            }

                            if (
                                !isMelleCartItem(updatedItem) &&
                                !isMelleCartItem(item)
                            ) {
                                return {
                                    ...item,
                                    ...updatedItem,
                                    diamond:
                                        updatedItem.diamond || item.diamond,
                                };
                            }

                            return updatedItem;
                        }),
                    },
                };
            }),
        );
    };

    const handleExtendHoldSuccess = () => {
        fetchData(pagination.currentPage, activeSearch, true);
    };

    const handleQueryUpdated = (updatedQuery: GroupedQuery) => {
        setQueries((previousQueries) =>
            previousQueries.map((group) => ({
                ...group,
                queries: group.queries.map((query) =>
                    query.id === updatedQuery.id ? updatedQuery : query,
                ),
            })),
        );
    };

    // Calculate stats
    const totalEnquiries = pagination.totalRecords;
    const activeHolds = carts.reduce(
        (acc, curr) => acc + (curr.cart.holdItems?.length || 0),
        0,
    );
    const totalQueries = queries.reduce(
        (acc, curr) => acc + curr.queries.length,
        0,
    );
    const pendingQueries = queries.reduce(
        (acc, curr) =>
            acc + curr.queries.filter((q) => q.status === "pending").length,
        0,
    );

    return (
        <div className="bg-gray-50/50 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center">
                    <FileStack className="w-5 h-5 text-primary-purple" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Enquiry Management
                    </h1>
                    <p className="text-gray-500 font-lato text-sm mt-1">
                        Manage customer hold requests and diamond enquiries
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Customers"
                    count={
                        totalEnquiries < 10
                            ? `0${totalEnquiries}`
                            : totalEnquiries
                    }
                    desc={
                        activeSearch
                            ? "Matching search results"
                            : "All customer queries received"
                    }
                    icon={HelpCircle}
                />
                <StatCard
                    title="Active Holds"
                    count={activeHolds < 10 ? `0${activeHolds}` : activeHolds}
                    desc="Diamonds currently on hold"
                    icon={Clock}
                />
                <StatCard
                    title="Total Enquiries"
                    count={
                        totalQueries < 10 ? `0${totalQueries}` : totalQueries
                    }
                    desc="All diamond enquiries"
                    icon={CheckCircle}
                />
                <StatCard
                    title="Pending Replies"
                    count={
                        pendingQueries < 10
                            ? `0${pendingQueries}`
                            : pendingQueries
                    }
                    desc="Awaiting your response"
                    icon={XCircle}
                />
            </div>

            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by Stock Reference (e.g., CS20627)"
                            value={searchInput}
                            onChange={(e) =>
                                setSearchInput(e.target.value.toUpperCase())
                            }
                            onKeyPress={handleKeyPress}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent text-sm transition-all"
                            disabled={loading}
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                disabled={loading}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSearch}
                            disabled={!searchInput.trim() || loading}
                            className="bg-primary-purple hover:bg-primary-purple/90 text-white px-6 transition-all"
                        >
                            <Search className="w-4 h-4 mr-2" />
                            Search
                        </Button>
                        {activeSearch && (
                            <Button
                                onClick={handleClearSearch}
                                variant="outline"
                                disabled={loading}
                                className="border-gray-300 hover:bg-gray-50 transition-all"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Active Search Indicator */}
                {activeSearch && (
                    <div className="mt-3 flex items-center justify-between p-3 bg-primary-purple/5 rounded-lg border border-primary-purple/20">
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-primary-purple" />
                            <span className="text-sm text-gray-700">
                                Showing results for:
                            </span>
                            <span className="px-3 py-1 bg-primary-purple text-white rounded-full text-sm font-medium">
                                {activeSearch}
                            </span>
                        </div>
                        <button
                            onClick={handleClearSearch}
                            className="text-sm text-primary-purple hover:text-primary-purple/80 font-medium underline transition-colors"
                        >
                            View all customers
                        </button>
                    </div>
                )}
            </div>

            {/* Cart / Checkout view toggle */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                {(["cart", "checkout"] as const).map((view) => (
                    <button
                        key={view}
                        type="button"
                        onClick={() => handleSwitchCartView(view)}
                        disabled={loading}
                        className={`px-5 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 ${
                            cartView === view
                                ? "bg-[#26062b] text-white shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                        {view === "cart" ? "Cart" : "Checkout"}
                    </button>
                ))}
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#26062b] text-white text-sm">
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Sr
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Name
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Username
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Email
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Phone
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Company
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Business Type
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    VAT Number
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Address
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap text-center">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading || queriesLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-6 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-32 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-40 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-28 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-20 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-36 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="h-6 w-6 mx-auto bg-gray-200 rounded" />
                                        </td>
                                    </tr>
                                ))
                            ) : carts.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={10}
                                        className="px-6 py-12 text-center"
                                    >
                                        {activeSearch ? (
                                            <div className="flex flex-col items-center gap-3">
                                                <Search className="w-12 h-12 text-gray-400" />
                                                <div>
                                                    <p className="text-gray-900 font-medium mb-1">
                                                        No results found
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        No customer has diamond
                                                        with stock reference{" "}
                                                        &quot;{activeSearch}
                                                        &quot; in their
                                                        cart or hold
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={handleClearSearch}
                                                    variant="outline"
                                                    className="mt-2"
                                                >
                                                    View all customers
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <FileStack className="w-12 h-12 text-gray-400" />
                                                <p className="text-gray-500">
                                                    No enquiries found.
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                carts.map((data, index) => {
                                    const userQueryData = queries.find(
                                        (q) => q.email === data.user.email,
                                    );
                                    const isTargetUser =
                                        !!targetUserId &&
                                        targetUserId === data.user._id;
                                    return (
                                        <EnquiryRow
                                            key={`${data.cart._id}-${isTargetUser ? `${targetCartThreadId || ""}-${targetQueryId || ""}` : ""}`}
                                            data={data}
                                            index={index}
                                            currentPage={pagination.currentPage}
                                            limit={pagination.recordsPerPage}
                                            queriesData={userQueryData}
                                            onReplySuccess={handleReplySuccess}
                                            onCartItemUpdated={
                                                handleCartItemUpdated
                                            }
                                            onQueryUpdated={handleQueryUpdated}
                                            onExtendHoldSuccess={
                                                handleExtendHoldSuccess
                                            }
                                            autoExpand={
                                                isTargetUser &&
                                                (!!targetCartThreadId ||
                                                    !!targetQueryId)
                                            }
                                            autoExpandCartThreadId={
                                                isTargetUser
                                                    ? targetCartThreadId
                                                    : null
                                            }
                                            targetQueryId={
                                                isTargetUser ? targetQueryId : null
                                            }
                                            mode={cartView}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 0 && (
                    <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <button
                            onClick={() =>
                                handlePageChange(pagination.currentPage - 1)
                            }
                            disabled={pagination.currentPage === 1 || loading}
                            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from(
                                { length: Math.min(5, pagination.totalPages) },
                                (_, i) => i + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    disabled={loading}
                                    className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
                                        pagination.currentPage === page
                                            ? "bg-gray-600 text-white"
                                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() =>
                                handlePageChange(pagination.currentPage + 1)
                            }
                            disabled={
                                pagination.currentPage ===
                                    pagination.totalPages || loading
                            }
                            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function EnquiryManagementPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
            <EnquiryManagementContent />
        </Suspense>
    );
}
