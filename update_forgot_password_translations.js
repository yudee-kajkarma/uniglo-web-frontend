const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, 'messages', 'en.json');
const deJsonPath = path.join(__dirname, 'messages', 'de.json');

const enKeys = {
    "forgotPasswordHeader": "Forgot Password",
    "forgotPasswordInstruction": "Enter your email address and we'll send you an OTP to reset your password.",
    "resetPasswordInstruction": "Enter the OTP sent to your email and create a new password.",
    "sendOtp": "SEND OTP",
    "sendingOtp": "SENDING OTP...",
    "newPasswordPlaceholder": "New Password",
    "confirmPasswordPlaceholder": "Confirm Password",
    "passwordsMatch": "Passwords match",
    "resetting": "RESETTING...",
    "didNotReceiveCode": "Didn't receive the code?",
    "resendOtp": "Resend OTP",
    "resending": "Sending...",
    "rememberYourPassword": "Remember your password?",
    "failedToSendOtp": "Failed to send OTP. Please try again.",
    "failedToResendOtp": "Failed to resend OTP. Please try again.",
    "failedToResetPassword": "Failed to reset password. Please try again."
};

const deKeys = {
    "forgotPasswordHeader": "Passwort vergessen",
    "forgotPasswordInstruction": "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen ein OTP, um Ihr Passwort zurückzusetzen.",
    "resetPasswordInstruction": "Geben Sie das an Ihre E-Mail gesendete OTP ein und erstellen Sie ein neues Passwort.",
    "sendOtp": "OTP SENDEN",
    "sendingOtp": "OTP WIRD GESENDET...",
    "newPasswordPlaceholder": "Neues Passwort",
    "confirmPasswordPlaceholder": "Passwort bestätigen",
    "passwordsMatch": "Passwörter stimmen überein",
    "resetting": "ZURÜCKSETZEN LÄUFT...",
    "didNotReceiveCode": "Haben Sie den Code nicht erhalten?",
    "resendOtp": "OTP erneut senden",
    "resending": "Wird gesendet...",
    "rememberYourPassword": "Erinnern Sie sich an Ihr Passwort?",
    "failedToSendOtp": "Fehler beim Senden des OTP. Bitte versuchen Sie es erneut.",
    "failedToResendOtp": "Fehler beim erneuten Senden des OTP. Bitte versuchen Sie es erneut.",
    "failedToResetPassword": "Fehler beim Zurücksetzen des Passworts. Bitte versuchen Sie es erneut."
};

if (fs.existsSync(enJsonPath)) {
    const en = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
    en.auth = { ...en.auth, ...enKeys };
    fs.writeFileSync(enJsonPath, JSON.stringify(en, null, 2), 'utf8');
    console.log("Successfully updated en.json forgot-password translations");
}

if (fs.existsSync(deJsonPath)) {
    const de = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));
    de.auth = { ...de.auth, ...deKeys };
    fs.writeFileSync(deJsonPath, JSON.stringify(de, null, 2), 'utf8');
    console.log("Successfully updated de.json forgot-password translations");
}
