"use client"

import { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell,
  CheckSquare,
  MessageSquare,
  UserPlus,
  Calendar,
  AlertCircle,
  Settings,
  Check,
  Trash2,
} from "lucide-react"
import NotificationSettings from "./NotificationSettings"

export default function NotificationsView() {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState("all")
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const eventSource = new EventSource("/api/notifications/stream")

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data)
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          ...newNotification,
          id: Date.now(), // Add a unique id
          read: false,
          priority: "medium",
          type: "info",
          title: "New Notification",
        },
      ])
    }

    return () => {
      eventSource.close()
    }
  }, [])

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

  return (
    <div className="grid grid-cols-1 grid-rows-[10%_90%] py-3 px-3.5">
      {/* Top Section */}
      <div className="grid grid-cols-1 grid-rows-2">
        {/* Breadcrumbs */}
        <div className="text-white">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Notifications</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Notifications</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Controls Row */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
            {unreadCount > 0 && <Badge className="bg-red-600 text-white">{unreadCount} unread</Badge>}
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
              onClick={() => setShowSettings(true)}
              size="sm"
              variant="outline"
              className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
            >
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications Content */}
      <div className="mt-4">
        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-800 mb-6">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh]">
            <div className="space-y-3 pr-4">
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
                            <h4 className="text-sm font-medium text-white">{notification.title}</h4>
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
                              className="h-8 w-8 p-0 hover:bg-neutral-700 text-neutral-400"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteNotification(notification.id)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-neutral-700 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
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
        </Tabs>
      </div>

      {/* Notification Settings Modal */}
      <NotificationSettings open={showSettings} onOpenChange={setShowSettings} />
    </div>
  )
}
