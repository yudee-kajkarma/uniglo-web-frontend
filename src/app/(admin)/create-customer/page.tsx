"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Save, X } from "lucide-react";
import {
    AdminCreateCustomerRequest,
    createCustomerByAdmin,
} from "@/services/adminServices";

const emptyForm: AdminCreateCustomerRequest = {
    username: "",
    email: "",
    password: "",
    companyName: "",
    contactName: "",
    currency: "",
    companyGroup: "",
    firmRegNo: "",
    defaultTerms: "",
    creditLimit: "",
    annualTarget: "",
    remarks: "",
    billingAddress: [
        {
            isDefault: "Y",
            printName: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
            vat_No: "",
            gstn_No: "",
        },
    ],
    shippingAddress: [
        {
            isDefault: "Y",
            printName: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
            vat_No: "",
            gstn_No: "",
        },
    ],
    contactDetail: {
        contactName: "",
        designation: "",
        businessTel1: "",
        businessTel2: "",
        businessFax: "",
        mobileNo: "",
        personalNo: "",
        otherNo: "",
        email: "",
    },
    customerData: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        landlineNumber: "",
        countryCode: "",
        birthDate: "",
        address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        },
        businessInfo: {
            companyName: "",
            businessType: "",
            vatNumber: "",
            websiteUrl: "",
        },
    },
};

