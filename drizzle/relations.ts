import { relations } from "drizzle-orm/relations";
import { user, account, session, note } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	notes: many(note),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const noteRelations = relations(note, ({one}) => ({
	user: one(user, {
		fields: [note.userId],
		references: [user.id]
	}),
}));