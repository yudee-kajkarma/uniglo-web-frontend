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
import { deleteMelleDiamond } from "@/services/melleDiamondService";
import { MelleDiamond } from "@/interface/melleDiamondInterface";

interface DeleteMelleDiamondDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    diamond: MelleDiamond | null;
    onSuccess: (deletedId: string) => void;
}

export function DeleteMelleDiamondDialog({
    open,
    onOpenChange,
    diamond,
    onSuccess,
}: DeleteMelleDiamondDialogProps) {
    const [deleting, setDeleting] = useState(false);

    const handleConfirm = async () => {
        if (!diamond) return;
        try {
            setDeleting(true);
            await deleteMelleDiamond(diamond._id);
            toast.success("Melee diamond deleted");
            onSuccess(diamond._id);
            onOpenChange(false);
        } catch (e: any) {
            toast.error(
                e?.response?.data?.message ||
                    e?.message ||
                    "Failed to delete melee diamond",
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
                        Delete this melee diamond?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {diamond
                            ? `Stock ID ${diamond.stockId} will be permanently removed. This cannot be undone.`
                            : "This action cannot be undone."}
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
                        disabled={deleting}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-sm"
                    >
                        {deleting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
