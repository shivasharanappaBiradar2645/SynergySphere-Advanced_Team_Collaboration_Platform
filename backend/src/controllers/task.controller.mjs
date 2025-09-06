import { db } from "../db/connection.mjs";
import { projects, tasks } from "../db/schema.mjs";
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
    const { projectId } = req.body;
    const result = await db.select().from(tasks).where(and(eq(tasks.projectId, projectId),eq(tasks.deleted,0)));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTasks = async (req, res) => {
    try{
        const {taskId, newStatus} = req.body;
        await db.update(tasks).values({
            status: newStatus
        }).where(eq(taskId,tasks.id));
        res.json({message: "success"});
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

export const deleteTasks = async (req,res) => {
    try{
        const {taskId} = req.body;
        await db.update(tasks).set({deleted: 1}).where(
            eq(taskId,tasks.id)
        );
        res.json({message:"deleted"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}
