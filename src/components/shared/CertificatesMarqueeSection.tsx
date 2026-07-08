"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import partner2 from "@/assets/our-partners/gia-removebg-preview.png";
import partner3 from "@/assets/our-partners/hrd-removebg-preview.png";
import partner4 from "@/assets/our-partners/igi.jpg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const CertificatesMarqueeSection = () => {
    const t = useTranslations();

    const partnerLogos = [
        { src: partner2, alt: t("altText.giaCertified") },
        { src: partner3, alt: t("altText.hrcCertified") },
        { src: partner4, alt: t("altText.igiCertified") },
    ];

    return (
        <section className="bg-white py-24 font-cormorantGaramond">
            <div className=" px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center mb-10">
                    <span className="text-primary-yellow-1 text-lg uppercase font-lora tracking-widest">
                        {t("certificates.tag")}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-cormorantGaramond font-semibold mt-2 mb-4">
                        {t("certificates.title")}
                    </h2>
                    <p className="text-slate-600 font-lora text-base max-w-3xl mx-auto">
                        {t("certificates.description1")}
                    </p>
                    <p className="text-slate-600 font-lora text-base max-w-3xl mx-auto">
                        {t("certificates.description2")}
                    </p>
                </div>
                <div className="my-16">
                    <Marquee
                        gradient={false}
                        speed={40}
                        pauseOnHover={true}
                        className="flex items-center gap-16  max-w-7xl mx-auto "
                        autoFill={true}
                    >
                        {partnerLogos.map((logo, idx) => (
                            <div
                                key={idx}
                                className="mx-12 flex flex-col items-center"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={180}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default CertificatesMarqueeSection;