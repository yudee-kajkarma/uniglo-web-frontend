// Server-rendered, crawlable localized SEO copy for a single loose diamond.

import React from "react";
import { useTranslations } from "next-intl";
import { getDiamondType, type AnyDiamond } from "@/lib/seo/diamondSeo";
import {
    type DiamondSeoMessages,
    type DiamondValueMessages,
    fillDiamondTemplate,
    getDiamondTemplateValues,
} from "@/lib/i18n/diamondDetail";

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
                {rows.map(([label, value], index) => (
                    <tr
                        key={`${label}-${index}`}
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

const Faq = ({ question, answer }: { question: string; answer: string }) => (
    <div className="border-t border-gray-200 py-4">
        <h3 className="text-lg font-cormorantGaramond font-semibold text-gray-900 mb-1">
            {question}
        </h3>
        <p className="text-[15px] leading-relaxed text-gray-700">{answer}</p>
    </div>
);

export default function DiamondSeoContent({
    diamond,
}: {
    diamond: AnyDiamond;
}) {
    const t = useTranslations("diamondDetail");
    const seo = t.raw("seo") as DiamondSeoMessages;
    const valueMessages = t.raw("values") as DiamondValueMessages;
    const values = getDiamondTemplateValues(diamond, valueMessages);
    const template = (copy: string) => fillDiamondTemplate(copy, values);
    const typeKey =
        getDiamondType(diamond) === "Lab Grown" ? "labGrown" : "natural";

    return (
        <div className="py-8 font-lato">
            <h1 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-gray-900 mb-6">
                {template(seo.title)}
            </h1>

            <div className="lg:columns-2 lg:gap-8">
                {seo.sections.map((section, sectionIndex) => {
                    const paragraphs = section.paragraphsByType
                        ? section.paragraphsByType[typeKey]
                        : section.paragraphs || [];

                    return (
                        <Section
                            key={`${section.id || "section"}-${sectionIndex}`}
                            id={section.id}
                            title={template(section.title)}
                        >
                            {paragraphs.map((paragraph, paragraphIndex) => (
                                <p key={paragraphIndex}>{template(paragraph)}</p>
                            ))}
                            {section.table && (
                                <SpecTable
                                    head={section.table.head.map(template) as [
                                        string,
                                        string,
                                    ]}
                                    rows={section.table.rows.map(
                                        ([label, value]) => [
                                            template(label),
                                            template(value),
                                        ],
                                    )}
                                />
                            )}
                        </Section>
                    );
                })}

                <Section title={template(seo.faq.title)}>
                    <div className="mt-2">
                        {seo.faq.items.map((item, index) => (
                            <Faq
                                key={index}
                                question={template(item.question)}
                                answer={template(item.answer)}
                            />
                        ))}
                    </div>
                </Section>
            </div>
        </div>
    );
}
