import express from "express";
import { login, register } from "../controllers/user.controller.mjs";
import { validate } from "../middlewares/validate.mjs";
import { registerSchema, loginSchema } from "../validators/user.validators.mjs";
const router = express.Router();

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);




export default router;
