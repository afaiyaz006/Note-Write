"use server";

import { getServerSession } from "next-auth";
import { db, notesTable } from "../../../components/DatabaseComponent";
import { like } from "drizzle-orm";
import { authOptions } from "../../auth/[...nextauth]/route";

// Let's initialize it as null initially, and we will assign the actual database instance later.

// Define the GET request handler function
export async function GET(req, { params }) {
  // Check if the database instance has been initialized

  const note_id = params.note_id;
  const session = await getServerSession(authOptions);
  if (session) {
    // Removed parseInt check for UUID
    const notes = await db
      .select()
      .from(notesTable)
      .where(like(notesTable.note_id, note_id))
      
    //console.log(notes)
    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(notes), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
  // ... existing code ...
}