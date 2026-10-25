import express from "express";
import {
  createTeam,
  getAllTeams,
  getMyTeams,
  deleteTeam,
} from "../controllers/team.controller.js";

import {
  addMember,
  getTeamMembers,
} from "../controllers/team.member.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { teamRoleMiddleware } from "../middlewares/team.role.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTeam);
router.get("/teams", authMiddleware, getAllTeams);
router.get("/", authMiddleware, getMyTeams);
router.delete("/:id", authMiddleware, deleteTeam);
router.get(
  "/:teamId/members",
  authMiddleware,
  teamRoleMiddleware("owner", "editor", "viewer"),
  getTeamMembers,
);

router.post(
  "/:teamId/members",
  authMiddleware,
  teamRoleMiddleware("owner"),
  addMember,
);

export default router;
