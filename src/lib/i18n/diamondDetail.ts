import {
    type AnyDiamond,
    cutLabel,
    fluorescenceLabel,
    formatCarat,
    getAvailabilityText,
    getDiamondType,
    getShapeFullName,
    labName,
} from "@/lib/seo/diamondSeo";

export type DiamondValueMessages = {
    shapes: Record<string, string>;
    diamondTypes: {
        natural: string;
        labGrown: string;
    };
    diamondTypeTitles: {
        natural: string;
        labGrown: string;
    };
    cutLabels: Record<string, string>;
    fluorescenceLabels: Record<string, string>;
    availabilityLabels: Record<string, string>;
    fallbacks: {
        graded: string;
        fine: string;
        balanced: string;
        none: string;
    };
    recommendedMetals: {
        colourless: string;
        nearColourless: string;
        warm: string;
    };
    recommendedSettings: {
        elongated: string;
        classic: string;
        other: string;
    };
    origins: {
        natural: string;
        labGrown: string;
    };
    buyerReasons: {
        natural: string;
        labGrown: string;
    };
    originExplanations: {
        natural: string;
        labGrown: string;
    };
};

export type DiamondSeoSection = {
    id?: string;
    title: string;
    paragraphs?: string[];
    paragraphsByType?: {
        natural: string[];
        labGrown: string[];
    };
    table?: {
        head: [string, string];
        rows: [string, string][];
    };
};

export type DiamondSeoMessages = {
    metaTitle: string;
    metaDescription: string;
    notFoundTitle: string;
    title: string;
    sections: DiamondSeoSection[];
    faq: {
        title: string;
        items: { question: string; answer: string }[];
    };
};

export type DiamondDetailMessages = {
    ui: Record<string, string>;
    media: Record<string, string>;
    values: DiamondValueMessages;
    seo: DiamondSeoMessages;
};

const translatedCode = (
    code: string | undefined,
    labels: Record<string, string>,
    fallback: string,
) => {
    if (!code) return fallback;
    return labels[String(code).toUpperCase()] ?? fallback;
};

export const getLocalizedShapeName = (
    diamond: AnyDiamond,
    messages: DiamondValueMessages,
) => messages.shapes[diamond.shape] ?? getShapeFullName(diamond.shape);

export const getDiamondTemplateValues = (
    diamond: AnyDiamond,
    messages: DiamondValueMessages,
): Record<string, string> => {
    const isLab = getDiamondType(diamond) === "Lab Grown";
    const typeKey = isLab ? "labGrown" : "natural";
    const shape = getLocalizedShapeName(diamond, messages);
    const shapeEnglish = getShapeFullName(diamond.shape).toLowerCase();
    const color = String(diamond.color || "").toUpperCase();
    const metalKey = ["D", "E", "F"].includes(color)
        ? "colourless"
        : ["G", "H", "I", "J"].includes(color)
          ? "nearColourless"
          : "warm";
    const settingKey = ["oval", "pear", "marquise", "emerald"].includes(
        shapeEnglish,
    )
        ? "elongated"
        : ["round", "cushion", "princess"].includes(shapeEnglish)
          ? "classic"
          : "other";

    const cut = translatedCode(
        diamond.cutGrade,
        messages.cutLabels,
        cutLabel(diamond.cutGrade) || messages.fallbacks.graded,
    );
    const polish = translatedCode(
        diamond.polish,
        messages.cutLabels,
        cutLabel(diamond.polish) || messages.fallbacks.fine,
    );
    const symmetry = translatedCode(
        diamond.symmetry,
        messages.cutLabels,
        cutLabel(diamond.symmetry) || messages.fallbacks.balanced,
    );
    const fluorescence = translatedCode(
        diamond.fluorescenceIntensity,
        messages.fluorescenceLabels,
        fluorescenceLabel(diamond.fluorescenceIntensity) ||
            messages.fallbacks.none,
    );
    const availability = translatedCode(
        diamond.availability,
        messages.availabilityLabels,
        getAvailabilityText(diamond.availability),
    );

    return {
        carat: formatCarat(diamond.weight),
        shape,
        diamond_type: messages.diamondTypes[typeKey],
        diamond_type_title: messages.diamondTypeTitles[typeKey],
        colour: diamond.color || "-",
        color: diamond.color || "-",
        clarity: diamond.clarity || "-",
        cut,
        polish,
        symmetry,
        fluorescence,
        certificate: labName(diamond.lab),
        measurements: diamond.measurements || "-",
        depth: diamond.depthPerc ? `${diamond.depthPerc}%` : "-",
        table: diamond.tablePerc ? `${diamond.tablePerc}%` : "-",
        stock_number: diamond.stockRef,
        availability,
        recommended_metal: messages.recommendedMetals[metalKey],
        recommended_setting: messages.recommendedSettings[settingKey],
        origin_description: messages.origins[typeKey],
        buyer_reason: messages.buyerReasons[typeKey],
        origin_explanation: messages.originExplanations[typeKey],
    };
};

export const fillDiamondTemplate = (
    template: string,
    values: Record<string, string>,
): string =>
    template.replace(/\[([a-z_]+)\]/gi, (match, key: string) =>
        Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match,
    );
