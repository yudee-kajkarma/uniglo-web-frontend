const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', '[locale]', '(auth)', 'forgot-password', 'page.tsx');

if (!fs.existsSync(filePath)) {
    console.error("File not found: ", filePath);
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

function replacePattern(regex, replacement, name) {
    const newContent = content.replace(regex, replacement);
    if (newContent === content) {
        console.warn(`WARNING: Pattern [${name}] was not found or replaced!`);
    } else {
        console.log(`Success: Pattern [${name}] replaced.`);
        content = newContent;
    }
}

// 1. Imports
replacePattern(/import Link from "next\/link";/, 'import { Link } from "@/i18n/navigation";\nimport { useTranslations } from "next-intl";', 'Imports');

// 2. Component Initialization
replacePattern(/const Page = \(\) => \{\r?\n\s*const router = useRouter\(\);/, 'const Page = () => {\n    const router = useRouter();\n    const t = useTranslations("auth");', 'Page Init');

// 3. Toasts / Messages
replacePattern(/"Please enter your email address"/, 't("pleaseEnterYourEmail")');
replacePattern(/"Please enter a valid email address"/, 't("pleaseEnterValidEmail")');
replacePattern(/"OTP sent to your email"/, 't("otpSentToEmail")');
replacePattern(/"Failed to send OTP\. Please try again\."/, 't("failedToSendOtp")');
replacePattern(/"OTP resent to your email"/, 't("otpResentToEmail")');
replacePattern(/"Failed to resend OTP\. Please try again\."/, 't("failedToResendOtp")');
replacePattern(/"Password reset successfully!"/, 't("passwordResetSuccessfully")');
replacePattern(/"Failed to reset password\. Please try again\."/, 't("failedToResetPassword")');

// 4. Validation text below inputs
replacePattern(/Password must be at least 8 characters/, '{t("passwordMustBeAtLeast8")}');
replacePattern(/Passwords do not match/, '{t("passwordsDoNotMatch")}');
replacePattern(/✓ Passwords match/, '✓ {t("passwordsMatch")}');

// 5. Quote & Subquote
replacePattern(/"Where Every Sparkle Tells a Story\."/, '{t("everySparkleTellsAStory")}');
replacePattern(/Luxury crafted with emotion & elegance\./, '{t("luxuryCraftedWithEmotion")}');

// 6. Home Link & Title
replacePattern(/<ArrowLeft className="mr-2 h-4 w-4 mt-1" \/>\r?\n\s*Home\r?\n\s*<\/Link>/, '<ArrowLeft className="mr-2 h-4 w-4 mt-1" />\n                        {t("home")}\n                    </Link>', 'Home Link');
replacePattern(/\{!isOtpSent \? "Forgot Password" : "Reset Password"\}/, '{!isOtpSent ? t("forgotPasswordHeader") : t("resetPassword")}', 'Title Header');
replacePattern(/\{!isOtpSent\r?\n\s*\* "Enter your email address and we'll send you an OTP to reset your password\."\r?\n\s*\* "Enter the OTP sent to your email and create a new password\."\}/, '{!isOtpSent ? t("forgotPasswordInstruction") : t("resetPasswordInstruction")}', 'Sub-title Instruction');

// 7. Placeholders
replacePattern(/placeholder="Email Address"/, 'placeholder={t("emailIdPlaceholder")}');
replacePattern(/placeholder="New Password"/, 'placeholder={t("newPasswordPlaceholder")}');
replacePattern(/placeholder="Confirm Password"/, 'placeholder={t("confirmPasswordPlaceholder")}');

// 8. Buttons
replacePattern(/\{isSendingOtp\r?\n\s*\* "SENDING OTP\.\.\."\r?\n\s*\* "SEND OTP"\}/, '{isSendingOtp ? t("sendingOtp") : t("sendOtp")}');
replacePattern(/\{isLoading\r?\n\s*\* "RESETTING\.\.\."\r?\n\s*\* "RESET PASSWORD"\}/, '{isLoading ? t("resetting") : t("resetPassword")}');

// 9. Resend OTP Section
replacePattern(/Didn't receive the code\?/, '{t("didNotReceiveCode")}');
replacePattern(/\{isSendingOtp\r?\n\s*\* "Sending\.\.\."\r?\n\s*\* otpTimer > 0\r?\n\s*\* `Resend OTP \(\$\{otpTimer\}s\)`\r?\n\s*\* "Resend OTP"\}/, '{isSendingOtp ? t("resending") : otpTimer > 0 ? `${t("resendOtp")} (${otpTimer}s)` : t("resendOtp")}');

// 10. Remember password links
replacePattern(/Remember your password\?\{\s*"\s*"\s*\}/, '{t("rememberYourPassword")}{" "}');
replacePattern(/>\r?\n\s*Login\r?\n\s*<\/Link>/, '>\n                            {t("loginButton")}\n                        </Link>', 'Login Link');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Finished executing replace_forgot_password.js");
