import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { randomToken, sha256 } from "@/lib/security";

export const OPERATOR_COOKIE = "anex_operator_session";

export async function verifyOperatorCredentials(email: string, password: string): Promise<boolean> {
  const configuredEmail = process.env.ANEX_OPERATOR_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ANEX_OPERATOR_PASSWORD_HASH?.trim();
  if (!configuredEmail || !passwordHash) return false;

  const emailBytes = Buffer.from(email.trim().toLowerCase());
  const expectedBytes = Buffer.from(configuredEmail);
  if (emailBytes.length !== expectedBytes.length) return false;
  if (!crypto.timingSafeEqual(emailBytes, expectedBytes)) return false;

  return bcrypt.compare(password, passwordHash);
}

export async function createOperatorSession(): Promise<{ token: string; expiresAt: Date }> {
  const token = randomToken(32);
  const tokenHash = sha256(token);
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);

  await sql`
    INSERT INTO operator_sessions (id, token_hash, expires_at)
    VALUES (${id}, ${tokenHash}, ${expiresAt.toISOString()})
  `;
  return { token, expiresAt };
}

export async function revokeOperatorSession(token: string | undefined): Promise<void> {
  if (!token) return;
  await sql`DELETE FROM operator_sessions WHERE token_hash = ${sha256(token)}`;
}

export async function isValidOperatorToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const rows = await sql<{ id: string }[]>`
    SELECT id
    FROM operator_sessions
    WHERE token_hash = ${sha256(token)}
      AND expires_at > NOW()
    LIMIT 1
  `;
  return Boolean(rows[0]);
}

export async function requireOperatorRequest(request: NextRequest): Promise<void> {
  const token = request.cookies.get(OPERATOR_COOKIE)?.value;
  if (!(await isValidOperatorToken(token))) {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export async function hasOperatorSession(): Promise<boolean> {
  const store = await cookies();
  return isValidOperatorToken(store.get(OPERATOR_COOKIE)?.value);
}

export function operatorCookieOptions(expiresAt?: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    expires: expiresAt
  };
}
