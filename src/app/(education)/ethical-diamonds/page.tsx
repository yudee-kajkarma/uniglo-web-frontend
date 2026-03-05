import BannerSection from "@/components/shared/BannerSection";
import React from "react";
import BannerImage from "@/assets/ethical-diamonds/bannerNewEthical.jpeg";
import Image from "next/image";

// Replace with your actual image paths
import ConflictFreeDiamondsImg from "@/assets/ethical-diamonds/image1.jpeg";
import TrustBannerBg from "@/assets/services/diamond-financing-options/banner3.png";
import SubFooter from "@/components/shared/SubFooter";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ethical & Conflict-Free Diamonds | Kimberley Process Certified",
    description:
        "Buy 100% ethically sourced, conflict-free natural diamonds from Uniglo. We follow Kimberley Process & World Diamond Council standards.",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/ethical-diamonds",
    },
};

const ethicalData1: ArticleSection[] = [
    {
        heading:
            "Conflict-Free Diamonds: A Commitment to Ethics, Transparency, and Trust",
        content: [
            {
                type: "paragraph",
                text: "In today’s global marketplace, purchasing a diamond is about more than beauty and brilliance — it is about responsibility. Buyers want assurance that the gemstone they choose symbolizes love, integrity, and celebration, not conflict or harm. That is why our commitment to providing conflict-free diamonds stands at the very core of our business philosophy.",
            },
            {
                type: "paragraph",
                text: "We strictly respect and adhere to all international regulations and industry standards designed to eliminate the trade of conflict diamonds. Most importantly, we comply fully with the guidelines set by the Kimberley Process Certification Scheme and the World Diamond Council. These globally recognized frameworks were established to prevent the circulation of rough diamonds used to finance armed conflicts and to ensure transparency throughout the supply chain.",
            },
            {
                type: "paragraph",
                text: "By following these protocols, we provide our clients with diamonds they can trust — stones that are not only high in quality but also responsibly sourced and legally traded.",
            },
        ],
    },
    {
        heading: "What Conflict-Free Truly Means",
        content: [
            {
                type: "paragraph",
                text: "A conflict-free diamond is one that has been mined, processed, and distributed through legitimate channels that comply with international regulations. The Kimberley Process Certification Scheme (KPCS), introduced in 2003, requires participating countries to certify that shipments of rough diamonds are conflict-free. Each shipment must be accompanied by official documentation verifying its lawful origin.",
            },
            {
                type: "paragraph",
                text: "When you purchase a diamond from us, you receive a stone that has passed through these controlled channels. Every diamond we sell comes with proper certification, confirming that it was sourced from conflict-free zones and traded in compliance with international law.",
            },
            {
                type: "paragraph",
                text: "However, our responsibility does not end with certification alone.",
            },
        ],
    },
    {
        heading: "Beyond Compliance: Our Internal Standards",
        content: [
            {
                type: "paragraph",
                text: "Operating in the diamond industry for decades has given us deep insight into global sourcing networks. With that experience comes responsibility. We understand which regions meet strict ethical standards and which areas require caution or avoidance. This knowledge allows us to make informed decisions and uphold the integrity of our sourcing practices.",
            },
            {
                type: "paragraph",
                text: "In addition to adhering to the Kimberley Process and World Diamond Council requirements, we comply with international financial regulations, including foreign proceeds monitoring and anti-money laundering legislation enforced by various nations. These safeguards ensure that every transaction conducted within our company is transparent, legitimate, and traceable.",
            },
            {
                type: "paragraph",
                text: "Our clients can be confident that when they invest in a diamond from us, they are engaging in a secure and ethical transaction.",
            },
        ],
    },
    {
        heading: "Careful Partner and Supplier Screening",
        content: [
            {
                type: "paragraph",
                text: "Ethical sourcing is not a one-step process — it is a continuous commitment. That is why we extend our compliance standards to every partner and supplier within our network.",
            },
            {
                type: "paragraph",
                text: "Before establishing any business relationship, we conduct comprehensive due diligence. This includes:",
            },
            {
                type: "bullet-list",
                items: [
                    "Reviewing internal sourcing procedures",
                    "Assessing compliance with international trade laws",
                    "Verifying financial integrity",
                    "Evaluating market reputation",
                    "Ensuring adherence to ethical mining practices",
                ],
            },
            {
                type: "paragraph",
                text: "We carefully examine how our partners operate, how they source their diamonds, and how they maintain transparency in their supply chains. Only those who meet our strict criteria become part of our trusted network.",
            },
            {
                type: "paragraph",
                text: "As a rule, we collaborate exclusively with reliable and reputable suppliers. This disciplined approach ensures that every diamond passing through our hands reflects our core values of responsibility and integrity.",
            },
            {
                type: "paragraph",
                text: "When you choose us, you are placing your trust in experienced professionals who prioritize ethical accountability at every level of operation.",
            },
        ],
    },
];

