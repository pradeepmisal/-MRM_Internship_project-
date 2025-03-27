"use client"

import { UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserAccountNavProps {
  username: string
  department: string
  isAdmin?: boolean
}

export function UserAccountNav({ username, department, isAdmin = false }: UserAccountNavProps) {
  const router = useRouter()

  const onLogout = () => {
    // In a real app, perform logout actions
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase()
  }

  const departmentFormatted = department.charAt(0).toUpperCase() + department.slice(1).replace("_", " ")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-0 h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(username)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {isAdmin ? "Administrator" : `${departmentFormatted} Department`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(isAdmin ? "/admin/profile" : `/dashboard/${department}/profile`)}>
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(isAdmin ? "/admin/settings" : `/dashboard/${department}/settings`)}
        >
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

