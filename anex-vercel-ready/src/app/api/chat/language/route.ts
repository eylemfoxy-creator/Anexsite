import { NextRequest, NextResponse } from "next/server";
import { isSiteLang } from "@/lib/chat";
import { requireVisitorRoom } from "@/lib/visitor-auth";
import { assertSameOrigin } from "@/lib/security";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = (await request.json().catch(() => null)) as { lang?: unknown } | null;
    if (!body || !isSiteLang(body.lang)) {
      return NextResponse.json({ error: "invalid_language" }, { status: 400 });
    }
    const session = await requireVisitorRoom(request);
    await sql`
      UPDATE chat_rooms
      SET visitor_lang = ${body.lang}, updated_at = NOW()
      WHERE id = ${session.roomId}
    `;
    return NextResponse.json({ ok: true, roomId: session.roomId, lang: body.lang });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "language_update_failed" }, { status: 500 });
  }
}
