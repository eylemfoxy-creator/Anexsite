import { NextRequest, NextResponse } from "next/server";
import { createVisitorRoom, verifyVisitorCookie, VISITOR_COOKIE, visitorCookieOptions } from "@/lib/visitor-auth";
import { enforceRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, hashClientIp } from "@/lib/security";
import { isSiteLang } from "@/lib/chat";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const ipHash = hashClientIp(request);
    await enforceRateLimit({ key: `chat-start:${ipHash}`, limit: 5, windowSeconds: 3600 });

    const body = (await request.json().catch(() => null)) as {
      lang?: unknown;
      companyWebsite?: unknown;
    } | null;

    if (!body || !isSiteLang(body.lang)) {
      return NextResponse.json({ error: "invalid_language" }, { status: 400 });
    }
    if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
      return NextResponse.json({ error: "rejected" }, { status: 400 });
    }

    const existing = await verifyVisitorCookie(request);
    if (existing) return NextResponse.json({ roomId: existing.roomId, lang: existing.visitorLang });

    const { roomId, token } = await createVisitorRoom(body.lang, ipHash);
    const response = NextResponse.json({ roomId, lang: body.lang });
    response.cookies.set(VISITOR_COOKIE, `${roomId}.${token}`, visitorCookieOptions());
    return response;
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("chat start failed", error);
    return NextResponse.json({ error: "chat_start_failed" }, { status: 500 });
  }
}
