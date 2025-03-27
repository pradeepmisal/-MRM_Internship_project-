import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Centralized Monthly Report Management System</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
          <div className="mx-auto max-w-lg text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Department Login</h2>
            <p className="mt-4 text-muted-foreground">Sign in to access your department dashboard and manage reports</p>
          </div>
          <div className="w-full max-w-md">
            <LoginForm />
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Admin user?{" "}
                <Link href="/auth/admin-login" className="text-primary hover:underline">
                  Sign in as admin
                </Link>
              </p>
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

