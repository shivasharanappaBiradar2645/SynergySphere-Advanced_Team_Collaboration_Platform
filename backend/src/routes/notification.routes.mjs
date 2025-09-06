import express from "express";
import { auth } from "../middlewares/auth.mjs";
import { notificationStream, getUnread, markAsRead } from "../controllers/notification.controller.mjs";

const router = express.Router();

router.get("/stream", auth, notificationStream);


router.get("/", auth, getUnread);        
router.patch("/:id/read", auth, markAsRead);  

export default router;