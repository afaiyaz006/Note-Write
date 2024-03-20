"use server";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { getServerSession } from "next-auth";
import { db, notesTable } from "../DatabaseComponent";
import { like } from "drizzle-orm";
import { authOptions } from "../../auth/[...nextauth]/route";

// Let's initialize it as null initially, and we will assign the actual database instance later.

// Define the GET request handler function
export async function GET(req, { params }) {
  // Check if the database instance has been initialized

  const note_id = params.note_id;
  const session = await getServerSession(authOptions);
  if (session) {
    if (parseInt(note_id) >= 0) {
      const notes = db
        .select()
        .from(notesTable)
        .where(like(notesTable.note_id, note_id))
        .all();

      // Return the items as a JSON response with status 200
      return new Response(JSON.stringify(notes), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }
  } else {
    return new Response(JSON.stringify([{"ERROR":"ACCESS DENIED"}]), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  }
}
