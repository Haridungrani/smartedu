// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMsg, setErrorMsg] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const res = await fetch("/api/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await res.json();

//         if (res.ok) {
//             alert("Login successful!");
//             router.push("/course");
//             setErrorMsg("");
//             // Redirect or perform further actions
//         } else {
//             setErrorMsg(data.error || "Something went wrong.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
//             <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
//                 {/* Image Section */}
//                 <div className="hidden md:block flex-shrink-0">
//                     <Image src="/login.jpg" alt="Login" width={400} height={300} className="rounded-lg" />
//                 </div>

//                 {/* Form Section */}
//                 <div className="w-full">
//                     <div className="text-center mb-6">
//                         <div className="flex justify-center mb-4">
//                             <Image src="/smartEDU_logo.png" alt="Logo" width={80} height={80} />
//                         </div>
//                         <h2 className="text-3xl font-bold text-purple-800 font-algerian">User Login</h2>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label className="block mb-1 font-serif text-lg">Email</label>
//                             <input
//                                 type="email"
//                                 className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                 placeholder="Enter email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1 font-serif text-lg">Password</label>
//                             <input
//                                 type="password"
//                                 className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                                 placeholder="Enter password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         {errorMsg && (
//                             <p className="text-red-600 text-sm">{errorMsg}</p>
//                         )}

//                         <div>
//                             <Link
//                                 href="/"
//                                 type="submit"
//                                 className="w-full bg-purple-800 text-white font-semibold rounded-full px-4 py-2 hover:bg-purple-900 transition"
//                             >
//                                 Login
//                             </Link>
//                         </div>
//                     </form>

//                     <div className="text-center mt-4">
//                         <h5 className="text-base font-serif">
//                             Not registered?{" "}
//                             <Link href="/register" className="text-blue-600 hover:underline">
//                                 Register Now
//                             </Link>
//                         </h5>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // ✅ Import router
// import Link from "next/link";
// import Image from "next/image";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const router = useRouter(); // ✅ Initialize router

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     try {
//       const res = await fetch("/api/admin/login", { // ✅ Correct API endpoint
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // ✅ Include cookies
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Login successful!");
//         router.push("/course"); // ✅ Redirect after login
//       } else {
//         setErrorMsg(data.error || "Something went wrong.");
//       }
//     } catch (err) {
//       setErrorMsg("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
//       <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
//         {/* Image Section */}
//         <div className="hidden md:block flex-shrink-0">
//           <Image
//             src="/login.jpg"
//             alt="Login"
//             width={400}
//             height={300}
//             className="rounded-lg"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="w-full">
//           <div className="text-center mb-6">
//             <div className="flex justify-center mb-4">
//               <Image
//                 src="/smartEDU_logo.png"
//                 alt="Logo"
//                 width={80}
//                 height={80}
//               />
//             </div>
//             <h2 className="text-3xl font-bold text-purple-800 font-algerian">
//               User Login
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-serif text-lg">Email</label>
//               <input
//                 type="email"
//                 className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-serif text-lg">Password</label>
//               <input
//                 type="password"
//                 className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

//             <div>
//               <button
//                 type="submit"
//                 className="w-full bg-purple-800 text-white font-semibold rounded-full px-4 py-2 hover:bg-purple-900 transition"
//               >
//                 Login
//               </button>
//             </div>
//           </form>

//           <div className="text-center mt-4">
//             <h5 className="text-base font-serif">
//               Not registered?{" "}
//               <Link href="/register" className="text-blue-600 hover:underline">
//                 Register Now
//               </Link>
//             </h5>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter(); // ✅ Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Include cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error(data.error || "Invalid credentials");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row items-center gap-6">
        {/* Image Section */}
        <div className="hidden md:block flex-shrink-0">
          <Image
            src="/login.jpg"
            alt="Login"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Image
                src="/smartEDU_logo.png"
                alt="Logo"
                width={80}
                height={80}
              />
            </div>
            <h2 className="text-3xl font-bold text-purple-800 font-algerian">
              User Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-serif text-lg">Email</label>
              <input
                type="email"
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-serif text-lg">Password</label>
              <input
                type="password"
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

            <div>
              <button
                type="submit"
                className="w-full bg-purple-800 text-white font-semibold rounded-full px-4 py-2 hover:bg-purple-900 transition"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <h5 className="text-base font-serif">
              Not registered?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Register Now
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
