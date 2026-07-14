"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/shared/PageHeader"
import { FileText, Sparkles, Copy, CheckCircle2 } from "lucide-react"
import { useLocale } from "@/i18n/LocaleProvider"

export default function ListingPage() {
  const { t } = useLocale()
  const [generated, setGenerated] = useState(false)

  return (
    <div className="max-w-[1400px] mx-auto">
      <PageHeader title={t("listing.title")} description={t("listing.description")} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-semibold">{t("listing.productInfo")}</CardTitle>
              <CardDescription className="text-xs">{t("listing.productInfoDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(["productName", "brand", "keyFeatures", "targetMarket", "targetKeywords"] as const).map((field) => {
                const label = t(`listing.${field}`)
                const placeholder = t(`listing.${field}Placeholder`)
                if (field === "keyFeatures") {
                  return (
                    <div key={field}>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block">{label}</label>
                      <Textarea placeholder={placeholder} className="min-h-[100px] text-sm" />
                    </div>
                  )
                }
                return (
                  <div key={field}>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">{label}</label>
                    <Input placeholder={placeholder} className="h-9 text-sm" />
                  </div>
                )
              })}
              <Button className="w-full" onClick={() => setGenerated(true)}>
                <Sparkles className="h-4 w-4 mr-2" />{t("listing.generate")}
              </Button>
            </CardContent>
          </Card>

          {generated && (
            <Card className="border-border shadow-none">
              <CardHeader><CardTitle className="text-base font-semibold">{t("listing.listingScore")}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("listing.overallScore")}</span>
                  <Badge className="bg-success-light text-success font-bold text-sm px-3">92/100</Badge>
                </div>
                {[
                  { labelKey: "listing.seoScore", score: 88, color: "bg-primary" },
                  { labelKey: "listing.keywordCoverage", score: 94, color: "bg-success" },
                ].map((item) => (
                  <div key={item.labelKey} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t(item.labelKey)}</span>
                      <span className="font-medium text-foreground">{item.score}/100</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-3">
          <Card className="border-border shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">
                  {generated ? t("listing.listingPreviewReady") : t("listing.listingPreview")}
                </CardTitle>
                <CardDescription className="text-xs">
                  {generated ? t("listing.listingPreviewReady") : t("listing.listingPreviewEmpty")}
                </CardDescription>
              </div>
              {generated && (
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3 w-3 mr-1.5" />{t("common.copy")}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {generated ? (
                <div className="space-y-5">
                  {[
                    { key: "titleSection", badge: "Title", content: "Wireless Earbuds Pro — Active Noise Cancelling Bluetooth 5.3 Earbuds with 40H Battery Life, IPX7 Waterproof, Hi-Fi Sound with Deep Bass, in-Ear Detection for Work & Sports" },
                    { key: "bulletPoints", badge: "Bullet Points", content: null },
                    { key: "description", badge: "Description", content: "Experience premium sound without the premium price tag. The SoundWave Wireless Earbuds Pro combines cutting-edge Active Noise Cancellation with exceptional comfort and durability. Whether you're commuting, working out, or taking calls, these earbuds deliver studio-quality audio in a sleek, lightweight design. Backed by our 18-month warranty and world-class customer support." },
                    { key: "searchTerms", badge: "Search Terms", content: null },
                  ].map((section) => (
                    <div key={section.key}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px]">{section.badge}</Badge>
                        {section.key !== "searchTerms" && <CheckCircle2 className="h-3 w-3 text-success" />}
                      </div>
                      {section.key === "titleSection" && <p className="text-sm font-medium text-foreground leading-relaxed">{section.content}</p>}
                      {section.key === "bulletPoints" && (
                        <ul className="space-y-2 text-sm text-foreground">
                          {["Advanced ANC 2.0 Technology", "40-Hour Total Playtime", "Premium Hi-Fi Sound", "IPX7 Waterproof & Sweatproof", "Smart In-Ear Detection & Touch Control"].map((title, i) => {
                            const descs = [
                              "Blocks up to 95% of ambient noise with 3 adjustable modes. Perfect for travel, work, or focused listening sessions.",
                              "8 hours per charge + 32 extra hours in the compact charging case. Quick charge gives 2 hours of playback in just 10 minutes.",
                              "13mm dynamic drivers deliver rich, balanced audio with deep bass. Supports AAC and SBC codecs for crystal-clear streaming.",
                              "Built to withstand intense workouts and unexpected rain. Ideal for running, gym, and outdoor activities.",
                              "Auto play/pause when you remove or wear the earbuds. Intuitive touch controls for music, calls, and voice assistant.",
                            ]
                            return (
                              <li key={i} className="flex gap-2">
                                <span className="font-semibold shrink-0">•</span>
                                <span><strong>{title}</strong> — {descs[i]}</span>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      {section.key === "description" && <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>}
                      {section.key === "searchTerms" && (
                        <div className="flex flex-wrap gap-1.5">
                          {["wireless earbuds", "noise cancelling earbuds", "bluetooth earphones", "sports earbuds", "premium audio", "long battery earbuds", "waterproof earbuds", "gift for him", "earbuds for running"].map((term) => (
                            <Badge key={term} variant="outline" className="text-[11px] font-normal">{term}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t("listing.noListing")}</p>
                  <p className="text-xs text-muted-foreground/60 max-w-[280px]">{t("listing.noListingDesc")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
