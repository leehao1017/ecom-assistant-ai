"use client"

import { Bell, Search, Command, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLocale } from "@/i18n/LocaleProvider"
import { useEffect, useCallback } from "react"

interface NavbarProps {
  onAskAI?: () => void
}

export function Navbar({ onAskAI }: NavbarProps) {
  const { t } = useLocale()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>('[data-global-search]')
        input?.focus()
      }
    },
    []
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-white/90 backdrop-blur-sm px-6">
      {/* Workspace badge */}
      <div className="hidden md:flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5 shrink-0">
        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-[11px] font-semibold text-foreground">Amazon US</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" strokeWidth={2} />
      </div>

      {/* Global search with ⌘K */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
        <Input
          data-global-search
          type="search"
          placeholder={t("common.search")}
          className="pl-9 pr-16 h-9 bg-muted/30 border-transparent rounded-lg focus:bg-white focus:border-border text-[13px] transition-colors"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded-[5px] bg-white border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm">
          <Command className="h-2.5 w-2.5" strokeWidth={2.5} />K
        </kbd>
      </div>

      <div className="flex items-center gap-0.5 ml-auto">
        {/* Ask AI button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2.5 text-[12px] font-medium text-primary rounded-lg hover:bg-primary/5 relative"
          onClick={onAskAI}
        >
          <Sparkles className="h-[15px] w-[15px]" strokeWidth={1.8} />
          <span className="hidden md:inline">Ask AI</span>
        </Button>

        <LanguageSwitcher />

        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg">
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.6} />
          <span className="absolute top-1 right-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white ring-2 ring-white">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="flex items-center gap-2 px-1.5 py-1 h-9 hover:bg-secondary rounded-lg">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-bold">AC</AvatarFallback>
              </Avatar>
              <span className="text-[13px] font-medium text-foreground hidden sm:inline">Alex Chen</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:inline" strokeWidth={1.8} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold">Alex Chen</span>
                <span className="text-[11px] text-muted-foreground">alex@ecom-assistant.ai</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("userMenu.accountSettings")}</DropdownMenuItem>
            <DropdownMenuItem>{t("userMenu.team")}</DropdownMenuItem>
            <DropdownMenuItem>{t("userMenu.billing")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger">{t("userMenu.signOut")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
