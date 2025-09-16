// import Link from "next/link";
// import Image from "next/image";

// export default function Sidebar({ currentPage }) {
//     const links = [
//         { href: "/admin/", name: "Dashboard", page: "dashboard" },
//         { href: "/admin/user", name: "User", page: "user" },
//         { href: "/admin/blogger", name: "Blogger", page: "blogger" },
//         { href: "/admin/course", name: "Course", page: "course" },
//         { href: "/admin/contact", name: "Contact", page: "contact" },
//         { href: "/admin/register", name: "Register", page: "register" },
//     ];

//     return (
//         <div className="fixed w-64 h-full bg-gray-200 shadow-md  overflow-auto p-4">
//             <div className="flex justify-center mb-4">
//                 <Image
//                     src="/smartEDU_logo.png"
//                     alt="Logo"
//                     width={80}
//                     height={80}
//                     className="rounded"
//                 />
//             </div>
//             <ul>
//                 {links.map((link) => (
//                     <li key={link.page} className="mb-2">
//                         <Link
//                             href={link.href}
//                             className={`block px-4 py-4 text-lg font-serif text-black hover:bg-purple-300 rounded ${currentPage === link.page ? "bg-purple-300 text-white" : ""
//                                 }`}
//                         >
//                             {link.name}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ currentPage }) {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  // Fetch logged-in admin's info
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/admin/me", {
        method: "GET",
        credentials: "include", // ← important!
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

  // Handle logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setEmail(null);
    router.push("/admin/login"); // Redirect to admin login page
  };

  const links = [
    { href: "/admin/", name: "Dashboard", page: "dashboard" },
    { href: "/admin/user", name: "User", page: "user" },
    { href: "/admin/blogger", name: "Blogger", page: "blogger" },
    { href: "/admin/course", name: "Course", page: "course" },
    { href: "/admin/contact", name: "Contact", page: "contact" },
    { href: "/", name: "Client", page: "Home" },
    //{ href: "/admin/register", name: "Register", page: "register" },
  ];

  return (
    <div className="fixed w-64 h-full bg-gray-200 shadow-md overflow-auto p-4">
      <div className="flex justify-center mb-4">
        <Image
          src="/smartEDU_logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="rounded"
        />
      </div>

      <ul>
        {links.map((link) => (
          <li key={link.page} className="mb-2">
            <Link
              href={link.href}
              className={`block px-4 py-4 text-lg font-serif text-black hover:bg-purple-300 rounded ${
                currentPage === link.page ? "bg-purple-300 text-white" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Login/Logout Section */}
      <div className="mt-6 border-t pt-4">
        {email ? (
          <div className="flex flex-col px-4 py-4 bg-purple-300 text-white rounded">
            <span className="mb-2 font-bold">{email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/admin/login"
            className="block px-4 py-4 text-lg font-serif text-black hover:bg-purple-300 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
