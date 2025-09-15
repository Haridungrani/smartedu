"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [email, setEmail] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("/api/user");  // Correct API endpoint
//         if (!res.ok) {
//           throw new Error("Failed to fetch");
//         }
//         const data = await res.json();
//         if (data.email) {
//           setEmail(data.email);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const res = await fetch("/api/logout", { method: "POST" });
//       if (res.ok) {
//         setEmail(null);
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

  return (
    <header className="bg-pink-300 p-4 flex justify-end items-center space-x-4">
      {email ? (
        <div className="flex items-center gap-4">
          <span className="text-black font-bold">{email}</span>
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-black text-lg font-sans">
          SmartEdu
        </Link>
      )}
    </header>
  );
}
