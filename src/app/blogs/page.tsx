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
    {
        id: 8,
        title: "Radiant Cut Diamond: The Ultimate Guide to the Most Brilliant Diamond Shape",
        author: "Uniglo Diamonds",
        date: "April 3, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Discover radiant cut diamonds—brilliant sparkle, elegant shape, and buying tips. Learn why this hybrid cut is perfect for modern engagement rings.",
        slug: "radiant-cut-diamond-guide",
    },
    {
        id: 9,
        title: "Oval Diamond Obsession: Why Everyone's Choosing It",
        author: "Uniglo Diamonds",
        date: "April 10, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Discover why oval diamonds are everyone's favorite. Learn about their elegance, flattering shape, and timeless appeal at Uniglo Jewels.",
        slug: "oval-diamond-obsession",
    },
    {
        id: 10,
        title: 'The "Looks Expensive" Diamond Edit: 7 Jewelry Pieces That Instantly Upgrade Any Outfit',
        author: "Uniglo Diamonds",
        date: "April 10, 2026",
        image: NivodaBlogImage,
        excerpt:
            "Discover 7 diamond jewelry pieces that instantly upgrade any outfit. From studs to tennis bracelets, find timeless luxury at Uniglo Jewels.",
        slug: "looks-expensive-diamond-edit",
    },
    {
        id: 11,
        title: "Jewellery That Speaks Love This Valentine's Day",
        author: "Uniglo Diamonds",
        date: "April 10, 2026",
        image: BuyDiamondsOnlineBlog1,
        excerpt:
            "Discover jewellery that speaks love this Valentine's Day. Uniglo Jewels offers timeless, meaningful designs for every heart and every relationship.",
        slug: "jewellery-that-speaks-love-valentines-day",
    },
    {
        id: 12,
        title: "Little Sparks, Forever Love: A Valentine's Day Story in Diamond & Lab-Grown Diamond",
        author: "Uniglo Diamonds",
        date: "April 10, 2026",
        image: tamperprofseal,
        excerpt:
            "Discover diamond and lab-grown diamond jewelry for children this Valentine's Day. Uniglo Jewels offers meaningful gifts that grow with your little ones.",
        slug: "little-sparks-forever-love-valentines-day",
    },
    {
        id: 13,
        title: "A Circle of Love: Celebrating Valentine's Day with Diamonds for Every Heart",
        author: "Uniglo Diamonds",
        date: "April 10, 2026",
        image: EngagementRingBlog2,
        excerpt:
            "Celebrate Valentine's Day with diamonds for every heart. Discover diamond and lab-grown diamond jewelry for partners, parents, and children at Uniglo Jewels.",
        slug: "circle-of-love-valentines-day-diamonds",
    },
    {
        id: 14,
        title: "How to Tell If a Diamond Is Real at Home (2026 Guide with 10 Easy Tests)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Wondering if your diamond is real? Learn 10 simple at-home tests to check diamond authenticity in 2026, plus expert tips to verify it properly.",
        slug: "how-to-tell-if-a-diamond-is-real-at-home",
    },
    {
        id: 15,
        title: "How to Tell If a Diamond Ring Is Real (2026 Buyer's Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog2,
        excerpt:
            "Not sure if your diamond ring is real? Learn how to verify a diamond ring using hallmarks, certificates, sparkle tests, and expert tips in this 2026 guide.",
        slug: "how-to-know-if-diamond-ring-is-real",
    },
    {
        id: 16,
        title: "Do Lab-Grown Diamonds Pass a Diamond Tester? (2026 Answer Explained)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: newimage,
        excerpt:
            "Do lab-grown diamonds pass diamond testers? Yes, and here is why. Learn how diamond testers work, what they detect, and how to tell the origin in 2026.",
        slug: "do-lab-grown-diamonds-pass-diamond-tester",
    },
    {
        id: 17,
        title: "What Does a Real Diamond Look Like? (2026 Visual Guide for Buyers)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "What does a real diamond actually look like? Learn how to identify a natural diamond by sparkle, inclusions, color, and light behavior in this 2026 guide.",
        slug: "what-does-a-real-diamond-look-like",
    },
    {
        id: 18,
        title: "What Are the 4 Types of Diamonds? Type I vs Type II Explained (2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Learn the 4 types of diamonds (Type Ia, Ib, IIa, IIb) and what they mean for quality, rarity, and value in this simple 2026 buyer guide.",
        slug: "what-are-the-4-types-of-diamonds",
    },
    {
        id: 19,
        title: "GIA Certified Lab Grown Diamonds: What the Certificate Really Means (2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: newimage,
        excerpt:
            "What does a GIA certificate for lab grown diamonds actually tell you? Learn how to read, verify, and understand diamond reports in 2026.",
        slug: "gia-certified-lab-grown-diamonds-guide",
    },
    {
        id: 20,
        title: "What Is a Lab Grown Diamond? Complete Beginner Guide (2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: labd,
        excerpt:
            "What is a lab grown diamond? Learn how they are made, why they are real diamonds, and why 60%+ of engagement rings use them in 2026.",
        slug: "what-is-a-lab-grown-diamond-guide",
    },
    {
        id: 21,
        title: "Are Lab Grown Diamonds Real? The Truth Explained (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Are lab grown diamonds real or fake? Learn the truth about their composition, certification, and how they compare to natural diamonds in 2026.",
        slug: "are-lab-grown-diamonds-real",
    },
    {
        id: 22,
        title: "How Are Lab Grown Diamonds Made? CVD vs HPHT Explained (2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: NivodaBlogImage,
        excerpt:
            "Learn how lab grown diamonds are made using CVD and HPHT methods in this simple 2026 guide. Understand the process without technical jargon.",
        slug: "how-are-lab-grown-diamonds-made-cvd-vs-hpht",
    },
    {
        id: 23,
        title: "CVD vs HPHT Diamonds: Which Is Better in 2026? Full Comparison",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: RingSizeBlog,
        excerpt:
            "CVD vs HPHT lab grown diamonds: what is the difference and which is better? Learn quality, clarity, color, and buying factors in this 2026 guide.",
        slug: "cvd-vs-hpht-diamonds-which-is-better",
    },
    {
        id: 24,
        title: "Why Are Lab Grown Diamonds So Expensive? (And Why Some Are Cheap)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: newimage,
        excerpt:
            "Confused by lab grown diamond prices? Learn why some cost thousands while others are cheap, and what really affects pricing in 2026.",
        slug: "why-are-lab-grown-diamonds-so-expensive",
    },
    {
        id: 25,
        title: "Disadvantages of Lab Grown Diamonds: 7 Things Buyers Should Know (2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: labd,
        excerpt:
            "What are the disadvantages of lab grown diamonds? Learn the real downsides, resale value, perception, and what sellers do not always explain in 2026.",
        slug: "disadvantages-of-lab-grown-diamonds",
    },
    {
        id: 26,
        title: "Are Lab Grown Diamonds Ethical? The Truth About Sustainability (2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Are lab grown diamonds more ethical? Explore sustainability, environmental impact, and sourcing in this honest 2026 guide.",
        slug: "are-lab-grown-diamonds-ethical",
    },
    {
        id: 27,
        title: "Lab Grown vs Natural Diamond Price (2026): Real Comparison & Costs",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Compare lab grown vs natural diamond prices in 2026. See real cost differences, why prices vary, and what buyers should expect before purchasing.",
        slug: "lab-grown-vs-natural-diamond-price-2026",
    },
    {
        id: 28,
        title: "How Much Does a 3 Carat Lab Grown Diamond Cost in 2026? Price Guide",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog2,
        excerpt:
            "How much is a 3 carat lab grown diamond in 2026? See real price ranges by quality, settings, and what affects cost before you buy.",
        slug: "3-carat-lab-grown-diamond-price-2026",
    },
    {
        id: 29,
        title: "How Much Is a 4 Carat Lab Grown Diamond in 2026? Price Guide",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: RingSizeBlog,
        excerpt:
            "Find out how much a 4 carat lab grown diamond costs in 2026. Explore price ranges, quality factors, and what affects the final value.",
        slug: "4-carat-lab-grown-diamond-price-2026",
    },
    {
        id: 30,
        title: "How Much Does a 3 Carat Natural Diamond Cost in 2026? Price Guide",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: diamondcoal,
        excerpt:
            "See how much a 3 carat natural diamond costs in 2026. Learn price ranges, quality factors, and what affects value before you buy.",
        slug: "3-carat-natural-diamond-price-2026",
    },
    {
        id: 31,
        title: "Do Lab Grown Diamonds Hold Value? 2026 Resale Reality Explained",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: NivodaBlogImage,
        excerpt:
            "Do lab grown diamonds hold their value? Learn real resale rates, what affects value, and what to expect in 2026 before you buy.",
        slug: "do-lab-grown-diamonds-hold-value",
    },
    {
        id: 32,
        title: "Lab Grown Diamond Resale Value: What You Will Actually Get (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog1,
        excerpt:
            "Thinking of selling a lab grown diamond? Learn real resale value, what affects price, and how to get the best offer in 2026.",
        slug: "lab-grown-diamond-resale-value-2026",
    },
    {
        id: 33,
        title: "Lab Grown vs Natural Diamond Resale Value (2026 Comparison Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: tamperprofseal,
        excerpt:
            "Compare lab grown vs natural diamond resale value in 2026. See real percentages, what affects resale, and what buyers should expect.",
        slug: "lab-grown-vs-natural-diamond-resale-value",
    },
    {
        id: 34,
        title: "Why Are Lab Grown Diamonds Cheaper Than Natural? (2026 Explained)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: newimage,
        excerpt:
            "Why are lab grown diamonds so much cheaper than natural diamonds? Learn the real reasons behind the price difference in 2026.",
        slug: "why-are-lab-grown-diamonds-cheaper-than-natural",
    },
    {
        id: 35,
        title: "Natural Diamond Rings Guide 2026: Styles, Settings & Buying Tips",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog2,
        excerpt:
            "Discover how to choose a natural diamond ring in 2026. Learn about styles, settings, 4Cs, and what matters before you buy.",
        slug: "natural-diamond-rings-buying-guide-2026",
    },
    {
        id: 36,
        title: "Natural Diamond Tennis Bracelet Guide (2026): What to Look For",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: tamperprofseal,
        excerpt:
            "Buying a diamond tennis bracelet? Learn what to look for: diamond matching, settings, carat weight, and quality tips in this 2026 guide.",
        slug: "natural-diamond-tennis-bracelet-buying-guide",
    },
    {
        id: 37,
        title: "Natural Diamond Necklace Guide 2026: Styles, Sizes & Buying Tips",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog1,
        excerpt:
            "Looking for a diamond necklace? Learn how to choose the right style, size, and quality in this complete natural diamond necklace guide for 2026.",
        slug: "natural-diamond-necklace-buying-guide",
    },
    {
        id: 38,
        title: "Natural Diamond Stud Earrings Guide 2026: Size, Quality & Buying Tips",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Buying diamond stud earrings? Learn the best sizes, clarity, color, and how to choose perfect natural diamond studs in 2026.",
        slug: "natural-diamond-stud-earrings-buying-guide",
    },
    {
        id: 39,
        title: "Lab Grown Diamond Rings Guide 2026: Styles, Settings & Buying Tips",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: labd,
        excerpt:
            "Discover how to choose the perfect lab grown diamond ring in 2026. Learn styles, settings, quality factors, and what to look for before buying.",
        slug: "lab-grown-diamond-rings-buying-guide-2026",
    },
    {
        id: 40,
        title: "Lab Grown Diamond Earrings Guide 2026: Studs, Hoops & Buying Tips",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Looking for lab grown diamond earrings? Learn how to choose studs, hoops, sizes, and quality in this complete 2026 buying guide.",
        slug: "lab-grown-diamond-earrings-buying-guide",
    },
    {
        id: 41,
        title: "Lab Grown Diamond Necklace Guide 2026: Styles, Sizes & Buying Tips",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: NivodaBlogImage,
        excerpt:
            "Discover how to choose a lab grown diamond necklace in 2026. Learn about styles, sizes, chain length, and quality before you buy.",
        slug: "lab-grown-diamond-necklace-buying-guide",
    },
    {
        id: 42,
        title: "Lab Grown Diamond Tennis Bracelet Guide 2026: Size, Quality & Tips",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: RingSizeBlog,
        excerpt:
            "Buying a lab grown diamond tennis bracelet? Learn how to choose size, diamond quality, settings, and what to look for in 2026.",
        slug: "lab-grown-diamond-tennis-bracelet-buying-guide",
    },
    {
        id: 43,
        title: "Custom Diamond Jewelry Guide 2026: How to Design Your Perfect Piece",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: diamondcoal,
        excerpt:
            "Design your own diamond jewelry in 2026. Learn the custom process, pricing, and how to create rings, necklaces, or bracelets step by step.",
        slug: "custom-diamond-jewelry-design-guide-2026",
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
