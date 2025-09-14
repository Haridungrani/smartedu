"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Login successful!");
            setErrorMsg("");
            // Redirect or save user info here if needed
        } else {
            setErrorMsg(data.error || "Something went wrong.");
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <div className="text-center text-purple-800 font-algerian text-3xl mb-5">
                <div className="flex justify-center mt-2">
                    <Image src="/smartEDU_logo.png" alt="Logo" width={80} height={80} />
                </div>
                <h2>User Login</h2>
            </div>
            <div className="border p-4 md:flex md:justify-center md:gap-6">
                <div className="hidden md:block">
                    <Image src="/login.jpg" alt="Login" width={500} height={400} />
                </div>
                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 mt-10">
                            <label className="block font-serif text-lg mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border rounded p-2"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-serif text-lg mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full border rounded p-2"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}
                        <div className="text-center mb-4">
                            <Link
                                href="/"
                                className="bg-purple-800 text-white font-forte rounded-full px-4 py-2 w-full hover:bg-purple-900"
                            >
                                Login
                            </Link>
                        </div>
                        <div className="text-center">
                            <h5 className="font-serif text-base">
                                Not registered?{" "}
                                <Link href="/register" className="text-blue-600 hover:underline">
                                    Register Now
                                </Link>
                            </h5>
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-center mt-6">
                <Link href="/" className="inline-block bg-purple-800 text-white font-forte rounded-full px-4 py-2 hover:bg-purple-900">
                    Home
                </Link>
            </div>
        </div>
    );
}
