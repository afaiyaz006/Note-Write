'use server'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { text,integer,sqliteTable } from 'drizzle-orm/sqlite-core';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { like } from 'drizzle-orm';


// Let's initialize it as null initially, and we will assign the actual database instance later.

// Define the GET request handler function
export async function GET(req, res) {
  
  // Check if the database instance has been initialized
  const session = await getServerSession(authOptions)
  if (session){
    const sqlite = new Database('sqlite.db'); 
    const db: BetterSQLite3Database = drizzle(sqlite);
    const notesTable=sqliteTable("notes",{
      note_id:text('note_id'),
      title:text('title'),
      content:text('content'),
      email:text('email')
    })
    const notes=db.select().from(notesTable).where(like(notesTable.email,session.user?.email)).all()
    
    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(notes), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
  else{
    return new Response(JSON.stringify([{}]),{
        headers:{"Content-Type":"application/json"},
        status:200,
    })
  }
}
