"use client"

import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"
import { Home, Building2, FileText, UserCog, ClipboardCheck, Settings, LogOut, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Department Data Submission", href: "/department", icon: Building2 },
  { name: "Upload Excel Sheet", href: "/upload", icon: Upload },
  { name: "Meeting Summary", href: "#", icon: FileText },
  { name: "User Management", href: "#", icon: UserCog },
  { name: "Follow Up", href: "#", icon: ClipboardCheck },
  { name: "Settings", href: "#", icon: Settings },
]

export function Sidebar() {
  const { currentPath, setCurrentPath } = useApp()
  const router = useRouter()

  const handleNavigation = (item: (typeof navigation)[0]) => {
    if (item.href === "/department" || item.href === "/" || item.href === "/upload") {
      setCurrentPath(item.href)
      router.push(item.href)
    } else {
      toast({
        title: "Work in Progress",
        description: "This feature is currently under development.",
        duration: 3000,
      })
    }
  }

  return (
    <div className="flex h-full w-64 flex-col bg-white">
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">Logo</div>
        <span className="font-semibold">Company Name</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={cn(
                "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium",
                currentPath === item.href ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50",
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-5 w-5",
                  currentPath === item.href ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500",
                )}
              />
              {item.name}
            </button>
          )
        })}
      </nav>
      <div className="border-t p-2">
        <button
          className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          onClick={() =>
            toast({
              title: "Work in Progress",
              description: "Logout functionality is currently under development.",
              duration: 3000,
            })
          }
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400" />
          Log Out
        </button>
      </div>
    </div>
  )
}

