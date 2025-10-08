"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { TbAlphabetBangla } from "react-icons/tb";
import { HiLanguage } from "react-icons/hi2";

export function LanguageToggle() {
  const params = useParams();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    if (!nextLocale || nextLocale === locale) return;
    router.replace(
      // @ts-expect-error — Valid combination of pathname + params for the current route
      { pathname, params },
      { locale: nextLocale as Locale }
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={locale}
      onValueChange={onSelectChange}
      className="inline-flex items-center lg:ring-2 ring-white bg-white lg:bg-transparent rounded-full border border-gray-200 lg:border-none overflow-hidden"
    >
      {/* 🔹 Desktop Language Buttons */}
      <div className="hidden lg:flex">
        <ToggleGroupItem
          value="en"
          tabIndex={0}
          className="px-3 py-1 text-xs font-normal font-inter rounded-full transition-all duration-200 ease-in-out
          data-[state=on]:bg-[#0077CC] data-[state=on]:text-white
          data-[state=off]:bg-transparent data-[state=off]:text-gray-800 hover:bg-gray-100"
        >
          ENG
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bn"
          tabIndex={0}
          className="px-3 py-1 text-xs font-normal font-inter rounded-full transition-all duration-200 ease-in-out
          data-[state=on]:bg-[#0077CC] data-[state=on]:text-white
          data-[state=off]:bg-transparent data-[state=off]:text-gray-800 hover:bg-gray-100"
        >
          বাংলা
        </ToggleGroupItem>
      </div>

      {/* 🔹 Mobile Language Icons */}
      <div className="flex lg:hidden items-center justify-center rounded-full bg-[#0077CC] hover:bg-[#0062a6] transition-colors">
        {locale === "en" ? (
          <ToggleGroupItem
            value="bn"
            tabIndex={0}
            className="p-1 data-[state=on]:bg-transparent data-[state=off]:bg-transparent"
          >
            <TbAlphabetBangla size={20} color="#FFFFFF" />
          </ToggleGroupItem>
        ) : (
          <ToggleGroupItem
            value="en"
            tabIndex={0}
            className="p-1 data-[state=on]:bg-transparent data-[state=off]:bg-transparent"
          >
            <HiLanguage size={20} color="#FFFFFF" />
          </ToggleGroupItem>
        )}
      </div>
    </ToggleGroup>
  );
}
