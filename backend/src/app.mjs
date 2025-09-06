import express from "express";
import cors from "cors";

import useroutes from "./routes/user.routes.mjs"
import projectroutes from "./routes/project.routes.mjs"
import taskroutes from "./routes/task.routes.mjs"
import notificationroutes from "./routes/notification.routes.mjs"
app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users",useroutes);
app.use("/projects",projectroutes);
app.use("/tasks",taskroutes);
app.use("/notifications", notificationRoutes);

export default app;