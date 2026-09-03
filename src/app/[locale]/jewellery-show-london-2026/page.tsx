import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import ArticleLayout from "@/components/shared/ArticleLayout";
import FAQSection from "@/components/shared/FAQSection";
import EventBlogsCarousel from "@/components/shared/EventBlogsCarousel";
import { Link } from "@/i18n/navigation";
import { buildLocaleAlternates } from "@/lib/seo/localeAlternates";
import { SITE_URL, localizedUrl } from "@/lib/seo/site";

const NAMESPACE = "jewelleryShowLondonPage";
const PATH = "jewellery-show-london-2026";

// The show is a UK trade event, so the language versions target GB rather than
// the BE regions the Antwerp campaign pages use.
const HREFLANG_REGION: Record<string, string> = {
    en: "en-GB",
    fr: "fr-GB",
    nl: "nl-GB",
    de: "de-GB",
    it: "it-GB",
    es: "es-GB",
};

// Show facts, kept out of the message files because they are the same in every
// language and are reused by the structured data.
const SHOW = {
    startDate: "2026-09-02T09:00:00+01:00",
    endDate: "2026-09-03T17:00:00+01:00",
    venue: "National Hall, Olympia London",
    street: "Hammersmith Road",
    postalCode: "W14 8UX",
    city: "London",
    stand: "B41",
};

// TODO: confirm the official Jewellery Show registration URL with the events
// team before this page goes live — every "register" CTA resolves from here.
const SHOW_WEBSITE = "https://www.thejewelleryshow.co.uk/";

// TODO: replace with the confirmed live Uniglo Jewels URL, matching the
// placeholder already carried by the Antwerp campaign page.
const JEWELS_HOME = "https://www.uniglojewels.com";

const APPOINTMENT_HREF = "/contact-us";
const INVENTORY_HREF = "/inventory";
const DIAMONDS_HREF = "/diamonds/natural";

// The seven show articles, in reading order. `id` keys the card copy already
// carried by the BlogsPage namespace for the /blogs listing, so the titles,
// excerpts and dates stay in one place for all six locales.
const EVENT_BLOGS = [
    { id: 93, slug: "jewellery-show-london-2026-visitor-guide" },
    { id: 94, slug: "jewellery-show-london-2026-exhibitors" },
    { id: 95, slug: "jewellery-show-london-2026-programme" },
    { id: 96, slug: "jewellery-trade-show-buyer-checklist" },
    { id: 97, slug: "uk-jewellery-trends-2026" },
    { id: 98, slug: "jewellery-assortment-planning" },
    { id: 99, slug: "how-to-choose-natural-diamond-supplier" },
];

