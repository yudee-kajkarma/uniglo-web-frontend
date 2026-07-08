import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "'M'i'n'i'm'a'l' 'B'r'i'd'a'l' 'D'i'a'm'o'n'd' 'J'e'w'e'l'l'e'r'y' 'f'o'r' 'M'o'd'e'r'n' 'B'r'i'd'e's'",
    description: "'D'i's'c'o'v'e'r' 'h'o'w' 'm'i'n'i'm'a'l' 'b'r'i'd'a'l' 'd'i'a'm'o'n'd' 'j'e'w'e'l'l'e'r'y' 'c'r'e'a't'e's' 'm'a'x'i'm'u'm' 'i'm'p'a'c't' 'w'i't'h' 'e'l'e'g'a'n't' 'r'i'n'g's',' 'p'e'n'd'a'n't's',' 'e'a'r'r'i'n'g's',' 'b'r'a'c'e'l'e't's',' 'a'n'd' 't'i'm'e'l'e's's' 'w'e'd'd'i'n'g' 's't'y'l'i'n'g'.'",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/minimal-bridal-diamond-jewellery-modern-wedding",
    },
};

const articleData: ArticleSection[] = [
    {
        "heading": "'Q'u'i'c'k' 'S'u'm'm'a'r'y'",
        "content": []
    },
    {
        "heading": "'Q'u'i'c'k' 'F'A'Q's'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'N'e'w' 'M'e'a'n'i'n'g' 'o'f' 'B'r'i'd'a'l' 'E'l'e'g'a'n'c'e'",
        "content": []
    },
    {
        "heading": "'W'h'y' 'M'i'n'i'm'a'l' 'B'r'i'd'a'l' 'J'e'w'e'l'l'e'r'y' 'F'e'e'l's' 'S'o' 'P'o'w'e'r'f'u'l'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'E'n'g'a'g'e'm'e'n't' 'R'i'n'g' 'S'e't's' 't'h'e' 'T'o'n'e'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'N'e'c'k'l'a'c'e' 'S'h'o'u'l'd' 'R'e's'p'e'c't' 't'h'e' 'N'e'c'k'l'i'n'e'",
        "content": []
    },
    {
        "heading": "'D'i'a'm'o'n'd' 'E'a'r'r'i'n'g's' 'S'h'o'u'l'd' 'E'n'h'a'n'c'e' 'E'x'p'r'e's's'i'o'n'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'B'r'a'c'e'l'e't' 'I's' 't'h'e' 'D'e't'a'i'l' 'o'f' 't'h'e' 'H'a'n'd's'",
        "content": []
    },
    {
        "heading": "'M'a't'c'h'i'n'g' 'W'i't'h'o'u't' 'L'o'o'k'i'n'g' 'T'o'o' 'M'a't'c'h'e'd'",
        "content": []
    },
    {
        "heading": "'C'h'o'o's'i'n'g' 't'h'e' 'R'i'g'h't' 'M'e't'a'l' 'f'o'r' 'a' 'M'i'n'i'm'a'l' 'B'r'i'd'a'l' 'L'o'o'k'",
        "content": []
    },
    {
        "heading": "'M'i'n'i'm'a'l' 'B'r'i'd'a'l' 'J'e'w'e'l'l'e'r'y' 'P'i'e'c'e's' 'a't' 'a' 'G'l'a'n'c'e'",
        "content": []
    },
    {
        "heading": "'L'e's's' 'J'e'w'e'l'l'e'r'y' 'C'a'n' 'M'e'a'n' 'M'o'r'e' 'L'o'n'g'e'v'i't'y'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'E'm'o't'i'o'n'a'l' 'L'u'x'u'r'y' 'o'f' 'S'i'm'p'l'i'c'i't'y'",
        "content": []
    },
    {
        "heading": "'C'o'm'm'o'n' 'M'i's't'a'k'e's' 't'o' 'A'v'o'i'd' 'W'i't'h' 'M'i'n'i'm'a'l' 'B'r'i'd'a'l' 'J'e'w'e'l'l'e'r'y'",
        "content": []
    },
    {
        "heading": "'F'i'n'a'l' 'T'h'o'u'g'h't':' 'P'r'e's'e'n'c'e' 'O'v'e'r' 'O'r'n'a'm'e'n't'",
        "content": []
    },
    {
        "heading": "'F'i'n'd' 'M'i'n'i'm'a'l' 'B'r'i'd'a'l' 'D'i'a'm'o'n'd' 'J'e'w'e'l'l'e'r'y' 'a't' 'U'n'i'g'l'o' 'J'e'w'e'l's'",
        "content": []
    },
    {
        "heading": "'F'r'e'q'u'e'n't'l'y' 'A's'k'e'd' 'Q'u'e's't'i'o'n's'",
        "content": []
    },
    {
        "heading": "'F'o'r' 'M'o'r'e' 'D'e'a'l's'",
        "content": [
            {
                "type": "paragraph",
                "text": "'A't' 'U'n'i'g'l'o',' 'w'e' 'b'e'l'i'e'v'e' 'a' 'd'i'a'm'o'n'd' 'i's' 'm'o'r'e' 't'h'a'n' 'a' 'g'e'm's't'o'n'e'\u2014'i't' 'i's' 'a' 's'y'm'b'o'l' 'o'f' 'e'l'e'g'a'n'c'e',' 'c'r'a'f't's'm'a'n's'h'i'p',' 'a'n'd' 't'i'm'e'l'e's's' 'v'a'l'u'e'.' 'O'u'r' 'j'o'u'r'n'e'y' 'b'e'g'a'n' 'w'i't'h' 'a' 's'i'n'g'l'e' 'v'i's'i'o'n':' 't'o' 'b'r'i'n'g' 'e't'h'i'c'a'l'l'y' 's'o'u'r'c'e'd',' 'i'n't'e'r'n'a't'i'o'n'a'l'l'y' 'c'e'r't'i'f'i'e'd' 'd'i'a'm'o'n'd's' 't'o' 'p'e'o'p'l'e' 'w'h'o' 'a'p'p'r'e'c'i'a't'e' 't'r'u'e' 'q'u'a'l'i't'y'.' 'E'v'e'r'y' 'U'n'i'g'l'o' 'd'i'a'm'o'n'd' 'i's' 'h'a'n'd'-'s'e'l'e'c't'e'd' 'a'n'd' 'g'r'a'd'e'd' 'b'y' 'w'o'r'l'd'-'r'e'n'o'w'n'e'd' 'i'n's't'i't'u't'i'o'n's' 'l'i'k'e' 'H'R'D',' 'G'I'A' 'a'n'd' 'I'G'I'.'"
            }
        ]
    }
];

