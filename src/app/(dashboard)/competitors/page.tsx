"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader, SectionHeader } from "@/components/shared/PageHeader"
import { competitorData, competitorAnalysis } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Swords, TrendingDown, Star, Lightbulb, Shield, Zap, AlertTriangle, Plus } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { useLocale } from "@/i18n/LocaleProvider"

const swotColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  strengths: { bg: "bg-success-light", text: "text-success", icon: <Shield className="h-4 w-4" /> },
  weaknesses: { bg: "bg-danger-light", text: "text-danger", icon: <AlertTriangle className="h-4 w-4" /> },
  opportunities: { bg: "bg-blue-50", text: "text-primary", icon: <Zap className="h-4 w-4" /> },
  threats: { bg: "bg-warning-light", text: "text-warning", icon: <TrendingDown className="h-4 w-4" /> },
}

const radarData = [
  { subject: "Price", A: 85, B: 70, C: 90, D: 55, fullMark: 100 },
  { subject: "Rating", A: 94, B: 90, C: 84, D: 92, fullMark: 100 },
  { subject: "Reviews", A: 65, B: 80, C: 55, D: 95, fullMark: 100 },
  { subject: "Keywords", A: 82, B: 85, C: 62, D: 92, fullMark: 100 },
  { subject: "Features", A: 78, B: 75, C: 65, D: 90, fullMark: 100 },
  { subject: "Brand", A: 55, B: 85, C: 45, D: 92, fullMark: 100 },
]

export default function CompetitorsPage() {
  const { t } = useLocale()
  const [mounted, setMounted] = useState(false)
  useState(() => setMounted(true))

  return (
    <div className="max-w-[1400px] mx-auto">
      <PageHeader title={t("competitors.title")} description={t("competitors.description")}>
        <Button size="sm" className="h-9 text-xs"><Plus className="h-3.5 w-3.5 mr-1.5" />{t("competitors.addCompetitor")}</Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/30 shadow-none bg-accent/30">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-foreground">{t("competitors.yourProduct")}</h4>
              <Badge className="bg-primary text-primary-foreground text-[10px]">{t("competitors.you")}</Badge>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ["competitors.price", "$49.99"],
                ["competitors.rating", "4.7"],
                ["competitors.reviews", "1,856"],
                ["competitors.keywordCov", "82%"],
              ].map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{t(key)}</span>
                  <span className="font-semibold flex items-center gap-1">
                    {key === "competitors.rating" && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}{val}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {competitorData.map((comp) => (
          <Card key={comp.name} className="border-border shadow-none">
            <CardContent className="pt-5">
              <h4 className="text-sm font-semibold text-foreground mb-3">{comp.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{t("competitors.price")}</span><span className="font-semibold">${comp.price.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t("competitors.rating")}</span><span className="font-semibold flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{comp.rating}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t("competitors.reviews")}</span><span className="font-semibold">{comp.reviewCount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t("competitors.keywordCov")}</span><span className="font-semibold">{comp.keywordCoverage}%</span></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("competitors.priceComparison")}</CardTitle>
            <CardDescription className="text-xs">{t("competitors.priceComparisonDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={competitorAnalysis.priceComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip /><Bar dataKey="price" radius={[4, 4, 0, 0]} barSize={48} fill="#2563eb" label={{ position: "top", fontSize: 12, fill: "#64748b", fontWeight: 600 }} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("competitors.competitivePosition")}</CardTitle>
            <CardDescription className="text-xs">{t("competitors.competitivePositionDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <Radar name="Your Product" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="SoundPro X" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.08} strokeWidth={1.5} />
                  <Radar name="AudioMax Pro" dataKey="C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.08} strokeWidth={1.5} />
                  <Radar name="EliteBuds Ultra" dataKey="D" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.08} strokeWidth={1.5} />
                  <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={8} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <SectionHeader title={t("competitors.swotTitle")} description={t("competitors.swotDesc")} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(competitorAnalysis.swot).map(([key, items]) => {
          const style = swotColors[key]
          return (
            <Card key={key} className="border-border shadow-none">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", style.bg, style.text)}>{style.icon}</span>
                  <CardTitle className="text-sm font-semibold capitalize">{t(`competitors.${key}`)}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className={cn("mt-1 h-1 w-1 rounded-full shrink-0", key === "strengths" ? "bg-success" : key === "weaknesses" ? "bg-danger" : key === "opportunities" ? "bg-primary" : "bg-warning")} />{item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-semibold">{t("competitors.aiStrategy")}</CardTitle>
          <CardDescription className="text-xs">{t("competitors.aiStrategyDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitorAnalysis.suggestions.map((suggestion, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-4 bg-secondary/30">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Lightbulb className="h-3.5 w-3.5" /></div>
                <p className="text-sm text-muted-foreground leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
