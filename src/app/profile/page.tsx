"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sendOtp, updatePassword } from "@/services/otpServices";
import {
    disableAccount,
    updateCustomerData,
    UpdateCustomerDataRequest,
} from "@/services/userService";
import { toast } from "sonner";
import { Eye, EyeOff, Pencil, Save, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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
    const { user, loading, isAuthenticated, logout, setUser } = useAuth();
    const router = useRouter();

    // Password change states
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Disable account states
    const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);
    const [isDisablingAccount, setIsDisablingAccount] = useState(false);

    // Edit mode states
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editData, setEditData] = useState<UpdateCustomerDataRequest>({});

    // Check if passwords match
    const passwordsMatch =
        newPassword &&
        confirmPassword &&
        newPassword === confirmPassword &&
        newPassword.length >= 8;

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/login");
        }
    }, [loading, isAuthenticated, router]);

    // OTP Timer countdown
    useEffect(() => {
        if (otpTimer > 0) {
            const interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimer]);

    // Initialize edit form with current user data
    const handleStartEditing = () => {
        if (!user) return;
        setEditData({
            customerData: {
                firstName: user.customerData?.firstName || "",
                lastName: user.customerData?.lastName || "",
                phoneNumber: user.customerData?.phoneNumber || "",
                landlineNumber: user.customerData?.landlineNumber || "",
                countryCode: user.customerData?.countryCode || "",
                birthDate: user.customerData?.birthDate
                    ? new Date(user.customerData.birthDate)
                          .toISOString()
                          .split("T")[0]
                    : "",
                address: {
                    street: user.customerData?.address?.street || "",
                    city: user.customerData?.address?.city || "",
                    state: user.customerData?.address?.state || "",
                    postalCode: user.customerData?.address?.postalCode || "",
                    country: user.customerData?.address?.country || "",
                },
                businessInfo: {
                    companyName:
                        user.customerData?.businessInfo?.companyName || "",
                    businessType:
                        user.customerData?.businessInfo?.businessType || "",
                    vatNumber:
                        user.customerData?.businessInfo?.vatNumber || "",
                    websiteUrl:
                        user.customerData?.businessInfo?.websiteUrl || "",
                },
            },
            contactDetail: {
                contactName: user.contactDetail?.contactName || "",
                designation: user.contactDetail?.designation || "",
                businessTel1: user.contactDetail?.businessTel1 || "",
                businessTel2: user.contactDetail?.businessTel2 || "",
                businessFax: user.contactDetail?.businessFax || "",
                mobileNo: user.contactDetail?.mobileNo || "",
                personalNo: user.contactDetail?.personalNo || "",
                otherNo: user.contactDetail?.otherNo || "",
                email: user.contactDetail?.email || "",
            },
            billingAddress: user.billingAddress?.length
                ? user.billingAddress.map((addr) => ({ ...addr }))
                : [
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
            shippingAddress: user.shippingAddress?.length
                ? user.shippingAddress.map((addr) => ({ ...addr }))
                : [
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
        });
        setIsEditing(true);
    };

    const handleCancelEditing = () => {
        setIsEditing(false);
        setEditData({});
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            const response = await updateCustomerData(editData);
            if (response.success && response.data?.user) {
                setUser(response.data.user);
            }
            toast.success("Profile updated successfully");
            setIsEditing(false);
            setEditData({});
        } catch (error) {
            toast.error(
                typeof error === "string"
                    ? error
                    : "Failed to update profile. Please try again.",
            );
        } finally {
            setIsSaving(false);
        }
    };

    // Handle Send OTP
    const handleSendOtp = async () => {
        if (!user?.email) {
            toast.error("Email not found");
            return;
        }

        setIsSendingOtp(true);
        try {
            await sendOtp(user.email);
            toast.success("OTP sent to your email");
            setIsOtpSent(true);
            setOtpTimer(60); // 60 seconds cooldown
        } catch (error) {
            toast.error(
                typeof error === "string"
                    ? error
                    : "Failed to send OTP. Please try again.",
            );
        } finally {
            setIsSendingOtp(false);
        }
    };

    // Handle Update Password
    const handleUpdatePassword = async () => {
        if (!user?.email) {
            toast.error("Email not found");
            return;
        }

        // Validation
        if (!newPassword || !confirmPassword || !otp) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        if (otp.length !== 4) {
            toast.error("OTP must be 4 digits");
            return;
        }

        setIsUpdatingPassword(true);
        try {
            await updatePassword({
                email: user.email,
                newPassword,
                otp,
            });
            toast.success("Password updated successfully");
            handleCloseDialog();
        } catch (error) {
            toast.error(
                typeof error === "string"
                    ? error
                    : "Failed to update password. Please try again.",
            );
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    // Handle Close Dialog
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
        setIsOtpSent(false);
        setOtpTimer(0);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    // Handle Disable Account
    const handleDisableAccount = async () => {
        setIsDisablingAccount(true);
        try {
            await disableAccount();
            toast.success(
                "Your account has been disabled. You can request reactivation anytime.",
            );
            setIsDisableDialogOpen(false);
            logout();
        } catch (error) {
            toast.error(
                typeof error === "string"
                    ? error
                    : "Failed to disable account. Please try again.",
            );
        } finally {
            setIsDisablingAccount(false);
        }
    };

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
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
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
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSaveChanges}
                                    disabled={isSaving}
                                    className="purple-reveal-btn px-4 py-2.5 font-lato font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <Save size={16} />
                                    <span>
                                        {isSaving
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </span>
                                </button>
                                <button
                                    onClick={handleCancelEditing}
                                    disabled={isSaving}
                                    className="px-4 py-2.5 border border-primary-yellow-1/30 text-primary-yellow-2 rounded-lg font-lato font-semibold hover:bg-white/5 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleStartEditing}
                                    className="purple-reveal-btn px-4 py-2.5 font-lato font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                                >
                                    <Pencil size={16} />
                                    <span>Edit Profile</span>
                                </button>
                                <button
                                    onClick={() => setIsDialogOpen(true)}
                                    className="purple-reveal-btn px-4 py-2.5 font-lato font-semibold transition-all duration-300 hover:shadow-lg"
                                >
                                    <span>Change Password</span>
                                </button>
                                {user.role == "USER" && (
                                    <button
                                        onClick={() =>
                                            setIsDisableDialogOpen(true)
                                        }
                                        className="purple-reveal-btn px-4 py-2.5 font-lato font-semibold transition-all duration-300 hover:shadow-lg"
                                    >
                                        Disable Account
                                    </button>
                                )}
                            </>
                        )}
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
                            {isEditing ? (
                                <>
                                    <EditableRow
                                        label="First Name"
                                        value={
                                            editData.customerData?.firstName ||
                                            ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    firstName: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Last Name"
                                        value={
                                            editData.customerData?.lastName ||
                                            ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    lastName: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Birth Date"
                                        value={
                                            editData.customerData?.birthDate ||
                                            ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    birthDate: v,
                                                },
                                            }))
                                        }
                                        type="date"
                                    />
                                    <EditableRow
                                        label="Country Code"
                                        value={
                                            editData.customerData
                                                ?.countryCode || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    countryCode: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Phone"
                                        value={
                                            editData.customerData
                                                ?.phoneNumber || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    phoneNumber: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Landline"
                                        value={
                                            editData.customerData
                                                ?.landlineNumber || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    landlineNumber: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Street"
                                        value={
                                            editData.customerData?.address
                                                ?.street || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    address: {
                                                        ...prev.customerData
                                                            ?.address,
                                                        street: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="City"
                                        value={
                                            editData.customerData?.address
                                                ?.city || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    address: {
                                                        ...prev.customerData
                                                            ?.address,
                                                        city: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="State"
                                        value={
                                            editData.customerData?.address
                                                ?.state || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    address: {
                                                        ...prev.customerData
                                                            ?.address,
                                                        state: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Postal Code"
                                        value={
                                            editData.customerData?.address
                                                ?.postalCode || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    address: {
                                                        ...prev.customerData
                                                            ?.address,
                                                        postalCode: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Country"
                                        value={
                                            editData.customerData?.address
                                                ?.country || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    address: {
                                                        ...prev.customerData
                                                            ?.address,
                                                        country: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <InfoRow
                                        label="Name"
                                        value={getSafeConcatenatedValue([
                                            user.customerData?.firstName,
                                            user.customerData?.lastName,
                                        ])}
                                    />
                                    <InfoRow
                                        label="Birth Date"
                                        value={
                                            user.customerData?.birthDate
                                                ? new Date(
                                                      user.customerData.birthDate,
                                                  ).toLocaleDateString()
                                                : "N/A"
                                        }
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
                                                user.customerData?.address
                                                    ?.street,
                                                user.customerData?.address
                                                    ?.city,
                                                user.customerData?.address
                                                    ?.state,
                                                user.customerData?.address
                                                    ?.postalCode,
                                                user.customerData?.address
                                                    ?.country,
                                            ],
                                            ", ",
                                        )}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Business Information
                        </h2>
                        <div className="space-y-3 font-lato">
                            {isEditing ? (
                                <>
                                    <EditableRow
                                        label="Company Name"
                                        value={
                                            editData.customerData?.businessInfo
                                                ?.companyName || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    businessInfo: {
                                                        ...prev.customerData
                                                            ?.businessInfo,
                                                        companyName: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Business Type"
                                        value={
                                            editData.customerData?.businessInfo
                                                ?.businessType || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    businessInfo: {
                                                        ...prev.customerData
                                                            ?.businessInfo,
                                                        businessType: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="VAT Number"
                                        value={
                                            editData.customerData?.businessInfo
                                                ?.vatNumber || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    businessInfo: {
                                                        ...prev.customerData
                                                            ?.businessInfo,
                                                        vatNumber: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Website"
                                        value={
                                            editData.customerData?.businessInfo
                                                ?.websiteUrl || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                customerData: {
                                                    ...prev.customerData,
                                                    businessInfo: {
                                                        ...prev.customerData
                                                            ?.businessInfo,
                                                        websiteUrl: v,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </>
                            ) : (
                                <>
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
                                            user.customerData?.businessInfo
                                                ?.vatNumber,
                                        )}
                                    />
                                    <InfoRow
                                        label="Website"
                                        value={getSafeValue(
                                            user.customerData?.businessInfo
                                                ?.websiteUrl,
                                        )}
                                        isLink
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                        <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                            Contact Details
                        </h2>
                        <div className="space-y-3 font-lato">
                            {isEditing ? (
                                <>
                                    <EditableRow
                                        label="Contact Name"
                                        value={
                                            editData.contactDetail
                                                ?.contactName || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    contactName: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Designation"
                                        value={
                                            editData.contactDetail
                                                ?.designation || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    designation: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Business Tel 1"
                                        value={
                                            editData.contactDetail
                                                ?.businessTel1 || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    businessTel1: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Business Tel 2"
                                        value={
                                            editData.contactDetail
                                                ?.businessTel2 || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    businessTel2: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Business Fax"
                                        value={
                                            editData.contactDetail
                                                ?.businessFax || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    businessFax: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Mobile"
                                        value={
                                            editData.contactDetail?.mobileNo ||
                                            ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    mobileNo: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Personal"
                                        value={
                                            editData.contactDetail
                                                ?.personalNo || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    personalNo: v,
                                                },
                                            }))
                                        }
                                    />
                                    <EditableRow
                                        label="Email"
                                        value={
                                            editData.contactDetail?.email || ""
                                        }
                                        onChange={(v) =>
                                            setEditData((prev) => ({
                                                ...prev,
                                                contactDetail: {
                                                    ...prev.contactDetail,
                                                    email: v,
                                                },
                                            }))
                                        }
                                    />
                                </>
                            ) : (
                                <>
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
                                        value={getSafeValue(
                                            user.contactDetail?.email,
                                        )}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Billing Address */}
                    {(defaultBillingAddress || isEditing) && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                            <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                                Billing Address
                            </h2>
                            <div className="space-y-3 font-lato">
                                {isEditing ? (
                                    <>
                                        <EditableRow
                                            label="Print Name"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.printName || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        printName: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="Street"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.street || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        street: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="City"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.city || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        city: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="State"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.state || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        state: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="Country"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.country || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        country: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="Zip Code"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.zipCode || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        zipCode: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="VAT No"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.vat_No || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        vat_No: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="GSTN No"
                                            value={
                                                editData.billingAddress?.[0]
                                                    ?.gstn_No || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.billingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        gstn_No: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        billingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    defaultBillingAddress && (
                                        <>
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
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Shipping Address */}
                    {(defaultShippingAddress || isEditing) && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-primary-yellow-1/20 p-6">
                            <h2 className="text-2xl font-cormorantGaramond font-semibold text-primary-yellow-1 mb-4 border-b border-primary-yellow-1/20 pb-2">
                                Shipping Address
                            </h2>
                            <div className="space-y-3 font-lato">
                                {isEditing ? (
                                    <>
                                        <EditableRow
                                            label="Print Name"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.printName || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        printName: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="Street"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.street || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        street: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="City"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.city || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        city: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="State"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.state || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        state: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="Country"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.country || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        country: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="Zip Code"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.zipCode || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        zipCode: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="VAT No"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.vat_No || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        vat_No: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                        <EditableRow
                                            label="GSTN No"
                                            value={
                                                editData.shippingAddress?.[0]
                                                    ?.gstn_No || ""
                                            }
                                            onChange={(v) =>
                                                setEditData((prev) => {
                                                    const addrs = [
                                                        ...(prev.shippingAddress ||
                                                            []),
                                                    ];
                                                    addrs[0] = {
                                                        ...addrs[0],
                                                        gstn_No: v,
                                                    };
                                                    return {
                                                        ...prev,
                                                        shippingAddress: addrs,
                                                    };
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    defaultShippingAddress && (
                                        <>
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
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Disable Account Confirmation Dialog */}
            <Dialog
                open={isDisableDialogOpen}
                onOpenChange={setIsDisableDialogOpen}
            >
                <DialogContent className="bg-primary-purple-dark border-primary-yellow-1/30 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-red-400 font-cormorantGaramond text-2xl">
                            Disable Account
                        </DialogTitle>
                        <DialogDescription className="text-primary-yellow-2 font-lato">
                            Are you sure you want to disable your account? You
                            will be logged out immediately. You can request
                            reactivation anytime in the future.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <button
                            onClick={() => setIsDisableDialogOpen(false)}
                            disabled={isDisablingAccount}
                            className="px-6 py-2 border border-primary-yellow-1/30 text-primary-yellow-2 rounded-lg font-lato font-semibold hover:bg-white/5 transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDisableAccount}
                            disabled={isDisablingAccount}
                            className="px-6 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg font-lato font-semibold hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDisablingAccount
                                ? "Disabling..."
                                : "Yes, Disable My Account"}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-primary-purple-dark border-primary-yellow-1/30 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-primary-yellow-1 font-cormorantGaramond text-2xl">
                            Change Password
                        </DialogTitle>
                        <DialogDescription className="text-primary-yellow-2 font-lato">
                            Enter your new password and verify with OTP sent to
                            your email.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-lato text-primary-yellow-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-2 pr-10 bg-white/10 border border-primary-yellow-1/30 rounded-lg text-white placeholder-primary-yellow-2/50 focus:outline-none focus:ring-2 focus:ring-primary-yellow-1 font-lato"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(!showNewPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-yellow-2 hover:text-primary-yellow-1 transition-colors"
                                >
                                    {showNewPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {newPassword && newPassword.length < 8 && (
                                <p className="text-xs text-red-400 font-lato">
                                    Password must be at least 8 characters
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-lato text-primary-yellow-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-2 pr-10 bg-white/10 border border-primary-yellow-1/30 rounded-lg text-white placeholder-primary-yellow-2/50 focus:outline-none focus:ring-2 focus:ring-primary-yellow-1 font-lato"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-yellow-2 hover:text-primary-yellow-1 transition-colors"
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
                                    <p className="text-xs text-red-400 font-lato">
                                        Passwords do not match
                                    </p>
                                )}
                            {passwordsMatch && (
                                <p className="text-xs text-green-400 font-lato">
                                    ✓ Passwords match
                                </p>
                            )}
                        </div>

                        {/* OTP Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-lato text-primary-yellow-2">
                                OTP
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(
                                            /\D/g,
                                            "",
                                        );
                                        if (value.length <= 4) {
                                            setOtp(value);
                                        }
                                    }}
                                    placeholder="Enter 4-digit OTP"
                                    disabled={!isOtpSent}
                                    maxLength={4}
                                    className="flex-1 px-4 py-2 bg-white/10 border border-primary-yellow-1/30 rounded-lg text-white placeholder-primary-yellow-2/50 focus:outline-none focus:ring-2 focus:ring-primary-yellow-1 font-lato disabled:opacity-50"
                                />
                                <button
                                    onClick={handleSendOtp}
                                    disabled={
                                        isSendingOtp ||
                                        otpTimer > 0 ||
                                        !passwordsMatch
                                    }
                                    className="px-4 py-2 bg-primary-yellow-1/20 border border-primary-yellow-1 text-primary-yellow-1 rounded-lg font-lato font-semibold hover:bg-primary-yellow-1 hover:text-primary-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                >
                                    {isSendingOtp
                                        ? "Sending..."
                                        : otpTimer > 0
                                          ? `${otpTimer}s`
                                          : isOtpSent
                                            ? "Resend"
                                            : "Send OTP"}
                                </button>
                            </div>
                            {isOtpSent && (
                                <p className="text-xs text-primary-yellow-2/70 font-lato">
                                    OTP sent to {user?.email}
                                </p>
                            )}
                            {!passwordsMatch && (
                                <p className="text-xs text-primary-yellow-2/70 font-lato">
                                    Passwords must match to send OTP
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <button
                            onClick={handleCloseDialog}
                            className="px-6 py-2 border border-primary-yellow-1/30 text-primary-yellow-2 rounded-lg font-lato font-semibold hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdatePassword}
                            disabled={
                                isUpdatingPassword ||
                                !isOtpSent ||
                                !passwordsMatch ||
                                !otp
                            }
                            className="purple-reveal-btn px-6 py-2 rounded-lg font-lato font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>
                                {isUpdatingPassword
                                    ? "Updating..."
                                    : "Update Password"}
                            </span>
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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

// Editable row component for edit mode
function EditableRow({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "date";
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
