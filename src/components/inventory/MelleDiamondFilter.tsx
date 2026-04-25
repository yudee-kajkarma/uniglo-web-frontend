// components/inventory/MelleDiamondFilter.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
    DiamondFilterSection,
    RangeSliderWithInputs,
    ToggleButton,
} from "./diamonFilter";
import {
    MelleFilterOptions,
    MelleFilterState,
} from "@/interface/melleDiamondInterface";
import { fetchMelleFilterOptions } from "@/services/melleDiamondService";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface MelleDiamondFiltersProps {
    filters: MelleFilterState;
    setFilters: React.Dispatch<React.SetStateAction<MelleFilterState>>;
    onOptionsLoaded?: (options: MelleFilterOptions) => void;
    variant?: "default" | "sidebar";
}

const toggle = <T extends string>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

// Display order for melee clarity grades. Anything not in this list is
// appended in the order the backend returned it.
const CLARITY_ORDER = ["VVS", "VS", "I1", "SI1", "SI2"];

const orderClarities = (clarities: string[]): string[] => {
    const ranked = [...clarities].sort((a, b) => {
        const ai = CLARITY_ORDER.indexOf(a);
        const bi = CLARITY_ORDER.indexOf(b);
        if (ai === -1 && bi === -1) return 0;
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
    });
    return ranked;
};

