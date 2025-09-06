import express from "express";
import { createTask, listTasks, updateTasks, deleteTasks } from "../controllers/task.controller.mjs";
import { validate } from "../middlewares/validate.mjs";
import { taskSchema} from "../validators/task.validators.mjs";
import { isProjectMember, isTaskMember } from "../middlewares/authz.mjs";
import { auth } from "../middlewares/auth.mjs";
const router = express.Router();

router.post("/create",auth,isProjectMember,validate(taskSchema),createTask);
router.post("/list",auth,isProjectMember,listTasks);
router.put("/update",auth,isTaskMember,updateTasks);
router.delete("/delete",auth,isTaskMember,deleteTasks);

export default router;
