import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "'U'n'i'g'l'o'''s' '2'5't'h' 'A'n'n'i'v'e'r's'a'r'y':' 'D'i'a'm'o'n'd's',' 'M'e'm'o'r'i'e's' '&' 'L'e'g'a'c'y'",
    description: "'U'n'i'g'l'o'''s' '2'5't'h' 'a'n'n'i'v'e'r's'a'r'y' 'c'e'l'e'b'r'a't'e'd' '2'5' 'y'e'a'r's' 'o'f' 'd'i'a'm'o'n'd's',' 'c'r'a'f't's'm'a'n's'h'i'p',' 'g'l'o'b'a'l' 'r'e'l'a't'i'o'n's'h'i'p's',' 'f'a'm'i'l'y' 'v'a'l'u'e's',' 'a'n'd' 'm'e'a'n'i'n'g'f'u'l' 'c'o'n'n'e'c't'i'o'n's'.'",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/uniglo-25th-anniversary-diamonds-memories-legacy",
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
        "heading": "'A' 'C'e'l'e'b'r'a't'i'o'n' 'M'e'a's'u'r'e'd' 'i'n' 'P'e'o'p'l'e',' 'N'o't' 'J'u's't' 'Y'e'a'r's'",
        "content": []
    },
    {
        "heading": "'A' 'R'o'o'm' 'T'h'a't' 'B'r'o'u'g'h't' 't'h'e' 'W'o'r'l'd' 'T'o'g'e't'h'e'r'",
        "content": []
    },
    {
        "heading": "'M'o'r'e' 'T'h'a'n' 'a' 'C'o'm'p'a'n'y',' 'A' 'F'a'm'i'l'y' 'S't'o'r'y'",
        "content": []
    },
    {
        "heading": "'H'o'n'o'r'i'n'g' 't'h'e' 'H'a'n'd's' 'B'e'h'i'n'd' 't'h'e' 'B'r'i'l'l'i'a'n'c'e'",
        "content": []
    },
    {
        "heading": "'A' 'G'r'a'c'e'f'u'l' 'I'n't'e'r'n'a't'i'o'n'a'l' 'P'r'e's'e'n'c'e'",
        "content": []
    },
    {
        "heading": "'A' 'C'e'l'e'b'r'a't'i'o'n' 'W'i't'h' 'P'u'r'p'o's'e'",
        "content": []
    },
    {
        "heading": "'M'o'm'e'n't's' 'T'h'a't' 'B'e'c'a'm'e' 'M'e'm'o'r'i'e's'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'M'e'a'n'i'n'g' 'o'f' '2'5' 'Y'e'a'r's'",
        "content": []
    },
    {
        "heading": "'A' 'B'r'a'n'd' 'S't'o'r'y' 'T'o'l'd' 'T'h'r'o'u'g'h' 'P'e'o'p'l'e'",
        "content": []
    },
    {
        "heading": "'A' 'C'l'o's'i'n'g' 'T'h'o'u'g'h't'",
        "content": []
    },
    {
        "heading": "'C'e'l'e'b'r'a't'i'n'g' 't'h'e' 'N'e'x't' 'C'h'a'p't'e'r' 'o'f' 'U'n'i'g'l'o'",
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
        "question": "'W'h'a't' 'w'a's' 'U'n'i'g'l'o'''s' '2'5't'h' 'a'n'n'i'v'e'r's'a'r'y' 'c'e'l'e'b'r'a't'i'o'n' 'a'b'o'u't'?'",
        "answer": "'U'n'i'g'l'o'''s' '2'5't'h' 'a'n'n'i'v'e'r's'a'r'y' 'c'e'l'e'b'r'a't'e'd' 't'h'e' 'b'r'a'n'd'''s' 'j'o'u'r'n'e'y',' 'c'r'a'f't's'm'a'n's'h'i'p',' 'f'a'm'i'l'y' 'v'a'l'u'e's',' 'g'l'o'b'a'l' 'p'a'r't'n'e'r's'h'i'p's',' 'a'n'd' 't'h'e' 'r'e'l'a't'i'o'n's'h'i'p's' 'b'u'i'l't' 'o'v'e'r' '2'5' 'y'e'a'r's'.'"
    },
    {
        "question": "'H'o'w' 'd'i'd' 'U'n'i'g'l'o'''s' '2'5't'h' 'a'n'n'i'v'e'r's'a'r'y' 'b'e'g'i'n'?'",
        "answer": "'T'h'e' 'e'v'e'n'i'n'g' 'b'e'g'a'n' 'w'i't'h' 'a' 'G'a'n'e's'h' 'V'a'n'd'a'n'a',' 'w'h'i'c'h' 'c'r'e'a't'e'd' 'a' 'p'e'a'c'e'f'u'l' 'a'n'd' 'm'e'a'n'i'n'g'f'u'l' 'o'p'e'n'i'n'g' 'f'o'r' 't'h'e' 'c'e'l'e'b'r'a't'i'o'n'.'"
    },
    {
        "question": "'W'h'o' 'a't't'e'n'd'e'd' 'U'n'i'g'l'o'''s' '2'5't'h' 'a'n'n'i'v'e'r's'a'r'y' 'e'v'e'n't'?'",
        "answer": "'T'h'e' 'c'e'l'e'b'r'a't'i'o'n' 'b'r'o'u'g'h't' 't'o'g'e't'h'e'r' 'p'a'r't'n'e'r's',' 'c'l'i'e'n't's',' 'w'e'l'l'-'w'i's'h'e'r's',' 'a'r't'i's'a'n's',' 'c'o'l'l'a'b'o'r'a't'o'r's',' 'f'a'm'i'l'y' 'm'e'm'b'e'r's',' 'a'n'd' 'i'n't'e'r'n'a't'i'o'n'a'l' 'g'u'e's't's' 'f'r'o'm' 'I'n'd'i'a',' 'B'e'l'g'i'u'm',' 't'h'e' 'U'n'i't'e'd' 'S't'a't'e's',' 't'h'e' 'M'i'd'd'l'e' 'E'a's't',' 'a'n'd' 'E'u'r'o'p'e'.'"
    },
    {
        "question": "'W'h'y' 'w'a's' 't'h'e' 'e'v'e'n't' 'm'e'a'n'i'n'g'f'u'l'?'",
        "answer": "'T'h'e' 'e'v'e'n't' 'w'a's' 'm'e'a'n'i'n'g'f'u'l' 'b'e'c'a'u's'e' 'i't' 'h'o'n'o'r'e'd' 'n'o't' 'o'n'l'y' 'U'n'i'g'l'o'''s' 'b'u's'i'n'e's's' 's'u'c'c'e's's',' 'b'u't' 'a'l's'o' 't'h'e' 'p'e'o'p'l'e',' 'r'e'l'a't'i'o'n's'h'i'p's',' 's'a'c'r'i'f'i'c'e's',' 'a'n'd' 'c'r'a'f't's'm'a'n's'h'i'p' 'b'e'h'i'n'd' 't'h'e' 'b'r'a'n'd'''s' 'j'o'u'r'n'e'y'.'"
    },
    {
        "question": "'W'h'a't' 'r'o'l'e' 'd'i'd' 'f'a'm'i'l'y' 'p'l'a'y' 'i'n' 't'h'e' 'c'e'l'e'b'r'a't'i'o'n'?'",
        "answer": "'F'a'm'i'l'y' 'p'l'a'y'e'd' 'a'n' 'i'm'p'o'r't'a'n't' 'r'o'l'e' 'i'n' 't'h'e' 'e'v'e'n'i'n'g',' 'e's'p'e'c'i'a'l'l'y' 'w'h'e'n' 't'h'e' 'f'o'u'n'd'e'r'''s' 'd'a'u'g'h't'e'r' 's'h'a'r'e'd' 't'h'e' 'p'e'r's'o'n'a'l' 's'i'd'e' 'o'f' 'U'n'i'g'l'o'''s' 'j'o'u'r'n'e'y',' 'i'n'c'l'u'd'i'n'g' 't'h'e' 's'a'c'r'i'f'i'c'e's' 'a'n'd' 'd'e'd'i'c'a't'i'o'n' 'b'e'h'i'n'd' 'b'u'i'l'd'i'n'g' 't'h'e' 'b'r'a'n'd'.'"
    },
    {
        "question": "'W'h'y' 'w'e'r'e' 'a'r't'i's'a'n's' 'r'e'c'o'g'n'i'z'e'd' 'd'u'r'i'n'g' 't'h'e' 'c'e'l'e'b'r'a't'i'o'n'?'",
        "answer": "'A'r't'i's'a'n's' 'w'e'r'e' 'r'e'c'o'g'n'i'z'e'd' 'b'e'c'a'u's'e' 't'h'e'i'r' 's'k'i'l'l',' 'p'a't'i'e'n'c'e',' 'a'n'd' 'c'r'a'f't's'm'a'n's'h'i'p' 'h'e'l'p' 't'r'a'n's'f'o'r'm' 'd'i'a'm'o'n'd's' 'i'n't'o' 'm'e'a'n'i'n'g'f'u'l' 'j'e'w'e'l'r'y'.' 'T'h'e'i'r' 'w'o'r'k' 'i's' 'a'n' 'e's's'e'n't'i'a'l' 'p'a'r't' 'o'f' 'U'n'i'g'l'o'''s' 'b'r'i'l'l'i'a'n'c'e'.'"
    },
    {
        "question": "'W'h'a't' 'w'a's' 'U'n'i'g'l'o'''s' 's'o'c'i'a'l' 'r'e's'p'o'n's'i'b'i'l'i't'y' 'm'e's's'a'g'e'?'",
        "answer": "'U'n'i'g'l'o' 's'h'a'r'e'd' 'i't's' 'c'o'm'm'i't'm'e'n't' 't'o' 's'u'p'p'o'r't'i'n'g' 'e'd'u'c'a't'i'o'n' 'a'n'd' 's'k'i'l'l'-'b'u'i'l'd'i'n'g' 'i'n'i't'i'a't'i'v'e's' 'f'o'r' 'w'o'm'e'n' 'a'n'd' 'y'o'u'n'g' 'a'r't'i's'a'n's',' 'e's'p'e'c'i'a'l'l'y' 'i'n' 'u'n'd'e'r'p'r'i'v'i'l'e'g'e'd' 'c'o'm'm'u'n'i't'i'e's' 'a'c'r'o's's' 'I'n'd'i'a' 'a'n'd' 'E'u'r'o'p'e'.'"
    },
    {
        "question": "'W'h'a't' 'm'a'd'e' 't'h'e' 'c'e'l'e'b'r'a't'i'o'n' 'f'e'e'l' 'p'e'r's'o'n'a'l'?'",
        "answer": "'T'h'e' 'c'e'l'e'b'r'a't'i'o'n' 'f'e'l't' 'p'e'r's'o'n'a'l' 'b'e'c'a'u's'e' 'i't' 'f'o'c'u's'e'd' 'o'n' 'g'r'a't'i't'u'd'e',' 's'h'a'r'e'd' 'm'e'm'o'r'i'e's',' 'l'o'n'g'-'s't'a'n'd'i'n'g' 'r'e'l'a't'i'o'n's'h'i'p's',' 'f'a'm'i'l'y' 'v'a'l'u'e's',' 'a'n'd' 't'h'e' 'p'e'o'p'l'e' 'w'h'o' 'h'e'l'p'e'd' 'b'u'i'l'd' 'U'n'i'g'l'o'''s' 'j'o'u'r'n'e'y'.'"
    },
    {
        "question": "'W'h'a't' 'd'o'e's' '2'5' 'y'e'a'r's' 'm'e'a'n' 'f'o'r' 'U'n'i'g'l'o'?'",
        "answer": "'F'o'r' 'U'n'i'g'l'o',' '2'5' 'y'e'a'r's' 'r'e'p'r'e's'e'n't's' 'm'o'r'e' 't'h'a'n' 'a' 'b'u's'i'n'e's's' 'm'i'l'e's't'o'n'e'.' 'I't' 'r'e'f'l'e'c't's' 't'r'u's't',' 'c'r'a'f't's'm'a'n's'h'i'p',' 'g'l'o'b'a'l' 'r'e'l'a't'i'o'n's'h'i'p's',' 'f'a'm'i'l'y' 's'u'p'p'o'r't',' 'a'n'd' 'a' 'l'e'g'a'c'y' 'b'u'i'l't' 't'h'r'o'u'g'h' 'p'e'o'p'l'e'.'"
    },
    {
        "question": "'W'h'a't' 'i's' 't'h'e' 'n'e'x't' 'c'h'a'p't'e'r' 'f'o'r' 'U'n'i'g'l'o'?'",
        "answer": "'U'n'i'g'l'o'''s' 'n'e'x't' 'c'h'a'p't'e'r' 'i's' 'a'b'o'u't' 'c'o'n't'i'n'u'i'n'g' 't'o' 'c'r'e'a't'e' 'm'e'a'n'i'n'g'f'u'l' 'd'i'a'm'o'n'd' 'j'e'w'e'l'r'y',' 'h'o'n'o'r'i'n'g' 'c'r'a'f't's'm'a'n's'h'i'p',' 's'u'p'p'o'r't'i'n'g' 'c'o'm'm'u'n'i't'i'e's',' 'a'n'd' 'b'u'i'l'd'i'n'g' 'l'a's't'i'n'g' 'r'e'l'a't'i'o'n's'h'i'p's' 'a'c'r'o's's' 't'h'e' 'w'o'r'l'd'.'"
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
                        'U'n'i'g'l'o'''s' '2'5' 'Y'e'a'r's':' 'A'n' 'E'v'e'n'i'n'g' 'W'h'e'r'e' 'M'e'm'o'r'i'e's' 'W'o'r'e' 'D'i'a'm'o'n'd's'
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
