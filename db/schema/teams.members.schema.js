import {
  pgTable,
  pgEnum,
  timestamp,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema.js";
import { teams } from "./teams.schema.js";

export const teamRoleEnum = pgEnum("team_role", ["owner", "editor", "viewer"]);

export const teamMembers = pgTable(
  "team_members",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id),
    role: teamRoleEnum("role").notNull(),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.teamId, table.userId] })],
);
