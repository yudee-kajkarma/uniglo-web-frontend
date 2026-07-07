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
    {
        id: 44,
        title: "Best Diamond Shapes for Engagement Rings (2026 Guide & Comparison)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Round, oval, cushion or emerald? Discover the best diamond shapes for engagement rings in 2026 and how to choose the right one.",
        slug: "best-diamond-shapes-for-engagement-rings",
    },
    {
        id: 45,
        title: "Diamond Cut vs Clarity: What Matters More? (2026 Buying Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog2,
        excerpt:
            "Cut or clarity: which matters more in a diamond? Learn the real difference and what to prioritize when buying in 2026.",
        slug: "diamond-cut-vs-clarity-which-matters",
    },
    {
        id: 46,
        title: "Diamond Color vs Clarity: Which Should You Choose in 2026?",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: newimage,
        excerpt:
            "Diamond color or clarity: which matters more? Learn the key differences, price impact, and how to choose the right balance in 2026.",
        slug: "diamond-color-vs-clarity-which-matters",
    },
    {
        id: 47,
        title: "Diamond Cut vs Color: Which Matters More? (2026 Buying Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: labd,
        excerpt:
            "Cut or color: which should you prioritize? Learn how each affects sparkle, appearance, and price in this 2026 diamond buying guide.",
        slug: "diamond-cut-vs-color-which-matters",
    },
    {
        id: 48,
        title: "VS vs VVS Diamonds: What’s the Difference & Which Is Better? (2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "VS vs VVS diamonds explained. Learn the real difference, visibility, pricing, and which clarity grade is better for your budget in 2026.",
        slug: "vs-vs-vvs-diamonds-difference",
    },
    {
        id: 49,
        title: "SI vs VS Diamonds: Which Clarity Is Better Value? (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: RingSizeBlog,
        excerpt:
            "SI vs VS diamonds explained. Learn the difference, visibility, pricing, and which clarity grade gives the best value in 2026.",
        slug: "si-vs-vs-diamonds-which-better",
    },
    {
        id: 50,
        title: "Diamond Fluorescence Explained: Is It Good or Bad? (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: NivodaBlogImage,
        excerpt:
            "What is diamond fluorescence and should you avoid it? Learn how it affects price, appearance, and value in this 2026 guide.",
        slug: "diamond-fluorescence-explained-good-or-bad",
    },
    {
        id: 51,
        title: "What Is Diamond Certification? GIA vs IGI Explained (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog1,
        excerpt:
            "What is a diamond certificate and which one should you trust? Learn GIA vs IGI differences and how certification affects your purchase.",
        slug: "what-is-diamond-certification-gia-vs-igi",
    },
    {
        id: 52,
        title: "How to Buy a Diamond Online Safely (2026 Guide & Checklist)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: tamperprofseal,
        excerpt:
            "Buying a diamond online? Learn how to choose safely, avoid scams, check certification, and get the best value in 2026.",
        slug: "how-to-buy-diamond-online-safely",
    },
    {
        id: 53,
        title: "How to Choose the Perfect Engagement Ring (2026 Complete Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: diamondcoal,
        excerpt:
            "Not sure how to choose an engagement ring? Learn size, style, diamond quality, and budget tips in this complete 2026 guide.",
        slug: "how-to-choose-engagement-ring-guide",
    },
    {
        id: 54,
        title: "Natural vs Lab Grown Diamonds: Which Should You Buy in 2026?",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: newimage,
        excerpt:
            "Natural or lab grown diamonds? Learn the real differences, pricing, value, and which option is right for you in 2026.",
        slug: "natural-vs-lab-grown-diamonds-guide",
    },
    {
        id: 55,
        title: "Best Diamond Size for Engagement Rings (2026 Carat Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: RingSizeBlog,
        excerpt:
            "What diamond size should you choose? Learn the best carat sizes, finger fit, budget tips, and how big a diamond should be in 2026.",
        slug: "best-diamond-size-for-engagement-ring",
    },
    {
        id: 56,
        title: "Best Diamond Settings for Engagement Rings (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Explore the best diamond settings for engagement rings in 2026. Learn styles, durability, and how to choose the right setting.",
        slug: "best-diamond-settings-for-engagement-rings",
    },
    {
        id: 57,
        title: "How to Clean Diamond Jewelry at Home (Safe Methods Guide 2026)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog1,
        excerpt:
            "Learn how to clean diamond rings, earrings, and necklaces at home safely. Step-by-step methods to keep your diamonds sparkling in 2026.",
        slug: "how-to-clean-diamond-jewelry-at-home",
    },
    {
        id: 58,
        title: "How to Store Diamond Jewelry Safely (2026 Storage Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Learn how to store diamond jewelry properly to avoid scratches and damage. Simple storage tips for rings, earrings, and necklaces.",
        slug: "how-to-store-diamond-jewelry-safely",
    },
    {
        id: 59,
        title: "How to Insure Your Diamond Jewelry (2026 Guide & Cost Tips)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: tamperprofseal,
        excerpt:
            "Learn how to insure diamond jewelry, what it covers, costs, and how to protect your ring or diamonds in 2026.",
        slug: "how-to-insure-diamond-jewelry",
    },
    {
        id: 60,
        title: "Diamond Resale Value Explained: Do Diamonds Hold Value in 2026?",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: diamondcoal,
        excerpt:
            "Do diamonds hold value? Learn how resale value works, what affects it, and what to expect when selling a diamond in 2026.",
        slug: "diamond-resale-value-guide",
    },
    {
        id: 61,
        title: "Diamond Certification vs Appraisal: What's the Difference? (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: NivodaBlogImage,
        excerpt:
            "Diamond certificate vs appraisal explained. Learn the key differences, why both matter, and when you need each in 2026.",
        slug: "diamond-certification-vs-appraisal",
    },
    {
        id: 62,
        title: "How to Spot a Fake Diamond (2026 Guide to Real vs Fake Diamonds)",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: EngagementRingBlog2,
        excerpt:
            "Worried about fake diamonds? Learn simple ways to identify real diamonds vs fake ones, tests you can do, and what actually works in 2026.",
        slug: "how-to-spot-fake-diamond",
    },
    {
        id: 63,
        title: "Diamond Buying Checklist 2026: What to Know Before You Buy",
        author: "Uniglo Diamonds",
        date: "May 1, 2026",
        image: labd,
        excerpt:
            "Use this diamond buying checklist before you purchase. Learn what to check, avoid mistakes, and choose the best diamond in 2026.",
        slug: "diamond-buying-checklist-2026",
    },
    {
        id: 64,
        title: "Uniglo at Cannes Festival 2026: Where Brilliance Meets the Riviera",
        author: "Uniglo Diamonds",
        date: "May 14, 2026",
        image: "/uniglo-canes/uniglo-canes-1.jpeg",
        excerpt:
            "Uniglo Diamonds & Uniglo Jewels arrive at Cannes Festival 2026 with Maja Malnar, bringing Antwerp craftsmanship and modern haute joaillerie to the Riviera.",
        slug: "uniglo-at-cannes-festival-2026",
    },
    {
        id: 65,
        title: "Uniglo Jewels at Cannes 2026: A Story of Pink Diamonds, Riviera Light, and Modern Haute Joaillerie",
        author: "Uniglo Diamonds",
        date: "May 14, 2026",
        image: "/uniglo-canes/uniglo-canes-4.jpeg",
        excerpt:
            "Discover Uniglo Jewels' pink diamond masterpieces at Cannes 2026—nearly 40 carat earrings and a 30 carat pendant worn by Maja Malnar on the Riviera.",
        slug: "uniglo-jewels-cannes-2026-pink-diamonds",
    },
    {
        id: 66,
        title: "Summer 2026 Bridal Guide: Engagement Rings & Wedding Bands for Couples",
        author: "Uniglo Jewels",
        date: "June 3, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Choose the perfect engagement ring and wedding bands for a Summer 2026 wedding. Ring pairing tips, guest jewellery ideas, and bridal appointment guidance.",
        slug: "summer-2026-bridal-guide-engagement-rings-wedding-bands-couples",
    },
    {
        id: 67,
        title: "What to Wear to a Summer Wedding 2026: Fine Jewellery Guide for Guests",
        author: "Uniglo Jewels",
        date: "June 3, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Discover what jewellery to wear to a Summer 2026 wedding as a guest. Outfit-based styling tips for earrings, necklaces, bracelets, and rings.",
        slug: "what-to-wear-summer-wedding-2026-fine-jewellery-guest-guide",
    },
    {
        id: 68,
        title: "Lab-Grown Diamond Wedding Band Trends 2026: The Styles Couples Are Choosing",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: newimage,
        excerpt:
            "Explore top lab-grown diamond wedding band trends for 2026—bezel-set, eternity, baguette, emerald-cut, stackable, and sculptural styles.",
        slug: "lab-grown-diamond-wedding-band-trends-2026",
    },
    {
        id: 69,
        title: "How to Match a Lab-Grown Diamond Wedding Band to Your Engagement Ring (2026)",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: labd,
        excerpt:
            "Learn how to match a lab-grown diamond wedding band to your engagement ring. Curved, contoured, halo-fit bands, metal colours, and ring shapes explained.",
        slug: "how-to-match-lab-grown-diamond-wedding-band-engagement-ring-2026",
    },
    {
        id: 70,
        title: "Best Place to Buy Lab-Grown Diamonds in Antwerp (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: labd,
        excerpt:
            "Looking for the best place to buy lab-grown diamonds in Antwerp? Learn how to choose certified lab diamonds, compare diamond shops, avoid common mistakes, and buy with confidence.",
        slug: "best-place-to-buy-lab-grown-diamonds-antwerp",
    },
    {
        id: 71,
        title: "Lab-Grown Diamonds in Belgium: 2026 Buyer’s Guide",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: newimage,
        excerpt:
            "Everything buyers should know about lab-grown diamonds in Belgium—certification, pricing, Antwerp diamond buying, engagement rings, wedding bands, and how to choose with confidence.",
        slug: "lab-grown-diamonds-belgium-buyers-guide",
    },
    {
        id: 72,
        title: "How to Buy a Lab-Grown Diamond Ring in Antwerp (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: EngagementRingBlog1,
        excerpt:
            "Learn how to buy a lab-grown diamond ring in Antwerp with confidence. Compare diamond shapes, certificates, ring settings, budgets, and buying mistakes before choosing your ring.",
        slug: "how-to-buy-lab-grown-diamond-ring-antwerp",
    },
    {
        id: 73,
        title: "Antwerp Certified Lab-Grown Diamonds: HRD Certificate Guide",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: diamondcoal,
        excerpt:
            "Learn what Antwerp certified lab-grown diamonds mean, how HRD Antwerp certificates work, how to check a diamond certificate, and what buyers should verify before purchasing.",
        slug: "antwerp-certified-lab-grown-diamonds-hrd-certificate-guide",
    },
    {
        id: 74,
        title: "Cheap Diamonds in Antwerp vs Lab-Grown Diamond Value (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: BuyDiamondsOnlineBlog2,
        excerpt:
            "Searching for cheap diamonds in Antwerp? Learn why certified lab-grown diamonds can offer better value, what to check before buying, and how to avoid low-quality diamond deals.",
        slug: "cheap-diamonds-antwerp-vs-lab-grown-diamond-value",
    },
    {
        id: 75,
        title: "Where to Buy Lab-Grown Diamonds Online in Belgium (2026 Guide)",
        author: "Uniglo Diamonds",
        date: "June 3, 2026",
        image: NivodaBlogImage,
        excerpt:
            "Learn where to buy lab-grown diamonds online in Belgium, how to compare certified diamonds safely, what to check before purchase, and how Uniglo Diamonds helps buyers choose with confidence.",
        slug: "where-to-buy-lab-grown-diamonds-online-belgium",
    },
    {
        id: 76,
        title: "Oval Diamond Obsession: Why Everyone Is Choosing the Oval Cut and Who It Suits Best",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/oval-diamond-rings-why-popular-who-they-suit.png",
        excerpt:
            "Discover why oval diamond rings look bigger, flatter every hand, and feel modern yet romantic. Learn who oval diamonds suit best with Uniglo Jewels.",
        slug: "oval-diamond-rings-why-popular-who-they-suit",
    },
    {
        id: 77,
        title: "The “Looks Expensive” Diamond Edit: 7 Jewelry Pieces That Instantly Upgrade Any Outfit",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/diamond-jewelry-pieces-that-look-expensive-1.png",
        excerpt:
            "Discover 7 diamond jewelry pieces that instantly upgrade any outfit, from diamond studs and tennis bracelets to huggies, pendants, rings, and bands.",
        slug: "diamond-jewelry-pieces-that-look-expensive",
    },
    {
        id: 78,
        title: "Modern Heirlooms: Jewelry Designed to Be Passed Down, Not Replaced",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/modern-heirloom-jewelry-designed-to-last-1.png",
        excerpt:
            "Discover what makes modern heirloom jewelry meaningful, timeless, and worthy of being passed down through generations with Uniglo Jewels.",
        slug: "modern-heirloom-jewelry-designed-to-last",
    },
    {
        id: 79,
        title: "Why Diamonds Became the Language of Forever And Why They Still Are Today",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/why-diamonds-mean-forever-1.png",
        excerpt:
            "Discover why diamonds became symbols of forever, love, legacy, and modern self-expression, and why diamond jewelry still carries timeless meaning today.",
        slug: "why-diamonds-mean-forever",
    },
    {
        id: 80,
        title: "The Journey of Brilliance: From Earth-Formed to Lab-Created Diamonds",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/natural-vs-lab-created-diamonds-two-origins-one-emotion-1.png",
        excerpt:
            "Understand the difference between natural and lab-created diamonds in a clear, human guide. Explore how both origins can carry beauty, meaning, and emotion.",
        slug: "natural-vs-lab-created-diamonds-two-origins-one-emotion",
    },
    {
        id: 81,
        title: "Uniglo’s 25 Years: An Evening Where Memories Wore Diamonds",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/uniglo-25th-anniversary-diamonds-memories-legacy-1.png",
        excerpt:
            "Uniglo’s 25th anniversary celebrated 25 years of diamonds, craftsmanship, global relationships, family values, and meaningful connections.",
        slug: "uniglo-25th-anniversary-diamonds-memories-legacy",
    },
    {
        id: 82,
        title: "Minimal Bride, Maximum Impact: Diamond Jewellery for the Modern Wedding Aesthetic",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/minimal-bridal-diamond-jewellery-modern-wedding-1.png",
        excerpt:
            "Discover how minimal bridal diamond jewellery creates maximum impact with elegant rings, pendants, earrings, bracelets, and timeless wedding styling.",
        slug: "minimal-bridal-diamond-jewellery-modern-wedding",
    },
    {
        id: 83,
        title: "Jewellery That Speaks Love This Valentine’s Day",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/valentines-day-diamond-jewellery-gifts.png",
        excerpt:
            "Discover meaningful Valentine’s Day diamond jewellery gifts from Uniglo Jewels, designed for romance, self-love, family bonds, and memories that last.",
        slug: "valentines-day-diamond-jewellery-gifts",
    },
    {
        id: 84,
        title: "Little Sparks, Forever Love: A Valentine’s Day Story in Diamond and Lab-Grown Diamond",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/valentines-day-diamond-jewellery-for-children-1.png",
        excerpt:
            "Celebrate Valentine’s Day with meaningful diamond and lab-grown diamond jewellery for children, from tiny pendants to keepsake bracelets designed to carry love forward.",
        slug: "valentines-day-diamond-jewellery-for-children",
    },
    {
        id: 85,
        title: "A Circle of Love: Celebrating Valentine’s Day with Diamonds for Every Heart",
        author: "Uniglo Diamonds",
        date: "July 7, 2026",
        image: "/special-blogs-images/valentines-day-diamond-gifts-for-every-heart-1.png",
        excerpt:
            "Celebrate Valentine’s Day with diamond and lab-grown diamond jewellery for partners, parents, children, and every meaningful bond in your family.",
        slug: "valentines-day-diamond-gifts-for-every-heart",
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
                        {[...blogs].reverse().map((blog) => (
                            <div
                                key={blog.id}
                                className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* Blog Image */}
                                <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-sm mb-6 ">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
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
                                        {blog.author}
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
