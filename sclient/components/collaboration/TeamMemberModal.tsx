"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Mail, Trash2, Crown, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useNotifications } from "../notifications/NotificationProvider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface TeamMemberModalProps {
  project: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateProject: (project: any) => void
}

export default function TeamMemberModal({
  project,
  open,
  onOpenChange,
  onUpdateProject,
}: TeamMemberModalProps) {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("Member")
  const [isLoading, setIsLoading] = useState(false)
  const [members, setMembers] = useState(project?.members || [])
  const { showError, showSuccess } = useNotifications()

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/projects/${project.id}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role }),
      })

      const result = await response.json()

      if (response.ok) {
        showSuccess("Member Added", result.message)
        onUpdateProject(result.data)
        setEmail("")
        setRole("Member")
      } else {
        showError("Failed to add member", result.error)
      }
    } catch (error) {
      showError("Failed to add member", "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveMember = async (memberId: number) => {
    try {
      const response = await fetch(
        `/api/projects/${project.id}/members/${memberId}`,
        {
          method: "DELETE",
        }
      )

      const result = await response.json()

      if (response.ok) {
        showSuccess("Member Removed", result.message)
        onUpdateProject(result.data)
      } else {
        showError("Failed to remove member", result.error)
      }
    } catch (error) {
      showError("Failed to remove member", "An unexpected error occurred.")
    }
  }

  const handleRoleChange = (memberId: number, newRole: string) => {
    const updatedMembers = members.map((m) =>
      m.id === memberId ? { ...m, role: newRole } : m
    )
    setMembers(updatedMembers)

    const updatedProject = { ...project, members: updatedMembers }
    onUpdateProject(updatedProject)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-purple-600"
      case "Admin":
        return "bg-red-600"
      case "Member":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Owner":
        return <Crown className="w-3 h-3" />
      case "Admin":
        return <User className="w-3 h-3" />
      default:
        return null
    }
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Team Members - {project.name}
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Manage team members and their roles in this project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add Member Form */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h4 className="text-sm font-medium mb-3">Add New Member</h4>
            <form onSubmit={handleAddMember} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="member-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <Input
                      id="member-email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-700 border-neutral-600 text-white">
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Adding..." : "Add Member"}
              </Button>
            </form>
          </div>

          <Separator className="bg-neutral-700" />

          {/* Current Members */}
          <div>
            <h4 className="text-sm font-medium mb-3">
              Current Members ({members.length})
            </h4>
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg hover:bg-neutral-750 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {member.avatar || member.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-neutral-400">
                        {member.email || "No email"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.role === "Owner" ? (
                      <Badge
                        className={`${getRoleColor(member.role)} text-white`}
                      >
                        {getRoleIcon(member.role)}
                        <span className="ml-1">{member.role}</span>
                      </Badge>
                    ) : (
                      <Select
                        value={member.role}
                        onValueChange={(newRole) =>
                          handleRoleChange(member.id, newRole)
                        }
                      >
                        <SelectTrigger className="w-24 bg-neutral-700 border-neutral-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-700 border-neutral-600 text-white">
                          <SelectItem value="Member">Member</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    {member.role !== "Owner" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently remove the member from the project.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
