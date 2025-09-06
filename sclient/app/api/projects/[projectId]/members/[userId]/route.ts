import { NextResponse } from 'next/server'

// Mock database
let projects = [
  {
    id: 1,
    name: "Website Redesign",
    members: [
      { id: 1, name: "John Doe", role: "Owner" },
      { id: 2, name: "Jane Smith", role: "Designer" },
    ],
  },
  {
    id: 2,
    name: "Mobile App",
    members: [
      { id: 1, name: "John Doe", role: "Owner" },
      { id: 3, name: "Mike Johnson", role: "Developer" },
    ],
  },
]

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string; userId: string } }
) {
  const { projectId, userId } = params

  const project = projects.find((p) => p.id === parseInt(projectId))

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  const memberIndex = project.members.findIndex((m) => m.id === parseInt(userId))

  if (memberIndex === -1) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 })
  }

  project.members.splice(memberIndex, 1)

  return NextResponse.json({ success: true, message: "Member removed successfully" })
}
