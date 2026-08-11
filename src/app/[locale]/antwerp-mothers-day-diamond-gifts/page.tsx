import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import BannerSection from "@/components/shared/BannerSection";
import ArticleLayout from "@/components/shared/ArticleLayout";
import FAQSection from "@/components/shared/FAQSection";
import JewelleryTypeCarousel from "@/components/shared/JewelleryTypeCarousel";
import { Link } from "@/i18n/navigation";
import { buildLocaleAlternates } from "@/lib/seo/localeAlternates";
import { SITE_URL, localizedUrl } from "@/lib/seo/site";
import { getGiftEditProducts } from "@/lib/jewels/catalog";

const NAMESPACE = "antwerpMothersDayPage";
const PATH = "antwerp-mothers-day-diamond-gifts";

// Antwerp celebrates Mother's Day on 15 August rather than in May, so this
// campaign runs on its own date and does not follow the Belgian May page.
const HREFLANG_REGION: Record<string, string> = {
    en: "en-BE",
    fr: "fr-BE",
    nl: "nl-BE",
    de: "de-BE",
    it: "it-BE",
    es: "es-BE",
};

// TODO: replace with the confirmed live Uniglo Jewels URLs. Every outbound
// jewellery CTA on this page resolves from here, so this is the only place to
// change once the domain and category paths are approved.
const JEWELS = {
    home: "https://www.uniglojewels.com",
    necklaces: "https://www.uniglojewels.com",
    earrings: "https://www.uniglojewels.com",
    bracelets: "https://www.uniglojewels.com",
    rings: "https://www.uniglojewels.com",
};

const CATEGORY_LINKS = [
    JEWELS.necklaces,
    JEWELS.earrings,
    JEWELS.bracelets,
    JEWELS.rings,
];

const SHORTLIST_HREF = "/contact-us";
const LOOSE_DIAMONDS_HREF = "/diamonds/natural";

