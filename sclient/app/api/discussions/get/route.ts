import { NextResponse } from 'next/server'

// Mock database
const discussions = [
    { id: 1, projectId: 1, title: "Homepage Design Review" },
    { id: 2, projectId: 1, title: "API Integration Plan" },
]

export async function POST(request: Request) {
  const { projectId } = await request.json()

  if (!projectId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const projectDiscussions = discussions.filter(
    (discussion) => discussion.projectId === projectId
  )

  return NextResponse.json({ success: true, data: projectDiscussions })
}
