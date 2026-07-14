"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { mainNavItems, bottomNavItems } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/i18n/LocaleProvider"
import { Sparkles } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLocale()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-[240px] flex-col border-r border-border bg-white">
      {/* Brand — refined SVG logo */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-border shrink-0">
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-gray-900 shadow-sm shadow-gray-900/10">
          <svg
            width="20" height="20" viewBox="0 0 24 24" fill="none"
            className="text-white"
          >
            <path d="M12 2L3 9L12 16L21 9L12 2Z" fill="currentColor" fillOpacity={0.25} />
            <path d="M12 16V22L21 15V9L12 16Z" fill="currentColor" fillOpacity={0.5} />
            <path d="M12 16L3 9V15L12 22V16Z" fill="currentColor" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[13px] font-bold text-foreground tracking-tight">
            {t("common.appName")}
          </span>
          <span className="text-[10.5px] text-muted-foreground/70 font-medium">
            {t("common.appSubtitle")}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="mb-1.5 px-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
            {t("nav.mainMenu")}
          </span>
        </div>
        <ul className="flex flex-col gap-px">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href
            const label = t(`nav.${item.key}`)
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground/45 group-hover:text-muted-foreground"
                    )}
                    strokeWidth={1.8}
                  />
                  <span>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="shrink-0 px-3 pb-4">
        <Separator className="mb-3" />
        <ul className="flex flex-col gap-px">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive ? "text-foreground" : "text-muted-foreground/45"
                    )}
                    strokeWidth={1.8}
                  />
                  <span>{t(`nav.${item.key}`)}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* User */}
        <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-border px-2.5 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <span className="text-[11px] font-bold text-primary">AC</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[12px] font-semibold text-foreground truncate">Alex Chen</span>
            <span className="text-[10px] text-muted-foreground">{t("common.userRole")}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
