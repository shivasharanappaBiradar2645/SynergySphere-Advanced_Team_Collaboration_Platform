import { NextResponse } from 'next/server'
import { users } from '@/app/api/db'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Check if user already exists
  if (users.find((user) => user.email === email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const newUser = { id: users.length + 1, name, email, password }
  users.push(newUser)

  return NextResponse.json({ message: 'User registered successfully', data: newUser })
}
