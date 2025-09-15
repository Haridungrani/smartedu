// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function Header() {
//   const [email, setEmail] = useState(null);

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await fetch("/api/user");  // Correct API endpoint
// //         if (!res.ok) {
// //           throw new Error("Failed to fetch");
// //         }
// //         const data = await res.json();
// //         if (data.email) {
// //           setEmail(data.email);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching user:", error);
// //       }
// //     };

// //     fetchUser();
// //   }, []);

// //   const handleLogout = async () => {
// //     try {
// //       const res = await fetch("/api/logout", { method: "POST" });
// //       if (res.ok) {
// //         setEmail(null);
// //       }
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //     }
// //   };

//   return (
//     <header className="bg-pink-300 p-4 flex justify-end items-center space-x-4">
//       {email ? (
//         <div className="flex items-center gap-4">
//           <span className="text-black font-bold">{email}</span>
//           <button
//             onClick={handleLogout}
//             className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <Link href="/login" className="text-black text-lg font-sans">
//           login/register
//         </Link>
//       )}
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const [email, setEmail] = useState(null);
//   const router = useRouter();

//   // Fetch logged-in admin info
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/me");
//         if (res.ok) {
//           const data = await res.json();
//           setEmail(data.email);
//         } else {
//           setEmail(null);
//         }
//       } catch (err) {
//         setEmail(null);
//       }
//     }

//     fetchUser();
//   }, []);

//   // Logout
//   const handleLogout = async () => {
//     await fetch("/api/logout", { method: "POST" });
//     setEmail(null);
//     router.push("/login");
//   };

//   return (
//     <header className="bg-pink-300 p-4 flex justify-between items-center">
//       <Link href="/" className="text-black text-lg font-bold">
//         SmartEdu
//       </Link>

//       {email ? (
//         <div className="flex items-center gap-4">
//           <span className="text-black font-bold">{email}</span>
//           <button
//             onClick={handleLogout}
//             className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <Link href="/login" className="text-black text-lg font-sans">
//           login/register
//         </Link>
//       )}
//     </header>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const [email, setEmail] = useState(null);
//   const router = useRouter();

//   // Fetch current admin on component mount
//   useEffect(() => {
//     async function fetchAdmin() {
//       try {
//         const res = await fetch("/api/me");
//         if (res.ok) {
//           const data = await res.json();
//           setEmail(data.email);
//         } else {
//           setEmail(null);
//         }
//       } catch (err) {
//         console.error("Error fetching admin:", err);
//         setEmail(null);
//       }
//     }

//     fetchAdmin();
//   }, []);

//   // Logout handler
//   const handleLogout = async () => {
//     try {
//       await fetch("/api/admin/logout");
//       setEmail(null);
//       router.push("/login"); // redirect to login page
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <header className="bg-pink-300 p-4 flex justify-end items-center space-x-4">
//       {email ? (
//         <div className="flex items-center gap-4">
//           <span className="text-black font-bold">{email}</span>
//           <button
//             onClick={handleLogout}
//             className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <a
//           href="/login"
//           className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
//         >
//           Login
//         </a>
//       )}
//     </header>
//   );
// }

"use client";
import { useRouter } from "next/navigation";

export default function Header({ email, setEmail }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout");
    setEmail(null);
    router.push("/login");
  };

  return (
    <header className="bg-pink-300 p-4 flex justify-end items-center space-x-4">
      {email ? (
        <div className="flex items-center gap-4">
          <span className="text-black font-bold">{email}</span>
          <button onClick={handleLogout} className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      ) : (
        <a href="/login" className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Login</a>
      )}
    </header>
  );
}
