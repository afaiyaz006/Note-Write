'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { sql } from 'drizzle-orm';
import { db, notesTable } from '../../components/DatabaseComponent';

export async function POST(req, res) {
    const session = await getServerSession(authOptions);

    if (req.method === "POST" && session) {
        const formData = await req.formData();
        const title = formData.get('title');
        const content = formData.get('content');

        try {
            // Insert new note with the generated UUID
            const respond = await db.insert(notesTable).values({
                title: title,
                content: content,
                email: session["user"]["email"],
            }).returning();
            console.log(respond)
            return new Response(JSON.stringify([{ "SUCCESS": "Note created successfully", "note_id": respond[0].note_id }]), {
                headers: { "Content-Type": "application/json" },
                status: 201, // Created
            });
        } catch (error) {
            console.error("Database error:", error);
            return new Response(JSON.stringify([{ "FAILED": "Database error" }]), {
                headers: { "Content-Type": "application/json" },
                status: 500, // Internal Server Error
            });
        }
    } else {
        return new Response(JSON.stringify([{ "FAILED": "NOT OK" }]), {
            headers: { "Content-Type": "application/json" },
            status: 400, // Bad Request
        });
    }
}