import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MelleColumn } from "@/components/columns/MelleDiamondColumns";

interface MelleDataTableProps<T extends { _id: string }> {
    data: T[];
    columns: MelleColumn<T>[];
    enableSelection?: boolean;
    selected?: T[];
    onSelectionChange?: (rows: T[]) => void;
}

const getTextContent = (content: React.ReactNode): string => {
    if (typeof content === "string") return content;
    if (typeof content === "number") return content.toString();
    if (React.isValidElement(content)) {
        const el = content as React.ReactElement<{
            children?: React.ReactNode;
        }>;
        return getTextContent(el.props.children);
    }
    if (Array.isArray(content)) return content.map(getTextContent).join("");
    return "";
};

function MelleDataTable<T extends { _id: string }>({
    data,
    columns,
    enableSelection = false,
    selected = [],
    onSelectionChange,
}: MelleDataTableProps<T>) {
    const allSelected = data.length > 0 && selected.length === data.length;
    const someSelected = selected.length > 0 && selected.length < data.length;

    const toggleSelectAll = () => {
        if (!onSelectionChange) return;
        onSelectionChange(allSelected ? [] : [...data]);
    };

    const toggleRow = (row: T) => {
        if (!onSelectionChange) return;
        const isSelected = selected.some((r) => r._id === row._id);
        onSelectionChange(
            isSelected
                ? selected.filter((r) => r._id !== row._id)
                : [...selected, row],
        );
    };

    return (
        <div
            className="w-full h-full overflow-auto rounded"
            data-slot="table-container"
        >
            <table data-slot="table" className="min-w-[70vh] w-full text-left">
                <thead className="sticky top-0 z-10 bg-primary-purple-dark border-b border-gray-200">
                    <tr className="data-[state=selected]:bg-muted border-b transition-colors">
                        {enableSelection && (
                            <th className="p-2 pl-5 h-10 text-left table-10px align-middle whitespace-nowrap font-semibold text-white">
                                <Checkbox
                                    className="border-white"
                                    checked={
                                        allSelected
                                            ? true
                                            : someSelected
                                              ? "indeterminate"
                                              : false
                                    }
                                    onCheckedChange={toggleSelectAll}
                                />
                            </th>
                        )}
                        {columns.map((col) => (
                            <th
                                key={col.key.toString()}
                                className="p-2 pl-5 h-10 text-left table-10px align-middle whitespace-nowrap text-sm font-semibold text-white cursor-pointer"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    columns.length + (enableSelection ? 1 : 0)
                                }
                                className="text-center p-4 text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr
                                key={row._id}
                                className="cursor-pointer bg-white even:bg-primary-yellow-1/10 transition-colors"
                            >
                                {enableSelection && (
                                    <td className="p-2 pl-5 border-b">
                                        <Checkbox
                                            checked={selected.some(
                                                (r) => r._id === row._id,
                                            )}
                                            onCheckedChange={() =>
                                                toggleRow(row)
                                            }
                                        />
                                    </td>
                                )}
                                {columns.map((col) => {
                                    const cellContent = col.render
                                        ? col.render(row)
                                        : ((row as any)[
                                              col.key as string
                                          ] as React.ReactNode);
                                    const text = getTextContent(cellContent);
                                    const shouldShowTooltip = text.length > 30;
                                    const extra = col.cellClassName?.(row) || "";
                                    const className = `p-2 pl-5 whitespace-nowrap border-b hover:bg-gray-50/60 font-lato text-gray-800 text-sm ${extra}`;

                                    return (
                                        <td
                                            key={col.key.toString()}
                                            className={className}
                                            data-slot="table-cell"
                                        >
                                            {shouldShowTooltip ? (
                                                <TooltipProvider
                                                    delayDuration={300}
                                                >
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="truncate max-w-[200px]">
                                                                {cellContent ??
                                                                    "N/A"}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            side="top"
                                                            className="max-w-sm"
                                                        >
                                                            <p className="text-sm">
                                                                {text}
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ) : (
                                                (cellContent ?? (
                                                    <span className="text-gray-800">
                                                        N/A
                                                    </span>
                                                ))
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MelleDataTable;
