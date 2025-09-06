import express from "express";
import { createProject, listProjects, updateDescription, deleteProject, getProjectById, addMember, removeMember } from "../controllers/project.controller.mjs";
import { validate } from "../middlewares/validate.mjs";
import { projectSchema } from "../validators/project.validators.mjs";
import { isProjectOwner, isProjectMember } from "../middlewares/authz.mjs";
import { auth } from "../middlewares/auth.mjs";
const router = express.Router();

router.post("/create", auth, validate(projectSchema), createProject);
router.get("/list", auth, listProjects);
router.get("/:id", auth, isProjectMember, getProjectById);
router.put("/:id", auth, isProjectOwner, updateDescription);
router.delete("/:id", auth, isProjectOwner, deleteProject);

router.post("/:id/members", auth, isProjectOwner, addMember);
router.delete("/:id/members/:userId", auth, isProjectOwner, removeMember);

export default router;
