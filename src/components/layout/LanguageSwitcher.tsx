"use client"

import { Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/LocaleProvider"
import { SUPPORTED_LOCALES } from "@/i18n/config"
import type { LocaleCode } from "@/i18n/locale-utils"
import { useState, useRef, useEffect } from "react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLocale = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 h-8 px-2 rounded-lg text-[13px] font-medium",
          "border border-border bg-white text-muted-foreground",
          "hover:bg-secondary hover:text-foreground transition-colors",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <Globe className="h-[15px] w-[15px]" strokeWidth={1.5} />
        <span className="text-[11px]">{currentLocale.flag}</span>
        <span className="text-[11px] hidden lg:inline">{currentLocale.label}</span>
        <ChevronDown className="h-3 w-3 opacity-40" strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-lg border border-border bg-white py-1 shadow-lg animate-in fade-in-0 zoom-in-95 origin-top-right">
          {SUPPORTED_LOCALES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => { setLocale(item.code as LocaleCode); setOpen(false) }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-[13px] transition-colors text-left",
                "hover:bg-secondary",
                locale === item.code ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              <span className="text-sm">{item.flag}</span>
              <span className="flex-1">{item.label}</span>
              {locale === item.code && (
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
