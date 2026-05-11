"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { importMelleDiamonds } from "@/services/melleDiamondService";
import { MelleFilterOptions } from "@/interface/melleDiamondInterface";

interface MelleDiamondImportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    options: MelleFilterOptions | null;
    onSuccess?: () => void;
}

const ACCEPT =
    ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";

export function MelleDiamondImportDialog({
    open,
    onOpenChange,
    options,
    onSuccess,
}: MelleDiamondImportDialogProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isLab, setIsLab] = useState<"true" | "false">("false");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) {
            setFile(null);
            setIsLab("false");
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }, [open]);

    const categories = options?.melleCategories ?? [];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0] ?? null;
        setFile(picked);
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Please select an Excel file to import");
            return;
        }

        try {
            setSubmitting(true);
            const result = await importMelleDiamonds({
                file,
                isLab: isLab === "true",
            });
            const summary = [
                result.inserted !== undefined && `${result.inserted} inserted`,
                result.updated !== undefined && `${result.updated} updated`,
                result.skipped !== undefined && `${result.skipped} skipped`,
            ]
                .filter(Boolean)
                .join(", ");
            toast.success(
                summary
                    ? `Import complete — ${summary}`
                    : "Melee diamonds imported successfully",
            );
            onSuccess?.();
            onOpenChange(false);
        } catch (e: any) {
            toast.error(
                e?.response?.data?.message ||
                    e?.message ||
                    "Failed to import melee diamonds",
            );
        } finally {
            setSubmitting(false);
        }
    };

    const withFallback = (serverValues: string[], current: string) => {
        const set = new Set(serverValues);
        if (current && !set.has(current)) set.add(current);
        return Array.from(set);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Import Melee Diamonds</DialogTitle>
                    <DialogDescription>
                        Upload an Excel file (.xlsx) of melee diamonds. Type and
                        category apply to every row in the file.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1">
                        <Label>Excel File *</Label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={ACCEPT}
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-primary-purple2 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-primary-purple2/90 cursor-pointer"
                        />
                        {file && (
                            <p className="text-xs text-gray-500 truncate">
                                {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Type *</Label>
                        <Select
                            value={isLab}
                            onValueChange={(v) =>
                                setIsLab(v as "true" | "false")
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="false">Natural</SelectItem>
                                <SelectItem value="true">Lab</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={submitting || !file}
                        className="bg-primary-purple2 hover:bg-primary-purple2/90 text-white"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Importing...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-2" />
                                Import
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
