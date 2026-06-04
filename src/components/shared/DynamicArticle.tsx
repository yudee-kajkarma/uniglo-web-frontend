"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArticleInlineContent, { InlinePart } from "@/components/shared/ArticleInlineContent";

export type { InlinePart };

export type CtaButton = { label: string; href: string };

export type ContentBlock =
    | { type: "paragraph"; text?: string; parts?: InlinePart[] }
    | { type: "bullet-list"; items: string[]; itemsParts?: InlinePart[][] }
    | { type: "numbered-list"; items: string[]; itemsParts?: InlinePart[][] }
    | { type: "cta-group"; buttons: CtaButton[] }
    | {
          type: "image";
          src: string;
          alt: string;
          width?: number;
          height?: number;
      };

export type ArticleSection = {
    heading?: string;
    content: ContentBlock[];
};

interface DynamicArticleProps {
    sections: ArticleSection[];
}

const DynamicArticle: React.FC<DynamicArticleProps> = ({ sections }) => {
    return (
        <div className="text-slate-700 text-lg font-lora leading-relaxed">
            {sections.map((section, idx) => (
                <div
                    key={idx}
                    className={idx > 0 && section.heading ? "mt-10" : ""}
                >
                    {section.heading && (
                        <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                            {section.heading}
                        </h2>
                    )}

                    <div className="space-y-4">
                        {section.content.map((block, bIdx) => {
                            if (block.type === "paragraph") {
                                return (
                                    <p key={bIdx}>
                                        <ArticleInlineContent
                                            text={block.text}
                                            parts={block.parts}
                                        />
                                    </p>
                                );
                            }
                            if (block.type === "bullet-list") {
                                return (
                                    <ul
                                        key={bIdx}
                                        className="list-disc ml-6 mt-2 space-y-2"
                                    >
                                        {block.items.map((item, i) => (
                                            <li key={i}>
                                                <ArticleInlineContent
                                                    text={item}
                                                    parts={block.itemsParts?.[i]}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }
                            if (block.type === "numbered-list") {
                                return (
                                    <ol
                                        key={bIdx}
                                        className="list-decimal ml-6 mt-2 space-y-2"
                                    >
                                        {block.items.map((item, i) => (
                                            <li key={i}>
                                                <ArticleInlineContent
                                                    text={item}
                                                    parts={block.itemsParts?.[i]}
                                                />
                                            </li>
                                        ))}
                                    </ol>
                                );
                            }
                            if (block.type === "cta-group") {
                                return (
                                    <div
                                        key={bIdx}
                                        className="flex flex-wrap gap-4 my-6"
                                    >
                                        {block.buttons.map((btn, i) => (
                                            <Link
                                                key={i}
                                                href={btn.href}
                                                className="inline-block bg-[#bb923a] text-white px-6 py-2.5 text-sm font-bold font-lora uppercase tracking-wider hover:bg-[#9a7a2f] transition-colors rounded-sm"
                                            >
                                                {btn.label}
                                            </Link>
                                        ))}
                                    </div>
                                );
                            }
                            if (block.type === "image") {
                                return (
                                    <figure key={bIdx} className="my-8">
                                        <div className="relative w-full overflow-hidden rounded-md">
                                            <Image
                                                src={block.src}
                                                alt={block.alt}
                                                width={block.width ?? 1200}
                                                height={block.height ?? 750}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </figure>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicArticle;
