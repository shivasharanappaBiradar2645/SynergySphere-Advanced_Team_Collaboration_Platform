import { db } from "../db/db.mjs";
import { projects, tasks } from "../db/schema.mjs";
import { eq , and} from "drizzle-orm";


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

    res.json({ success: true, data: { task: result[0] } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const listTasks = async (req, res) => {
  try {
    const { projectId } = req.body;
    const result = await db.select().from(tasks).where(and(eq(tasks.projectId, projectId),eq(tasks.deleted,0)));
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateTasks = async (req, res) => {
    try{
        const {taskId, newStatus} = req.body;
        await db.update(tasks).values({
            status: newStatus
        }).where(eq(taskId,tasks.id));
        res.json({ success: true, message: "success" });
    } catch(err){
        res.status(500).json({ success: false, error: err.message });
    }
}

export const deleteTasks = async (req,res) => {
    try{
        const {taskId} = req.body;
        await db.update(tasks).set({deleted: 1}).where(
            eq(taskId,tasks.id)
        );
        res.json({ success: true, message:"deleted"})
    }catch(err){
        res.status(500).json({ success: false, error: err.message})
    }
}
