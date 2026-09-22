import crypto from "node:crypto";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/translate";
import type { OperatorRoom, PublicMessage, SiteLang } from "@/lib/types";

export const LANGS: SiteLang[] = ["EN", "DE", "TR", "RU", "ZH"];

export function isSiteLang(value: unknown): value is SiteLang {
  return typeof value === "string" && LANGS.includes(value as SiteLang);
}

export async function operatorOnline(): Promise<boolean> {
  const rows = await sql<{ online: boolean }[]>`
    SELECT COALESCE(
      (SELECT last_seen > NOW() - INTERVAL '45 seconds'
       FROM operator_presence
       WHERE singleton = TRUE),
      FALSE
    ) AS online
  `;
  return Boolean(rows[0]?.online);
}

export async function updateOperatorPresence(): Promise<void> {
  await sql`
    INSERT INTO operator_presence (singleton, last_seen)
    VALUES (TRUE, NOW())
    ON CONFLICT (singleton)
    DO UPDATE SET last_seen = EXCLUDED.last_seen
  `;
}

export async function addVisitorMessage(
  roomId: string,
  visitorLang: SiteLang,
  text: string
): Promise<void> {
  const translated = await translateText(text, visitorLang, "TR");

  await sql`
    INSERT INTO chat_messages (
      id, room_id, sender, original_lang, original_text,
      operator_text, visitor_text, translation_status
    ) VALUES (
      ${crypto.randomUUID()}, ${roomId}, 'visitor', ${visitorLang}, ${text},
      ${translated.text}, ${text}, ${translated.status}
    )
  `;
  await sql`UPDATE chat_rooms SET updated_at = NOW() WHERE id = ${roomId}`;
}

export async function addOperatorMessage(roomId: string, text: string): Promise<void> {
  const rooms = await sql<{ visitor_lang: SiteLang }[]>`
    SELECT visitor_lang FROM chat_rooms
    WHERE id = ${roomId} AND status = 'open'
    LIMIT 1
  `;
  const visitorLang = rooms[0]?.visitor_lang;
  if (!visitorLang) throw new Error("Room not found.");

  const translated = await translateText(text, "TR", visitorLang);

  await sql`
    INSERT INTO chat_messages (
      id, room_id, sender, original_lang, original_text,
      operator_text, visitor_text, translation_status
    ) VALUES (
      ${crypto.randomUUID()}, ${roomId}, 'operator', 'TR', ${text},
      ${text}, ${translated.text}, ${translated.status}
    )
  `;
  await sql`UPDATE chat_rooms SET updated_at = NOW() WHERE id = ${roomId}`;
}

export async function getVisitorMessages(roomId: string): Promise<PublicMessage[]> {
  const rows = await sql<{
    id: string;
    sender: "visitor" | "operator";
    original_lang: SiteLang;
    original_text: string;
    visitor_text: string | null;
    translation_status: string;
    created_at: Date;
  }[]>`
    SELECT id, sender, original_lang, original_text, visitor_text,
           translation_status, created_at
    FROM chat_messages
    WHERE room_id = ${roomId}
    ORDER BY created_at ASC
    LIMIT 500
  `;

  return rows.map((row) => ({
    id: row.id,
    sender: row.sender,
    text: row.sender === "visitor" ? row.original_text : row.visitor_text || row.original_text,
    originalText: row.sender === "operator" ? row.original_text : undefined,
    originalLang: row.original_lang,
    translationStatus: row.translation_status,
    createdAt: row.created_at.toISOString()
  }));
}

export async function getOperatorMessages(roomId: string): Promise<PublicMessage[]> {
  const rows = await sql<{
    id: string;
    sender: "visitor" | "operator";
    original_lang: SiteLang;
    original_text: string;
    operator_text: string | null;
    translation_status: string;
    created_at: Date;
  }[]>`
    SELECT id, sender, original_lang, original_text, operator_text,
           translation_status, created_at
    FROM chat_messages
    WHERE room_id = ${roomId}
    ORDER BY created_at ASC
    LIMIT 500
  `;

  return rows.map((row) => ({
    id: row.id,
    sender: row.sender,
    text: row.sender === "visitor" ? row.operator_text || row.original_text : row.original_text,
    originalText:
      row.sender === "visitor" && row.operator_text !== row.original_text
        ? row.original_text
        : undefined,
    originalLang: row.original_lang,
    translationStatus: row.translation_status,
    createdAt: row.created_at.toISOString()
  }));
}

export async function listOperatorRooms(): Promise<OperatorRoom[]> {
  const rows = await sql<{
    id: string;
    visitor_lang: SiteLang;
    updated_at: Date;
    last_message: string | null;
  }[]>`
    SELECT r.id, r.visitor_lang, r.updated_at,
      (
        SELECT COALESCE(m.operator_text, m.original_text)
        FROM chat_messages m
        WHERE m.room_id = r.id
        ORDER BY m.created_at DESC
        LIMIT 1
      ) AS last_message
    FROM chat_rooms r
    WHERE r.status = 'open'
    ORDER BY r.updated_at DESC
    LIMIT 200
  `;

  return rows.map((row) => ({
    id: row.id,
    visitorLang: row.visitor_lang,
    updatedAt: row.updated_at.toISOString(),
    lastMessage: row.last_message
  }));
}
