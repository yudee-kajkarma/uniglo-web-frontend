import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "'N'a't'u'r'a'l' 'v's' 'L'a'b'-'C'r'e'a't'e'd' 'D'i'a'm'o'n'd's':' 'T'w'o' 'O'r'i'g'i'n's',' 'O'n'e' 'E'm'o't'i'o'n'",
    description: "'U'n'd'e'r's't'a'n'd' 't'h'e' 'd'i'f'f'e'r'e'n'c'e' 'b'e't'w'e'e'n' 'n'a't'u'r'a'l' 'a'n'd' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'i'n' 'a' 'c'l'e'a'r',' 'h'u'm'a'n' 'g'u'i'd'e'.' 'E'x'p'l'o'r'e' 'h'o'w' 'b'o't'h' 'o'r'i'g'i'n's' 'c'a'n' 'c'a'r'r'y' 'b'e'a'u't'y',' 'm'e'a'n'i'n'g',' 'a'n'd' 'e'm'o't'i'o'n'.'",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/natural-vs-lab-created-diamonds-two-origins-one-emotion",
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
        "heading": "'A' 'D'i'a'm'o'n'd' 'B'e'g'i'n's' 'B'e'f'o'r'e' 'I't' 'R'e'a'c'h'e's' 'Y'o'u'",
        "content": []
    },
    {
        "heading": "'N'a't'u'r'a'l' 'D'i'a'm'o'n'd's':' 'T'h'e' 'B'e'a'u't'y' 'o'f' 'T'i'm'e'",
        "content": []
    },
    {
        "heading": "'L'a'b'-'C'r'e'a't'e'd' 'D'i'a'm'o'n'd's':' 'T'h'e' 'B'e'a'u't'y' 'o'f' 'I'n't'e'n't'i'o'n'",
        "content": []
    },
    {
        "heading": "'N'a't'u'r'a'l' 'v's' 'L'a'b'-'C'r'e'a't'e'd' 'D'i'a'm'o'n'd's':' 'A' 'S'i'm'p'l'e' 'C'o'm'p'a'r'i's'o'n'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'D'i'f'f'e'r'e'n'c'e' 'I's' 'O'r'i'g'i'n',' 'N'o't' 'E'm'o't'i'o'n'",
        "content": []
    },
    {
        "heading": "'C'r'a'f't's'm'a'n's'h'i'p' 'M'a't't'e'r's' 'i'n' 'B'o't'h'",
        "content": []
    },
    {
        "heading": "'W'h'a't' 'P'e'o'p'l'e' 'R'e'a'l'l'y' 'N'o't'i'c'e' 'F'i'r's't'",
        "content": []
    },
    {
        "heading": "'H'o'w' 't'o' 'C'h'o'o's'e' 'B'e't'w'e'e'n' 'a' 'N'a't'u'r'a'l' 'a'n'd' 'L'a'b'-'C'r'e'a't'e'd' 'D'i'a'm'o'n'd'",
        "content": []
    },
    {
        "heading": "'W'h'y' 'B'o't'h' 'C'a'n' 'B'e'c'o'm'e' 'M'e'a'n'i'n'g'f'u'l'",
        "content": []
    },
    {
        "heading": "'C'a'n' 'B'o't'h' 'B'e'c'o'm'e' 'H'e'i'r'l'o'o'm's'?'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'S'a'm'e' 'L'i'g'h't',' 't'h'e' 'S'a'm'e' 'F'e'e'l'i'n'g'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'F'u't'u'r'e' 'o'f' 'D'i'a'm'o'n'd' 'J'e'w'e'l'r'y' 'I's' 'P'e'r's'o'n'a'l'",
        "content": []
    },
    {
        "heading": "'T'w'o' 'O'r'i'g'i'n's',' 'O'n'e' 'E'm'o't'i'o'n'",
        "content": []
    },
    {
        "heading": "'F'i'n'd' 't'h'e' 'D'i'a'm'o'n'd' 'O'r'i'g'i'n' 'T'h'a't' 'F'e'e'l's' 'L'i'k'e' 'Y'o'u'r's'",
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
        "question": "'A'r'e' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'r'e'a'l' 'd'i'a'm'o'n'd's'?'",
        "answer": "'Y'e's'.' 'L'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'c'a'n' 'b'e' 'r'e'a'l' 'd'i'a'm'o'n'd's' 'w'h'e'n' 't'h'e'y' 'h'a'v'e' 't'h'e' 's'a'm'e' 'd'i'a'm'o'n'd' 's't'r'u'c't'u'r'e' 'a'n'd' 'p'r'o'p'e'r't'i'e's' 'a's' 'n'a't'u'r'a'l' 'd'i'a'm'o'n'd's'.' 'T'h'e'i'r' 'm'a'i'n' 'd'i'f'f'e'r'e'n'c'e' 'i's' 'o'r'i'g'i'n'.'"
    },
    {
        "question": "'W'h'a't' 'i's' 't'h'e' 'd'i'f'f'e'r'e'n'c'e' 'b'e't'w'e'e'n' 'n'a't'u'r'a'l' 'a'n'd' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's'?'",
        "answer": "'N'a't'u'r'a'l' 'd'i'a'm'o'n'd's' 'f'o'r'm' 'd'e'e'p' 'i'n's'i'd'e' 't'h'e' 'e'a'r't'h' 'o'v'e'r' 't'i'm'e'.' 'L'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'a'r'e' 'g'r'o'w'n' 'i'n' 'c'o'n't'r'o'l'l'e'd' 'e'n'v'i'r'o'n'm'e'n't's' 'u's'i'n'g' 'a'd'v'a'n'c'e'd' 't'e'c'h'n'o'l'o'g'y'.' 'B'o't'h' 'c'a'n' 'b'e' 'b'e'a'u't'i'f'u'l',' 'b'u't' 't'h'e'y' 'b'e'g'i'n' 'i'n' 'd'i'f'f'e'r'e'n't' 'p'l'a'c'e's'.'"
    },
    {
        "question": "'D'o' 'n'a't'u'r'a'l' 'a'n'd' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'l'o'o'k' 't'h'e' 's'a'm'e'?'",
        "answer": "'C'o'm'p'a'r'a'b'l'e' 'n'a't'u'r'a'l' 'a'n'd' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'c'a'n' 'l'o'o'k' 'v'e'r'y' 's'i'm'i'l'a'r' 't'o' 't'h'e' 'n'a'k'e'd' 'e'y'e'.' 'T'h'e'i'r' 's'p'a'r'k'l'e' 'd'e'p'e'n'd's' 's't'r'o'n'g'l'y' 'o'n' 'c'u't',' 'q'u'a'l'i't'y',' 'a'n'd' 'c'r'a'f't's'm'a'n's'h'i'p'.'"
    },
    {
        "question": "'W'h'i'c'h' 'i's' 'b'e't't'e'r',' 'n'a't'u'r'a'l' 'o'r' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's'?'",
        "answer": "'N'e'i't'h'e'r' 'i's' 'b'e't't'e'r' 'f'o'r' 'e'v'e'r'y'o'n'e'.' 'N'a't'u'r'a'l' 'd'i'a'm'o'n'd's' 'm'a'y' 's'u'i't' 'p'e'o'p'l'e' 'w'h'o' 'v'a'l'u'e' 'r'a'r'i't'y' 'a'n'd' 't'r'a'd'i't'i'o'n'.' 'L'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'm'a'y' 's'u'i't' 'p'e'o'p'l'e' 'w'h'o' 'v'a'l'u'e' 'i'n'n'o'v'a't'i'o'n',' 'm'o'd'e'r'n' 'c'h'o'i'c'e',' 'a'n'd' 'd'e's'i'g'n' 'f'l'e'x'i'b'i'l'i't'y'.'"
    },
    {
        "question": "'D'o' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 's'p'a'r'k'l'e' 'l'i'k'e' 'n'a't'u'r'a'l' 'd'i'a'm'o'n'd's'?'",
        "answer": "'Y'e's'.' 'L'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'c'a'n' 's'p'a'r'k'l'e' 'b'e'a'u't'i'f'u'l'l'y' 'w'h'e'n' 't'h'e'y' 'a'r'e' 'w'e'l'l' 'c'u't'.' 'L'i'k'e' 'n'a't'u'r'a'l' 'd'i'a'm'o'n'd's',' 't'h'e'i'r' 'b'r'i'l'l'i'a'n'c'e' 'd'e'p'e'n'd's' 'o'n' 'c'u't' 'q'u'a'l'i't'y' 'a'n'd' 'f'i'n'i's'h'i'n'g'.'"
    },
    {
        "question": "'A'r'e' 'n'a't'u'r'a'l' 'd'i'a'm'o'n'd's' 'm'o'r'e' 'm'e'a'n'i'n'g'f'u'l' 't'h'a'n' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's'?'",
        "answer": "'N'o't' 'a'l'w'a'y's'.' 'N'a't'u'r'a'l' 'd'i'a'm'o'n'd's' 'c'a'r'r'y' 't'h'e' 'm'e'a'n'i'n'g' 'o'f' 't'i'm'e' 'a'n'd' 'r'a'r'i't'y',' 'b'u't' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'c'a'n' 'c'a'r'r'y' 'j'u's't' 'a's' 'm'u'c'h' 'e'm'o't'i'o'n'a'l' 'm'e'a'n'i'n'g' 'w'h'e'n' 'c'h'o's'e'n' 'f'o'r' 'a' 's'p'e'c'i'a'l' 'm'o'm'e'n't'.'"
    },
    {
        "question": "'C'a'n' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'b'e' 'u's'e'd' 'f'o'r' 'e'n'g'a'g'e'm'e'n't' 'r'i'n'g's'?'",
        "answer": "'Y'e's'.' 'L'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'a'r'e' 'o'f't'e'n' 'c'h'o's'e'n' 'f'o'r' 'e'n'g'a'g'e'm'e'n't' 'r'i'n'g's' 'b'e'c'a'u's'e' 't'h'e'y' 'c'a'n' 'r'e'p'r'e's'e'n't' 'l'o'v'e',' 'c'o'm'm'i't'm'e'n't',' 'a'n'd' 'm'o'd'e'r'n' 'i'n't'e'n't'i'o'n'.'"
    },
    {
        "question": "'C'a'n' 'b'o't'h' 'n'a't'u'r'a'l' 'a'n'd' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'b'e'c'o'm'e' 'h'e'i'r'l'o'o'm's'?'",
        "answer": "'Y'e's'.' 'A' 'd'i'a'm'o'n'd' 'b'e'c'o'm'e's' 'a'n' 'h'e'i'r'l'o'o'm' 't'h'r'o'u'g'h' 'm'e'm'o'r'y',' 'l'o'v'e',' 'a'n'd' 'e'm'o't'i'o'n'a'l' 'v'a'l'u'e'.' 'B'o't'h' 'n'a't'u'r'a'l' 'a'n'd' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's' 'c'a'n' 'b'e'c'o'm'e' 'm'e'a'n'i'n'g'f'u'l' 'h'e'i'r'l'o'o'm' 'p'i'e'c'e's'.'"
    },
    {
        "question": "'H'o'w' 'd'o' 'I' 'c'h'o'o's'e' 'b'e't'w'e'e'n' 'a' 'n'a't'u'r'a'l' 'a'n'd' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd'?'",
        "answer": "'C'h'o'o's'e' 'b'a's'e'd' 'o'n' 'w'h'a't' 'm'a't't'e'r's' 'm'o's't' 't'o' 'y'o'u'.' 'I'f' 'y'o'u' 'l'o'v'e' 'n'a't'u'r'a'l' 'o'r'i'g'i'n' 'a'n'd' 'r'a'r'i't'y',' 'a' 'n'a't'u'r'a'l' 'd'i'a'm'o'n'd' 'm'a'y' 'f'e'e'l' 'r'i'g'h't'.' 'I'f' 'y'o'u' 'l'o'v'e' 'i'n'n'o'v'a't'i'o'n' 'a'n'd' 'm'o'd'e'r'n' 'd'e's'i'g'n',' 'a' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd' 'm'a'y' 'b'e' 'a' 'b'e't't'e'r' 'f'i't'.'"
    },
    {
        "question": "'W'h'y' 'c'h'o'o's'e' 'U'n'i'g'l'o' 'J'e'w'e'l's' 'f'o'r' 'd'i'a'm'o'n'd' 'j'e'w'e'l'r'y'?'",
        "answer": "'U'n'i'g'l'o' 'J'e'w'e'l's' 'h'e'l'p's' 'y'o'u' 'c'h'o'o's'e' 'd'i'a'm'o'n'd' 'j'e'w'e'l'r'y' 'w'i't'h' 'c'l'a'r'i't'y',' 'b'e'a'u't'y',' 'a'n'd' 'm'e'a'n'i'n'g'.' 'W'h'e't'h'e'r' 'y'o'u' 'p'r'e'f'e'r' 'n'a't'u'r'a'l' 'o'r' 'l'a'b'-'c'r'e'a't'e'd' 'd'i'a'm'o'n'd's',' 't'h'e' 'g'o'a'l' 'i's' 't'o' 'f'i'n'd' 'a' 'p'i'e'c'e' 't'h'a't' 'f'e'e'l's' 'p'e'r's'o'n'a'l',' 'e'l'e'g'a'n't',' 'a'n'd' 'l'a's't'i'n'g'.'"
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
                        'T'h'e' 'J'o'u'r'n'e'y' 'o'f' 'B'r'i'l'l'i'a'n'c'e':' 'F'r'o'm' 'E'a'r't'h'-'F'o'r'm'e'd' 't'o' 'L'a'b'-'C'r'e'a't'e'd' 'D'i'a'm'o'n'd's'
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
