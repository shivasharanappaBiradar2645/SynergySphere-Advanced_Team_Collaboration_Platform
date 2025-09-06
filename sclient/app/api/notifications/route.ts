import { NextResponse } from 'next/server'

// Mock database
const notifications = [
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
]

export async function GET(request: Request) {
  const unreadNotifications = notifications.filter((n) => !n.read)
  return NextResponse.json({ success: true, data: unreadNotifications })
}
