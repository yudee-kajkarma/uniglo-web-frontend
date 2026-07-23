"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/shared/FileUploader";
import {
    submitSellDiamondForm,
    SellDiamondFormData,
} from "@/services/inquiryService";
import { toast } from "sonner";

interface SellDiamondFormProps {
    title?: string;
    subtitle?: string;
    onSuccess?: () => void;
}

export default function SellDiamondForm({
    title,
    subtitle,
    onSuccess,
}: SellDiamondFormProps) {
    const t = useTranslations("sellDiamondForm");

    const resolvedTitle = title ?? t("defaultTitle");
    const resolvedSubtitle = subtitle ?? "";

    const [formData, setFormData] = useState<SellDiamondFormData>({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        material: "",
        description: "",
        images: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilesChange = (files: File[]) => {
        setFormData((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitSellDiamondForm(formData);
            toast.success(t("submitSuccessToast"));
            // Reset form
            setFormData({
                name: "",
                email: "",
                address: "",
                phoneNumber: "",
                material: "",
                description: "",
                images: [],
            });
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            toast.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mt-16 bg-brand-gradient">
            <div className="max-w-7xl mx-auto px-4 rounded-lg p-10 shadow-lg">
                {resolvedTitle && (
                    <h2 className="text-white text-center text-2xl md:text-3xl font-cormorantGaramond mb-4">
                        {resolvedTitle}
                    </h2>
                )}
                {resolvedSubtitle && (
                    <p className="text-white/80 text-center text-base font-lora mb-10 max-w-4xl mx-auto">
                        {resolvedSubtitle}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                    onInvalidCapture={(e) => (e.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity(t("pleaseFillOutThisField"))}
                    onInput={(e) => (e.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity("")}
                >
                    {/* Name */}
                    <div>
                        <label className="block text-primary mb-2 font-semibold font-lora">
                            {t("nameLabel")} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t("namePlaceholder")}
                            required
                            className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="font-lora block text-primary mb-2 font-semibold">
                            {t("emailLabel")} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t("emailPlaceholder")}
                            required
                            className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block font-lora text-primary mb-2 font-semibold">
                            {t("addressLabel")} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder={t("addressPlaceholder")}
                            required
                            className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block font-lora text-primary mb-2 font-semibold">
                            {t("phoneLabel")} <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder={t("phonePlaceholder")}
                            required
                            className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Material (Carat/Material) */}
                    <div className="md:col-span-2">
                        <label className="block font-lora text-primary mb-2 font-semibold">
                            {t("materialLabel")}{" "}
                            <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleInputChange}
                            placeholder={t("materialPlaceholder")}
                            required
                            className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block font-lora text-primary mb-2 font-semibold">
                            {t("descriptionLabel")} <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder={t("descriptionPlaceholder")}
                            required
                            rows={4}
                            className="w-full bg-transparent border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-primary resize-none"
                        />
                    </div>

                    {/* File Uploader */}
                    <div className="md:col-span-2">
                        <label className="block font-lora text-primary mb-2 font-semibold">
                            {t("uploadImagesLabel")}
                        </label>
                        <FileUploader
                            files={formData.images || []}
                            onFilesChange={handleFilesChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-start mt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="gold-reveal-btn bg-primary font-semibold px-8 py-3 text-base font-lora disabled:opacity-50"
                        >
                            <span>
                                {isSubmitting
                                    ? t("submittingButton")
                                    : t("submitButton")}
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}