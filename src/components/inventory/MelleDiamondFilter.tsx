// components/inventory/MelleDiamondFilter.tsx
"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import {
    DiamondFilterSection,
    RangeSliderWithInputs,
    ToggleButton,
} from "./diamonFilter";
import {
    MelleFilterOptions,
    MelleFilterState,
    MelleSieveOption,
} from "@/interface/melleDiamondInterface";
import { fetchMelleFilterOptions } from "@/services/melleDiamondService";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2, X } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MelleDiamondFiltersProps {
    filters: MelleFilterState;
    setFilters: React.Dispatch<React.SetStateAction<MelleFilterState>>;
    onOptionsLoaded?: (options: MelleFilterOptions) => void;
    variant?: "default" | "sidebar";
}

const toggle = <T extends string>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

// Maps melee shape codes from the API to display label + icon. RBC is the
// Round Brilliant Cut variant the melee API currently emits; the other
// codes mirror the regular diamond filter so adding new ones server-side
// "just works" visually.
const MELLE_SHAPE_META: Record<string, { label: string; icon: string }> = {
    RBC: { label: "Round", icon: "/shapes/round-diamond.png" },
    RD: { label: "Round", icon: "/shapes/round-diamond.png" },
    PC: { label: "Princess", icon: "/shapes/princess-diamond.png" },
    PS: { label: "Pear", icon: "/shapes/pear-diamond.png" },
    OV: { label: "Oval", icon: "/shapes/Oval-Diamond.png" },
    EM: { label: "Emerald", icon: "/shapes/emerald-diamond.png" },
    MQ: { label: "Marquise", icon: "/shapes/marquise-diamond.png" },
    RA: { label: "Radiant", icon: "/shapes/radiant-diamond.png" },
    HT: { label: "Heart", icon: "/shapes/heart.png" },
    Asscher: { label: "Asscher", icon: "/shapes/asscher-diamond.png" },
    CU: { label: "Cushion", icon: "/shapes/cushion-diamond.png" },
    Oeb: { label: "European", icon: "/shapes/old-european-diamond.png" },
    OMB: { label: "Old Mine", icon: "/shapes/old-mine-diamond.png" },
    SE: { label: "Square Emerald", icon: "/shapes/square-emerald.png" },
    Other: { label: "Other", icon: "/shapes/other-diamond.png" },
};

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
    // Carat and Avg Ptr describe the same stone size in different units, so
    // we render only one at a time. Default to Avg Ptr.
    const [sizeMode, setSizeMode] = useState<"carat" | "avgPtr">("avgPtr");
    // Two MelleDiamondFilters instances can be mounted at once (desktop +
    // mobile drawer). Without a unique `name`, both radio groups would share
    // the same browser-level group and React's controlled `checked` would
    // fight the browser's own checked tracking — that's the "click twice to
    // select" bug.
    const radioGroupName = `melle-size-mode-${useId()}`;

    const handleSizeModeChange = (mode: "carat" | "avgPtr") => {
        if (mode === sizeMode) return;
        setSizeMode(mode);
        // Clear the hidden filter's selections so they don't silently keep
        // narrowing search results after the user switches view.
        setFilters((p) => ({
            ...p,
            ...(mode === "carat" ? { avgPtrRanges: [] } : { caratRanges: [] }),
        }));
    };

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
        <div
            className={cn(
                "grid gap-2",
                variant === "sidebar"
                    ? "grid-cols-2 sm:grid-cols-4"
                    : "grid-cols-7",
            )}
        >
            {options.shapes.map((code) => {
                const meta = MELLE_SHAPE_META[code] ?? {
                    label: code,
                    icon: "/shapes/other-diamond.png",
                };
                const isActive = filters.shape.includes(code);
                return (
                    <TooltipProvider key={code}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() =>
                                        setFilters((p) => ({
                                            ...p,
                                            shape: toggle(p.shape, code),
                                        }))
                                    }
                                    className={cn(
                                        "flex cursor-pointer flex-col items-center justify-center p-2 rounded border transition-colors aspect-square",
                                        isActive
                                            ? "bg-[#d4b98c] text-black border-[#d4b98c] font-medium"
                                            : "border-primary-yellow-2",
                                    )}
                                >
                                    <Image
                                        src={meta.icon}
                                        width={54}
                                        height={54}
                                        alt={meta.label}
                                        className="aspect-square object-contain"
                                    />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>{meta.label}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
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
                        // Switching off Lab must clear stale HPHT/CVD chips.
                        labType: [],
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
                        labType: p.isLab === true ? [] : p.labType,
                    }))
                }
                className="border border-primary-yellow-2 flex-1"
            />
        </div>
    );

    const labTypeContent =
        filters.isLab === true && options.labTypes.length > 0 ? (
            <div className="flex flex-wrap gap-1 pt-2">
                {options.labTypes.map((t) => (
                    <ToggleButton
                        key={t}
                        label={t}
                        active={filters.labType.includes(t)}
                        onClick={() =>
                            setFilters((p) => ({
                                ...p,
                                labType: toggle(p.labType, t),
                            }))
                        }
                        className="border border-primary-yellow-2 min-w-[48px]"
                    />
                ))}
            </div>
        ) : null;

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

    const avgPtrDropdown = (
        <MultiRangeSelect
            label="Avg Ptr"
            min={options.avgPtrRange.min}
            max={options.avgPtrRange.max}
            step={
                (options.avgPtrRange.max - options.avgPtrRange.min) / 10 ||
                0.001
            }
            decimals={3}
            selected={filters.avgPtrRanges ?? []}
            onChange={(ranges) =>
                setFilters((p) => ({ ...p, avgPtrRanges: ranges }))
            }
        />
    );

    const caratDropdown = (
        <MultiRangeSelect
            label="Carat"
            min={options.caratRange.min}
            max={options.caratRange.max}
            step={
                (options.caratRange.max - options.caratRange.min) / 10 || 0.0001
            }
            decimals={5}
            selected={filters.caratRanges ?? []}
            onChange={(ranges) =>
                setFilters((p) => ({ ...p, caratRanges: ranges }))
            }
        />
    );

    const measurementDropdown = (
        <MultiRangeSelect
            label="Measurement"
            min={options.measurementRange.min}
            max={options.measurementRange.max}
            step={0.1}
            decimals={2}
            selected={filters.measurementRanges ?? []}
            onChange={(ranges) =>
                setFilters((p) => ({ ...p, measurementRanges: ranges }))
            }
        />
    );

    const sieveDropdown = (
        <SieveMultiSelect
            label="Sieve"
            options={options.sieveOptions}
            selected={filters.sieveRanges ?? []}
            onChange={(ranges) =>
                setFilters((p) => ({ ...p, sieveRanges: ranges }))
            }
        />
    );

    const sizeModeRadio = (
        <div className="flex items-start pt-5 gap-3 px-2 py-1 text-xs">
            <span className="font-semibold text-gray-700">Size by:</span>
            <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name={radioGroupName}
                    value="carat"
                    checked={sizeMode === "carat"}
                    onChange={() => handleSizeModeChange("carat")}
                    className="accent-primary-purple2"
                />
                <span>Carat</span>
            </label>
            <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name={radioGroupName}
                    value="avgPtr"
                    checked={sizeMode === "avgPtr"}
                    onChange={() => handleSizeModeChange("avgPtr")}
                    className="accent-primary-purple2"
                />
                <span>Avg Ptr</span>
            </label>
        </div>
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
                    {labTypeContent}
                </DiamondFilterSection>
                <div className="flex flex-col">
                    {sizeModeRadio}
                    {priceSlider}
                    {sizeMode === "avgPtr" ? avgPtrDropdown : caratDropdown}
                    {measurementDropdown}
                    {sieveDropdown}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white p-2 rounded-lg font-lato">
            <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-2")}>
                {/* Col 1 — Shapes + Color */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                    <DiamondFilterSection title="Shapes">
                        {shapesContent}
                    </DiamondFilterSection>
                    <DiamondFilterSection title="Color">
                        {colorContent}
                    </DiamondFilterSection>
                </div>

                {/* Col 2 — Clarity + Cut + Type */}
                <div className="lg:col-span-4 flex flex-col gap-2">
                    <DiamondFilterSection title="Clarity">
                        {clarityContent}
                    </DiamondFilterSection>
                    <DiamondFilterSection title="Cut">
                        {cutContent}
                    </DiamondFilterSection>
                    {/* <DiamondFilterSection title="Melee Category">
                        {categoryContent}
                    </DiamondFilterSection> */}
                    <DiamondFilterSection title="Type">
                        {isLabContent}
                        {labTypeContent}
                    </DiamondFilterSection>
                </div>

                {/* Col 3 — size-mode radio, active size dropdown, Measurement,
                    Sieve, then Price spanning the full column width */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-2 auto-rows-min content-start">
                    {sizeModeRadio}
                    {sizeMode === "avgPtr" ? avgPtrDropdown : caratDropdown}
                    {measurementDropdown}
                    {sieveDropdown}
                    {/* RangeSliderWithInputs forces h-full on its wrapper.
                        Wrapping in a plain div with col-span-2 keeps it from
                        stretching to fill leftover column height. */}
                    <div className="col-span-2">{priceSlider}</div>
                </div>
            </div>
        </div>
    );
};

interface MultiRangeSelectProps {
    label: string;
    min: number;
    max: number;
    step: number;
    decimals: number;
    selected: [number, number][];
    onChange: (ranges: [number, number][]) => void;
}

const formatNum = (n: number, decimals: number) => {
    if (!isFinite(n)) return "—";
    return decimals === 0 ? Math.round(n).toString() : n.toFixed(decimals);
};

const rangeKey = (r: [number, number]) => `${r[0]}::${r[1]}`;

const generateBuckets = (
    min: number,
    max: number,
    step: number,
): [number, number][] => {
    if (!isFinite(min) || !isFinite(max) || step <= 0 || max <= min) return [];
    const buckets: [number, number][] = [];
    const safetyCap = 500;
    let lower = min;
    let i = 0;
    while (lower < max && i < safetyCap) {
        const upper = Math.min(lower + step, max);
        // Round to a stable 10-decimal precision so the CSV the backend
        // receives doesn't pick up floating-point drift like 0.30000000004.
        const lo = Number(lower.toFixed(10));
        const hi = Number(upper.toFixed(10));
        if (hi > lo) buckets.push([lo, hi]);
        lower = upper;
        i++;
    }
    return buckets;
};

const MultiRangeSelect: React.FC<MultiRangeSelectProps> = ({
    label,
    min,
    max,
    step,
    decimals,
    selected,
    onChange,
}) => {
    const [open, setOpen] = useState(false);
    const buckets = useMemo(
        () => generateBuckets(min, max, step),
        [min, max, step],
    );
    const selectedKeys = useMemo(
        () => new Set(selected.map(rangeKey)),
        [selected],
    );

    const toggleRange = (r: [number, number]) => {
        const key = rangeKey(r);
        if (selectedKeys.has(key)) {
            onChange(selected.filter((s) => rangeKey(s) !== key));
        } else {
            onChange([...selected, r]);
        }
    };

    const removeRange = (e: React.MouseEvent, r: [number, number]) => {
        e.stopPropagation();
        const key = rangeKey(r);
        onChange(selected.filter((s) => rangeKey(s) !== key));
    };

    return (
        <DiamondFilterSection title={label} className="p-0">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="w-full min-h-[36px] flex items-center justify-between gap-2 px-2 py-1 bg-white border border-primary-yellow-2 rounded text-xs text-gray-700 hover:border-primary-purple2 transition-colors"
                    >
                        <div className="flex flex-wrap gap-1 flex-1 items-center">
                            {selected.length === 0 ? (
                                <span className="text-gray-400">
                                    Select {label.toLowerCase()} range…
                                </span>
                            ) : (
                                selected.map((r) => (
                                    <span
                                        key={rangeKey(r)}
                                        className="inline-flex items-center gap-1 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[11px]"
                                    >
                                        {formatNum(r[0], decimals)} -{" "}
                                        {formatNum(r[1], decimals)}
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            onClick={(e) => removeRange(e, r)}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.stopPropagation();
                                                    onChange(
                                                        selected.filter(
                                                            (s) =>
                                                                rangeKey(s) !==
                                                                rangeKey(r),
                                                        ),
                                                    );
                                                }
                                            }}
                                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                                            aria-label={`Remove ${formatNum(r[0], decimals)} - ${formatNum(r[1], decimals)}`}
                                        >
                                            <X size={12} />
                                        </span>
                                    </span>
                                ))
                            )}
                        </div>
                        <ChevronDown
                            size={14}
                            className={cn(
                                "text-gray-500 transition-transform shrink-0",
                                open && "rotate-180",
                            )}
                        />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-0 max-h-72 overflow-y-auto"
                >
                    {buckets.length === 0 ? (
                        <div className="p-3 text-xs text-gray-500 text-center">
                            No ranges available
                        </div>
                    ) : (
                        <ul className="py-1">
                            {buckets.map((b) => {
                                const isSelected = selectedKeys.has(
                                    rangeKey(b),
                                );
                                return (
                                    <li key={rangeKey(b)}>
                                        <button
                                            type="button"
                                            onClick={() => toggleRange(b)}
                                            className={cn(
                                                "w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 transition-colors",
                                                isSelected &&
                                                    "bg-blue-100 font-medium",
                                            )}
                                        >
                                            {formatNum(b[0], decimals)} -{" "}
                                            {formatNum(b[1], decimals)}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </PopoverContent>
            </Popover>
        </DiamondFilterSection>
    );
};

interface SieveMultiSelectProps {
    label: string;
    options: MelleSieveOption[];
    selected: [string, string][];
    onChange: (ranges: [string, string][]) => void;
}

// Sieves like "0", "00", "000", "0000" are progressively finer grades, so
// straight string sort puts them in the wrong order ("0", "00", "000",
// "1", "10"...). Map all-zero strings to negative integers (-length) so
// they sort before numeric grades and from finest to coarsest.
const sieveSortKey = (s: string): number => {
    if (/^0+$/.test(s)) return -s.length;
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
};

const sieveRangeKey = (r: [string, string]) => `${r[0]}::${r[1]}`;

const SieveMultiSelect: React.FC<SieveMultiSelectProps> = ({
    label,
    options,
    selected,
    onChange,
}) => {
    const [open, setOpen] = useState(false);

    const sortedOptions = useMemo(
        () =>
            [...options].sort(
                (a, b) =>
                    sieveSortKey(a.sieveMin) - sieveSortKey(b.sieveMin) ||
                    sieveSortKey(a.sieveMax) - sieveSortKey(b.sieveMax),
            ),
        [options],
    );

    const selectedKeys = useMemo(
        () => new Set(selected.map(sieveRangeKey)),
        [selected],
    );

    const labelFor = (r: [string, string]) => {
        const match = options.find(
            (o) => o.sieveMin === r[0] && o.sieveMax === r[1],
        );
        return match?.label ?? `${r[0]} - ${r[1]}`;
    };

    const toggleOption = (opt: MelleSieveOption) => {
        const r: [string, string] = [opt.sieveMin, opt.sieveMax];
        const key = sieveRangeKey(r);
        if (selectedKeys.has(key)) {
            onChange(selected.filter((s) => sieveRangeKey(s) !== key));
        } else {
            onChange([...selected, r]);
        }
    };

    const removeRange = (e: React.MouseEvent, r: [string, string]) => {
        e.stopPropagation();
        const key = sieveRangeKey(r);
        onChange(selected.filter((s) => sieveRangeKey(s) !== key));
    };

    return (
        <DiamondFilterSection title={label} className="p-0">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="w-full min-h-[36px] flex items-center justify-between gap-2 px-2 py-1 bg-white border border-primary-yellow-2 rounded text-xs text-gray-700 hover:border-primary-purple2 transition-colors"
                    >
                        <div className="flex flex-wrap gap-1 flex-1 items-center">
                            {selected.length === 0 ? (
                                <span className="text-gray-400">
                                    Select {label.toLowerCase()} range…
                                </span>
                            ) : (
                                selected.map((r) => (
                                    <span
                                        key={sieveRangeKey(r)}
                                        className="inline-flex items-center gap-1 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-[11px]"
                                    >
                                        {labelFor(r)}
                                        <span
                                            role="button"
                                            tabIndex={0}
                                            onClick={(e) => removeRange(e, r)}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" ||
                                                    e.key === " "
                                                ) {
                                                    e.stopPropagation();
                                                    onChange(
                                                        selected.filter(
                                                            (s) =>
                                                                sieveRangeKey(
                                                                    s,
                                                                ) !==
                                                                sieveRangeKey(
                                                                    r,
                                                                ),
                                                        ),
                                                    );
                                                }
                                            }}
                                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                                            aria-label={`Remove ${labelFor(r)}`}
                                        >
                                            <X size={12} />
                                        </span>
                                    </span>
                                ))
                            )}
                        </div>
                        <ChevronDown
                            size={14}
                            className={cn(
                                "text-gray-500 transition-transform shrink-0",
                                open && "rotate-180",
                            )}
                        />
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="w-[var(--radix-popover-trigger-width)] p-0 max-h-72 overflow-y-auto"
                >
                    {sortedOptions.length === 0 ? (
                        <div className="p-3 text-xs text-gray-500 text-center">
                            No ranges available
                        </div>
                    ) : (
                        <ul className="py-1">
                            {sortedOptions.map((opt) => {
                                const key = sieveRangeKey([
                                    opt.sieveMin,
                                    opt.sieveMax,
                                ]);
                                const isSelected = selectedKeys.has(key);
                                return (
                                    <li key={key}>
                                        <button
                                            type="button"
                                            onClick={() => toggleOption(opt)}
                                            className={cn(
                                                "w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 transition-colors",
                                                isSelected &&
                                                    "bg-blue-100 font-medium",
                                            )}
                                        >
                                            {opt.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </PopoverContent>
            </Popover>
        </DiamondFilterSection>
    );
};
