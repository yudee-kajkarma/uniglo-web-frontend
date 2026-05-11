"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Building2, Mail, Phone, MapPin } from "lucide-react";
import {
    getEntity,
    updateUserEntityKey,
    Entity,
} from "@/services/entityService";
import { toast } from "sonner";

interface AssignEntityDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string;
    username: string;
    onSuccess: () => void;
}

export function AssignEntityDialog({
    open,
    onOpenChange,
    userId,
    username,
    onSuccess,
}: AssignEntityDialogProps) {
    const [entityKey, setEntityKey] = useState("");
    const [entityData, setEntityData] = useState<Entity | null>(null);
    const [loading, setLoading] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleFetchEntity = async () => {
        if (!entityKey.trim()) {
            toast.error("Please enter an entity key");
            return;
        }

        try {
            setLoading(true);
            setFetchError(null);
            const response = await getEntity(entityKey.trim());
            setEntityData(response.data);
            if (!response.data) {
                toast.error("No entity found with the provided key");
            } else {
                toast.success("Entity details fetched successfully");
            }
        } catch (error: any) {
            setFetchError(error || "Failed to fetch entity details");
            setEntityData(null);
            toast.error(error || "Failed to fetch entity details");
        } finally {
            setLoading(false);
        }
    };

    const handleAssignEntity = async () => {
        if (!entityData) return;

        try {
            setAssigning(true);
            const response = await updateUserEntityKey(
                userId,
                entityKey.trim(),
            );
            toast.success(
                response.message || "Entity key assigned successfully",
            );
            onSuccess();
            handleClose();
        } catch (error: any) {
            toast.error(error || "Failed to assign entity key");
        } finally {
            setAssigning(false);
        }
    };

    const handleClose = () => {
        setEntityKey("");
        setEntityData(null);
        setFetchError(null);
        onOpenChange(false);
    };

    const handleDialogOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            // Dialog is being closed
            handleClose();
        } else {
            onOpenChange(newOpen);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !loading && entityKey.trim()) {
            handleFetchEntity();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Assign Entity Key</DialogTitle>
                    <DialogDescription>
                        Assign an entity key to user:{" "}
                        <strong>{username}</strong>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Entity Key Input */}
                    <div className="space-y-2">
                        <Label htmlFor="entityKey">Entity Key</Label>
                        <div className="flex gap-2">
                            <Input
                                id="entityKey"
                                placeholder="Enter entity key (e.g., 5099)"
                                value={entityKey}
                                onChange={(e) => setEntityKey(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={loading || assigning}
                                className="flex-1"
                            />
                            <Button
                                onClick={handleFetchEntity}
                                disabled={
                                    loading || !entityKey.trim() || assigning
                                }
                                variant="outline"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Fetching...
                                    </>
                                ) : (
                                    "Fetch"
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {fetchError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{fetchError}</p>
                        </div>
                    )}

                    {/* Entity Details */}
                    {entityData && (
                        <div className="space-y-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Building2 className="w-5 h-5 text-primary-purple" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {entityData.CompanyName || "N/A"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Entity Key: {entityData.EntityKey}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Company Details */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                        Company Details
                                    </h4>
                                    <div className="space-y-2">
                                        <DetailItem
                                            label="Nick Name"
                                            value={entityData.NickName || "N/A"}
                                        />
                                        <DetailItem
                                            label="Currency"
                                            value={entityData.Currency || "N/A"}
                                        />
                                        <DetailItem
                                            label="Company Group"
                                            value={
                                                entityData.CompanyGroup || "N/A"
                                            }
                                        />
                                        <DetailItem
                                            label="Firm Reg No"
                                            value={
                                                entityData.FirmRegNo || "N/A"
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Financial Details */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                        Financial Details
                                    </h4>
                                    <div className="space-y-2">
                                        <DetailItem
                                            label="Default Terms"
                                            value={entityData.DefaultTerms || 0}
                                        />
                                        <DetailItem
                                            label="Credit Limit"
                                            value={entityData.CreditLimit || 0}
                                        />
                                        <DetailItem
                                            label="Annual Target"
                                            value={entityData.AnnualTarget || 0}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details */}
                            {entityData.ContactDetail && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Contact Details
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <DetailItem
                                            label="Contact Name"
                                            value={
                                                entityData.ContactDetail
                                                    .ContactName || "N/A"
                                            }
                                        />
                                        <DetailItem
                                            label="Designation"
                                            value={
                                                entityData.ContactDetail
                                                    .Designation || "N/A"
                                            }
                                        />
                                        <DetailItem
                                            label="Email"
                                            value={
                                                entityData.ContactDetail
                                                    .Email || "N/A"
                                            }
                                            icon={<Mail className="w-3 h-3" />}
                                        />
                                        <DetailItem
                                            label="Mobile"
                                            value={
                                                entityData.ContactDetail
                                                    .MobileNo || "N/A"
                                            }
                                        />
                                        <DetailItem
                                            label="Business Tel 1"
                                            value={
                                                entityData.ContactDetail
                                                    .BusinessTel1 || "N/A"
                                            }
                                        />
                                        <DetailItem
                                            label="Business Tel 2"
                                            value={
                                                entityData.ContactDetail
                                                    .BusinessTel2 || "N/A"
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Addresses */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Billing Address */}
                                {entityData.BillingAddress &&
                                    entityData.BillingAddress.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Billing Address
                                            </h4>
                                            {entityData.BillingAddress.map(
                                                (address, index) => (
                                                    <div
                                                        key={address.AddressKey}
                                                        className="space-y-1 p-3 bg-white rounded border border-gray-200"
                                                    >
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {address.PrintName}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {address.Street},{" "}
                                                            {address.City}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {address.State},{" "}
                                                            {address.Country} -{" "}
                                                            {address.ZipCode}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}

                                {/* Shipping Address */}
                                {entityData.ShippingAddress &&
                                    entityData.ShippingAddress.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Shipping Address
                                            </h4>
                                            {entityData.ShippingAddress.map(
                                                (address, index) => (
                                                    <div
                                                        key={address.AddressKey}
                                                        className="space-y-1 p-3 bg-white rounded border border-gray-200"
                                                    >
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {address.PrintName}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {address.Street},{" "}
                                                            {address.City}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {address.State},{" "}
                                                            {address.Country} -{" "}
                                                            {address.ZipCode}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}
                            </div>

                            {/* Remarks */}
                            {entityData.Remarks && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        Remarks
                                    </h4>
                                    <p className="text-sm text-gray-600 p-3 bg-white rounded border border-gray-200">
                                        {entityData.Remarks}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={assigning}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAssignEntity}
                        disabled={!entityData || assigning}
                        className="bg-primary-purple hover:bg-primary-purple/90"
                    >
                        {assigning ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Assigning...
                            </>
                        ) : (
                            "Assign Entity"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const DetailItem = ({
    label,
    value,
    icon,
}: {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
}) => (
    <div className="flex items-start gap-2">
        {icon && <div className="mt-0.5 text-gray-400">{icon}</div>}
        <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-gray-500 block">
                {label}:
            </span>
            <div className="text-sm text-gray-900 mt-0.5 break-words">
                {value || "N/A"}
            </div>
        </div>
    </div>
);
