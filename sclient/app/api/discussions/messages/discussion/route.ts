import { NextResponse } from 'next/server'

// Mock database
const messages = [
    { id: 1, discussionId: 1, message: "Hey team, I've started working on the homepage design. Should be ready for review by tomorrow.", userId: 1, createdAt: "2025-01-10T10:30:00Z" },
    { id: 2, discussionId: 1, message: "Great! I'll prepare the content for the homepage. Do we have the final copy approved?", userId: 2, createdAt: "2025-01-10T11:15:00Z" },
]

export async function POST(request: Request) {
  const { discussionId } = await request.json()

  if (!discussionId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const discussionMessages = messages.filter(
    (message) => message.discussionId === discussionId
  )

  return NextResponse.json({ success: true, data: discussionMessages })
}
