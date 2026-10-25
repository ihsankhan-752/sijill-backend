import { pgTable, pgEnum, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema.js";
import { teams } from "./teams.schema.js";

export const teamRoleEnum = pgEnum("team_role", ["owner", "editor", "viewer"]);

export const teamMembers = pgTable(
  "team_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references((users) => users.id),
    teamId: uuid("team_id")
      .notNull()
      .references((teams) => teams.id),
    role: teamRoleEnum("role").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.teamId, table.userId] })],
);
