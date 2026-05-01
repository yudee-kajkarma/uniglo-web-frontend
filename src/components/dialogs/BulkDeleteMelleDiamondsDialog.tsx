"use client";

import React, { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
} from "@/components/ui/alert-dialog";
import { bulkDeleteMelleDiamonds } from "@/services/melleDiamondService";

interface BulkDeleteMelleDiamondsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    ids: string[];
    onSuccess: (deletedIds: string[]) => void;
}

export function BulkDeleteMelleDiamondsDialog({
    open,
    onOpenChange,
    ids,
    onSuccess,
}: BulkDeleteMelleDiamondsDialogProps) {
    const [deleting, setDeleting] = useState(false);
    const count = ids.length;

    const handleConfirm = async () => {
        if (count === 0) return;
        try {
            setDeleting(true);
            const result = await bulkDeleteMelleDiamonds(ids);
            const n = result.deletedCount ?? count;
            toast.success(
                `${n} melee diamond${n === 1 ? "" : "s"} deleted`,
            );
            onSuccess(ids);
            onOpenChange(false);
        } catch (e: any) {
            toast.error(
                e?.response?.data?.message ||
                    e?.message ||
                    "Failed to delete melee diamonds",
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <Trash2 className="text-red-600" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                        Delete {count} selected melee diamond
                        {count === 1 ? "" : "s"}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        These records will be permanently removed. This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }}
                        disabled={deleting || count === 0}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-sm"
                    >
                        {deleting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Deleting...
                            </>
                        ) : (
                            `Delete ${count}`
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
