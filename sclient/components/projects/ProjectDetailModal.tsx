"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  CheckSquare,
  Edit,
  Trash2,
  UserPlus,
  MessageSquare,
} from "lucide-react"
import DiscussionModal from "../collaboration/DiscussionModal"
import TeamMemberModal from "../collaboration/TeamMemberModal"
import ActivityFeed from "../collaboration/ActivityFeed"
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
import CreateProjectModal from "./CreateProjectModal"

interface ProjectDetailModalProps {
  project: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleteProject: (projectId: any) => void
  onUpdateProject?: (project: any) => void
}

export default function ProjectDetailModal({
  project,
  open,
  onOpenChange,
  onDeleteProject,
  onUpdateProject,
}: ProjectDetailModalProps) {
  const [showDiscussion, setShowDiscussion] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  if (!project) return null

  const handleDelete = () => {
    onDeleteProject(project.id)
    onOpenChange(false)
  }

  const handleUpdateProject = (updatedProject: any) => {
    onUpdateProject?.(updatedProject)
    setShowEditModal(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl">{project.name}</DialogTitle>
            <DialogDescription className="text-neutral-400">
              {project.description || "No description provided"}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
            <TabsList className="grid w-full grid-cols-4 bg-neutral-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <div className="mt-4 overflow-y-auto max-h-[60vh]">
              <TabsContent value="overview" className="space-y-6">
                {/* Project Image */}
                {project.image && (
                  <div className="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-neutral-300">Deadline:</span>
                    <span>{project.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckSquare className="w-4 h-4 text-green-400" />
                    <span className="text-neutral-300">Tasks:</span>
                    <span>{project.tasks?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-neutral-300">Members:</span>
                    <span>{project.members?.length || 1}</span>
                  </div>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-300 mb-2">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-neutral-700 text-white"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowDiscussion(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discussion
                  </Button>
                  <Button
                    onClick={() => setShowTeamModal(true)}
                    variant="outline"
                    className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Manage Team
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-neutral-300">
                    Team Members
                  </h4>
                  <Button
                    onClick={() => setShowTeamModal(true)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>
                <div className="space-y-2">
                  {project.members?.map((member: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-neutral-800 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                        {member.name?.charAt(0) || "U"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {member.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {member.role || "Member"}
                        </p>
                      </div>
                    </div>
                  )) || (
                    <div className="flex items-center gap-3 p-2 bg-neutral-800 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                        JD
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-neutral-400">Owner</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="activity">
                <ActivityFeed projectId={project.id} />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-4">
                    Project Actions
                  </h4>
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowEditModal(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Project Details
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the project and all its data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Discussion Modal */}
      <DiscussionModal
        project={project}
        open={showDiscussion}
        onOpenChange={setShowDiscussion}
      />

      {/* Team Member Modal */}
      <TeamMemberModal
        project={project}
        open={showTeamModal}
        onOpenChange={setShowTeamModal}
        onUpdateProject={handleUpdateProject}
      />

      {/* Edit Project Modal */}
      {showEditModal && (
        <CreateProjectModal
          project={project}
          onCreateProject={() => {}}
          onUpdateProject={handleUpdateProject}
        >
          <div />
        </CreateProjectModal>
      )}
    </>
  )
}