
// Define protected routes and required roles
// const protectedRoutes: Record<string, string[]> = {
//     "/dashboard": ["admin", "user"], // Both "admin" and "user" can access
//     "/admin": ["admin", "user"], // Only "admin" can access
// };

// Define the shape of the decoded JWT token
// interface DecodedToken {
//     email: string;
//     sub: number;
//     role: string; // "admin" or "user"
//     iat: number;
//     exp: number;
// }

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("refreshToken")?.value;
//     const pathname = req.nextUrl.pathname;

//     // If no token, allow access to all routes except protected ones
//     if (!token) {
//         if (pathname === "/dashboard" || pathname === "/users") {
//             return NextResponse.redirect(new URL("/", req.url));
//         }
//         return NextResponse.next();
//     }

//     // Decode token
//     const user = jwtDecode<DecodedToken>(token);

//     // If token exists and user tries to access "/login", redirect to "/dashboard"
//     if (pathname === "/login") {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     // Check role-based access for protected routes
//     const allowedRoles = protectedRoutes[pathname];

//     if (allowedRoles && !allowedRoles.includes(user.role)) {
//         // If user role is not allowed, redirect to "/dashboard"
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     // Allow access to the requested route
//     return NextResponse.next();
// }

// // Apply middleware to all routes
// export const config = {
//     matcher: ["/", "/dashboard", "/users", "/login"],
// };

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1]; // 'en' or 'bn'

  // Regex matchers
  const isModuleDetail = /^\/(en|bn)\/modules\/[^/]+$/.test(pathname);
  const isAdminRoute = /^\/(en|bn)\/admin(\/.*)?$/.test(pathname);

  const isProtected = isModuleDetail || isAdminRoute;

  if (isProtected) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}
export const config = {
  matcher: ['/', "/(en|bn)/:path*"]
};

