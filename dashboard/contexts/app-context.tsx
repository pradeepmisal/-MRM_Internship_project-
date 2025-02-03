"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  name: string
  email: string
  avatar: string
  role: "admin" | "user"
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  currentPath: string
  setCurrentPath: (path: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children, initialPath = "/" }: { children: ReactNode; initialPath?: string }) {
  const [user, setUser] = useState<User | null>({
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2QjgX2qVtjfjkWaGgwr85h6EzOdzhN.png",
    role: "admin",
  })
  const [currentPath, setCurrentPath] = useState(initialPath)

  return <AppContext.Provider value={{ user, setUser, currentPath, setCurrentPath }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

