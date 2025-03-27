import type React from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { SidebarNav } from "@/components/layout/sidebar-nav"

interface DepartmentLayoutProps {
  children: React.ReactNode
  params: {
    department: string
  }
}

const validDepartments = [
  "production",
  "quality",
  "store",
  "purchase",
  "machine_maintenance",
  "tool_maintenance",
  "safety",
  "admin",
]

export default function DepartmentLayout({ children, params }: DepartmentLayoutProps) {
  const { department } = params

  // Validate department
  if (!validDepartments.includes(department)) {
    notFound()
  }

  // Mock user data - in a real app, this would come from authentication
  const username = "John Doe"

  return (
    <div className="flex min-h-screen flex-col">
      <Header username={username} department={department} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 md:py-8">
            <SidebarNav department={department} />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

