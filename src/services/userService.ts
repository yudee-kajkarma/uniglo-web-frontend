import apiClient from "@/lib/api";
import { AxiosError } from "axios";

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface BusinessInfo {
    companyName: string;
    businessType: string;
    vatNumber: string;
    websiteUrl: string;
}

export interface CustomerData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    landlineNumber: string;
    countryCode: string;
    address: Address;
    businessInfo: BusinessInfo;
    submittedAt: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    status: "APPROVED" | "PENDING" | "REJECTED";
    role: "USER" | "SUPER_ADMIN" | "ADMIN";
    companyName?: string;
    contactName?: string;
    customerData?: CustomerData;
    quotations: string[];
    entityKey?: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface UsersResponse {
    success: boolean;
    message: string;
    data: User[];
    pagination: Pagination;
}

export interface UsersQueryParams {
    page?: number;
    limit?: number;
    status?: "APPROVED" | "PENDING" | "REJECTED";
    role?: "USER" | "SUPER_ADMIN" | "ADMIN";
    search?: string;
}

/**
 * Fetch all users with optional filtering and pagination
 * @param params Query parameters for filtering and pagination
 * @returns Promise with users data and pagination info
 */
export const fetchUsers = async (
    params?: UsersQueryParams,
): Promise<UsersResponse> => {
    try {
        const response = await apiClient.get<UsersResponse>("/users", {
            params: {
                page: params?.page || 1,
                limit: params?.limit || 10,
                ...(params?.status && { status: params.status }),
                ...(params?.role && { role: params.role }),
                ...(params?.search && { search: params.search }),
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to fetch users. Please try again.";
        throw errorMessage;
    }
};

/**
 * Fetch a single user by ID
 * @param userId User ID
 * @returns Promise with user data
 */
export const fetchUserById = async (userId: string): Promise<UsersResponse> => {
    try {
        const response = await apiClient.get<UsersResponse>(`/users/${userId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to fetch user details. Please try again.";
        throw errorMessage;
    }
};

export interface CheckPendingRegistrationResponse {
    hasPendingRegistration: boolean;
}

export interface ResendRegistrationOtpResponse {
    success: boolean;
    message: string;
}

/**
 * Check if a user has a pending registration
 * @param email User's email address
 * @returns Promise with pending registration status
 */
export const checkPendingRegistration = async (
    email: string,
): Promise<CheckPendingRegistrationResponse> => {
    try {
        const response = await apiClient.get<CheckPendingRegistrationResponse>(
            "/users/check-pending-registration",
            {
                params: { email },
            },
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to check pending registration. Please try again.";
        throw errorMessage;
    }
};

export interface DisableAccountResponse {
    success: boolean;
    message: string;
}

export interface ReactivationRequestResponse {
    success: boolean;
    message: string;
}

/**
 * Submit a reactivation request for a disabled account
 * @param email User's email address
 * @returns Promise with success response
 */
export const requestReactivation = async (
    email: string,
): Promise<ReactivationRequestResponse> => {
    try {
        const response = await apiClient.post<ReactivationRequestResponse>(
            "/users/reactivation-request",
            { email },
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to submit reactivation request. Please try again.";
        throw errorMessage;
    }
};

/**
 * Disable the currently authenticated user's account
 * @returns Promise with success response
 */
export const disableAccount = async (): Promise<DisableAccountResponse> => {
    try {
        const response = await apiClient.post<DisableAccountResponse>(
            "/users/disable-account",
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to disable account. Please try again.";
        throw errorMessage;
    }
};

/**
 * Resend registration OTP to user's email
 * @param email User's email address
 * @returns Promise with success response
 */
export const resendRegistrationOtp = async (
    email: string,
): Promise<ResendRegistrationOtpResponse> => {
    try {
        const response = await apiClient.post<ResendRegistrationOtpResponse>(
            "/users/resend-registration-otp",
            {
                email,
            },
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to resend OTP. Please try again.";
        throw errorMessage;
    }
};
