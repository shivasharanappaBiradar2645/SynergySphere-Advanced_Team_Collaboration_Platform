"use client"

import { Badge } from "@/components/ui/badge.tsx"
import { CircleAlert as ClockAlert } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"

export default function ProjectCards(props) {
  const handleDropdownClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="bg-neutral-900 text-white rounded-xl shadow-md border border-neutral-600 overflow-hidden hover:shadow-lg hover:border-neutral-500 transition-all flex flex-col">
      {/* Top: tags + name */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {props.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className={"bg-white text-black"}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{props.name}</h2>
          <div onClick={handleDropdownClick}>
            <DropdownMenu className="bg-white text-black">
              <DropdownMenuTrigger>
                <div>
                  <Ellipsis color={"white"} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem>Add Members</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={props.image ? props.image : "/placeholder.svg?height=160&width=300&query=office workspace"}
          alt="project image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer: deadline + tasks */}
      <div className="p-4 flex items-center justify-between text-sm text-neutral-300">
        <div className="flex items-center gap-2">
          <ClockAlert className="w-4 h-4" />
          <span>{props.deadline}</span>
        </div>
        <div>{props.tasks.length} tasks</div>
      </div>
    </div>
  )
}
