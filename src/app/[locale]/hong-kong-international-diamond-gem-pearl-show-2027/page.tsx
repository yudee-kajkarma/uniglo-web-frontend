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
    banner: "/jewellery-show-london/fine-jewellery-collection.webp",
    hero: "/event-page-images/Hong Kong/1.png",
    meet: "/event-page-images/Hong Kong/2.png",
    diamonds: "/event-page-images/Hong Kong/3.png",
    matching: "/jewellery-show-london/stand-b41-diamond-tray.webp",
    antwerp: "/event-page-images/Hong Kong/4.png",
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

    const eventRows = t.raw("eventDetails.rows") as { label: string; value: string }[];
    const eventHours = t.raw("eventDetails.hours") as { date: string; time: string }[];
    const compareItems = t.raw("foundations.compareItems") as string[];
    const meetDiscussItems = t.raw("meetUniglo.discussItems") as string[];
    const bridalItems = t.raw("bridalFine.discussItems") as string[];
    const applicationItems = t.raw("application.discussItems") as string[];
    const matchingItems = t.raw("matching.discussItems") as string[];
    const measurementsItems = t.raw("measurements.considerItems") as string[];
    const certItems = t.raw("certification.considerItems") as string[];
    const understandItems = t.raw("inPerson.understandItems") as string[];
    const hybridBenefits = t.raw("hybrid.benefits") as string[];
    const prepareItems = t.raw("registration.prepareItems") as string[];
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
                name: "Hong Kong International Diamond, Gem & Pearl Show 2027",
                alternateName: [
                    "HKTDC Hong Kong International Diamond, Gem & Pearl Show 2027",
                    "Hong Kong Diamond, Gem & Pearl Show 2027",
                ],
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
                        addressRegion: "Lantau Island",
                        addressCountry: "HK",
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: "Hong Kong Trade Development Council",
                    alternateName: "HKTDC",
                    url: "https://www.hktdc.com/",
                },
                subEvent: {
                    "@type": "Event",
                    name: "Uniglo Diamonds at the Hong Kong Diamond, Gem & Pearl Show 2027",
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

            {/* Announcement */}
            {/* <div className="w-full bg-primary-purple-dark px-4 py-3 text-center">
                <p className="font-lato text-xs md:text-sm tracking-wide text-primary-yellow-1">{t("announcement")}</p>
            </div> */}

            {/* Banner */}
            {/* <BannerSection
                image={IMAGES.banner}
                text={t("hero.title")}
                imageClassName="h-90 object-cover"
                textClassName="left-6 md:left-16 right-auto top-1/2 -translate-y-1/2 max-w-xl normal-case text-3xl md:text-5xl leading-tight"
            /> */}

            {/* ── Section 1: Hero ───────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.hero}
                            alt={t("hero.imageAlt")}
                            width={700}
                            height={500}
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">{t("hero.eyebrow")}</h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("hero.lead")}
                        </h2>
                        <div className="space-y-6 font-lora text-lg text-slate-600 leading-relaxed mb-8">
                            <p>{t("hero.para1")}</p>
                            <p>{t("hero.para2")}</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <PrimaryCta href={APPOINTMENT_HREF}>{t("hero.primaryCta")}</PrimaryCta>
                            <SecondaryCta href={INVENTORY_HREF}>{t("hero.secondaryCta")}</SecondaryCta>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 2: Event Details Table + Hours ────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("eventDetails.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] max-w-3xl">
                        {t("eventDetails.title")}
                    </h2>
                    <div className="overflow-x-auto mb-10">
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
                    {/* Opening Hours */}
                    <h3 className="text-2xl font-cormorantGaramond text-[#1f2732] mb-6">{t("eventDetails.hoursTitle")}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse font-lora text-sm">
                            <thead>
                                <tr className="bg-primary-purple-dark text-primary-yellow-1">
                                    <th className="text-left px-6 py-3 font-lato uppercase tracking-[0.15em] text-xs">Date</th>
                                    <th className="text-left px-6 py-3 font-lato uppercase tracking-[0.15em] text-xs">Opening Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventHours.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f4efe7]"}>
                                        <td className="px-6 py-3 text-[#1f2732] font-lora">{row.date}</td>
                                        <td className="px-6 py-3 text-[#1f2732] font-lora">{row.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("eventDetails.note")}</p>
                </div>
            </section>

            {/* ── Section 3: Foundations ────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div>
                        <Eyebrow text={t("foundations.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("foundations.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("foundations.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("foundations.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("foundations.compareLabel")}</p>
                        <BulletList items={compareItems} small />
                        <p className="mt-6 font-lora text-slate-600 leading-relaxed">{t("foundations.para3")}</p>
                    </div>
                    {/* Twin Shows */}
                    <div>
                        <Eyebrow text={t("twinShows.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("twinShows.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("twinShows.para1")}</p>
                            <p>{t("twinShows.para2")}</p>
                            <p>{t("twinShows.para3")}</p>
                            <p>{t("twinShows.para4")}</p>
                            <p className="text-sm italic text-slate-500">{t("twinShows.para5")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 4: Meet Uniglo ────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.meet} alt={t("meetUniglo.imageAlt")} width={1100} height={800}
                            sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("meetUniglo.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("meetUniglo.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                            <p>{t("meetUniglo.para1")}</p>
                            <p>{t("meetUniglo.para2")}</p>
                            <p>{t("meetUniglo.para3")}</p>
                        </div>
                        <p className="mt-6 font-lora text-slate-600 leading-relaxed">{t("meetUniglo.outro")}</p>
                        <PrimaryCta href={APPOINTMENT_HREF}>{t("meetUniglo.cta")}</PrimaryCta>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Bridal + Shapes ───────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("bridalFine.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("bridalFine.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("bridalFine.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("bridalFine.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("bridalFine.discussLabel")}</p>
                        <BulletList items={bridalItems} small />
                        <p className="mt-6 font-lora text-slate-600 leading-relaxed">{t("bridalFine.para3")}</p>
                    </div>
                    <div>
                        <Eyebrow text={t("shapes.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("shapes.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                            <p>{t("shapes.para1")}</p>
                            <p>{t("shapes.para2")}</p>
                            <p>{t("shapes.para3")}</p>
                            <p>{t("shapes.para4")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 6: Application + Matching ────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("application.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("application.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("application.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("application.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("application.discussLabel")}</p>
                        <BulletList items={applicationItems} small />
                        <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("application.outro")}</p>
                    </div>
                    <div>
                        <Eyebrow text={t("matching.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("matching.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("matching.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("matching.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("matching.discussLabel")}</p>
                        <BulletList items={matchingItems} small />
                        <p className="mt-4 font-lora text-slate-500 text-sm italic">{t("matching.para3")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 7: Measurements + Certification ───────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("measurements.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("measurements.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("measurements.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("measurements.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("measurements.considerLabel")}</p>
                        <BulletList items={measurementsItems} small />
                    </div>
                    <div>
                        <Eyebrow text={t("certification.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("certification.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("certification.para1")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("certification.considerLabel")}</p>
                        <BulletList items={certItems} small />
                        <p className="mt-6 font-lora text-slate-600 leading-relaxed">{t("certification.para2")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 8: In Person + Antwerp ────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("inPerson.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("inPerson.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("inPerson.para1")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("inPerson.understandLabel")}</p>
                        <BulletList items={understandItems} small />
                        <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("inPerson.outro")}</p>
                    </div>
                    <div>
                        <Eyebrow text={t("antwerp.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("antwerp.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                            <p>{t("antwerp.para1")}</p>
                            <p>{t("antwerp.para2")}</p>
                            <p>{t("antwerp.para3")}</p>
                            <p>{t("antwerp.para4")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 9: Hybrid ─────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("hybrid.title")}
                    subtitle={t("hybrid.eyebrow")}
                    paragraphs={[t("hybrid.para1"), t("hybrid.para2"), t("hybrid.para3")]}
                    image={{ src: IMAGES.antwerp, alt: t("hybrid.imageAlt") }}
                    reverse={true}
                    floatImages={false}
                    actions={
                        <div>
                            <p className="font-lora text-slate-600 mb-4">{t("hybrid.benefitsLabel")}</p>
                            <BulletList items={hybridBenefits} small />
                        </div>
                    }
                />
            </section>

            {/* ── Section 10: Registration ──────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <Eyebrow text={t("registration.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-10 leading-[1.1] max-w-3xl">
                        {t("registration.title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("registration.para1")}</p>
                            <p>{t("registration.para2")}</p>
                        </div>
                        <div>
                            <p className="font-lora text-slate-600 mb-4">{t("registration.prepareLabel")}</p>
                            <BulletList items={prepareItems} small />
                            <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("registration.note")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 11: Partnerships ──────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="max-w-3xl">
                    <Eyebrow text={t("partnerships.eyebrow")} />
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                        {t("partnerships.title")}
                    </h2>
                    <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("partnerships.para1")}</p>
                    <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("partnerships.para2")}</p>
                    <p className="font-lora text-slate-600 mb-4">{t("partnerships.nextStepsLabel")}</p>
                    <BulletList items={nextSteps} />
                    <p className="mt-6 font-lora text-slate-600 leading-relaxed">{t("partnerships.para3")}</p>
                </div>
            </section>

            {/* ── Section 12: Looking Ahead ─────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-start gap-12">
                        <div className="w-full md:w-1/2">
                            <Eyebrow text={t("lookingAhead.eyebrow")} />
                            <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1]">
                                {t("lookingAhead.title")}
                            </h2>
                            <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                                <p>{t("lookingAhead.para1")}</p>
                                <p>{t("lookingAhead.para2")}</p>
                                <p>{t("lookingAhead.para3")}</p>
                            </div>
                            <p className="font-lora text-sm text-slate-500 italic">{t("lookingAhead.note")}</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <Image
                                src={IMAGES.diamonds}
                                alt={t("lookingAhead.title")}
                                width={700}
                                height={500}
                                className="w-full h-auto object-cover shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 13: FAQ ───────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <FAQSection faqs={faqItems} title={t("faq.title")} />
            </section>

            {/* ── Section 14: Final CTA ─────────────────────────────────────── */}
            <section className="w-full bg-primary-purple-dark px-4 py-20 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6 leading-tight">
                        {t("finalCta.title")}
                    </h2>
                    <p className="text-white font-lora text-lg mb-10">{t("finalCta.para")}</p>
                    <dl className="my-10 inline-grid grid-cols-2 sm:grid-cols-4 gap-6 text-left border border-white/15 px-6 py-6">
                        {([
                            [t("finalCta.factEvent"), t("finalCta.factEventValue")],
                            [t("finalCta.factDates"), t("finalCta.factDatesValue")],
                            [t("finalCta.factVenue"), t("finalCta.factVenueValue")],
                            [t("finalCta.factStand"), t("finalCta.factStandValue")],
                        ] as [string, string][]).map(([label, value]) => (
                            <div key={label}>
                                <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-1">{label}</dt>
                                <dd className="font-cormorantGaramond text-lg text-primary-yellow-1">{value}</dd>
                            </div>
                        ))}
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
