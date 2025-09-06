import { db } from "../db/db.mjs";
import { projectMembers, tasks } from "../db/schema.mjs";
import { and, eq } from "drizzle-orm";


import { discussions } from "../db/schema.mjs";

export const isProjectMember = async (req, res, next) => {
  try {
    let projectId = req.params.projectId || req.body.projectId;
    const userId = req.user.id;
    const discussionId = req.params.discussionId || req.body.discussionId;

    if(!projectId && discussionId) {
        const [discussion] = await db.select().from(discussions).where(eq(discussions.id, discussionId));
        if(discussion) {
            projectId = discussion.projectId;
        }
    }

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const [membership] = await db
      .select()
      .from(projectMembers)
      .where(
        and(
          eq(projectMembers.projectId, projectId),
          eq(projectMembers.userId, userId)
        )
      );

    if (!membership) {
      return res.status(403).json({ error: "You are not a member of this project" });
    }

    req.projectRole = membership.role;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const isProjectOwner = async (req, res, next) => {
    try {
        const projectId = req.params.projectId || req.body.projectId;
        const userId = req.user.id;

        if (!projectId) {
          return res.status(400).json({ error: "Project ID is required" });
        }
    
        const [membership] = await db
          .select()
          .from(projectMembers)
          .where(
            and(
              eq(projectMembers.projectId, projectId),
              eq(projectMembers.userId, userId)
            )
          );
    
        if (!membership || membership.role !== "owner") {
          return res.status(403).json({ error: "You are not the owner of this project" });
        }
    
        next();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

export const isTaskMember = async (req, res, next) => {
    try {
        const taskId = req.params.id || req.body.taskId;
        const userId = req.user.id;

        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required" });
        }

        const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        const [membership] = await db
            .select()
            .from(projectMembers)
            .where(
                and(
                    eq(projectMembers.projectId, task.projectId),
                    eq(projectMembers.userId, userId)
                )
            );

        if (!membership) {
            return res.status(403).json({ error: "You are not a member of this project" });
        }

        req.projectRole = membership.role;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};