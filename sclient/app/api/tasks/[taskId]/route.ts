import { NextResponse } from 'next/server'

// Mock database
let tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Design Homepage Layout",
    description: "Create wireframes and mockups for the new homepage design with modern UI/UX principles",
    assignee: 1,
    dueDate: "2025-01-15",
    status: "In Progress",
    priority: "High",
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    projectId: 2,
    title: "Setup Authentication",
    description: "Implement user login and registration functionality with JWT tokens",
    assignee: 2,
    dueDate: "2025-01-20",
    status: "To-Do",
    priority: "Medium",
    createdAt: "2025-01-02",
  },
]

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params
  tasks = tasks.filter((t) => t.id !== parseInt(taskId))
  return NextResponse.json({ success: true, message: "Task deleted successfully" })
}
