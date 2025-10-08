"use client";
import { Link } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  return (
    <header className="pb-20 md:pb-20">
      <div className="fixed w-full top-0 z-50">
        <div className="w-full pt-2 sm:pt-3 bg-pureBlack">
          <div
            className="container px-4 sm:px-6 lg:px-8"
            aria-label="Nav bar"
            tabIndex={0}
          >
            <div className="text-white text-xs sm:text-sm px-2 sm:px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
                <span tabIndex={0} className="text-center sm:text-left">
                  {t("wcag")}
                </span>
                <span tabIndex={0} className="text-center sm:text-left">
                  {t("gdpr")}
                </span>
                <span tabIndex={0} className="text-center sm:text-left">
                  {t("colorBlind")}
                </span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 items-center">
                <LanguageToggle />
                <Link href="/accessibility" className="whitespace-nowrap">
                  {t("accessibility")}
                </Link>
                <Link href="/event-calendar" className="whitespace-nowrap">
                  {t("eventCalendar")}
                </Link>
                <Link href="/privacy" className="whitespace-nowrap">
                  {t("privacyPolicy")}
                </Link>
                {email ? (
                  <ProfileDropdown />
                ) : (
                  <Link href="/login" className="whitespace-nowrap">
                    {t("login")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="bg-white shadow-lg">
          <div className="container flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 lg:px-8 h-20 md:h-[108px]">
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

            {/* Desktop nav */}
            <nav className="hidden lg:flex font-normal divide-x divide-gray-300 text-sm">
              {navLinks.map(({ label, href }) => {
                const normalizedPath =
                  pathname.replace(/^\/(en|bn)(?=\/|$)/, "") || "/";
                let isActive = false;
                if (href === "/") {
                  isActive = normalizedPath === "/";
                } else {
                  isActive = normalizedPath.startsWith(href);
                }
                return (
                  <Link
                    key={label}
                    href={href}
                    className="group relative pb-1 px-1 sm:px-2"
                  >
                    <div className="px-2 sm:px-4">
                      <span
                        className={`text-center whitespace-nowrap ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-[#666666]"
                        }`}
                      >
                        {tNav(label)}
                      </span>
                      <span
                        className={`absolute -inset-x-1 -bottom-0.5 h-[3px]  transition-all duration-300 ease-in-out mx-auto
                        ${
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

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg border border-gray-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile nav dropdown */}
          <div
            className={`lg:hidden fixed top-0 right-0 h-full w-3/5 max-w-sm bg-white shadow-xl border-l transform transition-transform duration-300 ease-in-out z-50 ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end items-center p-4 border-b h-20 md:h-[108px]">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg border border-gray-200"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto">
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900 mb-3 text-sm">
                    Main Navigation
                  </h3>
                  <div className="space-y-1">
                    {navLinks.map(({ label, href }) => {
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={label}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={`block py-3 px-3 rounded-md text-sm ${
                            isActive
                              ? "text-primary font-medium bg-gray-100"
                              : "text-[#666666] hover:bg-gray-50"
                          }`}
                        >
                          {tNav(label)}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Accessibility Links */}
                <div className="p-4 border-b">
                  <h3 className="font-medium text-gray-900 mb-3 text-sm">
                    Accessibility
                  </h3>
                  <div className="space-y-1">
                    <Link
                      href="/accessibility"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-3 rounded-md text-sm text-[#666666] hover:bg-gray-50"
                    >
                      {t("accessibility")}
                    </Link>
                    <Link
                      href="/event-calendar"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-3 rounded-md text-sm text-[#666666] hover:bg-gray-50"
                    >
                      {t("eventCalendar")}
                    </Link>
                    <Link
                      href="/privacy"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-3 rounded-md text-sm text-[#666666] hover:bg-gray-50"
                    >
                      {t("privacyPolicy")}
                    </Link>
                  </div>
                  <div className="rounded-full  ml-3 space-y-1 border-2 flex items-center w-28 p-1 pl-2">
                    <LanguageToggle />
                  </div>
                </div>

                {/* User Section */}
                <div className="p-4">
                  <div className="space-y-1">
                    {email ? (
                      <div className="py-3 px-3">
                        <ProfileDropdown />
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 px-3 rounded-md text-sm text-[#666666] hover:bg-gray-50 whitespace-nowrap"
                      >
                        {t("login")}
                      </Link>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Overlay */}

          <div
            className={`lg:hidden ${
              mobileOpen
                ? "backdrop-blur-sm bg-black bg-opacity-50"
                : "pointer-events-none"
            } fixed inset-0 duration-300  z-40`}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