const faqData = [
    {
        "question": "'W'h'a't' 'i's' 'm'i'n'i'm'a'l' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y'?'",
        "answer": "'M'i'n'i'm'a'l' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y' 'i's' 's'i'm'p'l'e',' 'r'e'f'i'n'e'd',' 'a'n'd' 'i'n't'e'n't'i'o'n'a'l' 'j'e'w'e'l'l'e'r'y' 'c'h'o's'e'n' 't'o' 'e'n'h'a'n'c'e' 't'h'e' 'b'r'i'd'e'''s' 'l'o'o'k' 'w'i't'h'o'u't' 'o'v'e'r'p'o'w'e'r'i'n'g' 'i't'.' 'I't' 'f'o'c'u's'e's' 'o'n' 'c'l'e'a'n' 'd'e's'i'g'n',' 'q'u'a'l'i't'y' 'd'i'a'm'o'n'd's',' 'a'n'd' 't'i'm'e'l'e's's' 's't'y'l'i'n'g'.'"
    },
    {
        "question": "'W'h'a't' 'd'i'a'm'o'n'd' 'j'e'w'e'l'l'e'r'y' 's'h'o'u'l'd' 'a' 'm'i'n'i'm'a'l' 'b'r'i'd'e' 'w'e'a'r'?'",
        "answer": "'A' 'm'i'n'i'm'a'l' 'b'r'i'd'e' 'c'a'n' 'w'e'a'r' 'a' 'd'i'a'm'o'n'd' 'e'n'g'a'g'e'm'e'n't' 'r'i'n'g',' 'd'e'l'i'c'a't'e' 'p'e'n'd'a'n't',' 'd'i'a'm'o'n'd' 's't'u'd's',' 's'm'a'l'l' 'd'r'o'p' 'e'a'r'r'i'n'g's',' 'a' 's'l'i'm' 'b'r'a'c'e'l'e't',' 'o'r' 'a' 'f'i'n'e' 'd'i'a'm'o'n'd' 'b'a'n'd'.' 'T'h'e' 'b'e's't' 'p'i'e'c'e's' 's'h'o'u'l'd' 'f'e'e'l' 'b'a'l'a'n'c'e'd' 'a'n'd' 'p'e'r's'o'n'a'l'.'"
    },
    {
        "question": "'I's' 'm'i'n'i'm'a'l' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y' 'g'o'o'd' 'f'o'r' 'm'o'd'e'r'n' 'w'e'd'd'i'n'g's'?'",
        "answer": "'Y'e's'.' 'M'i'n'i'm'a'l' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y' 'i's' 'i'd'e'a'l' 'f'o'r' 'm'o'd'e'r'n' 'w'e'd'd'i'n'g's' 'b'e'c'a'u's'e' 'i't' 'f'e'e'l's' 'e'l'e'g'a'n't',' 'c'l'e'a'n',' 't'i'm'e'l'e's's',' 'a'n'd' 'e'a's'y' 't'o' 's't'y'l'e' 'w'i't'h' 'c'o'n't'e'm'p'o'r'a'r'y' 'b'r'i'd'a'l' 'd'r'e's's'e's'.'"
    },
    {
        "question": "'S'h'o'u'l'd' 'a' 'm'i'n'i'm'a'l' 'b'r'i'd'e' 'w'e'a'r' 'a' 'n'e'c'k'l'a'c'e'?'",
        "answer": "'A' 'm'i'n'i'm'a'l' 'b'r'i'd'e' 'c'a'n' 'w'e'a'r' 'a' 'n'e'c'k'l'a'c'e' 'i'f' 'i't' 's'u'i't's' 't'h'e' 'n'e'c'k'l'i'n'e'.' 'A' 'd'e'l'i'c'a't'e' 'd'i'a'm'o'n'd' 'p'e'n'd'a'n't' 'o'r' 'f'i'n'e' 'l'i'n'e' 'n'e'c'k'l'a'c'e' 'w'o'r'k's' 'b'e'a'u't'i'f'u'l'l'y' 'w'i't'h' 'o'p'e'n' 'n'e'c'k'l'i'n'e's',' 'V'-'n'e'c'k's',' 'a'n'd' 's'i'm'p'l'e' 'g'o'w'n's'.'"
    },
    {
        "question": "'A'r'e' 'd'i'a'm'o'n'd' 's't'u'd's' 'g'o'o'd' 'f'o'r' 'b'r'i'd'e's'?'",
        "answer": "'Y'e's'.' 'D'i'a'm'o'n'd' 's't'u'd's' 'a'r'e' 'e'x'c'e'l'l'e'n't' 'f'o'r' 'b'r'i'd'e's' 'b'e'c'a'u's'e' 't'h'e'y' 'b'r'i'g'h't'e'n' 't'h'e' 'f'a'c'e',' 'f'e'e'l' 't'i'm'e'l'e's's',' 'a'n'd' 'k'e'e'p' 'a't't'e'n't'i'o'n' 'o'n' 'e'x'p'r'e's's'i'o'n' 'r'a't'h'e'r' 't'h'a'n' 'o'v'e'r'p'o'w'e'r'i'n'g' 't'h'e' 'l'o'o'k'.'"
    },
    {
        "question": "'W'h'a't' 'b'r'a'c'e'l'e't' 's'h'o'u'l'd' 'a' 'm'i'n'i'm'a'l' 'b'r'i'd'e' 'w'e'a'r'?'",
        "answer": "'A' 's'l'i'm' 'd'i'a'm'o'n'd' 'b'r'a'c'e'l'e't',' 'd'e'l'i'c'a't'e' 't'e'n'n'i's' 'b'r'a'c'e'l'e't',' 'o'r' 's'i'n'g'l'e'-'s't'o'n'e' 'b'r'a'c'e'l'e't' 'w'o'r'k's' 'w'e'l'l' 'f'o'r' 'a' 'm'i'n'i'm'a'l' 'b'r'i'd'e'.' 'I't' 'a'd'd's' 's'o'f't' 's'p'a'r'k'l'e' 't'o' 't'h'e' 'h'a'n'd's' 'w'i't'h'o'u't' 'f'e'e'l'i'n'g' 'h'e'a'v'y'.'"
    },
    {
        "question": "'S'h'o'u'l'd' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y' 'm'a't'c'h' 'e'x'a'c't'l'y'?'",
        "answer": "'N'o'.' 'B'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y' 'd'o'e's' 'n'o't' 'n'e'e'd' 't'o' 'm'a't'c'h' 'e'x'a'c't'l'y'.' 'M'o'd'e'r'n' 's't'y'l'i'n'g' 'o'f't'e'n' 'l'o'o'k's' 'b'e't't'e'r' 'w'h'e'n' 'p'i'e'c'e's' 'c'o'm'p'l'e'm'e'n't' 'e'a'c'h' 'o't'h'e'r' 't'h'r'o'u'g'h' 't'o'n'e',' 'p'r'o'p'o'r't'i'o'n',' 'o'r' 'm'o'o'd' 'r'a't'h'e'r' 't'h'a'n' 'r'e'p'e'a't'i'n'g' 't'h'e' 's'a'm'e' 'd'e's'i'g'n'.'"
    },
    {
        "question": "'W'h'a't' 'm'e't'a'l' 'i's' 'b'e's't' 'f'o'r' 'm'i'n'i'm'a'l' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y'?'",
        "answer": "'Y'e'l'l'o'w' 'g'o'l'd' 'f'e'e'l's' 'w'a'r'm' 'a'n'd' 'r'o'm'a'n't'i'c',' 'w'h'i't'e' 'g'o'l'd' 'o'r' 'p'l'a't'i'n'u'm' 'f'e'e'l's' 'c'l'e'a'n' 'a'n'd' 'm'o'd'e'r'n',' 'a'n'd' 'r'o's'e' 'g'o'l'd' 'f'e'e'l's' 's'o'f't' 'a'n'd' 'f'e'm'i'n'i'n'e'.' 'T'h'e' 'b'e's't' 'm'e't'a'l' 'd'e'p'e'n'd's' 'o'n' 't'h'e' 'b'r'i'd'e'''s' 'd'r'e's's',' 's'k'i'n' 't'o'n'e',' 'a'n'd' 'p'e'r's'o'n'a'l' 's't'y'l'e'.'"
    },
    {
        "question": "'C'a'n' 'm'i'n'i'm'a'l' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y' 'b'e' 'w'o'r'n' 'a'f't'e'r' 't'h'e' 'w'e'd'd'i'n'g'?'",
        "answer": "'Y'e's'.' 'M'i'n'i'm'a'l' 'b'r'i'd'a'l' 'j'e'w'e'l'l'e'r'y' 'i's' 'o'f't'e'n' 'e'a's'i'e'r' 't'o' 'w'e'a'r' 'a'f't'e'r' 't'h'e' 'w'e'd'd'i'n'g' 'b'e'c'a'u's'e' 't'h'e' 'p'i'e'c'e's' 'a'r'e' 'r'e'f'i'n'e'd',' 'v'e'r's'a't'i'l'e',' 'a'n'd' 's'u'i't'a'b'l'e' 'f'o'r' 'e'v'e'r'y'd'a'y' 'o'r' 'o'c'c'a's'i'o'n' 's't'y'l'i'n'g'.'"
    },
    {
        "question": "'W'h'y' 'c'h'o'o's'e' 'U'n'i'g'l'o' 'J'e'w'e'l's' 'f'o'r' 'b'r'i'd'a'l' 'd'i'a'm'o'n'd' 'j'e'w'e'l'l'e'r'y'?'",
        "answer": "'U'n'i'g'l'o' 'J'e'w'e'l's' 'c'r'e'a't'e's' 'b'r'i'd'a'l' 'd'i'a'm'o'n'd' 'j'e'w'e'l'l'e'r'y' 'w'i't'h' 'r'e'f'i'n'e'd' 'd'e's'i'g'n',' 't'h'o'u'g'h't'f'u'l' 'c'r'a'f't's'm'a'n's'h'i'p',' 'a'n'd' 'l'a's't'i'n'g' 'm'e'a'n'i'n'g'.' 'T'h'e' 'p'i'e'c'e's' 'a'r'e' 'm'a'd'e' 't'o' 'e'n'h'a'n'c'e' 't'h'e' 'w'e'd'd'i'n'g' 'd'a'y' 'a'n'd' 'r'e'm'a'i'n' 'w'e'a'r'a'b'l'e' 'f'o'r' 'y'e'a'r's' 'a'f't'e'r'.'"
    }
];

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

const BlogPage = () => {
    return (
        <div className="min-h-screen mb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 relative">
                <div className="flex-1 w-full lg:w-2/3">
                    <h1 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold text-[#1f2732] mb-6">
                        'M'i'n'i'm'a'l' 'B'r'i'd'e',' 'M'a'x'i'm'u'm' 'I'm'p'a'c't':' 'D'i'a'm'o'n'd' 'J'e'w'e'l'l'e'r'y' 'f'o'r' 't'h'e' 'M'o'd'e'r'n' 'W'e'd'd'i'n'g' 'A'e's't'h'e't'i'c'
                    </h1>
                    <DynamicArticle sections={articleData} />
                    {faqData.length > 0 && (
                        <FAQSection
                            faqs={faqData}
                            title="Frequently Asked Questions"
                            className="mt-12"
                        />
                    )}
                </div>
                <EducationSidebar className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit" />
            </div>
        </div>
    );
};

export default BlogPage;
