import apiClient from "@/lib/api";
import { AxiosError } from "axios";
import {
    Address,
    ContactDetail,
    CustomerData,
    ApiSuccessResponse,
    User,
} from "./authServices";

export type { Address, ContactDetail, CustomerData, User } from "./authServices";

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

export interface UpdateCustomerDataRequest {
    billingAddress?: Partial<Address>[];
    shippingAddress?: Partial<Address>[];
    contactDetail?: Partial<ContactDetail>;
    customerData?: Partial<
        Omit<CustomerData, "address" | "businessInfo"> & {
            address?: Partial<CustomerData["address"]>;
            businessInfo?: Partial<CustomerData["businessInfo"]>;
        }
    >;
}

/**
 * Update customer data for the currently authenticated user
 * @param data Updated customer data fields
 * @returns Promise with updated user data
 */
export const updateCustomerData = async (
    data: UpdateCustomerDataRequest,
): Promise<ApiSuccessResponse<{ user: User }>> => {
    try {
        const response = await apiClient.put<
            ApiSuccessResponse<{ user: User }>
        >("/users/customer-data", data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
            axiosError.response?.data?.message ||
            "Failed to update customer data. Please try again.";
        throw errorMessage;
    }
};
