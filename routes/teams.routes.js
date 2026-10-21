import express from "express";
import {
  createTeam,
  getAllTeams,
  getMyTeams,
  deleteTeam,
} from "../controllers/team.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTeam);
router.get("/teams", authMiddleware, getAllTeams);
router.get("/", authMiddleware, getMyTeams);
router.delete("/:id", authMiddleware, deleteTeam);

export default router;
