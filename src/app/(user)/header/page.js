"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user data from localStorage on component mount
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <header className="bg-pink-300 p-4 md:p-5 h-14 md:h-16 flex items-center justify-end space-x-4">
            {user ? (
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <label className="font-algerian text-xl md:text-2xl text-[#81007F] cursor-pointer">
                            Welcome {user.name}
                        </label>
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg hidden group-hover:block">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <img
                        src={user.image}
                        alt="User"
                        className="rounded-full"
                        style={{ maxHeight: "40px", maxWidth: "40px", marginBottom: "15px" }}
                    />
                </div>
            ) : (
                <Link
                    href="/login"
                    className="text-black text-lg md:text-xl font-sans no-underline ml-auto"
                >
                    Login
                </Link>
            )}
        </header>
    );
}
