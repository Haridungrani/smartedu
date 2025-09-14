import Link from "next/link";
import Image from "next/image";

export default function Sidebar({ currentPage }) {
    const links = [
        { href: "/admin/", name: "Dashboard", page: "dashboard" },
        { href: "/admin/user", name: "User", page: "user" },
        { href: "/admin/blogger", name: "Blogger", page: "blogger" },
        { href: "/admin/course", name: "Course", page: "course" },
        { href: "/admin/contact", name: "Contact", page: "contact" },
    ];

    return (
        <div className="fixed w-64 h-full bg-gray-200 shadow-md  overflow-auto p-4">
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
