import { NextResponse } from 'next/server'
import { projects } from '@/app/api/db'

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const tags = formData.get('tags') as string
  const image = formData.get('image') as File

  if (!name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newProject = {
    id: projects.length + 1,
    name,
    description,
    tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
    image: image ? `/images/${image.name}` : null, // In a real app, you would upload the image to a storage service
    tasks: [],
    members: [{ id: 1, name: "John Doe", role: "Owner" }],
    createdAt: new Date().toISOString(),
  }

  projects.push(newProject)

  return NextResponse.json({ success: true, data: newProject })
}
