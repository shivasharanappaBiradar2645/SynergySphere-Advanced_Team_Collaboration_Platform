"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/LoginForm"
import RegisterForm from "@/components/auth/RegisterForm"
import Dashboard from "@/components/Dashboard"
import NotificationProvider from "@/components/notifications/NotificationProvider"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  if (isAuthenticated) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {showRegister ? (
            <RegisterForm onLogin={handleLogin} onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    </NotificationProvider>
  )
}
