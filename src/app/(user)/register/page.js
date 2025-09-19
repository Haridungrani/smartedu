"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const validateForm = () => {
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
    setMessage("");

    if (!validateForm()) return;

    const formData = {
      name,
      email,
      password,
      contact,
      profile_picture: profile ? profile.name : "",
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("User registered successfully!");
        toast.success("Registration successful");
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setProfile(null);

        // Redirect to login after 2 seconds
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(result.error || "Registration failed");
        setError(result.error || "Registration failed.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center text-purple-800 font-bold text-3xl mb-8 flex justify-center items-center gap-4">
          <Image src="/smartEDU_logo.png" alt="Logo" width={80} height={80} />
          <h2>User Registration</h2>
        </div>

        {/* Form + Image */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          {/* Side Image */}
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/login.jpg"
                alt="User registration"
                fill
                className="rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                placeholder="Enter contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div>
                <label className="block mb-1 font-medium">Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) => setProfile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {error && <p className="text-red-600 text-center">{error}</p>}
              {message && <p className="text-green-600 text-center">{message}</p>}

              <button
                type="submit"
                className="w-full bg-purple-800 text-white font-semibold rounded-full px-4 py-3 hover:bg-purple-900 transition"
              >
                Register
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already registered?{" "}
                <Link href="/login" className="text-purple-700 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Home Button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block bg-purple-800 text-white font-semibold rounded-full px-6 py-3 hover:bg-purple-900 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
