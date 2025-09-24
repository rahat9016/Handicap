'use client'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export function LanguageToggle() {
  const params = useParams();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale }
    );
  }
  
  return (
     <ToggleGroup
      type="single"
      value={locale}
      onValueChange={onSelectChange}
      className="inline-flex items-center bg-white rounded-full"
    >
      <ToggleGroupItem
        value="en"
        className="px-2.5 py-0.5 text-xs font-normal font-inter rounded-full transition-all duration-200 ease-in-out
        data-[state=on]:bg-blue-600 data-[state=on]:bg-[#0077CC] data-[state=on]:text-white
        data-[state=off]:bg-transparent data-[state=off]:text-black"
        tabIndex={0}
      >
        ENG
      </ToggleGroupItem>
      <ToggleGroupItem
      tabIndex={0}
        value="bn"
        className="px-2.5 py-0.5  text-xs font-normal font-inter rounded-full transition-all duration-200 ease-in-out
        data-[state=on]:bg-blue-600 data-[state=on]:bg-[#0077CC] data-[state=on]:text-white
        data-[state=off]:bg-transparent data-[state=off]:text-black"
      >
        বাংলা
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
