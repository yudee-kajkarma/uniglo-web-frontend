// components/columns/MelleDiamondColumns.tsx
import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUp, ArrowDown, ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    MelleDiamond,
    PublicMelleDiamond,
} from "@/interface/melleDiamondInterface";

export interface MelleColumn<T> {
    key: keyof T | string;
    header: React.ReactNode;
    render?: (row: T) => React.ReactNode;
    cellClassName?: (row: T) => string;
    sortable?: boolean;
}

const SortableHeader = ({
    label,
    columnKey,
    currentSortBy,
    currentSortOrder,
    onSort,
}: {
    label: string;
    columnKey: string;
    currentSortBy: string;
    currentSortOrder: "asc" | "desc";
    onSort: (key: string) => void;
}) => {
    const isActive = currentSortBy === columnKey;
    return (
        <button
            onClick={() => onSort(columnKey)}
            className="flex items-center gap-1 cursor-pointer"
        >
            <span>{label}</span>
            {isActive ? (
                currentSortOrder === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                ) : (
                    <ArrowDown className="h-4 w-4" />
                )
            ) : (
                <ArrowUpDown className="h-4 w-4 opacity-40" />
            )}
        </button>
    );
};

const formatRange = (min?: string, max?: string) => {
    const lo = min?.trim();
    const hi = max?.trim();
    if (!lo && !hi) return "N/A";
    if (lo && hi && lo !== hi) return `${lo} – ${hi}`;
    return lo || hi || "N/A";
};

const formatMeasurement = (row: MelleDiamond | PublicMelleDiamond) => {
    const len = row.measurementLength?.trim();
    const breadth = row.measurementBreadth?.trim();
    if (len || breadth) {
        if (len && breadth) return `${len} × ${breadth}`;
        return len || breadth || "N/A";
    }
    return formatRange(row.measurementMin, row.measurementMax);
};

export interface MelleAdminHandlers {
    onEdit: (diamond: MelleDiamond) => void;
    onDelete: (diamond: MelleDiamond) => void;
}

export const getMelleDiamondColumns = (
    onViewDetails: (diamond: MelleDiamond) => void,
    onSort: (columnKey: string) => void,
    currentSortBy: string,
    currentSortOrder: "asc" | "desc",
    adminHandlers?: MelleAdminHandlers,
): MelleColumn<MelleDiamond>[] => [
    {
        key: "stockId",
        header: "Stock ID",
        render: (row) => (
            <div
                className="flex items-center gap-2 cursor-pointer text-primary-purple hover:underline hover:text-primary-yellow-1 font-bold p-0"
                onClick={() => onViewDetails(row)}
            >
                {row.stockId}
            </div>
        ),
    },
    { key: "shape", header: "Shape" },
    {
        key: "image",
        header: "Image",
        render: (row) => {
            const url = row.images?.[0];
            if (!url) return "—";
            return (
                <div className="relative w-10 h-10 rounded overflow-hidden border border-gray-200">
                    <Image
                        src={url}
                        alt={`${row.shape} preview`}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            );
        },
    },
    { key: "color", header: "Color" },
    { key: "clarity", header: "Clarity" },
    { key: "cut", header: "Cut" },
    {
        key: "avgPtr",
        header: (
            <SortableHeader
                label="Avg Ptr"
                columnKey="avgPtr"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) =>
            row.avgPtr !== undefined ? row.avgPtr.toFixed(3) : "N/A",
    },
    {
        key: "carat",
        header: (
            <SortableHeader
                label="Carat"
                columnKey="carat"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) =>
            row.carat !== undefined ? row.carat.toFixed(5) : "N/A",
    },
    {
        key: "availableCarat",
        header: (
            <SortableHeader
                label="Available Ct."
                columnKey="availableCarat"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) => (row.availableCarat ?? 100).toFixed(2),
    },
    {
        key: "sieve",
        header: "Sieve",
        render: (row) => formatRange(row.sieveMin, row.sieveMax),
    },
    {
        key: "measurement",
        // measurementMin/measurementMax are stored as strings so a direct
        // sort would be lexicographic ("10.00" < "2.00"). Carat is the
        // numeric proxy the rows are bucketed by, so we sort on that and
        // get the expected visual order in the measurement column.
        header: (
            <SortableHeader
                label="Measurement (mm)"
                columnKey="carat"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) => formatMeasurement(row),
    },
    // {
    //     key: "melleCategory",
    //     header: "Category",
    //     render: (row) => row.melleCategory || "N/A",
    // },
    {
        key: "isLab",
        header: "Type",
        render: (row) =>
            row.isLab
                ? row.labType
                    ? `Lab (${row.labType})`
                    : "Lab"
                : "Natural",
    },
    {
        key: "price",
        header: (
            <SortableHeader
                label="Price/Ct."
                columnKey="price"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) =>
            row.price !== undefined ? `$${row.price.toLocaleString()}` : "N/A",
    },
    {
        key: "createdAt",
        header: (
            <SortableHeader
                label="Added"
                columnKey="createdAt"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) =>
            row.createdAt
                ? new Date(row.createdAt).toLocaleDateString()
                : "N/A",
    },
    ...(adminHandlers
        ? [
              {
                  key: "actions",
                  header: "Actions",
                  render: (row: MelleDiamond) => (
                      <div
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                      >
                          <Button
                              size="sm"
                              variant="outline"
                              onClick={() => adminHandlers.onEdit(row)}
                              className="h-7 px-2 text-xs border-primary-purple text-primary-purple hover:bg-primary-purple/10"
                          >
                              <Pencil className="w-3 h-3 mr-1" />
                              {/* Edit */}
                          </Button>
                          <Button
                              size="sm"
                              variant="outline"
                              onClick={() => adminHandlers.onDelete(row)}
                              className="h-7 px-2 text-xs border-red-400 text-red-600 hover:bg-red-50"
                          >
                              <Trash2 className="w-3 h-3 mr-1" />
                              {/* Delete */}
                          </Button>
                      </div>
                  ),
              } as MelleColumn<MelleDiamond>,
          ]
        : []),
];

