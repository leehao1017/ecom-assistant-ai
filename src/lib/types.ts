export interface SalesData {
  date: string
  revenue: number
  orders: number
  unitsSold: number
  adSpend: number
}

export interface MetricCard {
  label: string
  value: string | number
  change: number
  changeLabel: string
  icon: string
  trend: "up" | "down" | "neutral"
}

export interface RecentOrder {
  id: string
  product: string
  asin: string
  price: number
  status: "delivered" | "pending" | "cancelled"
  date: string
  customer: string
}

export interface TopProduct {
  name: string
  asin: string
  sales: number
  revenue: number
  growth: number
  stock: number
}

export interface ReviewInsight {
  total: number
  averageRating: number
  positive: number
  negative: number
  neutral: number
  topKeywords: string[]
  painPoints: string[]
}

export interface CampaignPerformance {
  name: string
  spend: number
  sales: number
  acos: number
  roas: number
  impressions: number
  clicks: number
  ctr: number
}

export interface AIRecommendation {
  id: string
  type: "warning" | "opportunity" | "suggestion" | "alert"
  title: string
  description: string
  action: string
}

export interface ListingData {
  productName: string
  brand: string
  features: string[]
  targetMarket: string
  keywords: string[]
}

export interface ListingResult {
  title: string
  bulletPoints: string[]
  description: string
  searchTerms: string[]
  seoScore: number
  keywordCoverage: number
  listingScore: number
}

export interface ReviewItem {
  id: string
  rating: number
  title: string
  content: string
  author: string
  date: string
  verified: boolean
  helpful: number
}

export interface ReviewAnalysis {
  sentiment: {
    positive: number
    negative: number
    neutral: number
  }
  topKeywords: { word: string; count: number }[]
  topPhrases: { phrase: string; count: number; sentiment: "positive" | "negative" }[]
  painPoints: string[]
  mostMentionedFeatures: string[]
  improvementSuggestions: string[]
  summary: string
}

export interface CompetitorData {
  name: string
  price: number
  rating: number
  reviewCount: number
  sellingPoints: string[]
  keywordCoverage: number
  strengths: string[]
  weaknesses: string[]
}

export interface CompetitorAnalysis {
  competitors: CompetitorData[]
  priceComparison: { name: string; price: number }[]
  ratingComparison: { name: string; rating: number }[]
  keywordOverlap: { keyword: string; coverage: number }[]
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  suggestions: string[]
}

export interface KeywordData {
  keyword: string
  searchVolume: number
  competition: "Low" | "Medium" | "High"
  opportunityScore: number
  cpc: number
  trend: "up" | "down" | "stable"
}

export interface KeywordResearch {
  seedKeyword: string
  keywords: KeywordData[]
  longTailKeywords: string[]
  intentAnalysis: {
    informational: number
    navigational: number
    commercial: number
    transactional: number
  }
  seoSuggestions: string[]
}

export interface ReportData {
  type: "daily" | "weekly" | "monthly"
  generatedAt: string
  period: string
  summary: string
  metrics: {
    revenue: number
    orders: number
    acos: number
    roas: number
    reviewRating: number
    topProduct: string
  }
  highlights: string[]
  recommendations: string[]
}

export type RouteKey = "dashboard" | "listing" | "reviews" | "competitors" | "keywords" | "reports"
