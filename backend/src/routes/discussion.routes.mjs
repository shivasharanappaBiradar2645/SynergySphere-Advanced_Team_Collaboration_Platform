import express from "express";
import { createDiscussion, getDiscussions, addMessage, getMessages } from "../controllers/discussion.controller.mjs";
import { auth } from "../middlewares/auth.mjs";
import { isProjectMember } from "../middlewares/authz.mjs";

const router = express.Router();

router.route("/").post(auth, isProjectMember, createDiscussion).get(auth, isProjectMember, getDiscussions);
router.post("/messages", auth, isProjectMember, addMessage);
router.get("/messages/:discussionId", auth, isProjectMember, getMessages);

export default router;
