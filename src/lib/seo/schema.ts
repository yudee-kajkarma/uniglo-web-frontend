// lib/seo/schema.ts
//
// JSON-LD structured-data builders. Pricing is intentionally omitted from the
// Offer (prices are gated behind login), so we expose availability, condition
// and seller only — valid schema.org without misleading price data.

import {
    SITE_URL,
    type AnyDiamond,
    type AnyMelle,
    getShapeFullName,
    getDiamondMetaDescription,
    getDiamondMetaTitle,
    getDiamondType,
    getDiamondPrimaryImage,
    buildDiamondUrl,
    cutLabel,
    fluorescenceLabel,
    labName,
    formatCarat,
    melleShapeFullName,
    getMelleType,
    getMelleMetaTitle,
    getMelleMetaDescription,
    getMellePrimaryImage,
    buildMelleUrl,
    melleSieveLabel,
    melleMeasurementLabel,
} from "@/lib/seo/diamondSeo";

const SELLER = {
    "@type": "Organization",
    name: "Uniglo Diamonds",
    url: `${SITE_URL}/`,
};

const availabilitySchema = (availability: string | undefined): string => {
    switch (String(availability || "").toUpperCase()) {
        case "S":
        case "SOLD":
            return "https://schema.org/SoldOut";
        case "H":
        case "HOLD":
            return "https://schema.org/LimitedAvailability";
        default:
            return "https://schema.org/InStock";
    }
};

const prop = (name: string, value: unknown) => ({
    "@type": "PropertyValue",
    name,
    value: String(value),
});

const breadcrumbList = (
    title: string,
    url: string,
): Record<string, unknown> => ({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Inventory",
            item: `${SITE_URL}/inventory`,
        },
        {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: url,
        },
    ],
});

/** Product + BreadcrumbList graph for a loose diamond. */
export const buildDiamondJsonLd = (
    diamond: AnyDiamond,
): Record<string, unknown> => {
    const url = buildDiamondUrl(diamond);
    const title = getDiamondMetaTitle(diamond);
    const image = getDiamondPrimaryImage(diamond);
    const type = getDiamondType(diamond);
    const shape = getShapeFullName(diamond.shape);

    const additionalProperty = [
        prop("Diamond Type", type),
        prop("Shape", shape),
        prop("Carat Weight", formatCarat(diamond.weight)),
        prop("Colour", diamond.color),
        prop("Clarity", diamond.clarity),
        diamond.cutGrade && prop("Cut", cutLabel(diamond.cutGrade)),
        diamond.polish && prop("Polish", cutLabel(diamond.polish)),
        diamond.symmetry && prop("Symmetry", cutLabel(diamond.symmetry)),
        prop("Fluorescence", fluorescenceLabel(diamond.fluorescenceIntensity)),
        diamond.measurements && prop("Measurements", diamond.measurements),
        diamond.depthPerc && prop("Depth %", diamond.depthPerc),
        diamond.tablePerc && prop("Table %", diamond.tablePerc),
        prop("Certificate", labName(diamond.lab)),
    ].filter(Boolean);

    const product: Record<string, unknown> = {
        "@type": "Product",
        "@id": `${url}#product`,
        name: `${formatCarat(diamond.weight)} Carat ${shape} ${type} Diamond`,
        description: getDiamondMetaDescription(diamond),
        sku: diamond.stockRef,
        mpn: diamond.stockRef,
        category: `${type} Loose Diamonds`,
        brand: { "@type": "Brand", name: "Uniglo Diamonds" },
        url,
        additionalProperty,
        offers: {
            "@type": "Offer",
            url,
            availability: availabilitySchema(diamond.availability),
            itemCondition: "https://schema.org/NewCondition",
            seller: SELLER,
        },
    };
    if (image) product.image = [image];

    return {
        "@context": "https://schema.org",
        "@graph": [product, breadcrumbList(title, url)],
    };
};

/** Product + BreadcrumbList graph for a melee parcel. */
export const buildMelleJsonLd = (melle: AnyMelle): Record<string, unknown> => {
    const url = buildMelleUrl(melle);
    const title = getMelleMetaTitle(melle);
    const image = getMellePrimaryImage(melle);
    const type = getMelleType(melle);
    const shape = melleShapeFullName(melle.shape);

    const additionalProperty = [
        prop("Diamond Type", type),
        prop("Shape", shape),
        prop("Colour", melle.color),
        prop("Clarity", melle.clarity),
        melle.cut && prop("Cut", melle.cut),
        melleSieveLabel(melle) && prop("Sieve", melleSieveLabel(melle)),
        melleMeasurementLabel(melle) &&
            prop("Measurements", melleMeasurementLabel(melle)),
        melle.labType && prop("Growth Method", melle.labType),
    ].filter(Boolean);

    const product: Record<string, unknown> = {
        "@type": "Product",
        "@id": `${url}#product`,
        name: title.split(" | ")[0],
        description: getMelleMetaDescription(melle),
        sku: melle.stockId,
        category: `${type} Melee Diamonds`,
        brand: { "@type": "Brand", name: "Uniglo Diamonds" },
        url,
        additionalProperty,
        offers: {
            "@type": "Offer",
            url,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: SELLER,
        },
    };
    if (image) product.image = [image];

    return {
        "@context": "https://schema.org",
        "@graph": [product, breadcrumbList(title, url)],
    };
};

/** Serialised <script> innerHTML, XSS-safe for ld+json. */
export const jsonLdString = (data: Record<string, unknown>): string =>
    JSON.stringify(data).replace(/</g, "\\u003c");