const IMAGES = {
    banner: "/mothers-day/banner-1.webp",
    hero: "/mothers-day/1.png",
    tradition: "/mothers-day/2.png",
    shopByType: "/mothers-day/3.png",
    personalisation: "/mothers-day/4.png",
    shortlist: "/mothers-day/5.png",
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

const AntwerpMothersDayPage = async ({ params }: Props) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: NAMESPACE });
    const giftEditProducts = await getGiftEditProducts();

    // Prices come back as whole euros; keep them that way so a "from" figure
    // does not read like an exact quote.
    const formatPrice = (amount: number, currency: string) =>
        new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency.toUpperCase(),
            maximumFractionDigits: 0,
        }).format(amount);

    const categories = t.raw("shopByType.categories") as {
        title: string;
        description: string;
        linkLabel: string;
    }[];
    const shareItems = t.raw("shortlist.shareItems") as string[];
    const purchaseItems = t.raw("purchaseInfo.items") as {
        title: string;
        body: string;
    }[];
    const faqItems = t.raw("faq.items") as {
        question: string;
        answer: string;
    }[];

    const pageUrl = localizedUrl(locale, PATH);

    // Mirrors the approved JSON-LD from the campaign brief: Organization,
    // BreadcrumbList and a combined CollectionPage/FAQPage. Product and Offer
    // markup is deliberately omitted until the featured products, prices and
    // availability are approved for public structured data.
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
                "@type": ["CollectionPage", "FAQPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: t("metadata.title"),
                description: t("metadata.description"),
                inLanguage: HREFLANG_REGION[locale] ?? "en-BE",
                publisher: { "@id": `${SITE_URL}/#organization` },
                breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
                about: [
                    { "@type": "Thing", name: t("tradition.eyebrow") },
                    { "@type": "Thing", name: t("shopByType.eyebrow") },
                ],
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
            <div className="w-full bg-primary-purple-dark px-4 py-3 text-center">
                <p className="font-lato text-xs md:text-sm tracking-wide text-primary-yellow-1">
                    {t("announcement")}
                </p>
            </div>

            <BannerSection
                image={IMAGES.banner}
                text={t("hero.title")}
                imageClassName="h-90 object-cover"
                textClassName="left-6 md:left-16 right-auto top-1/2 -translate-y-1/2 max-w-xl normal-case text-3xl md:text-5xl leading-tight"
            />

            {/* Sections 1–3 */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("hero.lead")}
                    subtitle={t("hero.eyebrow")}
                    paragraphs={[t("hero.para")]}
                    image={{ src: IMAGES.hero, alt: t("hero.imageAlt") }}
                    reverse={false}
                    floatImages={false}
                    actions={
                        <div>
                            <div className="flex flex-wrap gap-4">
                                <PrimaryCta href={JEWELS.home} external>
                                    {t("hero.primaryCta")}
                                </PrimaryCta>
                                <SecondaryCta href={SHORTLIST_HREF}>
                                    {t("hero.secondaryCta")}
                                </SecondaryCta>
                            </div>
                            <p className="mt-6 font-lora text-sm text-slate-500">
                                {t("hero.assurances")}
                            </p>
                        </div>
                    }
                />

                <ArticleLayout
                    title={t("tradition.title")}
                    subtitle={t("tradition.eyebrow")}
                    paragraphs={[
                        t("tradition.para1"),
                        t("tradition.para2"),
                        t("tradition.para3"),
                    ]}
                    image={{
                        src: IMAGES.tradition,
                        alt: t("tradition.imageAlt"),
                    }}
                    reverse={true}
                    floatImages={false}
                />

                {/* Section 3 — image pinned left; on the right the heading and
                    the closing prompt stay put while only the four jewellery
                    types rotate through the carousel between them. */}
                <div className="flex flex-col gap-10 md:flex-row md:items-center">
                    <div className="w-full md:w-1/2">
                        <Image
                            src={IMAGES.shopByType}
                            alt={t("shopByType.imageAlt")}
                            width={400}
                            height={400}
                            className="w-full h-auto object-cover shadow-sm"
                        />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                                {t("shopByType.eyebrow")}
                            </h4>
                            <span className="w-12 h-px bg-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1]">
                            {t("shopByType.title")}
                        </h2>
                        <p className="font-lora text-lg text-slate-600 leading-relaxed mb-10">
                            {t("shopByType.intro")}
                        </p>

                        <JewelleryTypeCarousel
                            categories={categories.map((category, i) => ({
                                ...category,
                                href: CATEGORY_LINKS[i],
                            }))}
                        />

                        <p className="mt-10 pt-6 border-t border-slate-200 font-lora text-lg text-slate-600">
                            {t("shopByType.footnote")}{" "}
                            <Link
                                href={SHORTLIST_HREF}
                                className="text-[#bb923a] underline underline-offset-4 hover:opacity-70 transition-opacity"
                            >
                                {t("shopByType.footnoteCta")}
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4 — featured gift edit, live from the Uniglo Jewels
                catalog. Falls back to the "contact our team" panel if the
                catalog is unreachable, so the section never renders empty. */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                            {t("giftEdit.eyebrow")}
                        </h4>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-6 leading-[1.1] max-w-3xl">
                        {t("giftEdit.title")}
                    </h2>
                    <p className="font-lora text-lg text-slate-600 max-w-3xl">
                        {t("giftEdit.intro")}
                    </p>

                    {giftEditProducts.length > 0 ? (
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {giftEditProducts.map((product) => (
                                <a
                                    key={product.id}
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white flex flex-col transition-shadow duration-300 hover:shadow-lg"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-[#f4efe7]">
                                        {product.image && (
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                            />
                                        )}
                                    </div>

                                    <div className="flex flex-col grow p-6">
                                        <h3 className="font-cormorantGaramond text-2xl text-[#1f2732] leading-snug mb-3">
                                            {product.title}
                                        </h3>

                                        <p className="font-lora text-sm text-slate-500 mb-6">
                                            {[
                                                product.metal,
                                                product.stoneOrigin
                                                    ? t(
                                                          `giftEdit.${
                                                              product.stoneOrigin ===
                                                              "labGrown"
                                                                  ? "labGrownDiamond"
                                                                  : "naturalDiamond"
                                                          }`,
                                                      )
                                                    : null,
                                                product.detail,
                                            ]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </p>

                                        <div className="mt-auto flex items-end justify-between gap-4">
                                            {product.price !== null && (
                                                <p className="font-lora text-lg text-[#1f2732]">
                                                    <span className="text-xs uppercase tracking-[0.15em] text-slate-500 mr-1.5">
                                                        {t(
                                                            "giftEdit.fromPrice",
                                                        )}
                                                    </span>
                                                    {formatPrice(
                                                        product.price,
                                                        product.currency,
                                                    )}
                                                </p>
                                            )}
                                            <span className="font-lato text-xs uppercase tracking-[0.2em] text-[#bb923a] border-b border-[#bb923a] pb-1 shrink-0">
                                                {t("giftEdit.viewProduct")}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10 border border-dashed border-[#bb923a]/50 bg-white px-8 py-12 text-center">
                            <p className="font-lora text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                                {t("giftEdit.placeholder")}
                            </p>
                            <PrimaryCta href={SHORTLIST_HREF}>
                                {t("shortlist.primaryCta")}
                            </PrimaryCta>
                        </div>
                    )}
                </div>
            </section>

            {/* Sections 5–6 */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <ArticleLayout
                    title={t("personalisation.title")}
                    subtitle={t("personalisation.eyebrow")}
                    paragraphs={[
                        t("personalisation.para1"),
                        t("personalisation.para2"),
                    ]}
                    image={{
                        src: IMAGES.personalisation,
                        alt: t("personalisation.imageAlt"),
                    }}
                    reverse={true}
                    floatImages={false}
                    actions={
                        <div className="flex flex-wrap gap-4">
                            <PrimaryCta href={JEWELS.home} external>
                                {t("personalisation.primaryCta")}
                            </PrimaryCta>
                            <SecondaryCta href={SHORTLIST_HREF}>
                                {t("personalisation.secondaryCta")}
                            </SecondaryCta>
                        </div>
                    }
                />

                <ArticleLayout
                    title={t("shortlist.title")}
                    subtitle={t("shortlist.eyebrow")}
                    paragraphs={[t("shortlist.intro"), t("shortlist.shareLabel")]}
                    bulletPoints={shareItems}
                    image={{
                        src: IMAGES.shortlist,
                        alt: t("shortlist.imageAlt"),
                    }}
                    reverse={false}
                    floatImages={false}
                    actions={
                        <div>
                            <PrimaryCta href={SHORTLIST_HREF}>
                                {t("shortlist.primaryCta")}
                            </PrimaryCta>
                            <p className="mt-8 font-lora text-slate-600 leading-relaxed">
                                {t("shortlist.appointment")}
                            </p>
                        </div>
                    }
                />

                <div className="border-t border-slate-200 pt-10">
                    <h3 className="font-cormorantGaramond text-3xl md:text-4xl text-[#1f2732] mb-4">
                        {t("shortlist.bespokeTitle")}
                    </h3>
                    <p className="font-lora text-lg text-slate-600 leading-relaxed max-w-4xl">
                        {t("shortlist.bespokePara")}
                    </p>
                    <div className="mt-6">
                        <Link
                            href={LOOSE_DIAMONDS_HREF}
                            className="font-lato text-xs uppercase tracking-[0.2em] text-[#bb923a] border-b border-[#bb923a] pb-1 hover:opacity-70 transition-opacity"
                        >
                            {t("shortlist.bespokeCta")}
                        </Link>
                    </div>
                    <p className="mt-8 font-lora text-sm text-slate-500 max-w-4xl">
                        {t("shortlist.bespokeNote")}
                    </p>
                </div>
            </section>

            {/* Section 7 — price, timing and purchase information */}
            <section className="w-full bg-[#faf7f2] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-primary font-bold font-lora uppercase tracking-[0.2em] text-xs md:text-sm">
                            {t("purchaseInfo.eyebrow")}
                        </h4>
                        <span className="w-12 h-px bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond text-[#1f2732] mb-12 leading-[1.1] max-w-3xl">
                        {t("purchaseInfo.title")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {purchaseItems.map((item) => (
                            <div key={item.title}>
                                <h3 className="font-cormorantGaramond text-2xl text-[#1f2732] mb-3">
                                    {item.title}
                                </h3>
                                <p className="font-lora text-slate-600 leading-relaxed">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 8 — FAQ */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <FAQSection faqs={faqItems} title={t("faq.title")} />
            </section>

            {/* Section 9 — final call to action */}
            <section className="w-full bg-primary-purple-dark px-4 py-20 mb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-primary-yellow-1 text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-6 leading-tight">
                        {t("finalCta.title")}
                    </h2>
                    <p className="text-white font-lora text-lg mb-10">
                        {t("finalCta.para")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href={JEWELS.home}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-primary-yellow-1 text-primary-purple-dark px-8 py-4 uppercase text-xs tracking-widest font-lato transition-opacity hover:opacity-85"
                        >
                            {t("finalCta.primaryCta")}
                        </a>
                        <Link
                            href={SHORTLIST_HREF}
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

export default AntwerpMothersDayPage;
