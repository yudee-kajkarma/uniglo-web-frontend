import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";
import { buildLocaleAlternates } from "@/lib/seo/localeAlternates";
import { getBlogEntry } from "@/lib/blogs/registry";

// On-demand (dynamic) rendering: nothing is prebuilt. Each blog is rendered on
// its first request from a single shared route, instead of one prebuilt folder
// per blog. This keeps ~500 blog pages out of the build.
//
// Why dynamic rather than static ISR: this app uses next-intl with
// `localePrefix: "as-needed"`, so the default-locale URLs (/blogs/...) carry no
// locale in the path and next-intl reads it from request `headers()` at render
// time. That request dependency makes static/ISR generation throw
// DYNAMIC_SERVER_USAGE, so the route must render dynamically.
//
// Content comes from the next-intl translation files today (via the registry's
// namespace). When a blog API exists, only the data source in this file
// changes — the route config and rendering stay the same.
export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

type FaqItem = { question: string; answer: string };

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const entry = getBlogEntry(slug);

    if (!entry) {
        return {
            title: "Blog Not Found | Uniglo Diamonds",
            robots: { index: false, follow: true },
        };
    }

    const t = await getTranslations({ locale, namespace: entry.namespace });

    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: buildLocaleAlternates(`blogs/${slug}`, locale),
    };
}

export default async function BlogPage({ params }: PageProps) {
    const { locale, slug } = await params;
    const entry = getBlogEntry(slug);
    if (!entry) notFound();

    const t = await getTranslations({ locale, namespace: entry.namespace });

    // Retrieve translated content arrays. Not every blog defines `faqs` (or, in
    // theory, `sections`), so guard with Array.isArray — a missing key resolves
    // to a fallback string, and calling .map on it would crash the render.
    const rawSections = t.raw("sections");
    const articleData: ArticleSection[] = Array.isArray(rawSections)
        ? rawSections
        : [];
    const rawFaqs = t.raw("faqs");
    const faqData: FaqItem[] = Array.isArray(rawFaqs) ? rawFaqs : [];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="min-h-screen mb-20">
            {faqData.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        {t("title")}
                    </h1>
                    <DynamicArticle sections={articleData} />
                    {faqData && faqData.length > 0 && (
                        <FAQSection
                            faqs={faqData}
                            title={t("faqTitle")}
                            className="mt-12"
                        />
                    )}
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
}
