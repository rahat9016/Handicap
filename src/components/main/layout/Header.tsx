"use client";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { navLinks } from "./navLinks";

export default function Header() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  return (
    <header className="w-full pt-3 fixed top-0 z-50">
      <div className="container shadow-2xl">
        <div className=" bg-pureBlack text-white text-sm px-4 py-2 flex justify-between items-center">
          <div className="space-x-4">
            <span>WCAG 2.1 AA Compliant</span>
            <span>GDPR Compliant</span>
            <span>Color Blind Mode Available</span>
          </div>
          <div className="space-x-4">
            <Link href="#">Accessibility Statement</Link>
            <Link href="#">Event Calendar</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Login</Link>
          </div>
        </div>

        <div className="bg-white flex items-center justify-between px-6 py-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Humanity & inclusion"
              width={86}
              height={40}
            />
          </Link>

          <nav className="flex font-normal divide-x divide-gray-300 text-sm">
            {navLinks.map(({ label, href }) => {
              const isActive = `/${pathname?.split('/')[2]}` === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className="group relative pb-1 px-6 "
                >
                  <div className="px-4">
                    <span
                    className={`text-center ${isActive ?"text-primary font-medium":"text-[#666666]"} `}
                  >
                    {label}
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
          <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
            <Input
              type="text"
              placeholder="I'am looking for..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none px-2 py-1 text-sm border-none  shadow-none"
            />
            <FaSearch className="text-gray-500 mr-2" />
          </div>
        </div>
      </div>
    </header>
  );
}
