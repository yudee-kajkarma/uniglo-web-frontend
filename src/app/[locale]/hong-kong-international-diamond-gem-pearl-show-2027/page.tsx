import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import FAQSection from "@/components/shared/FAQSection";
import { Link } from "@/i18n/navigation";
import { buildLocaleAlternates } from "@/lib/seo/localeAlternates";
import { SITE_URL, localizedUrl } from "@/lib/seo/site";

const NAMESPACE = "hkDiamondGemPearlPage";
const PATH = "hong-kong-international-diamond-gem-pearl-show-2027";

const HREFLANG_REGION: Record<string, string> = {
    en: "en-HK",
    fr: "fr-HK",
    nl: "nl-HK",
    de: "de-HK",
    it: "it-HK",
    es: "es-HK",
};

const APPOINTMENT_HREF = "/contact-us";
const INVENTORY_HREF = "/inventory";

const IMAGES = {
    hero:         "/event-page-images/hong-kong/1.png",
    meet:         "/event-page-images/hong-kong/2.png",
    matching:     "/event-page-images/hong-kong/3.png",
    partnerships: "/event-page-images/hong-kong/4.png",
};

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });
    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
        alternates: buildLocaleAlternates(PATH, locale),
    };
}

const PrimaryCta = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="inline-flex items-center justify-center purple-reveal-btn px-8 py-4 uppercase text-xs tracking-widest font-lato">
        <span>{children}</span>
    </Link>
);

const SecondaryCta = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="inline-flex items-center justify-center border border-[#bb923a] text-[#bb923a] px-8 py-4 uppercase text-xs tracking-widest font-lato transition-colors hover:bg-[#bb923a] hover:text-white">
        {children}
    </Link>
);

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3 mb-4">
        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">{text}</h4>
        <span className="w-12 h-px bg-primary" />
    </div>
);

