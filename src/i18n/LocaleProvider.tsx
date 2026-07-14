"use client"

import React, { createContext, useContext, useState, useEffect, useMemo } from "react"
import type { TranslationDict, LocaleCode } from "./locale-utils"
import { loadLocale, getTranslation } from "./locale-utils"
import en from "@/i18n/locales/en"

const STORAGE_KEY = "ecom-locale"

function getStoredLocale(): LocaleCode {
  if (typeof window === "undefined") return "en"
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored as LocaleCode
  } catch {}
  const lang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "en"
  if (lang.startsWith("zh")) return "zh-CN"
  if (lang.startsWith("ja")) return "ja"
  if (lang.startsWith("ko")) return "ko"
  if (lang.startsWith("de")) return "de"
  if (lang.startsWith("fr")) return "fr"
  if (lang.startsWith("es")) return "es"
  if (lang.startsWith("it")) return "it"
  return "en"
}

interface LocaleContextValue {
  locale: LocaleCode
  setLocale: (locale: LocaleCode) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Start with English immediately (no useEffect delay) for SSR + first paint
  const [locale, setLocaleState] = useState<LocaleCode>("en")
  const [dict, setDict] = useState<TranslationDict>(en)

  // After mount, check stored preference & browser language
  useEffect(() => {
    const detected = getStoredLocale()
    if (detected !== "en") {
      setLocaleState(detected)
      loadLocale(detected).then(setDict)
    }
  }, [])

  const setLocale = React.useCallback((newLocale: LocaleCode) => {
    setLocaleState(newLocale)
    loadLocale(newLocale).then(setDict)
    try { localStorage.setItem(STORAGE_KEY, newLocale) } catch {}
    document.documentElement.lang = newLocale
  }, [])

  const translate = React.useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return getTranslation(dict, key, params)
    },
    [dict]
  )

  const ctx = useMemo(() => ({ locale, setLocale, t: translate }), [locale, setLocale, translate])

  return (
    <LocaleContext.Provider value={ctx}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
