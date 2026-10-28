import express from "express";
import userRouter from "./user.routes.js";
import teamRouter from "./teams.routes.js";
import documentRouter from "./document.routes.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/teams", teamRouter);
router.use("/documents", documentRouter);

export default router;
