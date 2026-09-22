import { NextRequest, NextResponse } from "next/server";
import { requireOperatorRequest, isValidOperatorToken, OPERATOR_COOKIE } from "@/lib/auth";
import { addOperatorMessage, addVisitorMessage } from "@/lib/chat";
import { requireVisitorRoom } from "@/lib/visitor-auth";
import { enforceRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, cleanText, hashClientIp } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = (await request.json().catch(() => null)) as {
      roomId?: unknown;
      text?: unknown;
    } | null;
    if (!body) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

    const text = cleanText(body.text, 2500);
    const operatorToken = request.cookies.get(OPERATOR_COOKIE)?.value;

    if (await isValidOperatorToken(operatorToken)) {
      await requireOperatorRequest(request);
      if (typeof body.roomId !== "string" || !body.roomId) {
        return NextResponse.json({ error: "room_required" }, { status: 400 });
      }
      await enforceRateLimit({ key: `operator-message:${body.roomId}`, limit: 60, windowSeconds: 60 });
      await addOperatorMessage(body.roomId, text);
      return NextResponse.json({ ok: true });
    }

    const visitor = await requireVisitorRoom(
      request,
      typeof body.roomId === "string" ? body.roomId : undefined
    );
    const ipHash = hashClientIp(request);
    await enforceRateLimit({ key: `visitor-message:${visitor.roomId}`, limit: 18, windowSeconds: 60 });
    await enforceRateLimit({ key: `visitor-hour:${ipHash}`, limit: 120, windowSeconds: 3600 });
    await addVisitorMessage(visitor.roomId, visitor.visitorLang, text);

    return NextResponse.json({ ok: true, roomId: visitor.roomId });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("message failed", error);
    return NextResponse.json({ error: "message_failed" }, { status: 500 });
  }
}