export const getPublicMelleDiamondColumns = (
    onViewDetails: (diamond: PublicMelleDiamond) => void,
    onSort: (columnKey: string) => void,
    currentSortBy: string,
    currentSortOrder: "asc" | "desc",
): MelleColumn<PublicMelleDiamond>[] => [
    {
        key: "stockId",
        header: "Stock ID",
        render: (row) => (
            <div
                className="flex items-center gap-2 cursor-pointer text-primary-purple hover:underline hover:text-primary-yellow-1 font-bold p-0"
                onClick={() => onViewDetails(row)}
            >
                {row.stockId}
            </div>
        ),
    },
    { key: "shape", header: "Shape" },
    {
        key: "image",
        header: "Image",
        render: (row) => {
            const url = row.images?.[0];
            if (!url) return "—";
            return (
                <div className="relative w-10 h-10 rounded overflow-hidden border border-gray-200">
                    <Image
                        src={url}
                        alt={`${row.shape} preview`}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            );
        },
    },
    { key: "color", header: "Color" },
    { key: "clarity", header: "Clarity" },
    { key: "cut", header: "Cut" },
    {
        key: "avgPtr",
        header: (
            <SortableHeader
                label="Avg Ptr"
                columnKey="avgPtr"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) =>
            row.avgPtr !== undefined ? row.avgPtr.toFixed(3) : "N/A",
    },
    {
        key: "carat",
        header: (
            <SortableHeader
                label="Carat"
                columnKey="carat"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) =>
            row.carat !== undefined ? row.carat.toFixed(5) : "N/A",
    },
    {
        key: "availableCarat",
        header: (
            <SortableHeader
                label="Available Ct."
                columnKey="availableCarat"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) => (row.availableCarat ?? 100).toFixed(2),
    },
    {
        key: "sieve",
        header: "Sieve",
        render: (row) => formatRange(row.sieveMin, row.sieveMax),
    },
    {
        key: "measurement",
        header: (
            <SortableHeader
                label="Measurement (mm)"
                columnKey="carat"
                currentSortBy={currentSortBy}
                currentSortOrder={currentSortOrder}
                onSort={onSort}
            />
        ),
        sortable: true,
        render: (row) => formatMeasurement(row),
    },
    // {
    //     key: "melleCategory",
    //     header: "Category",
    //     render: (row) => row.melleCategory || "N/A",
    // },
    {
        key: "isLab",
        header: "Type",
        render: (row) =>
            row.isLab
                ? row.labType
                    ? `Lab (${row.labType})`
                    : "Lab"
                : "Natural",
    },
    {
        key: "price",
        header: "Price",
        render: () => (
            <div className="flex items-center gap-2 cursor-pointer text-primary-purple hover:underline hover:text-primary-yellow-1 font-bold p-0">
                <Link href="/login">Login to view price</Link>
            </div>
        ),
    },
];
