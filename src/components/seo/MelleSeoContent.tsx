// components/seo/MelleSeoContent.tsx
//
// Server-rendered SEO copy for a melee (parcel) diamond listing. Melee stones
// are sold in calibrated parcels with far less per-stone data than certified
// loose diamonds, so this is a lighter template focused on parcel specs and
// jewellery use-cases.

import React from "react";
import {
    type AnyMelle,
    melleShapeFullName,
    getMelleType,
    melleSieveLabel,
    melleMeasurementLabel,
} from "@/lib/seo/diamondSeo";

const Section = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <section className="mb-8 break-inside-avoid border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
        <h2 className="text-2xl md:text-3xl font-cormorantGaramond font-semibold text-gray-900 mb-3">
            {title}
        </h2>
        <div className="space-y-3 text-[15px] leading-relaxed text-gray-700">
            {children}
        </div>
    </section>
);

const SpecTable = ({
    rows,
    head,
}: {
    rows: [string, React.ReactNode][];
    head: [string, string];
}) => (
    <div className="overflow-hidden rounded-md border border-gray-200 mt-4">
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr className="bg-[#26062b] text-white text-left">
                    <th className="px-4 py-2 font-medium">{head[0]}</th>
                    <th className="px-4 py-2 font-medium">{head[1]}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(([label, value], i) => (
                    <tr
                        key={i}
                        className="border-t border-gray-200 odd:bg-white even:bg-gray-50"
                    >
                        <th
                            scope="row"
                            className="px-4 py-2 text-left font-semibold text-gray-800 w-1/2 align-top"
                        >
                            {label}
                        </th>
                        <td className="px-4 py-2 text-gray-700 align-top">
                            {value || "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const Faq = ({ q, a }: { q: string; a: string }) => (
    <div className="border-t border-gray-200 py-4">
        <h3 className="text-lg font-cormorantGaramond font-semibold text-gray-900 mb-1">
            {q}
        </h3>
        <p className="text-[15px] leading-relaxed text-gray-700">{a}</p>
    </div>
);

export default function MelleSeoContent({ melle }: { melle: AnyMelle }) {
    const shape = melleShapeFullName(melle.shape);
    const shapeLower = shape.toLowerCase();
    const type = getMelleType(melle);
    const typeLower = type.toLowerCase();
    const color = melle.color;
    const clarity = melle.clarity;
    const cut = melle.cut || "-";
    const sieve = melleSieveLabel(melle);
    const measurements = melleMeasurementLabel(melle);
    const growth = melle.labType ? ` (${melle.labType})` : "";
    const title = `${shape} ${color} ${clarity} ${type} Melee Diamonds`;

    return (
        <div className="py-8 font-lato">
            <h1 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-gray-900 mb-6">
                {title}
                {sieve ? ` — Sieve ${sieve}` : ""}
            </h1>

            <div className="lg:columns-2 lg:gap-8">
                <Section title="Quick Answer">
                    <p>
                        These {shapeLower} {typeLower} melee diamonds are{" "}
                        {color} colour, {clarity} clarity
                        {sieve ? `, sieve size ${sieve}` : ""} calibrated stones
                        supplied in parcels by carat weight. Melee diamonds are
                        small accent stones used to add sparkle around a centre
                        stone or along a band, making them ideal for pavé
                        settings, halos, eternity rings, tennis bracelets and
                        other fine jewellery designs. Available as a{" "}
                        {typeLower} melee parcel{growth} from Uniglo Diamonds.
                    </p>
                </Section>

                <Section title="Melee Parcel Summary">
                    <p>
                        This is a {typeLower} melee parcel of {shapeLower}{" "}
                        diamonds graded at {color} colour and {clarity} clarity.
                        Melee diamonds are not certified individually; instead
                        they are matched and calibrated by shape, colour,
                        clarity and size so they perform consistently when set
                        together. Buying matched melee in a single parcel keeps
                        accent stones uniform across a piece of jewellery.
                    </p>
                    <SpecTable
                        head={["Detail", "Specification"]}
                        rows={[
                            ["Diamond Type", type],
                            ["Shape", shape],
                            ["Colour", color],
                            ["Clarity", clarity],
                            ["Cut", cut],
                            ["Sieve Size", sieve || "-"],
                            ["Measurements", measurements || "-"],
                            [
                                "Average Points (pt)",
                                melle.avgPtr ? String(melle.avgPtr) : "-",
                            ],
                            [
                                "Growth Method",
                                melle.labType || (type === "Natural" ? "—" : "-"),
                            ],
                            [
                                "Category",
                                melle.melleCategory || "-",
                            ],
                        ]}
                    />
                </Section>

                <Section title={`About ${shape} Melee Diamonds`}>
                    <p>
                        {shape} melee diamonds are prized for the way many small
                        stones combine to create a continuous field of sparkle.
                        Because they are calibrated to a consistent size and
                        quality, they sit evenly in a setting and catch light
                        uniformly. {type} melee offers{" "}
                        {type === "Lab Grown"
                            ? "an accessible, modern option with the same optical and physical properties as mined diamonds"
                            : "the rarity and traditional appeal of mined diamonds"}
                        , giving designers flexibility on budget and look.
                    </p>
                    <SpecTable
                        head={["Use Case", "Why Melee Works"]}
                        rows={[
                            ["Pavé & micro-pavé", "Small stones cover the metal in continuous sparkle"],
                            ["Halo settings", "Frames a centre stone and increases visual size"],
                            ["Eternity & wedding bands", "Calibrated stones sit evenly all the way round"],
                            ["Tennis bracelets & necklaces", "Matched melee keeps a uniform line of light"],
                        ]}
                    />
                </Section>

                <Section title="Common Buyer Questions">
                    <SpecTable
                        head={["Question", "Answer"]}
                        rows={[
                            [
                                "Are melee diamonds certified?",
                                "Melee diamonds are matched and calibrated by parcel rather than certified individually, because each stone is very small.",
                            ],
                            [
                                "How are melee diamonds priced?",
                                "Melee is priced by carat weight for the parcel, based on shape, colour, clarity and sieve size.",
                            ],
                            [
                                `Are these ${typeLower} or natural?`,
                                `These are ${typeLower} melee diamonds${growth}.`,
                            ],
                            [
                                "What jewellery uses melee diamonds?",
                                "Pavé settings, halos, eternity bands, tennis bracelets, necklaces and accent details on rings and earrings.",
                            ],
                        ]}
                    />
                </Section>

                <Section title="Frequently Asked Questions">
                    <div className="mt-2">
                        <Faq
                            q="What does sieve size mean for melee diamonds?"
                            a={`Sieve size describes the calibrated diameter range of the melee stones${sieve ? ` (this parcel is ${sieve})` : ""}. It lets jewellers order stones that fit a specific setting precisely.`}
                        />
                        <Faq
                            q="Can I order a specific carat weight of this melee?"
                            a="Yes. Melee parcels are supplied by carat weight, so you can request the total carat weight you need for your design and we will match the stones from the same parcel."
                        />
                        <Faq
                            q={`Do ${typeLower} melee diamonds look different to natural?`}
                            a={`No. ${type} melee diamonds share the same brilliance and sparkle as natural melee. ${type === "Lab Grown" ? "Lab grown stones are chemically and optically identical to mined diamonds." : "Natural melee carries the traditional rarity of mined diamonds."}`}
                        />
                    </div>
                </Section>
            </div>
        </div>
    );
}
