import { db } from "../db/index.js";
import { teams } from "../db/schema/teams.schema.js";
import { asyncHandler } from "../utils/async.handler.js";
import AppError from "../utils/App.Error.js";
import { teamValidation } from "../validations/team.validation.js";
import { and, eq } from "drizzle-orm";

export const createTeam = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const result = teamValidation.safeParse(req.body ?? {});

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    throw new AppError(message, 400);
  }

  const { name } = result.data;

  const [team] = await db
    .insert(teams)
    .values({
      name,
      ownerId: userId,
    })
    .returning({ id: teams.id });

  return res.status(201).json({ success: true, message: "Team created", team });
});

export const getAllTeams = asyncHandler(async (req, res) => {
  const team = await db.select({ id: teams.id, name: teams.name }).from(teams);

  return res.status(200).json({ success: true, team });
});

export const getMyTeams = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const team = await db
    .select({ name: teams.name })
    .from(teams)
    .where(eq(teams.ownerId, userId));

  return res.status(200).json({ success: true, team });
});

export const deleteTeam = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const [deletedTeam] = await db
    .delete(teams)
    .where(and(eq(teams.ownerId, userId), eq(teams.id, id)))
    .returning();

  if (!deletedTeam) {
    throw new AppError("No Team found", 404);
  }

  return res.status(200).json({ success: true, message: "Team deleted" });
});
