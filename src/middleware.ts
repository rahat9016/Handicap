
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
  const locale = pathname.split('/')[1]; // 'en' or 'bn'

  const isModuleDetail = /^\/(en|bn)\/modules\/[^/]+$/.test(pathname);
  const isAdminRoute = /^\/(en|bn)\/admin(\/.*)?$/.test(pathname);
  const isLoginPage = /^\/(en|bn)\/login$/.test(pathname);
  const isProtected = isModuleDetail || isAdminRoute;

  const token = request.cookies.get("accessToken")?.value;
  const roleId = Number(request.cookies.get("roleId")?.value);

  // ✅ Redirect logged-in users away from login page
  if (isLoginPage && token) {
    const redirectUrl = new URL(`/${locale}/admin`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Redirect guests trying to access protected routes
  if (isProtected && !token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, '');
    loginUrl.searchParams.set("callbackUrl", encodeURIComponent(pathnameWithoutLocale));
    return NextResponse.redirect(loginUrl);
  }

  // 🚫 Block roleId !== 1 from accessing restricted admin routes
  const restrictedAdminRoutes = [
    `/admin/users`,
    `/admin/page-sections`,
  ];

  const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, '');

  if (restrictedAdminRoutes.includes(pathnameWithoutLocale) && roleId !== 1) {
    const redirectUrl = new URL(`/${locale}/admin`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|bn)/:path*'],
};
