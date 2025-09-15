"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setProfile(null);

        // Redirect to login after 2 seconds
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(result.error || "Registration failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-purple-800 font-algerian text-3xl mb-6">
          <div className="flex justify-center items-center gap-2">
            <Image src="/smartEDU_logo.png" alt="Logo" width={80} height={80} />
            <h2>User Registration</h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center md:gap-6">
          <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
            <Image
              src="/login.jpg"
              alt="Course"
              width={500}
              height={450}
              className="rounded shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded p-2"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded p-2"
              />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                name="contact"
                placeholder="Enter contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full border rounded p-2"
              />

              <div>
                <label className="block mb-1 font-serif">Profile picture</label>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="w-full border rounded p-2"
                  onChange={(e) => setProfile(e.target.files[0])}
                />
              </div>

              {error && <p className="text-red-600 text-center">{error}</p>}
              {message && <p className="text-green-600 text-center">{message}</p>}

              <button
                type="submit"
                className="w-full bg-purple-800 text-white font-forte rounded-full px-4 py-2 hover:bg-purple-900"
              >
                Register
              </button>
            </form>

            <div className="text-center mt-4">
              <h5 className="font-serif text-base">
                Already registered?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </h5>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block bg-purple-800 text-white font-forte rounded-full px-4 py-2 hover:bg-purple-900"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
