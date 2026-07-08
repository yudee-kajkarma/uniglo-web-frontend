import React from "react";
import { Metadata } from "next";
import EducationSidebar from "@/components/shared/EducationSidebar";
import DynamicArticle, {
    ArticleSection,
} from "@/components/shared/DynamicArticle";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = {
    title: "'M'o'd'e'r'n' 'H'e'i'r'l'o'o'm' 'J'e'w'e'l'r'y' 'D'e's'i'g'n'e'd' 't'o' 'L'a's't' 'G'e'n'e'r'a't'i'o'n's'",
    description: "'D'i's'c'o'v'e'r' 'w'h'a't' 'm'a'k'e's' 'm'o'd'e'r'n' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y' 'm'e'a'n'i'n'g'f'u'l',' 't'i'm'e'l'e's's',' 'a'n'd' 'w'o'r't'h'y' 'o'f' 'b'e'i'n'g' 'p'a's's'e'd' 'd'o'w'n' 't'h'r'o'u'g'h' 'g'e'n'e'r'a't'i'o'n's' 'w'i't'h' 'U'n'i'g'l'o' 'J'e'w'e'l's'.'",
    alternates: {
        canonical: "https://www.uniglodiamonds.com/blogs/modern-heirloom-jewelry-designed-to-last",
    },
};

