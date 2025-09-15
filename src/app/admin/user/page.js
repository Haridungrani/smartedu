"use client";

import { useEffect, useState } from "react";

export default function UserListPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/user/list");
            const data = await res.json();

            if (res.ok) {
                setUsers(data);
            } else {
                setError(data.error || "Failed to fetch users");
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading users...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">{error}</div>;
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`/api/admin/user/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                // Remove user from state to update UI
                setUsers(users.filter(user => user._id !== id));
            } else {
                alert(data.error || "Failed to delete user");
            }
        } catch (err) {
            alert("Network error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">User List</h2>
                {users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
                            <thead className="bg-purple-100 text-purple-800">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Contact</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Profile Picture</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="hover:bg-purple-50">
                                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.contact}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {user.profile_picture ? (
                                                <img
                                                    src={`/uploads/${user.profile_picture}`}
                                                    alt={user.name}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center mt-6 text-gray-600">No users found.</p>
                )}
            </div>
        </div>
    );
}
