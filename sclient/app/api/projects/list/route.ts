import { NextResponse } from 'next/server'
import { projects } from '@/app/api/db'

export async function GET(request: Request) {
  return NextResponse.json({ success: true, data: projects })
}
