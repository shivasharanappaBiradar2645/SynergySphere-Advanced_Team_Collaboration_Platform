import express from "express";
import { createTask, listTasks, updateTasks, deleteTasks } from "../controllers/task.controller.mjs";
import { validate } from "../middlewares/validate.mjs";
import { taskSchema} from "../validators/task.validators.mjs";
import { isProjectMember,canAccessTask } from "../middlewares/authz.mjs";
const router = express.Router();

router.post("/create",isProjectMember,validate(taskSchema),createTask);
router.get("/list",isProjectMember,listTasks);
router.put("/update",canAccessTask,updateTasks);
router.delete("/delete",canAccessTask,deleteTasks);

export default router;
