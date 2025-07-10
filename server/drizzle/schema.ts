import { pgTable, uuid, text, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const rooms = pgTable("rooms", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const questions = pgTable("questions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	question: text().notNull(),
	answer: text(),
	roomId: uuid("room_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.roomId],
			foreignColumns: [rooms.id],
			name: "questions_room_id_rooms_id_fk"
		}),
]);
