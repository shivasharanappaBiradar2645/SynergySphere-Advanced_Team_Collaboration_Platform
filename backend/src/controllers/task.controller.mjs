import { db } from "../db/connection.mjs";
import { tasks } from "../db/schema.mjs";
import { eq } from "drizzle-orm";


export const createTask = async (req, res) => {
  try {
    const { projectId, title, description, assignee, dueDate, status } = req.body;

    const result = await db.insert(tasks).values({
      projectId,
      title,
      description,
      assignee,
      dueDate,
      status,
    }).returning();

    res.json({ message: "Task created", task: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await db.select().from(tasks).where(eq(tasks.projectId, +projectId));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
