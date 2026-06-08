"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MelleDiamond } from "@/interface/melleDiamondInterface";

export interface MelleCartLineInput {
    melleId: string;
    requestedCarat: number;
}

interface MelleCartCaratDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    diamonds: MelleDiamond[];
    onConfirm: (items: MelleCartLineInput[]) => Promise<void>;
}

type CaratFormState = Record<string, string>;

export function MelleCartCaratDialog({
    open,
    onOpenChange,
    diamonds,
    onConfirm,
}: MelleCartCaratDialogProps) {
    const [carats, setCarats] = useState<CaratFormState>({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        const initial: CaratFormState = {};
        for (const d of diamonds) {
            initial[d._id] = "";
        }
        setCarats(initial);
    }, [open, diamonds]);

    const validate = (): MelleCartLineInput[] | null => {
        const items: MelleCartLineInput[] = [];

        for (const d of diamonds) {
            const raw = carats[d._id]?.trim();
            const value = Number(raw);
            const available = d.availableCarat ?? 100;

            if (!raw || !Number.isFinite(value) || value <= 0) {
                toast.error(
                    `Enter a valid carat amount for ${d.stockId || d.shape}`,
                );
                return null;
            }
            if (value > available) {
                toast.error(
                    `${d.stockId}: requested carat cannot exceed available (${available} ct)`,
                );
                return null;
            }

            items.push({ melleId: d._id, requestedCarat: value });
        }

        return items;
    };

    const handleSubmit = async () => {
        const items = validate();
        if (!items) return;

        try {
            setSubmitting(true);
            await onConfirm(items);
            onOpenChange(false);
        } catch (e: unknown) {
            const message =
                typeof e === "string"
                    ? e
                    : e instanceof Error
                      ? e.message
                      : "Failed to add melee diamonds to cart";
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Requested carat</DialogTitle>
                    <DialogDescription>
                        Enter how many carats you need for each selected melee
                        diamond.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2 max-h-[50vh] overflow-y-auto pr-1">
                    {diamonds.map((d) => {
                        const available = d.availableCarat ?? 100;
                        return (
                            <div
                                key={d._id}
                                className="rounded-md border border-gray-200 p-3 space-y-2"
                            >
                                <div className="text-sm font-medium text-gray-900">
                                    {d.stockId} — {d.shape} {d.color}{" "}
                                    {d.clarity}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Available: {available.toFixed(2)} ct
                                </p>
                                <div className="space-y-1">
                                    <Label htmlFor={`carat-${d._id}`}>
                                        Requested carat (ct)
                                    </Label>
                                    <Input
                                        id={`carat-${d._id}`}
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        max={available}
                                        placeholder="e.g. 5"
                                        value={carats[d._id] ?? ""}
                                        onChange={(e) =>
                                            setCarats((prev) => ({
                                                ...prev,
                                                [d._id]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        );
                    })}
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
                        disabled={submitting || diamonds.length === 0}
                        className="bg-primary-purple2 hover:bg-primary-purple2/90 text-white"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Adding...
                            </>
                        ) : (
                            "Add to cart"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
