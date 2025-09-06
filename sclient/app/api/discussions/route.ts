import { NextResponse } from 'next/server'

// Mock database
const discussions = []

export async function POST(request: Request) {
  const { projectId, title } = await request.json()

  if (!projectId || !title) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newDiscussion = {
    id: discussions.length + 1,
    projectId,
    title,
    createdAt: new Date().toISOString(),
  }

  discussions.push(newDiscussion)

  return NextResponse.json({ success: true, data: newDiscussion })
}
