"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-8", className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  change: number
  changeLabel: string
  trend: "up" | "down" | "neutral"
  className?: string
}

export function StatCard({ label, value, change, changeLabel, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold text-foreground tracking-tight">{value}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium",
            trend === "up" && "bg-success-light text-success",
            trend === "down" && "bg-danger-light text-danger",
            trend === "neutral" && "bg-secondary text-muted-foreground"
          )}
        >
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {Math.abs(change)}%
        </span>
        <span className="text-xs text-muted-foreground">{changeLabel}</span>
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function SectionHeader({ title, description, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