const BulletList = ({ items, small = false }: { items: string[]; small?: boolean }) => (
    <ul className="space-y-2">
        {items.map((item, i) => (
            <li key={i} className={`flex items-start gap-3 font-lora text-slate-600 ${small ? "text-sm" : ""}`}>
                <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const HkDiamondGemPearlPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });

    const eventRows      = t.raw("eventDetails.rows")         as { label: string; value: string }[];
    const eventHours     = t.raw("eventDetails.hours")         as { date: string; time: string }[];
    const whatIsAreas    = t.raw("whatIs.areas")               as string[];
    const sourceItems    = t.raw("whatCanSource.sourceItems")  as string[];
    const prepItems      = t.raw("whatCanSource.prepItems")    as string[];
    const twinTableRows  = t.raw("twinShows.tableRows")        as string[][];
    const twinTips       = t.raw("twinShows.tips")             as string[];
    const meetShapes     = t.raw("meet.shapes")                as string[];
    const meetDiscuss    = t.raw("meet.discussItems")          as string[];
    const bridalItems    = t.raw("bridal.discussItems")        as string[];
    const matchingItems  = t.raw("matching.discussItems")      as string[];
    const measureItems   = t.raw("measurements.considerItems") as string[];
    const certItems      = t.raw("certification.considerItems")as string[];
    const assessItems    = t.raw("inPerson.assessItems")       as string[];
    const hybridRows     = t.raw("hybrid.tableRows")           as string[][];
    const hybridBenefits = t.raw("hybrid.benefits")            as string[];
    const planItems      = t.raw("planning.planItems")         as string[];
    const briefItems     = t.raw("planning.briefItems")        as string[];
    const guidesItems    = t.raw("guides.items")               as { title: string; body: string }[];
    const nextSteps      = t.raw("partnerships.nextSteps")     as string[];
    const faqItems       = t.raw("faq.items")                  as { question: string; answer: string }[];

    const pageUrl = localizedUrl(locale, PATH);

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "Uniglo Diamonds",
                url: `${SITE_URL}/`,
                telephone: "+32 3 500 91 07",
                email: "suraj@uniglodiamonds.com",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Hoveniersstraat 30, Suite 662/Bus 250",
                    postalCode: "2018",
                    addressLocality: "Antwerp",
                    addressCountry: "BE",
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: localizedUrl(locale, "") },
                    { "@type": "ListItem", position: 2, name: t("breadcrumbCurrent"), item: pageUrl },
                ],
            },
            {
                "@type": "Event",
                "@id": `${pageUrl}#event`,
                name: "Hong Kong International Diamond, Gem & Pearl Show 2027",
                description: t("metadata.description"),
                startDate: "2027-03-02T10:30:00+08:00",
                endDate: "2027-03-06T17:30:00+08:00",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: {
                    "@type": "Place",
                    name: "AsiaWorld-Expo",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "1 Airport Expo Boulevard, Chek Lap Kok",
                        addressLocality: "Hong Kong",
                        addressCountry: "HK",
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: "Hong Kong Trade Development Council",
                    url: "https://www.hktdc.com/",
                },
                subEvent: {
                    "@type": "Event",
                    name: "Uniglo Diamonds at HK Diamond, Gem & Pearl Show 2027",
                    organizer: { "@id": `${SITE_URL}/#organization` },
                },
            },
            {
                "@type": ["WebPage", "FAQPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: t("metadata.title"),
                description: t("metadata.description"),
                inLanguage: HREFLANG_REGION[locale] ?? "en-HK",
                publisher: { "@id": `${SITE_URL}/#organization` },
                breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
                about: { "@id": `${pageUrl}#event` },
                mainEntity: faqItems.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
            },
        ],
    };

    return (
        <div className="min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            {/* ── Section 1: Hero ───────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row md:items-start gap-10 mb-10">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.hero} alt={t("hero.imageAlt")} width={700} height={500}
                            className="w-full h-auto object-cover shadow-sm" priority />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("hero.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("hero.lead")}
                        </h2>
                        <div className="space-y-4 font-lora text-lg text-slate-600 leading-relaxed">
                            <p>{t("hero.para1")}</p>
                            <p>{t("hero.para2")}</p>
                            <p>{t("hero.para3")}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                    <PrimaryCta href={APPOINTMENT_HREF}>{t("hero.primaryCta")}</PrimaryCta>
                    <SecondaryCta href={INVENTORY_HREF}>{t("hero.secondaryCta")}</SecondaryCta>
                </div>
            </section>

            {/* ── Section 2: Event details table + hours ─────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("eventDetails.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] max-w-3xl">
                        {t("eventDetails.title")}
                    </h2>
                    <div className="grid grid-cols-1 gap-10">
                        {/* Main details table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse font-lora text-sm md:text-base">
                                <thead>
                                    <tr className="bg-primary-purple-dark text-primary-yellow-1">
                                        <th className="text-left px-6 py-4 font-lato uppercase tracking-[0.15em] text-xs">{t("eventDetails.colLabel")}</th>
                                        <th className="text-left px-6 py-4 font-lato uppercase tracking-[0.15em] text-xs">{t("eventDetails.colValue")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventRows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f4efe7]"}>
                                            <td className="px-6 py-4 text-slate-500 font-lato text-xs uppercase tracking-[0.12em]">{row.label}</td>
                                            <td className="px-6 py-4 text-[#1f2732] font-lora">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Opening hours table */}
                        <div>
                            <h3 className="font-cormorantGaramond text-2xl text-[#1f2732] mb-4">{t("eventDetails.hoursTitle")}</h3>
                            <table className="w-full border-collapse font-lora text-sm">
                                <thead>
                                    <tr className="bg-primary-purple-dark text-primary-yellow-1">
                                        <th className="text-left px-5 py-3 font-lato uppercase tracking-[0.12em] text-xs">Date</th>
                                        <th className="text-left px-5 py-3 font-lato uppercase tracking-[0.12em] text-xs">Hours</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventHours.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f4efe7]"}>
                                            <td className="px-5 py-3 text-[#1f2732] font-lora">{row.date}</td>
                                            <td className="px-5 py-3 text-[#1f2732] font-lora">{row.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("eventDetails.note")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 3: Dates & Venue image ────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                {/* What Is the Show */}
                <Eyebrow text={t("whatIs.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                    {t("whatIs.title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                        <p>{t("whatIs.para1")}</p>
                        <p>{t("whatIs.para2")}</p>
                        <p>{t("whatIs.para3")}</p>
                    </div>
                    <div>
                        <p className="font-lora text-slate-600 mb-4">{t("whatIs.areasLabel")}</p>
                        <BulletList items={whatIsAreas} small />
                    </div>
                </div>
            </section>

            {/* ── Section 4: What Buyers Can Source ─────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("whatCanSource.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] w-full">
                        {t("whatCanSource.title")}
                    </h2>
                    {/* Intro paras */}
                    <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-10">
                        <p>{t("whatCanSource.para1")}</p>
                        <p>{t("whatCanSource.para2")}</p>
                    </div>
                    {/* Source items — 2-col grid tiles */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
                        {sourceItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white border border-[#e8ddd0] px-4 py-3">
                                <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                    {/* Prepare section */}
                    <div className="border-t border-[#e8ddd0] pt-10">
                        <p className="font-lora text-slate-600 mb-6">{t("whatCanSource.prepLabel")}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3">
                            {prepItems.map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary-purple-dark text-primary-yellow-1 flex items-center justify-center font-lato text-[10px] font-bold">
                                        {i + 1}
                                    </span>
                                    <span className="font-lora text-sm text-slate-700 leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Twin Shows ─────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Eyebrow text={t("twinShows.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                    {t("twinShows.title")}
                </h2>
                <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-10">
                    <p>{t("twinShows.para1")}</p>
                    <p>{t("twinShows.para2")}</p>
                    <p>{t("twinShows.para3")}</p>
                </div>
                {/* Twin shows comparison table */}
                <div className="overflow-x-auto mb-10">
                    <table className="w-full border-collapse font-lora text-sm">
                        <thead>
                            <tr className="bg-primary-purple-dark text-primary-yellow-1">
                                {(t.raw("twinShows.tableHeaders") as string[]).map((h, i) => (
                                    <th key={i} className="text-left px-5 py-3 font-lato uppercase tracking-[0.12em] text-xs">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {twinTableRows.map((row, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f4efe7]"}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-5 py-3 text-[#1f2732] font-lora text-sm">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* AsiaWorld-Expo vs HKCEC */}
                <div className="border-t border-[#e8ddd0] pt-10 mb-10">
                    <h3 className="font-cormorantGaramond text-2xl md:text-3xl text-[#1f2732] mb-6">{t("twinShows.venueTitle")}</h3>
                    <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-8 w-full">
                        <p>{t("twinShows.venuePara1")}</p>
                        <p>{t("twinShows.venuePara2")}</p>
                    </div>
                    <p className="font-lora text-slate-600 mb-4">{t("twinShows.tipsLabel")}</p>
                    <div className="flex flex-wrap gap-3">
                        {twinTips.map((tip, i) => (
                            <div key={i} className="flex items-center gap-2 bg-[#faf7f2] border border-[#e8ddd0] px-4 py-2">
                                <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{tip}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 6: Meet Uniglo Diamonds ───────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Image + heading row */}
                    <div className="flex flex-col md:flex-row md:items-start gap-12 mb-10">
                        <div className="w-full md:w-1/2">
                            <Image src={IMAGES.matching} alt={t("meet.imageAlt")} width={700} height={700}
                                sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                        </div>
                        <div className="w-full md:w-1/2">
                            <Eyebrow text={t("meet.eyebrow")} />
                            <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("meet.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                                <p>{t("meet.para1")}</p>
                                <p>{t("meet.para2")}</p>
                            </div>
                            <p className="font-lora text-slate-600 mb-3">{t("meet.shapesLabel")}</p>
                            <div className="grid grid-cols-2 gap-2">
                                {meetShapes.map((shape, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                        <span className="font-lora text-sm text-slate-600">{shape}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Discuss items + para3 + CTA — full width */}
                    <div className="pt-4">
                        <p className="font-lora text-slate-600 mb-4">{t("meet.discussLabel")}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                            {meetDiscuss.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white border border-[#e8ddd0] px-4 py-3">
                                    <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                    <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="w-full font-lora text-slate-600 leading-relaxed mb-8">{t("meet.para3")}</p>
                        <div className="flex justify-center">
                            <PrimaryCta href={APPOINTMENT_HREF}>{t("meet.cta")}</PrimaryCta>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 7: Natural Diamond Sourcing + Bridal ─────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                {/* Natural Diamond Sourcing — text left, image right */}
                <div className="flex flex-col md:flex-row md:items-start gap-12 mb-16">
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("sourcing.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1]">
                            {t("sourcing.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("sourcing.para1")}</p>
                            <p>{t("sourcing.para2")}</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.partnerships} alt={t("meet.imageAlt")} width={700} height={700}
                            sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                    </div>
                </div>

                {/* Bridal + Matching — two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("bridal.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("bridal.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("bridal.para1")}</p>
                            <p>{t("bridal.para2")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("bridal.discussLabel")}</p>
                        <BulletList items={bridalItems} small />
                    </div>
                    <div>
                        <Eyebrow text={t("matching.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("matching.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("matching.para1")}</p>
                            <p>{t("matching.para2")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("matching.discussLabel")}</p>
                        <BulletList items={matchingItems} small />
                    </div>
                </div>
            </section>

            {/* ── Section 8: Measurements + Certification ────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("measurements.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("measurements.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("measurements.para1")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("measurements.considerLabel")}</p>
                        <BulletList items={measureItems} small />
                    </div>
                    <div>
                        <Eyebrow text={t("certification.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("certification.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("certification.para1")}</p>
                            <p>{t("certification.para2")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("certification.considerLabel")}</p>
                        <BulletList items={certItems} small />
                    </div>
                </div>
            </section>

            {/* ── Section 9: In-Person Assessment ──────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col gap-12 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("inPerson.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("inPerson.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("inPerson.para1")}</p>
                            <p>{t("inPerson.para2")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("inPerson.assessLabel")}</p>
                        <BulletList items={assessItems} small />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.hero} alt={t("inPerson.imageAlt")} width={700} height={700}
                            sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                    </div>
                </div>
            </section>

            {/* ── Section 10: Click2Match & Online Sourcing ─────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("hybrid.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                        {t("hybrid.title")}
                    </h2>
                    <div className="space-y-6 w-full">
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("hybrid.para1")}</p>
                            <p>{t("hybrid.para2")}</p>
                            <p>{t("hybrid.para3")}</p>
                        </div>
                        {/* Digital periods table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse font-lora text-sm">
                                <thead>
                                    <tr className="bg-primary-purple-dark text-primary-yellow-1">
                                        {(t.raw("hybrid.tableHeaders") as string[]).map((h, i) => (
                                            <th key={i} className="text-left px-4 py-3 font-lato uppercase tracking-[0.12em] text-xs">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {hybridRows.map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f4efe7]"}>
                                            {row.map((cell, j) => (
                                                <td key={j} className="px-4 py-3 text-[#1f2732] font-lora text-sm">{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <p className="font-lora text-slate-600 mb-4">{t("hybrid.benefitsLabel")}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {hybridBenefits.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white border border-[#e8ddd0] px-4 py-3">
                                        <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                        <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 11: Planning Your Visit ──────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Eyebrow text={t("planning.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                    {t("planning.title")}
                </h2>
                <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-8 w-full">
                    <p>{t("planning.para1")}</p>
                    <p>{t("planning.para2")}</p>
                </div>
                <p className="font-lora text-slate-600 mb-6">{t("planning.planLabel")}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
                    {planItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-[#faf7f2] border border-[#e8ddd0] px-4 py-3">
                            <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                            <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#e8ddd0] pt-10 w-full">
                    <h3 className="font-cormorantGaramond text-2xl md:text-3xl text-[#1f2732] mb-4">
                        {t("planning.briefTitle")}
                    </h3>
                    <p className="font-lora text-slate-600 mb-6">{t("planning.briefLabel")}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {briefItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-[#faf7f2] border border-[#e8ddd0] px-4 py-3">
                                <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 12: Guides ────────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("guides.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] max-w-3xl">
                        {t("guides.title")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {guidesItems.map((guide, i) => (
                            <div key={i} className="border-t-2 border-[#bb923a] pt-6">
                                <h3 className="font-cormorantGaramond text-2xl text-[#1f2732] mb-3 leading-snug">{guide.title}</h3>
                                <p className="font-lora text-slate-600 leading-relaxed text-sm">{guide.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 13: Partnerships ──────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col gap-12 md:flex-row md:items-center">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.meet} alt={t("partnerships.imageAlt")} width={700} height={700}
                            sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("partnerships.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("partnerships.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                            <p>{t("partnerships.para1")}</p>
                            <p>{t("partnerships.para2")}</p>
                            <p>{t("partnerships.para3")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("partnerships.nextStepsLabel")}</p>
                        <BulletList items={nextSteps} small />
                    </div>
                </div>
            </section>

            {/* ── Section 14: FAQ ───────────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <FAQSection faqs={faqItems} title={t("faq.title")} />
                </div>
            </section>

            {/* ── Section 15: Final CTA ─────────────────────────────────────── */}
            <section className="w-full bg-primary-purple-dark px-4 py-20 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6 leading-tight">
                        {t("finalCta.title")}
                    </h2>
                    <p className="text-white font-lora text-lg mb-4">{t("finalCta.para")}</p>

                    <dl className="my-10 inline-grid grid-cols-1 sm:grid-cols-4 gap-6 text-left border border-white/15 px-8 py-6">
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">{t("finalCta.factEvent")}</dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">{t("finalCta.factEventValue")}</dd>
                        </div>
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">{t("finalCta.factDates")}</dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">{t("finalCta.factDatesValue")}</dd>
                        </div>
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">{t("finalCta.factVenue")}</dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">{t("finalCta.factVenueValue")}</dd>
                        </div>
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">{t("finalCta.factStand")}</dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">{t("finalCta.factStandValue")}</dd>
                        </div>
                    </dl>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href={APPOINTMENT_HREF} className="inline-flex items-center justify-center bg-primary-yellow-1 text-primary-purple-dark px-8 py-4 uppercase text-xs tracking-widest font-lato transition-opacity hover:opacity-85">
                            {t("finalCta.primaryCta")}
                        </Link>
                        <Link href={INVENTORY_HREF} className="inline-flex items-center justify-center border border-primary-yellow-1 text-primary-yellow-1 px-8 py-4 uppercase text-xs tracking-widest font-lato transition-colors hover:bg-primary-yellow-1 hover:text-primary-purple-dark">
                            {t("finalCta.secondaryCta")}
                        </Link>
                    </div>
                    <p className="mt-10 font-lora text-sm text-white/60">{t("finalCta.note")}</p>
                </div>
            </section>
        </div>
    );
};

export default HkDiamondGemPearlPage;
