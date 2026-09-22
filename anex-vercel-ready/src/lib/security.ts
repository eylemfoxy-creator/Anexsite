import crypto from "node:crypto";
import type { NextRequest } from "next/server";

export function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function randomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("base64url");
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export function hashClientIp(request: NextRequest): string {
  const salt = process.env.RATE_LIMIT_SALT;
  if (!salt || salt.length < 16) {
    throw new Error("RATE_LIMIT_SALT must be configured with at least 16 characters.");
  }
  return sha256(`${salt}:${getClientIp(request)}`);
}

export function assertSameOrigin(request: NextRequest): void {
  const origin = request.headers.get("origin");
  if (!origin) return;
  const host = request.headers.get("host");
  if (!host) throw new Response("Forbidden", { status: 403 });

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new Response("Forbidden", { status: 403 });
  }
  if (originHost !== host) throw new Response("Forbidden", { status: 403 });
}

export function cleanText(value: unknown, max = 2500): string {
  if (typeof value !== "string") throw new Error("Text is required.");
  const text = value.replace(/\u0000/g, "").trim();
  if (!text || text.length > max) throw new Error(`Text must be between 1 and ${max} characters.`);
  return text;
}
