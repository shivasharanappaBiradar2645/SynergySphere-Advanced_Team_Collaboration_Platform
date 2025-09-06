"use client"

import { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Button from "../Button"
import ProjectCards from "../ProjectCards"
import CreateProjectModal from "./CreateProjectModal"
import ProjectDetailModal from "./ProjectDetailModal"
import { Search, Filter } from "lucide-react"

export default function ProjectsView() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectDetail, setShowProjectDetail] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const response = await fetch("/api/projects/list")
    const result = await response.json()
    if (result.success) {
      setProjects(result.data)
      setFilteredProjects(result.data)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterProjects(term, sortBy)
  }

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption)
    filterProjects(searchTerm, sortOption)
  }

  const filterProjects = (search: string, sort: string) => {
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    )

    // Sort projects
    filtered.sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name)
        case "deadline":
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case "tasks":
          return b.tasks.length - a.tasks.length
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }

  const handleCreateProject = (newProject: any) => {
    fetchProjects()
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setShowProjectDetail(true)
  }

  const handleUpdateProject = (updatedProject: any) => {
    fetchProjects()
  }

  const handleDeleteProject = async (projectId: any) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (response.ok) {
        fetchProjects()
      } else {
        console.error("Failed to delete project:", result.error)
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 grid-rows-[10%_90%] py-3 px-3.5">
      {/* Top Section */}
      <div className="grid grid-cols-1 grid-rows-2">
        {/* Breadcrumbs */}
        <div className="text-white">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Controls Row */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-40 bg-neutral-800 border-neutral-600 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="tasks">Task Count</SelectItem>
                <SelectItem value="recent">Recently Created</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* New Project Button */}
          <CreateProjectModal onCreateProject={handleCreateProject}>
            <Button title="New Project" />
          </CreateProjectModal>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="cursor-pointer"
          >
            <ProjectCards {...project} />
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center text-neutral-400 py-12">
            <p>No projects found matching your search.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={showProjectDetail}
        onOpenChange={setShowProjectDetail}
        onDeleteProject={handleDeleteProject}
        onUpdateProject={handleUpdateProject}
      />
    </div>
  )
}
