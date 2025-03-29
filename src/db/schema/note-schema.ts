import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema"; // Assuming the previous schemas are in an auth.ts file

export const note = pgTable("note", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: jsonb().default({ content: "N/A" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
