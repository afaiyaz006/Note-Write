import { headers } from "next/headers";
import { auth } from "../../../../../auth";
import { NextResponse } from "next/server";
import { db } from "../../../../db/drizzle";
import { note } from "@/db/schema/note-schema";
import { count, eq } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const userId = session.user.id;

    // Extract page and limit from query parameters
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;

    const offsetNumber = (page - 1) * limit;
    const totalCount = (
      await db
        .select({ count: count() })
        .from(note)
        .where(eq(note.userId, userId))
    )[0].count;
    // Fetch data with pagination
    const response = await db
      .select({
        id: note.id,
        title: note.title,
      })
      .from(note)
      .where(eq(note.userId, userId))
      .limit(limit)
      .offset(offsetNumber);

    return NextResponse.json({ notes: response, count: totalCount });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 501 });
  }
}
