import { headers } from "next/headers";
import { auth } from "../../../../auth";
import { NextResponse } from "next/server";
import { db } from "../../../db/drizzle";
import { note } from "@/db/schema/note-schema";
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(request);
  const results = db.select().from(note);
  console.log(results);
  if (session) {
    return NextResponse.json({ message: "OK" });
  } else {
    return NextResponse.json({ error: "You naughty naughty" }, { status: 500 });
  }
}
