"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    // Do not render the public header on admin pages (e.g., /admin/login)
    if (pathname && pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <header className="bg-white shadow-lg">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-gray-800">Blog</h1>
                </Link>
                <nav className="space-x-4">
                    <Link href="/" className="text-blue-500 hover:text-blue-700 transition">
                        Home
                    </Link>
                    <Link href="/about" className="text-blue-500 hover:text-blue-700 transition">
                        About
                    </Link>
                    <Link href="/contact" className="text-blue-500 hover:text-blue-700 transition">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}