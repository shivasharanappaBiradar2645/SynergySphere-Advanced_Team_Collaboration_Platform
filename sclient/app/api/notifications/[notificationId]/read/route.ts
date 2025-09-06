import { NextResponse } from 'next/server'

// Mock database
let notifications = [
  {
    id: 1,
    read: false,
  },
  {
    id: 2,
    read: false,
  },
]

export async function POST(
  request: Request,
  { params }: { params: { notificationId: string } }
) {
  const { notificationId } = params

  const notificationIndex = notifications.findIndex(
    (n) => n.id === parseInt(notificationId)
  )

  if (notificationIndex === -1) {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 })
  }

  notifications[notificationIndex].read = true

  return NextResponse.json({ success: true, message: "Notification marked as read" })
}
