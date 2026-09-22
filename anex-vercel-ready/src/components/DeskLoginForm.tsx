"use client";

import { FormEvent, useState } from "react";

export function DeskLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/operator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        setError(response.status === 429 ? "Too many attempts. Try again later." : "Invalid operator credentials.");
        return;
      }
      window.location.assign("/desk");
    } catch {
      setError("Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="desk-login__form">
      <label htmlFor="operator-email">Operator email</label>
      <input
        id="operator-email"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <label htmlFor="operator-password">Password</label>
      <input
        id="operator-password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit" disabled={busy}>{busy ? "Signing in…" : "Open desk"}</button>
      {error ? <p className="desk-error">{error}</p> : null}
    </form>
  );
}
