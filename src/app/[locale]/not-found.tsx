"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Gem, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/../public/logo/logo.png";

export default function NotFound() {
    const router = useRouter();
    const t = useTranslations("notFound");

    return (
        <div className="min-h-screen bg-brand-gradient from-primary-purple via-primary-purple2 to-primary-purple-dark flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full text-center">
                {/* Animated Diamond Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <Image
                            src={logo}
                            alt="uniglo logo"
                            width={80}
                            height={80}
                            className="relative z-10 animate-bounce-slow"
                        />
                        <div className="absolute inset-0 w-24 h-24 bg-primary-yellow-1/20 rounded-full blur-xl animate-pulse" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-8xl md:text-9xl font-bold text-primary-yellow-1 font-cormorantGaramond mb-4 tracking-tight">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 font-lora">
                    {t("pageNotFound")}
                </h2>

                <p className="text-lg text-primary-yellow-2 mb-12 max-w-md mx-auto font-lato">
                    {t("description")}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto bg-transparent border-2 border-primary-yellow-1 text-primary-yellow-1 hover:bg-primary-yellow-1 hover:text-primary-purple font-lato transition-all duration-300"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        {t("goBack")}
                    </Button>

                    <Link href="/" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="w-full bg-primary-yellow-1 text-primary-purple hover:bg-primary-yellow-3 font-lato font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <Home className="mr-2 h-5 w-5" />
                            {t("backToHome")}
                        </Button>
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-16 pt-8 border-t border-primary-yellow-1/30">
                    <p className="text-primary-yellow-2 text-sm mb-4 font-lato">
                        {t("explorePopularSections")}
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/inventory">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary-yellow-2 hover:text-primary-yellow-1 hover:bg-primary-yellow-1/10 font-lato"
                            >
                                <Search className="mr-2 h-4 w-4" />
                                {t("browseInventory")}
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary-yellow-2 hover:text-primary-yellow-1 hover:bg-primary-yellow-1/10 font-lato"
                            >
                                {t("aboutUs")}
                            </Button>
                        </Link>
                        <Link href="/blogs">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary-yellow-2 hover:text-primary-yellow-1 hover:bg-primary-yellow-1/10 font-lato"
                            >
                                {t("blog")}
                            </Button>
                        </Link>
                        <Link href="/sell-your-diamonds">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-primary-yellow-2 hover:text-primary-yellow-1 hover:bg-primary-yellow-1/10 font-lato"
                            >
                                {t("sellDiamonds")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
