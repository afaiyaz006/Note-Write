'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { eq } from 'drizzle-orm';
import {db,notesTable} from '../../components/DatabaseComponent'

// Let's initialize it as null initially, and we will assign the actual database instance later.

// Define the GET request handler function
export async function GET(req, res) {
  
  
  const session = await getServerSession(authOptions)
  if (session){
    
    //const notes=db.select().from(notesTable).where(like(notesTable.email,session.user?.email))

    const notes=await db.select().from(notesTable).where(eq(notesTable.email,session.user?.email))
    //console.log(notes)
    // Return the items as a JSON response with status 200
    return new Response(JSON.stringify(notes), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
  else{
    return new Response(JSON.stringify([{"ERROR":"ACCESS DENIED"}]),{
        headers:{"Content-Type":"application/json"},
        status:401,
    })
  }
}
