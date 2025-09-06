"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Users } from "lucide-react"
import { useNotifications } from "../notifications/NotificationProvider"

interface LoginFormProps {
  onLogin: (userData: any) => void
  onSwitchToRegister: () => void
}

export default function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { showError, showSuccess } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (response.ok) {
        showSuccess("Login successful", "Welcome back!")
        onLogin(result.data)
      } else {
        showError("Login failed", result.error)
      }
    } catch (err) {
      showError("Login failed", "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-neutral-900 border-neutral-700 text-white">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold text-blue-400">SynergySphere</span>
        </div>
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription className="text-neutral-400">Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-neutral-400">Don't have an account? </span>
          <button onClick={onSwitchToRegister} className="text-blue-400 hover:text-blue-300 font-medium">
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
