import Link from "next/link"
import { BellIcon, MenuIcon } from "lucide-react"
import { UserAccountNav } from "@/components/layout/user-account-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SidebarNav } from "@/components/layout/sidebar-nav"

interface HeaderProps {
  username: string
  department: string
  isAdmin?: boolean
}

export function Header({ username, department, isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-56 pt-12">
              <SidebarNav department={department} isAdmin={isAdmin} />
            </SheetContent>
          </Sheet>
          <Link href={isAdmin ? "/admin/dashboard" : `/dashboard/${department}`} className="text-xl font-bold">
            {isAdmin
              ? "Admin Dashboard"
              : `${department.charAt(0).toUpperCase() + department.slice(1).replace("_", " ")} Dashboard`}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <UserAccountNav username={username} department={department} isAdmin={isAdmin} />
        </div>
      </div>
    </header>
  )
}

