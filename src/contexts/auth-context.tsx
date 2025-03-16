"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { API_CONFIG } from "@/config/api"

interface AuthContextType {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  signIn: (accessToken: string, refreshToken: string) => void
  signOut: () => void
  isLoading: boolean
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = React.useState<string | null>(null)
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken")
    const storedRefreshToken = localStorage.getItem("refreshToken")
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken)
      setRefreshToken(storedRefreshToken)
    }
    setIsLoading(false)
  }, [])

  const signIn = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken)
    setRefreshToken(newRefreshToken)
    localStorage.setItem("accessToken", newAccessToken)
    localStorage.setItem("refreshToken", newRefreshToken)
  }

  const signOut = () => {
    setAccessToken(null)
    setRefreshToken(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    router.push("/")
  }

  const value = {
    isAuthenticated: !!accessToken,
    accessToken,
    refreshToken,
    signIn,
    signOut,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 