import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Pagination from "../components/common/Pagination";
import React, { useEffect, useState } from "react";
import UserRow from "../components/common/UserRow";
import useUserStore from "../store/useUserStore";

const roles = ["", "Admin", "Customer", "Manager"];
const statuses = ["", "Active", "Inactive"];

export default function Users() {
    const {
        users,
        total,
        page,
        limit,
        loading,
        error,
        fetchUsers,
        setPage,
        setSearch,
        setRoleFilter,
        setStatusFilter,
        updateRole,
        updateStatus,
        deleteUser,
    } = useUserStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilterLocal] = useState("");
    const [statusFilter, setStatusFilterLocal] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // ✅ শুধুমাত্র একটি useEffect ব্যবহার করে সব ধরনের ডেটা ফেচ নিয়ন্ত্রণ করা হয়েছে
    useEffect(() => {
        // setSearch এবং setRoleFilter/setStatusFilter ফাংশনগুলো
        // zustand store-এর state পরিবর্তন করবে, যা এই useEffect-কে আবার ট্রিগার করবে।
        // তাই, এখানে আলাদা করে fetchUsers() কল করার প্রয়োজন নেই।
        fetchUsers();
    }, [page, roleFilter, statusFilter, searchTerm, fetchUsers]);

    // Search debounce
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setSearch(searchTerm);
            setPage(1); // সার্চ টার্ম পরিবর্তন হলে পেজ ১ এ সেট করা হয়েছে।
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm, setSearch, setPage]);

    const handleRoleFilterChange = (e) => {
        setRoleFilterLocal(e.target.value);
        setRoleFilter(e.target.value);
        setPage(1); // রোল ফিল্টার পরিবর্তন হলে পেজ ১ এ সেট করা হয়েছে।
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilterLocal(e.target.value);
        setStatusFilter(e.target.value);
        setPage(1); // স্ট্যাটাস ফিল্টার পরিবর্তন হলে পেজ ১ এ সেট করা হয়েছে।
    };

    const handleView = (userId) => {
        const user = users.find((u) => u._id === userId);
        setSelectedUser(user);
        setModalOpen(true);
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md min-h-[80vh]">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                User Management
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6 items-center">
                <Input
                    type="search"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-sm"
                />

                <select
                    value={roleFilter}
                    onChange={handleRoleFilterChange}
                    className="border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    {roles.map((role) => (
                        <option key={role || "all"} value={role}>
                            {role || "All Roles"}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    {statuses.map((status) => (
                        <option key={status || "all"} value={status}>
                            {status || "All Statuses"}
                        </option>
                    ))}
                </select>
            </div>

            {/* Users Table */}
            {loading ? (
                <p className="text-center text-gray-500">Loading users...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : users.length === 0 ? (
                <p className="text-center text-gray-500">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 dark:border-gray-700 text-left text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Role</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <UserRow
                                    key={user._id}
                                    user={user}
                                    onRoleChange={updateRole}
                                    onStatusToggle={updateStatus}
                                    onView={handleView}
                                    onDelete={deleteUser}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination
                currentPage={page}
                totalCount={total}
                pageSize={limit}
                onPageChange={(page) => setPage(page)}
            />

            {/* User Modal */}
            {modalOpen && selectedUser && (
                <Modal onClose={() => setModalOpen(false)} title="User Details">
                    <div className="space-y-3 text-gray-900 dark:text-gray-100">
                        <p>
                            <strong>Name:</strong> {selectedUser.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedUser.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {selectedUser.phone || "N/A"}
                        </p>
                        <p>
                            <strong>Role:</strong> {selectedUser.role}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {selectedUser.isActive ? "Active" : "Inactive"}
                        </p>
                        <p>
                            <strong>Created At:</strong>{" "}
                            {new Date(selectedUser.createdAt).toLocaleString()}
                        </p>
                    </div>
                </Modal>
            )}
        </div>
    );
}