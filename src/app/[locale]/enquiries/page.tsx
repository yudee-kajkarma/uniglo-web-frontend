"use client";

import React, { useEffect, useState, Suspense } from "react";
import {
    getUserQueries,
    markQueryDelivered,
} from "@/services/inquiryService";
import { Diamond } from "@/interface/diamondInterface";
import {
    MessageSquare,
    Clock,
    CheckCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getQueryMessageCounts } from "@/lib/queryMessages";
import { emitNotificationsRefresh } from "@/services/notificationService";

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

const EnquiryRow = ({
    query,
    autoExpand = false,
}: {
    query: GroupedQuery;
    autoExpand?: boolean;
}) => {
    const [localQuery, setLocalQuery] = useState(query);
    const [isExpanded, setIsExpanded] = useState(autoExpand);
    const autoHandledRef = React.useRef(false);
    const counts = getQueryMessageCounts(localQuery, "customer");

    useEffect(() => {
        setLocalQuery(query);
    }, [query]);

    useEffect(() => {
        if (
            !autoExpand ||
            !isExpanded ||
            autoHandledRef.current ||
            counts.unreadCount === 0
        ) {
            return;
        }

        autoHandledRef.current = true;

        void (async () => {
            try {
                const response = await markQueryDelivered(query.id);
                if (response.data?.query) {
                    setLocalQuery(response.data.query);
                }
                emitNotificationsRefresh();
            } catch (error) {
                console.error("Failed to mark query delivered:", error);
            }
        })();
    }, [autoExpand, counts.unreadCount, isExpanded, query.id]);

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

    const handleToggleThread = async () => {
        const shouldExpand = !isExpanded;
        setIsExpanded(shouldExpand);

        if (!shouldExpand || counts.unreadCount === 0) {
            return;
        }

        try {
            const response = await markQueryDelivered(query.id);
            if (response.data?.query) {
                setLocalQuery(response.data.query);
            }
            emitNotificationsRefresh();
        } catch (error) {
            console.error("Failed to mark query delivered:", error);
        }
    };

    return (
        <React.Fragment>
            <tr
                id={`enquiry-thread-${query.id}`}
                className={`border-b border-gray-100 transition-colors ${isExpanded ? "bg-gray-50" : "hover:bg-gray-50/50"}`}
            >
                <td className="px-4 py-4 text-sm">
                    <Link
                        href={`/inventory?view=${localQuery.diamondId.certiNo}`}
                        className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                    >
                        {localQuery.stockRef}
                    </Link>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {localQuery.diamondId.shape}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {localQuery.diamondId.weight}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {localQuery.diamondId.color}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {localQuery.diamondId.clarity}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                    {localQuery.diamondId.lab}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                    {localQuery.query}
                </td>
                <td className="px-4 py-4 text-sm">
                    {getStatusBadge(localQuery.status)}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDate(localQuery.createdAt)}
                </td>
                <td className="px-4 py-4 text-center">
                    <button
                        onClick={handleToggleThread}
                        className="relative inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 transition-all hover:bg-gray-200"
                    >
                        <MessageSquare size={18} />
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
                <tr>
                    <td
                        colSpan={10}
                        className="px-6 py-4 bg-gray-50 border-b border-gray-100"
                    >
                        <div className="space-y-4">
                            {/* Diamond Details */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <h4 className="font-semibold text-sm text-gray-700 mb-3">
                                    Diamond Details
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                    <div>
                                        <span className="text-gray-500">
                                            Stock Ref:
                                        </span>{" "}
                                        <Link
                        href={`/inventory?view=${localQuery.diamondId.certiNo}`}
                                            className="font-semibold text-[#26062b] hover:text-[#bb923a] underline transition-colors"
                                        >
                        {localQuery.stockRef}
                                        </Link>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Shape:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {localQuery.diamondId.shape}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Carats:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {localQuery.diamondId.weight}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Color:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {localQuery.diamondId.color}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Clarity:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {localQuery.diamondId.clarity}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Cut:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {localQuery.diamondId.cutGrade}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Lab:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {localQuery.diamondId.lab}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Cert No:
                                        </span>{" "}
                                        <span className="font-medium">
                                            {localQuery.diamondId.certiNo}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Price/Ct:
                                        </span>{" "}
                                        <span className="font-medium">
                                            $
                                            {localQuery.diamondId.pricePerCts.toLocaleString()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Total Price:
                                        </span>{" "}
                                        <span className="font-medium">
                                            $
                                            {(
                                                localQuery.diamondId.weight *
                                                localQuery.diamondId.pricePerCts
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Your Query */}
                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                                    Your Query:
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {localQuery.query}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Submitted on {formatDate(localQuery.createdAt)}
                                </p>
                            </div>

                            {/* Admin Reply */}
                            {localQuery.adminReply && (
                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <h4 className="font-semibold text-sm text-green-800 mb-2">
                                        Admin Reply:
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                        {localQuery.adminReply}
                                    </p>
                                    {localQuery.repliedAt && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            Replied on{" "}
                                            {formatDate(localQuery.repliedAt)}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Pending Status Message */}
                            {localQuery.status === "pending" &&
                                !localQuery.adminReply && (
                                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                        <p className="text-sm text-yellow-800 flex items-center gap-2">
                                            <Clock size={16} />
                                            Your enquiry is pending. We&apos;ll
                                            respond soon.
                                        </p>
                                    </div>
                                )}
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

function UserEnquiriesPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetQueryId = searchParams.get("query");
    const [queries, setQueries] = useState<GroupedQuery[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const response = await getUserQueries();
            if (response.success) {
                setQueries(response.data.queries);
            }
        } catch (error: unknown) {
            console.error("Failed to fetch queries:", error);
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to fetch your enquiries";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    useEffect(() => {
        if (!targetQueryId) {
            return;
        }

        router.replace("/enquiries", { scroll: false });

        document
            .getElementById(`enquiry-thread-${targetQueryId}`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [queries, router, targetQueryId]);

    // Calculate stats
    const totalQueries = queries.length;
    const pendingQueries = queries.filter((q) => q.status === "pending").length;
    const repliedQueries = queries.filter((q) => q.status === "replied").length;

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary-purple" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Enquiries
                    </h1>
                    <p className="text-gray-500 font-lato text-sm mt-1">
                        View and track your diamond enquiries
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Total Enquiries"
                    count={
                        totalQueries < 10 ? `0${totalQueries}` : totalQueries
                    }
                    desc="All your diamond enquiries"
                    icon={MessageSquare}
                />
                <StatCard
                    title="Pending Replies"
                    count={
                        pendingQueries < 10
                            ? `0${pendingQueries}`
                            : pendingQueries
                    }
                    desc="Awaiting admin response"
                    icon={Clock}
                />
                <StatCard
                    title="Replied"
                    count={
                        repliedQueries < 10
                            ? `0${repliedQueries}`
                            : repliedQueries
                    }
                    desc="Enquiries with responses"
                    icon={CheckCircle}
                />
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#26062b] text-white text-sm">
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Stock Ref
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Shape
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Carat
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Color
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Clarity
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Lab
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Query
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Status
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap">
                                    Date
                                </th>
                                <th className="px-4 py-3 font-normal whitespace-nowrap text-center">
                                    Messages
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-20 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-12 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-12 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-8 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-12 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-12 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-32 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-6 w-16 bg-gray-200 rounded-full" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="h-4 w-24 bg-gray-200 rounded" />
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="h-6 w-6 mx-auto bg-gray-200 rounded" />
                                        </td>
                                    </tr>
                                ))
                            ) : queries.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={10}
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                        <p>No enquiries found.</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Submit an enquiry from the diamond
                                            details page.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                queries.map((query) => (
                                    <EnquiryRow
                                        key={`${query.id}-${targetQueryId === query.id ? "target" : "default"}`}
                                        query={query}
                                        autoExpand={targetQueryId === query.id}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default function UserEnquiriesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-primary-yellow-1">Loading...</div></div>}>
            <UserEnquiriesPageContent />
        </Suspense>
    );
}
