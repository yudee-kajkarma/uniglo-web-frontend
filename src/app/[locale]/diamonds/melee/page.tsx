import React from "react";
import { Metadata } from "next";
import { getMelleSitemapPage } from "@/lib/seo/diamondServer";
import { buildMellePath } from "@/lib/seo/diamondSeo";
import { Link } from "@/i18n/navigation";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
};

// Revalidate hourly
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    let title = "Melee Diamonds | Certified Loose Parcels | Uniglo Diamonds";
    let description = "Browse our melee diamond parcels - natural and lab grown, sorted by sieve size, colour and clarity. Available for wholesale enquiry.";
    
    if (locale === "de") {
        title = "Melee-Diamanten | Lose Parcels | Uniglo Diamonds";
        description = "Durchsuchen Sie unsere Melee-Diamantenpakete - natürlich und im Labor gezüchtet, sortiert nach Siebgröße, Farbe und Reinheit.";
    } else if (locale === "nl") {
        title = "Melee Diamanten | Gecertificeerde Losse Percelen | Uniglo Diamonds";
        description = "Blader door onze melee diamantpercelen - natuurlijk en laboratoriumgekweekt, gesorteerd op zeefgrootte, kleur en helderheid.";
    } else if (locale === "fr") {
        title = "Diamants de Mêlée | Parcelles en Vrac Certifiées | Uniglo Diamonds";
        description = "Parcourez nos lots de diamants de mêlée - naturels et de laboratoire, triés par taille de tamis, couleur et pureté.";
    } else if (locale === "it") {
        title = "Diamanti da Mischia | Lotti Sfusi Certificati | Uniglo Diamonds";
        description = "Sfoglia i nostri lotti di diamanti da mischia - naturali e coltivati in laboratorio, ordinati per dimensione del setaccio, colore e purezza.";
    } else if (locale === "es") {
        title = "Diamantes Cuerpo a Cuerpo | Parcelas Sueltas Certificadas | Uniglo Diamonds";
        description = "Explore nuestros lotes de diamantes cuerpo a cuerpo, naturales y cultivados en laboratorio, clasificados por tamaño de tamiz, color y claridad.";
    }

    return {
        title,
        description,
        alternates: {
            canonical: `https://www.uniglodiamonds.com/${locale === "en" ? "" : locale + "/"}diamonds/melee`,
        },
    };
}

export default async function MeleeDiamondsPage({ params, searchParams }: PageProps) {
    const { locale } = await params;
    const { page } = await searchParams;
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const limit = 100;
    
    const { items, totalRecords } = await getMelleSitemapPage(currentPage, limit);
    const totalPages = Math.ceil(totalRecords / limit);

    // Localized text translations
    const translations = {
        en: {
            h1: "Melee Diamonds",
            desc: "Browse our melee diamond parcels – natural and lab grown, sorted by sieve size, colour and clarity. Available for wholesale enquiry.",
            stones: "stones",
            page: "page",
            of: "of",
            searchFilter: "search & filter the full inventory",
            prev: "Previous",
            next: "Next",
            natural: "Natural",
            labGrown: "Lab Grown"
        },
        de: {
            h1: "Melee-Diamanten",
            desc: "Durchsuchen Sie unsere Melee-Diamantenpakete – natürlich und im Labor gezüchtet, sortiert nach Siebgröße, Farbe und Reinheit. Verfügbar für Großhandelsanfragen.",
            stones: "Steine",
            page: "Seite",
            of: "von",
            searchFilter: "Vollständiges Inventar suchen & filtern",
            prev: "Zurück",
            next: "Weiter",
            natural: "Natürlich",
            labGrown: "Im Labor gezüchtet"
        },
        nl: {
            h1: "Melee diamanten",
            desc: "Blader door onze melee diamantpercelen – natuurlijk en laboratoriumgekweekt, gesorteerd op zeefgrootte, kleur en helderheid. Beschikbaar voor groothandelsaanvragen.",
            stones: "stenen",
            page: "pagina",
            of: "van",
            searchFilter: "zoek & filter de volledige inventaris",
            prev: "Vorige",
            next: "Volgende",
            natural: "Natuurlijk",
            labGrown: "Laboratoriumgekweekt"
        },
        fr: {
            h1: "Diamants de mêlée",
            desc: "Parcourez nos lots de diamants de mêlée – naturels et de laboratoire, triés par taille de tamis, couleur et pureté. Disponible pour demande de vente en gros.",
            stones: "pierres",
            page: "page",
            of: "sur",
            searchFilter: "rechercher et filtrer l'inventaire complet",
            prev: "Précédent",
            next: "Suivant",
            natural: "Naturel",
            labGrown: "Cultivé en laboratoire"
        },
        it: {
            h1: "Diamanti da mischia",
            desc: "Sfoglia i nostri lotti di diamanti da mischia – naturali e coltivati in laboratorio, ordinati per dimensione del setaccio, colore e purezza. Disponibile per richieste all'ingrosso.",
            stones: "pietre",
            page: "pagina",
            of: "di",
            searchFilter: "cerca e filtra l'intero inventario",
            prev: "Precedente",
            next: "Successivo",
            natural: "Naturale",
            labGrown: "Coltivato in laboratorio"
        },
        es: {
            h1: "Diamantes cuerpo a cuerpo",
            desc: "Explore nuestros lotes de diamantes cuerpo a cuerpo – naturales y cultivados en laboratorio, clasificados por tamaño de tamiz, color y claridad. Disponible para consultas al por mayor.",
            stones: "piedras",
            page: "página",
            of: "de",
            searchFilter: "buscar y filtrar el inventario completo",
            prev: "Anterior",
            next: "Siguiente",
            natural: "Natural",
            labGrown: "Cultivado en laboratorio"
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
                {items.map((m) => {
                    const typeLabel = m.isLab ? t.labGrown : t.natural;
                    const titleText = `${typeLabel} ${m.shape.toUpperCase()} Melee Diamonds - ${m.color} ${m.clarity}`;
                    const path = buildMellePath(m);
                    return (
                        <li key={m._id} className="border-b border-gray-100 pb-2">
                            <Link
                                className="text-gray-800 hover:text-[#c5a059] underline-offset-2 hover:underline transition-colors"
                                href={path as any}
                            >
                                {titleText}
                            </Link>{" "}
                            <span className="text-gray-400 text-xs ml-1 font-mono">{m.stockId}</span>
                        </li>
                    );
                })}
            </ul>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                    {currentPage > 1 && (
                        <Link
                            href={`/diamonds/melee?page=${currentPage - 1}`}
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
                            href={`/diamonds/melee?page=${currentPage + 1}`}
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
