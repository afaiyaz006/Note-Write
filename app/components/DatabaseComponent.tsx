
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
  pgTable,
  uuid,
  text,
  timestamp,

} from 'drizzle-orm/pg-core';


// Use this object to send drizzle queries to  DB
const db = drizzle(sql);
//pgTable that maps to the notes table  in  DB
const notesTable = pgTable(
  "notes", {
  note_id: uuid('note_id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  email: text('email').notNull(),
  date: timestamp('date').defaultNow().notNull()
  }
)
export  { db,notesTable };

