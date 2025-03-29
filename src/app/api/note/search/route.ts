import { headers } from "next/headers";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";
import { db } from "../../../../db/drizzle";
import { note } from "@/db/schema/note-schema";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchContent = searchParams.get("query");
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //TODO: ADD VALIDATION FOR searchContent otherwise there are risk of sql injection
  if (session && searchContent) {
    const searchKeywords = searchContent.replace(/\s+/g, " & ");
    const response = await db
      .select({
        id: note.id,
        title: note.title,
      })
      .from(note)
      .where(
        sql`to_tsvector('english', ${note.title}) @@ to_tsquery('english', ${searchKeywords})`
      );

    if (!response) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
    }
    return NextResponse.json(response || [{}]);
  } else {
    return NextResponse.json({ error: "Invalid Request" }, { status: 500 });
  }
}
