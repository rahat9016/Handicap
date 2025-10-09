"use client";
import { Link } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { navLinks } from "./navLinks";
import { ProfileDropdown } from "./ProfileDropdown";

const Header = () => {
  const {
    userInformation: { email },
  } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const normalizedPath = pathname.replace(/^\/(en|bn)(?=\/|$)/, "") || "/";

  return (
    <header>
      <div className="fixed w-full h-20 md:h-24 lg:h-28 bg-white shadow-lg z-50">
        {/* 🔹 Top Black Accessibility Bar (Desktop only) */}
        <div className="hidden lg:flex items-center w-full h-12 bg-pureBlack">
          <div
            className="container px-4 sm:px-6 lg:px-8"
            aria-label="Nav bar"
            tabIndex={0}
          >
            <div className="text-white text-xs sm:text-sm px-2 sm:px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              {/* Left Info */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
                <span tabIndex={0}>{t("wcag")}</span>
                <span tabIndex={0}>{t("gdpr")}</span>
                <span tabIndex={0}>{t("colorBlind")}</span>
              </div>

              {/* Right Links */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 items-center">
                <LanguageToggle />
                <Link href="/accessibility">{t("accessibility")}</Link>
                <Link href="/event-calendar">{t("eventCalendar")}</Link>
                <Link href="/privacy">{t("privacyPolicy")}</Link>
                {email ? (
                  <ProfileDropdown />
                ) : (
                  <Link href="/login">{t("login")}</Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Main White Navbar */}
        <div className="h-full shadow-lg flex items-center relative">
          <div className="container flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/"
                aria-label="Disability Inclusion Resource Hub"
                className="flex-shrink-0"
              >
                <h2 className="font-inter text-base sm:text-lg text-[#0077CC] font-bold leading-tight">
                  Disability Inclusion
                  <br /> Resource Hub
                </h2>
                <p className="font-inter font-medium text-xs sm:text-sm text-[#666666]">
                  Bangladesh
                </p>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex font-normal divide-x divide-gray-300 text-sm">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? normalizedPath === "/"
                    : normalizedPath.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    className="group relative pb-1 px-2"
                  >
                    <div className="px-2 sm:px-4">
                      <span
                        className={`whitespace-nowrap ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-[#666666]"
                        }`}
                      >
                        {tNav(label)}
                      </span>
                      <span
                        className={`absolute -inset-x-1 -bottom-0.5 h-[3px] transition-all duration-300 ease-in-out mx-auto ${
                          isActive
                            ? "w-9/12 bg-red-700"
                            : "w-0 group-hover:w-9/12"
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </nav>
            <div className="flex gap-1 lg:hidden ">
              <div className="cursor-pointer flex border rounded-lg items-center justify-center h-10 w-10">
                <LanguageToggle />
              </div>
              {/* Mobile Hamburger */}
              <button
                className="p-2 rounded-lg border border-gray-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Drawer (slides under navbar) */}
      <div
        className={`lg:hidden fixed z-40 right-0 top-20 md:top-24 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 space-y-8 h-full overflow-y-auto">
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
              Main Menu
            </h4>
            <nav className="flex flex-col space-y-2">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? normalizedPath === "/"
                    : normalizedPath.startsWith(href);
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 px-3 rounded-md text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-primary font-medium bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tNav(label)}
                  </Link>
                );
              })}
            </nav>
          </div>
          <hr className="border-gray-200" />
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
              Accessibility & Info
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <Link href="/accessibility" onClick={() => setMobileOpen(false)}>
                {t("accessibility")}
              </Link>
              <Link href="/event-calendar" onClick={() => setMobileOpen(false)}>
                {t("eventCalendar")}
              </Link>
              <Link href="/privacy" onClick={() => setMobileOpen(false)}>
                {t("privacyPolicy")}
              </Link>
            </div>
          </div>
          <hr className="border-gray-200" />
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 tracking-wide">
              Profile & Settings
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              {email ? (
                <ProfileDropdown />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 hover:text-primary"
                >
                  {t("login")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed duration-300 top-20 md:top-24 z-30 inset-0 ${
          mobileOpen
            ? "backdrop-blur-sm bg-black/40"
            : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
    </header>
  );
};

export default Header;
