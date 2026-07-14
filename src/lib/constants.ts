import {
  LayoutDashboard,
  FileText,
  MessageSquareText,
  Swords,
  Search,
  BarChart3,
  Settings,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"
import { RouteKey } from "./types"

export interface NavItem {
  key: RouteKey | "settings" | "help"
  label: string
  icon: LucideIcon
  href: string
}

export const mainNavItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { key: "listing", label: "AI Listing", icon: FileText, href: "/listing" },
  { key: "reviews", label: "Review Insights", icon: MessageSquareText, href: "/reviews" },
  { key: "competitors", label: "Competitor Analysis", icon: Swords, href: "/competitors" },
  { key: "keywords", label: "Keyword Research", icon: Search, href: "/keywords" },
  { key: "reports", label: "AI Reports", icon: BarChart3, href: "/reports" },
]

export const bottomNavItems: NavItem[] = [
  { key: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { key: "help", label: "Help & Support", icon: HelpCircle, href: "/help" },
]

export const storeName = "Ecom Assistant"
export const userName = "Alex Chen"
export const userRole = "Amazon Operations"
export const storeMarketplace = "Amazon.com"
