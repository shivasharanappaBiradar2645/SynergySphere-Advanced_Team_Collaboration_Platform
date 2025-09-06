import { NextResponse } from 'next/server'
import { projects, users } from '@/app/api/db'

export async function POST(request: Request, { params }: { params: { projectId: string } }) {
  const { projectId } = params
  const { userId, role } = await request.json()

  if (!userId || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const project = projects.find((p) => p.id === parseInt(projectId))

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  const user = users.find((u) => u.id === userId)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  if (project.members.find((m) => m.id === userId)) {
    return NextResponse.json({ error: 'User is already a member' }, { status: 400 })
  }

  project.members.push({ id: userId, name: user.name, role })

  return NextResponse.json({ success: true, message: 'Member added successfully' })
}
