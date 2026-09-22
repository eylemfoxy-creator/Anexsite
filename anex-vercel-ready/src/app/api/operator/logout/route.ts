import { NextRequest, NextResponse } from "next/server";
import { OPERATOR_COOKIE, operatorCookieOptions, revokeOperatorSession } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await revokeOperatorSession(request.cookies.get(OPERATOR_COOKIE)?.value);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(OPERATOR_COOKIE, "", { ...operatorCookieOptions(), expires: new Date(0) });
    return response;
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "logout_failed" }, { status: 500 });
  }
}
