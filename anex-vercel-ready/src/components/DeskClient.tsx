"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { OperatorRoom, PublicMessage } from "@/lib/types";

export function DeskClient() {
  const [rooms, setRooms] = useState<OperatorRoom[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<PublicMessage[]>([]);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const current = useMemo(() => rooms.find((room) => room.id === selected) ?? null, [rooms, selected]);

  const loadRooms = useCallback(async () => {
    const response = await fetch("/api/operator/rooms", { cache: "no-store" });
    if (response.status === 401) {
      window.location.assign("/desk/login");
      return;
    }
    if (!response.ok) return;
    const data = (await response.json()) as { rooms?: OperatorRoom[] };
    const next = data.rooms ?? [];
    setRooms(next);
    setSelected((old) => old ?? next[0]?.id ?? null);
  }, []);

  const loadMessages = useCallback(async (roomId: string) => {
    const response = await fetch(`/api/chat/messages?roomId=${encodeURIComponent(roomId)}`, {
      cache: "no-store"
    });
    if (response.status === 401) {
      window.location.assign("/desk/login");
      return;
    }
    if (!response.ok) return;
    const data = (await response.json()) as { messages?: PublicMessage[] };
    setMessages(data.messages ?? []);
  }, []);

  const heartbeat = useCallback(async () => {
    await fetch("/api/operator/presence", { method: "POST" }).catch(() => undefined);
  }, []);

  useEffect(() => {
    void loadRooms();
    void heartbeat();
    const roomTimer = window.setInterval(() => void loadRooms(), 4000);
    const presenceTimer = window.setInterval(() => void heartbeat(), 15000);
    return () => {
      window.clearInterval(roomTimer);
      window.clearInterval(presenceTimer);
    };
  }, [heartbeat, loadRooms]);

  useEffect(() => {
    if (!selected) {
      setMessages([]);
      return;
    }
    void loadMessages(selected);
    const timer = window.setInterval(() => void loadMessages(selected), 1800);
    return () => window.clearInterval(timer);
  }, [loadMessages, selected]);

  async function sendReply() {
    const value = reply.trim();
    if (!selected || !value || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: selected, text: value })
      });
      if (!response.ok) throw new Error("send_failed");
      setReply("");
      await loadMessages(selected);
      await loadRooms();
    } catch {
      setError("Reply could not be sent.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/operator/logout", { method: "POST" });
    window.location.assign("/desk/login");
  }

  return (
    <main className="desk-shell">
      <aside className="desk-rooms">
        <header>
          <div className="brand-mark">ANEX</div>
          <strong>Live conversations</strong>
          <div className="desk-status-row">
            <span className="desk-live">Online</span>
            <button type="button" onClick={() => void logout()}>Sign out</button>
          </div>
        </header>
        <div className="desk-room-list">
          {rooms.length ? rooms.map((room) => (
            <button
              type="button"
              className="desk-room"
              data-active={room.id === selected ? "true" : "false"}
              key={room.id}
              onClick={() => setSelected(room.id)}
            >
              <span>{room.visitorLang === "ZH" ? "中" : room.visitorLang}</span>
              <strong>{room.lastMessage || "New conversation"}</strong>
              <small>{new Date(room.updatedAt).toLocaleString()}</small>
            </button>
          )) : <p className="desk-empty">No conversations yet.</p>}
        </div>
      </aside>

      <section className="desk-thread">
        {current ? (
          <>
            <header>
              <strong>Conversation</strong>
              <small>{current.visitorLang} · {current.id}</small>
            </header>
            <div className="desk-messages">
              {messages.map((message) => (
                <article key={message.id} data-visitor={message.sender === "visitor" ? "true" : "false"}>
                  <small>
                    {message.sender === "visitor" ? `VISITOR · ${message.originalLang}` : "ANEX · TR"}
                    {message.translationStatus === "translated" ? " · translated" : ""}
                  </small>
                  <p>{message.text}</p>
                  {message.originalText && message.originalText !== message.text ? (
                    <details>
                      <summary>Original message</summary>
                      <p>{message.originalText}</p>
                    </details>
                  ) : null}
                  {(message.translationStatus === "unavailable" || message.translationStatus === "failed") ? (
                    <small>Translation unavailable: showing original text.</small>
                  ) : null}
                </article>
              ))}
            </div>
            <div className="desk-compose">
              <label htmlFor="desk-reply">Reply in Turkish</label>
              <textarea
                id="desk-reply"
                rows={4}
                maxLength={2500}
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Türkçe yanıtınızı yazın…"
              />
              <div>
                <small>{error || "Your Turkish reply is translated to the visitor's language when DeepL is configured."}</small>
                <button type="button" disabled={busy || !reply.trim()} onClick={() => void sendReply()}>
                  {busy ? "Sending…" : "Send reply"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="desk-select">Select a conversation.</div>
        )}
      </section>
    </main>
  );
}
