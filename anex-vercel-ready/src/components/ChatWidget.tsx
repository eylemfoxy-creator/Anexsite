"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COPY } from "@/lib/i18n";
import type { PublicMessage, SiteLang } from "@/lib/types";

type StartResponse = { roomId?: string; lang?: SiteLang; error?: string };

export function ChatWidget({ lang }: { lang: SiteLang }) {
  const t = COPY[lang].chat;
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<PublicMessage[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);

  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/chat/status", { cache: "no-store" });
      const data = (await response.json()) as { online?: boolean };
      setOnline(Boolean(data.online));
    } catch {
      setOnline(false);
    }
  }, []);

  const ensureRoom = useCallback(async () => {
    if (roomId) return roomId;
    const response = await fetch("/api/chat/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, companyWebsite: "" })
    });
    const data = (await response.json()) as StartResponse;
    if (!response.ok || !data.roomId) throw new Error(data.error || "chat_start_failed");
    setRoomId(data.roomId);
    return data.roomId;
  }, [lang, roomId]);

  const loadMessages = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/chat/messages?roomId=${encodeURIComponent(id)}`, {
        cache: "no-store"
      });
      if (!response.ok) return;
      const data = (await response.json()) as { messages?: PublicMessage[] };
      setMessages(data.messages ?? []);
    } catch {
      // Polling retries automatically.
    }
  }, []);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("anex-open-chat", openChat);
    return () => window.removeEventListener("anex-open-chat", openChat);
  }, []);

  useEffect(() => {
    void checkStatus();
    const timer = window.setInterval(checkStatus, 15000);
    return () => window.clearInterval(timer);
  }, [checkStatus]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let poll: number | undefined;
    void ensureRoom()
      .then((id) => {
        if (cancelled) return;
        void loadMessages(id);
        poll = window.setInterval(() => void loadMessages(id), 2000);
      })
      .catch(() => setError(t.error));
    return () => {
      cancelled = true;
      if (poll) window.clearInterval(poll);
    };
  }, [open, ensureRoom, loadMessages, t.error]);


  useEffect(() => {
    if (!roomId) return;
    void fetch("/api/chat/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang })
    }).catch(() => undefined);
  }, [lang, roomId]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, open]);

  async function send() {
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    setError("");
    try {
      const id = await ensureRoom();
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: id, text: value })
      });
      if (!response.ok) throw new Error("send_failed");
      setText("");
      await loadMessages(id);
    } catch {
      setError(t.error);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="anex-chat">
      {open ? (
        <section className="anex-chat__panel" aria-label={t.title}>
          <header className="anex-chat__header">
            <div>
              <strong>{t.title}</strong>
              <span className="anex-chat__status" data-online={online ? "true" : "false"}>
                {online ? t.online : t.offline}
              </span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>

          <div className="anex-chat__messages" ref={messagesRef}>
            <p className="anex-chat__intro">{t.intro}</p>
            {messages.map((message) => (
              <article
                className="anex-chat__bubble"
                data-mine={message.sender === "visitor" ? "true" : "false"}
                key={message.id}
              >
                <p>{message.text}</p>
                {message.sender === "operator" &&
                (message.translationStatus === "unavailable" || message.translationStatus === "failed") ? (
                  <small>{t.translationUnavailable}</small>
                ) : null}
                <small>{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
              </article>
            ))}
          </div>

          <div className="anex-chat__compose">
            <label htmlFor="anex-chat-message">{t.placeholder}</label>
            <textarea
              id="anex-chat-message"
              rows={3}
              maxLength={2500}
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send();
                }
              }}
              placeholder={t.placeholder}
            />
            <div className="anex-chat__compose-row">
              <small>{error || t.privacy}</small>
              <button type="button" disabled={!text.trim() || sending} onClick={() => void send()}>
                {sending ? t.sending : t.send}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <button className="anex-chat__launcher" type="button" onClick={() => setOpen((value) => !value)}>
        <span className="anex-chat__dot" data-online={online ? "true" : "false"} />
        {t.launcher}
      </button>
    </div>
  );
}
