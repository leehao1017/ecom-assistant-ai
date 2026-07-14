"use client"

import { useState, useEffect, useRef } from "react"
import { X, Sparkles, Send, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/i18n/LocaleProvider"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface AskAIPanelProps {
  open: boolean
  onClose: () => void
}

const prompts = [
  { key: "optimize", icon: "⚡", label: "帮我优化 Listing" },
  { key: "reviews", icon: "💬", label: "分析最近评论" },
  { key: "acos", icon: "📊", label: "为什么 ACOS 上升？" },
  { key: "report", icon: "📝", label: "生成本周运营报告" },
]

function getResponse(key: string): string {
  switch (key) {
    case "optimize":
      return "已扫描你的 Wireless Earbuds Pro Listing。发现 2 个可优化项：① 标题中缺少「noise cancelling」，该词搜索量 85,000/月、竞争度中等。② 第 3 个 Bullet Point 建议加上「40 hours battery life」以匹配高转化长尾词。SEO 评分预计可从 88 提升至 94。"
    case "reviews":
      return "分析了你最近 50 条评论。正向关键词：sound quality(32次)、comfort(28次)、battery(22次)。负向关键词：connectivity(14次)、packaging damage(9次)。建议优先解决蓝牙连接稳定性问题，并升级包装方案。"
    case "acos":
      return "你的 ACOS 从 18.5% 升到 24.6%，主要原因是「bluetooth earphones」这个广泛匹配关键词花费增加了 $340（CTR 高但 CVR 仅 4.2%）。建议：① 降低该词出价 20%；② 添加「wireless earbuds for running」等长尾精准词。预计可拉回 ACOS 至 19% 左右。"
    case "report":
      return "本周运营概览（7月8日-14日）：总收入 $48,592（+12.5%），订单 1,284 单（+8.2%），ACOS 18.5%（-2.1%），ROAS 5.4x（+15.3%）。最佳产品：Wireless Earbuds Pro（$17,066）。本周新增 12 条评论（均分 4.5）。建议下周关注：便携充电器库存不足（95 件），预计 7 天后售罄。"
    default:
      return "我是 Ecom Assistant AI，可以帮助你优化 Listing、分析评论、诊断广告表现、生成运营报告。请选择一个话题，或直接输入你的问题。"
  }
}

export function AskAIPanel({ open, onClose }: AskAIPanelProps) {
  const { t } = useLocale()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setMessages([])
      setInput("")
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const send = (text: string) => {
    if (!text.trim() || loading) return
    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    setLoading(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: getResponse(text) }])
      setLoading(false)
    }, 800)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/20"
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-[440px] border-l border-border bg-white shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                </div>
                <span className="text-[14px] font-semibold text-foreground">Ask AI</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={onClose}>
                <X className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 h-[calc(100%-7rem)]">
              {messages.length === 0 && (
                <div className="py-6">
                  <p className="text-[13px] text-muted-foreground mb-4">
                    你好 Alex，我是你的 AI 运营助手。试试问我：
                  </p>
                  <div className="grid gap-2">
                    {prompts.map((p) => (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => send(p.label)}
                        className="flex items-center gap-3 rounded-lg border border-border px-3.5 py-2.5 text-left text-[13px] text-foreground hover:bg-secondary transition-colors group"
                      >
                        <span className="text-base">{p.icon}</span>
                        <span className="flex-1">{p.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" strokeWidth={2} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-[13px] text-muted-foreground px-1">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  AI 正在思考…
                </div>
              )}
            </div>

            {/* input */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-white px-5 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  placeholder="输入你的问题…"
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-[13px] outline-none focus:bg-white focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-colors placeholder:text-muted-foreground/50"
                />
                <Button
                  size="icon"
                  className="h-9 w-9 rounded-xl shrink-0"
                  disabled={!input.trim() || loading}
                  onClick={() => send(input)}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
