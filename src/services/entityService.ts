import apiClient from "@/lib/api";
import { AxiosError } from "axios";
import { User } from "./userService";

export interface EntityAddress {
    AddressKey: number;
    IsDefault: number;
    PrintName: string;
    Street: string;
    City: string;
    State: string;
    Country: string;
    ZipCode: string;
    GSTN_No: string;
    AddressType: "B" | "S";
}

export interface EntityContactDetail {
    ContactKey: number;
    ContactName: string;
    Designation: string;
    Email: string;
    BusinessTel1: string;
    BusinessTel2: string;
    BusinessFax: string;
    MobileNo: string;
    PersonalNo: string;
    OtherNo: string;
    EntityKey: number;
}

export interface Entity {
    EntityKey: number;
    CompanyName: string;
    NickName: string;
    Currency: string;
    CompanyGroup: string;
    FirmRegNo: string;
    DefaultTerms: number;
    CreditLimit: number;
    AnnualTarget: number;
    Remarks: string;
    BillingAddress: EntityAddress[];
    ShippingAddress: EntityAddress[];
    ContactDetail: EntityContactDetail;
}

export interface EntityRequestData {
    EntityKey: string;
}

export interface ApiSuccessResponse<T> {
    success: boolean;
    data: T;
    error: null;
}

export interface ApiErrorResponse {
    success: boolean;
    data: null;
    error: {
        code: number;
        message: string;
    };
}

export const getEntity = async (
    entityKey: string,
): Promise<ApiSuccessResponse<Entity>> => {
    try {
        const response = await apiClient.post<ApiSuccessResponse<Entity>>(
            "/users/diamtrade/entity",
            {
                EntityKey: entityKey,
            },
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        throw (
            axiosError.response?.data?.error?.message ||
            "Something went wrong. Please try again."
        );
    }
};
export interface UpdateEntityKeyRequest {
    EntityKey: string;
}

export interface UpdateEntityKeyResponse {
    success: boolean;
    message: string;
    data: User;
}

/**
 * Update entity key for a user
 * @param userId User ID
 * @param entityKey Entity key to assign
 * @returns Promise with updated user data
 */
export const updateUserEntityKey = async (
    userId: string,
    entityKey: string,
): Promise<UpdateEntityKeyResponse> => {
    try {
        const response = await apiClient.put<UpdateEntityKeyResponse>(
            `/users/${userId}/entity-key`,
            {
                EntityKey: entityKey,
            },
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to update entity key. Please try again.";
        throw errorMessage;
    }
};
