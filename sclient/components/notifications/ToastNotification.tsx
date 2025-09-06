"use client"

import { useEffect, useState } from "react"
import { X, CheckSquare, MessageSquare, AlertCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToastNotificationProps {
  id: string
  type: "success" | "info" | "warning" | "error"
  title: string
  message: string
  duration?: number
  onClose: (id: string) => void
}

export default function ToastNotification({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100)

    // Auto dismiss
    const dismissTimer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => {
      clearTimeout(timer)
      clearTimeout(dismissTimer)
    }
  }, [duration])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300) // Wait for animation
  }

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-600",
          border: "border-green-500",
          icon: <CheckSquare className="w-4 h-4" />,
        }
      case "info":
        return {
          bg: "bg-blue-600",
          border: "border-blue-500",
          icon: <MessageSquare className="w-4 h-4" />,
        }
      case "warning":
        return {
          bg: "bg-yellow-600",
          border: "border-yellow-500",
          icon: <Calendar className="w-4 h-4" />,
        }
      case "error":
        return {
          bg: "bg-red-600",
          border: "border-red-500",
          icon: <AlertCircle className="w-4 h-4" />,
        }
      default:
        return {
          bg: "bg-neutral-600",
          border: "border-neutral-500",
          icon: <MessageSquare className="w-4 h-4" />,
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 w-80 p-4 rounded-lg shadow-lg border text-white
        transform transition-all duration-300 ease-in-out
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${styles.bg} ${styles.border}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium mb-1">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <Button onClick={handleClose} size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/20 text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
