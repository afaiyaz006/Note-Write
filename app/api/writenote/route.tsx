'use server'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { text,integer,sqliteTable } from 'drizzle-orm/sqlite-core';
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
    
        const respond=await db.insert(notesTable).values({ 
            note_id:totalUserCount["count"]+1,
            title:title,
            content:content,
            email:session["user"]["email"],
        }).returning();

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