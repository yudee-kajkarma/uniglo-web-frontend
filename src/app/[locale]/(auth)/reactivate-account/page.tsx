"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import backgroundImage from "@/assets/login/login-background.jpg";
import diamondImage from "@/assets/diamond.png";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { requestReactivation } from "@/services/userService";

const Page = () => {
    const t = useTranslations("auth");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(t("pleaseEnterValidEmail"));
            return;
        }

        setIsLoading(true);
        try {
            await requestReactivation(email);
            setIsSubmitted(true);
        } catch (err) {
            setError(
                typeof err === "string"
                    ? err
                    : t("failedToSubmitReactivation"),
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt="Background"
                fill
                className="object-cover z-0 opacity-90"
                priority
            />

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-32 w-full h-full py-10">
                {/* Left Side: Diamond & Quote */}
                <div className="flex flex-col items-center text-center max-w-lg">
                    <div className="relative w-48 h-48 md:w-72 md:h-72 mb-2">
                        <Image
                            src={diamondImage}
                            alt="Diamond"
                            fill
                            className="object-contain drop-shadow-2xl animate-subtle-float"
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorantGaramond font-bold text-primary-yellow-1 mb-4 leading-tight">
                        {t("everySparkleTellsAStory")}
                    </h1>
                    <p className="text-gray-300 font-lato text-sm md:text-base tracking-wide opacity-90">
                        {t("luxuryCraftedWithEmotion")}
                    </p>
                </div>

                {/* Right Side: Reactivation Form */}
                <div className="w-full max-w-[450px] bg-black/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors mb-8 text-sm font-bold tracking-wide group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 mt-1" />
                        {t("home")}
                    </Link>

                    {!isSubmitted ? (
                        <>
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 text-center mb-4 tracking-wide">
                                {t("reactivateAccountHeader")}
                            </h2>

                            <p className="text-center text-gray-300 font-lato text-sm mb-8">
                                {t("reactivateInstruction")}
                            </p>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-3 text-red-200 text-sm">
                                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}
                                     className="space-y-5"
                                     onInvalidCapture={(e) => (e.target as HTMLInputElement).setCustomValidity(t("pleaseFillOutThisField"))}
                                     onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}>
                                {/* Email Input */}
                                <div className="relative group">
                                    <Input
                                        type="email"
                                        placeholder={t("emailIdPlaceholder")}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError(null);
                                        }}
                                        disabled={isLoading}
                                        required
                                        className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-10 rounded-lg"
                                    />
                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    variant="ghost"
                                    className="w-full h-auto py-3 rounded-lg shadow-lg mt-2 uppercase tracking-wider text-xl gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="text-primary-purple">
                                        {isLoading ? t("submitting") : t("requestReactivationButton")}
                                    </span>
                                </Button>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <div className="flex flex-col items-center text-center py-4">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                                <CheckCircle className="h-8 w-8 text-green-400" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 mb-4 tracking-wide">
                                {t("requestSubmitted")}
                            </h2>
                            <p className="text-gray-300 font-lato text-sm mb-2">
                                {t("requestSubmittedMsg1")}
                            </p>
                            <p className="text-gray-400 font-lato text-sm mb-8">
                                {t("requestSubmittedMsg2")}{" "}
                                <span className="text-primary-yellow-1 font-semibold">
                                    {email}
                                </span>
                                .
                            </p>
                        </div>
                    )}

                    <div className="mt-8 text-center text-lg text-gray-300 font-cormorantGaramond">
                        {t("rememberCredentials")}{" "}
                        <Link
                            href="/login"
                            className="text-primary-yellow-1 hover:text-primary-yellow-2 ml-1 transition-colors"
                        >
                            {t("loginButton")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
