import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
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

export  { db,notesTable };