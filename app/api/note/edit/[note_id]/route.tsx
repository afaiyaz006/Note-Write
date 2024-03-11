'use server'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { text,integer,sqliteTable } from 'drizzle-orm/sqlite-core';
import { getServerSession } from 'next-auth';

import { eq, like } from 'drizzle-orm';


// Let's initialize it as null initially, and we will assign the actual database instance later.

// Define the GET request handler function
export async function POST(req,  { params }) {
  
  // Check if the database instance has been initialized
 
    const note_id=params.note_id
    if (parseInt(note_id)>=0){
    const sqlite = new Database('sqlite.db'); 
    const db: BetterSQLite3Database = drizzle(sqlite);
    const formData=await req.formData()
    const title=formData.get('title')
    const content=formData.get('content')
    

    const notesTable=sqliteTable("notes",{
      note_id:text('note_id'),
      title:text('title'),
      content:text('content'),
      email:text('email')
    })
    const notes= await db.update(notesTable).set({title:title,content:content}).where(eq(notesTable.note_id,note_id))
    
    console.log(notes)
    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify([{}]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
  else{
    return new Response(JSON.stringify([{}]), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
}

