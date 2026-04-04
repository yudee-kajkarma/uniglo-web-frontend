import * as XLSX from "xlsx";
import { Diamond } from "@/interface/diamondInterface";

const EXCLUDED_KEYS: Set<string> = new Set([
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "similar_diamonds",
    "imageUrls",
    "videoUrls",
    "webLink",
    "videoLink",
]);

const COLUMN_LABELS: Record<string, string> = {
    stockRef: "Stock Ref",
    InternalStockRefKey: "Internal Stock Ref",
    availability: "Availability",
    source: "Source",
    shape: "Shape",
    weight: "Carat",
    color: "Color",
    clarity: "Clarity",
    shade: "Shade",
    cutGrade: "Cut Grade",
    polish: "Polish",
    symmetry: "Symmetry",
    fluorescenceIntensity: "Fluorescence Intensity",
    fluorescenceColor: "Fluorescence Color",
    measurements: "Measurements",
    length: "Length",
    width: "Width",
    height: "Height",
    depthPerc: "Depth %",
    tablePerc: "Table %",
    crownAngle: "Crown Angle",
    crownHeight: "Crown Height",
    pavalionAngle: "Pavilion Angle",
    pavalionDepth: "Pavilion Depth",
    girdle: "Girdle",
    girdleThin: "Girdle Thin",
    girdlePerc: "Girdle %",
    girdleCondition: "Girdle Condition",
    culetSize: "Culet Size",
    culetCondition: "Culet Condition",
    lab: "Lab",
    certiNo: "Certificate No",
    certIssueDate: "Cert Issue Date",
    certComment: "Cert Comment",
    laserInscription: "Laser Inscription",
    priceListUSD: "Rap Price ($)",
    pricePerCts: "Price Per Ct ($)",
    discPerc: "Discount %",
    cashDiscPerc: "Cash Disc %",
    cashDiscPrice: "Cash Disc Price ($)",
    keyToSymbols: "Key To Symbols",
    milky: "Milky",
    blackinclusion: "Black Inclusion",
    eyeClean: "Eye Clean",
    memberComment: "Comment",
    handA: "H&A",
    identificationMarks: "Identification Marks",
    enhancements: "Enhancements",
    treatment: "Treatment",
    origin: "Origin",
    fancyColor: "Fancy Color",
    fancyIntensity: "Fancy Intensity",
    fancyOvertone: "Fancy Overtone",
    city: "City",
    state: "State",
    country: "Country",
    pairStockRef: "Pair Stock Ref",
    isMatchedPairSeparable: "Matched Pair Separable",
};

export function exportDiamondsToExcel(
    diamonds: Diamond[],
    fileName: string = "diamonds",
) {
    if (diamonds.length === 0) return;

    const keys = Object.keys(diamonds[0]).filter(
        (key) => !EXCLUDED_KEYS.has(key),
    );

    const rows = diamonds.map((d) => {
        const row: Record<string, unknown> = {};
        for (const key of keys) {
            const label = COLUMN_LABELS[key] || key;
            const value = (d as unknown as Record<string, unknown>)[key];
            row[label] = Array.isArray(value) ? value.join(", ") : value;
        }
        return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Diamonds");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
