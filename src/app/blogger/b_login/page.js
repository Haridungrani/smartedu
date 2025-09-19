"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function BloggerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/blogger/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        setError(data.error || "Login failed");
      } else {
        toast.success(data.message || "Login successful");
        setSuccess(data.message || "Login successful");
        setTimeout(() => {
          router.push("/"); // Redirect after successful login
        }, 2000);
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <div className="w-5/6 p-8">
        <div className="text-center mb-8">
          <Image
            src="/smartEDU_logo.png"
            alt="SmartEDU Logo"
            width={80}
            height={80}
            className="inline-block mb-2"
          />
          <h2 className="text-3xl font-algerian text-purple-800">Blogger Login</h2>
        </div>

        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="md:w-1/2">
            <Image
              src="/course-2.jpg"
              alt="Login Illustration"
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-lg font-serif mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-serif mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <button
                type="submit"
                className="w-full bg-purple-800 text-white font-forte rounded-lg py-2 text-lg hover:bg-purple-900 transition"
              >
                Login
              </button>

              <p className="text-center text-gray-700">
                Not registered?{" "}
                <Link href="/blogger/b_register" className="text-purple-800 font-semibold hover:underline">
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/">
            <button className="bg-purple-800 text-white font-forte rounded-lg py-2 px-6 text-lg hover:bg-purple-900 transition">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
