
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Use this object to send drizzle queries to  DB
const db = drizzle(sql);
//pgTable that maps to the notes table  in  DB
const notesTable = pgTable(
  "notes", {
    note_id: text('note_id').default(sql`uuid_generate_v4()`),
    title: text('title'),
    content: text('content'),
    email: text('email')
  }

);
export  { db,notesTable };

