import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { decryptData } from "./utils/cryptoHelper";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1]; // 'en' or 'bn'

  const isModuleDetail = /^\/(en|bn)\/modules\/[^/]+$/.test(pathname);
  const isAdminRoute = /^\/(en|bn)\/admin(\/.*)?$/.test(pathname);
  const isLoginPage = /^\/(en|bn)\/login$/.test(pathname);
  const isOrgListRoute = /^\/(en|bn)\/organization-list$/.test(pathname);
  const isProtected = isModuleDetail || isAdminRoute || isOrgListRoute;

  const token = request.cookies.get("accessToken")?.value;

  // 🔑 Decrypt roleId
  let roleId: number | null = null;
  const encryptedRoleId = request.cookies.get("roleId")?.value;
  if (encryptedRoleId) {
    try {
      const decrypted = decryptData(encryptedRoleId, "ABC123!@#");
      roleId = Number(decrypted);
    } catch (err) {
      console.error("Failed to decrypt roleId:", err);
      roleId = null;
    }
  }

  // 🔑 Decrypt adminPermission
  let adminPermission = false;
  const encryptedAdminPermission =
    request.cookies.get("adminPermission")?.value;
  if (encryptedAdminPermission) {
    try {
      adminPermission =
        decryptData(encryptedAdminPermission, "ABC123!@#") === "true";
    } catch (err) {
      console.error("Failed to decrypt adminPermission:", err);
    }
  }
  console.log("Middleware",adminPermission)

  // ✅ Redirect logged-in users away from login page
  if (isLoginPage && token) {
    const redirectUrl = new URL(`/${locale}/admin`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Redirect guests trying to access protected routes
  if (isProtected && !token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, "");
    loginUrl.searchParams.set(
      "callbackUrl",
      encodeURIComponent(pathnameWithoutLocale)
    );
    return NextResponse.redirect(loginUrl);
  }

  // 🚫 Block users without adminPermission from any /admin route
  if (isAdminRoute && !adminPermission) {
    const redirectUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 🚫 Block roleId !== 1 from accessing restricted admin routes
  const restrictedAdminRoutes = [`/admin/users`, `/admin/page-sections`];

  const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, "");

  if (restrictedAdminRoutes.includes(pathnameWithoutLocale) && roleId !== 1) {
    const redirectUrl = new URL(`/${locale}/admin`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 🚫 Block users from /organization-list if roleId !== 2
  if (isOrgListRoute && roleId !== 2) {
    const redirectUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|bn)/:path*"],
};
