// components/seo/DiamondSeoContent.tsx
//
// Server-rendered, crawlable SEO copy for a single loose diamond. Pure
// presentational component (no hooks / no client code) so its HTML is present
// in the initial server response. Rendered above the "Similar Diamonds"
// section on the diamond detail page.

import React from "react";
import {
    type AnyDiamond,
    getShapeFullName,
    getDiamondType,
    getAvailabilityText,
    cutLabel,
    fluorescenceLabel,
    labName,
    formatCarat,
    getRecommendedMetal,
    getRecommendedSetting,
} from "@/lib/seo/diamondSeo";

const Section = ({
    title,
    id,
    children,
}: {
    title: string;
    id?: string;
    children: React.ReactNode;
}) => (
    <section
        id={id}
        className="mb-8 break-inside-avoid border border-gray-100 rounded-lg p-5 bg-white shadow-sm"
    >
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
    head?: [string, string];
}) => (
    <div className="overflow-hidden rounded-md border border-gray-200 mt-4">
        <table className="w-full text-sm border-collapse">
            {head && (
                <thead>
                    <tr className="bg-[#26062b] text-white text-left">
                        <th className="px-4 py-2 font-medium">{head[0]}</th>
                        <th className="px-4 py-2 font-medium">{head[1]}</th>
                    </tr>
                </thead>
            )}
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

export default function DiamondSeoContent({
    diamond,
}: {
    diamond: AnyDiamond;
}) {
    const carat = formatCarat(diamond.weight);
    const shape = getShapeFullName(diamond.shape);
    const shapeLower = shape.toLowerCase();
    const type = getDiamondType(diamond);
    const typeLower = type.toLowerCase();
    const color = diamond.color;
    const clarity = diamond.clarity;
    const cut = cutLabel(diamond.cutGrade) || "graded";
    const polish = cutLabel(diamond.polish) || "fine";
    const symmetry = cutLabel(diamond.symmetry) || "balanced";
    const fluor = fluorescenceLabel(diamond.fluorescenceIntensity);
    const lab = labName(diamond.lab);
    const measurements = diamond.measurements || "-";
    const depth = diamond.depthPerc ? `${diamond.depthPerc}%` : "-";
    const table = diamond.tablePerc ? `${diamond.tablePerc}%` : "-";
    const availability = getAvailabilityText(diamond.availability);
    const metal = getRecommendedMetal(color);
    const setting = getRecommendedSetting(shape);
    const title = `${carat} Carat ${shape} ${type} Diamond`;
    const isLab = type === "Lab Grown";

    return (
        <div className="py-8 font-lato">
            <h1 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-gray-900 mb-6">
                {title}
            </h1>

            <div className="lg:columns-2 lg:gap-8">
                {/* Quick Answer */}
                <Section title="Quick Answer" id="quick-answer">
                    <p>
                        This {carat} carat {shapeLower} {typeLower} diamond
                        features a {color} colour grade, {clarity} clarity grade
                        and {cut} cut quality, making it a strong option for
                        buyers looking for a certified loose diamond with clear
                        specifications and visible beauty. Certified by {lab},
                        this diamond is suitable for engagement rings, bespoke
                        jewellery, solitaire settings, halo designs, pendants and
                        other fine jewellery pieces where brilliance, proportion
                        and quality matter.
                    </p>
                </Section>

                {/* Diamond Summary + spec table */}
                <Section title="Diamond Summary" id="summary">
                    <p>
                        This diamond is a {carat} carat {shapeLower} {typeLower}{" "}
                        diamond with {color} colour and {clarity} clarity. For
                        buyers comparing loose diamonds online, these details are
                        important because they explain how the diamond may appear
                        in real life, how it performs visually, and whether it is
                        suitable for the style of jewellery being created.
                    </p>
                    <p>
                        A diamond should not be judged by carat weight alone. Two
                        diamonds with the same carat weight can look very
                        different depending on their shape, measurements, cut
                        quality, colour, clarity, polish, symmetry and
                        certification. A well-balanced {shapeLower} diamond with
                        strong proportions can often look more attractive than a
                        larger diamond with weaker light performance.
                    </p>
                    <SpecTable
                        head={["Diamond Detail", "Specification"]}
                        rows={[
                            ["Diamond Type", type],
                            ["Shape", shape],
                            ["Carat Weight", carat],
                            ["Colour Grade", color],
                            ["Clarity Grade", clarity],
                            ["Cut Grade", cutLabel(diamond.cutGrade) || "-"],
                            ["Polish", cutLabel(diamond.polish) || "-"],
                            ["Symmetry", cutLabel(diamond.symmetry) || "-"],
                            ["Fluorescence", fluor],
                            ["Certificate", lab],
                            ["Measurements", measurements],
                            ["Depth", depth],
                            ["Table", table],
                            ["Stock Number", diamond.stockRef],
                            ["Availability", availability],
                        ]}
                    />
                </Section>

                {/* About this shape */}
                <Section title={`About This ${shape} Diamond`}>
                    <p>
                        The {shapeLower} diamond is one of the most important
                        style choices when selecting a loose diamond. Shape
                        affects the personality of the stone, the way it appears
                        on the hand, the kind of setting it suits, and how large
                        it can look from the top view. The visual effect of a{" "}
                        {shapeLower} diamond depends on its proportions,
                        length-to-width ratio, facet pattern and setting style.
                    </p>
                    <p>
                        When choosing a {shapeLower} diamond, buyers should
                        consider how the stone will be worn. A {shapeLower}{" "}
                        diamond can work beautifully as the centre stone in an
                        engagement ring, but it can also be used in pendants,
                        earrings, anniversary jewellery and custom-made designs.
                        The best setting depends on the proportions of the
                        diamond and the final look the wearer wants to achieve.
                    </p>
                    <SpecTable
                        head={["Shape Factor", "What It Means For This Diamond"]}
                        rows={[
                            [
                                "Shape Style",
                                `${shape} diamonds are chosen for their outline and visual personality.`,
                            ],
                            [
                                "Visual Size",
                                `The face-up size depends on the measurements (${measurements}), not only ${carat} carat weight.`,
                            ],
                            [
                                "Setting Suitability",
                                "Suitable for solitaire, halo, three-stone or bespoke settings.",
                            ],
                            [
                                "Recommended Setting",
                                `This diamond suits ${setting}.`,
                            ],
                        ]}
                    />
                </Section>

                {/* Colour */}
                <Section title={`Understanding the ${color} Colour Grade`}>
                    <p>
                        Diamond colour has a direct effect on how white or warm a
                        diamond appears. This diamond carries a {color} colour
                        grade, which should be considered alongside the
                        diamond&rsquo;s shape, size, setting metal and personal
                        preference. The right colour grade is the one that
                        balances appearance, budget and design.
                    </p>
                    <SpecTable
                        head={["Colour Consideration", "Buyer Meaning"]}
                        rows={[
                            ["Colour Grade", color],
                            [
                                "Appearance",
                                "The visible colour depends on lighting, setting metal and diamond shape.",
                            ],
                            ["Best Setting Match", `${metal} can complement this colour grade well.`],
                            [
                                "Buyer Priority",
                                "Good for buyers who want a balance of beauty, quality and value.",
                            ],
                        ]}
                    />
                </Section>

                {/* Clarity */}
                <Section title={`Understanding the ${clarity} Clarity Grade`}>
                    <p>
                        Clarity describes the presence of natural internal
                        characteristics, known as inclusions, and surface
                        characteristics, known as blemishes. This diamond has a{" "}
                        {clarity} clarity grade, which gives buyers an idea of
                        how clean the diamond may appear under magnification and
                        to the naked eye. The most important question is whether
                        the diamond looks clean and beautiful when worn.
                    </p>
                    <SpecTable
                        head={["Clarity Detail", "What Buyers Should Know"]}
                        rows={[
                            ["Clarity Grade", clarity],
                            [
                                "Visibility",
                                "The visibility of inclusions depends on their position, size and contrast.",
                            ],
                            [
                                "Shape Impact",
                                `${shape} diamonds may hide or reveal inclusions differently depending on facet style.`,
                            ],
                            [
                                "Buying Tip",
                                "Always consider clarity together with cut, colour, carat and certification.",
                            ],
                        ]}
                    />
                </Section>

                {/* Cut */}
                <Section title={`Why ${cut} Cut Quality Matters`}>
                    <p>
                        Cut quality is one of the most important factors in how a
                        diamond performs. A diamond&rsquo;s cut affects how light
                        enters the stone, reflects inside it and returns to the
                        eye, creating brilliance, fire and sparkle. This diamond
                        has a {cut} cut grade. A well-cut diamond can look
                        brighter, livelier and more balanced than a larger
                        diamond with poor proportions.
                    </p>
                    <SpecTable
                        head={["Cut Factor", "Specification"]}
                        rows={[
                            ["Cut Grade", cutLabel(diamond.cutGrade) || "-"],
                            ["Polish", cutLabel(diamond.polish) || "-"],
                            ["Symmetry", cutLabel(diamond.symmetry) || "-"],
                            ["Depth", depth],
                            ["Table", table],
                            [
                                "Light Performance Focus",
                                "Brilliance, fire, sparkle and balanced proportions",
                            ],
                        ]}
                    />
                </Section>

                {/* Certificate */}
                <Section title={`Why ${lab} Certification Matters`}>
                    <p>
                        Certification gives independent confirmation of the
                        diamond&rsquo;s key characteristics, including carat
                        weight, colour, clarity, cut details, measurements and
                        origin. This diamond is certified by {lab}, giving buyers
                        a reliable document to review before making a purchase
                        decision. Certified diamonds are easier to compare
                        because the specifications are recorded by a recognised
                        grading laboratory.
                    </p>
                    <SpecTable
                        head={["Certification Detail", "Information"]}
                        rows={[
                            ["Certificate Laboratory", lab],
                            ["Diamond Type Confirmation", type],
                            [
                                "Graded Characteristics",
                                "Carat, colour, clarity, cut, measurements and other key details",
                            ],
                            [
                                "Buyer Benefit",
                                "Independent grading helps buyers compare diamonds with confidence",
                            ],
                        ]}
                    />
                </Section>

                {/* Natural vs Lab */}
                <Section title="Is This a Natural Diamond or Lab Grown Diamond?">
                    <p>
                        This diamond is listed as a {typeLower} diamond. Natural
                        diamonds and lab grown diamonds can look extremely
                        similar, but they have different formation stories,
                        pricing structures and buyer considerations.
                        {isLab
                            ? " A lab grown diamond is a real diamond created using advanced technology in a controlled environment, with the same chemical, optical and physical properties as a natural diamond. Buyers often choose lab grown diamonds for value, size options and modern production."
                            : " A natural diamond forms beneath the Earth’s surface under intense heat and pressure over a very long period of time. Buyers who choose natural diamonds often appreciate their rarity, geological origin and long-standing role in fine jewellery."}
                    </p>
                    <SpecTable
                        head={["Comparison Point", "This Diamond"]}
                        rows={[
                            ["Diamond Type", type],
                            [
                                "Origin",
                                isLab
                                    ? "Created in a controlled laboratory environment"
                                    : "Formed naturally underground",
                            ],
                            ["Composition", "Carbon diamond crystal"],
                            ["Certification", `${lab} certified`],
                            [
                                "Buyer Reason",
                                isLab
                                    ? "Value, size options and modern production"
                                    : "Rarity, tradition and geological origin",
                            ],
                        ]}
                    />
                </Section>

                {/* Engagement ring */}
                <Section title="Is This Diamond Suitable for an Engagement Ring?">
                    <p>
                        This {carat} carat {shapeLower} {typeLower} diamond can
                        be considered for an engagement ring because it combines
                        a defined shape, certified grading and a clear quality
                        profile. The {shapeLower} shape can influence the final
                        style of the ring, whether set as a solitaire, halo,
                        three-stone or hidden halo design. This diamond&rsquo;s{" "}
                        {color} colour, {clarity} clarity and {cut} cut should be
                        considered together when designing the ring.
                    </p>
                    <SpecTable
                        head={["Engagement Ring Factor", "How This Diamond Fits"]}
                        rows={[
                            ["Centre Stone Potential", "Suitable for engagement ring consideration"],
                            ["Shape Style", shape],
                            ["Carat Presence", `${carat} carat`],
                            ["Colour Profile", color],
                            ["Clarity Profile", clarity],
                            ["Recommended Setting Direction", setting],
                        ]}
                    />
                </Section>

                {/* Comparison */}
                <Section title="How This Diamond Compares to Other Options">
                    <p>
                        When comparing this diamond with other loose diamonds,
                        buyers should look at the full quality picture instead of
                        one grade at a time. This {carat} carat {shapeLower}{" "}
                        diamond should be compared with other diamonds of similar
                        carat weight, shape and certification, reviewing colour,
                        clarity, cut, polish, symmetry, fluorescence and
                        measurements together.
                    </p>
                    <SpecTable
                        head={["Comparison Area", "What To Compare"]}
                        rows={[
                            ["Carat", `Compare with diamonds close to ${carat} carats`],
                            ["Shape", `Compare with other ${shape} diamonds`],
                            ["Colour", `Compare ${color} with nearby grades`],
                            ["Clarity", `Compare ${clarity} with nearby clarity options`],
                            ["Cut and Finish", `Review ${cut}, ${polish} and ${symmetry} together`],
                            ["Certificate", `Compare ${lab} certified diamonds with similar grading standards`],
                        ]}
                    />
                </Section>

                {/* Who should consider */}
                <Section title="Who Should Consider This Diamond?">
                    <p>
                        This diamond is suitable for buyers who want a certified
                        loose diamond with transparent grading and a clear
                        quality profile. It may appeal to someone searching for a{" "}
                        {shapeLower} engagement ring centre stone, a custom
                        jewellery diamond, a fine jewellery upgrade or a
                        meaningful gift. Because it is a {typeLower} diamond, it
                        may also appeal to buyers comparing natural and lab grown
                        diamonds before deciding which origin is right for them.
                    </p>
                </Section>

                {/* Buyer questions */}
                <Section title="Common Buyer Questions">
                    <SpecTable
                        head={["Question", "Answer"]}
                        rows={[
                            [
                                `Is this ${carat} carat diamond a good size?`,
                                `A ${carat} carat diamond can offer strong visual presence, especially when the ${shapeLower} shape and measurements are well balanced.`,
                            ],
                            [
                                `Is ${color} colour good for a diamond?`,
                                `${color} colour can be a strong choice depending on the setting metal, diamond shape and buyer preference.`,
                            ],
                            [
                                `Is ${clarity} clarity good?`,
                                `${clarity} clarity should be judged by how visible the inclusions are in real viewing conditions, ideally eye-clean.`,
                            ],
                            [
                                `Is ${lab} certification reliable?`,
                                `A ${lab} certificate gives buyers independent grading information to compare this diamond against other certified diamonds.`,
                            ],
                            [
                                `Does a ${shape} diamond sparkle well?`,
                                `A ${shapeLower} diamond can sparkle beautifully when its cut, polish, symmetry and proportions are well balanced.`,
                            ],
                        ]}
                    />
                </Section>

                {/* Final guidance */}
                <Section title="Final Buying Guidance">
                    <p>
                        This {carat} carat {shapeLower} {typeLower} diamond
                        brings together the main qualities buyers usually
                        consider when choosing a certified loose diamond: shape,
                        carat weight, colour, clarity, cut quality, certification
                        and overall visual appeal. For engagement rings, bespoke
                        jewellery and meaningful fine jewellery purchases, the
                        strongest choice is usually the one that balances beauty,
                        trust and value. If you are comparing this diamond with
                        others, review the {lab} certificate, confirm the
                        measurements and consider the intended setting.
                    </p>
                </Section>

                {/* FAQ */}
                <Section
                    title={`Frequently Asked Questions About This ${carat} Carat ${shape} ${type} Diamond`}
                >
                    <div className="mt-2">
                        <Faq
                            q={`Is this ${carat} carat ${shapeLower} diamond a good choice?`}
                            a={`This ${carat} carat ${shapeLower} diamond can be a strong choice for buyers who want a certified loose diamond with clear specifications and a distinctive appearance. The right choice depends on how the carat weight, ${shapeLower} shape, ${color} colour, ${clarity} clarity and ${cut} cut quality work together.`}
                        />
                        <Faq
                            q={`Is ${color} colour good for this diamond?`}
                            a={`A ${color} colour grade can be a good choice depending on the buyer’s preferred appearance, setting metal and budget. For this ${shapeLower} diamond, the ${color} colour grade should be considered together with the ${clarity} clarity, ${cut} cut and final setting style. ${metal.charAt(0).toUpperCase() + metal.slice(1)} can complement it well.`}
                        />
                        <Faq
                            q="Is this diamond eye-clean?"
                            a={`Whether this diamond is eye-clean depends on the type, size, position and visibility of its inclusions. A ${clarity} clarity grade can often appear clean to the naked eye, but buyers should review the certificate, image and video where available before deciding.`}
                        />
                        <Faq
                            q="Is this diamond natural or lab grown?"
                            a={`This diamond is listed as a ${typeLower} diamond. ${isLab ? "A lab grown diamond is created in a controlled environment using advanced technology and has the same properties as a natural diamond." : "A natural diamond forms beneath the Earth’s surface over a very long period of time."} The right choice depends on personal preference, budget and long-term priorities.`}
                        />
                        <Faq
                            q="Is this diamond good for an engagement ring?"
                            a={`Yes, this ${carat} carat ${shapeLower} diamond can be considered for an engagement ring because it has a defined shape, certified specifications and a clear quality profile. The ${shapeLower} shape works well in solitaire, halo, three-stone, hidden halo and bespoke settings.`}
                        />
                        <Faq
                            q={`What setting is best for a ${shape} diamond?`}
                            a={`The best setting for a ${shapeLower} diamond depends on its outline, proportions and the buyer’s preferred style. For this diamond, ${setting} can be a suitable direction.`}
                        />
                        <Faq
                            q="What should I check before buying this diamond?"
                            a={`Review the ${lab} certificate, confirm the ${carat} carat weight, check the ${color} colour and ${clarity} clarity grades, compare the measurements (${measurements}), and consider the ${cut} cut, ${polish} polish and ${symmetry} symmetry alongside the final setting and metal colour.`}
                        />
                    </div>
                </Section>
            </div>
        </div>
    );
}
