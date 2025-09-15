import Link from "next/link";
import Image from "next/image";

export default function Sidebar({ currentPage }) {
    const links = [
        { href: "/", name: "Home", page: "home" },
        { href: "/course", name: "Course", page: "course" },
        { href: "/About", name: "About us", page: "about" },
        { href: "/contact", name: "Contact us", page: "contact" },
        { href: "/blogger/b_login", name: "Blogger's login", page: "blogregister" },
        { href: "/developer", name: "Developers", page: "developers" },
        { href: "/login", name: "Login", page: "login" },

    ];

    return (
        <div className="fixed w-64 h-full bg-pink-200 overflow-auto p-4">
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
                            className={`block px-4 py-4 text-lg font-serif text-black hover:bg-purple-300 rounded ${currentPage === link.page ? "bg-purple-300 text-white" : ""
                                }`}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
