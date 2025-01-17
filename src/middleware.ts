import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("Middleware Token:", token);
    console.log("Current Path:", request.nextUrl.pathname);
    const url = request.nextUrl;

    // Public routes that should be accessible without authentication
    const isPublicRoute =
        url.pathname === "/" ||
        url.pathname === "/sign-in" ||
        url.pathname === "/sign-up";

    // Protected routes that require authentication
    const isProtectedRoute = [
        "/dashboard",
        "/exercise",
        "/diet",
        "/track-diet",
        "/health-and-stats",
        "/account-settings",
    ].some((protectedPath) => url.pathname.startsWith(protectedPath));

    // If user is authenticated and trying to access public routes,
    // redirect them to dashboard
    if (token && isPublicRoute) {
        if (token.isNewUser)
            return NextResponse.redirect(new URL("/user-input", request.url));
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
        "/",
        "/sign-in",
        "/sign-up",
        "/user-input",
        "/dashboard",
        "/exercise",
        "/diet",
        "/track-diet",
        "/health-and-stats",
        "/account-settings",
    ],
};
