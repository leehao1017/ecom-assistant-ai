"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/shared/PageHeader"
import { reportsData } from "@/lib/mock-data"
import { FileText, Download, Calendar, TrendingUp, Star, DollarSign, ShoppingCart, Target, Sparkles, CheckCircle2, Lightbulb } from "lucide-react"
import { useLocale } from "@/i18n/LocaleProvider"
import type { ReportData } from "@/lib/types"

const typeKeys: Record<string, string> = { daily: "reports.daily", weekly: "reports.weekly", monthly: "reports.monthly" }

export default function ReportsPage() {
  const { t } = useLocale()
  const [activeReport, setActiveReport] = useState("daily")
  const currentReport: ReportData = reportsData.find((r) => r.type === activeReport) || reportsData[0]

  return (
    <div className="max-w-[1400px] mx-auto">
      <PageHeader title={t("reports.title")} description={t("reports.description")} />

      <Tabs value={activeReport} onValueChange={setActiveReport} className="mb-8">
        <TabsList className="bg-secondary p-1 rounded-lg h-10">
          {(["daily", "weekly", "monthly"] as const).map((key) => (
            <TabsTrigger key={key} value={key} className="text-xs data-[state=active]:bg-white rounded-md px-4">
              {t(typeKeys[key])}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="border-border shadow-none mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-primary text-primary-foreground text-[11px] capitalize">{t(typeKeys[currentReport.type])}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{currentReport.period}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">{t("reports.operationsReport")}</h2>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{currentReport.summary}</p>
            </div>
            <Button variant="outline" size="sm" className="h-9 text-xs shrink-0">
              <Download className="h-3.5 w-3.5 mr-1.5" />{t("common.download")}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: <DollarSign className="h-4 w-4 text-primary mx-auto mb-1" />, value: `$${currentReport.metrics.revenue.toLocaleString()}`, label: t("dashboard.revenue") },
              { icon: <ShoppingCart className="h-4 w-4 text-success mx-auto mb-1" />, value: currentReport.metrics.orders.toLocaleString(), label: t("dashboard.orders") },
              { icon: <Target className="h-4 w-4 text-warning mx-auto mb-1" />, value: `${currentReport.metrics.acos}%`, label: t("dashboard.acos") },
              { icon: <TrendingUp className="h-4 w-4 text-primary mx-auto mb-1" />, value: `${currentReport.metrics.roas}x`, label: t("dashboard.roas") },
              { icon: <Star className="h-4 w-4 text-amber-400 mx-auto mb-1" />, value: currentReport.metrics.reviewRating, label: t("dashboard.reviewRating") },
              { icon: <Sparkles className="h-4 w-4 text-violet-500 mx-auto mb-1" />, value: currentReport.metrics.topProduct, label: t("reports.topProduct") },
            ].map((item, i) => (
              <div key={i} className="rounded-lg bg-secondary/50 p-3 text-center">
                {item.icon}
                <p className="text-lg font-bold text-foreground">{item.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("reports.highlights")}</CardTitle>
            <CardDescription className="text-xs">{t("reports.highlightsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentReport.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("reports.recommendations")}</CardTitle>
            <CardDescription className="text-xs">{t("reports.recommendationsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentReport.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
                  <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
