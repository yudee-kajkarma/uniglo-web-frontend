"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { approveCustomerData } from "@/services/adminServices";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function ApproveUserPage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.userId as string;

    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading",
    );
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!userId) return;

        const approve = async () => {
            try {
                const response = await approveCustomerData(userId);
                setStatus("success");
                setMessage(response.message || "User approved successfully");
                setTimeout(() => {
                    router.replace("/members-management");
                }, 2000);
            } catch (error: any) {
                setStatus("error");
                setMessage(
                    error?.response?.data?.message || "Failed to approve user",
                );
                setTimeout(() => {
                    router.replace("/members-management");
                }, 3000);
            }
        };

        approve();
    }, [userId, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center space-y-4">
                {status === "loading" && (
                    <>
                        <Loader2 className="w-12 h-12 animate-spin text-primary-purple mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Approving User...
                        </h2>
                        <p className="text-sm text-gray-500">
                            Please wait while we process the approval.
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            User Approved
                        </h2>
                        <p className="text-sm text-gray-500">{message}</p>
                        <p className="text-xs text-gray-400">
                            Redirecting to Members Management...
                        </p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            Approval Failed
                        </h2>
                        <p className="text-sm text-gray-500">{message}</p>
                        <p className="text-xs text-gray-400">
                            Redirecting to Members Management...
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
