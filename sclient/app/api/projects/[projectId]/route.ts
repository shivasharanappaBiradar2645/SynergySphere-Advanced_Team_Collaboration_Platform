import { NextResponse } from 'next/server'
import { projects } from '@/app/api/db'

export async function GET(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = params
  const project = projects.find((p) => p.id === parseInt(projectId))

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: project })
}

export async function PUT(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = params
  const { name, description, deadline, tags } = await request.json()

  const projectIndex = projects.findIndex((p) => p.id === parseInt(projectId))

  if (projectIndex === -1) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  projects[projectIndex] = {
    ...projects[projectIndex],
    name: name || projects[projectIndex].name,
    description: description || projects[projectIndex].description,
    deadline: deadline || projects[projectIndex].deadline,
    tags: tags || projects[projectIndex].tags,
  }

  return NextResponse.json({ success: true, data: projects[projectIndex] })
}

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = params
  const projectIndex = projects.findIndex((p) => p.id !== parseInt(projectId))
  if (projectIndex > -1) {
    projects.splice(projectIndex, 1)
  }
  return NextResponse.json({ success: true, message: "Project deleted successfully" })
}
