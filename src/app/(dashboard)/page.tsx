"use client"

import { useEffect, useState } from "react"
import {
  ArrowUpRight, MoreHorizontal, TrendingUp, TrendingDown, Minus,
  Sparkles, AlertTriangle, ShoppingBag, Package,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { salesChartData, recentOrders, topProducts, campaignPerformance } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useLocale } from "@/i18n/LocaleProvider"
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts"

// ----- KPI definitions -----
const metricDefs: {
  key: string
  value: string
  yesterday: string
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
}[] = [
  { key: "totalRevenue", value: "$48,592", yesterday: "$43,168", change: 12.5, trend: "up", icon: <TrendingUp className="h-[15px] w-[15px]" /> },
  { key: "totalOrders",  value: "1,284",    yesterday: "1,187",   change: 8.2,  trend: "up", icon: <ShoppingBag className="h-[15px] w-[15px]" /> },
  { key: "acos",         value: "18.5%",    yesterday: "20.6%",  change: -2.1, trend: "down", icon: <AlertTriangle className="h-[15px] w-[15px]" /> },
  { key: "roas",         value: "5.4x",     yesterday: "4.7x",   change: 15.3, trend: "up", icon: <Sparkles className="h-[15px] w-[15px]" /> },
  { key: "ctr",          value: "0.42%",    yesterday: "0.37%",  change: 0.05, trend: "up", icon: <TrendingUp className="h-[15px] w-[15px]" /> },
  { key: "cvr",          value: "12.8%",    yesterday: "13.1%",  change: -0.3, trend: "down", icon: <TrendingDown className="h-[15px] w-[15px]" /> },
  { key: "reviewRating", value: "4.7",      yesterday: "4.6",    change: 0.1,  trend: "up", icon: <Sparkles className="h-[15px] w-[15px]" /> },
  { key: "inventory",    value: "3,420",    yesterday: "3,608",  change: -5.2, trend: "down", icon: <Package className="h-[15px] w-[15px]" /> },
]

const trendIcon = (t: string) =>
  t === "up" ? <TrendingUp className="h-3 w-3 text-emerald-500" /> :
  t === "down" ? <TrendingDown className="h-3 w-3 text-red-500" /> :
  <Minus className="h-3 w-3 text-muted-foreground" />

// ----- Status / colour helpers -----
const statusKeys: Record<string, string> = {
  delivered: "dashboard.statusDelivered",
  pending: "dashboard.statusPending",
  cancelled: "dashboard.statusCancelled",
}
const statusColors: Record<string, string> = {
  delivered: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  cancelled: "bg-red-50 text-red-600",
}

// ----- AI Insight Card -----
interface Insight {
  icon: string
  color: "amber" | "red" | "blue" | "emerald"
  titleKey: string
  descKey: string
  actionKey: string
}
const insights: Insight[] = [
  { icon: "🔥", color: "amber",   titleKey: "aiInsights.acos.title",   descKey: "aiInsights.acos.desc",   actionKey: "aiInsights.acos.action" },
  { icon: "⭐", color: "blue",     titleKey: "aiInsights.ctr.title",    descKey: "aiInsights.ctr.desc",    actionKey: "aiInsights.ctr.action" },
  { icon: "📦", color: "emerald", titleKey: "aiInsights.stock.title",  descKey: "aiInsights.stock.desc",  actionKey: "aiInsights.stock.action" },
  { icon: "💬", color: "red",     titleKey: "aiInsights.reviews.title",descKey: "aiInsights.reviews.desc",actionKey: "aiInsights.reviews.action" },
]
const insightColors: Record<string, string> = {
  emerald: "border-l-emerald-400 bg-emerald-50/50",
  amber: "border-l-amber-400 bg-amber-50/50",
  blue: "border-l-blue-500 bg-blue-50/50",
  red: "border-l-red-400 bg-red-50/50",
}

function InsightCard({ icon, color, titleKey, descKey, actionKey, t }: Insight & { t: (k: string) => string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-white p-4 border-l-[3px]", insightColors[color])}>
      <div className="flex gap-3">
        <span className="text-lg shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-semibold text-foreground mb-1">{t(titleKey)}</h4>
          <p className="text-[12px] text-muted-foreground leading-relaxed mb-2.5">{t(descKey)}</p>
          <span className="text-[12px] font-medium text-primary hover:underline cursor-pointer">
            {t(actionKey)} →
          </span>
        </div>
      </div>
    </div>
  )
}

