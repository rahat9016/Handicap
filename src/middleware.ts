
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
import { routing } from './i18n/routing';

export default createMiddleware(routing);
 
export const config = {
  matcher: ['/', "/(en|bn)/:path*"]
};

