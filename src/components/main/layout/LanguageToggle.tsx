'use client'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useState } from "react"

export function LanguageToggle() {
  // const local:string = useLocale()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  console.log(language)
  return (
    <ToggleGroup
      type="single"
      value={language}
      onValueChange={(val) => {
        if (val) setLanguage(val as "en" | "bn")
      }}
      className="inline-flex items-center bg-white rounded-full bg-gray-100 transition-colors duration-200"
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
