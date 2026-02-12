"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import backgroundImage from "@/assets/login/login-background.jpg";
import diamondImage from "@/assets/diamond.png";
import {
    ArrowLeft,
    User,
    Mail,
    Lock,
    Building2,
    Phone,
    MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/authServices";
import { toast } from "sonner";
import {
    BUSINESS_TYPES,
    COUNTRIES,
    COUNTRY_CODES,
} from "@/constants/formOptions";
import { State, City } from "country-state-city";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        phone: "",
        referCode: "",
        companyName: "",
        businessType: "",
        street: "",
        state: "",
        city: "",
        zipCode: "",
        country: "",
        password: "",
        confirmPassword: "",
    });

    // Get selected country's ISO code
    const selectedCountryIsoCode = useMemo(() => {
        const country = COUNTRIES.find((c) => c.value === formData.country);
        return country?.isoCode || "";
    }, [formData.country]);

    // Get states for selected country
    const availableStates = useMemo(() => {
        if (!selectedCountryIsoCode) return [];
        return State.getStatesOfCountry(selectedCountryIsoCode).map(
            (state) => ({
                value: state.name,
                label: state.name,
                isoCode: state.isoCode,
            }),
        );
    }, [selectedCountryIsoCode]);

    // Get cities for selected state
    const availableCities = useMemo(() => {
        if (!selectedCountryIsoCode || !formData.state) return [];
        const state = availableStates.find((s) => s.value === formData.state);
        if (!state) return [];
        return City.getCitiesOfState(selectedCountryIsoCode, state.isoCode).map(
            (city) => ({
                value: city.name,
                label: city.name,
            }),
        );
    }, [selectedCountryIsoCode, formData.state, availableStates]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: value,
            };

            // Reset state and city when country changes
            if (name === "country") {
                updated.state = "";
                updated.city = "";
            }

            // Reset city when state changes
            if (name === "state") {
                updated.city = "";
            }

            return updated;
        });
    };

    // ...existing code... (validateForm and handleSubmit remain the same)

    const validateForm = () => {
        if (
            !formData.username ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phone ||
            !formData.companyName ||
            !formData.businessType ||
            !formData.street ||
            !formData.state ||
            !formData.city ||
            !formData.zipCode ||
            !formData.country ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("Please fill in all required fields");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ""))) {
            toast.error("Please enter a valid phone number");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const registrationData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
                contactName: `${formData.firstName} ${formData.lastName}`,
                currency: "US$",
                companyGroup: "",
                firmRegNo: "",
                defaultTerms: "",
                creditLimit: "",
                annualTarget: "",
                remarks: formData.referCode
                    ? `Refer Code: ${formData.referCode}`
                    : "",
                billingAddress: [
                    {
                        isDefault: "Y",
                        printName: formData.companyName,
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        zipCode: formData.zipCode,
                        vat_No: "",
                        gstn_No: "",
                    },
                ],
                shippingAddress: [
                    {
                        isDefault: "Y",
                        printName: formData.companyName,
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        zipCode: formData.zipCode,
                        vat_No: "",
                        gstn_No: "",
                    },
                ],
                contactDetail: {
                    contactName: `${formData.firstName} ${formData.lastName}`,
                    designation: "",
                    businessTel1: formData.phone,
                    businessTel2: "",
                    businessFax: "",
                    mobileNo: formData.phone,
                    personalNo: "",
                    otherNo: "",
                    email: formData.email,
                },
                customerData: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phoneNumber: formData.phone,
                    countryCode: formData.countryCode,
                    landlineNumber: "",
                    address: {
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        postalCode: formData.zipCode,
                        country: formData.country,
                    },
                    businessInfo: {
                        companyName: formData.companyName,
                        businessType: formData.businessType,
                        vatNumber: "",
                        websiteUrl: "",
                    },
                },
            };

            const response = await registerUser(registrationData);

            toast.success(
                response.message ||
                    "Registration successful! Please verify your email with OTP.",
            );

            setTimeout(() => {
                router.push(
                    `/verify-otp?email=${encodeURIComponent(formData.email)}`,
                );
            }, 1500);
        } catch (error) {
            toast.error(error as string);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {/* ...existing code... */}
            <Image
                src={backgroundImage}
                alt="Background"
                fill
                className="object-cover z-0 opacity-90"
                priority
            />

            <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-32 w-full h-full py-10">
                {/* ...existing code... (left side remains the same) */}
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
                        "Where Every Sparkle Tells a Story."
                    </h1>
                    <p className="text-gray-300 font-lato text-sm md:text-base tracking-wide opacity-90">
                        Luxury crafted with emotion & elegance.
                    </p>
                </div>

                <div className="w-full max-w-[600px] bg-black/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    <Link
                        href="/"
                        className="inline-flex items-center text-primary-yellow-1 hover:text-primary-yellow-2 transition-colors mb-6 text-sm font-bold tracking-wide group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 mt-1" />
                        Home
                    </Link>

                    <h2 className="text-3xl md:text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 text-center mb-8 tracking-wide">
                        Register
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* ...existing code... (personal information fields remain the same until state field) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <div className="relative group">
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            <div className="relative group">
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            <div className="relative group">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email Id"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            <div className="relative">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border border-white/10 text-white focus:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-2.5 pl-4 pr-10 rounded-lg appearance-none cursor-pointer"
                                >
                                    <option
                                        value=""
                                        className="bg-neutral-800 text-white"
                                    >
                                        Select Country Code
                                    </option>
                                    {COUNTRY_CODES.map((code) => (
                                        <option
                                            key={code.value}
                                            value={code.value}
                                            className="bg-neutral-800 text-white"
                                        >
                                            {code.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative group">
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            <div className="relative group">
                                <Input
                                    type="text"
                                    name="companyName"
                                    placeholder="Company Name"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <div className="relative">
                                <select
                                    name="businessType"
                                    value={formData.businessType}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border border-white/10 text-white focus:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-2.5 pl-4 pr-10 rounded-lg appearance-none cursor-pointer"
                                >
                                    <option
                                        value=""
                                        className="bg-neutral-800 text-white"
                                    >
                                        Select Business Type
                                    </option>
                                    {BUSINESS_TYPES.map((type) => (
                                        <option
                                            key={type.value}
                                            value={type.value}
                                            className="bg-neutral-800 text-white"
                                        >
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Address Fields - Updated with dynamic state/city */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative group">
                                <Input
                                    type="text"
                                    name="street"
                                    placeholder="Street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            <div className="relative">
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    required
                                    disabled={
                                        isLoading || !selectedCountryIsoCode
                                    }
                                    className="w-full bg-white/10 border border-white/10 text-white focus:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-2.5 pl-4 pr-10 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                                >
                                    <option
                                        value=""
                                        className="bg-neutral-800 text-white"
                                    >
                                        Select State
                                    </option>
                                    {availableStates.map((state) => (
                                        <option
                                            key={state.isoCode}
                                            value={state.value}
                                            className="bg-neutral-800 text-white"
                                        >
                                            {state.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading || !formData.state}
                                    className="w-full bg-white/10 border border-white/10 text-white focus:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-2.5 pl-4 pr-10 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                                >
                                    <option
                                        value=""
                                        className="bg-neutral-800 text-white"
                                    >
                                        Select City
                                    </option>
                                    {availableCities.map((city) => (
                                        <option
                                            key={city.value}
                                            value={city.value}
                                            className="bg-neutral-800 text-white"
                                        >
                                            {city.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <Input
                                    type="text"
                                    name="zipCode"
                                    placeholder="Zip Code"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 rounded-lg"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border border-white/10 text-white focus:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg appearance-none cursor-pointer"
                                >
                                    <option
                                        value=""
                                        className="bg-neutral-800 text-white"
                                    >
                                        Select Country
                                    </option>
                                    {COUNTRIES.map((country) => (
                                        <option
                                            key={country.isoCode}
                                            value={country.value}
                                            className="bg-neutral-800 text-white"
                                        >
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* ...existing code... (password fields and submit button remain the same) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>

                            <div className="relative group">
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-primary-yellow-1/50 focus:bg-white/15 h-auto py-3 pl-4 pr-10 rounded-lg"
                                />
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-auto py-3 mt-6 rounded-lg uppercase tracking-wider text-lg bg-primary-yellow-1 hover:bg-primary-yellow-2 text-black font-cormorantGaramond font-bold disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? "SIGNING UP..." : "SIGN UP"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-base text-gray-300 font-cormorantGaramond">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary-yellow-1 hover:text-primary-yellow-2 ml-1 transition-colors font-semibold"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
