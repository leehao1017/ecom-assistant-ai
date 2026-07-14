"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import { AskAIPanel } from "@/components/ask-ai/AskAIPanel"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [askAI, setAskAI] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden pl-[240px]">
        <Navbar onAskAI={() => setAskAI(true)} />
        <main className="flex-1 overflow-y-auto px-7 py-6">
          {children}
        </main>
      </div>
      <AskAIPanel open={askAI} onClose={() => setAskAI(false)} />
    </div>
  )
}
