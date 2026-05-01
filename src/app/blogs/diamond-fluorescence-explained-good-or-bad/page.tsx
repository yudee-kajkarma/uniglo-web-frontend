import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, { ArticleSection } from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "Diamond Fluorescence Explained: Is It Good or Bad? (2026 Guide)",
    description:
        "What is diamond fluorescence and should you avoid it? Learn how it affects price, appearance, and value in this 2026 guide.",
    alternates: {
        canonical:
            "https://www.uniglodiamonds.com/blogs/diamond-fluorescence-explained-good-or-bad",
    },
};

const articleData: ArticleSection[] = [
    { heading: "Why Fluorescence Confuses So Many Buyers", content: [{ type: "paragraph", text: "Fluorescence appears on grading reports but is often misunderstood as always bad or always irrelevant." }] },
    { heading: "What Diamond Fluorescence Actually Is", content: [{ type: "paragraph", text: "It is a UV reaction where some diamonds emit a glow, commonly blue, with intensity graded from none to very strong." }] },
    { heading: "Can You See Fluorescence in Everyday Conditions", content: [{ type: "paragraph", text: "Usually not indoors. It is most noticeable under strong UV exposure like sunlight." }] },
    { heading: "Why Fluorescence Sometimes Gets a Bad Reputation", content: [{ type: "paragraph", text: "Rare strong cases can appear hazy, but most fluorescent diamonds do not show negative visual effects." }] },
    { heading: "When Fluorescence Can Actually Be Beneficial", content: [{ type: "paragraph", text: "In some lower color ranges, medium blue fluorescence can improve perceived whiteness in UV-rich conditions." }] },
    { heading: "How Fluorescence Affects Price", content: [{ type: "paragraph", text: "Strong fluorescence can reduce price in high-color grades, sometimes creating value opportunities." }] },
    { heading: "Should You Avoid Strong Fluorescence", content: [{ type: "paragraph", text: "Evaluate stone-by-stone. Avoid only if transparency appears milky or hazy." }] },
    { heading: "How Fluorescence Interacts with Color", content: [{ type: "paragraph", text: "Color range influences whether fluorescence is neutral, beneficial, or unnecessary." }] },
    { heading: "Certification and Fluorescence Reporting", content: [{ type: "paragraph", text: "Reports list intensity, but visual review is still needed to judge practical impact." }] },
    { heading: "Practical Buying Strategy", content: [{ type: "paragraph", text: "Do not auto-reject fluorescence. Check transparency and use it strategically when price-benefit is favorable." }] },
    { heading: "Final Thoughts", content: [{ type: "paragraph", text: "Fluorescence is a characteristic, not an automatic flaw. Context and visual evaluation determine whether it matters." }] },
];

const faqData = [
    { question: "What is diamond fluorescence?", answer: "A UV-light reaction that can produce a glow, often blue." },
    { question: "Is fluorescence bad?", answer: "Usually no; only some strong cases may look hazy." },
    { question: "Can fluorescence be seen all the time?", answer: "No, mostly under UV-rich lighting." },
    { question: "Does fluorescence affect price?", answer: "Yes, especially at stronger levels in high-color stones." },
    { question: "Can fluorescence improve appearance?", answer: "Sometimes in slightly warmer color grades." },
    { question: "Should I avoid strong fluorescence?", answer: "Only if it negatively affects transparency." },
    { question: "Does it make diamonds look blue always?", answer: "No, effect is usually subtle and UV-dependent." },
    { question: "Is fluorescence on the certificate?", answer: "Yes, intensity is listed in grading reports." },
    { question: "Which color grades may benefit most?", answer: "Some lower near-colorless ranges may benefit visually." },
    { question: "What should I check before buying?", answer: "Transparency and overall visual performance in real viewing." },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

const BlogPage = () => (
    <div className="min-h-screen mb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
            <div className="flex-1 w-full lg:w-2/3">
                <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                    Diamond Fluorescence: What It Is and Should You Avoid It?
                </h1>
                <DynamicArticle sections={articleData} />
                <FAQSection faqs={faqData} title="Frequently Asked Questions" className="mt-12" />
            </div>
            <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
        </div>
    </div>
);

export default BlogPage;
