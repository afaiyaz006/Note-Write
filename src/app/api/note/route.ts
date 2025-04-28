import { headers } from "next/headers";
import { auth } from "../../../../auth";
import { NextResponse } from "next/server";
import { db } from "../../../db/drizzle";
import { note } from "@/db/schema/note-schema";
import { and, eq } from "drizzle-orm";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function saveToEmbedding(
  userName: string,
  title: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  noteContent: any
) {
  let texts: string[] = [];
  texts.push(`The user ${userName} has written the note titled ${title}`);
  for (let i = 0; i < noteContent.length; i += 1) {
    for (let j = 0; j < noteContent[i].content.length; j += 1) {
      const paragraph = noteContent[i].content[j].text || "";

      texts = texts.concat(paragraph);
    }
  }
  console.log(texts);
  const response = await axios.post(
    process.env.EMBEDDING_API_URL + "/hf-embed",
    {
      user: userName,
      texts: texts,
    }
  );
  if (response.status === 200) {
    console.log("Embedding stored.");
  } else {
    console.log("request failed");
  }
  return response;
}
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
    const username = session.user.name;
    setTimeout(async () => {
      await saveToEmbedding(username, title, document);
    }, 1);
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
