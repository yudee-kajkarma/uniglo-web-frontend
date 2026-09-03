import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FAQSection from "@/components/shared/FAQSection";
import { Link } from "@/i18n/navigation";
import { buildLocaleAlternates } from "@/lib/seo/localeAlternates";
import { SITE_URL, localizedUrl } from "@/lib/seo/site";

const NAMESPACE = "jgwHongKongPage";
const PATH = "jewellery-gem-world-hong-kong-2026";

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
    banner: "/jewellery-show-london/stand-b41-diamond-tray.webp",
    hero: "/event-page-images/jewellery-gem-world-hong-kong-2026/1.png",
    venues: "/event-page-images/jewellery-gem-world-hong-kong-2026/1.png",
    trade: "/event-page-images/jewellery-gem-world-hong-kong-2026/3.png",
    diamonds: "/event-page-images/jewellery-gem-world-hong-kong-2026/2.png",
    bridal: "/event-page-images/jewellery-gem-world-hong-kong-2026/4.png",
    antwerp: "/event-page-images/jewellery-gem-world-hong-kong-2026/4.png",
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

/* ── Reusable CTA components ─────────────────────────────────────────────── */

const PrimaryCta = ({
    href,
    children,
    external = false,
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}) => {
    const className =
        "inline-flex items-center justify-center purple-reveal-btn px-8 py-4 uppercase text-xs tracking-widest font-lato";

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                <span>{children}</span>
            </a>
        );
    }
    return (
        <Link href={href} className={className}>
            <span>{children}</span>
        </Link>
    );
};

const SecondaryCta = ({
    href,
    children,
    external = false,
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}) => {
    const className =
        "inline-flex items-center justify-center border border-[#bb923a] text-[#bb923a] px-8 py-4 uppercase text-xs tracking-widest font-lato transition-colors hover:bg-[#bb923a] hover:text-white";

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {children}
            </a>
        );
    }
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
};

/* ── Page ────────────────────────────────────────────────────────────────── */

const JGWHongKongPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });

    const eventDetails = t.raw("eventDetails.rows") as { label: string; value: string }[];
    const aweCategories = t.raw("venues.aweCategories") as string[];
    const hkcecCategories = t.raw("venues.hkcecCategories") as string[];
    const whatCanSourceItems = t.raw("whatCanSource.items") as string[];
    const shapesItems = t.raw("shapes.items") as string[];
    const matchingItems = t.raw("matching.items") as string[];
    const bridalItems = t.raw("bridal.items") as string[];
    const buyerTypes = t.raw("whoShouldMeet.types") as { title: string; body: string }[];
    const whyAttendItems = t.raw("whyAttend.items") as string[];
    const guidesItems = t.raw("guides.items") as { title: string; body: string }[];
    const faqItems = t.raw("faq.items") as { question: string; answer: string }[];

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
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: t("breadcrumbHome"),
                        item: localizedUrl(locale, ""),
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: t("breadcrumbCurrent"),
                        item: pageUrl,
                    },
                ],
            },
            {
                "@type": "ExhibitionEvent",
                "@id": `${pageUrl}#event`,
                name: "Jewellery & Gem WORLD Hong Kong 2026",
                description: t("metadata.description"),
                startDate: "2026-09-14T10:00:00+08:00",
                endDate: "2026-09-20T17:00:00+08:00",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: [
                    {
                        "@type": "Place",
                        name: "AsiaWorld-Expo",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "1 Airport Expo Boulevard, Chek Lap Kok",
                            addressLocality: "Hong Kong",
                            addressCountry: "HK",
                        },
                    },
                    {
                        "@type": "Place",
                        name: "Hong Kong Convention and Exhibition Centre",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "1 Expo Drive, Wan Chai",
                            addressLocality: "Hong Kong",
                            addressCountry: "HK",
                        },
                    },
                ],
                organizer: {
                    "@type": "Organization",
                    name: "Informa Markets Jewellery",
                },
                subEvent: {
                    "@type": "ExhibitionEvent",
                    name: "Uniglo Diamonds at JGW Hong Kong 2026",
                    startDate: "2026-09-14T10:00:00+08:00",
                    endDate: "2026-09-20T17:00:00+08:00",
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* ── Banner ───────────────────────────────────────────────────── */}
            {/* <BannerSection
                image={IMAGES.banner}
                text={t("hero.title")}
                imageClassName="h-90 object-cover"
                textClassName="left-6 md:left-16 right-auto top-1/2 -translate-y-1/2 max-w-xl normal-case text-3xl md:text-5xl leading-tight"
            /> */}

            {/* ── Section 1: Hero intro ─────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col gap-10 md:flex-row md:items-start mb-10">
                    {/* Image — left, aligned to top */}
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.hero}
                            alt={t("hero.imageAlt")}
                            width={1100}
                            height={1100}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                    {/* Text — right */}
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("hero.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("hero.lead")}
                        </h2>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-lora text-justify">
                            <p>{t("hero.para1")}</p>
                            <p>{t("hero.para2")}</p>
                        </div>
                    </div>
                </div>
                {/* Button — centered below both columns */}
                <div className="flex justify-center">
                    <PrimaryCta href={APPOINTMENT_HREF}>
                        {t("hero.primaryCta")}
                    </PrimaryCta>
                </div>
            </section>

            {/* ── Section 2: Event details table ────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                            {t("eventDetails.eyebrow")}
                        </h4>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] max-w-3xl">
                        {t("eventDetails.title")}
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse font-lora text-sm md:text-base">
                            <thead>
                                <tr className="bg-primary-purple-dark text-primary-yellow-1">
                                    <th className="text-left px-6 py-4 font-lato uppercase tracking-[0.15em] text-xs">
                                        {t("eventDetails.colLabel")}
                                    </th>
                                    <th className="text-left px-6 py-4 font-lato uppercase tracking-[0.15em] text-xs">
                                        {t("eventDetails.colValue")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventDetails.map((row, i) => (
                                    <tr
                                        key={i}
                                        className={i % 2 === 0 ? "bg-white" : "bg-[#f4efe7]"}
                                    >
                                        <td className="px-6 py-4 text-slate-500 font-lato text-xs uppercase tracking-[0.12em]">
                                            {row.label}
                                        </td>
                                        <td className="px-6 py-4 text-[#1f2732] font-lora">
                                            {row.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── Section 3: What is JGW + venues ──────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row md:items-start gap-12">
                    {/* Text — left */}
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("whatIsJGW.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1]">
                            {t("whatIsJGW.title")}
                        </h2>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-lora">
                            <p>{t("whatIsJGW.para1")}</p>
                            <p>{t("whatIsJGW.para2")}</p>
                            <p>{t("whatIsJGW.para3")}</p>
                        </div>
                    </div>

                    {/* Image — right */}
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.venues}
                            alt={t("whatIsJGW.title")}
                            width={1100}
                            height={1100}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                </div>

                {/* Two-venue split */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* AsiaWorld-Expo */}
                    <div className="border-t-2 border-[#bb923a] pt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("venues.aweEyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h3 className="font-cormorantGaramond text-3xl text-[#1f2732] mb-4 leading-snug">
                            {t("venues.aweTitle")}
                        </h3>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">
                            {t("venues.awePara")}
                        </p>
                        <ul className="space-y-2 font-lora text-slate-600">
                            {aweCategories.map((cat, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{cat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* HKCEC */}
                    <div className="border-t-2 border-[#bb923a] pt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("venues.hkcecEyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h3 className="font-cormorantGaramond text-3xl text-[#1f2732] mb-4 leading-snug">
                            {t("venues.hkcecTitle")}
                        </h3>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">
                            {t("venues.hkcecPara")}
                        </p>
                        <ul className="space-y-2 font-lora text-slate-600">
                            {hkcecCategories.map((cat, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{cat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Section 3b: What Buyers Can Source ───────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                            {t("whatCanSource.eyebrow")}
                        </h4>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] max-w-3xl">
                        {t("whatCanSource.title")}
                    </h2>
                    <p className="font-lora text-slate-600 leading-relaxed mb-8 text-lg">
                        {t("whatCanSource.para1")}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                        {whatCanSourceItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white border border-[#e8ddd0] px-4 py-3">
                                <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                                <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className="font-lora text-slate-600 leading-relaxed">
                        {t("whatCanSource.para2")}
                    </p>
                </div>
            </section>

            {/* ── Section 4: Meet Uniglo at JGW ────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.trade}
                            alt={t("meet.imageAlt")}
                            width={1100}
                            height={1100}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("meet.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("meet.title")}
                        </h2>
                        <p className="font-lora text-lg text-slate-600 leading-relaxed mb-4">
                            {t("meet.para1")}
                        </p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">
                            {t("meet.para2")}
                        </p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-8">
                            {t("meet.para3")}
                        </p>
                        <PrimaryCta href={APPOINTMENT_HREF}>
                            {t("meet.cta")}
                        </PrimaryCta>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Natural Diamond Sourcing ──────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col gap-10 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("naturalDiamondSourcing.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("naturalDiamondSourcing.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("naturalDiamondSourcing.para1")}</p>
                            <p>{t("naturalDiamondSourcing.para2")}</p>
                            <p>{t("naturalDiamondSourcing.para3")}</p>
                            <p>{t("naturalDiamondSourcing.para4")}</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.diamonds}
                            alt={t("naturalDiamondSourcing.imageAlt")}
                            width={1100}
                            height={1100}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                </div>
            </section>

            {/* ── Section 6: Diamond shapes & specifications ────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                <ArticleLayout
                    title={t("shapes.title")}
                    subtitle={t("shapes.eyebrow")}
                    paragraphs={[t("shapes.para1"), t("shapes.para2"), t("shapes.para3")]}
                    reverse={false}
                    floatImages={false}
                    actions={
                        <div>
                            <ul className="flex flex-wrap gap-2 mb-8">
                                {shapesItems.map((shape) => (
                                    <li
                                        key={shape}
                                        className="border border-[#bb923a]/40 px-4 py-2 font-lato text-[0.7rem] uppercase tracking-[0.15em] text-[#bb923a]"
                                    >
                                        {shape}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                />

                {/* Matching & consistency sub-section */}
                <ArticleLayout
                    title={t("matching.title")}
                    subtitle={t("matching.eyebrow")}
                    paragraphs={[t("matching.para1"), t("matching.para2")]}
                    bulletPoints={matchingItems}
                    image={{ src: IMAGES.bridal, alt: t("matching.imageAlt") }}
                    reverse={true}
                    floatImages={false}
                />
                </div>
            </section>

            {/* ── Section 6b: Bridal & fine-jewellery manufacturing ─────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col gap-10 md:flex-row-reverse md:items-start mb-8">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("bridal.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("bridal.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                            <p>{t("bridal.para1")}</p>
                            <p>{t("bridal.para2")}</p>
                        </div>
                        <ul className="space-y-2 font-lora text-slate-600">
                            {bridalItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.bridal}
                            alt={t("bridal.imageAlt")}
                            width={1100}
                            height={1100}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                </div>
                <p className="w-full font-lora text-slate-600 leading-relaxed">
                    {t("bridal.para3")}
                </p>
            </section>

            {/* ── Section 6: Antwerp expertise + documentation ──────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        {/* Antwerp expertise */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                    {t("antwerp.eyebrow")}
                                </h4>
                                <span className="w-12 h-px bg-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("antwerp.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                                <p>{t("antwerp.para1")}</p>
                                <p>{t("antwerp.para2")}</p>
                                <p>{t("antwerp.para3")}</p>
                            </div>
                        </div>

                        {/* Documentation */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                    {t("documentation.eyebrow")}
                                </h4>
                                <span className="w-12 h-px bg-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("documentation.title")}
                            </h2>
                            <p className="font-lora text-slate-600 leading-relaxed mb-6">
                                {t("documentation.para1")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 7: Who should meet Uniglo ────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                        {t("whoShouldMeet.eyebrow")}
                    </h4>
                    <span className="w-12 h-px bg-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-12 leading-[1.1] max-w-3xl">
                    {t("whoShouldMeet.title")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {buyerTypes.map((type, i) => (
                        <div
                            key={i}
                            className="border-t-2 border-[#bb923a] pt-6"
                        >
                            <h3 className="font-cormorantGaramond text-2xl text-[#1f2732] mb-3 leading-snug">
                                {type.title}
                            </h3>
                            <p className="font-lora text-slate-600 leading-relaxed text-sm">
                                {type.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Section 8: Why attend + prepare ──────────────────────────── */}

            {/* Why Attend — white bg */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">{t("whyAttend.eyebrow")}</h4>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] leading-[1.1]">
                        {t("whyAttend.title")}
                    </h2>
                </div>
                <p className="w-full font-lora text-slate-600 leading-relaxed mb-10">{t("whyAttend.para")}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {whyAttendItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-[#faf7f2] border border-[#e8ddd0] px-4 py-3">
                            <span className="w-1.5 h-1.5 bg-[#bb923a] rotate-45 shrink-0" />
                            <span className="font-lora text-sm text-[#1f2732] leading-snug">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Section 8b: Plan Visit ────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                    {t("planVisit.eyebrow")}
                                </h4>
                                <span className="w-12 h-px bg-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("planVisit.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                                <p>{t("planVisit.para1")}</p>
                                <p>{t("planVisit.para2")}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                    {t("registration.eyebrow")}
                                </h4>
                                <span className="w-12 h-px bg-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("registration.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                                <p>{t("registration.para1")}</p>
                                <p>{t("registration.para2")}</p>
                                <p>{t("registration.para3")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 8c: After JGW ─────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                        {t("afterJGW.eyebrow")}
                    </h4>
                    <span className="w-12 h-px bg-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] w-full">
                    {t("afterJGW.title")}
                </h2>
                <div className="space-y-4 font-lora text-slate-600 leading-relaxed w-full">
                    <p>{t("afterJGW.para1")}</p>
                    <p>{t("afterJGW.para2")}</p>
                    <p>{t("afterJGW.para3")}</p>
                </div>
            </section>

            {/* ── Section 8d: Guides ────────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                            {t("guides.eyebrow")}
                        </h4>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] max-w-3xl">
                        {t("guides.title")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {guidesItems.map((guide, i) => (
                            <div key={i} className="border-t-2 border-[#bb923a] pt-6">
                                <h3 className="font-cormorantGaramond text-2xl text-[#1f2732] mb-3 leading-snug">
                                    {guide.title}
                                </h3>
                                <p className="font-lora text-slate-600 leading-relaxed text-sm">
                                    {guide.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 9: FAQ ────────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <FAQSection faqs={faqItems} title={t("faq.title")} />
            </section>

            {/* ── Section 10: Final CTA ─────────────────────────────────────── */}
            <section className="w-full bg-primary-purple-dark px-4 py-20 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6 leading-tight">
                        {t("finalCta.title")}
                    </h2>
                    <p className="text-white font-lora text-lg mb-4">
                        {t("finalCta.para")}
                    </p>

                    {/* Event summary facts */}
                    <dl className="my-10 inline-grid grid-cols-1 sm:grid-cols-4 gap-6 text-left border border-white/15 px-8 py-6">
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">
                                {t("finalCta.factEvent")}
                            </dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">
                                {t("finalCta.factEventValue")}
                            </dd>
                        </div>
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">
                                {t("finalCta.factDates")}
                            </dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">
                                {t("finalCta.factDatesValue")}
                            </dd>
                        </div>
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">
                                {t("finalCta.factDates2")}
                            </dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">
                                {t("finalCta.factDates2Value")}
                            </dd>
                        </div>
                        <div>
                            <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">
                                {t("finalCta.factStand")}
                            </dt>
                            <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">
                                {t("finalCta.factStandValue")}
                            </dd>
                        </div>
                    </dl>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={APPOINTMENT_HREF}
                            className="inline-flex items-center justify-center bg-primary-yellow-1 text-primary-purple-dark px-8 py-4 uppercase text-xs tracking-widest font-lato transition-opacity hover:opacity-85"
                        >
                            {t("finalCta.primaryCta")}
                        </Link>
                        <Link
                            href={INVENTORY_HREF}
                            className="inline-flex items-center justify-center border border-primary-yellow-1 text-primary-yellow-1 px-8 py-4 uppercase text-xs tracking-widest font-lato transition-colors hover:bg-primary-yellow-1 hover:text-primary-purple-dark"
                        >
                            {t("finalCta.secondaryCta")}
                        </Link>
                    </div>
                    <p className="mt-10 font-lora text-sm text-white/60">
                        {t("finalCta.note")}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default JGWHongKongPage;
