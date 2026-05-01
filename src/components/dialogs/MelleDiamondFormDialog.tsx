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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    createMelleDiamond,
    updateMelleDiamond,
} from "@/services/melleDiamondService";
import {
    CreateMelleDiamondBody,
    MelleDiamond,
    MelleFilterOptions,
} from "@/interface/melleDiamondInterface";

interface MelleDiamondFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    // Pass an existing diamond to edit; omit for create.
    diamond?: MelleDiamond;
    options: MelleFilterOptions | null;
    onSuccess: (saved: MelleDiamond) => void;
}

type FormState = {
    shape: string;
    color: string;
    clarity: string;
    cut: string;
    melleCategory: string;
    isLab: "true" | "false";
    price: string;
    avgPtr: string;
    measurementMin: string;
    measurementMax: string;
    sieveMin: string;
    sieveMax: string;
};

const emptyForm: FormState = {
    shape: "",
    color: "",
    clarity: "",
    cut: "",
    melleCategory: "",
    isLab: "false",
    price: "",
    avgPtr: "",
    measurementMin: "",
    measurementMax: "",
    sieveMin: "",
    sieveMax: "",
};

const fromDiamond = (d: MelleDiamond): FormState => ({
    shape: d.shape,
    color: d.color,
    clarity: d.clarity,
    cut: d.cut ?? "",
    melleCategory: d.melleCategory,
    isLab: d.isLab ? "true" : "false",
    price: String(d.price ?? ""),
    avgPtr: String(d.avgPtr ?? ""),
    measurementMin: d.measurementMin ?? "",
    measurementMax: d.measurementMax ?? "",
    sieveMin: d.sieveMin ?? "",
    sieveMax: d.sieveMax ?? "",
});

export function MelleDiamondFormDialog({
    open,
    onOpenChange,
    diamond,
    options,
    onSuccess,
}: MelleDiamondFormDialogProps) {
    const isEdit = !!diamond;
    const [form, setForm] = useState<FormState>(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        setForm(diamond ? fromDiamond(diamond) : emptyForm);
    }, [open, diamond]);

    const shapes = options?.shapes ?? [];
    const colors = options?.colors ?? [];
    const clarities = options?.clarities ?? [];
    const cuts = options?.cuts ?? [];
    const categories = options?.melleCategories ?? [];

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const validate = (): string | null => {
        if (!form.shape) return "Shape is required";
        if (!form.color) return "Color is required";
        if (!form.clarity) return "Clarity is required";
        if (!form.melleCategory) return "Melee category is required";
        const price = Number(form.price);
        if (!Number.isFinite(price) || price < 0)
            return "Price must be a non-negative number";
        const avgPtr = Number(form.avgPtr);
        if (!Number.isFinite(avgPtr) || avgPtr <= 0)
            return "Avg Ptr must be a positive number";
        if (!form.measurementMin.trim() || !form.measurementMax.trim())
            return "Measurement min and max are required";
        if (!form.sieveMin.trim() || !form.sieveMax.trim())
            return "Sieve min and max are required";
        return null;
    };

    const buildPayload = (): CreateMelleDiamondBody => ({
        shape: form.shape,
        color: form.color,
        clarity: form.clarity,
        cut: form.cut || undefined,
        melleCategory: form.melleCategory,
        isLab: form.isLab === "true",
        price: Number(form.price),
        avgPtr: Number(form.avgPtr),
        measurementMin: form.measurementMin.trim(),
        measurementMax: form.measurementMax.trim(),
        sieveMin: form.sieveMin.trim(),
        sieveMax: form.sieveMax.trim(),
    });

    const handleSubmit = async () => {
        const err = validate();
        if (err) {
            toast.error(err);
            return;
        }

        try {
            setSubmitting(true);
            const payload = buildPayload();
            const saved =
                isEdit && diamond
                    ? await updateMelleDiamond(diamond._id, payload)
                    : await createMelleDiamond(payload);
            toast.success(
                isEdit
                    ? "Melee diamond updated"
                    : "Melee diamond created",
            );
            onSuccess(saved);
            onOpenChange(false);
        } catch (e: any) {
            toast.error(
                e?.response?.data?.message ||
                    e?.message ||
                    (isEdit
                        ? "Failed to update melee diamond"
                        : "Failed to create melee diamond"),
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Fallback options if filter-options aren't loaded yet — mostly
    // relevant on first open before any list fetch.
    const withFallback = (serverValues: string[], current: string) => {
        const set = new Set(serverValues);
        if (current && !set.has(current)) set.add(current);
        return Array.from(set);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Melee Diamond" : "Add Melee Diamond"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? `Stock ID: ${diamond?.stockId ?? "—"}`
                            : "Fields marked * are required. Stock ID and carat are auto-generated."}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="space-y-1">
                        <Label>Shape *</Label>
                        <Select
                            value={form.shape}
                            onValueChange={(v) => update("shape", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select shape" />
                            </SelectTrigger>
                            <SelectContent>
                                {withFallback(shapes, form.shape).map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Color *</Label>
                        <Select
                            value={form.color}
                            onValueChange={(v) => update("color", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                                {withFallback(colors, form.color).map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Clarity *</Label>
                        <Select
                            value={form.clarity}
                            onValueChange={(v) => update("clarity", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select clarity" />
                            </SelectTrigger>
                            <SelectContent>
                                {withFallback(clarities, form.clarity).map(
                                    (c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Cut</Label>
                        <Select
                            value={form.cut || ""}
                            onValueChange={(v) => update("cut", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Default: Very Good" />
                            </SelectTrigger>
                            <SelectContent>
                                {withFallback(cuts, form.cut).map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Melee Category *</Label>
                        <Select
                            value={form.melleCategory}
                            onValueChange={(v) => update("melleCategory", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {withFallback(
                                    categories,
                                    form.melleCategory,
                                ).map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label>Type *</Label>
                        <Select
                            value={form.isLab}
                            onValueChange={(v) =>
                                update("isLab", v as "true" | "false")
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

                    <div className="space-y-1">
                        <Label>Price (USD) *</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={form.price}
                            onChange={(e) => update("price", e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Avg Ptr *</Label>
                        <Input
                            type="number"
                            step="0.001"
                            value={form.avgPtr}
                            onChange={(e) => update("avgPtr", e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Measurement Min (mm) *</Label>
                        <Input
                            value={form.measurementMin}
                            onChange={(e) =>
                                update("measurementMin", e.target.value)
                            }
                            placeholder="e.g. 3.90"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Measurement Max (mm) *</Label>
                        <Input
                            value={form.measurementMax}
                            onChange={(e) =>
                                update("measurementMax", e.target.value)
                            }
                            placeholder="e.g. 4.00"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Sieve Min *</Label>
                        <Input
                            value={form.sieveMin}
                            onChange={(e) =>
                                update("sieveMin", e.target.value)
                            }
                            placeholder="e.g. 17"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Sieve Max *</Label>
                        <Input
                            value={form.sieveMax}
                            onChange={(e) =>
                                update("sieveMax", e.target.value)
                            }
                            placeholder="e.g. 17.5"
                        />
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
                        disabled={submitting}
                        className="bg-primary-purple2 hover:bg-primary-purple2/90 text-white"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                {isEdit ? "Saving..." : "Creating..."}
                            </>
                        ) : isEdit ? (
                            "Save Changes"
                        ) : (
                            "Create"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
