import apiClient from "@/lib/api";

export interface NotificationItemSummary {
    id: string;
    type: "cart" | "enquiry";
    title: string;
    subtitle: string;
    href: string;
    createdAt: string;
    unreadCount: number;
    totalMessages: number;
    stockRef?: string;
}

export interface NotificationSummaryData {
    unreadCount: number;
    totalMessages: number;
    items: NotificationItemSummary[];
}

export interface NotificationSummaryResponse {
    success: boolean;
    message: string;
    data: NotificationSummaryData;
}

export const getNotifications = async (): Promise<NotificationSummaryResponse> => {
    const response =
        await apiClient.get<NotificationSummaryResponse>("/diamonds/notifications");
    return response.data;
};

export const emitNotificationsRefresh = () => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("notifications:refresh"));
    }
};
