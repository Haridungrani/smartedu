"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-800 via-gray-600 to-black shadow-lg p-4 md:p-5 h-14 md:h-16 flex items-center justify-end">
      <nav>
        <Link
          href="#"
          className="text-white text-lg md:text-xl font-sans no-underline "
        >
          SmartEDU
        </Link>
      </nav>
    </header>
  );
}
