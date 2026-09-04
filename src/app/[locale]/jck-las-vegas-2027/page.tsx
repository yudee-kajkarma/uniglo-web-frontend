import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import FAQSection from "@/components/shared/FAQSection";
import { Link } from "@/i18n/navigation";
import { buildLocaleAlternates } from "@/lib/seo/localeAlternates";
import { SITE_URL, localizedUrl } from "@/lib/seo/site";

const NAMESPACE = "jckLasVegasPage";
const PATH = "jck-las-vegas-2027";

const HREFLANG_REGION: Record<string, string> = {
    en: "en-US",
    fr: "fr-US",
    nl: "nl-US",
    de: "de-US",
    it: "it-US",
    es: "es-US",
};

const APPOINTMENT_HREF = "/contact-us";
const INVENTORY_HREF = "/inventory";

const IMAGES = {
    hero:         "/event-page-images/jck-las-vegas-2027/1.png",
    meet:         "/event-page-images/jck-las-vegas-2027/2.png",
    matching:     "/event-page-images/jck-las-vegas-2027/3.png",
    partnerships: "/event-page-images/jck-las-vegas-2027/4.png",
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

const JckLasVegasPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });

    const eventRows        = t.raw("eventDetails.rows")             as { label: string; value: string }[];
    const admissionPoints  = t.raw("registration.admissionPoints")  as string[];
    const exhibitorItems   = t.raw("exhibitors.exhibitorItems")      as string[];
    const supplierQuestions= t.raw("supplierQuestions.questions")    as string[];
    const whatCanItems     = t.raw("whatCanSource.items")            as { title: string; body: string }[];
    const meetingItems     = t.raw("meet.meetingItems")              as string[];
    const usConsiderItems  = t.raw("usMarket.considerItems")         as string[];
    const bridalItems      = t.raw("bridal.discussItems")            as string[];
    const giftingItems     = t.raw("gifting.discussItems")           as string[];
    const matchingItems    = t.raw("matching.discussItems")          as string[];
    const measureItems     = t.raw("measurements.considerItems")     as string[];
    const certItems        = t.raw("certification.considerItems")    as string[];
    const assessItems      = t.raw("inPerson.assessItems")           as string[];
    const prepItems        = t.raw("prepare.prepItems")              as string[];
    const nextSteps        = t.raw("partnerships.nextSteps")         as string[];
    const guidesItems      = t.raw("guides.items")                   as { title: string; body: string }[];
    const faqItems         = t.raw("faq.items")                      as { question: string; answer: string }[];

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
                name: "JCK Las Vegas 2027",
                alternateName: ["JCK 2027", "JCK Show Las Vegas 2027"],
                description: t("metadata.description"),
                startDate: "2027-06-04",
                endDate: "2027-06-07",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: {
                    "@type": "Place",
                    name: "The Venetian Expo",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "201 Sands Avenue",
                        addressLocality: "Las Vegas",
                        addressRegion: "NV",
                        postalCode: "89169",
                        addressCountry: "US",
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: "RX",
                    url: "https://rxglobal.com/",
                },
                subEvent: {
                    "@type": "Event",
                    name: "Uniglo Diamonds at JCK Las Vegas 2027",
                    organizer: { "@id": `${SITE_URL}/#organization` },
                },
            },
            {
                "@type": ["WebPage", "FAQPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: t("metadata.title"),
                description: t("metadata.description"),
                inLanguage: HREFLANG_REGION[locale] ?? "en-US",
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
                    {/* Image — left */}
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.hero} alt={t("hero.imageAlt")} width={700} height={500}
                            className="w-full h-auto object-cover shadow-sm" priority />
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
                {/* CTAs — centered below both columns */}
                <div className="flex flex-row flex-wrap justify-center items-center gap-4">
                    <PrimaryCta href={APPOINTMENT_HREF}>{t("hero.primaryCta")}</PrimaryCta>
                    <SecondaryCta href={INVENTORY_HREF}>{t("hero.secondaryCta")}</SecondaryCta>
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

            {/* ── Section 3: Dates & Venue ──────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Eyebrow text={t("datesVenue.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                    {t("datesVenue.title")}
                </h2>
                <div className="space-y-4 font-lora text-slate-600 leading-relaxed w-full">
                    <p>{t("datesVenue.para1")}</p>
                    <p>{t("datesVenue.para2")}</p>
                    <p>{t("datesVenue.para3")}</p>
                    <p>{t("datesVenue.para4")}</p>
                </div>
            </section>

            {/* ── Section 4: Registration & Admission ───────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("registration.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                        {t("registration.title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("registration.para1")}</p>
                            <p>{t("registration.para2")}</p>
                            <p>{t("registration.para3")}</p>
                            <p>{t("registration.para4")}</p>
                        </div>
                        <div>
                            <p className="font-lora text-slate-600 mb-4">{t("registration.admissionLabel")}</p>
                            <BulletList items={admissionPoints} small />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 5: What Is JCK ────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Eyebrow text={t("whatIs.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                    {t("whatIs.title")}
                </h2>
                <div className="space-y-4 font-lora text-slate-600 leading-relaxed w-full">
                    <p>{t("whatIs.para1")}</p>
                    <p>{t("whatIs.para2")}</p>
                    <p>{t("whatIs.para3")}</p>
                    <p>{t("whatIs.para4")}</p>
                    <p>{t("whatIs.para5")}</p>
                </div>
            </section>

            {/* ── Section 6: Exhibitors + Supplier Questions ────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Exhibitors — full width */}
                    <Eyebrow text={t("exhibitors.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] w-full">
                        {t("exhibitors.title")}
                    </h2>
                    <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-8 w-full">
                        <p>{t("exhibitors.para1")}</p>
                        <p>{t("exhibitors.para2")}</p>
                        <p>{t("exhibitors.para3")}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-16">
                        {exhibitorItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white border border-[#e8ddd0] px-4 py-3">
                                <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Supplier Questions — full width below */}
                    <Eyebrow text={t("supplierQuestions.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] w-full">
                        {t("supplierQuestions.title")}
                    </h2>
                    <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6 w-full">
                        <p>{t("supplierQuestions.para1")}</p>
                        <p>{t("supplierQuestions.para2")}</p>
                    </div>
                    <p className="font-lora text-slate-600 mb-6">{t("supplierQuestions.questionLabel")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {supplierQuestions.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white border border-[#e8ddd0] px-4 py-3">
                                <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 7: What Buyers Can Source ─────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Eyebrow text={t("whatCanSource.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-4 leading-[1.1] w-full">
                    {t("whatCanSource.title")}
                </h2>
                <p className="font-lora text-slate-600 leading-relaxed mb-10">{t("whatCanSource.para1")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whatCanItems.map((item, i) => (
                        <div key={i} className="border-t-2 border-[#bb923a] pt-6">
                            <h3 className="font-cormorantGaramond text-xl text-[#1f2732] mb-3 leading-snug">{item.title}</h3>
                            <p className="font-lora text-slate-600 text-sm leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Section 8: Meet Uniglo Diamonds ───────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col gap-12 md:flex-row md:items-start mb-10">
                        <div className="w-full md:w-1/2">
                            <Image src={IMAGES.meet} alt={t("meet.imageAlt")} width={700} height={700}
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
                            <p className="font-lora text-slate-600 mb-4">{t("meet.meetingLabel")}</p>
                            <div className="bg-white border border-[#e8ddd0] p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {meetingItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                            <span className="font-lora text-sm text-slate-600 leading-snug">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* para3 full width + button centered */}
                    <p className="w-full font-lora text-slate-600 leading-relaxed mb-8">{t("meet.para3")}</p>
                    <div className="flex justify-center">
                        <PrimaryCta href={APPOINTMENT_HREF}>{t("meet.cta")}</PrimaryCta>
                    </div>
                </div>
            </section>

            {/* ── Section 9: US Market ──────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <Eyebrow text={t("usMarket.eyebrow")} />
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                    {t("usMarket.title")}
                </h2>
                <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-10 w-full">
                    <p>{t("usMarket.para1")}</p>
                    <p>{t("usMarket.para2")}</p>
                </div>
                <p className="font-lora text-slate-600 mb-6">{t("usMarket.considerLabel")}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {usConsiderItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-[#faf7f2] border border-[#e8ddd0] px-4 py-3">
                            <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                            <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Section 10: Bridal + Gifting ──────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Bridal */}
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
                    {/* Gifting */}
                    <div>
                        <Eyebrow text={t("gifting.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("gifting.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("gifting.para1")}</p>
                            <p>{t("gifting.para2")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("gifting.discussLabel")}</p>
                        <BulletList items={giftingItems} small />
                    </div>
                </div>
            </section>

            {/* ── Section 11: Matching ──────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col gap-12 md:flex-row-reverse md:items-start">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.matching} alt={t("matching.imageAlt")} width={700} height={700}
                            sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("matching.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
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

            {/* ── Section 12: Measurements + Certification ──────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Measurements */}
                    <div>
                        <Eyebrow text={t("measurements.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("measurements.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("measurements.para1")}</p>
                            <p>{t("measurements.para2")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("measurements.considerLabel")}</p>
                        <BulletList items={measureItems} small />
                    </div>
                    {/* Certification */}
                    <div>
                        <Eyebrow text={t("certification.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("certification.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-4">
                            <p>{t("certification.para1")}</p>
                            <p>{t("certification.para2")}</p>
                            <p>{t("certification.para3")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("certification.considerLabel")}</p>
                        <BulletList items={certItems} small />
                    </div>
                </div>
            </section>

            {/* ── Section 13: In-Person Assessment ─────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col gap-12 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.partnerships} alt={t("inPerson.imageAlt")} width={700} height={700}
                            sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                    </div>
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
                        <p className="mt-6 font-lora text-slate-500 text-sm italic">{t("inPerson.para3")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 14: How to Prepare ────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("prepare.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                        {t("prepare.title")}
                    </h2>
                    <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-8 w-full">
                        <p>{t("prepare.para1")}</p>
                        <p>{t("prepare.para2")}</p>
                    </div>
                    <p className="font-lora text-slate-600 mb-6">{t("prepare.prepLabel")}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
                        {prepItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white border border-[#e8ddd0] px-4 py-3">
                                <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                    {/* Getting There */}
                    <div className="border-t border-[#e8ddd0] pt-10">
                        <h3 className="font-cormorantGaramond text-2xl md:text-3xl text-[#1f2732] mb-6 leading-snug">
                            {t("prepare.transport")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white border border-[#e8ddd0] p-6">
                                <p className="font-lora text-slate-600 leading-relaxed text-sm">{t("prepare.transportPara1")}</p>
                            </div>
                            <div className="bg-white border border-[#e8ddd0] p-6">
                                <p className="font-lora text-slate-600 leading-relaxed text-sm">{t("prepare.transportPara2")}</p>
                            </div>
                            <div className="bg-white border border-[#e8ddd0] p-6">
                                <p className="font-lora text-slate-600 leading-relaxed text-sm">{t("prepare.transportPara3")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 15: Guides ────────────────────────────────────────── */}
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

            {/* ── Section 16: Partnerships ──────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("partnerships.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                        {t("partnerships.title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("partnerships.para1")}</p>
                            <p>{t("partnerships.para2")}</p>
                            <p>{t("partnerships.para3")}</p>
                        </div>
                        <div>
                            <p className="font-lora text-slate-600 mb-4">{t("partnerships.nextStepsLabel")}</p>
                            <BulletList items={nextSteps} small />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 17: FAQ ───────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <FAQSection faqs={faqItems} title={t("faq.title")} />
            </section>

            {/* ── Section 18: Final CTA ─────────────────────────────────────── */}
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
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">{t("finalCta.factBooth")}</dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">{t("finalCta.factBoothValue")}</dd>
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

export default JckLasVegasPage;