export const MelleDiamondFilters: React.FC<MelleDiamondFiltersProps> = ({
    filters,
    setFilters,
    onOptionsLoaded,
    variant = "default",
}) => {
    const { isAuthenticated } = useAuth();
    const [options, setOptions] = useState<MelleFilterOptions | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const data = await fetchMelleFilterOptions();
                if (cancelled) return;
                setOptions(data);
                onOptionsLoaded?.(data);
            } catch (e: any) {
                if (cancelled) return;
                setError(e?.message || "Failed to load filter options");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
        // onOptionsLoaded intentionally omitted — callers should memoize if needed.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-2 py-8 bg-white rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin text-primary-purple2" />
                <span className="text-sm text-gray-600">
                    Loading melee filters…
                </span>
            </div>
        );
    }

    if (error || !options) {
        return (
            <div className="py-8 text-center text-sm text-red-600 bg-white rounded-lg">
                {error || "Unable to load melee filter options."}
            </div>
        );
    }

    const shapesContent = (
        <div className="flex flex-wrap gap-1">
            {options.shapes.map((shape) => (
                <ToggleButton
                    key={shape}
                    label={shape}
                    active={filters.shape.includes(shape)}
                    onClick={() =>
                        setFilters((p) => ({
                            ...p,
                            shape: toggle(p.shape, shape),
                        }))
                    }
                    className="border border-primary-yellow-2 min-w-[60px]"
                />
            ))}
        </div>
    );

    const colorContent = (
        <div className="flex flex-wrap gap-1">
            {options.colors.map((color) => (
                <ToggleButton
                    key={color}
                    label={color}
                    active={filters.color.includes(color)}
                    onClick={() =>
                        setFilters((p) => ({
                            ...p,
                            color: toggle(p.color, color),
                        }))
                    }
                    className="border border-primary-yellow-2 min-w-[48px]"
                />
            ))}
        </div>
    );

    const clarityContent = (
        <div className="flex flex-wrap gap-1">
            {orderClarities(options.clarities).map((clarity) => (
                <ToggleButton
                    key={clarity}
                    label={clarity}
                    active={filters.clarity.includes(clarity)}
                    onClick={() =>
                        setFilters((p) => ({
                            ...p,
                            clarity: toggle(p.clarity, clarity),
                        }))
                    }
                    className="border border-primary-yellow-2 min-w-[48px]"
                />
            ))}
        </div>
    );

    const cutContent = (
        <div className="flex flex-wrap gap-1">
            {options.cuts.map((cut) => (
                <ToggleButton
                    key={cut}
                    label={cut}
                    active={filters.cut.includes(cut)}
                    onClick={() =>
                        setFilters((p) => ({
                            ...p,
                            cut: toggle(p.cut, cut),
                        }))
                    }
                    className="border border-primary-yellow-2"
                />
            ))}
        </div>
    );

    // const categoryContent = (
    //     <div className="flex flex-wrap gap-1">
    //         {options.melleCategories.map((cat) => (
    //             <ToggleButton
    //                 key={cat}
    //                 label={cat}
    //                 active={filters.melleCategory.includes(cat)}
    //                 onClick={() =>
    //                     setFilters((p) => ({
    //                         ...p,
    //                         melleCategory: toggle(p.melleCategory, cat),
    //                     }))
    //                 }
    //                 className="border border-primary-yellow-2 min-w-[48px]"
    //             />
    //         ))}
    //     </div>
    // );

    const isLabContent = (
        <div className="flex gap-2">
            <ToggleButton
                label="Natural"
                active={filters.isLab === false}
                onClick={() =>
                    setFilters((p) => ({
                        ...p,
                        isLab: p.isLab === false ? undefined : false,
                    }))
                }
                className="border border-primary-yellow-2 flex-1"
            />
            <ToggleButton
                label="Lab"
                active={filters.isLab === true}
                onClick={() =>
                    setFilters((p) => ({
                        ...p,
                        isLab: p.isLab === true ? undefined : true,
                    }))
                }
                className="border border-primary-yellow-2 flex-1"
            />
        </div>
    );

    const priceSlider = (
        <RangeSliderWithInputs
            label="Price"
            value={filters.priceRange}
            onChange={(val) => setFilters((p) => ({ ...p, priceRange: val }))}
            minLimit={options.priceRange.min}
            maxLimit={options.priceRange.max}
            step={1}
            variant={variant}
            disabled={!isAuthenticated}
        />
    );

    const avgPtrSlider = (
        <RangeSliderWithInputs
            label="Avg Ptr"
            value={filters.avgPtrRange}
            onChange={(val) => setFilters((p) => ({ ...p, avgPtrRange: val }))}
            minLimit={options.avgPtrRange.min}
            maxLimit={options.avgPtrRange.max}
            step={0.001}
            variant={variant}
        />
    );

    const caratSlider = (
        <RangeSliderWithInputs
            label="Carat"
            value={filters.caratRange}
            onChange={(val) => setFilters((p) => ({ ...p, caratRange: val }))}
            minLimit={options.caratRange.min}
            maxLimit={options.caratRange.max}
            step={0.0001}
            variant={variant}
        />
    );

    const measurementSlider = (
        <RangeSliderWithInputs
            label="Measurement"
            value={filters.measurementRange}
            onChange={(val) =>
                setFilters((p) => ({ ...p, measurementRange: val }))
            }
            minLimit={options.measurementRange.min}
            maxLimit={options.measurementRange.max}
            step={0.01}
            variant={variant}
        />
    );

    const sieveSlider = (
        <RangeSliderWithInputs
            label="Sieve"
            value={filters.sieveRange}
            onChange={(val) => setFilters((p) => ({ ...p, sieveRange: val }))}
            minLimit={options.sieveRange.min}
            maxLimit={options.sieveRange.max}
            step={0.5}
            variant={variant}
        />
    );

    if (variant === "sidebar") {
        return (
            <div className="w-full bg-white font-lato flex flex-col">
                <DiamondFilterSection title="Shape" variant="sidebar">
                    {shapesContent}
                </DiamondFilterSection>
                <DiamondFilterSection title="Color" variant="sidebar">
                    {colorContent}
                </DiamondFilterSection>
                <DiamondFilterSection title="Clarity" variant="sidebar">
                    {clarityContent}
                </DiamondFilterSection>
                <DiamondFilterSection title="Cut" variant="sidebar">
                    {cutContent}
                </DiamondFilterSection>
                {/* <DiamondFilterSection
                    title="Melee Category"
                    variant="sidebar"
                >
                    {categoryContent}
                </DiamondFilterSection> */}
                <DiamondFilterSection title="Type" variant="sidebar">
                    {isLabContent}
                </DiamondFilterSection>
                <div className="flex flex-col">
                    {priceSlider}
                    {avgPtrSlider}
                    {caratSlider}
                    {measurementSlider}
                    {sieveSlider}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-2 rounded-lg font-lato">
            <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-2")}>
                <div className="lg:col-span-4 flex flex-col gap-2">
                    <DiamondFilterSection title="Shape">
                        {shapesContent}
                    </DiamondFilterSection>
                    <DiamondFilterSection title="Color">
                        {colorContent}
                    </DiamondFilterSection>
                    <DiamondFilterSection title="Clarity">
                        {clarityContent}
                    </DiamondFilterSection>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-2">
                    <DiamondFilterSection title="Cut">
                        {cutContent}
                    </DiamondFilterSection>
                    {/* <DiamondFilterSection title="Melee Category">
                        {categoryContent}
                    </DiamondFilterSection> */}
                    <DiamondFilterSection title="Type">
                        {isLabContent}
                    </DiamondFilterSection>
                </div>
                <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                    {priceSlider}
                    {avgPtrSlider}
                    {caratSlider}
                    {measurementSlider}
                    {sieveSlider}
                </div>
            </div>
        </div>
    );
};
