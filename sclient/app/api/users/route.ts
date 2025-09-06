import { NextResponse } from 'next/server'

// Mock database
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
  },
]

export async function GET(request: Request) {
  return NextResponse.json({ success: true, data: users })
}
