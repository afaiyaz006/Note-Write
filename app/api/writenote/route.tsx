'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { like, sql } from 'drizzle-orm';
import {db,notesTable} from '../note/DatabaseComponent'

export async function POST(req,res) {
    const session = await getServerSession(authOptions)

  
    if (req.method=="POST" && session){
        const formData=await req.formData()
        const title=formData.get('title')
        const content=formData.get('content')
        const totalUserCount = await db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(notesTable);
        //console.log(totalUserCount)
        const respond=await db.insert(notesTable).values({ 
            note_id:totalUserCount[0]["count"]+1,
            title:title,
            content:content,
            email:session["user"]["email"],
        }).returning();
        //console.log("RESPONSE:")
        //console.log(respond)
        return new Response(JSON.stringify([{"SUCCESS":"OK"}]), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    }else{
        return new Response(JSON.stringify([{"FAILED":"NOT OK"}]), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    
    }
}