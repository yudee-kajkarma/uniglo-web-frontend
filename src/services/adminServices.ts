import apiClient from "@/lib/api";
import { Diamond, CartItem } from "@/interface/diamondInterface";

// Types
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
    birthDate: string;
}

export interface PendingUser {
    _id: string;
    username: string;
    email: string;
    status: string;
    role: string;
    companyName: string;
    contactName: string;
    customerData: CustomerData;
    quotations: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    entityKey?: number;
    diamtradeStatus?: string; // Add this line
}

export interface GetPendingUsersResponse {
    success: boolean;
    data: PendingUser[];
    count: number;
    message: string;
}

export interface ApproveUserResponse {
    success: boolean;
    message: string;
    data?: any;
}

// Cart-related interfaces
export interface CartWithDetails {
    _id: string;
    userId: string;
    items: CartItem[];
    holdItems: CartItem[];
    createdAt: string;
    updatedAt: string;
}

export interface UserDetails {
    _id: string;
    username: string;
    email: string;
    status: string;
    role: string;
    companyName?: string;
    contactName?: string;
    customerData?: CustomerData;
    quotations: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    entityKey?: number;
}

export interface AdminCartData {
    cart: CartWithDetails;
    user: UserDetails;
    totalItems: number;
    totalHoldItems: number;
}

export interface GetAllCartsResponse {
    success: boolean;
    message: string;
    data: AdminCartData[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface GetAllCartsParams {
    page?: number;
    limit?: number;
    stockRef?: string; // Add this line
}

export interface GetAllUsersParams {
    page?: number;
    limit?: number;
    search?: string; // Optional search parameter for filtering users by name, email, or company
}

export interface GetAllUsersResponse {
    success: boolean;
    message: string;
    data: PendingUser[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
        recordsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

// Service Functions
export const getPendingUsers = async (): Promise<GetPendingUsersResponse> => {
    const response = await apiClient.get("/users/customer-data-pending");
    return response.data;
};

export const approveCustomerData = async (
    userId: string,
): Promise<ApproveUserResponse> => {
    const response = await apiClient.post(
        `/users/${userId}/approve-customer-data`,
    );
    return response.data;
};

export const rejectCustomerData = async (
    userId: string,
): Promise<ApproveUserResponse> => {
    const response = await apiClient.post(
        `/users/${userId}/reject-customer-data`,
    );
    return response.data;
};

export interface ReplyToCartItemParams {
    userId: string;
    diamondId: string;
    reply: string;
}

export interface ReplyToCartItemResponse {
    success: boolean;
    message: string;
    data?: {
        item: CartItem;
    };
}

export const replyToCartItem = async (
    params: ReplyToCartItemParams,
): Promise<ReplyToCartItemResponse> => {
    const response = await apiClient.put<ReplyToCartItemResponse>(
        `/diamonds/cart/admin/${params.userId}/items/${params.diamondId}/reply`,
        {
            reply: params.reply,
        },
    );

    if (!response.data.success) {
        throw new Error(response.data.message || "Failed to reply to cart item");
    }

    return response.data;
};

export interface DeleteCartItemMessageParams {
    userId: string;
    diamondId: string;
    messageId: string;
}

export const deleteCartItemMessage = async (
    params: DeleteCartItemMessageParams,
): Promise<ReplyToCartItemResponse> => {
    const response = await apiClient.delete<ReplyToCartItemResponse>(
        `/diamonds/cart/admin/${params.userId}/items/${params.diamondId}/messages/${params.messageId}`,
    );

    if (!response.data.success) {
        throw new Error(
            response.data.message || "Failed to delete cart item message",
        );
    }

    return response.data;
};

export interface UpdateCartItemMessageParams {
    userId: string;
    diamondId: string;
    messageId: string;
    message: string;
}

export const updateCartItemMessage = async (
    params: UpdateCartItemMessageParams,
): Promise<ReplyToCartItemResponse> => {
    const response = await apiClient.put<ReplyToCartItemResponse>(
        `/diamonds/cart/admin/${params.userId}/items/${params.diamondId}/messages/${params.messageId}`,
        {
            message: params.message,
        },
    );

    if (!response.data.success) {
        throw new Error(
            response.data.message || "Failed to update cart item message",
        );
    }

    return response.data;
};

export const getAllCarts = async (
    params?: GetAllCartsParams,
): Promise<GetAllCartsResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) {
        queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
    }
    // Add stockRef parameter
    if (params?.stockRef) {
        queryParams.append("stockRef", params.stockRef);
    }

    const queryString = queryParams.toString();
    const url = `/diamonds/cart/admin/all${queryString ? `?${queryString}` : ""}`;

    const response = await apiClient.get<GetAllCartsResponse>(url);
    return response.data;
};

export interface ApproveDiamtradeEntityResponse {
    success: boolean;
    message: string;
    data: PendingUser;
}

export const approveDiamtradeEntity = async (
    userId: string,
): Promise<ApproveDiamtradeEntityResponse> => {
    const response = await apiClient.post(
        `/users/${userId}/approve-diamtrade-entity`,
    );
    return response.data;
};

export interface GetReactivationRequestsResponse {
    success: boolean;
    data: PendingUser[];
    count: number;
    message: string;
}

export const getReactivationRequests =
    async (): Promise<GetReactivationRequestsResponse> => {
        const response = await apiClient.get("/users/reactivation-requests");
        return response.data;
    };

export const approveReactivation = async (
    userId: string,
): Promise<ApproveUserResponse> => {
    const response = await apiClient.post(
        `/users/${userId}/approve-reactivation`,
    );
    return response.data;
};

export const rejectReactivation = async (
    userId: string,
): Promise<ApproveUserResponse> => {
    const response = await apiClient.post(
        `/users/${userId}/reject-reactivation`,
    );
    return response.data;
};

export const getAllUsers = async (
    params?: GetAllUsersParams,
): Promise<GetAllUsersResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) {
        queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
    }
    if (params?.search) {
        queryParams.append("search", params.search);
    }
    const queryString = queryParams.toString();
    const url = `/users${queryString ? `?${queryString}` : ""}`;

    const response = await apiClient.get<GetAllUsersResponse>(url);
    return response.data;
};

export interface AdminCreateCustomerAddress {
    isDefault: string;
    printName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    vat_No: string;
    gstn_No: string;
}

export interface AdminCreateCustomerContactDetail {
    contactName: string;
    designation: string;
    businessTel1: string;
    businessTel2: string;
    businessFax: string;
    mobileNo: string;
    personalNo: string;
    otherNo: string;
    email: string;
}

export interface AdminCreateCustomerData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    landlineNumber: string;
    countryCode: string;
    birthDate: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    businessInfo: {
        companyName: string;
        businessType: string;
        vatNumber: string;
        websiteUrl: string;
    };
}

export interface AdminCreateCustomerRequest {
    username: string;
    email: string;
    password: string;
    companyName: string;
    contactName: string;
    currency: string;
    companyGroup: string;
    firmRegNo: string;
    defaultTerms: string;
    creditLimit: string;
    annualTarget: string;
    remarks: string;
    billingAddress: AdminCreateCustomerAddress[];
    shippingAddress: AdminCreateCustomerAddress[];
    contactDetail: AdminCreateCustomerContactDetail;
    customerData: AdminCreateCustomerData;
}

export interface AdminCreateCustomerResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const createCustomerByAdmin = async (
    data: AdminCreateCustomerRequest,
): Promise<AdminCreateCustomerResponse> => {
    const response = await apiClient.post<AdminCreateCustomerResponse>(
        "/users/admin/create",
        data,
    );
    return response.data;
};
