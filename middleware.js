import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("admin_token")?.value;

    // If user is trying to access the login page while already logged in, redirect to dashboard
    if (pathname === "/admin/login") {
        if (token) {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
        return NextResponse.next();
    }

    // Protect all /admin routes (e.g. /admin, /admin/dashboard)
    if (pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
