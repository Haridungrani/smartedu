"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notify } from "../../notify";

export default function BloggerRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Client-side validation
  const validateForm = () => {
    const { name, email, password, contact } = formData;

    if (!name || !email || !password || !contact) {
      setError("All fields are required.");
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError("Name can only contain letters and spaces.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (!/^\d{10}$/.test(contact)) {
      setError("Contact must be a 10-digit number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      const res = await fetch("/api/blogger/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        notify.error(data.error || "Registration failed");
        setError(data.error || "Something went wrong");
      } else {
        notify.success(data.message || "Registered successfully");
        setSuccess(data.message || "Registered successfully!");
        setFormData({ name: "", email: "", password: "", contact: "" });
        setTimeout(() => {
          router.push("/blogger/b_login");
        }, 2000);
      }
    } catch (err) {
      notify.error("Network error. Please try again.");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <div className="w-5/6 flex items-center justify-center">
        <div className="w-full max-w-4xl p-8">
          <div className="text-center mb-8">
            <Image
              src="/smartEDU_logo.png"
              alt="SmartEDU Logo"
              width={80}
              height={80}
              className="inline-block mb-2"
            />
            <h2 className="text-3xl font-algerian text-purple-800">Blogger Registration</h2>
          </div>

          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden mx-auto">
            <div className="md:w-1/2">
              <Image
                src="/course-2.jpg"
                alt="Register Illustration"
                width={500}
                height={450}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter Contact"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />

                {error && <p className="text-red-600 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <button
                  type="submit"
                  className="w-full bg-purple-800 text-white font-forte rounded-lg py-2 text-lg hover:bg-purple-900 transition"
                >
                  Register
                </button>

                <p className="text-center text-gray-700">
                  Already registered?{" "}
                  <Link
                    href="/blogger/b_login"
                    className="text-purple-800 font-semibold hover:underline"
                  >
                    Login
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
    </div>
  );
}
