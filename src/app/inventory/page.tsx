"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
    List,
    LayoutGrid,
    Filter,
    X,
    Search, // New
    RotateCcw, // New (for Reset)
    ShoppingCart, // New (for Cart)
    Hand, // New (for Inquiry/Hand icon)
    Scale,
    Plus,
    Upload,
    Trash2,
} from "lucide-react";
import DataTable from "@/components/ui/table";
import MelleDataTable from "@/components/ui/melleTable";
import DiamondGrid from "@/components/ui/diamondGrid";
import MelleDiamondGrid from "@/components/ui/melleDiamondGrid";
import TablePagination from "@/components/ui/tablePagination";
import { DiamondFilters } from "@/components/inventory/diamonFilter";
import { MelleDiamondFilters } from "@/components/inventory/MelleDiamondFilter";
import {
    getDiamondColumns,
    getPublicDiamondColumns,
} from "@/components/columns/DiamondColumns";
import {
    getMelleDiamondColumns,
    getPublicMelleDiamondColumns,
} from "@/components/columns/MelleDiamondColumns";
import {
    fetchDiamonds,
    searchDiamonds,
    fetchPublicDiamonds,
    exportDiamonds,
} from "@/services/diamondService";
import {
    searchMelleDiamonds,
    fetchPublicMelleDiamonds,
} from "@/services/melleDiamondService";
import { MelleDiamondFormDialog } from "@/components/dialogs/MelleDiamondFormDialog";
import { DeleteMelleDiamondDialog } from "@/components/dialogs/DeleteMelleDiamondDialog";
import { MelleDiamondImportDialog } from "@/components/dialogs/MelleDiamondImportDialog";
import { MelleDiamondImportV2Dialog } from "@/components/dialogs/MelleDiamondImportV2Dialog";
import { BulkDeleteMelleDiamondsDialog } from "@/components/dialogs/BulkDeleteMelleDiamondsDialog";
import {
    MelleDiamond,
    MelleFilterOptions,
    MelleFilterState,
    PublicMelleDiamond,
    shapesForMelleInventoryKind,
} from "@/interface/melleDiamondInterface";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import {
    Diamond,
    DiamondShape,
    DiamondColor,
    DiamondClarity,
    DiamondCut,
    DiamondColorType,
    PublicDiamond,
} from "@/interface/diamondInterface";
import { Card, CardContent } from "@/components/ui/card";
import ShimmerTable from "@/components/ui/shimmerTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { buildDiamondPath, buildMellePath } from "@/lib/seo/diamondSeo";
import { toast } from "sonner";
import { addToCart, addMelleToCart } from "@/services/cartService";
import { MelleCartCaratDialog } from "@/components/dialogs/MelleCartCaratDialog";
import { useAuth } from "@/context/AuthContext";

