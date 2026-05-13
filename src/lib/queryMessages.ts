export interface QueryThreadLike {
    adminReply?: string;
    deliveredToAdminAt?: string;
    deliveredToCustomerAt?: string;
}

export const getQueryMessageCounts = (
    query: QueryThreadLike,
    viewerRole: "admin" | "customer",
) => {
    const totalCount = query.adminReply ? 2 : 1;
    const unreadCount =
        viewerRole === "admin"
            ? query.deliveredToAdminAt
                ? 0
                : 1
            : query.adminReply && !query.deliveredToCustomerAt
              ? 1
              : 0;

    return {
        unreadCount,
        totalCount,
    };
};
