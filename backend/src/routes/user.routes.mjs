import express from "express";
import { login, register, getAllUsers } from "../controllers/user.controller.mjs";
import { validate } from "../middlewares/validate.mjs";
import { registerSchema, loginSchema } from "../validators/user.validators.mjs";
import { auth } from "../middlewares/auth.mjs";
const router = express.Router();

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.get("/", auth, getAllUsers);




export default router;
