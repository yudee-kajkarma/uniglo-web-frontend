"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/ui/table";
import {
    getPendingUsers,
    getAllUsers,
    approveCustomerData,
    rejectCustomerData,
    approveDiamtradeEntity,
    PendingUser,
} from "@/services/adminServices";
import { getPendingUserColumns } from "@/components/columns/PendingUserColumns";
import {
    getAllUsersColumns,
    UserDetailsRow,
} from "@/components/columns/AllUsersColumns";
import { AssignEntityDialog } from "@/components/dialogs/AssignEntityDialog";
import { toast } from "sonner";
import { Loader2, Users, Search, X } from "lucide-react";
import ShimmerTable from "@/components/ui/shimmerTable";
import TablePagination from "@/components/ui/tablePagination";
import { Button } from "@/components/ui/button";

type TabType = "pending" | "all";

export default function MembersManagementPage() {
    const [activeTab, setActiveTab] = useState<TabType>("pending");
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
    const [allUsers, setAllUsers] = useState<PendingUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    // Entity assignment dialog state
    const [assignEntityDialogOpen, setAssignEntityDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [selectedUsername, setSelectedUsername] = useState<string>("");

    // Search state
    const [searchInput, setSearchInput] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    // Pagination state for all users
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const fetchPendingUsers = async () => {
        try {
            setLoading(true);
            const response = await getPendingUsers();
            setPendingUsers(response.data);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to fetch pending users",
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers({
                page,
                limit,
                search: activeSearch || undefined,
            });
            setAllUsers(
                response.data.filter((user) => user.status === "APPROVED"),
            ); // Ensure only approved users are shown
            setTotalRecords(
                response.data.filter((user) => user.status === "APPROVED")
                    .length,
            );
            setTotalPages(response.pagination.totalPages);
            setHasNextPage(response.pagination.hasNextPage);
            setHasPrevPage(response.pagination.hasPrevPage);

            // Show info message if search is active
            if (activeSearch && response.data.length === 0) {
                toast.info(`No results found for: "${activeSearch}"`);
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to fetch all users",
            );
        } finally {
            setLoading(false);
        }
    };

    // Debounce effect for search
    useEffect(() => {
        if (activeTab === "all" && searchInput !== activeSearch) {
            const timer = setTimeout(() => {
                setActiveSearch(searchInput);
                setPage(1); // Reset to first page on search
            }, 500); // 500ms debounce

            return () => clearTimeout(timer);
        }
    }, [searchInput, activeTab, activeSearch]);

    useEffect(() => {
        if (activeTab === "pending") {
            fetchPendingUsers();
        } else {
            fetchAllUsers();
        }
    }, [activeTab, page, limit, activeSearch]);

    const handleApprove = async (user: PendingUser) => {
        try {
            setActionLoading(user._id);
            const response = await approveCustomerData(user._id);
            toast.success(response.message || "User approved successfully");
            await fetchPendingUsers();
            if (activeTab === "all") {
                await fetchAllUsers();
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to approve user",
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (user: PendingUser) => {
        try {
            setActionLoading(user._id);
            const response = await rejectCustomerData(user._id);
            toast.success(response.message || "User rejected successfully");
            await fetchPendingUsers();
            if (activeTab === "all") {
                await fetchAllUsers();
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to reject user",
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleToggleExpand = (userId: string) => {
        setExpandedRows((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    };

    const handleAssignEntity = (userId: string, username: string) => {
        setSelectedUserId(userId);
        setSelectedUsername(username);
        setAssignEntityDialogOpen(true);
    };

    const handleEntityAssignmentSuccess = () => {
        fetchAllUsers(); // Refresh the users list
    };

    const handleApproveDiamtrade = async (userId: string) => {
        try {
            setActionLoading(userId);
            const response = await approveDiamtradeEntity(userId);
            toast.success(
                response.message || "Diamtrade entity approved successfully",
            );
            await fetchAllUsers();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to approve diamtrade entity",
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleClearSearch = () => {
        setSearchInput("");
        setActiveSearch("");
        setPage(1);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setActiveSearch(searchInput);
            setPage(1);
        }
    };

    const pendingColumns = getPendingUserColumns(handleApprove, handleReject);
    const allUsersColumns = getAllUsersColumns(
        expandedRows,
        handleToggleExpand,
        handleAssignEntity,
    );
    const currentUsers = activeTab === "pending" ? pendingUsers : allUsers;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-purple/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary-purple" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Members Management
                        </h1>
                        <p className="text-sm text-gray-500">
                            Review and manage user registrations
                        </p>
                    </div>
                </div>
                {!loading && (
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold">
                            {activeTab === "pending"
                                ? pendingUsers.length
                                : totalRecords}
                        </span>{" "}
                        {activeTab === "pending" ? "pending" : "total"}{" "}
                        {currentUsers.length === 1 ? "user" : "users"}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6">
                    <button
                        onClick={() => {
                            setActiveTab("pending");
                            setPage(1);
                            setSearchInput("");
                            setActiveSearch("");
                        }}
                        className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === "pending"
                                ? "border-primary-purple text-primary-purple"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Pending Users
                        {pendingUsers.length > 0 && (
                            <span className="ml-2 bg-primary-purple/10 text-primary-purple rounded-full px-2 py-0.5 text-xs font-semibold">
                                {pendingUsers.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("all");
                            setPage(1);
                        }}
                        className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === "all"
                                ? "border-primary-purple text-primary-purple"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        All Users
                        {totalRecords > 0 && activeTab === "all" && (
                            <span className="ml-2 bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                                {totalRecords}
                            </span>
                        )}
                    </button>
                </nav>
            </div>

            {/* Search Box - Only show for All Users tab */}
            {activeTab === "all" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or company..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent text-sm transition-all"
                                disabled={loading}
                            />
                            {searchInput && (
                                <button
                                    onClick={() => setSearchInput("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    disabled={loading}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        {activeSearch && (
                            <Button
                                onClick={handleClearSearch}
                                variant="outline"
                                disabled={loading}
                                className="border-gray-300 hover:bg-gray-50 transition-all"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Clear
                            </Button>
                        )}
                    </div>

                    {/* Active Search Indicator */}
                    {activeSearch && (
                        <div className="mt-3 flex items-center justify-between p-3 bg-primary-purple/5 rounded-lg border border-primary-purple/20">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-primary-purple" />
                                <span className="text-sm text-gray-700">
                                    Showing results for:
                                </span>
                                <span className="px-3 py-1 bg-primary-purple text-white rounded-full text-sm font-medium">
                                    {activeSearch}
                                </span>
                            </div>
                            <button
                                onClick={handleClearSearch}
                                className="text-sm text-primary-purple hover:text-primary-purple/80 font-medium underline transition-colors"
                            >
                                View all users
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {loading ? (
                    <div className="p-4">
                        <ShimmerTable
                            rowCount={10}
                            columnCount={10}
                            enableSelection={false}
                        />
                    </div>
                ) : currentUsers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        {activeTab === "all" && activeSearch ? (
                            <>
                                <Search className="w-12 h-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    No results found
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    No users found matching "{activeSearch}"
                                </p>
                                <Button
                                    onClick={handleClearSearch}
                                    variant="outline"
                                >
                                    View all users
                                </Button>
                            </>
                        ) : (
                            <>
                                <Users className="w-12 h-12 text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    {activeTab === "pending"
                                        ? "No pending users"
                                        : "No users found"}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {activeTab === "pending"
                                        ? "All user registrations have been reviewed"
                                        : "No users are registered in the system"}
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        {(activeTab === "pending"
                                            ? pendingColumns
                                            : allUsersColumns
                                        ).map((column) => (
                                            <th
                                                key={String(column.key)}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {column.header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentUsers.map((user) => (
                                        <React.Fragment key={user._id}>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                {(activeTab === "pending"
                                                    ? pendingColumns
                                                    : allUsersColumns
                                                ).map((column) => (
                                                    <td
                                                        key={String(column.key)}
                                                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                                                            column.cellClassName
                                                                ? column.cellClassName(
                                                                      user,
                                                                  )
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        {column.render
                                                            ? column.render(
                                                                  user,
                                                                  handleAssignEntity,
                                                                  handleApproveDiamtrade,
                                                              )
                                                            : (user[
                                                                  column.key as keyof PendingUser
                                                              ] as React.ReactNode)}
                                                    </td>
                                                ))}
                                            </tr>
                                            {activeTab === "all" &&
                                                expandedRows.has(user._id) && (
                                                    <tr>
                                                        <td
                                                            colSpan={
                                                                allUsersColumns.length
                                                            }
                                                            className="p-0"
                                                        >
                                                            <UserDetailsRow
                                                                user={user}
                                                            />
                                                        </td>
                                                    </tr>
                                                )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination for All Users */}
                        {activeTab === "all" && (
                            <div className="border-t p-4">
                                <TablePagination
                                    total={totalRecords}
                                    page={page}
                                    rowsPerPage={limit}
                                    totalPages={totalPages}
                                    hasNextPage={hasNextPage}
                                    hasPrevPage={hasPrevPage}
                                    onPageChange={setPage}
                                    onRowsPerPageChange={(newLimit) => {
                                        setLimit(newLimit);
                                        setPage(1);
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            {actionLoading && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-lg">
                        <Loader2 className="w-5 h-5 animate-spin text-primary-purple" />
                        <span className="text-sm text-gray-700">
                            Processing...
                        </span>
                    </div>
                </div>
            )}

            {/* Entity Assignment Dialog */}
            <AssignEntityDialog
                open={assignEntityDialogOpen}
                onOpenChange={setAssignEntityDialogOpen}
                userId={selectedUserId}
                username={selectedUsername}
                onSuccess={handleEntityAssignmentSuccess}
            />
        </div>
    );
}
