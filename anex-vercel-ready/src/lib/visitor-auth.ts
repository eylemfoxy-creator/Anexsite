import crypto from "node:crypto";
import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { randomToken, sha256 } from "@/lib/security";
import type { SiteLang } from "@/lib/types";

export const VISITOR_COOKIE = "anex_chat_session";

export async function createVisitorRoom(lang: SiteLang, ipHash: string) {
  const roomId = crypto.randomUUID();
  const token = randomToken(32);
  const tokenHash = sha256(token);

  await sql`
    INSERT INTO chat_rooms (id, visitor_lang, visitor_token_hash, ip_hash)
    VALUES (${roomId}, ${lang}, ${tokenHash}, ${ipHash})
  `;

  return { roomId, token };
}

export async function verifyVisitorCookie(
  request: NextRequest,
  expectedRoomId?: string
): Promise<{ roomId: string; visitorLang: SiteLang } | null> {
  const raw = request.cookies.get(VISITOR_COOKIE)?.value;
  if (!raw) return null;
  const dot = raw.indexOf(".");
  if (dot <= 0) return null;

  const roomId = raw.slice(0, dot);
  const token = raw.slice(dot + 1);
  if (expectedRoomId && roomId !== expectedRoomId) return null;

  const rows = await sql<{ id: string; visitor_lang: SiteLang }[]>`
    SELECT id, visitor_lang
    FROM chat_rooms
    WHERE id = ${roomId}
      AND visitor_token_hash = ${sha256(token)}
      AND status = 'open'
    LIMIT 1
  `;
  const row = rows[0];
  return row ? { roomId: row.id, visitorLang: row.visitor_lang } : null;
}

export async function requireVisitorRoom(request: NextRequest, roomId?: string) {
  const session = await verifyVisitorCookie(request, roomId);
  if (!session) throw new Response("Unauthorized", { status: 401 });
  return session;
}

export function visitorCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  };
}
