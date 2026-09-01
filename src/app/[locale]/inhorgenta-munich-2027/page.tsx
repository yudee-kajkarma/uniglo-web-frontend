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

const NAMESPACE = "inhorgentaMunichPage";
const PATH = "inhorgenta-munich-2027";

const HREFLANG_REGION: Record<string, string> = {
    en: "en-DE",
    fr: "fr-DE",
    nl: "nl-DE",
    de: "de-DE",
    it: "it-DE",
    es: "es-DE",
};

const APPOINTMENT_HREF = "/contact-us";
const INVENTORY_HREF = "/inventory";

const IMAGES = {
    banner: "/jewellery-show-london/fine-jewellery-collection.webp",
    hero: "/event-page-images/Inhorgenta Munich 2027/1.png",
    discover: "/event-page-images/Inhorgenta Munich 2027/2.png",
    diamonds: "/event-page-images/Inhorgenta Munich 2027/3.png",
    matching: "/event-page-images/Inhorgenta Munich 2027/4.png",
    antwerp: "/event-page-images/Inhorgenta Munich 2027/1.png",
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

const PrimaryCta = ({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) => {
    const cls = "inline-flex items-center justify-center purple-reveal-btn px-8 py-4 uppercase text-xs tracking-widest font-lato";
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}><span>{children}</span></a>;
    return <Link href={href} className={cls}><span>{children}</span></Link>;
};

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

const InhorgentaMunichPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });

    const eventRows = t.raw("eventDetails.rows") as { label: string; value: string }[];
    const shapesItems = t.raw("precision.shapes") as string[];
    const discussItems = t.raw("precision.discussItems") as string[];
    const bridalItems = t.raw("bridal.discussItems") as string[];
    const matchingItems = t.raw("matching.discussItems") as string[];
    const measurementsItems = t.raw("measurements.considerItems") as string[];
    const certItems = t.raw("certification.considerItems") as string[];
    const benefits = t.raw("whyMeet.benefits") as string[];
    const nextSteps = t.raw("partnerships.nextSteps") as string[];
    const confirmItems = t.raw("planning.confirmItems") as string[];
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
                name: "INHORGENTA Munich 2027",
                alternateName: "INHORGENTA 2027",
                description: t("metadata.description"),
                startDate: "2027-02-19T09:30:00+01:00",
                endDate: "2027-02-22T17:00:00+01:00",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: {
                    "@type": "Place",
                    name: "Trade Fair Center Messe München",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "Am Messesee 2",
                        postalCode: "81829",
                        addressLocality: "Munich",
                        addressRegion: "Bavaria",
                        addressCountry: "DE",
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: "Messe München GmbH",
                    url: "https://messe-muenchen.de/en/",
                },
                subEvent: {
                    "@type": "Event",
                    name: "Uniglo Diamonds at INHORGENTA Munich 2027",
                    organizer: { "@id": `${SITE_URL}/#organization` },
                },
            },
            {
                "@type": ["WebPage", "FAQPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: t("metadata.title"),
                description: t("metadata.description"),
                inLanguage: HREFLANG_REGION[locale] ?? "en-DE",
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

            {/* ── Section 3: Industry context ───────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("industry.title")}
                    subtitle={t("industry.eyebrow")}
                    paragraphs={[t("industry.para1"), t("industry.para2"), t("industry.para3"), t("industry.para4"), t("industry.para5")]}
                    image={{ src: IMAGES.hero, alt: t("industry.imageAlt") }}
                    reverse={true}
                    floatImages={false}
                />
            </section>

            {/* ── Section 4: Discover Uniglo ────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-start">
                    <div className="w-full md:w-1/2">
                        <Image src={IMAGES.discover} alt={t("discover.imageAlt")} width={1100} height={800}
                            sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover shadow-sm" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Eyebrow text={t("discover.eyebrow")} />
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("discover.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-8">
                            <p>{t("discover.para1")}</p>
                            <p>{t("discover.para2")}</p>
                            <p>{t("discover.para3")}</p>
                            <p>{t("discover.para4")}</p>
                        </div>
                        <PrimaryCta href={APPOINTMENT_HREF}>{t("discover.cta")}</PrimaryCta>
                    </div>
                </div>
            </section>

            {/* ── Section 5: Precision + Shapes ────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Precision */}
                    <div>
                        <Eyebrow text={t("precision.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("precision.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed mb-6">
                            <p>{t("precision.para1")}</p>
                            <p>{t("precision.para2")}</p>
                        </div>
                        <p className="font-lora text-slate-600 mb-4">{t("precision.shapesLabel")}</p>
                        <ul className="flex flex-wrap gap-2 mb-4">
                            {shapesItems.map((shape) => (
                                <li key={shape} className="border border-[#bb923a]/40 px-4 py-2 font-lato text-[0.7rem] uppercase tracking-[0.15em] text-[#bb923a]">
                                    {shape}
                                </li>
                            ))}
                        </ul>
                        <p className="font-lora text-sm text-slate-500 italic mb-6">{t("precision.shapesNote")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("precision.discussLabel")}</p>
                        <BulletList items={discussItems} small />
                    </div>
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
                    </div>
                </div>
            </section>

            {/* ── Section 6: Bridal ─────────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <div>
                            <Eyebrow text={t("bridal.eyebrow")} />
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                                {t("bridal.title")}
                            </h2>
                            <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("bridal.para1")}</p>
                            <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("bridal.para2")}</p>
                            <p className="font-lora text-slate-600 mb-4">{t("bridal.discussLabel")}</p>
                            <BulletList items={bridalItems} small />
                            <p className="mt-6 font-lora text-slate-600 leading-relaxed">{t("bridal.para3")}</p>
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
                            <BulletList items={matchingItems} small />
                            <p className="mt-4 font-lora text-slate-500 text-sm italic">{t("matching.para3")}</p>
                        </div>
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

            {/* ── Section 8: Meeting place + Why Meet ──────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("meetingPlace.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("meetingPlace.title")}
                        </h2>
                        <div className="space-y-4 font-lora text-slate-600 leading-relaxed">
                            <p>{t("meetingPlace.para1")}</p>
                            <p>{t("meetingPlace.para2")}</p>
                            <p>{t("meetingPlace.para3")}</p>
                        </div>
                    </div>
                    <div>
                        <Eyebrow text={t("whyMeet.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("whyMeet.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("whyMeet.para1")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("whyMeet.benefitsLabel")}</p>
                        <BulletList items={benefits} small />
                        <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("whyMeet.note")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 9: Antwerp ────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row md:items-start gap-10">
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.antwerp}
                            alt={t("antwerp.title")}
                            width={700}
                            height={500}
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">{t("antwerp.eyebrow")}</h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("antwerp.title")}
                        </h2>
                        <div className="space-y-6 font-lora text-lg text-slate-600 leading-relaxed mb-8">
                            <p>{t("antwerp.para1")}</p>
                            <p>{t("antwerp.para2")}</p>
                            <p>{t("antwerp.para3")}</p>
                            <p>{t("antwerp.para4")}</p>
                        </div>
                        <PrimaryCta href={APPOINTMENT_HREF}>{t("hero.primaryCta")}</PrimaryCta>
                    </div>
                </div>
            </section>

            {/* ── Section 10: Partnerships + Planning ──────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <Eyebrow text={t("partnerships.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("partnerships.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("partnerships.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("partnerships.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("partnerships.nextStepsLabel")}</p>
                        <BulletList items={nextSteps} small />
                        <p className="mt-6 font-lora text-slate-600 leading-relaxed">{t("partnerships.para3")}</p>
                    </div>
                    <div>
                        <Eyebrow text={t("planning.eyebrow")} />
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("planning.title")}
                        </h2>
                        <p className="font-lora text-slate-600 leading-relaxed mb-4">{t("planning.para1")}</p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-6">{t("planning.para2")}</p>
                        <p className="font-lora text-slate-600 mb-4">{t("planning.confirmLabel")}</p>
                        <BulletList items={confirmItems} small />
                        <p className="mt-6 font-lora text-sm text-slate-500 italic">{t("planning.note")}</p>
                    </div>
                </div>
            </section>

            {/* ── Section 11: Looking ahead ─────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="max-w-3xl">
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
            </section>

            {/* ── Section 12: FAQ ───────────────────────────────────────────── */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <FAQSection faqs={faqItems} title={t("faq.title")} />
                </div>
            </section>

            {/* ── Section 13: Final CTA ─────────────────────────────────────── */}
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

export default InhorgentaMunichPage;
