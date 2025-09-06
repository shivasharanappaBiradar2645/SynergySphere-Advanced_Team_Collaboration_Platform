"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Calendar,
  User,
  Clock,
  Flag,
  Edit,
  Trash2,
  Save,
  X,
  MessageSquare,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import TaskComments from "../collaboration/TaskComments"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface TaskDetailModalProps {
  task: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateTask: (task: any) => void
  onDeleteTask: (taskId: any) => void
}

export default function TaskDetailModal({
  task,
  open,
  onOpenChange,
  onUpdateTask,
  onDeleteTask,
}: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  if (!task) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-600"
      case "In Progress":
        return "bg-blue-600"
      case "To-Do":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
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

  const handleSave = () => {
    onUpdateTask(editedTask)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTask(task)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDeleteTask(task.id)
    onOpenChange(false)
  }

  const handleQuickStatusChange = (newStatus: string) => {
    const updatedTask = { ...task, status: newStatus }
    onUpdateTask(updatedTask)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Task details and collaboration
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-2 bg-neutral-800">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comments">
              <MessageSquare className="w-4 h-4 mr-2" />
              Comments
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 overflow-y-auto max-h-[60vh]">
            <TabsContent value="details" className="space-y-6">
              {/* Task Status and Priority */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(task.status)} text-white`}>
                    {task.status}
                  </Badge>
                  <Badge
                    className={`${getPriorityColor(task.priority)} text-white`}
                  >
                    {task.priority}
                  </Badge>
                </div>
                {!isEditing && (
                  <div className="flex gap-2">
                    <Select
                      value={task.status}
                      onValueChange={handleQuickStatusChange}
                    >
                      <SelectTrigger className="w-32 bg-neutral-800 border-neutral-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                        <SelectItem value="To-Do">To-Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Task Description */}
              <div>
                <h4 className="text-sm font-medium text-neutral-300 mb-2">
                  Description
                </h4>
                {isEditing ? (
                  <Textarea
                    value={editedTask.description}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, description: e.target.value })
                    }
                    className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400 min-h-[100px]"
                  />
                ) : (
                  <p className="text-neutral-200 bg-neutral-800 p-3 rounded-lg">
                    {task.description || "No description provided"}
                  </p>
                )}
              </div>

              {/* Task Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-neutral-300">Assignee:</span>
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-neutral-300">Due Date:</span>
                    <span>{task.dueDate || "No due date"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Flag className="w-4 h-4 text-purple-400" />
                    <span className="text-neutral-300">Project:</span>
                    <span className="text-blue-400">{task.project}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-neutral-300">Created:</span>
                    <span>
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="bg-neutral-700" />

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Task
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex-1">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Task
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the task.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="comments">
              <TaskComments taskId={task.id} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
