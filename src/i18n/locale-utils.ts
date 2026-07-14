import enLocale from "@/i18n/locales/en"

// All locale files share the same shape
export type TranslationDict = typeof enLocale
export type LocaleCode = "en" | "zh-CN" | "ja" | "ko" | "de" | "fr" | "es" | "it"

// Lazy-load non-English locales
const localeLoaders: Record<Exclude<LocaleCode, "en">, () => Promise<TranslationDict>> = {
  "zh-CN": () => import("@/i18n/locales/zh-CN").then((m) => m.default),
  ja: () => import("@/i18n/locales/ja").then((m) => m.default),
  ko: () => import("@/i18n/locales/ko").then((m) => m.default),
  de: () => import("@/i18n/locales/de").then((m) => m.default),
  fr: () => import("@/i18n/locales/fr").then((m) => m.default),
  es: () => import("@/i18n/locales/es").then((m) => m.default),
  it: () => import("@/i18n/locales/it").then((m) => m.default),
}

const cache = new Map<string, TranslationDict>()
cache.set("en", enLocale)

export async function loadLocale(code: string): Promise<TranslationDict> {
  if (cache.has(code)) return cache.get(code)!
  if (code === "en") return enLocale
  const loader = localeLoaders[code as Exclude<LocaleCode, "en">]
  if (!loader) return enLocale
  const dict = await loader()
  cache.set(code, dict)
  return dict
}

/**
 * Access nested translation:
 * "dashboard.title" → dict.dashboard.title
 * Falls back to key string if not found
 */
export function getTranslation(
  dict: TranslationDict,
  key: string,
  params?: Record<string, string | number>
): string {
  const parts = key.split(".")
  let current: unknown = dict
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return key
    }
  }
  let value = typeof current === "string" ? current : key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), String(v))
    }
  }
  return value
}
