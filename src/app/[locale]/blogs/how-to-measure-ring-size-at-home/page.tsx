import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import WhyRingSizingImage from "@/assets/blogs/ringonfinger.png";
import RingSizingMethodsImage from "@/assets/blogs/steps.png";
import ExistingRingMethodImage from "@/assets/blogs/ringonscale.png";

// Localized Page Metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "blogHowToMeasureRingSizeAtHome",
    });

    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical:
                "https://www.uniglodiamonds.com/blogs/how-to-measure-ring-size-at-home",
        },
    };
}

const ringSizeChart = [
    { us: "4", circ: "46.8", diam: "14.9", circIn: '1.84"', uk: "H", eu: "47" },
    { us: "4.5", circ: "48.0", diam: "15.3", circIn: '1.89"', uk: "I", eu: "48" },
    { us: "5", circ: "49.3", diam: "15.7", circIn: '1.94"', uk: "J½", eu: "49" },
    { us: "5.5", circ: "50.6", diam: "16.1", circIn: '1.99"', uk: "K½", eu: "51" },
    { us: "6", circ: "51.9", diam: "16.5", circIn: '2.04"', uk: "L½", eu: "52" },
    { us: "6.5", circ: "53.1", diam: "16.9", circIn: '2.09"', uk: "M½", eu: "53" },
    { us: "7", circ: "54.4", diam: "17.3", circIn: '2.14"', uk: "N½", eu: "54" },
    { us: "7.5", circ: "55.7", diam: "17.7", circIn: '2.19"', uk: "O½", eu: "56" },
    { us: "8", circ: "57.0", diam: "18.1", circIn: '2.24"', uk: "P½", eu: "57" },
    { us: "8.5", circ: "58.3", diam: "18.6", circIn: '2.29"', uk: "Q½", eu: "58" },
    { us: "9", circ: "59.5", diam: "18.9", circIn: '2.34"', uk: "R½", eu: "60" },
    { us: "9.5", circ: "60.8", diam: "19.4", circIn: '2.39"', uk: "S½", eu: "61" },
    { us: "10", circ: "62.1", diam: "19.8", circIn: '2.44"', uk: "T½", eu: "62" },
    { us: "10.5", circ: "63.4", diam: "20.2", circIn: '2.49"', uk: "U½", eu: "63" },
    { us: "11", circ: "64.6", diam: "20.6", circIn: '2.54"', uk: "V½", eu: "65" },
    { us: "11.5", circ: "65.9", diam: "21.0", circIn: '2.59"', uk: "W½", eu: "66" },
    { us: "12", circ: "67.2", diam: "21.4", circIn: '2.64"', uk: "X½", eu: "67" },
    { us: "13", circ: "69.7", diam: "22.2", circIn: '2.74"', uk: "Z", eu: "70" },
];

const BlogPage = () => {
    const t = useTranslations("blogHowToMeasureRingSizeAtHome");

    const introSection = t.raw("introSection") as ArticleSection[];
    const methodsSections = t.raw("methodsSections") as ArticleSection[];
    const method5Section = t.raw("method5Section") as ArticleSection[];
    const remainingSections = t.raw("remainingSections") as ArticleSection[];

    return (
        <div className="min-h-screen mb-20">
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        {t("title")}
                    </h1>

                    {/* Intro + Why Sizing Matters */}
                    <DynamicArticle sections={introSection} />

                    {/* Image: Why Ring Sizing Matters */}
                    <div className="my-8 w-full rounded-sm overflow-hidden">
                        <Image
                            src={WhyRingSizingImage}
                            alt="Why accurate ring sizing matters"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Methods intro heading */}
                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6 mt-10">
                        {t("methodsHeading")}
                    </h2>

                    {/* Image: Ring Sizing Methods */}
                    <div className="mb-8 w-full rounded-sm overflow-hidden">
                        <Image
                            src={RingSizingMethodsImage}
                            alt="Ring sizing methods overview"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Methods 1–4 */}
                    <DynamicArticle sections={methodsSections} />

                    {/* Image: Existing Ring Method */}
                    <div className="my-8 w-full rounded-sm overflow-hidden">
                        <Image
                            src={ExistingRingMethodImage}
                            alt="Measuring ring size using an existing ring"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Method 5 */}
                    <DynamicArticle sections={method5Section} />

                    {/* Ring Size Chart */}
                    <div className="mt-10">
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                            {t("chartHeading")}
                        </h2>
                        <p className="text-slate-700 text-lg font-lora leading-relaxed mb-6">
                            {t("chartText")}
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm font-lora border-collapse">
                                <thead>
                                    <tr className="bg-[#1f2732] text-white">
                                        <th className="px-4 py-3 text-center font-semibold">
                                            {t("colUs")}
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            {t("colCircMm")}
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            {t("colDiamMm")}
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            {t("colCircIn")}
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            {t("colUk")}
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold">
                                            {t("colEu")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ringSizeChart.map((row, i) => (
                                        <tr
                                            key={row.us}
                                            className={
                                                i % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-50"
                                            }
                                        >
                                            <td className="px-4 py-2 text-center font-semibold text-[#bb923a]">
                                                {row.us}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.circ}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.diam}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.circIn}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.uk}
                                            </td>
                                            <td className="px-4 py-2 text-center text-slate-700">
                                                {row.eu}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Expert tips, special styles, common mistakes */}
                    <DynamicArticle sections={remainingSections} />
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;