import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
// Replace with your actual image paths
import EngagementRingBlog1 from "@/assets/home/blog_11.jpg";
import BuyDiamondsOnlineBlog1 from "@/assets/home/blog_3.jpg";
import EngagementRingBlog2 from "@/assets/blogs/1.jpeg";
import newimage from "@/assets/blogs/labgrown.jpeg";
import labd from "@/assets/blogs/lab2.jpeg";
import diamondcoal from "@/assets/blogs/diamondnotfromcoal.jpeg";
import BuyDiamondsOnlineBlog2 from "@/assets/home/blog_4.jpg";
import RingSizeBlog from "@/assets/blogs/banner.png";
import NivodaBlogImage from "@/assets/home/blog2.jpg";
import SubFooter from "@/components/shared/SubFooter";
import tamperprofseal from "@/assets/services/security-seals/tamper-proff-seals1.jpeg";
interface Props {
    params: Promise<{ locale: string }> | { locale: string };
}
const blogs = [
    {
        id: 1,
        image: labd,
        slug: "lab-grown-diamonds-in-belgium",
    },
    {
        id: 2,
        image: diamondcoal,
        slug: "diamonds-are-not-made-from-coal",
    },
    {
        id: 3,
        image: newimage,
        slug: "lab-grown-diamond-engagement-rings",
    },
    {
        id: 4,
        image: RingSizeBlog,
        slug: "how-to-measure-ring-size-at-home",
    },
    {
        id: 7,
        image: EngagementRingBlog2,
        slug: "3-carat-diamond-ring-guide",
    },
    {
        id: 8,
        image: EngagementRingBlog1,
        slug: "radiant-cut-diamond-guide",
    },
    {
        id: 9,
        image: BuyDiamondsOnlineBlog2,
        slug: "oval-diamond-obsession",
    },
    {
        id: 10,
        image: NivodaBlogImage,
        slug: "looks-expensive-diamond-edit",
    },
    {
        id: 11,
        image: BuyDiamondsOnlineBlog1,
        slug: "jewellery-that-speaks-love-valentines-day",
    },
    {
        id: 12,
        image: tamperprofseal,
        slug: "little-sparks-forever-love-valentines-day",
    },
    {
        id: 13,
        image: EngagementRingBlog2,
        slug: "circle-of-love-valentines-day-diamonds",
    },
    {
        id: 14,
        image: EngagementRingBlog1,
        slug: "how-to-tell-if-a-diamond-is-real-at-home",
    },
    {
        id: 15,
        image: EngagementRingBlog2,
        slug: "how-to-know-if-diamond-ring-is-real",
    },
    {
        id: 16,
        image: newimage,
        slug: "do-lab-grown-diamonds-pass-diamond-tester",
    },
    {
        id: 17,
        image: BuyDiamondsOnlineBlog2,
        slug: "what-does-a-real-diamond-look-like",
    },
    {
        id: 18,
        image: EngagementRingBlog1,
        slug: "what-are-the-4-types-of-diamonds",
    },
    {
        id: 19,
        image: newimage,
        slug: "gia-certified-lab-grown-diamonds-guide",
    },
    {
        id: 20,
        image: labd,
        slug: "what-is-a-lab-grown-diamond-guide",
    },
    {
        id: 21,
        image: BuyDiamondsOnlineBlog2,
        slug: "are-lab-grown-diamonds-real",
    },
    {
        id: 22,
        image: NivodaBlogImage,
        slug: "how-are-lab-grown-diamonds-made-cvd-vs-hpht",
    },
    {
        id: 23,
        image: RingSizeBlog,
        slug: "cvd-vs-hpht-diamonds-which-is-better",
    },
    {
        id: 24,
        image: newimage,
        slug: "why-are-lab-grown-diamonds-so-expensive",
    },
    {
        id: 25,
        image: labd,
        slug: "disadvantages-of-lab-grown-diamonds",
    },
    {
        id: 26,
        image: BuyDiamondsOnlineBlog2,
        slug: "are-lab-grown-diamonds-ethical",
    },
    {
        id: 27,
        image: EngagementRingBlog1,
        slug: "lab-grown-vs-natural-diamond-price-2026",
    },
    {
        id: 28,
        image: EngagementRingBlog2,
        slug: "3-carat-lab-grown-diamond-price-2026",
    },
    {
        id: 29,
        image: RingSizeBlog,
        slug: "4-carat-lab-grown-diamond-price-2026",
    },
    {
        id: 30,
        image: diamondcoal,
        slug: "3-carat-natural-diamond-price-2026",
    },
    {
        id: 31,
        image: NivodaBlogImage,
        slug: "do-lab-grown-diamonds-hold-value",
    },
    {
        id: 32,
        image: BuyDiamondsOnlineBlog1,
        slug: "lab-grown-diamond-resale-value-2026",
    },
    {
        id: 33,
        image: tamperprofseal,
        slug: "lab-grown-vs-natural-diamond-resale-value",
    },
    {
        id: 34,
        image: newimage,
        slug: "why-are-lab-grown-diamonds-cheaper-than-natural",
    },
    {
        id: 35,
        image: EngagementRingBlog2,
        slug: "natural-diamond-rings-buying-guide-2026",
    },
    {
        id: 36,
        image: tamperprofseal,
        slug: "natural-diamond-tennis-bracelet-buying-guide",
    },
    {
        id: 37,
        image: BuyDiamondsOnlineBlog1,
        slug: "natural-diamond-necklace-buying-guide",
    },
    {
        id: 38,
        image: EngagementRingBlog1,
        slug: "natural-diamond-stud-earrings-buying-guide",
    },
    {
        id: 39,
        image: labd,
        slug: "lab-grown-diamond-rings-buying-guide-2026",
    },
    {
        id: 40,
        image: BuyDiamondsOnlineBlog2,
        slug: "lab-grown-diamond-earrings-buying-guide",
    },
    {
        id: 41,
        image: NivodaBlogImage,
        slug: "lab-grown-diamond-necklace-buying-guide",
    },
    {
        id: 42,
        image: RingSizeBlog,
        slug: "lab-grown-diamond-tennis-bracelet-buying-guide",
    },
    {
        id: 43,
        image: diamondcoal,
        slug: "custom-diamond-jewelry-design-guide-2026",
    },
    {
        id: 44,
        image: EngagementRingBlog1,
        slug: "best-diamond-shapes-for-engagement-rings",
    },
    {
        id: 45,
        image: EngagementRingBlog2,
        slug: "diamond-cut-vs-clarity-which-matters",
    },
    {
        id: 46,
        image: newimage,
        slug: "diamond-color-vs-clarity-which-matters",
    },
    {
        id: 47,
        image: labd,
        slug: "diamond-cut-vs-color-which-matters",
    },
    {
        id: 48,
        image: BuyDiamondsOnlineBlog2,
        slug: "vs-vs-vvs-diamonds-difference",
    },
    {
        id: 49,
        image: RingSizeBlog,
        slug: "si-vs-vs-diamonds-which-better",
    },
    {
        id: 50,
        image: NivodaBlogImage,
        slug: "diamond-fluorescence-explained-good-or-bad",
    },
    {
        id: 51,
        image: BuyDiamondsOnlineBlog1,
        slug: "what-is-diamond-certification-gia-vs-igi",
    },
    {
        id: 52,
        image: tamperprofseal,
        slug: "how-to-buy-diamond-online-safely",
    },
    {
        id: 53,
        image: diamondcoal,
        slug: "how-to-choose-engagement-ring-guide",
    },
    {
        id: 54,
        image: newimage,
        slug: "natural-vs-lab-grown-diamonds-guide",
    },
    {
        id: 55,
        image: RingSizeBlog,
        slug: "best-diamond-size-for-engagement-ring",
    },
    {
        id: 56,
        image: EngagementRingBlog1,
        slug: "best-diamond-settings-for-engagement-rings",
    },
    {
        id: 57,
        image: BuyDiamondsOnlineBlog1,
        slug: "how-to-clean-diamond-jewelry-at-home",
    },
    {
        id: 58,
        image: BuyDiamondsOnlineBlog2,
        slug: "how-to-store-diamond-jewelry-safely",
    },
    {
        id: 59,
        image: tamperprofseal,
        slug: "how-to-insure-diamond-jewelry",
    },
    {
        id: 60,
        image: diamondcoal,
        slug: "diamond-resale-value-guide",
    },
    {
        id: 61,
        image: NivodaBlogImage,
        slug: "diamond-certification-vs-appraisal",
    },
    {
        id: 62,
        image: EngagementRingBlog2,
        slug: "how-to-spot-fake-diamond",
    },
    {
        id: 63,
        image: labd,
        slug: "diamond-buying-checklist-2026",
    },
    {
        id: 64,
        image: "/uniglo-canes/uniglo-canes-1.jpeg",
        slug: "uniglo-at-cannes-festival-2026",
    },
    {
        id: 65,
        image: "/uniglo-canes/uniglo-canes-4.jpeg",
        slug: "uniglo-jewels-cannes-2026-pink-diamonds",
    },
    {
        id: 66,
        image: EngagementRingBlog1,
        slug: "summer-2026-bridal-guide-engagement-rings-wedding-bands-couples",
    },
    {
        id: 67,
        image: BuyDiamondsOnlineBlog2,
        slug: "what-to-wear-summer-wedding-2026-fine-jewellery-guest-guide",
    },
    {
        id: 68,
        image: newimage,
        slug: "lab-grown-diamond-wedding-band-trends-2026",
    },
    {
        id: 69,
        image: labd,
        slug: "how-to-match-lab-grown-diamond-wedding-band-engagement-ring-2026",
    },
    {
        id: 70,
        image: labd,
        slug: "lab-grown-diamonds-belgium-buyers-guide",
    }
];
const BlogPage = async ({ params }: Props) => {
    const resolvedParams = await Promise.resolve(params);
    const locale = resolvedParams.locale;
    const t = await getTranslations({ locale, namespace: "BlogsPage" });
    return (
        <div className="min-h-screen  mb-20">
            {/* All Blogs Section */}
            <section className="w-full  py-20 px-4 ">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-primary-purple-dark mb-16">
                        {t("title")}
                    </h2>
                    {/* Blogs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[...blogs].reverse().map((blog) => {
                            return (
                                <div
                                    key={blog.id}
                                    className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                                >
                                    {/* Blog Image */}
                                    <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-sm mb-6 ">
                                        <Image
                                            src={blog.image}
                                            alt={t(`posts.${blog.id}.title`)}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                            unoptimized={typeof blog.image === "string"}
                                        />
                                    </div>
                                    {/* Blog Content */}
                                    <div className="flex flex-col flex-1 group-hover:pl-5 group-hover:pb-5 transition-all duration-300">
                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-cormorantGaramond font-semibold text-[#bb923a] mb-3 leading-tight hover:text-primary-purple2 transition-colors cursor-pointer">
                                            <a href={`/${locale}/blogs/${blog.slug}`}>
                                                {t(`posts.${blog.id}.title`)}
                                            </a>
                                        </h3>
                                        {/* Meta Info */}
                                        <p className="text-primary-purple-dark font-lora text-sm mb-4">
                                            {t(`posts.${blog.id}.author`)} {t(`posts.${blog.id}.date`)}
                                        </p>
                                        {/* Excerpt */}
                                        <p className="text-primary-purple-dark font-lora text-base leading-relaxed mb-6 grow line-clamp-3">
                                            {t(`posts.${blog.id}.excerpt`)}
                                        </p>
                                        {/* Read More Button */}
                                        <a
                                            href={`/${locale}/blogs/${blog.slug}`}
                                            className="inline-block bg-[#bb923a] text-white px-6 py-2 text-sm font-bold font-lora uppercase tracking-wider hover:bg-[#9a7a2f] transition-colors w-fit rounded-sm"
                                        >
                                            {t("readMore")}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <SubFooter />
        </div>
    );
};
export default BlogPage;
