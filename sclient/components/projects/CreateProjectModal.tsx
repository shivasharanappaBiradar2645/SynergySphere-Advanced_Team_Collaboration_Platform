"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useNotifications } from "../notifications/NotificationProvider"

interface CreateProjectModalProps {
  project?: any
  onCreateProject: (project: any) => void
  onUpdateProject: (project: any) => void
  children: React.ReactNode
}

export default function CreateProjectModal({
  project,
  onCreateProject,
  onUpdateProject,
  children,
}: CreateProjectModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { showError, showSuccess } = useNotifications()

  useEffect(() => {
    if (project) {
      setName(project.name)
      setDescription(project.description)
      setDeadline(project.deadline)
      setTags(project.tags)
    }
  }, [project])

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("deadline", deadline)
      formData.append("tags", tags.join(","))

      const url = project ? `/api/projects/${project.id}` : "/api/projects/create"
      const method = project ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        if (project) {
          showSuccess("Project updated", "Your project has been updated successfully.")
          onUpdateProject(result.data)
        } else {
          showSuccess("Project created", "Your project has been created successfully.")
          onCreateProject(result.data)
        }
        setOpen(false)
      } else {
        showError("Failed to save project", result.error)
      }
    } catch (error) {
      showError("Failed to save project", "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create New Project"}</DialogTitle>
          <DialogDescription className="text-neutral-400">
            {project
              ? "Edit the details of your project."
              : "Start a new project and invite your team to collaborate"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400 min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-deadline">Deadline</Label>
            <Input
              id="project-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="bg-neutral-800 border-neutral-600 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
              />
              <Button type="button" onClick={handleAddTag} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-neutral-700 text-white">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
