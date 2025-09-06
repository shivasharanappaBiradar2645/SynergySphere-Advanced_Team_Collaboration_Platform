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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Button from "../Button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  User,
  Search,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react"
import CreateTaskModal from "./CreateTaskModal"
import TaskDetailModal from "./TaskDetailModal"
import TaskBoard from "./TaskBoard"
import { useTaskFilters } from "@/hooks/use-task-filters"

export default function TasksView() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    filteredTasks,
  } = useTaskFilters(tasks)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)
  const [viewMode, setViewMode] = useState("list")

  useEffect(() => {
    fetchProjects()
    fetchTasks()
  }, [])

  const fetchProjects = async () => {
    const response = await fetch("/api/projects/list")
    const result = await response.json()
    if (result.success) {
      setProjects(result.data)
    }
  }

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId: null }), // Fetch all tasks for now
    })
    const result = await response.json()
    if (result.success) {
      setTasks(result.data)
    }
  }

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

  const handleCreateTask = (newTask: any) => {
    fetchTasks()
  }

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setShowTaskDetail(true)
  }

  const handleUpdateTask = (updatedTask: any) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
    setTasks(updatedTasks)
    setSelectedTask(updatedTask)
  }

  const handleDeleteTask = (taskId: any) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const handleTaskStatusChange = (taskId: any, newStatus: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
    setTasks(updatedTasks)
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
                <BreadcrumbLink href="/">Tasks</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Tasks</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Controls Row */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
              />
            </div>

            {/* Filters */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 bg-neutral-800 border-neutral-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="To-Do">To-Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32 bg-neutral-800 border-neutral-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-neutral-800 border-neutral-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
              <TabsList className="bg-neutral-800 border-neutral-600">
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-neutral-700"
                >
                  <List className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="board"
                  className="data-[state=active]:bg-neutral-700"
                >
                  <LayoutGrid className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* New Task Button */}
            <CreateTaskModal onCreateTask={handleCreateTask} projects={projects}>
              <Button title="New Task" />
            </CreateTaskModal>
          </div>
        </div>
      </div>

      {/* Tasks Content */}
      <div className="mt-4">
        {viewMode === "list" ? (
          /* List View */
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-neutral-900 text-white rounded-lg p-4 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                    <p className="text-neutral-400 text-sm mb-2 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-300">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {task.assignee}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {task.dueDate || "No due date"}
                      </span>
                      <span className="text-blue-400">{task.project}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={`${getStatusColor(task.status)} text-white`}>
                      {task.status}
                    </Badge>
                    <Badge
                      className={`${getPriorityColor(task.priority)} text-white`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div className="col-span-full text-center text-neutral-400 py-12">
                <p>No tasks found matching your criteria.</p>
              </div>
            )}
          </div>
        ) : (
          /* Board View */
          <TaskBoard
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
            onTaskStatusChange={handleTaskStatusChange}
          />
        )}
      </div>

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        open={showTaskDetail}
        onOpenChange={setShowTaskDetail}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  )
}
