import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/contexts/app-context"
import type { ReactNode } from "react"
import "./globals.css" // Make sure this is present

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider initialPath="/">{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  )
}

