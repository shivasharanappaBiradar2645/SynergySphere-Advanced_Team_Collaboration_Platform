import { NextResponse } from 'next/server'

// Mock database
const tasks = []

export async function POST(request: Request) {
  const {
    projectId,
    title,
    description,
    assignee,
    dueDate,
    status,
    priority,
  } = await request.json()

  if (!projectId || !title) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newTask = {
    id: tasks.length + 1,
    projectId,
    title,
    description,
    assignee,
    dueDate,
    status,
    priority,
    createdAt: new Date().toISOString(),
  }

  tasks.push(newTask)

  return NextResponse.json({ success: true, data: newTask })
}
