import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Public routes that should be accessible without authentication
    const isPublicRoute = url.pathname === "/" || 
                         url.pathname === "/sign-in" || 
                         url.pathname === "/sign-up" ||
                         url.pathname === "/user-input";

    // Protected routes that require authentication
    const isProtectedRoute = url.pathname.startsWith("/dashboard");

    // If user is authenticated and trying to access public routes,
    // redirect them to dashboard
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user is not authenticated and trying to access protected routes,
    // redirect them to sign-in
    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Allow all other cases
    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/",
        // "/sign-in",
        // "/sign-up",
        // "/dashboard",
    ],
};