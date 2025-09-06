import { db } from "../db/db.mjs";
import { projectMembers, projects } from "../db/schema.mjs";
import { asc, eq } from "drizzle-orm";

export const createProject = async (req , res) => {
    try{
    const {name, description} = req.body;
    const userId = req.user.id;
    const result = await db.insert(projects).values({
        name,description,
        createdBy: userId,
    }).returning();

    await db.insert(projectMembers).values({
        projectId: result[0].id,
        userId,
        role:"owner",

    })

    res.json({message:"created", project: result[0]})

}catch (err){
    res.status(500).json({error: err.message});
}
}


export const listProjects = async (req,res)=> {
    try{
        const userId = req.user.id;
        const results = await db.select().from(projectMembers).where(eq(projectMembers.userId,userId)).leftJoin(projects,eq(projectMembers.projectId, projects.id));
        res.json(results.map(r => r.projects))
    } catch(err){
        res.status(500).json({error: err.message});
    }
}