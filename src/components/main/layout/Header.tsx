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

export default function Header() {
  const {
    userInformation: { email },
  } = useAppSelector((state) => state.auth);

  const pathname = usePathname();
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="pb-32">
      <div className="fixed w-full top-0 z-50">
        {/* Top accessibility bar */}
        <div className="w-full pt-3 bg-pureBlack">
          <div className="container" aria-label="Nav bar" tabIndex={0}>
            <div className="text-white text-sm px-4 py-2 flex justify-between items-center">
              <div className="hidden sm:flex space-x-4">
                <span tabIndex={0}>{t("wcag")}</span>
                <span tabIndex={0}>{t("gdpr")}</span>
                <span tabIndex={0}>{t("colorBlind")}</span>
              </div>
              <div className="flex space-x-4 items-center">
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

        {/* Main nav */}
        <div className="bg-white shadow-lg">
          <div className="container flex items-center justify-between py-4 px-4">
            {/* Logo */}
            <div className="flex items-center gap-5">
              <Link href="/" aria-label="Disability Inclusion Resource Hub">
                <h2 className="font-inter text-lg text-[#0077CC] font-bold leading-none">
                  Disability Inclusion
                  <br /> Resource Hub
                </h2>
                <p className="font-inter font-medium text-sm text-[#666666]">
                  Bangladesh
                </p>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex font-normal divide-x divide-gray-300 text-sm">
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className="group relative pb-1 px-2"
                  >
                    <div className="px-4">
                      <span
                        className={`text-center ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-[#666666]"
                        }`}
                      >
                        {tNav(label)}
                      </span>
                      <span
                        className={`absolute -inset-x-1 -bottom-0.5 h-[3px] bg-red-700 transition-all duration-300 ease-in-out mx-auto
                        ${isActive ? "w-9/12" : "w-0 group-hover:w-9/12"}`}
                      />
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg border border-gray-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile nav dropdown */}
          {mobileOpen && (
            <div className="md:hidden bg-white border-t shadow-lg">
              <nav className="flex flex-col space-y-2 px-4 py-3">
                {navLinks.map(({ label, href }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`py-2 px-3 rounded-md ${
                        isActive
                          ? "text-primary font-medium bg-gray-100"
                          : "text-[#666666] hover:bg-gray-50"
                      }`}
                    >
                      {tNav(label)}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
