import React from "react";
import { Metadata } from "next";
import { getDiamondSitemapPage } from "@/lib/seo/diamondServer";
import { buildDiamondPath } from "@/lib/seo/diamondSeo";
import { Link } from "@/i18n/navigation";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
};

// Revalidate hourly
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    let title = "Lab Grown Diamonds | Certified Loose Stones | Uniglo Diamonds";
    let description = "Browse our full inventory of certified lab grown loose diamonds. IGI and GIA graded stones available for wholesale enquiry in Antwerp.";
    
    if (locale === "de") {
        title = "Im Labor gezüchtete Diamanten | Zertifizierte lose Steine | Uniglo Diamonds";
        description = "Durchsuchen Sie unser vollständiges Inventar an zertifizierten im Labor gezüchteten losen Diamanten. Nach IGI und GIA graduierte Steine für Großhandelsanfragen in Antwerpen verfügbar.";
    } else if (locale === "nl") {
        title = "Laboratoriumgekweekte Diamanten | Gecertificeerde Losse Stenen | Uniglo Diamonds";
        description = "Blader door onze volledige inventaris van gecertificeerde laboratoriumgekweekte losse diamanten. IGI- en GIA-gegradeerde stenen beschikbaar voor groothandelsaanvragen in Antwerpen.";
    } else if (locale === "fr") {
        title = "Diamants de Laboratoire | Pierres en Vrac Certifiées | Uniglo Diamonds";
        description = "Parcourez notre inventaire complet de diamants de laboratoire certifiés en vrac. Pierres classées par l'IGI et le GIA disponibles pour demande de vente en gros à Anvers.";
    } else if (locale === "it") {
        title = "Diamanti Coltivati in Laboratorio | Pietre Sfuse Certificate | Uniglo Diamonds";
        description = "Sfoglia il nostro inventario completo di diamanti coltivati in laboratorio sfusi certificati. Pietre classificate da IGI e GIA disponibili per richieste all'ingrosso ad Anversa.";
    } else if (locale === "es") {
        title = "Diamantes Cultivados en Laboratorio | Piedras Sueltas Certificadas | Uniglo Diamonds";
        description = "Examine nuestro inventario completo de diamantes cultivados en laboratorio sueltos certificados. Piedras clasificadas por IGI y GIA disponibles para consultas al por mayor en Amberes.";
    }

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}diamonds/lab-grown`,
        },
    };
}

export default async function LabGrownDiamondsPage({ params, searchParams }: PageProps) {
    const { locale } = await params;
    const { page } = await searchParams;
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const limit = 100;
    
    const { items, totalRecords } = await getDiamondSitemapPage(currentPage, limit, false);
    const totalPages = Math.ceil(totalRecords / limit);

    // Localized text translations
    const translations = {
        en: {
            h1: "Lab Grown Diamonds",
            desc: "Browse our full inventory of certified lab grown loose diamonds. IGI and GIA graded stones available for wholesale enquiry in Antwerp.",
            stones: "stones",
            page: "page",
            of: "of",
            searchFilter: "search & filter the full inventory",
            prev: "Previous",
            next: "Next",
            certified: "Certified"
        },
        de: {
            h1: "Im Labor gezüchtete Diamanten",
            desc: "Durchsuchen Sie unser vollständiges Inventar an zertifizierten im Labor gezüchteten losen Diamanten. Nach IGI und GIA graduierte Steine für Großhandelsanfragen in Antwerpen verfügbar.",
            stones: "Steine",
            page: "Seite",
            of: "von",
            searchFilter: "Vollständiges Inventar suchen & filtern",
            prev: "Zurück",
            next: "Weiter",
            certified: "zertifiziert"
        },
        nl: {
            h1: "Laboratoriumgekweekte diamanten",
            desc: "Blader door onze volledige inventaris van gecertificeerde laboratoriumgekweekte losse diamanten. IGI- en GIA-gegradeerde stenen beschikbaar voor groothandelsaanvragen in Antwerpen.",
            stones: "stenen",
            page: "pagina",
            of: "van",
            searchFilter: "zoek & filter de volledige inventaris",
            prev: "Vorige",
            next: "Volgende",
            certified: "Gecertificeerd"
        },
        fr: {
            h1: "Diamants de laboratoire",
            desc: "Parcourez notre inventaire complet de diamants de laboratoire certifiés en vrac. Pierres classées par l'IGI et le GIA disponibles pour demande de vente en gros à Anvers.",
            stones: "pierres",
            page: "page",
            of: "sur",
            searchFilter: "rechercher et filtrer l'inventaire complet",
            prev: "Précédent",
            next: "Suivant",
            certified: "Certifié"
        },
        it: {
            h1: "Diamanti coltivati in laboratorio",
            desc: "Sfoglia il nostro inventario completo di diamanti coltivati in laboratorio sfusi certificati. Pietre classificate da IGI e GIA disponibili per richieste all'ingrosso ad Anversa.",
            stones: "pietre",
            page: "pagina",
            of: "di",
            searchFilter: "cerca e filtra l'intero inventario",
            prev: "Precedente",
            next: "Successivo",
            certified: "Certificato"
        },
        es: {
            h1: "Diamantes cultivados en laboratorio",
            desc: "Examine nuestro inventario completo de diamantes cultivados en laboratorio sueltos certificados. Piedras clasificadas por IGI y GIA disponibles para consultas al por mayor en Amberes.",
            stones: "piedras",
            page: "página",
            of: "de",
            searchFilter: "buscar y filtrar el inventario completo",
            prev: "Anterior",
            next: "Siguiente",
            certified: "Certificado"
        }
    };

    const t = translations[locale as keyof typeof translations] || translations.en;

    return (
        <main className="max-w-6xl mx-auto px-4 py-28 font-lora">
            <h1 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-gray-900">{t.h1}</h1>
            <p className="mt-3 text-sm text-gray-600 max-w-3xl leading-relaxed">{t.desc}</p>
            <p className="mt-2 text-xs text-gray-500">
                {totalRecords.toLocaleString()} {t.stones} · {t.page} {currentPage} {t.of} {totalPages} ·{" "}
                <Link className="underline hover:text-gray-800" href="/inventory">
                    {t.searchFilter}
                </Link>
            </p>

            <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {items.map((d) => {
                    const titleText = `${d.weight.toFixed(2)} Carat ${d.shape} Lab Grown Diamond – ${d.color} ${d.clarity}, ${d.lab} ${t.certified}`;
                    const path = buildDiamondPath(d, false);
                    return (
                        <li key={d.stockRef} className="border-b border-gray-100 pb-2">
                            <Link
                                className="text-gray-800 hover:text-[#c5a059] underline-offset-2 hover:underline transition-colors"
                                href={path as any}
                            >
                                {titleText}
                            </Link>{" "}
                            <span className="text-gray-400 text-xs ml-1 font-mono">{d.stockRef}</span>
                        </li>
                    );
                })}
            </ul>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                    {currentPage > 1 && (
                        <Link
                            href={`/diamonds/lab-grown?page=${currentPage - 1}`}
                            className="px-4 py-2 border border-gray-300 hover:border-gray-800 rounded transition-colors text-sm font-semibold uppercase tracking-wider text-gray-700"
                        >
                            {t.prev}
                        </Link>
                    )}
                    <span className="text-sm font-semibold text-gray-500">
                        {t.page} {currentPage} / {totalPages}
                    </span>
                    {currentPage < totalPages && (
                        <Link
                            href={`/diamonds/lab-grown?page=${currentPage + 1}`}
                            className="px-4 py-2 border border-gray-300 hover:border-gray-800 rounded transition-colors text-sm font-semibold uppercase tracking-wider text-gray-700"
                        >
                            {t.next}
                        </Link>
                    )}
                </div>
            )}
        </main>
    );
}
