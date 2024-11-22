
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import {
    pgTable,
    uuid,
    text,
    timestamp,
  } from 'drizzle-orm/pg-core';


export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);

export const users = table(
    "notes", {
       
    note_id:  uuid('note_id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    email: text('email').notNull(),
    date: timestamp('date').defaultNow().notNull()
  }
)