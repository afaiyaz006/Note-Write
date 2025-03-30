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
  //TODO: ADD VALIDATION FOR searchContent otherwise there are risk of sql injections
  if (session && searchContent) {
    // Extract page and limit from query parameters

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const offsetNumber = (page - 1) * limit;

    const response = await db
      .select({
        id: note.id,
        title: note.title,
      })
      .from(note)
      .where(
        sql`(
          setweight(to_tsvector('english', ${note.title}), 'A') ||
          setweight(to_tsvector('english', ${note.content}), 'B')
        ) @@ websearch_to_tsquery('english', ${searchContent})`
      )
      .limit(limit)
      .offset(offsetNumber);
    const totalCount = await db
      .select({
        totalCount: sql`count(*) OVER ()`,
      })
      .from(note)
      .where(
        sql`(
        setweight(to_tsvector('english', ${note.title}), 'A') ||
        setweight(to_tsvector('english', ${note.content}), 'B')
      ) @@ websearch_to_tsquery('english', ${searchContent})`
      );

    if (!response) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
    }
    if (totalCount.length === 0) {
      return NextResponse.json({
        notes: [{}],
        count: 0,
      });
    }
    return NextResponse.json({
      notes: response,
      count: totalCount[0].totalCount || 0,
    });
  } else {
    return NextResponse.json({ error: "Invalid Request" }, { status: 500 });
  }
}
