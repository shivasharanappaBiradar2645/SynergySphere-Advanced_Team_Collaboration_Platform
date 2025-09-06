"use client"

import { useState } from "react"
import Sidebar from "./sidebar"
import Header from "./Header"
import ProjectsView from "./projects/ProjectsView"
import TasksView from "./tasks/TasksView"
import NotificationsView from "./notifications/NotificationsView"
import NotificationProvider from "./notifications/NotificationProvider"

interface DashboardProps {
  user: any
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState("projects")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const renderCurrentView = () => {
    switch (currentView) {
      case "projects":
        return <ProjectsView />
      case "tasks":
        return <TasksView />
      case "notifications":
        return <NotificationsView />
      default:
        return <ProjectsView />
    }
  }

  const getViewTitle = () => {
    switch (currentView) {
      case "projects":
        return "Projects"
      case "tasks":
        return "My Tasks"
      case "notifications":
        return "Notifications"
      default:
        return "Projects"
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <NotificationProvider>
      <div className="grid grid-cols-4 grid-rows-1 gap-4 min-h-screen p-5 bg-neutral-800 grid-flow-col">
        {/* Sidebar */}
        <div
          id="sidebar"
          className={`md:min-w-full md:static md:col-span-1 absolute top-0 left-0 z-50 w-3/4 h-full bg-white ${
            isSidebarOpen ? "md:block" : "hidden"
          }`}
        >
          <Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={onLogout} />
        </div>

        {/* Main Content */}
        <div
          id="main"
          className={`bg-black rounded-lg min-h-full overflow-y-scroll grid grid-cols-1 grid-rows-[7%_93%] ${
            isSidebarOpen ? "col-span-4 md:col-span-3" : "col-span-4"
          }`}
        >
          <Header title={getViewTitle()} toggleSidebar={toggleSidebar} />
          {renderCurrentView()}
        </div>
      </div>
    </NotificationProvider>
  )
}
