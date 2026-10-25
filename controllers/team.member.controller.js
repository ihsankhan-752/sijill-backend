import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { teamMembers } from "../db/schema/teams.members.schema.js";
import { teams } from "../db/schema/teams.schema.js";
import { users } from "../db/schema/user.schema.js";
import { asyncHandler } from "../utils/async.handler.js";
import AppError from "../utils/App.Error.js";

export const addMember = asyncHandler(async (req, res) => {
  const teamId = req.params.teamId;
  const { userId } = req.body ?? {};

  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  await db
    .insert(teamMembers)
    .values({
      userId: userId,
      teamId: teamId,
      role: "viewer",
    })
    .returning({ teamId: teamMembers.teamId, userId: teamMembers.userId });

  return res.status(201).json({ success: true, message: "Member Added" });
});

export const getTeamMembers = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  const [team] = await db.select().from(teams).where(eq(teams.id, teamId));

  if (!team) {
    throw new AppError("No Team Found", 404);
  }

  const members = await db
    .select({
      userId: users.id,
      username: users.username,
      email: users.email,
      role: teamMembers.role,
      joinedAt: teamMembers.joinedAt,
    })
    .from(teamMembers)
    .leftJoin(users, eq(teamMembers.userId, users.id))
    .where(eq(teamMembers.teamId, teamId));

  return res.status(200).json({
    success: true,
    team: {
      id: team.id,
      name: team.name,
      createdAt: team.createdAt,
      members,
    },
  });
});
