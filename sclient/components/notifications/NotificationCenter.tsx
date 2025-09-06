"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CheckSquare, MessageSquare, UserPlus, Calendar, AlertCircle, Check, Trash2, X } from "lucide-react"

interface NotificationCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockNotifications = [
  {
    id: 1,
    type: "task_assigned",
    title: "New task assigned",
    message: "You have been assigned to 'Design Homepage Layout'",
    user: { name: "Jane Smith", avatar: "JS" },
    timestamp: "2025-01-10T16:30:00Z",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "comment_added",
    title: "New comment",
    message: "Mike Johnson commented on 'Database Migration'",
    user: { name: "Mike Johnson", avatar: "MJ" },
    timestamp: "2025-01-10T15:45:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "deadline_approaching",
    title: "Deadline approaching",
    message: "'API Integration' is due in 2 days",
    timestamp: "2025-01-10T14:20:00Z",
    read: true,
    priority: "high",
  },
  {
    id: 4,
    type: "project_update",
    title: "Project updated",
    message: "Website Redesign project details have been updated",
    user: { name: "John Doe", avatar: "JD" },
    timestamp: "2025-01-10T13:15:00Z",
    read: true,
    priority: "low",
  },
  {
    id: 5,
    type: "member_added",
    title: "New team member",
    message: "Sarah Wilson joined the E-commerce Platform project",
    user: { name: "Sarah Wilson", avatar: "SW" },
    timestamp: "2025-01-10T12:00:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: 6,
    type: "task_completed",
    title: "Task completed",
    message: "Database Migration has been completed",
    user: { name: "Mike Johnson", avatar: "MJ" },
    timestamp: "2025-01-10T11:30:00Z",
    read: true,
    priority: "low",
  },
]

export default function NotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState("all")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task_assigned":
        return <CheckSquare className="w-4 h-4 text-blue-400" />
      case "task_completed":
        return <CheckSquare className="w-4 h-4 text-green-400" />
      case "comment_added":
        return <MessageSquare className="w-4 h-4 text-purple-400" />
      case "member_added":
        return <UserPlus className="w-4 h-4 text-green-400" />
      case "deadline_approaching":
        return <Calendar className="w-4 h-4 text-yellow-400" />
      case "project_update":
        return <AlertCircle className="w-4 h-4 text-blue-400" />
      default:
        return <Bell className="w-4 h-4 text-neutral-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case "unread":
        return !notification.read
      case "high":
        return notification.priority === "high"
      default:
        return true
    }
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && <Badge className="bg-red-600 text-white text-xs">{unreadCount}</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleMarkAllAsRead}
                size="sm"
                variant="outline"
                className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
              >
                <Check className="w-4 h-4 mr-1" />
                Mark all read
              </Button>
              <Button
                onClick={handleClearAll}
                size="sm"
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Stay updated with your project activities and team collaboration
          </DialogDescription>
        </DialogHeader>

        <Tabs value={filter} onValueChange={setFilter} className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-800">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
          </TabsList>

          <div className="mt-4 overflow-hidden">
            <ScrollArea className="h-[50vh]">
              <div className="space-y-2 pr-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors hover:border-neutral-600 ${
                      notification.read
                        ? "bg-neutral-800 border-neutral-700"
                        : "bg-neutral-750 border-neutral-600 shadow-sm"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                              <Badge className={`${getPriorityColor(notification.priority)} text-white text-xs`}>
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-neutral-300">{notification.message}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                              {notification.user && (
                                <div className="flex items-center gap-1">
                                  <Avatar className="w-4 h-4">
                                    <AvatarImage src="/placeholder.svg" />
                                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                                      {notification.user.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{notification.user.name}</span>
                                </div>
                              )}
                              <span>{formatTime(notification.timestamp)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {!notification.read && (
                              <Button
                                onClick={() => handleMarkAsRead(notification.id)}
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 hover:bg-neutral-700"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              onClick={() => handleDeleteNotification(notification.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 hover:bg-neutral-700 text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredNotifications.length === 0 && (
                  <div className="text-center text-neutral-500 py-12">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No notifications</p>
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
