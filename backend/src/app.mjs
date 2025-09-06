import express from "express";
import cors from "cors";

import useroutes from "./routes/user.routes.mjs"

app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users",useroutes);

export default app;