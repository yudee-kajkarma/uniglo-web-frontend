"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// NOTE: recentPosts titles link to blog posts / education pages.
// Blog post bodies are intentionally NOT translated (dynamic/CMS content),
// so these titles are left in English for now. Flag to the user: should
// these be translated even though the underlying blog post stays English?
export const recentPosts = [
    {
        titleKey: "labGrownBelgium",
        url: "/blogs/lab-grown-diamonds-in-belgium",
    },
    {
        titleKey: "diamondsNotFromCoal",
        url: "/blogs/diamonds-are-not-made-from-coal",
    },
    {
        titleKey: "diamond4Cs",
        url: "/the-diamond-4cs",
    },
    {
        titleKey: "diamondCertificates",
        url: "/diamond-certificates",
    },
    {
        titleKey: "fancyColoredDiamonds",
        url: "/fancy-colored-diamonds",
    },
];

// Dummy image imports (replace with your actual assets)
import recentPostImg from "@/assets/subFooter/recent-post.png";
import diamondAdImg from "@/assets/subFooter/online-inventory-banner.png";
import giaLogo from "@/assets/our-partners/gia-removebg-preview.png";
import hrdLogo from "@/assets/our-partners/hrd-removebg-preview.png";
import igiLogo from "@/assets/our-partners/igi.jpg";

const SubFooter: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between items-start py-12 px-4 md:px-0 max-w-7xl mx-auto md:h-185 mb-30">
            {/* Recent Posts */}
            <div className="bg-[#f7f8fa] h-full  p-8 flex-1 md:max-w-md shadow-sm">
                <h3 className="text-4xl font-semibold font-cormorantGaramond mb-6">
                    {t("subFooter.recentPosts")}
                </h3>
                <div className="mb-6">
                    <Image
                        src={recentPostImg}
                        alt={t("subFooter.recentPosts")}
                        width={240}
                        height={160}
                        className=" object-cover w-full h-auto aspect-3/2"
                    />
                </div>
                <ul className="space-y-2">
                    {recentPosts.map((post, idx) => (
                        <li key={idx}>
                            <Link
                                href={post.url}
                                className="text-slate-700 underline hover:text-primary transition"
                            >
                                {t(`subFooter.recentPostTitles.${post.titleKey}`)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logos & Find Us */}
            <div className="flex-1 flex flex-col h-full items-center justify-center gap-6 md:max-w-md w-full ">
                {/* Logos */}
                <div className="flex gap-8 items-center mb-4">
                    <Image src={giaLogo} alt="GIA" width={60} height={30} />
                    <Image
                        src={hrdLogo}
                        alt="HRD Antwerp"
                        width={100}
                        height={30}
                    />
                    <Image src={igiLogo} alt="IGI" width={60} height={30} />
                </div>
                {/* Find Us */}
                <div className="bg-[#f7f8fa] p-8 w-full h-full shadow-sm">
                    <h3 className="text-3xl font-cormorantGaramond mb-6 underline">
                        {t("subFooter.findUs")}
                    </h3>
                    <div className="flex items-start gap-4 mb-4">
                        <span className="text-primary text-2xl mt-1">
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="12" cy="10" r="3" />
                                <path d="M12 2C7 2 3 6.5 3 12c0 5.5 9 10 9 10s9-4.5 9-10c0-5.5-4-10-9-10z" />
                            </svg>
                        </span>
                        <div>
                            <span className="font-bold text-xl ">
                                {t("contactPage.address")}
                            </span>
                            {/* Physical address stays as-is across locales */}
                            <div className="text-slate-700 text-xl font-lora">
                                <div>Hoveniersstraat 30,</div>
                                <div>Suite 662,</div>
                                <div>Bus 250 2018 Antwerp</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="text-primary text-2xl mt-1">
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </span>
                        <div>
                            <span className="font-bold text-xl">
                                {t("contactPage.hours")}
                            </span>
                            {/* NOTE: "subFooter.weekdayLabel" / "weekendLabel" /
                                "onAppointment" are not yet in de.json - see
                                note below this file for suggested translations */}
                            <div className="text-slate-700 text-xl font-lora">
                                <div>{t("subFooter.weekdayLabel")}</div>
                                <div>10:00 – 18:00</div>
                                <div>{t("subFooter.weekendLabel")}</div>
                                <div>{t("subFooter.onAppointment")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Diamond Ad */}
            <div className="flex-1 md:max-w-[350px] w-full h-full bg-black  flex flex-col items-center justify-center py-12 px-6">
                <div className="text-white text-center text-2xl font-cormorantGaramond mb-8">
                    {t("subFooter.browseThousands")}
                    <br />
                    {t("subFooter.ofLooseDiamonds")}
                </div>
                <Link
                    href="/inventory"
                    className="border border-white text-white py-3 px-8 text-lg font-bold mb-8 hover:bg-white hover:text-black transition"
                >
                    {t("common.onlineInventory")}
                </Link>
                <Image
                    src={diamondAdImg}
                    alt={t("subFooter.ofLooseDiamonds")}
                    width={260}
                    height={180}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default SubFooter;