export default function CreateCustomerPage() {
    const router = useRouter();
    const [form, setForm] = useState<AdminCreateCustomerRequest>(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const updateField = <K extends keyof AdminCreateCustomerRequest>(
        key: K,
        value: AdminCreateCustomerRequest[K],
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const updateContactDetail = (
        key: keyof AdminCreateCustomerRequest["contactDetail"],
        value: string,
    ) => {
        setForm((prev) => ({
            ...prev,
            contactDetail: { ...prev.contactDetail, [key]: value },
        }));
    };

    const updateCustomerData = (
        key: keyof Omit<
            AdminCreateCustomerRequest["customerData"],
            "address" | "businessInfo"
        >,
        value: string,
    ) => {
        setForm((prev) => ({
            ...prev,
            customerData: { ...prev.customerData, [key]: value },
        }));
    };

    const updateCustomerAddress = (
        key: keyof AdminCreateCustomerRequest["customerData"]["address"],
        value: string,
    ) => {
        setForm((prev) => ({
            ...prev,
            customerData: {
                ...prev.customerData,
                address: { ...prev.customerData.address, [key]: value },
            },
        }));
    };

    const updateBusinessInfo = (
        key: keyof AdminCreateCustomerRequest["customerData"]["businessInfo"],
        value: string,
    ) => {
        setForm((prev) => ({
            ...prev,
            customerData: {
                ...prev.customerData,
                businessInfo: {
                    ...prev.customerData.businessInfo,
                    [key]: value,
                },
            },
        }));
    };

    const updateBillingAddress = (
        key: keyof AdminCreateCustomerRequest["billingAddress"][number],
        value: string,
    ) => {
        setForm((prev) => {
            const next = [...prev.billingAddress];
            next[0] = { ...next[0], [key]: value };
            return { ...prev, billingAddress: next };
        });
    };

    const updateShippingAddress = (
        key: keyof AdminCreateCustomerRequest["shippingAddress"][number],
        value: string,
    ) => {
        setForm((prev) => {
            const next = [...prev.shippingAddress];
            next[0] = { ...next[0], [key]: value };
            return { ...prev, shippingAddress: next };
        });
    };

    const handleCancel = () => {
        router.push("/members-management");
    };

    const handleSubmit = async () => {
        if (!form.username.trim()) {
            toast.error("Username is required");
            return;
        }
        if (!form.email.trim()) {
            toast.error("Email is required");
            return;
        }
        if (!form.password || form.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setIsSaving(true);
        try {
            const response = await createCustomerByAdmin(form);
            if (response.success) {
                toast.success(
                    response.message || "Customer created successfully",
                );
                router.push("/members-management");
            } else {
                toast.error(response.message || "Failed to create customer");
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    (typeof error === "string"
                        ? error
                        : "Failed to create customer. Please try again."),
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-gradient py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-cormorantGaramond font-bold text-primary-yellow-1 mb-2">
                            Create Customer
                        </h1>
                        <p className="text-primary-yellow-2 font-lato">
                            Fill in the details below to add a new customer
                            account.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="purple-reveal-btn px-4 py-2.5 font-lato font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                        >
                            <Save size={16} />
                            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isSaving}
                            className="px-4 py-2.5 border border-primary-yellow-1/30 text-primary-yellow-2 rounded-lg font-lato font-semibold hover:bg-white/5 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Account Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Account Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <EditableRow
                                label="Username"
                                value={form.username}
                                onChange={(v) => updateField("username", v)}
                            />
                            <EditableRow
                                label="Email"
                                value={form.email}
                                onChange={(v) => updateField("email", v)}
                                type="email"
                            />
                            <PasswordRow
                                label="Password"
                                value={form.password}
                                onChange={(v) => updateField("password", v)}
                                show={showPassword}
                                onToggle={() => setShowPassword((p) => !p)}
                            />
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Company Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <EditableRow
                                label="Company Name"
                                value={form.companyName}
                                onChange={(v) => updateField("companyName", v)}
                            />
                            <EditableRow
                                label="Contact Name"
                                value={form.contactName}
                                onChange={(v) => updateField("contactName", v)}
                            />
                            <EditableRow
                                label="Currency"
                                value={form.currency}
                                onChange={(v) => updateField("currency", v)}
                            />
                            <EditableRow
                                label="Company Group"
                                value={form.companyGroup}
                                onChange={(v) => updateField("companyGroup", v)}
                            />
                            <EditableRow
                                label="Firm Reg No"
                                value={form.firmRegNo}
                                onChange={(v) => updateField("firmRegNo", v)}
                            />
                            <EditableRow
                                label="Default Terms"
                                value={form.defaultTerms}
                                onChange={(v) => updateField("defaultTerms", v)}
                            />
                            <EditableRow
                                label="Credit Limit"
                                value={form.creditLimit}
                                onChange={(v) => updateField("creditLimit", v)}
                            />
                            <EditableRow
                                label="Annual Target"
                                value={form.annualTarget}
                                onChange={(v) => updateField("annualTarget", v)}
                            />
                            <EditableRow
                                label="Remarks"
                                value={form.remarks}
                                onChange={(v) => updateField("remarks", v)}
                            />
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Personal Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <EditableRow
                                label="First Name"
                                value={form.customerData.firstName}
                                onChange={(v) =>
                                    updateCustomerData("firstName", v)
                                }
                            />
                            <EditableRow
                                label="Last Name"
                                value={form.customerData.lastName}
                                onChange={(v) =>
                                    updateCustomerData("lastName", v)
                                }
                            />
                            <EditableRow
                                label="Birth Date"
                                value={form.customerData.birthDate}
                                onChange={(v) =>
                                    updateCustomerData("birthDate", v)
                                }
                                type="date"
                            />
                            <EditableRow
                                label="Country Code"
                                value={form.customerData.countryCode}
                                onChange={(v) =>
                                    updateCustomerData("countryCode", v)
                                }
                            />
                            <EditableRow
                                label="Phone"
                                value={form.customerData.phoneNumber}
                                onChange={(v) =>
                                    updateCustomerData("phoneNumber", v)
                                }
                            />
                            <EditableRow
                                label="Landline"
                                value={form.customerData.landlineNumber}
                                onChange={(v) =>
                                    updateCustomerData("landlineNumber", v)
                                }
                            />
                            <EditableRow
                                label="Street"
                                value={form.customerData.address.street}
                                onChange={(v) =>
                                    updateCustomerAddress("street", v)
                                }
                            />
                            <EditableRow
                                label="City"
                                value={form.customerData.address.city}
                                onChange={(v) =>
                                    updateCustomerAddress("city", v)
                                }
                            />
                            <EditableRow
                                label="State"
                                value={form.customerData.address.state}
                                onChange={(v) =>
                                    updateCustomerAddress("state", v)
                                }
                            />
                            <EditableRow
                                label="Postal Code"
                                value={form.customerData.address.postalCode}
                                onChange={(v) =>
                                    updateCustomerAddress("postalCode", v)
                                }
                            />
                            <EditableRow
                                label="Country"
                                value={form.customerData.address.country}
                                onChange={(v) =>
                                    updateCustomerAddress("country", v)
                                }
                            />
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Business Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            <EditableRow
                                label="Company Name"
                                value={
                                    form.customerData.businessInfo.companyName
                                }
                                onChange={(v) =>
                                    updateBusinessInfo("companyName", v)
                                }
                            />
                            <EditableRow
                                label="Business Type"
                                value={
                                    form.customerData.businessInfo.businessType
                                }
                                onChange={(v) =>
                                    updateBusinessInfo("businessType", v)
                                }
                            />
                            <EditableRow
                                label="VAT Number"
                                value={
                                    form.customerData.businessInfo.vatNumber
                                }
                                onChange={(v) =>
                                    updateBusinessInfo("vatNumber", v)
                                }
                            />
                            <EditableRow
                                label="Website"
                                value={
                                    form.customerData.businessInfo.websiteUrl
                                }
                                onChange={(v) =>
                                    updateBusinessInfo("websiteUrl", v)
                                }
                            />
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Contact Details
                        </h2>
                        <div className="space-y-3 font-lato">
                            <EditableRow
                                label="Contact Name"
                                value={form.contactDetail.contactName}
                                onChange={(v) =>
                                    updateContactDetail("contactName", v)
                                }
                            />
                            <EditableRow
                                label="Designation"
                                value={form.contactDetail.designation}
                                onChange={(v) =>
                                    updateContactDetail("designation", v)
                                }
                            />
                            <EditableRow
                                label="Business Tel 1"
                                value={form.contactDetail.businessTel1}
                                onChange={(v) =>
                                    updateContactDetail("businessTel1", v)
                                }
                            />
                            <EditableRow
                                label="Business Tel 2"
                                value={form.contactDetail.businessTel2}
                                onChange={(v) =>
                                    updateContactDetail("businessTel2", v)
                                }
                            />
                            <EditableRow
                                label="Business Fax"
                                value={form.contactDetail.businessFax}
                                onChange={(v) =>
                                    updateContactDetail("businessFax", v)
                                }
                            />
                            <EditableRow
                                label="Mobile"
                                value={form.contactDetail.mobileNo}
                                onChange={(v) =>
                                    updateContactDetail("mobileNo", v)
                                }
                            />
                            <EditableRow
                                label="Personal"
                                value={form.contactDetail.personalNo}
                                onChange={(v) =>
                                    updateContactDetail("personalNo", v)
                                }
                            />
                            <EditableRow
                                label="Email"
                                value={form.contactDetail.email}
                                onChange={(v) =>
                                    updateContactDetail("email", v)
                                }
                                type="email"
                            />
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Billing Address
                        </h2>
                        <div className="space-y-3 font-lato">
                            <EditableRow
                                label="Print Name"
                                value={form.billingAddress[0].printName}
                                onChange={(v) =>
                                    updateBillingAddress("printName", v)
                                }
                            />
                            <EditableRow
                                label="Street"
                                value={form.billingAddress[0].street}
                                onChange={(v) =>
                                    updateBillingAddress("street", v)
                                }
                            />
                            <EditableRow
                                label="City"
                                value={form.billingAddress[0].city}
                                onChange={(v) =>
                                    updateBillingAddress("city", v)
                                }
                            />
                            <EditableRow
                                label="State"
                                value={form.billingAddress[0].state}
                                onChange={(v) =>
                                    updateBillingAddress("state", v)
                                }
                            />
                            <EditableRow
                                label="Country"
                                value={form.billingAddress[0].country}
                                onChange={(v) =>
                                    updateBillingAddress("country", v)
                                }
                            />
                            <EditableRow
                                label="Zip Code"
                                value={form.billingAddress[0].zipCode}
                                onChange={(v) =>
                                    updateBillingAddress("zipCode", v)
                                }
                            />
                            <EditableRow
                                label="VAT No"
                                value={form.billingAddress[0].vat_No}
                                onChange={(v) =>
                                    updateBillingAddress("vat_No", v)
                                }
                            />
                            <EditableRow
                                label="GSTN No"
                                value={form.billingAddress[0].gstn_No}
                                onChange={(v) =>
                                    updateBillingAddress("gstn_No", v)
                                }
                            />
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Shipping Address
                        </h2>
                        <div className="space-y-3 font-lato">
                            <EditableRow
                                label="Print Name"
                                value={form.shippingAddress[0].printName}
                                onChange={(v) =>
                                    updateShippingAddress("printName", v)
                                }
                            />
                            <EditableRow
                                label="Street"
                                value={form.shippingAddress[0].street}
                                onChange={(v) =>
                                    updateShippingAddress("street", v)
                                }
                            />
                            <EditableRow
                                label="City"
                                value={form.shippingAddress[0].city}
                                onChange={(v) =>
                                    updateShippingAddress("city", v)
                                }
                            />
                            <EditableRow
                                label="State"
                                value={form.shippingAddress[0].state}
                                onChange={(v) =>
                                    updateShippingAddress("state", v)
                                }
                            />
                            <EditableRow
                                label="Country"
                                value={form.shippingAddress[0].country}
                                onChange={(v) =>
                                    updateShippingAddress("country", v)
                                }
                            />
                            <EditableRow
                                label="Zip Code"
                                value={form.shippingAddress[0].zipCode}
                                onChange={(v) =>
                                    updateShippingAddress("zipCode", v)
                                }
                            />
                            <EditableRow
                                label="VAT No"
                                value={form.shippingAddress[0].vat_No}
                                onChange={(v) =>
                                    updateShippingAddress("vat_No", v)
                                }
                            />
                            <EditableRow
                                label="GSTN No"
                                value={form.shippingAddress[0].gstn_No}
                                onChange={(v) =>
                                    updateShippingAddress("gstn_No", v)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EditableRow({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "date" | "email";
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <label className="text-primary-yellow-2 font-medium shrink-0">
                {label}:
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="sm:max-w-[60%] w-full px-3 py-1.5 bg-white/10 border border-primary-yellow-1/30 rounded-lg text-white placeholder-primary-yellow-2/50 focus:outline-none focus:ring-2 focus:ring-primary-yellow-1 font-lato text-sm"
                placeholder={label}
            />
        </div>
    );
}

function PasswordRow({
    label,
    value,
    onChange,
    show,
    onToggle,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    show: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <label className="text-primary-yellow-2 font-medium shrink-0">
                {label}:
            </label>
            <div className="sm:max-w-[60%] w-full relative">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3 py-1.5 pr-10 bg-white/10 border border-primary-yellow-1/30 rounded-lg text-white placeholder-primary-yellow-2/50 focus:outline-none focus:ring-2 focus:ring-primary-yellow-1 font-lato text-sm"
                    placeholder={label}
                />
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-yellow-2 hover:text-primary-yellow-1 transition-colors"
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );
}
