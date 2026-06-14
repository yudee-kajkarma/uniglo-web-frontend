"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
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

// Whether the user enters total carats or a number of pieces. Either way the
// backend is always sent a `requestedCarat`; piece input is converted using
// the stone's per-piece carat weight before submission.
type EntryMode = "carat" | "piece";

const formatUsd = (value: number) =>
    value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

// Per-piece prices are tiny for melee (price/ct × a fraction of a carat), so
// keep extra precision rather than rounding to whole cents.
const formatUsdPrecise = (value: number) =>
    value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    });

const formatCarat = (value: number) =>
    value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 5,
    });

const formatPieces = (value: number) => Math.round(value).toLocaleString();

export function MelleCartCaratDialog({
    open,
    onOpenChange,
    diamonds,
    onConfirm,
}: MelleCartCaratDialogProps) {
    const [mode, setMode] = useState<EntryMode>("carat");
    const [inputs, setInputs] = useState<CaratFormState>({});
    const [submitting, setSubmitting] = useState(false);
    const wasOpen = useRef(false);

    // Reset only when the dialog transitions from closed -> open. The parent
    // recreates the `diamonds` array on every render, so keying this off
    // `diamonds` would wipe the user's mode/inputs mid-edit (e.g. on submit).
    useEffect(() => {
        if (open && !wasOpen.current) {
            const initial: CaratFormState = {};
            for (const d of diamonds) {
                initial[d._id] = "";
            }
            setInputs(initial);
            setMode("carat");
        }
        wasOpen.current = open;
    }, [open, diamonds]);

    // Switch entry mode, converting any values already typed so the displayed
    // quantity stays consistent (carats <-> pieces via the per-piece weight).
    const switchMode = (next: EntryMode) => {
        if (next === mode) return;
        setInputs((prev) => {
            const converted: CaratFormState = {};
            for (const d of diamonds) {
                const raw = prev[d._id]?.trim();
                const value = Number(raw);
                const perPiece = d.carat ?? 0;
                if (
                    !raw ||
                    !Number.isFinite(value) ||
                    value <= 0 ||
                    perPiece <= 0
                ) {
                    converted[d._id] = prev[d._id] ?? "";
                    continue;
                }
                converted[d._id] =
                    next === "piece"
                        ? String(Math.round(value / perPiece))
                        : String(Number((value * perPiece).toPrecision(12)));
            }
            return converted;
        });
        setMode(next);
    };

    // Derive everything the UI needs for a line from its raw input + the mode.
    const lines = diamonds.map((d) => {
        const raw = inputs[d._id]?.trim();
        const value = Number(raw);
        const valid = !!raw && Number.isFinite(value) && value > 0;
        const perPiece = d.carat ?? 0;
        const pricePerCt = d.price ?? 0;
        const available = d.availableCarat ?? 100;
        const hasPrice = d.price !== undefined && d.price !== null;

        let requestedCarat: number | null = null;
        let pieces: number | null = null;
        if (valid) {
            if (mode === "carat") {
                requestedCarat = value;
                pieces = perPiece > 0 ? value / perPiece : null;
            } else {
                pieces = value;
                requestedCarat = perPiece > 0 ? value * perPiece : null;
            }
        }

        const pricePerPiece =
            perPiece > 0 && pricePerCt > 0 ? pricePerCt * perPiece : null;
        const lineTotal =
            requestedCarat !== null && pricePerCt > 0
                ? requestedCarat * pricePerCt
                : null;

        return {
            diamond: d,
            perPiece,
            pricePerCt,
            available,
            hasPrice,
            requestedCarat,
            pieces,
            pricePerPiece,
            lineTotal,
        };
    });

    const cartTotal = lines.reduce((sum, line) => sum + (line.lineTotal ?? 0), 0);
    const hasAnyLineTotal = lines.some((line) => line.lineTotal !== null);

    const validate = (): MelleCartLineInput[] | null => {
        const items: MelleCartLineInput[] = [];

        for (const d of diamonds) {
            const raw = inputs[d._id]?.trim();
            const value = Number(raw);
            const available = d.availableCarat ?? 100;
            const perPiece = d.carat ?? 0;
            const label = d.stockId || d.shape;

            if (!raw || !Number.isFinite(value) || value <= 0) {
                toast.error(
                    `Enter a valid ${
                        mode === "piece" ? "piece count" : "carat amount"
                    } for ${label}`,
                );
                return null;
            }
            if (mode === "piece" && perPiece <= 0) {
                toast.error(
                    `${label}: cannot convert pieces without a per-piece carat weight`,
                );
                return null;
            }

            const requestedCarat = mode === "piece" ? value * perPiece : value;
            if (requestedCarat > available) {
                toast.error(
                    `${d.stockId}: requested carat cannot exceed available (${available} ct)`,
                );
                return null;
            }

            items.push({ melleId: d._id, requestedCarat });
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
                        Choose how to enter quantity for each selected melee
                        diamond — by total carats or by number of pieces.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        Enter by
                    </span>
                    <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5">
                        {(["carat", "piece"] as EntryMode[]).map((m) => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => switchMode(m)}
                                className={cn(
                                    "px-3 py-1.5 text-sm rounded-[5px] transition-colors",
                                    mode === m
                                        ? "bg-primary-purple2 text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100",
                                )}
                            >
                                {m === "carat" ? "Per carat" : "Per piece"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 py-2 max-h-[50vh] overflow-y-auto pr-1">
                    {lines.map(
                        ({
                            diamond: d,
                            perPiece,
                            pricePerCt,
                            available,
                            hasPrice,
                            requestedCarat,
                            pieces,
                            pricePerPiece,
                            lineTotal,
                        }) => (
                            <div
                                key={d._id}
                                className="rounded-md border border-gray-200 p-3 space-y-2"
                            >
                                <div className="text-sm font-medium text-gray-900">
                                    {d.stockId} — {d.shape} {d.color} {d.clarity}
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                    <span>
                                        Available: {available.toFixed(2)} ct
                                    </span>
                                    <span>Carat/pc: {formatCarat(perPiece)} ct</span>
                                    <span>
                                        Price/Ct:{" "}
                                        {hasPrice ? formatUsd(pricePerCt) : "—"}
                                    </span>
                                    <span>
                                        Price/pc:{" "}
                                        {pricePerPiece !== null
                                            ? formatUsdPrecise(pricePerPiece)
                                            : "—"}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`qty-${d._id}`}>
                                        {mode === "carat"
                                            ? "Requested carat (ct)"
                                            : "Requested pieces"}
                                    </Label>
                                    <Input
                                        id={`qty-${d._id}`}
                                        type="number"
                                        step={mode === "carat" ? "0.01" : "1"}
                                        min={mode === "carat" ? "0.01" : "1"}
                                        max={
                                            mode === "carat"
                                                ? available
                                                : perPiece > 0
                                                  ? Math.floor(
                                                        available / perPiece,
                                                    )
                                                  : undefined
                                        }
                                        placeholder={
                                            mode === "carat"
                                                ? "e.g. 5"
                                                : "e.g. 1000"
                                        }
                                        value={inputs[d._id] ?? ""}
                                        onChange={(e) =>
                                            setInputs((prev) => ({
                                                ...prev,
                                                [d._id]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                {requestedCarat !== null && (
                                    <div className="rounded-md bg-gray-50 px-3 py-2 text-sm space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">
                                                Pieces
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {pieces !== null
                                                    ? `${formatPieces(pieces)} pcs`
                                                    : "—"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">
                                                Requested carat
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {formatCarat(requestedCarat)} ct
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">
                                                Price / piece
                                            </span>
                                            <span className="font-medium text-gray-900">
                                                {pricePerPiece !== null
                                                    ? formatUsdPrecise(
                                                          pricePerPiece,
                                                      )
                                                    : "—"}
                                            </span>
                                        </div>
                                        {lineTotal !== null && (
                                            <div className="flex items-center justify-between border-t border-gray-200 pt-1">
                                                <span className="font-medium text-gray-700">
                                                    Line total
                                                </span>
                                                <span className="font-semibold text-gray-900">
                                                    {formatUsd(lineTotal)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ),
                    )}
                </div>

                {hasAnyLineTotal && (
                    <div className="flex items-center justify-between rounded-md border border-primary-purple/20 bg-primary-purple/5 px-4 py-3">
                        <span className="text-sm font-medium text-gray-700">
                            Cart total
                        </span>
                        <span className="text-lg font-bold text-primary-purple">
                            {formatUsd(cartTotal)}
                        </span>
                    </div>
                )}

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
