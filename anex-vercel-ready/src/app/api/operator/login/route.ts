import { NextRequest, NextResponse } from "next/server";
import { createOperatorSession, OPERATOR_COOKIE, operatorCookieOptions, verifyOperatorCredentials } from "@/lib/auth";
import { enforceRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, hashClientIp } from "@/lib/security";
import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const ipHash = hashClientIp(request);
    await enforceRateLimit({ key: `operator-login:${ipHash}`, limit: 8, windowSeconds: 900 });

    const body = (await request.json().catch(() => null)) as { email?: unknown; password?: unknown } | null;
    if (
      !body ||
      typeof body.email !== "string" ||
      typeof body.password !== "string" ||
      body.email.length > 320 ||
      body.password.length > 200
    ) {
      return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }

    if (!(await verifyOperatorCredentials(body.email, body.password))) {
      return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
    }

    await sql`DELETE FROM operator_sessions WHERE expires_at <= NOW()`;
    const { token, expiresAt } = await createOperatorSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(OPERATOR_COOKIE, token, operatorCookieOptions(expiresAt));
    return response;
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("operator login failed", error);
    return NextResponse.json({ error: "login_failed" }, { status: 500 });
  }
}
