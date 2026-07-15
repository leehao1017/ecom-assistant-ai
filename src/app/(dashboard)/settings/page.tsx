"use client"

import { useLocale } from "@/i18n/LocaleProvider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Moon, Sun, Monitor } from "lucide-react"
import { SUPPORTED_LOCALES } from "@/i18n/config"
import type { LocaleCode } from "@/i18n/locale-utils"

export default function SettingsPage() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="max-w-[720px] mx-auto space-y-8">
      <div>
        <h1 className="text-[22px] font-bold tracking-tight text-foreground">
          {t("nav.settings")}
        </h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Manage your account and workspace preferences.
        </p>
      </div>

      <Card className="border-border shadow-none rounded-xl">
        <CardHeader>
          <CardTitle className="text-[15px] font-semibold">Language &amp; Region</CardTitle>
          <CardDescription className="text-[12px]">
            Choose your preferred language for the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUPPORTED_LOCALES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLocale(item.code as LocaleCode)}
                className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-[13px] font-medium transition-all ${
                  locale === item.code
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
                }`}
              >
                <span className="text-base">{item.flag}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-none rounded-xl">
        <CardHeader>
          <CardTitle className="text-[15px] font-semibold">Appearance</CardTitle>
          <CardDescription className="text-[12px]">
            Customize how Ecom Assistant AI looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            {[
              { icon: <Sun className="h-4 w-4" />, active: true },
              { icon: <Moon className="h-4 w-4" />, active: false },
              { icon: <Monitor className="h-4 w-4" />, active: false },
            ].map((item, i) => (
              <button
                key={i}
                type="button"
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-medium transition-all ${
                  item.active
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
                }`}
              >
                {item.icon}
                <span>{["Light", "Dark", "System"][i]}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-none rounded-xl">
        <CardHeader>
          <CardTitle className="text-[15px] font-semibold">Workspace</CardTitle>
          <CardDescription className="text-[12px]">
            Configure your store and team settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-[13px] font-medium text-foreground">Store Marketplace</p>
              <p className="text-[11px] text-muted-foreground">Amazon.com · US</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-[12px] rounded-lg">
              Change
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-[13px] font-medium text-foreground">Team Members</p>
              <p className="text-[11px] text-muted-foreground">3 active members</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-[12px] rounded-lg">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
