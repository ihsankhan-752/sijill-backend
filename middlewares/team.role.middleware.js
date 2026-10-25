import AppError from "../utils/App.Error.js";
import { db } from "../db/index.js";
import { teamMembers } from "../db/schema/teams.members.schema.js";
import { and, eq } from "drizzle-orm";

export const teamRoleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const teamId = req.params.teamId;

      const [membership] = await db
        .select()
        .from(teamMembers)
        .where(
          and(eq(teamMembers.userId, userId), eq(teamMembers.teamId, teamId)),
        )
        .limit(1);

      if (!membership) {
        return next(new AppError("You are not a member of this team", 403));
      }

      if (membership.role !== requiredRole) {
        return next(new AppError("You do not have permission", 403));
      }

      next();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