function InventoryContent() {
    const router = useRouter();
    const { isAuthenticated, loading: authLoading, user } = useAuth();

    const [data, setData] = useState<(Diamond | PublicDiamond)[]>([]);
    const [melleData, setMelleData] = useState<
        (MelleDiamond | PublicMelleDiamond)[]
    >([]);
    const [isMelee, setIsMelee] = useState(false);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [view, setView] = useState<"list" | "grid">("list");
    // Pagination & Sort State
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // State for selected diamonds
    const [selectedDiamonds, setSelectedDiamonds] = useState<
        (Diamond | PublicDiamond)[]
    >([]);
    const [addingToCart, setAddingToCart] = useState(false);
    const [melleCartDialogOpen, setMelleCartDialogOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
    const [exportFormat, setExportFormat] = useState<"xlsx" | "csv">("xlsx");
    const [isExporting, setIsExporting] = useState(false);

    // Filter State
    const [filterState, setFilterState] = useState({
        shape: [] as DiamondShape[],
        caratRange: [0, 10.99] as [number, number],
        color: [] as DiamondColor[],
        clarity: [] as DiamondClarity[],
        cutGrade: [] as DiamondCut[],
        polish: [] as DiamondCut[],
        symmetry: [] as DiamondCut[],
        fluorescence: [] as string[],
        lab: [] as string[],
        priceRange: [0, 1000000] as [number, number],
        pricePerCaratRange: [0, 1000000] as [number, number],
        discountRange: [-100, 100] as [number, number],
        lengthRange: [0, 20] as [number, number],
        widthRange: [0, 20] as [number, number],
        heightRange: [0, 20] as [number, number],
        depthRange: [0, 100] as [number, number],
        depthPercentRange: [40, 90] as [number, number],
        tablePercentRange: [40, 90] as [number, number],
        isNatural: undefined as boolean | undefined,
        colorType: undefined as DiamondColorType | undefined,
        searchTerm: undefined as string | undefined,
    });

    // Melee-specific filter state. Numeric ranges start at "everything" and
    // are clamped to the server-provided options once they load.
    const [melleFilterState, setMelleFilterState] = useState<MelleFilterState>({
        inventoryKind: "round",
        shape: [],
        color: [],
        clarity: [],
        cut: [],
        melleCategory: [],
        labType: [],
        isLab: undefined,
        priceRange: [0, Number.MAX_SAFE_INTEGER],
        avgPtrRanges: [],
        caratRanges: [],
        measurementMmRange: [0, Number.MAX_SAFE_INTEGER],
        lengthValues: [],
        breadthValues: [],
        sieveRanges: [],
        searchTerm: undefined,
    });
    const [melleOptions, setMelleOptions] = useState<MelleFilterOptions | null>(
        null,
    );

    // Melee selection (for cart / compare).
    const [selectedMelle, setSelectedMelle] = useState<
        (MelleDiamond | PublicMelleDiamond)[]
    >([]);

    // Admin mutation dialogs.
    const [melleFormOpen, setMelleFormOpen] = useState(false);
    const [melleFormTarget, setMelleFormTarget] = useState<
        MelleDiamond | undefined
    >(undefined);
    const [melleDeleteTarget, setMelleDeleteTarget] =
        useState<MelleDiamond | null>(null);
    const [melleImportOpen, setMelleImportOpen] = useState(false);
    const [melleImportV2Open, setMelleImportV2Open] = useState(false);
    const [melleBulkDeleteOpen, setMelleBulkDeleteOpen] = useState(false);

    const isAdminOrSuperAdmin =
        user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

    // Check if any filters are applied
    const hasActiveFilters = useCallback(() => {
        return (
            filterState.shape.length > 0 ||
            filterState.color.length > 0 ||
            filterState.clarity.length > 0 ||
            filterState.cutGrade.length > 0 ||
            filterState.polish.length > 0 ||
            filterState.symmetry.length > 0 ||
            filterState.fluorescence.length > 0 ||
            filterState.lab.length > 0 ||
            filterState.caratRange[0] > 0 ||
            filterState.caratRange[1] < 10.99 ||
            filterState.priceRange[0] > 0 ||
            filterState.priceRange[1] < 1000000 ||
            filterState.lengthRange[0] > 0 ||
            filterState.lengthRange[1] < 20 ||
            filterState.widthRange[0] > 0 ||
            filterState.widthRange[1] < 20 ||
            filterState.depthRange[0] > 0 ||
            filterState.depthRange[1] < 100 ||
            filterState.depthPercentRange[0] > 40 ||
            filterState.depthPercentRange[1] < 90 ||
            filterState.tablePercentRange[0] > 40 ||
            filterState.tablePercentRange[1] < 90 ||
            filterState.isNatural !== undefined ||
            filterState.colorType !== undefined ||
            filterState.searchTerm !== undefined
        );
    }, [filterState]);

    // Narrow-or-skip helper: only pass a range bound if the user has moved
    // it off the server-provided extremum for the Melee filters.
    const narrowRange = (
        current: [number, number],
        bounds?: { min: number; max: number },
    ): { min?: number; max?: number } => {
        if (!bounds) return { min: current[0], max: current[1] };
        return {
            min: current[0] > bounds.min ? current[0] : undefined,
            max: current[1] < bounds.max ? current[1] : undefined,
        };
    };

    const loadMelleData = useCallback(async () => {
        setLoading(true);
        try {
            const price = narrowRange(
                melleFilterState.priceRange,
                melleOptions?.priceRange,
            );
            const measurement = narrowRange(
                melleFilterState.measurementMmRange,
                melleOptions?.measurementRange,
            );
            const defaultShapes =
                melleOptions && melleFilterState.shape.length === 0
                    ? shapesForMelleInventoryKind(
                          melleOptions.shapes,
                          melleFilterState.inventoryKind,
                      )
                    : undefined;
            const isRoundMelle = melleFilterState.inventoryKind === "round";
            const params = {
                page,
                limit: rowsPerPage,
                sortBy,
                sortOrder,
                shape:
                    melleFilterState.shape.length > 0
                        ? melleFilterState.shape
                        : defaultShapes,
                color:
                    melleFilterState.color.length > 0
                        ? melleFilterState.color
                        : undefined,
                clarity:
                    melleFilterState.clarity.length > 0
                        ? melleFilterState.clarity
                        : undefined,
                cut:
                    melleFilterState.cut.length > 0
                        ? melleFilterState.cut
                        : undefined,
                melleCategory:
                    melleFilterState.melleCategory.length > 0
                        ? melleFilterState.melleCategory
                        : undefined,
                labType:
                    melleFilterState.labType.length > 0
                        ? melleFilterState.labType
                        : undefined,
                isLab: melleFilterState.isLab,
                minPrice: isAuthenticated ? price.min : undefined,
                maxPrice: isAuthenticated ? price.max : undefined,
                avgPtrRanges:
                    melleFilterState.avgPtrRanges.length > 0
                        ? melleFilterState.avgPtrRanges
                        : undefined,
                caratRanges:
                    melleFilterState.caratRanges.length > 0
                        ? melleFilterState.caratRanges
                        : undefined,
                measurementRanges:
                    isRoundMelle &&
                    (measurement.min !== undefined ||
                        measurement.max !== undefined)
                        ? ([
                              [
                                  measurement.min ??
                                      melleOptions!.measurementRange.min,
                                  measurement.max ??
                                      melleOptions!.measurementRange.max,
                              ],
                          ] as [number, number][])
                        : undefined,
                lengthValues:
                    !isRoundMelle && melleFilterState.lengthValues.length > 0
                        ? melleFilterState.lengthValues
                        : undefined,
                breadthValues:
                    !isRoundMelle && melleFilterState.breadthValues.length > 0
                        ? melleFilterState.breadthValues
                        : undefined,
                sieveRanges:
                    isRoundMelle && melleFilterState.sieveRanges.length > 0
                        ? melleFilterState.sieveRanges
                        : undefined,
                searchTerm: melleFilterState.searchTerm,
            };

            const result = isAuthenticated
                ? await searchMelleDiamonds(params)
                : await fetchPublicMelleDiamonds(params);

            setMelleData(result.data);
            setTotalCount(result.totalCount);
            setTotalPages(result.totalPages);
            setHasNextPage(result.hasNextPage);
            setHasPrevPage(result.hasPrevPage);
        } catch (error) {
            console.error("Failed to fetch melle diamonds", error);
            setMelleData([]);
            setTotalCount(0);
            setTotalPages(0);
            setHasNextPage(false);
            setHasPrevPage(false);
        } finally {
            setLoading(false);
        }
    }, [
        page,
        rowsPerPage,
        sortBy,
        sortOrder,
        melleFilterState,
        melleOptions,
        isAuthenticated,
    ]);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: rowsPerPage,
                shape:
                    filterState.shape.length > 0
                        ? filterState.shape
                        : undefined,
                color:
                    filterState.color.length > 0
                        ? filterState.color
                        : undefined,
                clarity:
                    filterState.clarity.length > 0
                        ? filterState.clarity
                        : undefined,
                cutGrade:
                    filterState.cutGrade.length > 0
                        ? filterState.cutGrade
                        : undefined,
                polish:
                    filterState.polish.length > 0
                        ? filterState.polish
                        : undefined,
                symmetry:
                    filterState.symmetry.length > 0
                        ? filterState.symmetry
                        : undefined,
                fluorescenceIntensity:
                    filterState.fluorescence.length > 0
                        ? filterState.fluorescence
                        : undefined,
                lab: filterState.lab.length > 0 ? filterState.lab : undefined,
                minPrice:
                    filterState.priceRange[0] > 0
                        ? filterState.priceRange[0]
                        : undefined,
                maxPrice:
                    filterState.priceRange[1] < 1000000
                        ? filterState.priceRange[1]
                        : undefined,
                minPricePerCarat:
                    filterState.pricePerCaratRange[0] > 0
                        ? filterState.pricePerCaratRange[0]
                        : undefined,
                maxPricePerCarat:
                    filterState.pricePerCaratRange[1] < 1000000
                        ? filterState.pricePerCaratRange[1]
                        : undefined,
                minDiscount:
                    filterState.discountRange[0] > -100
                        ? filterState.discountRange[0]
                        : undefined,
                maxDiscount:
                    filterState.discountRange[1] < 100
                        ? filterState.discountRange[1]
                        : undefined,
                minCarat:
                    filterState.caratRange[0] > 0
                        ? filterState.caratRange[0]
                        : undefined,
                maxCarat:
                    filterState.caratRange[1] < 10.99
                        ? filterState.caratRange[1]
                        : undefined,
                minLength:
                    filterState.lengthRange[0] > 0
                        ? filterState.lengthRange[0]
                        : undefined,
                maxLength:
                    filterState.lengthRange[1] < 20
                        ? filterState.lengthRange[1]
                        : undefined,
                minWidth:
                    filterState.widthRange[0] > 0
                        ? filterState.widthRange[0]
                        : undefined,
                maxWidth:
                    filterState.widthRange[1] < 20
                        ? filterState.widthRange[1]
                        : undefined,
                minHeight:
                    filterState.heightRange[0] > 0
                        ? filterState.heightRange[0]
                        : undefined,
                maxHeight:
                    filterState.heightRange[1] < 20
                        ? filterState.heightRange[1]
                        : undefined,
                minDepth:
                    filterState.depthRange[0] > 0
                        ? filterState.depthRange[0]
                        : undefined,
                maxDepth:
                    filterState.depthRange[1] < 100
                        ? filterState.depthRange[1]
                        : undefined,
                minTable:
                    filterState.tablePercentRange[0] > 40
                        ? filterState.tablePercentRange[0]
                        : undefined,
                maxTable:
                    filterState.tablePercentRange[1] < 90
                        ? filterState.tablePercentRange[1]
                        : undefined,
                minDepthPercent:
                    filterState.depthPercentRange[0] > 40
                        ? filterState.depthPercentRange[0]
                        : undefined,
                maxDepthPercent:
                    filterState.depthPercentRange[1] < 90
                        ? filterState.depthPercentRange[1]
                        : undefined,
                sortBy,
                sortOrder,
                isNatural: filterState.isNatural, // Add these new params
                colorType: filterState.colorType, // Add these new params
                searchTerm: filterState.searchTerm, // Add search term
            };

            let result;

            if (isAuthenticated) {
                // Logged in user - fetch private data
                result = await searchDiamonds(params);
                // : await fetchDiamonds(params);
            } else {
                // Public user - fetch public data
                result = await fetchPublicDiamonds(params);
            }

            setData(result.data);
            setTotalCount(result.totalCount);
            setTotalPages(result.totalPages);
            setHasNextPage(result.hasNextPage);
            setHasPrevPage(result.hasPrevPage);
        } catch (error) {
            console.error("Failed to fetch diamonds", error);
        } finally {
            setLoading(false);
        }
    }, [
        page,
        rowsPerPage,
        sortBy,
        sortOrder,
        filterState,
        isAuthenticated,
    ]);

    // Wait for auth to load before fetching data. In melee mode we hit the
    // melle endpoints; otherwise the existing diamond endpoints.
    useEffect(() => {
        if (authLoading) return;

        const timeoutId = setTimeout(() => {
            if (isMelee) {
                loadMelleData();
            } else {
                loadData();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [loadData, loadMelleData, hasActiveFilters, authLoading, isMelee]);

    const buildResetMelleState = (
        options: MelleFilterOptions | null,
        inventoryKind: MelleFilterState["inventoryKind"] = "round",
    ): MelleFilterState => ({
        inventoryKind,
        shape: [],
        color: [],
        clarity: [],
        cut: [],
        melleCategory: [],
        labType: [],
        isLab: undefined,
        priceRange: [
            options?.priceRange.min ?? 0,
            options?.priceRange.max ?? Number.MAX_SAFE_INTEGER,
        ],
        avgPtrRanges: [],
        caratRanges: [],
        measurementMmRange: [
            options?.measurementRange.min ?? 0,
            options?.measurementRange.max ?? Number.MAX_SAFE_INTEGER,
        ],
        lengthValues: [],
        breadthValues: [],
        sieveRanges: [],
        searchTerm: undefined,
    });

    const handleReset = () => {
        if (isMelee) {
            setMelleFilterState(buildResetMelleState(melleOptions));
            setPage(1);
            return;
        }
        setFilterState({
            shape: [],
            caratRange: [0, 10.99],
            color: [],
            clarity: [],
            cutGrade: [],
            polish: [],
            symmetry: [],
            fluorescence: [],
            lab: [],
            priceRange: [0, 1000000],
            pricePerCaratRange: [0, 1000000],
            discountRange: [-100, 100],
            lengthRange: [0, 20],
            widthRange: [0, 20],
            heightRange: [0, 20],
            depthRange: [0, 100],
            depthPercentRange: [40, 90],
            tablePercentRange: [40, 90],
            isNatural: undefined,
            colorType: undefined,
            searchTerm: undefined,
        });
        setPage(1);
        setSelectedDiamonds([]); // Clear selection on reset
    };

    const handleEnterMeleeMode = () => {
        setIsMelee(true);
        setPage(1);
        setSelectedDiamonds([]);
        setData([]);
        setSortBy("createdAt");
        setMelleFilterState(buildResetMelleState(melleOptions));
    };

    const handleExitMeleeMode = (
        updater: (prev: typeof filterState) => typeof filterState,
    ) => {
        setIsMelee(false);
        setPage(1);
        setMelleData([]);
        setSelectedMelle([]);
        setFilterState(updater);
    };

    const handleMelleOptionsLoaded = useCallback(
        (options: MelleFilterOptions) => {
            setMelleOptions(options);
            setMelleFilterState((prev) => {
                const clamp = (
                    current: [number, number],
                    bounds: { min: number; max: number },
                ): [number, number] => [
                    current[0] <= bounds.min || !isFinite(current[0])
                        ? bounds.min
                        : current[0],
                    current[1] >= bounds.max || !isFinite(current[1])
                        ? bounds.max
                        : current[1],
                ];
                return {
                    ...prev,
                    priceRange: clamp(prev.priceRange, options.priceRange),
                    measurementMmRange: clamp(
                        prev.measurementMmRange,
                        options.measurementRange,
                    ),
                };
            });
        },
        [],
    );

    const handleCompare = () => {
        if (selectedDiamonds.length < 2) {
            toast.warning("Please select at least 2 diamonds to compare");
            return;
        }
        const queryString = selectedDiamonds.map((d) => d.stockRef).join(",");
        router.push(`/compare?ids=${queryString}`);
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to cart");
            router.push("/login");
            return;
        }

        if (selectedDiamonds.length === 0) {
            toast.warning("Please select diamonds to add to cart");
            return;
        }

        setAddingToCart(true);
        try {
            const diamondIds = selectedDiamonds
                .filter((d): d is Diamond => "_id" in d)
                .map((diamond) => diamond._id);

            await addToCart(diamondIds);
            toast.success("Selected diamonds added to cart successfully!");
            setSelectedDiamonds([]);
        } catch (error) {
            toast.error(error as string);
        } finally {
            setAddingToCart(false);
        }
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const params = {
                shape:
                    filterState.shape.length > 0
                        ? filterState.shape
                        : undefined,
                color:
                    filterState.color.length > 0
                        ? filterState.color
                        : undefined,
                clarity:
                    filterState.clarity.length > 0
                        ? filterState.clarity
                        : undefined,
                cutGrade:
                    filterState.cutGrade.length > 0
                        ? filterState.cutGrade
                        : undefined,
                polish:
                    filterState.polish.length > 0
                        ? filterState.polish
                        : undefined,
                symmetry:
                    filterState.symmetry.length > 0
                        ? filterState.symmetry
                        : undefined,
                fluorescenceIntensity:
                    filterState.fluorescence.length > 0
                        ? filterState.fluorescence
                        : undefined,
                lab: filterState.lab.length > 0 ? filterState.lab : undefined,
                minPrice:
                    filterState.priceRange[0] > 0
                        ? filterState.priceRange[0]
                        : undefined,
                maxPrice:
                    filterState.priceRange[1] < 1000000
                        ? filterState.priceRange[1]
                        : undefined,
                minPricePerCarat:
                    filterState.pricePerCaratRange[0] > 0
                        ? filterState.pricePerCaratRange[0]
                        : undefined,
                maxPricePerCarat:
                    filterState.pricePerCaratRange[1] < 1000000
                        ? filterState.pricePerCaratRange[1]
                        : undefined,
                minDiscount:
                    filterState.discountRange[0] > -100
                        ? filterState.discountRange[0]
                        : undefined,
                maxDiscount:
                    filterState.discountRange[1] < 100
                        ? filterState.discountRange[1]
                        : undefined,
                minCarat:
                    filterState.caratRange[0] > 0
                        ? filterState.caratRange[0]
                        : undefined,
                maxCarat:
                    filterState.caratRange[1] < 10.99
                        ? filterState.caratRange[1]
                        : undefined,
                minLength:
                    filterState.lengthRange[0] > 0
                        ? filterState.lengthRange[0]
                        : undefined,
                maxLength:
                    filterState.lengthRange[1] < 20
                        ? filterState.lengthRange[1]
                        : undefined,
                minWidth:
                    filterState.widthRange[0] > 0
                        ? filterState.widthRange[0]
                        : undefined,
                maxWidth:
                    filterState.widthRange[1] < 20
                        ? filterState.widthRange[1]
                        : undefined,
                minHeight:
                    filterState.heightRange[0] > 0
                        ? filterState.heightRange[0]
                        : undefined,
                maxHeight:
                    filterState.heightRange[1] < 20
                        ? filterState.heightRange[1]
                        : undefined,
                minDepth:
                    filterState.depthRange[0] > 0
                        ? filterState.depthRange[0]
                        : undefined,
                maxDepth:
                    filterState.depthRange[1] < 100
                        ? filterState.depthRange[1]
                        : undefined,
                minTable:
                    filterState.tablePercentRange[0] > 40
                        ? filterState.tablePercentRange[0]
                        : undefined,
                maxTable:
                    filterState.tablePercentRange[1] < 90
                        ? filterState.tablePercentRange[1]
                        : undefined,
                minDepthPercent:
                    filterState.depthPercentRange[0] > 40
                        ? filterState.depthPercentRange[0]
                        : undefined,
                maxDepthPercent:
                    filterState.depthPercentRange[1] < 90
                        ? filterState.depthPercentRange[1]
                        : undefined,
                isNatural: filterState.isNatural,
                colorType: filterState.colorType,
                searchTerm: filterState.searchTerm,
                sortBy,
                sortOrder,
            };
            await exportDiamonds(params, exportFormat);
            setIsExportDialogOpen(false);
            toast.success(
                `Exported successfully as ${exportFormat.toUpperCase()}`,
            );
        } catch (error) {
            toast.error("Failed to export. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    const handleViewDetails = (diamond: Diamond | PublicDiamond) => {
        if (diamond.stockRef) {
            // The active Natural/Lab tab tells us the origin the record itself
            // does not carry, so the slug keyword is correct.
            router.push(buildDiamondPath(diamond, filterState.isNatural));
        } else {
            console.error("Diamond missing stock reference");
        }
    };

    const handleViewMelleDetails = (
        diamond: MelleDiamond | PublicMelleDiamond,
    ) => {
        if (diamond._id) {
            router.push(buildMellePath(diamond));
        } else {
            console.error("Melle diamond missing _id");
        }
    };

    const openMelleCreate = () => {
        setMelleFormTarget(undefined);
        setMelleFormOpen(true);
    };

    const openMelleEdit = (d: MelleDiamond) => {
        setMelleFormTarget(d);
        setMelleFormOpen(true);
    };

    const openMelleDelete = (d: MelleDiamond) => {
        setMelleDeleteTarget(d);
    };

    const handleMelleSaved = () => {
        loadMelleData();
    };

    const handleMelleDeleted = (deletedId: string) => {
        setMelleData((prev) => prev.filter((d) => d._id !== deletedId));
        setSelectedMelle((prev) => prev.filter((d) => d._id !== deletedId));
    };

    const handleMelleBulkDeleted = (deletedIds: string[]) => {
        const idSet = new Set(deletedIds);
        setMelleData((prev) => prev.filter((d) => !idSet.has(d._id)));
        setSelectedMelle((prev) => prev.filter((d) => !idSet.has(d._id)));
    };

    const openMelleBulkDelete = () => {
        if (selectedMelle.length === 0) {
            toast.warning("Select at least one melee diamond to delete");
            return;
        }
        setMelleBulkDeleteOpen(true);
    };

    const handleMelleAddToCart = () => {
        if (!isAuthenticated) {
            toast.error("Please login to add items to cart");
            router.push("/login");
            return;
        }
        if (selectedMelle.length === 0) {
            toast.warning("Please select melee diamonds to add to cart");
            return;
        }
        setMelleCartDialogOpen(true);
    };

    const handleMelleCartConfirm = async (
        items: { melleId: string; requestedCarat: number }[],
    ) => {
        setAddingToCart(true);
        try {
            await addMelleToCart(items);
            toast.success("Selected melee diamonds added to cart");
            setSelectedMelle([]);
        } finally {
            setAddingToCart(false);
        }
    };

    const handleMelleCompare = () => {
        if (selectedMelle.length < 2) {
            toast.warning("Please select at least 2 melee diamonds to compare");
            return;
        }
        const ids = selectedMelle.map((d) => d._id).join(",");
        router.push(`/compare?ids=${ids}&type=melle`);
    };

    const handleSort = useCallback(
        (columnKey: string) => {
            setSortBy(columnKey);
            setSortOrder((prevOrder) => {
                // If clicking the same column, toggle order
                if (sortBy === columnKey) {
                    return prevOrder === "asc" ? "desc" : "asc";
                }
                // If clicking a new column, default to ascending
                return "asc";
            });
            setPage(1); // Reset to first page when sorting changes
        },
        [sortBy],
    );

    // Diamond detail pages now live at their own SEO routes
    // (/diamonds/[slug] and /diamonds/melee/[slug]); this page is the
    // inventory list only.

    // Show the Inventory List
    return (
        <div className="p-4 space-y-2 bg-brand-gradient min-h-screen ">
            {/* 1. FILTER DASHBOARD */}
            {/* Diamond Types */}
            <div className="flex flex-col rounded-lg w-full overflow-hidden border-primary border-2 mb-4">
                <div className="bg-primary-purple2 flex justify-start items-center gap-2">
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                            handleExitMeleeMode((prev) => ({
                                ...prev,
                                isNatural: true,
                            }))
                        }
                        className={`text-white my-1 rounded-md ml-1 hover:text-white transition-all ${
                            !isMelee && filterState.isNatural === true
                                ? "border-2 border-primary-yellow-1  font-semibold"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Natural Diamonds
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={() =>
                            handleExitMeleeMode((prev) => ({
                                ...prev,
                                isNatural: false,
                            }))
                        }
                        className={`text-white my-1 rounded-md hover:text-white transition-all ${
                            !isMelee && filterState.isNatural === false
                                ? "border-2 border-primary-yellow-1 font-semibold"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Lab Diamonds
                    </Button>
                    <Button
                        variant={"ghost"}
                        onClick={handleEnterMeleeMode}
                        className={`text-white my-1 rounded-md hover:text-white transition-all ${
                            isMelee
                                ? "border-2 border-primary-yellow-1 font-semibold"
                                : "hover:bg-white/10"
                        }`}
                    >
                        Melee Diamonds
                    </Button>
                </div>
                {!isMelee && (
                    <div className="bg-white flex justify-start items-center gap-2">
                        <Button
                            variant={"ghost"}
                            onClick={() =>
                                setFilterState((prev) => ({
                                    ...prev,
                                    colorType: "white",
                                }))
                            }
                            className={`text-black my-1 rounded-md ml-1 transition-all ${
                                filterState.colorType === "white"
                                    ? "border-2 border-primary-yellow-1 font-semibold"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            White Diamonds
                        </Button>
                        <Button
                            variant={"ghost"}
                            onClick={() =>
                                setFilterState((prev) => ({
                                    ...prev,
                                    colorType: "fancy",
                                }))
                            }
                            className={`text-black my-1 rounded-md transition-all ${
                                filterState.colorType === "fancy"
                                    ? "border-2 border-primary-yellow-1 font-semibold"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            Fancy Color
                        </Button>
                    </div>
                )}
                {isMelee && (
                    <div className="bg-white flex justify-start items-center gap-2">
                        <Button
                            variant={"ghost"}
                            onClick={() =>
                                setMelleFilterState((prev) => ({
                                    ...prev,
                                    isLab:
                                        prev.isLab === false
                                            ? undefined
                                            : false,
                                    // Switching off Lab must clear stale
                                    // HPHT/CVD chips.
                                    labType: [],
                                }))
                            }
                            className={`text-black my-1 rounded-md ml-1 transition-all ${
                                melleFilterState.isLab === false
                                    ? "border-2 border-primary-yellow-1 font-semibold"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            Natural
                        </Button>
                        <Button
                            variant={"ghost"}
                            onClick={() =>
                                setMelleFilterState((prev) => ({
                                    ...prev,
                                    isLab:
                                        prev.isLab === true ? undefined : true,
                                    labType:
                                        prev.isLab === true ? [] : prev.labType,
                                }))
                            }
                            className={`text-black my-1 rounded-md transition-all ${
                                melleFilterState.isLab === true
                                    ? "border-2 border-primary-yellow-1 font-semibold"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            Lab
                        </Button>
                    </div>
                )}
            </div>
            <div className="hidden lg:block">
                {isMelee ? (
                    <MelleDiamondFilters
                        filters={melleFilterState}
                        setFilters={setMelleFilterState}
                        onOptionsLoaded={handleMelleOptionsLoaded}
                    />
                ) : (
                    <DiamondFilters
                        filters={filterState}
                        setFilters={setFilterState}
                        onReset={handleReset}
                    />
                )}
            </div>
            {/* mobile actions row */}
            <div className="flex lg:hidden items-center justify-between gap-2 bg-white p-2 rounded-lg mb-4 shadow-sm">
                {/* 1. View Toggle (List/Grid) */}
                <button
                    onClick={() => setView(view === "list" ? "grid" : "list")}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {view === "list" ? (
                        <LayoutGrid size={20} />
                    ) : (
                        <List size={20} />
                    )}
                </button>

                {/* 2. Search Bar */}
                <div className="flex-1 relative min-w-20">
                    <Input
                        type="text"
                        placeholder={isMelee ? "Stock ID" : "Diamond ID"}
                        value={
                            isMelee
                                ? melleFilterState.searchTerm || ""
                                : filterState.searchTerm || ""
                        }
                        className="h-10 w-full rounded-full bg-gray-50 border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-1 focus-visible:ring-primary-purple2"
                        onChange={(e) => {
                            const val = e.target.value || undefined;
                            if (isMelee) {
                                setMelleFilterState((prev) => ({
                                    ...prev,
                                    searchTerm: val,
                                }));
                            } else {
                                setFilterState((prev) => ({
                                    ...prev,
                                    searchTerm: val,
                                }));
                            }
                        }}
                    />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        <Search size={14} />
                    </button>
                </div>

                {/* 3. Action Icons Group */}
                <div className="flex items-center gap-1.5">
                    {/* Reset */}
                    <button
                        onClick={handleReset}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full border border-gray-100 bg-white"
                        title="Reset Filters"
                        disabled={!hasActiveFilters()}
                    >
                        <RotateCcw size={18} />
                    </button>

                    {isAuthenticated && (
                        <button
                            onClick={
                                isMelee ? handleMelleAddToCart : handleAddToCart
                            }
                            className={`p-2 rounded-full border border-gray-100 bg-gray-100 ${
                                (isMelee
                                    ? selectedMelle.length
                                    : selectedDiamonds.length) > 0
                                    ? "text-primary-purple2 bg-purple-50"
                                    : "text-gray-500"
                            }`}
                        >
                            <ShoppingCart size={18} />
                        </button>
                    )}

                    {isAuthenticated && (
                        <button
                            onClick={
                                isMelee ? handleMelleCompare : handleCompare
                            }
                            className="p-2 text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-full"
                            title="Compare"
                        >
                            <Scale size={18} />
                        </button>
                    )}

                    {/* Filter (Solid Black) */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`p-2 rounded-full text-white transition-colors ${
                            hasActiveFilters()
                                ? "bg-primary-purple2"
                                : "bg-black hover:bg-gray-800"
                        }`}
                    >
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Laptop Actions Row */}
            <div className="w-full hidden lg:block bg-white rounded-lg px-2 py-1">
                <div className="flex items-center justify-between gap-4">
                    {/* Left side - Action buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            className="lg:hidden p-1.5 rounded-sm border border-gray-200  "
                            onClick={() => setIsFilterOpen((prev) => !prev)}
                        >
                            <Filter size={15} />
                        </button>
                        {/* List/Grid toggle buttons */}
                        <div className="flex items-center gap-0 rounded-md border border-gray-200 bg-white  w-fit">
                            {/* List View Button */}
                            <button
                                onClick={() => setView("list")}
                                className={`p-2 rounded-sm transition-all duration-200 ${
                                    view === "list"
                                        ? "bg-primary-purple2 text-white shadow-sm"
                                        : "text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                <List className="h-5 w-5" />
                            </button>

                            {/* Grid View Button */}
                            <button
                                onClick={() => setView("grid")}
                                className={`p-2 rounded-sm transition-all duration-200 ${
                                    view === "grid"
                                        ? "bg-primary-purple2 text-white shadow-sm"
                                        : "text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                <LayoutGrid className="h-5 w-5" />
                            </button>
                        </div>

                        <Button
                            variant="outline"
                            className="text-sm"
                            onClick={handleReset}
                            disabled={!hasActiveFilters()}
                        >
                            Reset Filters
                        </Button>
                        <Button variant="outline" className="text-sm">
                            <Filter /> Advanced Filters
                        </Button>

                        {/* Admin-only: create melee diamond */}
                        {isAuthenticated && isMelee && isAdminOrSuperAdmin && (
                            <Button
                                variant="outline"
                                className="text-sm border-primary-purple text-primary-purple hover:bg-primary-purple/10"
                                onClick={openMelleCreate}
                            >
                                <Plus /> Add Melee Diamond
                            </Button>
                        )}

                        {/* Cart — regular mode uses diamond cart; melee mode
                             sends melle _ids to the same endpoint. */}
                        {isAuthenticated && !isMelee && (
                            <Button
                                variant="outline"
                                className="text-sm"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart /> Cart{" "}
                                {selectedDiamonds.length > 0 &&
                                    `(${selectedDiamonds.length})`}
                            </Button>
                        )}
                        {isAuthenticated && isMelee && (
                            <Button
                                variant="outline"
                                className="text-sm"
                                onClick={handleMelleAddToCart}
                                disabled={addingToCart}
                            >
                                <ShoppingCart /> Cart{" "}
                                {selectedMelle.length > 0 &&
                                    `(${selectedMelle.length})`}
                            </Button>
                        )}

                        {/* Compare */}
                        {isAuthenticated && !isMelee && (
                            <Button
                                variant="outline"
                                className="text-sm"
                                onClick={handleCompare}
                            >
                                <Scale /> Compare{" "}
                                {selectedDiamonds.length > 0 &&
                                    `(${selectedDiamonds.length})`}
                            </Button>
                        )}
                        {isAuthenticated && isMelee && (
                            <Button
                                variant="outline"
                                className="text-sm"
                                onClick={handleMelleCompare}
                            >
                                <Scale /> Compare{" "}
                                {selectedMelle.length > 0 &&
                                    `(${selectedMelle.length})`}
                            </Button>
                        )}

                        {isAuthenticated && isMelee && isAdminOrSuperAdmin && (
                            <Button
                                variant="outline"
                                className="text-sm border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50"
                                onClick={openMelleBulkDelete}
                                disabled={selectedMelle.length === 0}
                            >
                                <Trash2 /> Delete{" "}
                                {selectedMelle.length > 0 &&
                                    `(${selectedMelle.length})`}
                            </Button>
                        )}

                        {isAuthenticated && isMelee && isAdminOrSuperAdmin && (
                            <Button
                                variant="outline"
                                className="text-sm border-primary-purple text-primary-purple hover:bg-primary-purple/10"
                                onClick={() => setMelleImportOpen(true)}
                            >
                                <Upload /> Import
                            </Button>
                        )}

                        {isAuthenticated && isMelee && isAdminOrSuperAdmin && (
                            <Button
                                variant="outline"
                                className="text-sm border-primary-purple text-primary-purple hover:bg-primary-purple/10"
                                onClick={() => setMelleImportV2Open(true)}
                            >
                                <Upload /> Import v2
                            </Button>
                        )}

                        {isAuthenticated && !isMelee && (
                            <Button
                                variant="outline"
                                className="text-sm"
                                onClick={() => setIsExportDialogOpen(true)}
                            >
                                <Download /> Export
                            </Button>
                        )}
                    </div>

                    {/* Right side - Search */}
                    <div className="relative w-full max-w-sm">
                        <Input
                            type="text"
                            placeholder={
                                isMelee ? "Stock ID" : "Lot/Certificate"
                            }
                            value={
                                isMelee
                                    ? melleFilterState.searchTerm || ""
                                    : filterState.searchTerm || ""
                            }
                            className="h-10 w-full rounded-4xl border border-gray-300 pl-5 pr-28 focus-visible:ring-2 focus-visible:ring-primary-purple2"
                            onChange={(e) => {
                                const val = e.target.value || undefined;
                                if (isMelee) {
                                    setMelleFilterState((prev) => ({
                                        ...prev,
                                        searchTerm: val,
                                    }));
                                } else {
                                    setFilterState((prev) => ({
                                        ...prev,
                                        searchTerm: val,
                                    }));
                                }
                            }}
                        />
                        <Button className="absolute right-0 top-0 h-full  rounded-4xl bg-gray-800 px-8 text-white hover:bg-gray-700">
                            Search
                        </Button>
                    </div>
                </div>
                {/* Applied filters with cross icon to remove them */}
                <div></div>
            </div>

            {/* 2. TABLE CARD */}
            <Card className="shadow-md rounded-lg overflow-hidden bg-white p-0 border-none">
                <CardContent className="p-0">
                    <div className="w-full max-h-100vh overflow-x-auto flex overflow-y-scroll ">
                        {/* Move sidebar outside the loading condition */}
                        {isFilterOpen && (
                            <div className="-50 flex lg:hidden">
                                <div
                                    className=" bg-black/50 backdrop-blur-sm transition-opacity"
                                    onClick={() => setIsFilterOpen(false)}
                                />
                                <div className="relative w-[300px] max-w-[40vw] rounded-lg h-full  shadow-xl flex flex-col animate-in slide-in-from-left slide-out-to-right duration-200">
                                    <div className="px-4 py-2 border-b flex items-center justify-between bg-primary-purple2 text-white rounded-t-md">
                                        <span className="font-semibold">
                                            Filters
                                        </span>
                                        <button
                                            onClick={() =>
                                                setIsFilterOpen(false)
                                            }
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                        {isMelee ? (
                                            <MelleDiamondFilters
                                                filters={melleFilterState}
                                                setFilters={setMelleFilterState}
                                                onOptionsLoaded={
                                                    handleMelleOptionsLoaded
                                                }
                                                variant="sidebar"
                                            />
                                        ) : (
                                            <DiamondFilters
                                                filters={filterState}
                                                setFilters={setFilterState}
                                                onReset={handleReset}
                                                variant="sidebar"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading state only affects table/grid content */}
                        {loading ? (
                            <div className="w-full p-4">
                                <ShimmerTable
                                    rowCount={rowsPerPage}
                                    columnCount={12}
                                />
                            </div>
                        ) : isMelee ? (
                            melleData.length > 0 ? (
                                view === "grid" ? (
                                    <MelleDiamondGrid
                                        data={melleData}
                                        onViewDetails={handleViewMelleDetails}
                                        getHref={(d) => buildMellePath(d)}
                                    />
                                ) : isAuthenticated ? (
                                    <MelleDataTable
                                        data={melleData as MelleDiamond[]}
                                        columns={getMelleDiamondColumns(
                                            handleViewMelleDetails,
                                            handleSort,
                                            sortBy,
                                            sortOrder,
                                            isAdminOrSuperAdmin
                                                ? {
                                                      onEdit: openMelleEdit,
                                                      onDelete: openMelleDelete,
                                                  }
                                                : undefined,
                                            (d) => buildMellePath(d),
                                        )}
                                        enableSelection
                                        selected={
                                            selectedMelle as MelleDiamond[]
                                        }
                                        onSelectionChange={(rows) =>
                                            setSelectedMelle(rows)
                                        }
                                    />
                                ) : (
                                    <MelleDataTable
                                        data={melleData as PublicMelleDiamond[]}
                                        columns={getPublicMelleDiamondColumns(
                                            handleViewMelleDetails,
                                            handleSort,
                                            sortBy,
                                            sortOrder,
                                            (d) => buildMellePath(d),
                                        )}
                                    />
                                )
                            ) : (
                                <div className="text-center py-12 text-gray-500 w-full">
                                    <p className="text-lg font-medium">
                                        No melee diamonds found
                                    </p>
                                    <p className="text-sm mt-2">
                                        Try adjusting your filters
                                    </p>
                                </div>
                            )
                        ) : data.length > 0 ? (
                            view === "grid" ? (
                                <DiamondGrid
                                    data={data}
                                    onViewDetails={handleViewDetails}
                                    getHref={(d) =>
                                        buildDiamondPath(
                                            d,
                                            filterState.isNatural,
                                        )
                                    }
                                />
                            ) : (
                                <DataTable
                                    data={data}
                                    columns={
                                        isAuthenticated
                                            ? getDiamondColumns(
                                                  handleViewDetails,
                                                  handleSort, // Pass sort handler
                                                  sortBy,
                                                  sortOrder,
                                                  (d) =>
                                                      buildDiamondPath(
                                                          d,
                                                          filterState.isNatural,
                                                      ),
                                              )
                                            : getPublicDiamondColumns(
                                                  handleViewDetails,
                                                  handleSort, // Pass sort handler
                                                  sortBy,
                                                  sortOrder,
                                                  (d) =>
                                                      buildDiamondPath(
                                                          d,
                                                          filterState.isNatural,
                                                      ),
                                              )
                                    }
                                    columnStyles={{
                                        weight: "font-bold",
                                    }}
                                    enableSelection={isAuthenticated}
                                    selectedDiamonds={selectedDiamonds}
                                    onSelectionChange={setSelectedDiamonds}
                                />
                            )
                        ) : (
                            <div className="text-center py-12 text-gray-500 w-full">
                                <p className="text-lg font-medium">
                                    No diamonds found
                                </p>
                                <p className="text-sm mt-2">
                                    Try adjusting your filters or search
                                    criteria
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 3. PAGINATION */}
                    {!loading &&
                        (isMelee ? melleData.length > 0 : data.length > 0) && (
                            <div className="border-t p-2">
                                <TablePagination
                                    total={totalCount}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    totalPages={totalPages}
                                    hasNextPage={hasNextPage}
                                    hasPrevPage={hasPrevPage}
                                    onPageChange={setPage}
                                    onRowsPerPageChange={(newRowsPerPage) => {
                                        setRowsPerPage(newRowsPerPage);
                                        setPage(1);
                                    }}
                                />
                            </div>
                        )}
                </CardContent>
            </Card>
            {/* Export Dialog */}
            <Dialog
                open={isExportDialogOpen}
                onOpenChange={setIsExportDialogOpen}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Export Diamonds</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-3">
                        <p className="text-sm text-gray-500">
                            Select a format to export the current filtered
                            results.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setExportFormat("xlsx")}
                                className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                    exportFormat === "xlsx"
                                        ? "border-primary-purple2 bg-primary-purple2/5 text-primary-purple2"
                                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                            >
                                XLSX
                                <p className="text-xs font-normal text-gray-400 mt-0.5">
                                    Excel format
                                </p>
                            </button>
                            <button
                                onClick={() => setExportFormat("csv")}
                                className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                    exportFormat === "csv"
                                        ? "border-primary-purple2 bg-primary-purple2/5 text-primary-purple2"
                                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                            >
                                CSV
                                <p className="text-xs font-normal text-gray-400 mt-0.5">
                                    Comma-separated
                                </p>
                            </button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsExportDialogOpen(false)}
                            disabled={isExporting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="bg-primary-purple2 hover:bg-primary-purple2/90 text-white"
                        >
                            {isExporting ? (
                                <>
                                    <Download className="w-4 h-4 mr-2 animate-bounce" />
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-2" />
                                    Export {exportFormat.toUpperCase()}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {isAuthenticated && isMelee && (
                <MelleCartCaratDialog
                    open={melleCartDialogOpen}
                    onOpenChange={setMelleCartDialogOpen}
                    diamonds={selectedMelle.filter(
                        (d): d is MelleDiamond => "_id" in d,
                    )}
                    onConfirm={handleMelleCartConfirm}
                />
            )}

            {/* Melee admin dialogs */}
            {isAuthenticated && isAdminOrSuperAdmin && (
                <>
                    <MelleDiamondFormDialog
                        open={melleFormOpen}
                        onOpenChange={setMelleFormOpen}
                        diamond={melleFormTarget}
                        options={melleOptions}
                        onSuccess={handleMelleSaved}
                    />
                    <DeleteMelleDiamondDialog
                        open={melleDeleteTarget !== null}
                        onOpenChange={(open) =>
                            !open && setMelleDeleteTarget(null)
                        }
                        diamond={melleDeleteTarget}
                        onSuccess={handleMelleDeleted}
                    />
                    <MelleDiamondImportDialog
                        open={melleImportOpen}
                        onOpenChange={setMelleImportOpen}
                        options={melleOptions}
                        onSuccess={loadMelleData}
                    />
                    <MelleDiamondImportV2Dialog
                        open={melleImportV2Open}
                        onOpenChange={setMelleImportV2Open}
                        onSuccess={loadMelleData}
                    />
                    <BulkDeleteMelleDiamondsDialog
                        open={melleBulkDeleteOpen}
                        onOpenChange={setMelleBulkDeleteOpen}
                        ids={selectedMelle.map((d) => d._id)}
                        onSuccess={handleMelleBulkDeleted}
                    />
                </>
            )}
        </div>
    );
}

export default function InventoryPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                        <p className="text-gray-500">Loading Inventory...</p>
                    </div>
                </div>
            }
        >
            <InventoryContent />
        </Suspense>
    );
}
