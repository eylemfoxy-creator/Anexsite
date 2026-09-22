import { NextRequest, NextResponse } from "next/server";
import { requireOperatorRequest } from "@/lib/auth";
import { updateOperatorPresence } from "@/lib/chat";
import { assertSameOrigin } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await requireOperatorRequest(request);
    await updateOperatorPresence();
    return NextResponse.json({ ok: true, at: new Date().toISOString() });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "presence_failed" }, { status: 500 });
  }
}
