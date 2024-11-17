"use server";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";
import { db, notesTable } from "../../../../components/DatabaseComponent";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(req, { params }) {

  const note_id = params.note_id;
  const session = await getServerSession(authOptions);
  // console.log(note_id);
  if (session) {
    // Removed parseInt check for UUID
    if (note_id) { // Check if note_id is provided
      const notes = await db
        .delete(notesTable)
        .where(eq(notesTable.note_id, note_id)).returning();
      
      //console.log("DELETED"+notes)
      return new Response(JSON.stringify([{"DELETED":"OK"}]), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }
    else {
      return new Response(JSON.stringify([{"BAD REQUEST":"BAD"}]), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }
  }
  else {
    return new Response(JSON.stringify([{"ERROR":"ACCESS DENIED"}]), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  }
}
