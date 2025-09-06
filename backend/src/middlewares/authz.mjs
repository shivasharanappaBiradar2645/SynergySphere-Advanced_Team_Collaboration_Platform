import { db } from "../db/db.mjs";
import { projectMembers } from "../db/schema.mjs";
import { and, eq } from "drizzle-orm";

export const isProjectMember = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.body.projectId;
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
        const projectId = req.params.id || req.body.projectId;
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