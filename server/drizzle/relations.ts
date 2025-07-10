import { relations } from "drizzle-orm/relations";
import { rooms, questions } from "./schema";

export const questionsRelations = relations(questions, ({one}) => ({
	room: one(rooms, {
		fields: [questions.roomId],
		references: [rooms.id]
	}),
}));

export const roomsRelations = relations(rooms, ({many}) => ({
	questions: many(questions),
}));