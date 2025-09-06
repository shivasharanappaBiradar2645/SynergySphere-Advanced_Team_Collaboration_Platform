"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, CheckSquare, MessageSquare, UserPlus, Clock } from "lucide-react"

interface ActivityFeedProps {
  projectId?: number
  limit?: number
}

const mockActivities = [
  {
    id: 1,
    type: "task_completed",
    user: { name: "Mike Johnson", avatar: "MJ" },
    action: "completed task",
    target: "Database Migration",
    timestamp: "2025-01-10T16:30:00Z",
  },
  {
    id: 2,
    type: "comment_added",
    user: { name: "Jane Smith", avatar: "JS" },
    action: "commented on",
    target: "Design Homepage Layout",
    timestamp: "2025-01-10T15:45:00Z",
  },
  {
    id: 3,
    type: "member_added",
    user: { name: "John Doe", avatar: "JD" },
    action: "added",
    target: "Sarah Wilson to the project",
    timestamp: "2025-01-10T14:20:00Z",
  },
  {
    id: 4,
    type: "task_created",
    user: { name: "Sarah Wilson", avatar: "SW" },
    action: "created task",
    target: "API Integration",
    timestamp: "2025-01-10T13:15:00Z",
  },
  {
    id: 5,
    type: "discussion_started",
    user: { name: "John Doe", avatar: "JD" },
    action: "started a discussion about",
    target: "Homepage Design Review",
    timestamp: "2025-01-10T12:00:00Z",
  },
  {
    id: 6,
    type: "task_assigned",
    user: { name: "Jane Smith", avatar: "JS" },
    action: "assigned task",
    target: "UI Testing to Mike Johnson",
    timestamp: "2025-01-10T11:30:00Z",
  },
]

export default function ActivityFeed({ projectId, limit = 10 }: ActivityFeedProps) {
  const activities = mockActivities.slice(0, limit)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckSquare className="w-4 h-4 text-green-400" />
      case "task_created":
        return <CheckSquare className="w-4 h-4 text-blue-400" />
      case "task_assigned":
        return <CheckSquare className="w-4 h-4 text-yellow-400" />
      case "comment_added":
        return <MessageSquare className="w-4 h-4 text-purple-400" />
      case "member_added":
        return <UserPlus className="w-4 h-4 text-green-400" />
      case "discussion_started":
        return <MessageSquare className="w-4 h-4 text-blue-400" />
      default:
        return <Activity className="w-4 h-4 text-neutral-400" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "task_completed":
        return "text-green-400"
      case "task_created":
        return "text-blue-400"
      case "task_assigned":
        return "text-yellow-400"
      case "comment_added":
        return "text-purple-400"
      case "member_added":
        return "text-green-400"
      case "discussion_started":
        return "text-blue-400"
      default:
        return "text-neutral-400"
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-blue-400" />
        <h4 className="text-sm font-medium text-neutral-300">Recent Activity</h4>
      </div>

      <ScrollArea className="max-h-96">
        <div className="space-y-3 pr-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-3 p-3 bg-neutral-800 rounded-lg hover:bg-neutral-750 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-neutral-200">
                      <span className="font-medium">{activity.user.name}</span>
                      <span className="text-neutral-400"> {activity.action} </span>
                      <span className={getActivityColor(activity.type)}>{activity.target}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 ml-2">
                    <Clock className="w-3 h-3" />
                    {formatTime(activity.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center text-neutral-500 py-8">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
