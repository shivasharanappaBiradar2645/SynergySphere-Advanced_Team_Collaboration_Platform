# SynergySphere-Advanced_Team_Collaboration_Platform
odooXnmit hackathon

## Backend Features

The backend is a Node.js application built with Express.js, providing a RESTful API for the SynergySphere platform. It uses a SQLite database with Drizzle ORM for data persistence.

### User Management

*   **POST /api/users/register**: Register a new user.
*   **POST /api/users/login**: Login a user and get a JWT token.
*   **GET /api/users/**: Get a list of all users.

### Project Management

*   **POST /api/projects/create**: Create a new project.
*   **GET /api/projects/list**: List all projects for the logged-in user.
*   **GET /api/projects/:id**: Get project details by ID.
*   **PUT /api/projects/:id**: Update project description.
*   **DELETE /api/projects/:id**: Delete a project.
*   **POST /api/projects/:id/members**: Add a member to a project.
*   **DELETE /api/projects/:id/members/:userId**: Remove a member from a project.

### Task Management

*   **POST /api/tasks/create**: Create a new task within a project.
*   **POST /api/tasks/list**: List all tasks for a project.
*   **PUT /api/tasks/update**: Update a task's status.
*   **DELETE /api/tasks/delete**: Delete a task.

### Discussions

*   **POST /api/discussions/**: Create a new discussion in a project.
*   **POST /api/discussions/get**: Get all discussions for a project.
*   **POST /api/discussions/messages**: Add a message to a discussion.
*   **POST /api/discussions/messages/discussion**: Get all messages for a discussion.

### Notifications

*   **GET /api/notifications/stream**: Stream notifications using Server-Sent Events (SSE).
*   **GET /api/notifications/**: Get all unread notifications.
*   **PATCH /api/notifications/:id/read**: Mark a notification as read.