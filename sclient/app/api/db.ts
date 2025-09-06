export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
]

export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete redesign of the company website with modern UI/UX principles",
    tags: ["UI/UX", "Frontend", "High Priority"],
    image: "/modern-office.png",
    deadline: "2025-09-30",
    tasks: [{ id: 1 }, { id: 2 }, { id: 3 }],
    members: [
      { id: 1, name: "John Doe", role: "Owner" },
      { id: 2, name: "Jane Smith", role: "Designer" },
    ],
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "Cross-platform mobile application using React Native",
    tags: ["React Native", "Backend"],
    image: "/mobile-app-development.png",
    deadline: "2025-10-15",
    tasks: [{ id: 1 }, { id: 2 }],
    members: [
      { id: 1, name: "John Doe", role: "Owner" },
      { id: 3, name: "Mike Johnson", role: "Developer" },
    ],
    createdAt: "2025-01-02",
  },
]

export const tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Design Homepage Layout",
    description: "Create wireframes and mockups for the new homepage design with modern UI/UX principles",
    assignee: 1,
    dueDate: "2025-01-15",
    status: "In Progress",
    priority: "High",
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    projectId: 2,
    title: "Setup Authentication",
    description: "Implement user login and registration functionality with JWT tokens",
    assignee: 2,
    dueDate: "2025-01-20",
    status: "To-Do",
    priority: "Medium",
    createdAt: "2025-01-02",
  },
]

export const discussions = [
    { id: 1, projectId: 1, title: "Homepage Design Review" },
    { id: 2, projectId: 1, title: "API Integration Plan" },
]

export const messages = [
    { id: 1, discussionId: 1, message: "Hey team, I've started working on the homepage design. Should be ready for review by tomorrow.", userId: 1, createdAt: "2025-01-10T10:30:00Z" },
    { id: 2, discussionId: 1, message: "Great! I'll prepare the content for the homepage. Do we have the final copy approved?", userId: 2, createdAt: "2025-01-10T11:15:00Z" },
]

export const notifications = [
  {
    id: 1,
    type: "task_assigned",
    title: "New task assigned",
    message: "You have been assigned to 'Design Homepage Layout'",
    user: { name: "Jane Smith", avatar: "JS" },
    timestamp: "2025-01-10T16:30:00Z",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "comment_added",
    title: "New comment",
    message: "Mike Johnson commented on 'Database Migration'",
    user: { name: "Mike Johnson", avatar: "MJ" },
    timestamp: "2025-01-10T15:45:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "deadline_approaching",
    title: "Deadline approaching",
    message: "'API Integration' is due in 2 days",
    timestamp: "2025-01-10T14:20:00Z",
    read: true,
    priority: "high",
  },
]
