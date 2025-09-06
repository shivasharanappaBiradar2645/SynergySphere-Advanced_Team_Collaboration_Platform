import { NextResponse } from 'next/server'

// Mock database
const messages = []

export async function POST(request: Request) {
  const { discussionId, message } = await request.json()

  if (!discussionId || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newMessage = {
    id: messages.length + 1,
    discussionId,
    message,
    userId: 1, // Mock user ID
    createdAt: new Date().toISOString(),
  }

  messages.push(newMessage)

  return NextResponse.json({ success: true, data: newMessage })
}
