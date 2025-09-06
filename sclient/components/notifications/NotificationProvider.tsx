"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import ToastNotification from "./ToastNotification"

interface Notification {
  id: string
  type: "success" | "info" | "warning" | "error"
  title: string
  message: string
  duration?: number
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, "id">) => void
  showSuccess: (title: string, message: string) => void
  showError: (title: string, message: string) => void
  showInfo: (title: string, message: string) => void
  showWarning: (title: string, message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
}

export default function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    setNotifications((prev) => [...prev, newNotification])
  }, [])

  const showSuccess = useCallback(
    (title: string, message: string) => {
      showNotification({ type: "success", title, message })
    },
    [showNotification],
  )

  const showError = useCallback(
    (title: string, message: string) => {
      showNotification({ type: "error", title, message })
    },
    [showNotification],
  )

  const showInfo = useCallback(
    (title: string, message: string) => {
      showNotification({ type: "info", title, message })
    },
    [showNotification],
  )

  const showWarning = useCallback(
    (title: string, message: string) => {
      showNotification({ type: "warning", title, message })
    },
    [showNotification],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const contextValue: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2 pointer-events-none">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <ToastNotification {...notification} onClose={removeNotification} />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
