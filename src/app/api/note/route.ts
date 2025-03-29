import { headers } from "next/headers";
import { auth } from "../../../../auth";
import { NextResponse } from "next/server";
import { db } from "../../../db/drizzle";
import { note } from "@/db/schema/note-schema";
import { and, eq } from "drizzle-orm";
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const data = await request.json();
    const title = data.title;
    const document = data.content;
    const response = await db
      .insert(note)
      .values({ userId: session.user.id, title: title, content: document })
      .returning();
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "You naughty" }, { status: 500 });
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("noteId");
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //TODO: ADD VALIDATION FOR noteId
  if (session && noteId) {
    console.info(`Note id: ${noteId}`);
    const response = await db.select().from(note).where(eq(note.id, noteId));

    if (!response) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
    }
    if (response.length === 0) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
    }
    return NextResponse.json(response[0]);
  } else {
    return NextResponse.json({ error: "Invalid Request" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("noteId");
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //TODO: ADD VALIDATION FOR noteId
  if (session) {
    console.info(`Note id to be updated: ${noteId}`);
    const data = await request.json();
    const title = data.title;
    const document = data.content;
    const response = await db
      .update(note)
      .set({ title: title, content: document })
      .where(
        and(eq(note.id, noteId as string), eq(note.userId, session.user.id))
      )
      .returning({ updatedId: note.id });

    if (!response) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
    }
    return NextResponse.json(response[0] || {});
  } else {
    return NextResponse.json({ error: "Invalid Request" }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("noteId");
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //TODO: ADD VALIDATION FOR noteId
  if (session) {
    console.info(`Note id to be deleted: ${noteId}`);
    const response = await db
      .delete(note)
      .where(
        and(eq(note.id, noteId as string), eq(note.userId, session.user.id))
      )
      .returning({ deletedId: note.id });

    if (!response) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
    }
    return NextResponse.json(response[0] || {});
  } else {
    return NextResponse.json({ error: "Invalid Request" }, { status: 500 });
  }
}
