"use client"

import { type ReactNode, useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"

export function Layout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </Header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  )
}

