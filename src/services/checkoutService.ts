import apiClient from "@/lib/api";
import { ApiSuccessResponse, ApiErrorResponse } from "./authServices";
import { Cart, CartItem } from "@/interface/diamondInterface";
import { AxiosError } from "axios";

// Checkout is an independent stage that mirrors cart. Customers reach it via
// the "Checkout" action on /cart, and review/manage it on /checkout.

export interface CheckoutResponseData {
    cart: Cart | null;
    totalItems: number;
}

export interface RemoveFromCheckoutResponseData {
    message: string;
    cart: Cart | null;
}

export interface CheckoutItemMessageResponseData {
    item: CartItem;
}

export interface CheckoutFromCartResult {
    added: string[];
    addedDiamonds: string[];
    addedMelles: string[];
    failed: Array<{ id: string; reason: string }>;
    alreadyInCheckout: string[];
    notFound: string[];
    invalid: string[];
    totalRequested: number;
    totalAdded: number;
}

// Copy the authenticated user's cart into their checkout (cart kept). Pass
// `lineIds` (cart line ids) to check out only those stones; omit for all.
export const checkoutFromCart = async (
    lineIds?: string[],
): Promise<ApiSuccessResponse<CheckoutFromCartResult>> => {
    try {
        const body =
            lineIds && lineIds.length > 0 ? { lineIds } : undefined;
        const response = await apiClient.post<
            ApiSuccessResponse<CheckoutFromCartResult>
        >("/diamonds/checkout/from-cart", body);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to checkout. Please try again."
        );
    }
};

export const getCheckout = async (): Promise<
    ApiSuccessResponse<CheckoutResponseData>
> => {
    try {
        const response = await apiClient.get<
            ApiSuccessResponse<CheckoutResponseData>
        >("/diamonds/checkout");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to retrieve checkout. Please try again."
        );
    }
};

export const removeFromCheckout = async (
    diamondId: string,
): Promise<ApiSuccessResponse<RemoveFromCheckoutResponseData>> => {
    try {
        const response = await apiClient.delete<
            ApiSuccessResponse<RemoveFromCheckoutResponseData>
        >(`/diamonds/checkout/${diamondId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to remove item from checkout. Please try again."
        );
    }
};

export const clearCheckout = async (): Promise<
    ApiSuccessResponse<RemoveFromCheckoutResponseData>
> => {
    try {
        const response =
            await apiClient.delete<
                ApiSuccessResponse<RemoveFromCheckoutResponseData>
            >("/diamonds/checkout");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to clear checkout. Please try again."
        );
    }
};

export const addCheckoutItemMessage = async (
    diamondId: string,
    message: string,
): Promise<ApiSuccessResponse<CheckoutItemMessageResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<CheckoutItemMessageResponseData>
        >(`/diamonds/checkout/${diamondId}/messages`, {
            message,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to send message. Please try again."
        );
    }
};

export const updateCheckoutItemMessage = async (
    diamondId: string,
    messageId: string,
    message: string,
): Promise<ApiSuccessResponse<CheckoutItemMessageResponseData>> => {
    try {
        const response = await apiClient.put<
            ApiSuccessResponse<CheckoutItemMessageResponseData>
        >(`/diamonds/checkout/${diamondId}/messages/${messageId}`, {
            message,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to update message. Please try again."
        );
    }
};

export const deleteCheckoutItemMessage = async (
    diamondId: string,
    messageId: string,
): Promise<ApiSuccessResponse<CheckoutItemMessageResponseData>> => {
    try {
        const response = await apiClient.delete<
            ApiSuccessResponse<CheckoutItemMessageResponseData>
        >(`/diamonds/checkout/${diamondId}/messages/${messageId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to delete message. Please try again."
        );
    }
};

export const markCheckoutItemMessagesDelivered = async (
    diamondId: string,
): Promise<ApiSuccessResponse<CheckoutItemMessageResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<CheckoutItemMessageResponseData>
        >(`/diamonds/checkout/${diamondId}/messages/delivered`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to mark messages delivered. Please try again."
        );
    }
};