const IMAGES = {
    hero: "/jewellery-show-london/stand-b41-diamond-tray.webp",
    jewellery: "/jewellery-show-london/fine-jewellery-collection.webp",
    diamonds: "/jewellery-show-london/certified-diamond-shapes.webp",
    antwerp: "/jewellery-show-london/antwerp-workshop.webp",
    brief: "/jewellery-show-london/buyer-meeting-gia-report.webp",
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

/* Gold-on-purple primary CTA, matching the site's existing reveal button. */
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
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
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
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
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

const JewelleryShowLondonPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });

    const heroMeta = t.raw("hero.meta") as { label: string; value: string }[];
    const shapes = t.raw("diamonds.shapes") as string[];
    const visitFacts = t.raw("visit.facts") as {
        label: string;
        value: string;
    }[];
    const finalFacts = t.raw("finalCta.facts") as string[];

    const tBlogs = await getTranslations({ locale, namespace: "BlogsPage" });
    const eventBlogs = EVENT_BLOGS.map(({ id, slug }) => ({
        slug,
        image: `/jewellery-show-london/blogs/${slug}.webp`,
        title: tBlogs(`posts.${id}.title`),
        meta: `${tBlogs(`posts.${id}.author`)} ${tBlogs(`posts.${id}.date`)}`,
        excerpt: tBlogs(`posts.${id}.excerpt`),
    }));
    const faqItems = t.raw("faq.items") as {
        question: string;
        answer: string;
    }[];

    const pageUrl = localizedUrl(locale, PATH);

    // Organization, BreadcrumbList, the show itself as an ExhibitionEvent and a
    // FAQPage. Uniglo is declared as an exhibitor via `subEvent` rather than
    // `organizer` — we exhibit at the show, we do not run it.
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
                name: "The Jewellery Show London 2026",
                description: t("metadata.description"),
                startDate: SHOW.startDate,
                endDate: SHOW.endDate,
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                url: SHOW_WEBSITE,
                location: {
                    "@type": "Place",
                    name: SHOW.venue,
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: SHOW.street,
                        addressLocality: SHOW.city,
                        postalCode: SHOW.postalCode,
                        addressCountry: "GB",
                    },
                },
                // The stand is what this page is actually about, so it is
                // modelled as our sub-event inside the wider trade show.
                subEvent: {
                    "@type": "ExhibitionEvent",
                    name: `Uniglo Diamonds — Stand ${SHOW.stand}`,
                    startDate: SHOW.startDate,
                    endDate: SHOW.endDate,
                    location: {
                        "@type": "Place",
                        name: `Stand ${SHOW.stand}, ${SHOW.venue}`,
                    },
                    organizer: { "@id": `${SITE_URL}/#organization` },
                },
            },
            {
                "@type": ["WebPage", "FAQPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: t("metadata.title"),
                description: t("metadata.description"),
                inLanguage: HREFLANG_REGION[locale] ?? "en-GB",
                publisher: { "@id": `${SITE_URL}/#organization` },
                breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
                about: { "@id": `${pageUrl}#event` },
                mainEntity: faqItems.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                    },
                })),
            },
        ],
    };

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            {/* Announcement bar */}
            {/* <div className="w-full bg-primary-purple-dark px-4 py-3 text-center">
                <p className="font-lato text-xs md:text-sm tracking-wide text-primary-yellow-1">
                    {t("announcement")}
                </p>
            </div> */}

            {/* Section 1 — hero. The show assets are square, so this uses a
                split hero instead of the site's wide BannerSection. */}
            <section className="w-full bg-primary-purple-dark">
                <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col-reverse gap-12 md:flex-row md:items-center">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-5">
                            <h4 className="text-primary-yellow-1 font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("hero.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary-yellow-1" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-cormorantGaramond font-semibold text-white leading-[1.08] mb-6">
                            {t("hero.title")}
                        </h1>

                        <p className="font-lora text-lg md:text-xl text-primary-yellow-1 leading-relaxed mb-6">
                            {t("hero.lead")}
                        </p>

                        <p className="font-lora text-white/75 leading-relaxed mb-4">
                            {t("hero.para1")}
                        </p>
                        <p className="font-lora text-white/75 leading-relaxed mb-10">
                            {t("hero.para2")}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={APPOINTMENT_HREF}
                                className="inline-flex items-center justify-center bg-primary-yellow-1 text-primary-purple-dark px-8 py-4 uppercase text-xs tracking-widest font-lato transition-opacity hover:opacity-85"
                            >
                                {t("hero.primaryCta")}
                            </Link>
                            <Link
                                href={INVENTORY_HREF}
                                className="inline-flex items-center justify-center border border-primary-yellow-1 text-primary-yellow-1 px-8 py-4 uppercase text-xs tracking-widest font-lato transition-colors hover:bg-primary-yellow-1 hover:text-primary-purple-dark"
                            >
                                {t("hero.secondaryCta")}
                            </Link>
                        </div>

                        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/15 pt-8">
                            {heroMeta.map((item) => (
                                <div key={item.label}>
                                    <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-2">
                                        {item.label}
                                    </dt>
                                    <dd className="font-cormorantGaramond text-xl text-primary-yellow-1 leading-snug">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.hero}
                            alt={t("hero.imageAlt")}
                            width={1100}
                            height={1100}
                            priority
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Sections 2–4 */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("jewellery.title")}
                    subtitle={t("jewellery.eyebrow")}
                    paragraphs={[
                        t("jewellery.para1"),
                        t("jewellery.para2"),
                        t("jewellery.para3"),
                    ]}
                    image={{
                        src: IMAGES.jewellery,
                        alt: t("jewellery.imageAlt"),
                    }}
                    reverse={true}
                    floatImages={false}
                    actions={
                        <PrimaryCta href={JEWELS_HOME} external>
                            {t("jewellery.cta")}
                        </PrimaryCta>
                    }
                />

                <ArticleLayout
                    title={t("diamonds.title")}
                    subtitle={t("diamonds.eyebrow")}
                    paragraphs={[
                        t("diamonds.para1"),
                        t("diamonds.para2"),
                        t("diamonds.para3"),
                    ]}
                    image={{
                        src: IMAGES.diamonds,
                        alt: t("diamonds.imageAlt"),
                    }}
                    reverse={false}
                    floatImages={false}
                />
                {/* para4 + shapes + cta full width */}
                <p className="w-full font-lora text-lg text-slate-600 leading-relaxed mt-8 mb-6">{t("diamonds.para4")}</p>
                <ul className="flex flex-wrap gap-2 mb-8">
                    {shapes.map((shape) => (
                        <li key={shape} className="border border-[#bb923a]/40 px-4 py-2 font-lato text-[0.7rem] uppercase tracking-[0.15em] text-[#bb923a]">
                            {shape}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mb-20">
                    <PrimaryCta href={DIAMONDS_HREF}>{t("diamonds.cta")}</PrimaryCta>
                </div>

                <ArticleLayout
                    title={t("antwerp.title")}
                    subtitle={t("antwerp.eyebrow")}
                    paragraphs={[
                        t("antwerp.para1"),
                        t("antwerp.para2"),
                        t("antwerp.para3"),
                        t("antwerp.para4"),
                    ]}
                    image={{
                        src: IMAGES.antwerp,
                        alt: t("antwerp.imageAlt"),
                    }}
                    reverse={true}
                    floatImages={false}
                    actions={
                        <PrimaryCta href={APPOINTMENT_HREF}>
                            {t("antwerp.cta")}
                        </PrimaryCta>
                    }
                />
            </section>

            {/* Section 5 — why visit the stand */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-12 md:flex-row md:items-center">
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.brief}
                            alt={t("brief.imageAlt")}
                            width={1100}
                            height={1100}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("brief.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("brief.title")}
                        </h2>
                        <p className="font-lora text-lg text-slate-600 leading-relaxed mb-5">
                            {t("brief.para1")}
                        </p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-5">
                            {t("brief.para2")}
                        </p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-10">
                            {t("brief.para3")}
                        </p>
                        <PrimaryCta href={APPOINTMENT_HREF}>
                            {t("brief.cta")}
                        </PrimaryCta>
                    </div>
                </div>
            </section>

            {/* Section 6 — plan your visit */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                        {t("visit.eyebrow")}
                    </h4>
                    <span className="w-12 h-px bg-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-8 leading-[1.1] max-w-3xl">
                    {t("visit.title")}
                </h2>

                <div className="flex flex-col gap-12 lg:flex-row">
                    <div className="w-full lg:w-3/5">
                        <p className="font-lora text-lg text-slate-600 leading-relaxed mb-5">
                            {t("visit.para1")}
                        </p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-5">
                            {t("visit.para2")}
                        </p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-5">
                            {t("visit.para3")}
                        </p>
                        <p className="font-lora text-slate-600 leading-relaxed mb-10">
                            {t("visit.para4")}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <PrimaryCta href={SHOW_WEBSITE} external>
                                {t("visit.primaryCta")}
                            </PrimaryCta>
                            <SecondaryCta href={APPOINTMENT_HREF}>
                                {t("visit.secondaryCta")}
                            </SecondaryCta>
                        </div>
                    </div>

                    {/* The show facts, kept as a scannable card so a buyer can
                        lift the details without reading the prose. */}
                    <div className="w-full lg:w-2/5">
                        <dl className="border border-[#bb923a]/30 bg-[#faf7f2] divide-y divide-[#bb923a]/20">
                            {visitFacts.map((fact) => (
                                <div
                                    key={fact.label}
                                    className="flex flex-col gap-1 px-7 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                                >
                                    <dt className="font-lato text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 shrink-0">
                                        {fact.label}
                                    </dt>
                                    <dd className="font-cormorantGaramond text-xl text-[#1f2732] leading-snug sm:text-right">
                                        {fact.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Section 7 — FAQ */}
            <section className="max-w-7xl mx-auto px-4 pb-20">
                <FAQSection faqs={faqItems} title={t("faq.title")} />
            </section>

            {/* Section 8 — final call to action */}
            <section className="w-full bg-primary-purple-dark px-4 py-20 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6 leading-tight">
                        {t("finalCta.title")}
                    </h2>
                    <p className="text-white font-lora text-lg mb-4">
                        {t("finalCta.para1")}
                    </p>
                    <p className="text-white/75 font-lora mb-10">
                        {t("finalCta.para2")}
                    </p>

                    <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12 font-lato text-xs uppercase tracking-[0.2em] text-white/60">
                        {finalFacts.map((fact) => (
                            <li key={fact}>{fact}</li>
                        ))}
                    </ul>

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
                </div>
            </section>

            {/* Section 9 — supporting show articles */}
            <section className="w-full bg-[#faf7f2] px-4 py-20">
                <div className="max-w-7xl mx-auto">
                    <p className="font-lato text-xs uppercase tracking-[0.3em] text-[#bb923a] mb-4">
                        {t("eventBlogs.eyebrow")}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-primary-purple-dark mb-4 leading-tight">
                        {t("eventBlogs.title")}
                    </h2>
                    <p className="font-lora text-lg text-slate-600 max-w-3xl mb-12">
                        {t("eventBlogs.subtitle")}
                    </p>

                    <EventBlogsCarousel
                        posts={eventBlogs}
                        readMoreLabel={tBlogs("readMore")}
                    />
                </div>
            </section>
        </div>
    );
};

export default JewelleryShowLondonPage;
