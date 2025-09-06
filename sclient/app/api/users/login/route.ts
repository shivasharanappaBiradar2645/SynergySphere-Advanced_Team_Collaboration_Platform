import { NextResponse } from 'next/server'
import { users } from '@/app/api/db'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const user = users.find(
    (user) => user.email === email && user.password === password
  )

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // In a real application, you would generate a JWT here
  const token = "mock-jwt-token"

  return NextResponse.json({ success: true, data: { token, user } })
}
