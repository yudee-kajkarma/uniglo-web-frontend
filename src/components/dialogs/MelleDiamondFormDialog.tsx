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
import { Textarea } from "@/components/ui/textarea";
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
    labType: string;
    price: string;
    avgPtr: string;
    measurementMin: string;
    measurementMax: string;
    measurementLength: string;
    measurementBreadth: string;
    sieveMin: string;
    sieveMax: string;
    imageUrls: string;
    availableCarat: string;
};

const emptyForm: FormState = {
    shape: "",
    color: "",
    clarity: "",
    cut: "",
    melleCategory: "",
    isLab: "false",
    labType: "",
    price: "",
    avgPtr: "",
    measurementMin: "",
    measurementMax: "",
    measurementLength: "",
    measurementBreadth: "",
    sieveMin: "",
    sieveMax: "",
    imageUrls: "",
    availableCarat: "100",
};

const fromDiamond = (d: MelleDiamond): FormState => ({
    shape: d.shape,
    color: d.color,
    clarity: d.clarity,
    cut: d.cut ?? "",
    melleCategory: d.melleCategory,
    isLab: d.isLab ? "true" : "false",
    labType: d.labType ?? "",
    price: String(d.price ?? ""),
    avgPtr: String(d.avgPtr ?? ""),
    measurementMin: d.measurementMin ?? "",
    measurementMax: d.measurementMax ?? "",
    measurementLength: d.measurementLength ?? "",
    measurementBreadth: d.measurementBreadth ?? "",
    sieveMin: d.sieveMin ?? "",
    sieveMax: d.sieveMax ?? "",
    imageUrls: (d.images ?? []).join("\n"),
    availableCarat: String(d.availableCarat ?? 100),
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
    const labTypes = options?.labTypes ?? [];

    const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const isFancyMode = Boolean(
        form.measurementLength.trim() || form.measurementBreadth.trim(),
    );

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
        if (isFancyMode) {
            if (!form.measurementLength.trim() || !form.measurementBreadth.trim())
                return "Measurement length and breadth are required for fancy shapes";
        } else {
            if (!form.measurementMin.trim() || !form.measurementMax.trim())
                return "Measurement min and max are required";
            if (!form.sieveMin.trim() || !form.sieveMax.trim())
                return "Sieve min and max are required";
        }
        const availableCarat = Number(form.availableCarat);
        if (!Number.isFinite(availableCarat) || availableCarat < 0)
            return "Available carat must be a non-negative number";
        return null;
    };

    const buildPayload = (): CreateMelleDiamondBody => {
        const images = form.imageUrls
            .split("\n")
            .map((url) => url.trim())
            .filter(Boolean);

        return {
            shape: form.shape,
            color: form.color,
            clarity: form.clarity,
            cut: form.cut || undefined,
            melleCategory: form.melleCategory,
            isLab: form.isLab === "true",
            labType: form.isLab === "true" ? form.labType || undefined : undefined,
            price: Number(form.price),
            avgPtr: Number(form.avgPtr),
            measurementMin: isFancyMode ? "" : form.measurementMin.trim(),
            measurementMax: isFancyMode ? "" : form.measurementMax.trim(),
            measurementLength: isFancyMode
                ? form.measurementLength.trim()
                : undefined,
            measurementBreadth: isFancyMode
                ? form.measurementBreadth.trim()
                : undefined,
            sieveMin: isFancyMode ? "" : form.sieveMin.trim(),
            sieveMax: isFancyMode ? "" : form.sieveMax.trim(),
            images,
            availableCarat: Number(form.availableCarat),
        };
    };

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
                            onValueChange={(v) => {
                                const next = v as "true" | "false";
                                setForm((prev) => ({
                                    ...prev,
                                    isLab: next,
                                    // Natural cannot carry a labType, clear it.
                                    labType:
                                        next === "true" ? prev.labType : "",
                                }));
                            }}
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
                        <Label>Lab Type</Label>
                        <Select
                            value={form.labType || "none"}
                            onValueChange={(v) =>
                                update("labType", v === "none" ? "" : v)
                            }
                            disabled={form.isLab !== "true"}
                        >
                            <SelectTrigger>
                                <SelectValue
                                    placeholder={
                                        form.isLab === "true"
                                            ? "Select HPHT or CVD"
                                            : "Only for Lab"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">—</SelectItem>
                                {withFallback(labTypes, form.labType)
                                    .filter((t) => t && t !== "-")
                                    .map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
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
                        <Label>Available Carat (ct)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.availableCarat}
                            onChange={(e) =>
                                update("availableCarat", e.target.value)
                            }
                            placeholder="Default: 100"
                        />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                        <Label className="text-xs text-gray-500 uppercase tracking-wide">
                            Round / Melee measurements
                        </Label>
                    </div>

                    <div className="space-y-1">
                        <Label>
                            Measurement Min (mm) {!isFancyMode ? "*" : ""}
                        </Label>
                        <Input
                            value={form.measurementMin}
                            onChange={(e) =>
                                update("measurementMin", e.target.value)
                            }
                            placeholder="e.g. 3.90"
                            disabled={isFancyMode}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>
                            Measurement Max (mm) {!isFancyMode ? "*" : ""}
                        </Label>
                        <Input
                            value={form.measurementMax}
                            onChange={(e) =>
                                update("measurementMax", e.target.value)
                            }
                            placeholder="e.g. 4.00"
                            disabled={isFancyMode}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Sieve Min {!isFancyMode ? "*" : ""}</Label>
                        <Input
                            value={form.sieveMin}
                            onChange={(e) =>
                                update("sieveMin", e.target.value)
                            }
                            placeholder="e.g. 17"
                            disabled={isFancyMode}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Sieve Max {!isFancyMode ? "*" : ""}</Label>
                        <Input
                            value={form.sieveMax}
                            onChange={(e) =>
                                update("sieveMax", e.target.value)
                            }
                            placeholder="e.g. 17.5"
                            disabled={isFancyMode}
                        />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                        <Label className="text-xs text-gray-500 uppercase tracking-wide">
                            Fancy shape measurements
                        </Label>
                    </div>

                    <div className="space-y-1">
                        <Label>
                            Measurement Length {isFancyMode ? "*" : ""}
                        </Label>
                        <Input
                            value={form.measurementLength}
                            onChange={(e) =>
                                update("measurementLength", e.target.value)
                            }
                            placeholder="e.g. 120"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>
                            Measurement Breadth {isFancyMode ? "*" : ""}
                        </Label>
                        <Input
                            value={form.measurementBreadth}
                            onChange={(e) =>
                                update("measurementBreadth", e.target.value)
                            }
                            placeholder="e.g. 80"
                        />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                        <Label>Image URLs</Label>
                        <Textarea
                            value={form.imageUrls}
                            onChange={(e) =>
                                update("imageUrls", e.target.value)
                            }
                            placeholder="One image URL per line"
                            rows={3}
                        />
                        <p className="text-xs text-gray-500">
                            Paste one URL per line. Used for fancy shape
                            previews.
                        </p>
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
