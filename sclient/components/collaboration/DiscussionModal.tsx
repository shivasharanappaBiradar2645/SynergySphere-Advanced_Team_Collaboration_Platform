"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useNotifications } from "../notifications/NotificationProvider"

interface DiscussionModalProps {
  project: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DiscussionModal({ project, open, onOpenChange }: DiscussionModalProps) {
  const [discussions, setDiscussions] = useState([])
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { showError, showSuccess } = useNotifications()

  useEffect(() => {
    if (project) {
      fetchDiscussions()
    }
  }, [project])

  useEffect(() => {
    if (selectedDiscussion) {
      fetchMessages()
    }
  }, [selectedDiscussion])

  const fetchDiscussions = async () => {
    try {
      const response = await fetch("/api/discussions/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: project.id }),
      })
      const result = await response.json()
      if (result.success) {
        setDiscussions(result.data)
      }
    } catch (error) {
      showError("Failed to fetch discussions", "An unexpected error occurred.")
    }
  }

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/discussions/messages/discussion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discussionId: selectedDiscussion.id }),
      })
      const result = await response.json()
      if (result.success) {
        setMessages(result.data)
      }
    } catch (error) {
      showError("Failed to fetch messages", "An unexpected error occurred.")
    }
  }

  const handleCreateDiscussion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDiscussionTitle.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: project.id, title: newDiscussionTitle }),
      })

      const result = await response.json()

      if (response.ok) {
        showSuccess("Discussion Created", "Your discussion has been created successfully")
        setNewDiscussionTitle("")
        fetchDiscussions()
      } else {
        showError("Failed to create discussion", result.error)
      }
    } catch (error) {
      showError("Failed to create discussion", "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/discussions/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discussionId: selectedDiscussion.id, message: newMessage }),
      })

      const result = await response.json()

      if (response.ok) {
        setNewMessage("")
        fetchMessages()
      } else {
        showError("Failed to send message", result.error)
      }
    } catch (error) {
      showError("Failed to send message", "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString()
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Project Discussion - {project.name}
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Collaborate with your team members in real-time
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 flex-1 overflow-hidden">
          {/* Discussions List */}
          <div className="col-span-1 bg-neutral-800 rounded-lg p-4 flex flex-col gap-4">
            <h4 className="text-lg font-semibold">Discussions</h4>
            <form onSubmit={handleCreateDiscussion} className="flex gap-2">
              <Input
                placeholder="New discussion..."
                value={newDiscussionTitle}
                onChange={(e) => setNewDiscussionTitle(e.target.value)}
                className="flex-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !newDiscussionTitle.trim()} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-2">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className={`p-2 rounded-lg cursor-pointer ${
                      selectedDiscussion?.id === discussion.id
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-700 hover:bg-neutral-600"
                    }`}
                    onClick={() => setSelectedDiscussion(discussion)}
                  >
                    {discussion.title}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Messages Area */}
          <div className="col-span-2 bg-neutral-800 rounded-lg p-4 flex flex-col gap-4">
            {selectedDiscussion ? (
              <>
                <h4 className="text-lg font-semibold">{selectedDiscussion.title}</h4>
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => {
                      const showDate =
                        index === 0 ||
                        formatDate(message.createdAt) !==
                          formatDate(messages[index - 1].createdAt)

                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="text-center py-2">
                              <span className="text-xs text-neutral-500 bg-neutral-700 px-3 py-1 rounded-full">
                                {formatDate(message.createdAt)}
                              </span>
                            </div>
                          )}
                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {message.user?.name?.charAt(0) || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">
                                  {message.user?.name || "User"}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  {formatTime(message.createdAt)}
                                </span>
                              </div>
                              <div className="bg-neutral-700 rounded-lg p-3">
                                <p className="text-sm">{message.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>

                <Separator className="bg-neutral-700" />

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-500">
                <p>Select a discussion to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
