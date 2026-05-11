import { Country } from "country-state-city";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

export const CURRENCIES = [
    { value: "US$", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "AED", label: "AED - UAE Dirham" },
] as const;

// Get all countries with calling codes
export const COUNTRY_CODES = getCountries()
    .map((countryCode) => {
        try {
            const callingCode = getCountryCallingCode(countryCode);
            const country = Country.getCountryByCode(countryCode);
            return {
                value: `+${callingCode}`,
                label: `+${callingCode} (${country?.name || countryCode})`,
                countryCode: countryCode,
            };
        } catch {
            return null;
        }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.label.localeCompare(b.label));

// Get all countries
export const COUNTRIES = Country.getAllCountries()
    .map((country) => ({
        value: country.name,
        label: country.name,
        isoCode: country.isoCode,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

export const BUSINESS_TYPES = [
    { value: "Retailer", label: "Retailer" },
    { value: "Wholesaler", label: "Wholesaler" },
    { value: "Distributor", label: "Distributor" },
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "E-commerce", label: "E-commerce" },
    { value: "Jeweler", label: "Jeweler" },
    { value: "Other", label: "Other" },
] as const;
