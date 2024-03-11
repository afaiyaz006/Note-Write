'use server'

import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { text,integer,sqliteTable } from 'drizzle-orm/sqlite-core';
import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
export async function GET(req,  { params }) {
  
    // Check if the database instance has been initialized
      
      const note_id=params.note_id
      console.log(note_id)
      if (parseInt(note_id)>=0){
        const sqlite = new Database('sqlite.db'); 
        const db: BetterSQLite3Database = drizzle(sqlite);
        const notesTable=sqliteTable("notes",{
            note_id:text('note_id'),
            title:text('title'),
            content:text('content'),
            email:text('email')
          })
        const notes=await db.delete(notesTable).where(eq(notesTable.note_id,note_id))
        
        return new Response(JSON.stringify([{}]), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
      }
     

}