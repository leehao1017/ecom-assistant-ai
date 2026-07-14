"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/PageHeader"
import { mockReviews, reviewAnalysis } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Star, ThumbsUp, CheckCircle2, AlertCircle, Upload } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useLocale } from "@/i18n/LocaleProvider"

const sentimentData = [
  { name: "Positive", value: reviewAnalysis.sentiment.positive, color: "#10b981", key: "reviews.positive" },
  { name: "Negative", value: reviewAnalysis.sentiment.negative, color: "#ef4444", key: "reviews.negative" },
  { name: "Neutral", value: reviewAnalysis.sentiment.neutral, color: "#94a3b8", key: "reviews.neutral" },
]

export default function ReviewsPage() {
  const { t } = useLocale()
  const [mounted, setMounted] = useState(false)
  useState(() => setMounted(true))

  return (
    <div className="max-w-[1400px] mx-auto">
      <PageHeader title={t("reviews.title")} description={t("reviews.description")}>
        <Button variant="outline" size="sm" className="h-9 text-xs">
          <Upload className="h-3.5 w-3.5 mr-1.5" />{t("reviews.uploadReviews")}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "reviews.totalReviews", value: reviewAnalysis.topKeywords.reduce((a, b) => a + b.count, 0) },
          { label: "reviews.avgRating", value: "4.2", star: true },
          { label: "reviews.positive", value: `${sentimentData[0].value}%`, color: "text-success" },
          { label: "reviews.negative", value: `${sentimentData[1].value}%`, color: "text-danger" },
          { label: "reviews.needsAttention", value: reviewAnalysis.painPoints.length, color: "text-warning" },
        ].map((item) => (
          <Card key={item.label} className="border-border shadow-none">
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{t(item.label)}</p>
              <div className="flex items-center gap-1.5">
                {"star" in item && <Star className="h-5 w-5 fill-amber-400 text-amber-400" />}
                <span className={`text-2xl font-bold ${item.color || "text-foreground"}`}>{item.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("reviews.sentimentDistribution")}</CardTitle>
            <CardDescription className="text-xs">{t("reviews.sentimentDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value">
                    {sentimentData.map((entry, i) => (<Cell key={`cell-${i}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="flex items-center justify-center gap-6 mt-2">
              {sentimentData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-muted-foreground">{t(entry.key)} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("reviews.topKeywords")}</CardTitle>
            <CardDescription className="text-xs">{t("reviews.topKeywordsDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={reviewAnalysis.topKeywords.slice(0, 7)} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="word" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} width={110} />
                  <Bar dataKey="count" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{t("reviews.aiSummary")}</CardTitle>
            <CardDescription className="text-xs">{t("reviews.aiSummaryDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{reviewAnalysis.summary}</p>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">{t("reviews.painPoints")}</p>
              <ul className="space-y-1.5">
                {reviewAnalysis.painPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="h-3 w-3 text-danger mt-0.5 shrink-0" />{point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">{t("reviews.improvementSuggestions")}</p>
              <ul className="space-y-1.5">
                {reviewAnalysis.improvementSuggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-success mt-0.5 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">{t("reviews.individualReviews")}</CardTitle>
            <CardDescription className="text-xs">{t("reviews.individualReviewsDesc")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {mockReviews.map((review) => (
              <div key={review.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={cn("h-3.5 w-3.5", i < review.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200")} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{review.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {review.verified && <Badge variant="secondary" className="text-[10px] bg-success-light text-success">{t("reviews.verified")}</Badge>}
                    <span>{review.date}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{review.content}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{review.author}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {review.helpful} {t("reviews.foundHelpful")}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
