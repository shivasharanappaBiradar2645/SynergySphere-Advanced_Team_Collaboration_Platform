import { sqliteTable,text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdBy: integer("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`),
    deleted: integer("deleted").default(0),
});

export const projectMembers = sqliteTable("project_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role").default("member"),
  addedAt: integer("added_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`),
    deleted: integer("deleted").default(0),
});

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  assignee: integer("assignee").references(() => users.id, { onDelete: "set null" }),
  dueDate: text("due_date"), // store as ISO string "YYYY-MM-DD"
  status: text("status").default("To-Do"), // To-Do, In Progress, Done
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`),
  deleted: integer("deleted").default(0),
});

export const notifications= sqliteTable("notifications",{
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("assignee").references(() => users.id, { onDelete: "set null" }),
    type: text("type").default("Task ASSIGNED"),
    message: text("message"),
    isRead: integer("is_read").default(0),
});