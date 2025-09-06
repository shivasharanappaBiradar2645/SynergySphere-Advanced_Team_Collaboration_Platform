import express from "express";
import { auth } from "../middleware/auth.mjs";
import { notificationStream, getUnread, markAsRead } from "../controllers/notificationController.mjs";

const router = express.Router();

router.get("/stream", auth, notificationStream);


router.get("/", auth, getUnread);        
router.patch("/:id/read", auth, markAsRead);  

export default router;