// ======================= PAGE =========================
export default function DashboardPage() {
  const { t } = useLocale()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-foreground">{t("dashboard.title")}</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            {t("dashboard.description")}
            <span className="ml-2 text-[11px] text-muted-foreground/60">{t("dashboard.updatedAt")}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 text-[12px] rounded-lg font-normal">
            {t("dashboard.dateRange")}
          </Button>
          <Button size="sm" className="h-9 text-[12px] rounded-lg">
            {t("common.exportReport")}
          </Button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metricDefs.map((m) => (
          <div
            key={m.key}
            className="rounded-xl border border-border bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-widest">
                {t(`dashboard.${m.key}`)}
              </p>
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg",
                  m.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                )}
              >
                {m.icon}
              </span>
            </div>
            <span className="text-[26px] font-bold text-foreground tracking-tight">{m.value}</span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={cn("text-[11px] font-semibold", m.change > 0 ? "text-emerald-600" : "text-red-500")}>
                {m.change > 0 && "+"}{m.change}{m.key === "ctr" || m.key === "cvr" ? "pp" : m.key === "reviewRating" ? "" : "%"}
              </span>
              <span className="text-[10px] text-muted-foreground">{t("dashboard.vsLastMonth")}</span>
              <span className="text-[10px] text-muted-foreground/60 ml-auto">{t("dashboard.yesterday")} {m.yesterday}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── AI Insights (prominent section) ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-foreground">{t("aiInsights.title")}</h3>
            <p className="text-[12px] text-muted-foreground">{t("aiInsights.subtitle")}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {insights.map((ins) => (
            <InsightCard key={ins.icon} {...ins} t={t} />
          ))}
        </div>
      </div>

      {/* ── Chart + Recent Orders ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-none rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <div>
              <CardTitle className="text-[15px] font-semibold">{t("dashboard.revenueTrend")}</CardTitle>
              <CardDescription className="text-[12px]">{t("dashboard.revenueTrendDesc")}</CardDescription>
            </div>
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
              {["7D", "14D", "30D"].map((d) => (
                <button
                  key={d}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors",
                    d === "14D" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={salesChartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.08} /><stop offset="95%" stopColor="#2563eb" stopOpacity={0} /></linearGradient>
                    <linearGradient id="oG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.06} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickMargin={8} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} width={50} />
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #e5e7eb", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", fontSize: "12px", padding: "8px 12px" }} />
                  <Legend iconType="line" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                  <Area type="monotone" dataKey="revenue" name={t("dashboard.revenue")} stroke="#2563eb" strokeWidth={2} fill="url(#rG)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#2563eb" }} />
                  <Area type="monotone" dataKey="orders" name={t("dashboard.orders")} stroke="#10b981" strokeWidth={2} fill="url(#oG)" dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#10b981" }} />
                  <Area type="monotone" dataKey="adSpend" name={t("dashboard.adSpend")} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 3" fill="none" dot={false} activeDot={{ r: 3, strokeWidth: 2, stroke: "#fff", fill: "#94a3b8" }} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border shadow-none rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <div>
              <CardTitle className="text-[15px] font-semibold">{t("dashboard.recentOrders")}</CardTitle>
              <CardDescription className="text-[12px]">{t("dashboard.recentOrdersDesc")}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MoreHorizontal className="h-[18px] w-[18px]" strokeWidth={1.5} /></Button>
          </CardHeader>
          <CardContent className="px-0">
            <div className="divide-y divide-border">
              {recentOrders.map((o, i) => (
                <div key={o.id} className={cn("flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/30", i === 0 && "pt-0")}>
                  <div className="flex-1 min-w-0 mr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-muted-foreground">{o.id}</span>
                      <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 font-medium border-0", statusColors[o.status])}>{t(statusKeys[o.status])}</Badge>
                    </div>
                    <p className="text-[13px] font-medium text-foreground truncate mt-0.5">{o.product}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-semibold text-foreground">${o.price.toFixed(2)}</p>
                    <p className="text-[11px] text-muted-foreground">{o.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pt-2">
              <Button variant="ghost" size="sm" className="w-full text-[12px] text-muted-foreground hover:text-foreground rounded-lg">
                {t("common.viewAllOrders")} <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Top Products + Campaigns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border shadow-none rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <div><CardTitle className="text-[15px] font-semibold">{t("dashboard.topProducts")}</CardTitle><CardDescription className="text-[12px]">{t("dashboard.topProductsDesc")}</CardDescription></div>
            <Button variant="ghost" size="sm" className="text-[12px] text-muted-foreground rounded-lg">{t("common.viewAll")}</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium text-muted-foreground h-9">{t("dashboard.product")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.sales")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.revenueCol")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.growth")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.stock")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((p) => (
                  <TableRow key={p.asin} className="hover:bg-muted/30">
                    <TableCell><div className="flex flex-col"><span className="text-[13px] font-medium">{p.name}</span><span className="text-[11px] text-muted-foreground font-mono">{p.asin}</span></div></TableCell>
                    <TableCell className="text-right text-[13px]">{p.sales}</TableCell>
                    <TableCell className="text-right text-[13px] font-medium">${p.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right"><span className={cn("text-[12px] font-medium", p.growth >= 0 ? "text-emerald-600" : "text-red-500")}>{p.growth >= 0 ? "+" : ""}{p.growth}%</span></TableCell>
                    <TableCell className="text-right"><span className={cn("text-[13px]", p.stock < 100 ? "text-red-500 font-medium" : "text-foreground")}>{p.stock}</span></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border shadow-none rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <div><CardTitle className="text-[15px] font-semibold">{t("dashboard.adCampaigns")}</CardTitle><CardDescription className="text-[12px]">{t("dashboard.adCampaignsDesc")}</CardDescription></div>
            <Button variant="ghost" size="sm" className="text-[12px] text-muted-foreground rounded-lg">{t("dashboard.adManager")}</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium text-muted-foreground h-9">{t("dashboard.campaign")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.spend")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.sales")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.acos")}</TableHead>
                  <TableHead className="text-[11px] font-medium text-muted-foreground text-right h-9">{t("dashboard.roas")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignPerformance.map((c) => (
                  <TableRow key={c.name} className="hover:bg-muted/30">
                    <TableCell className="text-[13px] font-medium max-w-[180px] truncate">{c.name}</TableCell>
                    <TableCell className="text-right text-[13px]">${c.spend.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-[13px]">${c.sales.toLocaleString()}</TableCell>
                    <TableCell className="text-right"><span className={cn("text-[11px] font-semibold px-1.5 py-0.5 rounded-md", c.acos <= 20 ? "bg-emerald-50 text-emerald-600" : c.acos <= 25 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-500")}>{c.acos}%</span></TableCell>
                    <TableCell className="text-right text-[13px] font-medium">{c.roas}x</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
