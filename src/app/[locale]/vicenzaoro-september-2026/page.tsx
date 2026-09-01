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

// Placeholder images — replace with dedicated Vicenzaoro images once available
const IMAGES = {
    banner: "/jewellery-show-london/fine-jewellery-collection.webp",
    intro: "/event-page-images/Vicenzaoro September 2026/1.png",
    diamonds: "/event-page-images/Vicenzaoro September 2026/2.png",
    matching: "/event-page-images/Vicenzaoro September 2026/3.png",
    partnerships: "/event-page-images/Vicenzaoro September 2026/4.png",
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

const PrimaryCta = ({
    href,
    children,
    external = false,
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}) => {
    const cls =
        "inline-flex items-center justify-center purple-reveal-btn px-8 py-4 uppercase text-xs tracking-widest font-lato";
    if (external)
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                <span>{children}</span>
            </a>
        );
    return (
        <Link href={href} className={cls}>
            <span>{children}</span>
        </Link>
    );
};

const SecondaryCta = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center border border-[#bb923a] text-[#bb923a] px-8 py-4 uppercase text-xs tracking-widest font-lato transition-colors hover:bg-[#bb923a] hover:text-white"
    >
        {children}
    </Link>
);

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3 mb-4">
        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
            {text}
        </h4>
        <span className="w-12 h-px bg-primary" />
    </div>
);

const VicenzaoroSeptemberPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });

    const eventRows = t.raw("eventDetails.rows") as { label: string; value: string }[];
    const whatCanAreas = t.raw("whatCanBuyers.areas") as string[];
    const whySeptemberItems = t.raw("whySeptember.discussItems") as string[];
    const naturalDiamondsItems = t.raw("naturalDiamonds.discussItems") as string[];
    const shapesItems = t.raw("shapes.items") as string[];
    const measurementsItems = t.raw("measurements.considerItems") as string[];
    const bridalItems = t.raw("bridal.discussItems") as string[];
    const matchingItems = t.raw("matching.discussItems") as string[];
    const certItems = t.raw("certification.considerItems") as string[];
    const whoTypes = t.raw("whoShouldMeet.types") as { title: string; body: string }[];
    const prepareItems = t.raw("prepare.items") as string[];
    const communityItems = t.raw("communities.items") as { title: string; body: string }[];
    const nextSteps = t.raw("partnerships.nextSteps") as string[];
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Banner */}
            {/* <BannerSection
                image={IMAGES.banner}
                text={t("hero.title")}
                imageClassName="h-90 object-cover"
                textClassName="left-6 md:left-16 right-auto top-1/2 -translate-y-1/2 max-w-xl normal-case text-3xl md:text-5xl leading-tight"
            /> */}

            {/* ── Section 1: Hero intro ─────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("hero.lead")}
                    subtitle={t("hero.eyebrow")}
                    paragraphs={[t("hero.para1"), t("hero.para2")]}
                    image={{ src: IMAGES.intro, alt: t("hero.imageAlt") }}
                    reverse={false}
                    floatImages={false}
                    actions={
                        <div className="flex flex-wrap gap-4">
                            <PrimaryCta href={APPOINTMENT_HREF}>{t("hero.primaryCta")}</PrimaryCta>
                            <SecondaryCta href={INVENTORY_HREF}>{t("hero.secondaryCta")}</SecondaryCta>
                        </div>
                    }
                />
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

            {/* ── Section 3: What is Vicenzaoro + what can buyers source ───────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="w-full">
                    <Eyebrow text={t("whatIs.eyebrow")} />
                    <div className="flex flex-col md:flex-row md:items-start gap-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1]">
                                {t("whatIs.title")}
                            </h2>
                            <div className="space-y-6 font-lora text-lg text-slate-600 leading-relaxed">
                                <p>{t("whatIs.para1")}</p>
                                <p>{t("whatIs.para2")}</p>
                                <p>{t("whatIs.para3")}</p>
                                <p>{t("whatIs.para4")}</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <Image
                                src={IMAGES.diamonds}
                                alt={t("whatIs.imageAlt")}
                                width={700}
                                height={500}
                                className="w-full h-auto object-cover shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <Eyebrow text={t("whatCanBuyers.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] max-w-3xl">
                        {t("whatCanBuyers.title")}
                    </h2>
                    <p className="font-lora text-lg text-slate-600 leading-relaxed mb-8">{t("whatCanBuyers.intro")}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                        {whatCanAreas.map((area, i) => (
                            <li key={i} className="flex items-start gap-3 font-lora text-slate-600">
                                <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                <span>{area}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="font-lora text-slate-600 leading-relaxed">{t("whatCanBuyers.outro")}</p>
                </div>
            </section>

            {/* ── Section 4: Why September matters ─────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("whySeptember.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] max-w-3xl">
                        {t("whySeptember.title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-5 font-lora text-slate-600 leading-relaxed">
                            <p>{t("whySeptember.para1")}</p>
                            <p>{t("whySeptember.para2")}</p>
                            <p>{t("whySeptember.para3")}</p>
                        </div>
                        <div>
                            <p className="font-lora text-slate-600 mb-4">{t("whySeptember.discussLabel")}</p>
                            <ul className="space-y-2">
                                {whySeptemberItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 font-lora text-slate-600">
                                        <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Meet Uniglo + Natural diamonds ─────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("meet.title")}
                    subtitle={t("meet.eyebrow")}
                    paragraphs={[t("meet.para1"), t("meet.para2"), t("meet.para3"), t("meet.para4")]}
                    image={{ src: IMAGES.diamonds, alt: t("meet.imageAlt") }}
                    reverse={false}
                    floatImages={false}
                    actions={<PrimaryCta href={APPOINTMENT_HREF}>{t("meet.cta")}</PrimaryCta>}
                />

                <div className="mt-20">
                    <Eyebrow text={t("naturalDiamonds.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] max-w-3xl">
                        {t("naturalDiamonds.title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-5 font-lora text-slate-600 leading-relaxed">
                            <p>{t("naturalDiamonds.para1")}</p>
                            <p>{t("naturalDiamonds.para2")}</p>
                        </div>
                        <div>
                            <p className="font-lora text-slate-600 mb-4">{t("naturalDiamonds.discussLabel")}</p>
                            <ul className="space-y-2">
                                {naturalDiamondsItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 font-lora text-slate-600">
                                        <span className="mt-2.5 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 6: Shapes + Measurements ─────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Shapes */}
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
                            </div>
                            <ul className="flex flex-wrap gap-2">
                                {shapesItems.map((shape) => (
                                    <li key={shape} className="border border-[#bb923a]/40 px-4 py-2 font-lato text-[0.7rem] uppercase tracking-[0.15em] text-[#bb923a]">
                                        {shape}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Measurements */}
                        <div>
                            <Eyebrow text={t("measurements.eyebrow")} />
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("measurements.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                                <p>{t("measurements.para1")}</p>
                                <p>{t("measurements.para2")}</p>
                            </div>
                            <p className="font-lora text-slate-600 mb-4">{t("measurements.considerLabel")}</p>
                            <ul className="space-y-2">
                                {measurementsItems.map((item, i) => (
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

            {/* ── Section 7: Bridal + Matching ─────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Bridal */}
                    <div>
                        <Eyebrow text={t("bridal.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("bridal.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("bridal.para1")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("bridal.discussLabel")}</p>
                        <ul className="space-y-2 mb-6">
                            {bridalItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-lora text-slate-600 leading-relaxed">{t("bridal.para2")}</p>
                    </div>
                    {/* Matching */}
                    <div>
                        <Eyebrow text={t("matching.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("matching.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("matching.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("matching.para2")}</p>
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

            {/* ── Section 8: Certification + Antwerp ───────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Certification */}
                    <div>
                        <Eyebrow text={t("certification.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("certification.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("certification.para1")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("certification.considerLabel")}</p>
                        <ul className="space-y-2 mb-6">
                            {certItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-lora text-slate-600 leading-relaxed">{t("certification.para2")}</p>
                    </div>
                    {/* Antwerp */}
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

            {/* ── Section 9: Who should meet ────────────────────────────────────── */}
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

            {/* ── Section 10: Prepare + Communities ────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* How to prepare */}
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
                    {/* Communities */}
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

            {/* ── Section 11: Registration + Concurrent + Getting there ────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Registration */}
                    <div>
                        <Eyebrow text={t("registration.eyebrow")} />
                        <h2 className="text-2xl md:text-3xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("registration.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed text-sm">
                            <p>{t("registration.para1")}</p>
                            <p>{t("registration.para2")}</p>
                            <p>{t("registration.para3")}</p>
                            <p>{t("registration.para4")}</p>
                        </div>
                    </div>
                    {/* Concurrent */}
                    <div>
                        <Eyebrow text={t("concurrent.eyebrow")} />
                        <h2 className="text-2xl md:text-3xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("concurrent.title")}
                        </h2>
                        <div className="space-y-6 font-lora text-slate-600 leading-relaxed text-sm">
                            <div>
                                <p className="font-cormorantGaramond text-lg text-[#1f2732] mb-2">{t("concurrent.tgoldTitle")}</p>
                                <p>{t("concurrent.tgoldPara")}</p>
                            </div>
                            <div>
                                <p className="font-cormorantGaramond text-lg text-[#1f2732] mb-2">{t("concurrent.vintageTitle")}</p>
                                <p>{t("concurrent.vintagePara")}</p>
                            </div>
                        </div>
                    </div>
                    {/* Getting there */}
                    <div>
                        <Eyebrow text={t("getting.eyebrow")} />
                        <h2 className="text-2xl md:text-3xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("getting.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed text-sm">
                            <p>{t("getting.para1")}</p>
                            <p>{t("getting.para2")}</p>
                            <p>{t("getting.para3")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 12: Partnerships ──────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.partnerships}
                            alt={t("partnerships.imageAlt")}
                            width={1100}
                            height={800}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("partnerships.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("partnerships.title")}
                        </h2>
                        <p className="font-lora text-lg text-slate-600 leading-relaxed mb-4">{t("partnerships.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("partnerships.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("partnerships.nextStepsLabel")}</p>
                        <ul className="space-y-2">
                            {nextSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 font-lora text-slate-600 text-sm">
                                    <span className="mt-2 w-1.5 h-1.5 bg-[#bb923a] shrink-0 rotate-45" />
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Section 13: FAQ ───────────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <FAQSection faqs={faqItems} title={t("faq.title")} />
            </section>

            {/* ── Section 14: Final CTA ─────────────────────────────────────────── */}
            <section className="w-full bg-primary-purple-dark px-4 py-20 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6 leading-tight">
                        {t("finalCta.title")}
                    </h2>
                    <p className="text-white font-lora text-lg mb-10">{t("finalCta.para")}</p>

                    <dl className="my-10 inline-grid grid-cols-2 sm:grid-cols-4 gap-6 text-left border border-white/15 px-6 py-6">
                        {[
                            [t("finalCta.factEvent"), t("finalCta.factEventValue")],
                            [t("finalCta.factDates"), t("finalCta.factDatesValue")],
                            [t("finalCta.factVenue"), t("finalCta.factVenueValue")],
                            [t("finalCta.factStand"), t("finalCta.factStandValue")],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">{label}</dt>
                                <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">{value}</dd>
                            </div>
                        ))}
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
                    <p className="mt-10 font-lora text-sm text-white/60">{t("finalCta.note")}</p>
                </div>
            </section>
        </div>
    );
};

export default VicenzaoroSeptemberPage;
