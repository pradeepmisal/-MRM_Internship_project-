import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Centralized Monthly Report Management System</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Department Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/admin-login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold tracking-tight">Welcome to the Report Management System</h2>
            <p className="mt-4 text-muted-foreground">
              Streamline monthly report creation, collaboration, and submission across all departments.
            </p>
          </div>
          <div className="w-full max-w-md mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button size="lg" className="w-full" asChild>
                <Link href="/auth/login">Department Login</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="/auth/admin-login">Admin Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Centralized Monthly Report Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

