// "use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ currentPage }) {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  // Fetch logged-in user info on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me",  {
        method: "GET",
        credentials: "include", // ✅ This ensures cookies are sent
      });
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email);
        } else {
          setEmail(null);
        }
      } catch (err) {
        setEmail(null);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // ✅ This ensures cookies are sent
      });
    setEmail(null);
    router.push("/login"); // redirect to login page
  };

  const links = [
    { href: "/", name: "Home", page: "home" },
    { href: "/course", name: "Course", page: "course" },
    { href: "/About", name: "About us", page: "about" },
    { href: "/contact", name: "Contact us", page: "contact" },
    { href: "/blogger/b_login", name: "Blogger's login", page: "blogregister" },
    { href: "/developer", name: "Developers", page: "developers" },
    { href: "/admin", name: "Admin", page: "admin" }
  ];

  return (
   <div className="fixed w-64 h-full bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white overflow-auto p-4">
  <div className="flex justify-center mb-4">
    <Image
      src="/smartEDU_logo.png"
      alt="Logo"
      width={80}
      height={80}
      className="rounded-full border-2 border-gray-700"
    />
  </div>
  <ul>
    {links.map((link) => (
      <li key={link.page} className="mb-2">
        <Link
          href={link.href}
          className={`block px-4 py-3 text-lg font-serif hover:bg-gray-800 rounded transition-colors ${
            currentPage === link.page ? "bg-gray-800 text-white" : "text-gray-300"
          }`}
        >
          {link.name}
        </Link>
      </li>
    ))}

    {/* Conditional Login/Logout */}
    <li className="mt-4">
      {email ? (
        <div className="flex flex-col px-4 py-3 bg-gray-800 text-white rounded transition-colors">
          <span className="mb-2 font-bold">{email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="block px-4 py-3 text-lg font-serif text-gray-300 hover:bg-gray-800 rounded transition-colors"
        >
          Login/Register
        </Link>
      )}
    </li>
  </ul>
</div>

  );
}
