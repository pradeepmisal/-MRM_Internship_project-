"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { LockIcon, ShieldIcon } from "lucide-react"

const adminLoginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function AdminLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof adminLoginFormSchema>>({
    resolver: zodResolver(adminLoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof adminLoginFormSchema>) {
    try {
      setIsLoading(true)

      // Simulate API call here (in real app, this would be a fetch to your backend)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for admin credentials
      if (values.username === "admin" && values.password === "admin123") {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        })
        router.push("/admin/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Admin login failed",
          description: "Invalid admin credentials. Please try again.",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
          <div className="w-full max-w-md">
            <Card className="w-full">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                <CardDescription className="text-center">
                  Enter your admin credentials to access the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter admin username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter admin password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        "Signing in..."
                      ) : (
                        <>
                          <LockIcon className="mr-2 h-4 w-4" /> Sign in as Admin
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-muted-foreground text-center">
                  Demo admin credentials: username: admin, password: admin123
                </div>
                <div className="text-sm text-center">
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Department Login
                  </Link>
                </div>
              </CardFooter>
            </Card>
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