const ethicalData2: ArticleSection[] = [
    {
        heading: "Ethical Sourcing from Mine to Market",
        content: [
            {
                type: "paragraph",
                text: "The journey of a diamond begins deep within the Earth, but its true value lies in how it reaches you. Ethical sourcing means ensuring that:",
            },
            {
                type: "bullet-list",
                items: [
                    "Mining practices respect labor rights",
                    "Workers operate in safe conditions",
                    "Local communities benefit from economic activity",
                    "Environmental regulations are observed",
                    "Trade channels remain transparent and lawful",
                ],
            },
            {
                type: "paragraph",
                text: "We actively ensure that the diamonds we procure originate from legitimate mining operations that comply with these principles. Our sourcing strategy focuses exclusively on regions recognized as conflict-free and compliant with international oversight standards.",
            },
            {
                type: "paragraph",
                text: "This dedication allows us to deliver diamonds that symbolize purity not only in appearance but also in origin.",
            },
        ],
    },
    {
        heading: "Excellence Through the 4 Cs",
        content: [
            {
                type: "paragraph",
                text: "While ethics form the foundation of our sourcing process, quality remains equally important. Each diamond undergoes meticulous inspection and rigorous evaluation based on the internationally recognized 4 Cs:",
            },
            {
                type: "bullet-list",
                items: ["Cut", "Color", "Clarity", "Carat Weight"],
            },
            {
                type: "paragraph",
                text: "Our specialists carefully analyze every stone to ensure it meets high-grade standards. Only diamonds that pass strict quality checks become part of our collection.",
            },
            {
                type: "paragraph",
                text: "Natural diamonds are often regarded as timeless symbols of love and integrity. When free from conflict and responsibly sourced, they represent values that align perfectly with life’s most meaningful milestones — engagements, anniversaries, and celebrations of commitment.",
            },
            {
                type: "paragraph",
                text: "By combining ethical sourcing with superior grading standards, we provide diamonds that reflect both external brilliance and internal integrity.",
            },
        ],
    },
    {
        heading: "Transparency in Every Transaction",
        content: [
            {
                type: "paragraph",
                text: "Transparency builds trust. That is why we maintain open communication with our clients regarding the origin and certification of each diamond. Documentation is readily available, and we are always prepared to answer questions about sourcing practices or regulatory compliance.",
            },
            {
                type: "paragraph",
                text: "Our long-standing presence in the diamond industry is built on relationships, and relationships are sustained through honesty. Over the years, we have earned the confidence of clients who value both quality and conscience.",
            },
            {
                type: "paragraph",
                text: "When you purchase a diamond from us, you are not simply acquiring a gemstone — you are investing in a product backed by ethical diligence, international compliance, and decades of expertise.",
            },
        ],
    },
    {
        heading: "Why Conflict-Free Matters Today",
        content: [
            {
                type: "paragraph",
                text: "Modern consumers are increasingly aware of the impact their purchasing decisions have on the world. The demand for responsibly sourced diamonds has grown significantly, and rightly so. Diamonds should symbolize joy, love, and unity — never conflict or exploitation.",
            },
            {
                type: "paragraph",
                text: "By supporting companies that adhere to recognized global standards, buyers contribute to a more transparent and accountable diamond industry. Responsible sourcing also encourages ethical practices across mining regions, benefiting workers and communities worldwide.",
            },
            {
                type: "paragraph",
                text: "We take pride in being part of this positive transformation.",
            },
        ],
    },
];

