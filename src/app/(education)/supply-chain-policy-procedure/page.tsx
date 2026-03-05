import React from "react";
import BannerSection from "@/components/shared/BannerSection";
import BannerImage from "@/assets/supply-chain/bannerSupply.jpeg";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ethical Diamond Sourcing Policy | Uniglo Diamonds",
    description:
        "Learn about Uniglo Diamonds’ commitment to ethical sourcing. We follow RJC standards, Kimberley Process & OECD guidelines for conflict-free diamonds.",
};

const policyData: ArticleSection[] = [
    {
        heading: "Introduction",
        content: [
            {
                type: "paragraph",
                text: "Uniglo is a trusted Diamond and Jewellery Trading Company committed to conducting business with integrity, transparency, and accountability. As part of our core values, we recognize our responsibility to uphold human rights, operate ethically, and ensure that our sourcing and trading activities do not contribute to conflict, corruption, or unlawful practices.",
            },
            {
                type: "paragraph",
                text: "This Supply Chain Policy formalizes Uniglo’s commitment to responsible sourcing and compliance with all applicable international standards, including relevant United Nations sanctions, resolutions, and national laws. We believe that ethical sourcing is not only a legal requirement but also a moral obligation that strengthens the long-term sustainability of the global jewellery industry.",
            },
        ],
    },
    {
        heading: "Commitment to Responsible Jewellery Council Standards",
        content: [
            {
                type: "paragraph",
                text: "Uniglo is a proud member of the Responsible Jewellery Council (RJC). As an RJC member, we commit to maintaining the highest standards of responsible business practices throughout our supply chain. Through independent third-party verification, we demonstrate that our systems, policies, and processes align with internationally recognized responsible sourcing standards.",
            },
            {
                type: "paragraph",
                text: "In line with RJC requirements, Uniglo commits to:",
            },
            {
                type: "bullet-list",
                items: [
                    "Respecting human rights in accordance with the United Nations Universal Declaration of Human Rights and the International Labour Organization’s Fundamental Principles and Rights at Work.",
                    "Prohibiting and preventing bribery, corruption, money laundering, and the financing of terrorism.",
                    "Supporting transparency in government payments and encouraging responsible, rights-compatible security practices within extractive industries.",
                    "Ensuring that we do not provide direct or indirect support to illegal armed groups.",
                    "Providing accessible mechanisms for stakeholders to raise concerns regarding our jewellery supply chain.",
                ],
            },
            {
                type: "paragraph",
                text: "Our RJC membership reinforces our commitment to operating responsibly and transparently while ensuring continuous improvement in ethical sourcing practices.",
            },
        ],
    },
    {
        heading: "Implementation of OECD Due Diligence Framework",
        content: [
            {
                type: "paragraph",
                text: "Uniglo implements the OECD Five-Step Framework for risk-based due diligence in mineral supply chains from conflict-affected and high-risk areas (CAHRA). This framework serves as the foundation of our internal management systems and risk mitigation strategies.",
            },
            { type: "paragraph", text: "The five-step framework includes:" },
            {
                type: "numbered-list",
                items: [
                    "Establishing strong company management systems.",
                    "Identifying and assessing risks in the supply chain.",
                    "Designing and implementing strategies to respond to identified risks.",
                    "Carrying out independent third-party audits of supply chain due diligence.",
                    "Reporting annually on supply chain due diligence efforts.",
                ],
            },
            {
                type: "paragraph",
                text: "By applying this structured approach, Uniglo ensures that risks are identified proactively and addressed effectively before they impact our operations or stakeholders.",
            },
        ],
    },
    {
        heading: "Sourcing from Conflict-Affected and High-Risk Areas (CAHRA)",
        content: [
            {
                type: "paragraph",
                text: "Uniglo does not procure diamonds or coloured gemstones from conflict-affected and high-risk areas. Our suppliers are not located in CAHRA regions, and we maintain strict verification procedures to ensure compliance.",
            },
            {
                type: "paragraph",
                text: "Furthermore, our suppliers are certified members of the Responsible Jewellery Council and comply with OECD Guidelines for responsible sourcing. Through continuous monitoring and supplier evaluation, we maintain confidence that our sourcing practices align with international ethical standards.",
            },
        ],
    },
    {
        heading: "Zero Tolerance for Serious Human Rights Abuses",
        content: [
            {
                type: "paragraph",
                text: "Uniglo maintains a strict zero-tolerance policy toward serious human rights abuses associated with the extraction, transportation, or trade of diamonds and coloured gemstones.",
            },
            {
                type: "paragraph",
                text: "We will neither tolerate nor benefit from, contribute to, assist, or facilitate any of the following acts:",
            },
            {
                type: "bullet-list",
                items: [
                    "Torture or cruel, inhuman, and degrading treatment",
                    "Forced or compulsory labour",
                    "The worst forms of child labour",
                    "Any form of human rights violations or abuses",
                    "War crimes, violations of international humanitarian law, crimes against humanity, or genocide",
                ],
            },
            {
                type: "paragraph",
                text: "If we identify a reasonable risk that an upstream supplier is committing or supporting such abuses, we will immediately suspend or terminate our business relationship. Our priority is to ensure that no part of our supply chain is connected to exploitation or violence.",
            },
        ],
    },
    {
        heading:
            "Prevention of Direct or Indirect Support to Non-State Armed Groups",
        content: [
            {
                type: "paragraph",
                text: "Uniglo is fully committed to preventing any direct or indirect support to non-state armed groups. We strictly trade only in diamonds and coloured gemstones that comply with the Kimberley Process Certification Scheme and the Dodd-Frank Act.",
            },
            { type: "paragraph", text: "Under this commitment, we will not:" },
            {
                type: "bullet-list",
                items: [
                    "Procure diamonds or coloured gemstones from entities linked to non-state armed groups.",
                    "Make payments to or otherwise provide assistance, equipment, or logistical support to such groups.",
                    "Engage with suppliers who are found to source materials from mine sites, transportation routes, or trading points controlled by illegal armed groups.",
                    "Participate in or enable taxation, extortion, or illegal levies imposed by such groups at any stage of the supply chain.",
                ],
            },
            {
                type: "paragraph",
                text: "Should any credible risk arise linking a supplier to non-state armed groups, Uniglo will immediately disengage from that supplier and conduct a thorough investigation.",
            },
        ],
    },
    {
        heading:
            "Responsible Engagement with Public and Private Security Forces",
        content: [
            {
                type: "paragraph",
                text: "We acknowledge that public and private security forces may play a legitimate role in protecting workers, facilities, and property. However, such security must operate in accordance with the rule of law and international human rights standards.",
            },
            {
                type: "paragraph",
                text: "Uniglo will not provide direct or indirect support to security forces that:",
            },
            {
                type: "bullet-list",
                items: [
                    "Commit human rights abuses, including those listed above.",
                    "Act unlawfully in controlling mining sites, transportation routes, or trade points.",
                    "Engage in extortion, violence, or intimidation against communities or workers.",
                ],
            },
            {
                type: "paragraph",
                text: "We expect our business partners to uphold the same principles and will take corrective action if any misconduct is identified.",
            },
        ],
    },
    {
        heading: "Anti-Bribery and Anti-Corruption Commitment",
        content: [
            {
                type: "paragraph",
                text: "Integrity is central to Uniglo’s business operations. We strictly prohibit all forms of bribery and corruption, including fraudulent misrepresentation of the origin of diamonds and coloured gemstones.",
            },
            { type: "paragraph", text: "We will not:" },
            {
                type: "bullet-list",
                items: [
                    "Offer, promise, or give bribes to conceal or falsify the origin of diamonds or gemstones.",
                    "Accept or demand bribes from suppliers, intermediaries, or other stakeholders.",
                    "Misrepresent taxes, royalties, or fees paid to governments related to extraction, trade, transport, or export activities.",
                ],
            },
            {
                type: "paragraph",
                text: "Uniglo actively resists any solicitation of bribes and ensures that financial records are transparent and accurate. Compliance with anti-corruption laws is mandatory for all employees and business partners.",
            },
        ],
    },
    {
        heading: "Prevention of Money Laundering",
        content: [
            {
                type: "paragraph",
                text: "Uniglo is committed to supporting global efforts to eliminate money laundering within the diamond and jewellery industry. We maintain robust internal controls to detect and prevent financial crimes linked to the extraction, trade, handling, transport, or export of diamonds and coloured gemstones.",
            },
            {
                type: "paragraph",
                text: "Our anti-money laundering measures include:",
            },
            {
                type: "bullet-list",
                items: [
                    "Conducting due diligence on customers and suppliers.",
                    "Monitoring transactions for suspicious activities.",
                    "Maintaining accurate financial documentation and audit trails.",
                    "Reporting suspicious transactions to relevant authorities where required by law.",
                ],
            },
            {
                type: "paragraph",
                text: "By implementing these measures, we protect the integrity of our business and contribute to a more transparent and accountable global marketplace.",
            },
        ],
    },
    {
        heading: "Stakeholder Engagement and Grievance Mechanism",
        content: [
            {
                type: "paragraph",
                text: "Uniglo believes in open communication and accountability. We provide appropriate channels for employees, suppliers, customers, and other stakeholders to voice concerns related to our supply chain practices.",
            },
            {
                type: "paragraph",
                text: "All complaints or concerns are treated confidentially and investigated promptly. Retaliation against individuals who raise concerns in good faith is strictly prohibited. Through stakeholder engagement, we strengthen trust and ensure continuous improvement in our responsible sourcing practices.",
            },
        ],
    },
    {
        heading: "Continuous Improvement and Accountability",
        content: [
            {
                type: "paragraph",
                text: "Responsible sourcing is an ongoing process. Uniglo is committed to continuous monitoring, evaluation, and improvement of our supply chain management systems. We regularly review our policies to align with evolving international standards and best practices.",
            },
            {
                type: "paragraph",
                text: "Senior management holds overall responsibility for implementing this policy, ensuring compliance, and promoting ethical conduct throughout the organization. Employees and suppliers are expected to understand and adhere to the principles outlined in this document.",
            },
        ],
    },
    {
        heading: "Conclusion",
        content: [
            {
                type: "paragraph",
                text: "Uniglo’s Supply Chain Policy reflects our unwavering commitment to ethical business practices, human rights protection, and responsible sourcing. By aligning with internationally recognized standards, implementing rigorous due diligence processes, and maintaining zero tolerance for abuses, we ensure that our diamonds and jewellery contribute positively to communities and markets worldwide.",
            },
            {
                type: "paragraph",
                text: "Through transparency, accountability, and responsible leadership, Uniglo strives to uphold the highest standards in the global diamond and jewellery trade, ensuring integrity at every stage of our supply chain.",
            },
        ],
    },
];

