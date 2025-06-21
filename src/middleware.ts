import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

// Define protected routes and required roles
const protectedRoutes: Record<string, string[]> = {
    "/dashboard": ["admin", "user"], // Both "admin" and "user" can access
    "/admin": ["admin", "user"], // Only "admin" can access
};

// Define the shape of the decoded JWT token
interface DecodedToken {
    email: string;
    sub: number;
    role: string; // "admin" or "user"
    iat: number;
    exp: number;
}

export function middleware(req: NextRequest) {
    const token = req.cookies.get("refreshToken")?.value;
    const pathname = req.nextUrl.pathname;

    // If no token, allow access to all routes except protected ones
    if (!token) {
        if (pathname === "/dashboard" || pathname === "/users") {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

    // Decode token
    const user = jwtDecode<DecodedToken>(token);

    // If token exists and user tries to access "/login", redirect to "/dashboard"
    if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Check role-based access for protected routes
    const allowedRoles = protectedRoutes[pathname];

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If user role is not allowed, redirect to "/dashboard"
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow access to the requested route
    return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
    matcher: ["/", "/dashboard", "/users", "/login"],
};


// import { NextRequest, NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

// // Define protected routes and required roles
// const protectedRoutes: Record<string, string[]> = {
//     "/admin": ["admin"],
//     "/dashboard": ["admin", "user"],
// };

// // Define the shape of the decoded JWT token
// interface DecodedToken {
//     email: string;
//     sub: number;
//     role: string;
//     iat: number;
//     exp: number;
// }

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("refreshToken")?.value;

//     if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     // Decode token
//     const user = jwtDecode<DecodedToken>(token);

//     // Log the user object for debugging
//     console.log("user:", user);

//     // Check role-based access
//     const pathname = req.nextUrl.pathname;
//     const allowedRoles = protectedRoutes[pathname];

//     if (allowedRoles && !allowedRoles.includes(user.role)) {
//         return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }

//     return NextResponse.next();
// }

// // Apply middleware to protected routes
// export const config = {
//     matcher: ["/admin", "/dashboard"], // List of protected routes
// };