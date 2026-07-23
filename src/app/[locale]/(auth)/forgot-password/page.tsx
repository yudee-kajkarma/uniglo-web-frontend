"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import backgroundImage from "@/assets/login/login-background.jpg";
import diamondImage from "@/assets/diamond.png";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendOtp, updatePassword } from "@/services/otpServices";
import { toast } from "sonner";

const Page = () => {
    const router = useRouter();
    const t = useTranslations("auth");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Check if passwords match
    const passwordsMatch =
        newPassword &&
        confirmPassword &&
        newPassword === confirmPassword &&
        newPassword.length >= 8;

    // OTP Timer countdown
    React.useEffect(() => {
        if (otpTimer > 0) {
            const interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimer]);

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            toast.error(t("pleaseEnterYourEmail"));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error(t("pleaseEnterValidEmail"));
            return;
        }

        setIsSendingOtp(true);
        try {
            await sendOtp(email);
            toast.success(t("otpSentToEmail"));
            setIsOtpSent(true);
            setOtpTimer(60);
            // Focus on first OTP input
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        } catch (error) {
            toast.error(
typeof error === "string" ? error : t("failedToSendOtp")
);
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleResendOtp = async () => {
        if (otpTimer > 0) return;

        setIsSendingOtp(true);
        try {
            await sendOtp(email);
            toast.success(t("otpResentToEmail"));
            setOtpTimer(60);
        } catch (error) {
            toast.error(
typeof error === "string" ? error : t("failedToResendOtp")
);
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last character
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 4);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length; i++) {
            if (/^\d+$/.test(pastedData[i])) {
                newOtp[i] = pastedData[i];
            }
        }

        setOtp(newOtp);

        // Focus on the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex((val) => !val);
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus();
        } else {
            inputRefs.current[3]?.focus();
        }
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const otpValue = otp.join("");

        // Validation
        if (otpValue.length !== 4) {
            toast.error("Please enter a 4-digit OTP");
            return;
        }

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error(t("passwordsDoNotMatch"));
            return;
        }

        if (newPassword.length < 8) {
            toast.error(t("passwordMustBeAtLeast8"));
            return;
        }

        setIsLoading(true);
        try {
            await updatePassword({
                email,
                newPassword,
                otp: otpValue,
            });

            toast.success(t("passwordResetSuccessfully"));

            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (error) {
            toast.error(
typeof error === "string" ? error : t("failedToResetPassword")
);
            // Clear OTP on error
            setOtp(["", "", "", ""]);
            inputRefs.current[0]?.focus();
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

                {/* Right Side: Forgot Password Form */}
                <div className="w-full max-w-[500px] bg-black/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors mb-8 text-sm font-bold tracking-wide group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 mt-1" />
                        {t("home")}
                    </Link>

                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 text-center mb-4 tracking-wide">
                        {!isOtpSent ? t("forgotPasswordHeader") : t("resetPassword")}
                    </h2>

                    <p className="text-center text-gray-300 font-lato text-sm mb-8">
                        {!isOtpSent ? t("forgotPasswordInstruction") : t("resetPasswordInstruction")}
                    </p>

                    {!isOtpSent ? (
                        // Step 1: Email Input
                        <form
                            className="space-y-6"
                            onSubmit={handleEmailSubmit}
                            onInvalidCapture={(e) => (e.target as HTMLInputElement).setCustomValidity(t("pleaseFillOutThisField"))}
                            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                        >
                            {/* Email Input */}
                            <div className="relative group">
                                <Input
                                    type="email"
                                    placeholder={t("emailIdPlaceholder")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSendingOtp}
                                    required
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-10 rounded-lg"
                                />
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            {/* Send OTP Button */}
                            <Button
                                type="submit"
                                variant="ghost"
                                disabled={isSendingOtp}
                                className="w-full h-auto py-3.5 rounded-lg uppercase tracking-wider text-xl gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold disabled:opacity-50"
                            >
                                <span className="text-primary-purple">
                                    {isSendingOtp ? t("sendingOtp") : t("sendOtp")}
                                </span>
                            </Button>
                        </form>
                    ) : (
                        // Step 2: OTP + Password Input
                        <form
                            className="space-y-6"
                            onSubmit={handleResetPassword}
                            onInvalidCapture={(e) => (e.target as HTMLInputElement).setCustomValidity(t("pleaseFillOutThisField"))}
                            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                        >
                            {/* Email Display */}
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Mail className="h-4 w-4 text-primary-yellow-1" />
                                <p className="text-center text-primary-yellow-1 font-lato text-sm font-semibold">
                                    {email}
                                </p>
                            </div>

                            {/* OTP Input */}
                            <div className="flex justify-center gap-3 md:gap-4">
                                {otp.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) =>
                                            handleOtpChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(index, e)
                                        }
                                        onPaste={handlePaste}
                                        disabled={isLoading}
                                        className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl md:text-3xl font-bold bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 rounded-lg"
                                    />
                                ))}
                            </div>

                            {/* New Password Input */}
                            <div className="relative group">
                                <Input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder={t("newPasswordPlaceholder")}
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-20 rounded-lg"
                                />
                                <Lock className="absolute left-auto right-12 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-yellow-1 transition-colors"
                                >
                                    {showNewPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {newPassword && newPassword.length < 8 && (
                                <p className="text-xs text-red-400 font-lato -mt-4">
                                    {t("passwordMustBeAtLeast8")}
                                </p>
                            )}

                            {/* Confirm Password Input */}
                            <div className="relative group">
                                <Input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder={t("confirmPasswordPlaceholder")}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    disabled={isLoading}
                                    required
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3.5 pl-4 pr-20 rounded-lg"
                                />
                                <Lock className="absolute left-auto right-12 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-yellow-1 transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {confirmPassword &&
                                newPassword !== confirmPassword && (
                                    <p className="text-xs text-red-400 font-lato -mt-4">
                                        {t("passwordsDoNotMatch")}
                                    </p>
                                )}
                            {passwordsMatch && (
                                <p className="text-xs text-green-400 font-lato -mt-4">
                                    ✓ {t("passwordsMatch")}
                                </p>
                            )}

                            {/* Reset Password Button */}
                            <Button
                                type="submit"
                                variant="ghost"
                                disabled={
                                    isLoading ||
                                    otp.some((d) => !d) ||
                                    !passwordsMatch
                                }
                                className="w-full h-auto py-3.5 rounded-lg uppercase tracking-wider text-xl gold-reveal-btn border-none hover:bg-transparent font-cormorantGaramond font-bold disabled:opacity-50"
                            >
                                <span className="text-primary-purple">
                                    {isLoading ? t("resetting") : t("resetPassword")}
                                </span>
                            </Button>

                            {/* Resend OTP */}
                            <div className="text-center">
                                <p className="text-gray-300 font-lato text-sm mb-2">
                                    {t("didNotReceiveCode")}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={isSendingOtp || otpTimer > 0}
                                    className="text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors text-sm font-semibold disabled:opacity-50"
                                >
                                    {isSendingOtp ? t("resending") : otpTimer > 0 ? `${t("resendOtp")} (${otpTimer}s)` : t("resendOtp")}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8 text-center text-base text-gray-300 font-cormorantGaramond">
                        {t("rememberYourPassword")}{" "}
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
