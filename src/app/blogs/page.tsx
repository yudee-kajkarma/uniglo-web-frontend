import React from "react";
import Image from "next/image";

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

const blogs = [
    {
        id: 1,
        title: "Lab Grown Diamonds in Belgium",
        author: "Uniglo Diamonds",
        date: "March 6, 2026",
        image: labd,
        excerpt:
            "Discover certified lab grown diamonds in Belgium. Antwerp-based experts offering IGI & GIA graded diamonds at trusted wholesale prices.",
        slug: "lab-grown-diamonds-in-belgium",
    },
    {
        id: 2,
        title: "Diamonds Are Not Made from Coal",
        author: "Uniglo Diamonds",
        date: "March 6, 2026",
        image: diamondcoal,
        excerpt:
            "Many people believe that diamonds are made from coal. But the truth is different. Discover the real geological processes behind diamond formation.",
        slug: "diamonds-are-not-made-from-coal",
    },
    {
        id: 3,
        title: "Lab Grown Diamond Engagement Rings: The Ultimate Guide",
        author: "Uniglo Diamonds",
        date: "March 13, 2026",
        image: newimage,
        excerpt:
            "A complete guide to lab grown diamond engagement rings, including 4Cs, styles, pricing, certification, and care tips.",
        slug: "lab-grown-diamond-engagement-rings",
    },
    {
        id: 4,
        title: "How to Measure Ring Size at Home: 5 Proven Methods",
        author: "Uniglo Diamonds",
        date: "March 18, 2026",
        image: RingSizeBlog,
        excerpt:
            "Learn 5 proven methods to measure your ring size at home. Includes a free US/UK/EU ring size chart and expert tips from Uniglo Diamond gemologists.",
        slug: "how-to-measure-ring-size-at-home",
    },
    {
        id: 7,
        title: "3 Carat Diamond Ring Guide: Price, Size, Quality & Buying Tips (2026)",
        author: "Uniglo Diamonds",
        date: "March 23, 2026",
        image: EngagementRingBlog2,
        excerpt:
            "Discover 3 carat diamond ring price, size, quality & buying tips. Compare lab-grown vs natural diamonds and choose the perfect ring easily.",
        slug: "3-carat-diamond-ring-guide",
    },
];

const page = () => {
    return (
        <div className="min-h-screen  mb-20">
            {/* All Blogs Section */}
            <section className="w-full  py-20 px-4 ">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-primary-purple-dark mb-16">
                        All Blogs
                    </h2>

                    {/* Blogs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* Blog Image */}
                                <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-sm mb-6 ">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Blog Content */}
                                <div className="flex flex-col flex-1 group-hover:pl-5 group-hover:pb-5 transition-all duration-300">
                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-cormorantGaramond font-semibold text-[#bb923a] mb-3 leading-tight hover:text-primary-purple2 transition-colors cursor-pointer">
                                        <a href={`/blogs/${blog.slug}`}>
                                            {blog.title}
                                        </a>
                                    </h3>

                                    {/* Meta Info */}
                                    <p className="text-primary-purple-dark font-lora text-sm mb-4">
                                        {blog.author} {blog.date}
                                    </p>

                                    {/* Excerpt */}
                                    <p className="text-primary-purple-dark font-lora text-base leading-relaxed mb-6 grow line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    {/* Read More Button */}
                                    <a
                                        href={`/blogs/${blog.slug}`}
                                        className="inline-block bg-[#bb923a] text-white px-6 py-2 text-sm font-bold font-lora uppercase tracking-wider hover:bg-[#9a7a2f] transition-colors w-fit rounded-sm"
                                    >
                                        Read More
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <SubFooter />
        </div>
    );
};

export default page;
