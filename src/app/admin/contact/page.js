"use client";

import { useEffect, useState } from "react";
import Header from "../header/page";
import Sidebar from "../sidebar/page";
import Loader from "../loader";

export default function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/admin/contact/list");
            const data = await res.json();
            if (res.ok) {
                setContacts(data);
            } else {
                setError(data.error || "Failed to fetch contacts");
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    if (loading) {
        return <p className="text-center mt-10"><Loader /></p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-600">{error}</p>;
    }

    return (
        <div>
            <Header/>
            <Sidebar/>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-purple-800 mb-6">Contact List</h2>
            {contacts.length > 0 ? (
                <div className="overflow-x-auto w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-purple-100 text-purple-800">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (
                                <tr key={index} className="hover:bg-purple-50">
                                    <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{contact.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">No contacts found.</p>
            )}
        </div>
        </div>
    );
}
