
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Use this object to send drizzle queries to your DB
const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB
const notesTable = pgTable(
  "notes", {
    note_id: text('note_id'),
    title: text('title'),
    content: text('content'),
    email: text('email')
  }

);
export  { db,notesTable };

