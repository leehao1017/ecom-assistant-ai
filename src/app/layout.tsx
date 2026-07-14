import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LocaleProvider } from "@/i18n/LocaleProvider"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ecom Assistant AI — Smart Operations for Amazon Sellers",
  description:
    "AI-powered operations platform for Amazon sellers. Listing optimization, review analysis, competitor research, keyword discovery, and automated reporting in one place.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full bg-background text-foreground">
        <LocaleProvider>
          <TooltipProvider delay={200}>
            {children}
          </TooltipProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
