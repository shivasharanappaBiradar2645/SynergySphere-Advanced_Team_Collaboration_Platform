import { db } from "../db/db.mjs";
import { projectMembers, projects, tasks, notifications } from "../db/schema.mjs";
import { and, eq } from "drizzle-orm";
import { sendNotification } from "./notification.controller.mjs";

export const createProject = async (req , res) => {
    try{
    const {name, description, tags} = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const userId = req.user.id;
    const result = await db.insert(projects).values({
        name,description, tags, imageUrl,
        createdBy: userId,
    }).returning();

    await db.insert(projectMembers).values({
        projectId: result[0].id,
        userId,
        role:"owner",

    })

    res.json({success: true, data: { project: result[0] }})

}catch (err){
    res.status(500).json({success: false, error: err.message});
}
}


export const listProjects = async (req,res)=> {
    try{
        const userId = req.user.id;
        const results = await db.select().from(projectMembers).where(and(eq(projectMembers.userId,userId),eq(projects.deleted,0))).leftJoin(projects,eq(projectMembers.projectId, projects.id));
        res.json({success: true, data: results.map(r => r.projects)})
    } catch(err){
        res.status(500).json({success: false, error: err.message});
    }
}

export const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const [project] = await db.select().from(projects).where(and(eq(projects.id, projectId), eq(projects.deleted, 0)));
        const projectTasks = await db.select().from(tasks).where(eq(tasks.projectId, projectId));

        res.json({success: true, data: { project, tasks: projectTasks } });
    } catch (err) {
        res.status(500).json({success: false, error: err.message });
    }
};

export const addMember = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { userId, role } = req.body;
        await db.insert(projectMembers).values({
            projectId,
            userId,
            role,
        });

        const [project] = await db.select().from(projects).where(eq(projects.id, projectId));
        const message = `You have been added to a new project: ${project.name}`;
        const notification = await db.insert(notifications).values({
            userId,
            projectId,
            message,
            type: "PROJECT_INVITE"
        }).returning();
        sendNotification(userId, notification[0]);

        res.json({ success: true, message: "Member added" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const removeMember = async (req, res) => {
    try {
        const { id, userId } = req.params;
        await db.delete(projectMembers).where(and(eq(projectMembers.projectId, id), eq(projectMembers.userId, userId)));
        res.json({ success: true, message: "Member removed" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const updateDescription = async (req, res)=> {
    try{
        const projectId = req.params.id;
        const {description} = req.body;
        await db.update(projects).set({description: description}).where(eq(projects.id,projectId));
        res.json({success: true, message:"successful"});
    } catch (err){
        res.status(500).json({success: false, error: err.message});
    }
};


export const deleteProject = async (req, res) => {
    try{
        const projectId = req.params.id;
        await db.update(projects).set({
            deleted: 1
        }).where(eq(projectId,projects.id));
        res.json({success: true, message:"deleted"});
    } catch (err){
        res.status(500).json({success: false, error:err.message});
    }
};