const trustData: ArticleSection[] = [
    {
        heading: "We’ve Earned Trust",
        content: [
            {
                type: "paragraph",
                text: "Trust is not claimed — it is earned through consistent action. Our adherence to international regulations, rigorous supplier screening, financial transparency, and unwavering ethical standards demonstrate our commitment to responsible business practices.",
            },
            { type: "paragraph", text: "Every diamond we offer reflects:" },
            {
                type: "bullet-list",
                items: [
                    "Compliance with the Kimberley Process Certification Scheme",
                    "Alignment with the World Diamond Council guidelines",
                    "Strict anti-money laundering regulations",
                    "Ethical sourcing from conflict-free regions",
                    "Comprehensive quality evaluation",
                ],
            },
            {
                type: "paragraph",
                text: "These pillars form the foundation of our reputation.",
            },
            {
                type: "paragraph",
                text: "Choosing a diamond should be a joyful experience, free from doubt or concern. With us, you can be confident that your diamond represents not only exceptional craftsmanship and brilliance but also responsibility and integrity.",
            },
        ],
    },
];

const commitments = [
    { title: "Conduct the Business Ethically and Responsibly" },
    { title: "Adhere to AMI & CFT Regulations" },
    { title: "Comply with KP and World Diamond Council System of Warranties" },
    { title: "No support to Child Labour / Forced Labour" },
    { title: "Provide equal opportunity for growth to all employees" },
    { title: "Provide a clean, safe and healthy work place" },
    { title: "Control use of Hazardous substances" },
    {
        title: "No Bribery & Facilitation Payments to gain any unfair business advantage",
    },
    { title: "Prevent use of Conflict Minerals" },
    { title: "Conduct Supply Chain due diligence as per OECD Guidelines" },
    { title: "No Discrimination amongst Employees" },
    { title: "Uphold Fundamental Human Rights and the Rights of Employees" },
    { title: "Reduce Environmental Impact of Operations" },
    { title: "Comply with all Applicable Statutory & Regulatory requirements" },
];

const page = () => {
    return (
        <div className="min-h-screen mb-20">
            <BannerSection
                image={BannerImage}
                text="Ethical Diamonds"
                textClassName="left-10 top-110 text-5xl"
                imageClassName="h-130 object-cover"
            />
            {/* Article Section 1 */}
            <section className="max-w-7xl mx-auto px-10 mt-20 mb-10">
                <DynamicArticle sections={ethicalData1} />
            </section>
            {/* Article Section 2 */}
            <section className="max-w-7xl mx-auto px-10 mb-20">
                <DynamicArticle sections={ethicalData2} />
            </section>
            {/* Trust Content Section */}
            <section className="max-w-7xl mx-auto px-10 mb-20">
                <DynamicArticle sections={trustData} />
            </section>
            {/* <section className="w-full bg-brand-gradient py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-white mb-2">
                            Ethical Business Policy -{" "}
                            <span className="text-white/70">
                                Ensuring a seamless and Memorable experience
                            </span>
                        </h2>
                        <h3 className="text-4xl font-cormorantGaramond font-semibold text-white mt-6">
                            Commitments
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {commitments.map((commitment, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 text-white/90"
                            >
                                <span className="text-[#bb923a] text-2xl mt-1 shrink-0">
                                    ✓
                                </span>
                                <p className="font-lora text-lg leading-relaxed">
                                    {commitment.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}
            <SubFooter />
        </div>
    );
};

export default page;
