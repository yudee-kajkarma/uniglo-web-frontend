import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock1, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import AdImage from "@/assets/subFooter/recent-post.png";
import GiaLogo from "@/assets/our-partners/gia-removebg-preview.png";
import HrdLogo from "@/assets/our-partners/hrd-removebg-preview.png";
import IgiLogo from "@/assets/our-partners/igi.jpg";

const educationLinks = [
    { title: "THE DIAMOND 4CS", href: "/the-diamond-4cs" },
    { title: "DIAMONDS CERTIFICATES", href: "/diamond-certificates" },
    { title: "DIAMONDS SHAPES", href: "/diamond-shapes" },
    { title: "FANCY COLOURED DIAMONDS", href: "/fancy-colored-diamonds" },
    { title: "CONFLICT-FREE DIAMONDS", href: "/conflict-free-diamonds" },
    { title: "ETHICAL DIAMONDS", href: "/ethical-diamonds" },
    { title: "OLD CUT DIAMONDS", href: "/old-cut-diamonds" },
    {
        title: "SUPPLY CHAIN POLICY & PROCEDURE",
        href: "/supply-chain-policy-procedure",
    },
];

const EducationSidebar = ({
    className = "w-full lg:w-1/3",
}: {
    className?: string;
}) => {
    return (
        <div className={className}>
            {/* 
              Responsive Wrapper:
              - Mobile (< md): flex-col (stacked)
              - Tablet (md to lg): flex-row (side-by-side like SubFooter)
              - Desktop (>= lg): flex-col (returns to being a vertical sidebar)
            */}
            <div className="w-full flex flex-col md:flex-row lg:flex-col gap-8 justify-between items-start h-full">
                {/* Posts / Chapters Section matching SubFooter style on smaller screens */}
                <div className="bg-[#f7f8fa] p-8 flex-1 h-full w-full shadow-sm rounded-sm lg:rounded-none">
                    <h3 className="text-4xl lg:text-3xl font-semibold font-cormorantGaramond mb-6 text-[#0f172a]">
                        More Topics
                    </h3>
                    <ul className="space-y-3 lg:space-y-6">
                        {educationLinks.map((link, idx) => (
                            <li
                                key={idx}
                                className="group lg:border-0 border-b border-slate-200 pb-2 lg:pb-0 last:border-0"
                            >
                                <Link
                                    href={link.href}
                                    className="flex items-center justify-between text-slate-700 hover:text-[#bb923a] transition-colors py-1 lg:py-2"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="hidden lg:block w-2 h-2 rounded-full border border-current flex-shrink-0 group-hover:border-[#bb923a]"></span>
                                        <span className="font-lora text-lg lg:text-sm lg:font-sans lg:font-semibold lg:tracking-wide underline lg:no-underline underline-offset-4">
                                            {link.title}
                                        </span>
                                    </div>
                                    <ArrowUpRight
                                        className="hidden lg:block w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:text-[#bb923a] transition-all"
                                        strokeWidth={1.5}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logos & Find Us */}
                <div className="flex-1 flex flex-col h-full items-center justify-start gap-4 lg:gap-6 w-full">
                    {/* Our Partners */}
                    <div className="flex gap-8 items-center mb-2 lg:mb-0 w-full justify-center lg:justify-start">
                        <Image
                            src={GiaLogo}
                            alt="GIA"
                            width={60}
                            height={30}
                            className="object-contain"
                        />
                        <Image
                            src={HrdLogo}
                            alt="HRD"
                            width={80}
                            height={30}
                            className="object-contain"
                        />
                        <Image
                            src={IgiLogo}
                            alt="IGI"
                            width={60}
                            height={30}
                            className="object-contain"
                        />
                    </div>

                    {/* Find Us */}
                    <div className="bg-[#f7f8fa] p-8 w-full shadow-sm flex-1 rounded-sm lg:rounded-none">
                        <h3 className="text-3xl lg:text-2xl font-cormorantGaramond mb-6 underline lg:no-underline lg:border-b lg:border-slate-200 lg:pb-2">
                            Find Us
                        </h3>
                        <div className="space-y-6 font-lora text-slate-700 text-xl lg:text-sm">
                            <div className="flex gap-3 lg:gap-3 items-start">
                                <span className="text-[#bb923a] mt-1">
                                    <MapPin className="w-6 h-6 lg:w-5 lg:h-5 text-current" />
                                </span>
                                <div>
                                    <strong className="block text-black font-bold mb-1 text-xl lg:text-sm lg:font-semibold">
                                        Address
                                    </strong>
                                    <div className="leading-relaxed">
                                        <div>Hoveniersstraat 30,</div>
                                        <div>Suite 662,</div>
                                        <div>Bus 250 2018 Antwerp</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 lg:gap-3 items-start">
                                <span className="text-[#bb923a] mt-1">
                                    <Clock1 className="w-6 h-6 lg:w-5 lg:h-5 text-current" />
                                </span>
                                <div>
                                    <strong className="block text-black font-bold mb-1 text-xl lg:text-sm lg:font-semibold">
                                        Hours
                                    </strong>
                                    <div className="leading-relaxed">
                                        <div>Monday—Friday:</div>
                                        <div>10:00 – 18:00</div>
                                        <div className="mt-1">
                                            Saturday & Sunday:
                                        </div>
                                        <div>On Appointment</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ad Section */}
                <div className="flex-1 w-full bg-black flex flex-col items-center justify-center py-12 px-6 h-full min-h-[400px]">
                    <div className="text-white text-center text-2xl lg:text-4xl font-cormorantGaramond mb-8 leading-snug">
                        BROWSE THOUSANDS
                        <br />
                        OF LOOSE DIAMONDS
                    </div>
                    <Button
                        asChild
                        className="border-2 lg:border border-white text-white bg-transparent hover:bg-white hover:text-black transition px-8 py-4 lg:py-3 text-lg font-bold lg:font-lora tracking-wide lg:tracking-normal rounded-none mb-8 lg:mt-2"
                    >
                        <Link href="/inventory">ONLINE INVENTORY</Link>
                    </Button>
                    <Image
                        src={AdImage}
                        alt="Diamond Ring"
                        width={250}
                        height={250}
                        className="mt-0 w-60 lg:mt-10 h-auto aspect-square object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default EducationSidebar;