const articleData: ArticleSection[] = [
    {
        "heading": "'Q'u'i'c'k' 'A'n's'w'e'r':' 'W'h'a't' 'I's' 'M'o'd'e'r'n' 'H'e'i'r'l'o'o'm' 'J'e'w'e'l'r'y'?'",
        "content": []
    },
    {
        "heading": "'Q'u'i'c'k' 'F'A'Q's'",
        "content": []
    },
    {
        "heading": "'J'e'w'e'l'r'y' 'T'h'a't' 'O'u't'l'i'v'e's' 'T'r'e'n'd's'",
        "content": []
    },
    {
        "heading": "'W'h'a't' 'M'a'k'e's' 'J'e'w'e'l'r'y' 'a'n' 'H'e'i'r'l'o'o'm'?'",
        "content": []
    },
    {
        "heading": "'M'o'd'e'r'n' 'H'e'i'r'l'o'o'm' 'J'e'w'e'l'r'y' 'v's' 'T'r'e'n'd' 'J'e'w'e'l'r'y'",
        "content": []
    },
    {
        "heading": "'C'r'a'f't's'm'a'n's'h'i'p' 'T'h'a't' 'C'a'n' 'O'u't'l'i'v'e' 'T'i'm'e'",
        "content": []
    },
    {
        "heading": "'T'i'm'e'l'e's's' 'D'e's'i'g'n' 'I's' 't'h'e' 'F'o'u'n'd'a't'i'o'n' 'o'f' 'a'n' 'H'e'i'r'l'o'o'm'",
        "content": []
    },
    {
        "heading": "'M'e'm'o'r'y' 'W'o'v'e'n' 'I'n't'o' 'M'e't'a'l'",
        "content": []
    },
    {
        "heading": "'J'e'w'e'l'r'y' 'D'e's'i'g'n'e'd' 'f'o'r' 'E'v'o'l'u't'i'o'n'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'B'e's't' 'J'e'w'e'l'r'y' 'P'i'e'c'e's' 't'o' 'P'a's's' 'D'o'w'n'",
        "content": []
    },
    {
        "heading": "'A' 'N'e'w' 'W'a'y' 't'o' 'T'h'i'n'k' 'A'b'o'u't' 'L'u'x'u'r'y'",
        "content": []
    },
    {
        "heading": "'T'h'e' 'E'm'o't'i'o'n'a'l' 'I'n'v'e's't'm'e'n't' 'o'f' 'H'e'i'r'l'o'o'm' 'J'e'w'e'l'r'y'",
        "content": []
    },
    {
        "heading": "'B'e'y'o'n'd' 'R'e'p'l'a'c'e'm'e'n't' 'C'u'l't'u'r'e'",
        "content": []
    },
    {
        "heading": "'H'o'w' 't'o' 'C'h'o'o's'e' 'J'e'w'e'l'r'y' 'T'h'a't' 'C'a'n' 'B'e'c'o'm'e' 'a'n' 'H'e'i'r'l'o'o'm'",
        "content": []
    },
    {
        "heading": "'J'e'w'e'l'r'y' 'T'h'a't' 'B'e'c'o'm'e's' 'F'a'm'i'l'y'",
        "content": []
    },
    {
        "heading": "'B'u'i'l'd' 'Y'o'u'r' 'M'o'd'e'r'n' 'H'e'i'r'l'o'o'm' 'w'i't'h' 'U'n'i'g'l'o' 'J'e'w'e'l's'",
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
        "question": "'W'h'a't' 'i's' 'm'o'd'e'r'n' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y'?'",
        "answer": "'M'o'd'e'r'n' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y' 'i's' 'f'i'n'e' 'j'e'w'e'l'r'y' 'd'e's'i'g'n'e'd' 't'o' 'b'e' 'w'o'r'n' 't'o'd'a'y' 'a'n'd' 'p'a's's'e'd' 'd'o'w'n' 'i'n' 't'h'e' 'f'u't'u'r'e'.' 'I't' 'c'o'm'b'i'n'e's' 't'i'm'e'l'e's's' 'd'e's'i'g'n',' 'l'a's't'i'n'g' 'c'r'a'f't's'm'a'n's'h'i'p',' 'q'u'a'l'i't'y' 'm'a't'e'r'i'a'l's',' 'a'n'd' 'e'm'o't'i'o'n'a'l' 'm'e'a'n'i'n'g'.'"
    },
    {
        "question": "'W'h'a't' 'm'a'k'e's' 'a' 'p'i'e'c'e' 'o'f' 'j'e'w'e'l'r'y' 'a'n' 'h'e'i'r'l'o'o'm'?'",
        "answer": "'A' 'p'i'e'c'e' 'b'e'c'o'm'e's' 'a'n' 'h'e'i'r'l'o'o'm' 'w'h'e'n' 'i't' 'c'a'r'r'i'e's' 'p'e'r's'o'n'a'l' 'o'r' 'f'a'm'i'l'y' 'm'e'a'n'i'n'g' 'a'n'd' 'i's' 'v'a'l'u'e'd' 'e'n'o'u'g'h' 't'o' 'b'e' 'k'e'p't',' 'p'r'o't'e'c't'e'd',' 'a'n'd' 'p'a's's'e'd' 'd'o'w'n' 't'h'r'o'u'g'h' 'g'e'n'e'r'a't'i'o'n's'.'"
    },
    {
        "question": "'D'o'e's' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y' 'h'a'v'e' 't'o' 'b'e' 'o'l'd'?'",
        "answer": "'N'o'.' 'N'e'w' 'j'e'w'e'l'r'y' 'c'a'n' 'b'e'c'o'm'e' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y' 'w'h'e'n' 'i't' 'i's' 'c'h'o's'e'n' 'w'i't'h' 'i'n't'e'n't'i'o'n',' 'm'a'd'e' 't'o' 'l'a's't',' 'a'n'd' 'c'o'n'n'e'c't'e'd' 't'o' 'm'e'a'n'i'n'g'f'u'l' 'l'i'f'e' 'm'o'm'e'n't's'.'"
    },
    {
        "question": "'W'h'a't' 'j'e'w'e'l'r'y' 'i's' 'b'e's't' 't'o' 'p'a's's' 'd'o'w'n'?'",
        "answer": "'D'i'a'm'o'n'd' 'r'i'n'g's',' 's'o'l'i't'a'i'r'e' 'p'e'n'd'a'n't's',' 't'e'n'n'i's' 'b'r'a'c'e'l'e't's',' 'd'i'a'm'o'n'd' 'b'a'n'd's',' 'c'l'a's's'i'c' 'e'a'r'r'i'n'g's',' 'a'n'd' 't'i'm'e'l'e's's' 'n'e'c'k'l'a'c'e's' 'a'r'e' 's'o'm'e' 'o'f' 't'h'e' 'b'e's't' 'j'e'w'e'l'r'y' 'p'i'e'c'e's' 't'o' 'p'a's's' 'd'o'w'n' 'b'e'c'a'u's'e' 't'h'e'y' 'r'e'm'a'i'n' 'w'e'a'r'a'b'l'e' 'a'c'r'o's's' 'g'e'n'e'r'a't'i'o'n's'.'"
    },
    {
        "question": "'I's' 'd'i'a'm'o'n'd' 'j'e'w'e'l'r'y' 'g'o'o'd' 'f'o'r' 'h'e'i'r'l'o'o'm's'?'",
        "answer": "'Y'e's'.' 'D'i'a'm'o'n'd' 'j'e'w'e'l'r'y' 'i's' 'o'f't'e'n' 'c'h'o's'e'n' 'f'o'r' 'h'e'i'r'l'o'o'm's' 'b'e'c'a'u's'e' 'd'i'a'm'o'n'd's' 'a'r'e' 'd'u'r'a'b'l'e',' 't'i'm'e'l'e's's',' 'a'n'd' 'e'm'o't'i'o'n'a'l'l'y' 's'y'm'b'o'l'i'c'.' 'A' 'w'e'l'l'-'d'e's'i'g'n'e'd' 'd'i'a'm'o'n'd' 'p'i'e'c'e' 'c'a'n' 'c'a'r'r'y' 'm'e'a'n'i'n'g' 'f'o'r' 'd'e'c'a'd'e's'.'"
    },
    {
        "question": "'C'a'n' 'm'o'd'e'r'n' 'j'e'w'e'l'r'y' 'b'e'c'o'm'e' 'a'n' 'h'e'i'r'l'o'o'm'?'",
        "answer": "'Y'e's'.' 'M'o'd'e'r'n' 'j'e'w'e'l'r'y' 'c'a'n' 'b'e'c'o'm'e' 'a'n' 'h'e'i'r'l'o'o'm' 'i'f' 'i't' 'i's' 'm'a'd'e' 'w'i't'h' 'l'a's't'i'n'g' 'q'u'a'l'i't'y' 'a'n'd' 'h'a's' 'e'm'o't'i'o'n'a'l' 'i'm'p'o'r't'a'n'c'e'.' 'C'l'e'a'n',' 'r'e'f'i'n'e'd' 'd'e's'i'g'n's' 'o'f't'e'n' 'm'a'k'e' 'e'x'c'e'l'l'e'n't' 'm'o'd'e'r'n' 'h'e'i'r'l'o'o'm's'.'"
    },
    {
        "question": "'H'o'w' 'd'o' 'I' 'c'h'o'o's'e' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y'?'",
        "answer": "'C'h'o'o's'e' 'j'e'w'e'l'r'y' 'w'i't'h' 't'i'm'e'l'e's's' 'd'e's'i'g'n',' 's't'r'o'n'g' 'c'r'a'f't's'm'a'n's'h'i'p',' 'p'e'r's'o'n'a'l' 'm'e'a'n'i'n'g',' 'a'n'd' 'e'v'e'r'y'd'a'y' 'w'e'a'r'a'b'i'l'i't'y'.' 'T'h'e' 'b'e's't' 'h'e'i'r'l'o'o'm' 'p'i'e'c'e's' 'a'r'e' 'b'e'a'u't'i'f'u'l',' 'd'u'r'a'b'l'e',' 'a'n'd' 'e'm'o't'i'o'n'a'l'l'y' 's'i'g'n'i'f'i'c'a'n't'.'"
    },
    {
        "question": "'W'h'y' 'a'r'e' 'h'e'i'r'l'o'o'm's' 'i'm'p'o'r't'a'n't'?'",
        "answer": "'H'e'i'r'l'o'o'm's' 'a'r'e' 'i'm'p'o'r't'a'n't' 'b'e'c'a'u's'e' 't'h'e'y' 'p'r'e's'e'r'v'e' 'm'e'm'o'r'y'.' 'T'h'e'y' 'c'o'n'n'e'c't' 'g'e'n'e'r'a't'i'o'n's' 't'h'r'o'u'g'h' 's'o'm'e't'h'i'n'g' 't'a'n'g'i'b'l'e' 'a'n'd' 'h'e'l'p' 'f'a'm'i'l'y' 's't'o'r'i'e's' 'l'i'v'e' 'o'n' 't'h'r'o'u'g'h' 'o'b'j'e'c't's' 't'h'a't' 'w'e'r'e' 'l'o'v'e'd' 'a'n'd' 'w'o'r'n'.'"
    },
    {
        "question": "'C'a'n' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y' 'b'e' 'r'e'd'e's'i'g'n'e'd'?'",
        "answer": "'Y'e's'.' 'M'a'n'y' 'h'e'i'r'l'o'o'm' 'p'i'e'c'e's' 'c'a'n' 'b'e' 'r'e'd'e's'i'g'n'e'd' 'o'r' 'r'e's'e't' 'w'h'i'l'e' 'k'e'e'p'i'n'g' 't'h'e' 'o'r'i'g'i'n'a'l' 's't'o'n'e's' 'o'r' 'm'a't'e'r'i'a'l's'.' 'T'h'i's' 'a'l'l'o'w's' 't'h'e' 'p'i'e'c'e' 't'o' 'e'v'o'l'v'e' 'w'h'i'l'e' 'p'r'e's'e'r'v'i'n'g' 'i't's' 'e'm'o't'i'o'n'a'l' 'v'a'l'u'e'.'"
    },
    {
        "question": "'I's' 'h'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y' 'o'n'l'y' 'f'o'r' 'f'a'm'i'l'i'e's'?'",
        "answer": "'N'o'.' 'H'e'i'r'l'o'o'm' 'j'e'w'e'l'r'y' 'c'a'n' 'b'e'g'i'n' 'w'i't'h' 'a'n'y'o'n'e'.' 'A' 'p'i'e'c'e' 'y'o'u' 'b'u'y' 'f'o'r' 'y'o'u'r's'e'l'f' 't'o'd'a'y' 'c'a'n' 'b'e'c'o'm'e' 's'o'm'e't'h'i'n'g' 'm'e'a'n'i'n'g'f'u'l' 'f'o'r' 'a' 'f'u't'u'r'e' 'c'h'i'l'd',' 'p'a'r't'n'e'r',' 'l'o'v'e'd' 'o'n'e',' 'o'r' 'f'a'm'i'l'y' 'm'e'm'b'e'r'.'"
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
                        'M'o'd'e'r'n' 'H'e'i'r'l'o'o'm's':' 'J'e'w'e'l'r'y' 'D'e's'i'g'n'e'd' 't'o' 'B'e' 'P'a's's'e'd' 'D'o'w'n',' 'N'o't' 'R'e'p'l'a'c'e'd'
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
