import { CartItem, CartItemMessage } from "@/interface/diamondInterface";

export const getCartItemMessages = (item: CartItem): CartItemMessage[] => {
    const messages = [...(item.messages || [])];

    if (
        item.adminReply &&
        !messages.some((message) => message.message === item.adminReply)
    ) {
        messages.push({
            id: "legacy",
            message: item.adminReply,
            sentAt: item.repliedAt || item.addedAt,
            sentBy: item.repliedBy,
            senderRole: "admin",
            deliveredToCustomerAt: item.adminReplyDeliveredToCustomerAt,
        });
    }

    return messages.sort(
        (left, right) =>
            new Date(left.sentAt).getTime() - new Date(right.sentAt).getTime(),
    );
};

export const formatCartMessageDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const getCartMessageAuthorLabel = (
    message: CartItemMessage,
    viewerRole: "admin" | "customer",
) => {
    if (message.senderRole === "admin") {
        return viewerRole === "admin" ? "You" : "Admin";
    }

    return viewerRole === "customer" ? "You" : "Customer";
};

export const canModifyCartMessage = (
    message: CartItemMessage,
    viewerRole: "admin" | "customer",
) => {
    if (message.senderRole === "admin") {
        return viewerRole === "admin";
    }

    return viewerRole === "customer";
};

export const getCartMessageCounts = (
    item: CartItem,
    viewerRole: "admin" | "customer",
) => {
    const messages = getCartItemMessages(item);
    const unreadCount = messages.filter((message) => {
        if (viewerRole === "admin") {
            return (
                message.senderRole === "customer" && !message.deliveredToAdminAt
            );
        }

        return (
            message.senderRole === "admin" && !message.deliveredToCustomerAt
        );
    }).length;

    return {
        unreadCount,
        totalCount: messages.length,
    };
};
