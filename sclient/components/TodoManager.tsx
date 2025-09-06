"use client"
import { Button } from "@/components/ui/button"
import { useNotifications } from "./notifications/NotificationProvider"

export default function TodoManager() {
  const { showSuccess } = useNotifications()

  const handleCompleteAllTasks = () => {
    showSuccess(
      "All Tasks Complete!",
      "Congratulations! You've successfully completed all project management features for SynergySphere.",
    )
  }

  return (
    <div className="p-4">
      <Button onClick={handleCompleteAllTasks} className="bg-green-600 hover:bg-green-700">
        Complete All Tasks
      </Button>
    </div>
  )
}
