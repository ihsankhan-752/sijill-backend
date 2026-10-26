import { pgTable, text, uuid, timestamp, bigint } from "drizzle-orm/pg-core";

import { users } from "./user.schema.js";
import { teams } from "./teams.schema.js";

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),

  teamId: uuid("team_id")
    .notNull()
    .references(() => teams.id),

  uploadedBy: uuid("uploaded_by")
    .notNull()
    .references(() => users.id),

  title: text("title").notNull(),
  description: text("description"),

  fileUrl: text("file_url").notNull(),
  filePublicId: text("file_public_id").notNull(),
  mimeType: text("mime_type").notNull(),

  sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),

  deletedAt: timestamp("deleted_at"),
});
