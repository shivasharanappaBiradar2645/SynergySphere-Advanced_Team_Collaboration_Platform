import { db } from "../db/db.mjs";
import { discussions, discussionMessages } from "../db/schema.mjs";
import { and, eq } from "drizzle-orm";

export const createDiscussion = async (req, res) => {
    try {
        const { projectId, title } = req.body;
        const result = await db.insert(discussions).values({
            projectId,
            title,
        }).returning();
        res.json({ success: true, data: result[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getDiscussions = async (req, res) => {
    try {
        const { projectId } = req.params;
        const results = await db.select().from(discussions).where(eq(discussions.projectId, projectId));
        res.json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const addMessage = async (req, res) => {
    try {
        const { discussionId, message } = req.body;
        const userId = req.user.id;

        if (!discussionId) {
            return res.status(400).json({ success: false, error: "Discussion ID is required" });
        }

        const result = await db.insert(discussionMessages).values({
            discussionId,
            userId,
            message,
        }).returning();
        res.json({ success: true, data: result[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const results = await db.select().from(discussionMessages).where(eq(discussionMessages.discussionId, discussionId));
        res.json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
