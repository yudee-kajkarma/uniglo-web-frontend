"use client";

import React from "react";
import { Link } from "@/i18n/navigation";

export type InlinePart =
    | { type: "text"; value: string }
    | { type: "link"; label: string; href: string };

const linkClassName =
    "text-[#bb923a] underline underline-offset-2 hover:text-[#9a7a2f] font-medium";

function ArticleLink({ label, href }: { label: string; href: string }) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");

    if (isInternal) {
        return (
            <Link href={href} className={linkClassName}>
                {label}
            </Link>
        );
    }

    return (
        <a href={href} className={linkClassName} target="_blank" rel="noopener noreferrer">
            {label}
        </a>
    );
}

export function parseTextToParts(text: string): InlinePart[] {
    const normalized = text.replace(/\\&/g, "&").replace(/\\/g, "").trim();
    const parts: InlinePart[] = [];
    const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(normalized)) !== null) {
        if (match.index > lastIndex) {
            const chunk = normalized.slice(lastIndex, match.index);
            if (chunk) parts.push({ type: "text", value: chunk });
        }
        parts.push({
            type: "link",
            label: match[1].trim(),
            href: match[2].trim().replace(/\/+$/, "") || match[2].trim(),
        });
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < normalized.length) {
        parts.push({ type: "text", value: normalized.slice(lastIndex) });
    }

    if (parts.length === 0 && normalized) {
        parts.push({ type: "text", value: normalized });
    }

    return parts;
}

interface ArticleInlineContentProps {
    text?: string;
    parts?: InlinePart[];
}

const ArticleInlineContent: React.FC<ArticleInlineContentProps> = ({ text, parts }) => {
    const nodes = parts?.length ? parts : text ? parseTextToParts(text) : [];

    return (
        <>
            {nodes.map((part, i) =>
                part.type === "link" ? (
                    <ArticleLink key={i} label={part.label} href={part.href} />
                ) : (
                    <React.Fragment key={i}>{part.value}</React.Fragment>
                )
            )}
        </>
    );
};

export default ArticleInlineContent;