const SidebarBlogs = () => {
    const blogs = [
        { title: "Diamond Buying Guide", href: "#" },
        { title: "Understanding The 4Cs", href: "#" },
        { title: "Conflict-Free Diamonds", href: "#" },
        { title: "Jewellery Care Guide", href: "#" },
        { title: "Our Ethical Sourcing", href: "#" },
    ];

    return (
        <div className="bg-slate-50 p-8 rounded-sm sticky top-24">
            <h3 className="text-2xl font-cormorantGaramond font-semibold mb-6 text-[#1f2732] border-b pb-4">
                Other Articles
            </h3>
            <ul className="space-y-4 font-lora text-lg text-slate-600">
                {blogs.map((blog, idx) => (
                    <li key={idx}>
                        <a
                            href={blog.href}
                            className="hover:text-[#bb923a] transition-colors duration-300"
                        >
                            {blog.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const page = () => {
    return (
        <div className="min-h-screen">
            <BannerSection
                image={BannerImage}
                text="Supply Chain Policy & Procedure"
                textClassName="left-10 top-90 text-4xl"
                imageClassName="h-100 object-cover"
            />
            <section className="max-w-7xl mx-auto px-10 my-20 pb-20 flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                    <div className="text-primary-yellow-1 text-lg font-lora mb-2 uppercase tracking-wider">
                        Company Policy
                    </div>
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold mb-10 text-[#1f2732]">
                        Supply Chain Policy & Procedure
                    </h1>

                    {/* Render Content Using Generic Component */}
                    <DynamicArticle sections={policyData} />
                </div>

                <div className="lg:w-1/3">
                    <SidebarBlogs />
                </div>
            </section>
        </div>
    );
};

export default page;
