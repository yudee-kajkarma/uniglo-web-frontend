import apiClient from "@/lib/api";
import { ApiSuccessResponse, ApiErrorResponse } from "./authServices";
import { Cart, CartItem } from "@/interface/diamondInterface";
import { AxiosError } from "axios";

export interface CartResponseData {
    cart: Cart | null;
    totalItems: number;
}

export interface AddToCartResponseData {
    cartItem: CartItem;
}

export interface HoldDiamondResponseData {
    message: string;
    stockRef: string[];
}

export interface RemoveFromCartResponseData {
    message: string;
    cart: Cart | null;
}

export interface HoldItemsResponseData {
    holdItems: CartItem[];
    totalItems: number;
}

export const getCart = async (): Promise<
    ApiSuccessResponse<CartResponseData>
> => {
    try {
        const response =
            await apiClient.get<ApiSuccessResponse<CartResponseData>>(
                "/diamonds/cart",
            );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to retrieve cart. Please try again."
        );
    }
};

export const addToCart = async (
    diamondId: string[],
): Promise<ApiSuccessResponse<AddToCartResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<AddToCartResponseData>
        >("/diamonds/cart/add", {
            diamondId,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw axiosError.response?.data?.message;
    }
};

export interface MelleCartLineInput {
    melleId: string;
    requestedCarat: number;
}

export const addMelleToCart = async (
    items: MelleCartLineInput[],
): Promise<ApiSuccessResponse<AddToCartResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<AddToCartResponseData>
        >("/diamonds/cart/add", {
            melleItems: items,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw axiosError.response?.data?.message;
    }
};

export const removeFromCart = async (
    diamondId: string,
): Promise<ApiSuccessResponse<RemoveFromCartResponseData>> => {
    try {
        const response = await apiClient.delete<
            ApiSuccessResponse<RemoveFromCartResponseData>
        >(`/diamonds/cart/${diamondId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to remove item from cart. Please try again."
        );
    }
};

export const clearCart = async (): Promise<
    ApiSuccessResponse<RemoveFromCartResponseData>
> => {
    try {
        const response =
            await apiClient.delete<
                ApiSuccessResponse<RemoveFromCartResponseData>
            >("/diamonds/cart");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to clear cart. Please try again."
        );
    }
};

export const holdDiamond = async (
    stockRef: string[],
): Promise<ApiSuccessResponse<HoldDiamondResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<HoldDiamondResponseData>
        >("/diamonds/hold", {
            stockRef,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to hold diamond. Please try again."
        );
    }
};

export const getHoldItems = async (): Promise<
    ApiSuccessResponse<HoldItemsResponseData>
> => {
    try {
        const response = await apiClient.get<
            ApiSuccessResponse<HoldItemsResponseData>
        >("/diamonds/cart/hold");
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to retrieve hold items. Please try again."
        );
    }
};

export interface CartItemMessageResponseData {
    item: CartItem;
}

export const addCartItemMessage = async (
    diamondId: string,
    message: string,
): Promise<ApiSuccessResponse<CartItemMessageResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<CartItemMessageResponseData>
        >(`/diamonds/cart/${diamondId}/messages`, {
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

export const updateCartItemMessage = async (
    diamondId: string,
    messageId: string,
    message: string,
): Promise<ApiSuccessResponse<CartItemMessageResponseData>> => {
    try {
        const response = await apiClient.put<
            ApiSuccessResponse<CartItemMessageResponseData>
        >(`/diamonds/cart/${diamondId}/messages/${messageId}`, {
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

export const deleteCartItemMessage = async (
    diamondId: string,
    messageId: string,
): Promise<ApiSuccessResponse<CartItemMessageResponseData>> => {
    try {
        const response = await apiClient.delete<
            ApiSuccessResponse<CartItemMessageResponseData>
        >(`/diamonds/cart/${diamondId}/messages/${messageId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to delete message. Please try again."
        );
    }
};

export const markCartItemMessagesDelivered = async (
    diamondId: string,
): Promise<ApiSuccessResponse<CartItemMessageResponseData>> => {
    try {
        const response = await apiClient.post<
            ApiSuccessResponse<CartItemMessageResponseData>
        >(`/diamonds/cart/${diamondId}/messages/delivered`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        throw (
            axiosError.response?.data?.message ||
            "Failed to mark messages delivered. Please try again."
        );
    }
};
