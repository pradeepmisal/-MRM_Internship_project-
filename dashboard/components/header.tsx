"use client"

import { Bell, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useApp } from "@/contexts/app-context"
import type React from "react" // Import React

export function Header({ children }: { children?: React.ReactNode }) {
  const { user } = useApp()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center">
        {children}
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 ml-2">Overview</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block w-72">
          <Input type="search" placeholder="Search for something" className="w-full" />
        </div>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

