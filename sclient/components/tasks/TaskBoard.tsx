"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, Flag } from "lucide-react"

interface TaskBoardProps {
  tasks: any[]
  onTaskClick: (task: any) => void
  onTaskStatusChange: (taskId: any, newStatus: string) => void
}

const statusColumns = [
  { id: "To-Do", title: "To Do", color: "bg-gray-600" },
  { id: "In Progress", title: "In Progress", color: "bg-blue-600" },
  { id: "Done", title: "Done", color: "bg-green-600" },
]

export default function TaskBoard({ tasks, onTaskClick, onTaskStatusChange }: TaskBoardProps) {
  const [draggedTask, setDraggedTask] = useState<any>(null)

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-600"
      case "Medium":
        return "bg-yellow-600"
      case "Low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const handleDragStart = (e: React.DragEvent, task: any) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== newStatus) {
      onTaskStatusChange(draggedTask.id, newStatus)
    }
    setDraggedTask(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {statusColumns.map((column) => (
        <div
          key={column.id}
          className="flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${column.color}`} />
            <h3 className="font-semibold text-white">{column.title}</h3>
            <Badge variant="secondary" className="bg-neutral-700 text-neutral-300">
              {getTasksByStatus(column.id).length}
            </Badge>
          </div>

          {/* Tasks */}
          <div className="space-y-3 flex-1">
            {getTasksByStatus(column.id).map((task) => (
              <Card
                key={task.id}
                className="bg-neutral-800 border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onClick={() => onTaskClick(task)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium text-white line-clamp-2">{task.title}</CardTitle>
                    <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>{task.priority}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {task.description && <p className="text-xs text-neutral-400 mb-3 line-clamp-2">{task.description}</p>}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-300">
                      <Flag className="w-3 h-3" />
                      <span className="text-blue-400">{task.project}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-300">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{task.assignee}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {getTasksByStatus(column.id).length === 0 && (
              <div className="text-center text-neutral-500 py-8">
                <p className="text-sm">No tasks in {column.title.toLowerCase()}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
