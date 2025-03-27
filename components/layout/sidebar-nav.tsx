"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  ClipboardEditIcon,
  FileTextIcon,
  HomeIcon,
  SettingsIcon,
  BellIcon,
  UserIcon,
  UsersIcon,
  BarChart3Icon,
  LogOutIcon,
} from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  department: string
  isAdmin?: boolean
}

export function SidebarNav({ className, department, isAdmin = false, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  const adminItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: UsersIcon,
    },
    {
      title: "Departments",
      href: "/admin/departments",
      icon: UsersIcon,
    },
    {
      title: "Deadlines",
      href: "/admin/deadlines",
      icon: CalendarIcon,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: FileTextIcon,
    },
    {
      title: "Metrics",
      href: "/admin/metrics",
      icon: BarChart3Icon,
    },
    {
      title: "Notifications",
      href: "/admin/notifications",
      icon: BellIcon,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: SettingsIcon,
    },
  ]

  const userItems = [
    {
      title: "Dashboard",
      href: `/dashboard/${department}`,
      icon: HomeIcon,
    },
    {
      title: "View Reports",
      href: `/dashboard/${department}/reports/view`,
      icon: FileTextIcon,
    },
    {
      title: "Edit Reports",
      href: `/dashboard/${department}/reports/edit`,
      icon: ClipboardEditIcon,
    },
    {
      title: "Templates",
      href: `/dashboard/${department}/templates`,
      icon: ClipboardEditIcon,
    },
    {
      title: "Notifications",
      href: `/dashboard/${department}/notifications`,
      icon: BellIcon,
    },
    {
      title: "Profile",
      href: `/dashboard/${department}/profile`,
      icon: UserIcon,
    },
  ]

  const items = isAdmin ? adminItems : userItems

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}

      <div className="py-4"></div>
      <Link
        href="/auth/logout"
        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground text-red-500 hover:text-red-600"
      >
        <LogOutIcon className="mr-2 h-4 w-4" />
        <span>Logout</span>
      </Link>
    </nav>
  )
}

