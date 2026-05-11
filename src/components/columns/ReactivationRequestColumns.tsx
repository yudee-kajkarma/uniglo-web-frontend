import { PendingUser } from "@/services/adminServices";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { ActionButtonWithTooltip } from "@/components/ui/actionButtonWithTooltip";
import { Column } from "./PendingUserColumns";

export const getReactivationRequestColumns = (
    onApprove: (user: PendingUser) => void,
    onReject: (user: PendingUser) => void,
): Column<PendingUser>[] => [
    {
        key: "username",
        header: "Username",
        cellClassName: () => "font-semibold text-gray-900",
    },
    { key: "email", header: "Email" },
    {
        key: "contactName",
        header: "Contact Name",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData?.firstName} {row.customerData?.lastName}
            </span>
        ),
    },
    {
        key: "companyName",
        header: "Company",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData?.businessInfo.companyName || row.companyName}
            </span>
        ),
    },
    {
        key: "phoneNumber",
        header: "Phone",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData?.countryCode} {row.customerData?.phoneNumber}
            </span>
        ),
    },
    {
        key: "businessType",
        header: "Business Type",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData?.businessInfo.businessType || "N/A"}
            </span>
        ),
    },
    {
        key: "location",
        header: "Location",
        render: (row: PendingUser) => (
            <span className="text-gray-800">
                {row.customerData?.address.city},{" "}
                {row.customerData?.address.country}
            </span>
        ),
    },
    {
        key: "updatedAt",
        header: "Requested At",
        render: (row: PendingUser) => (
            <span className="text-gray-700">
                {new Date(row.updatedAt).toLocaleDateString()}
            </span>
        ),
    },
    {
        key: "status",
        header: "Status",
        render: () => (
            <Badge className="bg-orange-100 text-orange-700 text-xs rounded-[2] px-2 py-1">
                REACTIVATION REQUESTED
            </Badge>
        ),
    },
    {
        key: "actions",
        header: "Actions",
        render: (row: PendingUser) => (
            <div className="flex gap-2">
                <ActionButtonWithTooltip
                    icon={<Check className="w-4 h-4" />}
                    tooltip="Approve Reactivation"
                    onClick={() => onApprove(row)}
                    colorClass="text-green-600 hover:text-green-700"
                />
                <ActionButtonWithTooltip
                    icon={<X className="w-4 h-4" />}
                    tooltip="Reject Reactivation"
                    onClick={() => onReject(row)}
                    colorClass="text-red-600 hover:text-red-700"
                />
            </div>
        ),
    },
];
