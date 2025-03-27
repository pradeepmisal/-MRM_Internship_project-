import type React from "react"
import { Header } from "@/components/layout/header"
import { SidebarNav } from "@/components/layout/sidebar-nav"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Mock admin data - in a real app, this would come from authentication
  const username = "Admin User"
  const department = "admin"

  return (
    <div className="flex min-h-screen flex-col">
      <Header username={username} department={department} isAdmin={true} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 md:py-8">
            <SidebarNav department={department} isAdmin={true} />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

