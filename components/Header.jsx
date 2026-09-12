"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    // Do not render the public header on admin pages (e.g., /admin/login)
    if (pathname && pathname.startsWith("/admin")) {
        return null;
    }

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 group-hover:bg-gray-900 transition flex items-center justify-center text-white font-black text-sm shadow-xs">
                        B
                    </span>
                    <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition">
                        NextBlog
                    </span>
                </Link>

                <nav className="flex items-center space-x-1 sm:space-x-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                                    isActive
                                        ? "text-blue-600 bg-blue-50 font-semibold"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}