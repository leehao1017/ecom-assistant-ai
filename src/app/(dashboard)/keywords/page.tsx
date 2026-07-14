"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/shared/PageHeader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { keywordResearch } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Search, TrendingUp, TrendingDown, Minus, Sparkles, Lightbulb } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { useLocale } from "@/i18n/LocaleProvider"

const competitionColors: Record<string, string> = { Low: "bg-success-light text-success", Medium: "bg-warning-light text-warning", High: "bg-danger-light text-danger" }
const trendIcons: Record<string, React.ReactNode> = { up: <TrendingUp className="h-3 w-3 text-success" />, down: <TrendingDown className="h-3 w-3 text-danger" />, stable: <Minus className="h-3 w-3 text-muted-foreground" /> }
const intentKeys = ["keywords.informational", "keywords.navigational", "keywords.commercial", "keywords.transactional"]
const intentColors = ["#2563eb", "#8b5cf6", "#f59e0b", "#10b981"]
const intentValues = [keywordResearch.intentAnalysis.informational, keywordResearch.intentAnalysis.navigational, keywordResearch.intentAnalysis.commercial, keywordResearch.intentAnalysis.transactional]

export default function KeywordsPage() {
  const { t } = useLocale()
  const [mounted, setMounted] = useState(false)
  useState(() => setMounted(true))

  const intentData = intentKeys.map((key, i) => ({ name: key, value: intentValues[i], color: intentColors[i] }))

  return (
    <div className="max-w-[1400px] mx-auto">
      <PageHeader title={t("keywords.title")} description={t("keywords.description")} />

      <Card className="border-border shadow-none mb-8">
        <CardContent className="pt-5">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t("keywords.searchPlaceholder")} className="pl-9 h-10 text-sm" defaultValue="wireless earbuds" />
            </div>
            <Button className="h-10"><Sparkles className="h-4 w-4 mr-2" />{t("keywords.analyze")}</Button>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-muted-foreground">{t("keywords.suggested")}:</span>
            {["bluetooth earphones", "noise cancelling", "sports earbuds", "gaming headset"].map((kw) => (
              <Badge key={kw} variant="secondary" className="text-[11px] font-normal cursor-pointer hover:bg-secondary/80">{kw}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="lg:col-span-3 border-border shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">{t("keywords.results", { keyword: keywordResearch.seedKeyword })}</CardTitle>
              <CardDescription className="text-xs">{t("keywords.resultsDesc", { count: keywordResearch.keywords.length })}</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">{t("common.exportCsv")}</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">{t("keywords.keyword")}</TableHead>
                  <TableHead className="text-xs text-right">{t("keywords.searchVolume")}</TableHead>
                  <TableHead className="text-xs text-right">{t("keywords.cpc")}</TableHead>
                  <TableHead className="text-xs text-right">{t("keywords.competition")}</TableHead>
                  <TableHead className="text-xs text-right">{t("keywords.oppScore")}</TableHead>
                  <TableHead className="text-xs text-right">{t("keywords.trend")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordResearch.keywords.map((kw) => (
                  <TableRow key={kw.keyword} className="hover:bg-secondary/50">
                    <TableCell className="text-sm font-medium">{kw.keyword}</TableCell>
                    <TableCell className="text-right text-sm">{kw.searchVolume.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">${kw.cpc.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className={cn("text-[10px] font-medium", competitionColors[kw.competition])}>
                        {t(`keywords.competition${kw.competition}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={cn("text-sm font-semibold", kw.opportunityScore >= 80 ? "text-success" : kw.opportunityScore >= 60 ? "text-primary" : "text-muted-foreground")}>{kw.opportunityScore}</span>
                    </TableCell>
                    <TableCell className="text-right"><div className="flex justify-end">{trendIcons[kw.trend]}</div></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("keywords.searchIntent")}</CardTitle>
            <CardDescription className="text-xs">{t("keywords.searchIntentDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={intentData} cx="50%" cy="50%" innerRadius={48} outerRadius={80} paddingAngle={3} dataKey="value">
                    {intentData.map((entry, i) => (<Cell key={`cell-${i}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="space-y-2 mt-2">
              {intentData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-muted-foreground">{t(entry.name)}</span>
                  </div>
                  <span className="font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("keywords.longTailTitle")}</CardTitle>
            <CardDescription className="text-xs">{t("keywords.longTailDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {keywordResearch.longTailKeywords.map((kw, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-light text-success text-xs font-bold">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{kw}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Search className="h-3 w-3" /> {(Math.random() * 5000 + 1000).toFixed(0)}/mo</span>
                      <Badge variant="secondary" className="text-[10px] bg-success-light text-success">{t("keywords.lowCompetition")}</Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("keywords.seoTitle")}</CardTitle>
            <CardDescription className="text-xs">{t("keywords.seoDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {keywordResearch.seoSuggestions.map((suggestion, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Lightbulb className="h-3.5 w-3.5" /></div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{suggestion}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
