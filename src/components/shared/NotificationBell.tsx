"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, FileStack, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    getNotifications,
    NotificationItemSummary,
} from "@/services/notificationService";
import { useAuth } from "@/context/AuthContext";

interface NotificationBellProps {
    className?: string;
}

const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function NotificationBell({ className }: NotificationBellProps) {
    const pathname = usePathname();
    const { isAuthenticated, loading } = useAuth();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItemSummary[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);

    const loadNotifications = useCallback(async () => {
        if (!isAuthenticated) {
            setNotifications([]);
            setUnreadCount(0);
            setTotalMessages(0);
            return;
        }

        try {
            setIsLoading(true);
            const response = await getNotifications();
            setNotifications(response.data.items);
            setUnreadCount(response.data.unreadCount);
            setTotalMessages(response.data.totalMessages);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            loadNotifications();
        }
    }, [loading, isAuthenticated, pathname, loadNotifications]);

    useEffect(() => {
        const handleRefresh = () => {
            loadNotifications();
        };

        window.addEventListener("notifications:refresh", handleRefresh);
        return () => {
            window.removeEventListener("notifications:refresh", handleRefresh);
        };
    }, [loadNotifications]);

    const iconLabel = useMemo(() => {
        if (unreadCount > 0) {
            return `${unreadCount} unread notifications`;
        }

        return "Notifications";
    }, [unreadCount]);

    if (loading || !isAuthenticated) {
        return null;
    }

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (nextOpen) {
                    loadNotifications();
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "relative h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white",
                        className,
                    )}
                    aria-label={iconLabel}
                >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96 p-0">
                <PopoverHeader className="border-b border-gray-200 p-4">
                    <PopoverTitle className="flex items-center justify-between text-base">
                        <span>Notifications</span>
                        <span className="text-xs font-normal text-gray-500">
                            Unread {unreadCount} / Total {totalMessages}
                        </span>
                    </PopoverTitle>
                </PopoverHeader>

                <div className="max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8 text-gray-500">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading notifications...
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-gray-500">
                            No notifications yet.
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <Link
                                key={notification.id}
                                href={notification.href}
                                onClick={() => setOpen(false)}
                                className="flex items-start gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50"
                            >
                                <div className="mt-0.5 rounded-full bg-primary-purple/10 p-2 text-primary-purple">
                                    {notification.type === "cart" ? (
                                        <MessageSquare className="h-4 w-4" />
                                    ) : (
                                        <FileStack className="h-4 w-4" />
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <p className="truncate text-sm font-medium text-gray-900">
                                            {notification.title}
                                        </p>
                                        <span className="shrink-0 text-[10px] text-gray-400">
                                            {formatNotificationTime(
                                                notification.createdAt,
                                            )}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {notification.subtitle}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                                            Total {notification.totalMessages}
                                        </span>
                                        <span
                                            className={cn(
                                                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                                                notification.unreadCount > 0
                                                    ? "bg-red-50 text-red-600"
                                                    : "bg-emerald-50 text-emerald-600",
                                            )}
                                        >
                                            Unread {notification.unreadCount}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
