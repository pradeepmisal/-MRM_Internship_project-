"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const loginFormSchema = z.object({
  department: z.string({
    required_error: "Please select a department",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      department: "",
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setIsLoading(true)

      // Simulate API call here (in real app, this would be a fetch to your backend)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for admin login to redirect to admin dashboard
      if (values.username === "admin" && values.password === "admin123") {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        })
        router.push("/admin/dashboard")
        return
      }

      // In a real application, you would validate credentials against your backend
      if (values.username === "demo" && values.password === "demo123") {
        // Get the department value for the redirection
        router.push(`/dashboard/${values.department.toLowerCase()}`)

        toast({
          title: "Login successful",
          description: `Welcome to the ${values.department} department!`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password. Please try again.",
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Department Sign-In</CardTitle>
        <CardDescription>Enter your credentials to access your department dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="quality">Quality</SelectItem>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="machine_maintenance">Machine Maintenance</SelectItem>
                      <SelectItem value="tool_maintenance">Tool Maintenance</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">Demo credentials: username: demo, password: demo123</div>
      </CardFooter>
    </Card>
  )
}

