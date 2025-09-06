"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface TaskCommentsProps {
  taskId: number
  onAddComment?: (comment: any) => void
}

const mockComments = [
  {
    id: 1,
    user: { name: "Jane Smith", avatar: "JS" },
    comment: "I've reviewed the wireframes and they look great! Just a few minor adjustments needed on the navigation.",
    timestamp: "2025-01-10T14:30:00Z",
  },
  {
    id: 2,
    user: { name: "John Doe", avatar: "JD" },
    comment: "Thanks for the feedback! I'll make those changes and update the designs by tomorrow.",
    timestamp: "2025-01-10T15:15:00Z",
  },
  {
    id: 3,
    user: { name: "Mike Johnson", avatar: "MJ" },
    comment: "Should we also consider the mobile responsiveness at this stage?",
    timestamp: "2025-01-10T16:00:00Z",
  },
]

export default function TaskComments({ taskId, onAddComment }: TaskCommentsProps) {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const comment = {
        id: Date.now(),
        user: { name: "John Doe", avatar: "JD" },
        comment: newComment,
        timestamp: new Date().toISOString(),
      }

      setComments([...comments, comment])
      setNewComment("")
      onAddComment?.(comment)
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-blue-400" />
        <h4 className="text-sm font-medium text-neutral-300">Comments ({comments.length})</h4>
      </div>

      {/* Comments List */}
      <ScrollArea className="max-h-64">
        <div className="space-y-4 pr-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-blue-600 text-white text-xs">{comment.user.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{comment.user.name}</span>
                  <span className="text-xs text-neutral-500">{formatTime(comment.timestamp)}</span>
                </div>
                <div className="bg-neutral-800 rounded-lg p-3">
                  <p className="text-sm text-neutral-200">{comment.comment}</p>
                </div>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-center text-neutral-500 py-4">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <Separator className="bg-neutral-700" />

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="space-y-3">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400 min-h-[80px] resize-none"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !newComment.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? "Posting..." : "Comment"}
          </Button>
        </div>
      </form>
    </div>
  )
}
