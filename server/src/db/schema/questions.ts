import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text().notNull(),
  answer: text(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
