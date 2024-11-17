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
            // Check for existing note with the same title and user email
            const existingNote = await db
                .select()
                .from(notesTable)
                .where(sql`email = ${session["user"]["email"]} AND title = ${title}`)
                .limit(1)
                .execute();

            if (existingNote.length > 0) {
                return new Response(JSON.stringify([{ "FAILED": "Note with the same title already exists." }]), {
                    headers: { "Content-Type": "application/json" },
                    status: 409, // Conflict
                });
            }

            // Generate a new UUID for the note_id
            const noteId = await db.select(sql`SELECT uuid_generate_v4() AS id`).execute().then(res => res[0].id);


            // Insert new note with the generated UUID
            const respond = await db.insert(notesTable).values({
                note_id: noteId, // Use the generated UUID
                title: title,
                content: content,
                email: session["user"]["email"],
            }).returning();

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