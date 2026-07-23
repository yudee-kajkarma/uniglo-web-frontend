const fs = require('fs');
const path = require('path');

const enJsonPath = path.join(__dirname, 'messages', 'en.json');
const deJsonPath = path.join(__dirname, 'messages', 'de.json');

const enKeys = {
    "bannerText": "CONTACT US",
    "getInTouch": "GET IN TOUCH",
    "title": "Contact Us",
    "emailSupportTitle": "Email Support",
    "emailSupportDesc": "Reach out to us email for any inquiries or support. Our team responds within 24 hours.",
    "callUsTitle": "Call Us",
    "callUsDesc": "Contact our friendly team for phone for immediate assistance anytime or to book an appointment.",
    "formTitle": "Get in Touch",
    "namePlaceholder": "Your Name",
    "emailPlaceholder": "Your Email",
    "phonePlaceholder": "Your Phone",
    "messagePlaceholder": "Your Message",
    "sendButton": "SEND MESSAGE",
    "sendingButton": "SENDING...",
    "infoTitle": "Contact Information",
    "monFri": "Mon - Fri: 10:00 - 18:00",
    "toastSuccess": "Message sent successfully! We'll get back to you soon.",
    "toastError": "An error occurred",
    "officeLabel": "Uniglo Diamonds",
    "officeAddress": "Hoveniersstraat 30"
};

const deKeys = {
    "bannerText": "KONTAKT",
    "getInTouch": "KONTAKTIEREN SIE UNS",
    "title": "Kontakt",
    "emailSupportTitle": "E-Mail-Support",
    "emailSupportDesc": "Wenden Sie sich bei Fragen oder Supportanfragen an uns. Unser Team antwortet innerhalb von 24 Stunden.",
    "callUsTitle": "Rufen Sie uns an",
    "callUsDesc": "Wenden Sie sich telefonisch an unser freundliches Team, um sofortige Hilfe zu erhalten oder einen Termin zu vereinbaren.",
    "formTitle": "Kontaktieren Sie uns",
    "namePlaceholder": "Ihr Name",
    "emailPlaceholder": "Ihre E-Mail-Adresse",
    "phonePlaceholder": "Ihre Telefonnummer",
    "messagePlaceholder": "Ihre Nachricht",
    "sendButton": "NACHRICHT SENDEN",
    "sendingButton": "WIRD GESENDET...",
    "infoTitle": "Kontaktinformationen",
    "monFri": "Mo - Fr: 10:00 - 18:00",
    "toastSuccess": "Nachricht erfolgreich gesendet! Wir werden uns in Kürze bei Ihnen melden.",
    "toastError": "Ein Fehler ist aufgetreten",
    "officeLabel": "Uniglo Diamonds",
    "officeAddress": "Hoveniersstraat 30"
};

if (fs.existsSync(enJsonPath)) {
    const en = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
    en.contactUs = enKeys;
    fs.writeFileSync(enJsonPath, JSON.stringify(en, null, 2), 'utf8');
    console.log("Successfully updated en.json contactUs namespace");
}

if (fs.existsSync(deJsonPath)) {
    const de = JSON.parse(fs.readFileSync(deJsonPath, 'utf8'));
    de.contactUs = deKeys;
    fs.writeFileSync(deJsonPath, JSON.stringify(de, null, 2), 'utf8');
    console.log("Successfully updated de.json contactUs namespace");
}
