/*import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { text,integer,sqliteTable } from 'drizzle-orm/sqlite-core';

const sqlite = new Database('sqlite.db'); 
const db: BetterSQLite3Database = drizzle(sqlite);
const notesTable = sqliteTable("notes", {
  note_id: text('note_id'),
  title: text('title'),
  content: text('content'),
  email: text('email')
});

export  { db,notesTable };*/
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

