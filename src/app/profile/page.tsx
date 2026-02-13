"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Helper function for safe value rendering with fallback
function getSafeValue(value: any, fallback: string = "N/A"): string {
    if (value === undefined || value === null || value === "") {
        return fallback;
    }
    return String(value);
}

// Helper function for safe concatenation of multiple values
function getSafeConcatenatedValue(
    values: (string | undefined | null)[],
    separator: string = " ",
    fallback: string = "N/A",
): string {
    const filtered = values.filter(
        (v) => v !== undefined && v !== null && v !== "",
    );
    return filtered.length > 0 ? filtered.join(separator) : fallback;
}

export default function ProfilePage() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-gradient flex items-center justify-center">
                <div className="text-primary-yellow-1 text-xl font-lato">
                    Loading...
                </div>
            </div>
        );
    }

    if (!user) return null;

    const defaultBillingAddress =
        user.billingAddress?.find((addr) => addr.isDefault === "Y") ||
        user.billingAddress?.[0];
    const defaultShippingAddress =
        user.shippingAddress?.find((addr) => addr.isDefault === "Y") ||
        user.shippingAddress?.[0];

    return (
        <div className="min-h-screen bg-brand-gradient py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 mb-2">
                        Profile Information
                    </h1>
                    <p className="text-primary-yellow-2 font-lato">
                        Welcome back,{" "}
                        {getSafeConcatenatedValue([
                            user.customerData?.firstName,
                            user.customerData?.lastName,
                        ])}
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Account Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Account Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Username"
                                value={getSafeValue(user.username)}
                            />
                            <InfoRow
                                label="Email"
                                value={getSafeValue(user.email)}
                            />
                            <InfoRow
                                label="Status"
                                value={getSafeValue(user.status)}
                            />
                            <InfoRow
                                label="Role"
                                value={getSafeValue(user.role)}
                            />
                            <InfoRow
                                label="Member Since"
                                value={
                                    user.createdAt
                                        ? new Date(
                                              user.createdAt,
                                          ).toLocaleDateString()
                                        : "N/A"
                                }
                            />
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Company Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Company Name"
                                value={getSafeValue(user.companyName)}
                            />
                            <InfoRow
                                label="Contact Name"
                                value={getSafeValue(user.contactName)}
                            />
                            <InfoRow
                                label="Currency"
                                value={getSafeValue(user.currency)}
                            />
                            <InfoRow
                                label="Company Group"
                                value={getSafeValue(user.companyGroup)}
                            />
                            <InfoRow
                                label="Firm Reg No"
                                value={getSafeValue(user.firmRegNo)}
                            />
                            <InfoRow
                                label="Default Terms"
                                value={getSafeValue(user.defaultTerms)}
                            />
                            <InfoRow
                                label="Credit Limit"
                                value={
                                    user.currency && user.creditLimit
                                        ? `${user.currency} ${user.creditLimit}`
                                        : "N/A"
                                }
                            />
                            <InfoRow
                                label="Annual Target"
                                value={
                                    user.currency && user.annualTarget
                                        ? `${user.currency} ${user.annualTarget}`
                                        : "N/A"
                                }
                            />
                            <InfoRow
                                label="Remarks"
                                value={getSafeValue(user.remarks)}
                            />
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Personal Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Name"
                                value={getSafeConcatenatedValue([
                                    user.customerData?.firstName,
                                    user.customerData?.lastName,
                                ])}
                            />
                            <InfoRow
                                label="Phone"
                                value={getSafeConcatenatedValue([
                                    user.customerData?.countryCode,
                                    user.customerData?.phoneNumber,
                                ])}
                            />
                            <InfoRow
                                label="Landline"
                                value={getSafeValue(
                                    user.customerData?.landlineNumber,
                                )}
                            />
                            <InfoRow
                                label="Address"
                                value={getSafeConcatenatedValue(
                                    [
                                        user.customerData?.address?.street,
                                        user.customerData?.address?.city,
                                        user.customerData?.address?.state,
                                        user.customerData?.address?.postalCode,
                                        user.customerData?.address?.country,
                                    ],
                                    ", ",
                                )}
                            />
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Business Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Business Type"
                                value={getSafeValue(
                                    user.customerData?.businessInfo
                                        ?.businessType,
                                )}
                            />
                            <InfoRow
                                label="VAT Number"
                                value={getSafeValue(
                                    user.customerData?.businessInfo?.vatNumber,
                                )}
                            />
                            <InfoRow
                                label="Website"
                                value={getSafeValue(
                                    user.customerData?.businessInfo?.websiteUrl,
                                )}
                                isLink
                            />
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Contact Details
                        </h2>
                        <div className="space-y-3 font-lato">
                            <InfoRow
                                label="Contact Name"
                                value={getSafeValue(
                                    user.contactDetail?.contactName,
                                )}
                            />
                            <InfoRow
                                label="Designation"
                                value={getSafeValue(
                                    user.contactDetail?.designation,
                                )}
                            />
                            <InfoRow
                                label="Business Tel 1"
                                value={getSafeValue(
                                    user.contactDetail?.businessTel1,
                                )}
                            />
                            <InfoRow
                                label="Business Tel 2"
                                value={getSafeValue(
                                    user.contactDetail?.businessTel2,
                                )}
                            />
                            <InfoRow
                                label="Business Fax"
                                value={getSafeValue(
                                    user.contactDetail?.businessFax,
                                )}
                            />
                            <InfoRow
                                label="Mobile"
                                value={getSafeValue(
                                    user.contactDetail?.mobileNo,
                                )}
                            />
                            <InfoRow
                                label="Personal"
                                value={getSafeValue(
                                    user.contactDetail?.personalNo,
                                )}
                            />
                            <InfoRow
                                label="Email"
                                value={getSafeValue(user.contactDetail?.email)}
                            />
                        </div>
                    </div>

                    {/* Billing Address */}
                    {defaultBillingAddress && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                            <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                                Billing Address
                            </h2>
                            <div className="space-y-3 font-lato">
                                <InfoRow
                                    label="Print Name"
                                    value={getSafeValue(
                                        defaultBillingAddress.printName,
                                    )}
                                />
                                <InfoRow
                                    label="Address"
                                    value={getSafeConcatenatedValue(
                                        [
                                            defaultBillingAddress.street,
                                            defaultBillingAddress.city,
                                            defaultBillingAddress.state,
                                            defaultBillingAddress.zipCode,
                                            defaultBillingAddress.country,
                                        ],
                                        ", ",
                                    )}
                                />
                                <InfoRow
                                    label="VAT No"
                                    value={getSafeValue(
                                        defaultBillingAddress.vat_No,
                                    )}
                                />
                                <InfoRow
                                    label="GSTN No"
                                    value={getSafeValue(
                                        defaultBillingAddress.gstn_No,
                                    )}
                                />
                            </div>
                        </div>
                    )}

                    {/* Shipping Address */}
                    {defaultShippingAddress && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                            <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                                Shipping Address
                            </h2>
                            <div className="space-y-3 font-lato">
                                <InfoRow
                                    label="Print Name"
                                    value={getSafeValue(
                                        defaultShippingAddress.printName,
                                    )}
                                />
                                <InfoRow
                                    label="Address"
                                    value={getSafeConcatenatedValue(
                                        [
                                            defaultShippingAddress.street,
                                            defaultShippingAddress.city,
                                            defaultShippingAddress.state,
                                            defaultShippingAddress.zipCode,
                                            defaultShippingAddress.country,
                                        ],
                                        ", ",
                                    )}
                                />
                                <InfoRow
                                    label="VAT No"
                                    value={getSafeValue(
                                        defaultShippingAddress.vat_No,
                                    )}
                                />
                                <InfoRow
                                    label="GSTN No"
                                    value={getSafeValue(
                                        defaultShippingAddress.gstn_No,
                                    )}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper Component - Updated to always render with fallback
function InfoRow({
    label,
    value,
    isLink = false,
}: {
    label: string;
    value: string;
    isLink?: boolean;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-primary-yellow-2 font-medium">{label}:</span>
            {isLink && value !== "N/A" ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-yellow-1 hover:text-primary-yellow-3 transition-colors underline"
                >
                    {value}
                </a>
            ) : (
                <span className="text-white">{value}</span>
            )}
        </div>
    );
}
