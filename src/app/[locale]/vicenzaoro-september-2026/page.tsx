import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import FAQSection from "@/components/shared/FAQSection";
import { Link } from "@/i18n/navigation";
import { buildLocaleAlternates } from "@/lib/seo/localeAlternates";
import { SITE_URL, localizedUrl } from "@/lib/seo/site";

const NAMESPACE = "vicenzaoroSeptemberPage";
const PATH = "vicenzaoro-september-2026";

const HREFLANG_REGION: Record<string, string> = {
    en: "en-IT",
    fr: "fr-IT",
    nl: "nl-IT",
    de: "de-IT",
    it: "it-IT",
    es: "es-IT",
};

const APPOINTMENT_HREF = "/contact-us";
const INVENTORY_HREF = "/inventory";

const IMAGES = {
    intro:        "/event-page-images/vicenzaoro-september-2026/vinzoramain.png",
    diamonds:     "/event-page-images/vicenzaoro-september-2026/1.png",
    matching:     "/event-page-images/vicenzaoro-september-2026/2.png",
    partnerships: "/event-page-images/vicenzaoro-september-2026/3.png",
    extra:        "/event-page-images/vicenzaoro-september-2026/4.png",
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

const VicenzaoroSeptemberPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });

    const eventRows        = t.raw("eventDetails.rows")           as { label: string; value: string }[];
    const whatCanAreas     = t.raw("whatCanBuyers.areas")          as string[];
    const meetingItems     = t.raw("meet.meetingItems")            as string[];
    const europeanItems    = t.raw("europeanBusinesses.considerItems") as string[];
    const shapesItems      = t.raw("shapes.items")                 as string[];
    const measureItems     = t.raw("measurements.considerItems")   as string[];
    const bridalItems      = t.raw("bridal.discussItems")          as string[];
    const matchingItems    = t.raw("matching.discussItems")        as string[];
    const certItems        = t.raw("certification.considerItems")  as string[];
    const whoTypes         = t.raw("whoShouldMeet.types")          as { title: string; body: string }[];
    const prepareItems     = t.raw("prepare.items")                as string[];
    const communityItems   = t.raw("communities.items")            as { title: string; body: string }[];
    const hoursItems       = t.raw("planVisit.hoursItems")         as string[];
    const nextSteps        = t.raw("partnerships.nextSteps")       as string[];
    const guidesItems      = t.raw("guides.items")                 as { title: string; body: string }[];
    const faqItems         = t.raw("faq.items")                    as { question: string; answer: string }[];

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
                name: "Vicenzaoro September 2026",
                description: t("metadata.description"),
                startDate: "2026-09-04T10:00:00+02:00",
                endDate: "2026-09-08T17:00:00+02:00",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                isAccessibleForFree: true,
                location: {
                    "@type": "Place",
                    name: "Fiera di Vicenza",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "Via dell'Oreficeria 16",
                        postalCode: "36100",
                        addressLocality: "Vicenza",
                        addressRegion: "Veneto",
                        addressCountry: "IT",
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: "Italian Exhibition Group",
                    url: "https://www.iegexpo.it/en/",
                },
                subEvent: {
                    "@type": "Event",
                    name: "Uniglo Diamonds at Vicenzaoro September 2026",
                    organizer: { "@id": `${SITE_URL}/#organization` },
                },
            },
            {
                "@type": ["WebPage", "FAQPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: t("metadata.title"),
                description: t("metadata.description"),
                inLanguage: HREFLANG_REGION[locale] ?? "en-IT",
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
                <div className="flex flex-col md:flex-row md:items-center gap-10 mb-10">
                    {/* Image — left */}
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.intro} alt={t("hero.imageAlt")} width={700} height={500} className="w-full h-auto object-cover shadow-sm" priority />
                    </div>
                    {/* Text — right */}
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
                {/* Button — centered below both columns */}
                <div className="flex justify-center">
                    <PrimaryCta href={APPOINTMENT_HREF}>{t("hero.primaryCta")}</PrimaryCta>
                </div>
            </section>

            {/* ── Section 2: Event details table ────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("eventDetails.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] max-w-3xl">
                        {t("eventDetails.title")}
                    </h2>
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
                    <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("eventDetails.note")}</p>
                </div>
            </section>

            {/* ── Section 2b: Dates and Venue ─────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="bg-[#faf7f2] border border-[#e8ddd0] p-8 md:p-12 shadow-sm border-t-4 border-t-[#bb923a]">
                    <Eyebrow text={t("datesAndVenue.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                        {t("datesAndVenue.title")}
                    </h2>
                    <div className="space-y-4 font-lora text-slate-600 leading-relaxed w-full text-base">
                        <p>{t("datesAndVenue.para1")}</p>
                        <p>{t("datesAndVenue.para2")}</p>
                        <p>{t("datesAndVenue.para3")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 3: What is Vicenzaoro + What can buyers source ───── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row md:items-center gap-12 mb-16">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.diamonds} alt={t("whatIs.imageAlt")} width={700} height={500} className="w-full h-auto object-cover shadow-sm" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("whatIs.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1]">
                            {t("whatIs.title")}
                        </h2>
                        <div className="space-y-6 font-lora text-lg text-slate-600 leading-relaxed">
                            <p>{t("whatIs.para1")}</p>
                            <p>{t("whatIs.para2")}</p>
                            <p>{t("whatIs.para3")}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Eyebrow text={t("whatCanBuyers.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] max-w-3xl">
                        {t("whatCanBuyers.title")}
                    </h2>
                    <p className="font-lora text-lg text-slate-600 leading-relaxed mb-8">{t("whatCanBuyers.intro")}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                        {whatCanAreas.map((area, i) => (
                            <div key={i} className="flex items-center gap-3 bg-[#faf7f2] border border-[#e8ddd0] px-4 py-3">
                                <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{area}</span>
                            </div>
                        ))}
                    </div>
                    <p className="font-lora text-slate-600 leading-relaxed">{t("whatCanBuyers.outro")}</p>
                </div>
            </section>

            {/* ── Section 4: Meet Uniglo Diamonds ──────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-center">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.matching} alt={t("meet.imageAlt")} width={700} height={500} className="w-full h-auto object-cover shadow-sm" />
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
                        <div className="bg-white border border-[#e8ddd0] p-6 mb-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                {meetingItems.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                        <span className="font-lora text-sm text-slate-600 leading-snug">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="font-lora text-slate-600 leading-relaxed mb-8">{t("meet.para3")}</p>
                        <PrimaryCta href={APPOINTMENT_HREF}>{t("meet.cta")}</PrimaryCta>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Diamond Sourcing for European Businesses ────────── */}
            <section className="w-full bg-[#faf7f2] py-20 border-t border-[#e8ddd0]/60">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("europeanBusinesses.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] w-full">
                        {t("europeanBusinesses.title")}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Text Paragraphs Card */}
                        <div className="lg:col-span-7 bg-white border border-[#e8ddd0] p-8 md:p-10 shadow-sm flex flex-col justify-between">
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed text-base">
                                <p>{t("europeanBusinesses.para1")}</p>
                                <p>{t("europeanBusinesses.para2")}</p>
                                <p>{t("europeanBusinesses.para4")}</p>
                            </div>
                        </div>

                        {/* Checklist & Para3 Card */}
                        <div className="lg:col-span-5 bg-white border border-[#e8ddd0] p-8 md:p-10 shadow-sm border-l-4 border-l-[#bb923a] flex flex-col justify-between">
                            <div>
                                <p className="font-cormorantGaramond text-2xl text-[#1f2732] mb-4">{t("europeanBusinesses.considerLabel")}</p>
                                <ul className="space-y-2.5">
                                    {europeanItems.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                            <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="font-lora text-slate-600 text-sm italic pt-4 mt-6 border-t border-[#e8ddd0]">{t("europeanBusinesses.para3")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 6: Shapes + Measurements ──────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <Eyebrow text={t("shapes.eyebrow")} />
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("shapes.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-8">
                                <p>{t("shapes.para1")}</p>
                                <p>{t("shapes.para2")}</p>
                                <p>{t("shapes.para3")}</p>
                                <p>{t("shapes.para4")}</p>
                                <p>{t("shapes.para5")}</p>
                            </div>
                            <ul className="flex flex-wrap gap-2">
                                {shapesItems.map((shape) => (
                                    <li key={shape} className="border border-[#bb923a]/40 px-4 py-2 font-lato text-[0.7rem] uppercase tracking-[0.15em] text-[#bb923a]">
                                        {shape}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <Eyebrow text={t("measurements.eyebrow")} />
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("measurements.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                                <p>{t("measurements.para1")}</p>
                                <p>{t("measurements.para2")}</p>
                                <p>{t("measurements.para3")}</p>
                            </div>
                            <p className="font-lora text-slate-600 mb-4">{t("measurements.considerLabel")}</p>
                            <ul className="space-y-2">
                                {measureItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                        <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 7: Bridal + Matching ──────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
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
                        <ul className="space-y-2 mb-6">
                            {bridalItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-lora text-slate-600 leading-relaxed">{t("bridal.para3")}</p>
                    </div>
                    <div>
                        <Eyebrow text={t("matching.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("matching.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("matching.para1")}</p>
                            <p>{t("matching.para2")}</p>
                            <p>{t("matching.para3")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("matching.discussLabel")}</p>
                        <ul className="space-y-2">
                            {matchingItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Section 8: Certification + Antwerp ────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
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
                        <ul className="space-y-2 mb-6">
                            {certItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-lora text-slate-600 leading-relaxed">{t("certification.para3")}</p>
                    </div>
                    <div>
                        <Eyebrow text={t("antwerp.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("antwerp.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("antwerp.para1")}</p>
                            <p>{t("antwerp.para2")}</p>
                            <p>{t("antwerp.para3")}</p>
                            <p>{t("antwerp.para4")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 9: Who should meet ─────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Eyebrow text={t("whoShouldMeet.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-12 leading-[1.1] max-w-3xl">
                    {t("whoShouldMeet.title")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whoTypes.map((type, i) => (
                        <div key={i} className="border-t-2 border-[#bb923a] pt-6">
                            <h3 className="font-cormorantGaramond text-xl text-[#1f2732] mb-3 leading-snug">{type.title}</h3>
                            <p className="font-lora text-slate-600 leading-relaxed text-sm">{type.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Section 10: Prepare + Communities ─────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("prepare.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("prepare.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("prepare.para")}</p>
                        <ul className="space-y-2 mb-8">
                            {prepareItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-lora text-sm text-slate-500 italic mb-6">{t("prepare.note")}</p>
                        <PrimaryCta href={APPOINTMENT_HREF}>{t("prepare.cta")}</PrimaryCta>
                    </div>
                    <div>
                        <Eyebrow text={t("communities.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("communities.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("communities.intro")}</p>
                        <div className="space-y-4">
                            {communityItems.map((item, i) => (
                                <div key={i} className="border-l-2 border-[#bb923a]/40 pl-4">
                                    <p className="font-cormorantGaramond text-lg text-[#1f2732]">{item.title}</p>
                                    <p className="font-lora text-sm text-slate-500">{item.body}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("communities.note")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 11: Planning Your Visit ───────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("planVisit.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-12 leading-[1.1] w-full">
                        {t("planVisit.title")}
                    </h2>

                    {/* Row 1: Registration + Opening Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {/* Registration */}
                        <div className="bg-white border border-[#e8ddd0] p-8">
                            <Eyebrow text={t("planVisit.registrationEyebrow")} />
                            <h3 className="text-2xl md:text-3xl font-cormorantGaramond text-[#1f2732] mb-4 leading-[1.1]">
                                {t("planVisit.registrationTitle")}
                            </h3>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed text-sm">
                                <p>{t("planVisit.registrationPara1")}</p>
                                <p>{t("planVisit.registrationPara2")}</p>
                            </div>
                        </div>
                        {/* Opening Hours */}
                        <div className="bg-white border border-[#e8ddd0] p-8">
                            <Eyebrow text={t("planVisit.hoursEyebrow")} />
                            <h3 className="text-2xl md:text-3xl font-cormorantGaramond text-[#1f2732] mb-4 leading-[1.1]">
                                {t("planVisit.hoursTitle")}
                            </h3>
                            <ul className="space-y-2 mb-4">
                                {hoursItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                        <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="font-lora text-sm text-slate-500 italic">{t("planVisit.hoursPara")}</p>
                        </div>
                    </div>

                    {/* Row 2: T.Gold / VO Vintage / Getting There */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        <div className="bg-white border border-[#e8ddd0] p-8 shadow-sm border-t-4 border-t-[#bb923a] flex flex-col justify-between">
                            <div>
                                <Eyebrow text={t("planVisit.tgoldEyebrow")} />
                                <p className="font-lora text-slate-600 leading-relaxed text-sm">{t("planVisit.tgoldPara")}</p>
                            </div>
                        </div>
                        <div className="bg-white border border-[#e8ddd0] p-8 shadow-sm border-t-4 border-t-[#bb923a] flex flex-col justify-between">
                            <div>
                                <Eyebrow text={t("planVisit.vintageEyebrow")} />
                                <p className="font-lora text-slate-600 leading-relaxed text-sm">{t("planVisit.vintagePara")}</p>
                            </div>
                        </div>
                        <div className="bg-white border border-[#e8ddd0] p-8 shadow-sm border-t-4 border-t-[#bb923a] flex flex-col justify-between">
                            <div>
                                <Eyebrow text={t("planVisit.gettingEyebrow")} />
                                <div className="space-y-3 font-lora text-slate-600 leading-relaxed text-sm">
                                    <p>{t("planVisit.gettingPara1")}</p>
                                    <p>{t("planVisit.gettingPara2")}</p>
                                    <p>{t("planVisit.gettingPara3")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 12: Partnerships / Beyond the Exhibition ───────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.partnerships} alt={t("partnerships.imageAlt")} width={700} height={500} className="w-full h-auto object-cover shadow-sm" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("partnerships.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("partnerships.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("partnerships.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("partnerships.para2")}</p>
                        <ul className="space-y-2 mb-6">
                            {nextSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-lora text-slate-600 leading-relaxed">{t("partnerships.para3")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 13: Guides ─────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
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
            </section>

            {/* ── Section 14: FAQ ────────────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <FAQSection faqs={faqItems} title={t("faq.title")} />
                </div>
            </section>

            {/* ── Section 15: Final CTA ──────────────────────────────────────── */}
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

export default VicenzaoroSeptemberPage;
