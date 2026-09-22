import { sql } from "@/lib/db";

type RateLimitInput = {
  key: string;
  limit: number;
  windowSeconds: number;
};

export async function enforceRateLimit(input: RateLimitInput): Promise<void> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(nowSeconds / input.windowSeconds) * input.windowSeconds;

  const rows = await sql<{ count: number }[]>`
    INSERT INTO rate_limits (key, window_start, count, updated_at)
    VALUES (${input.key}, ${windowStart}, 1, NOW())
    ON CONFLICT (key, window_start)
    DO UPDATE SET count = rate_limits.count + 1, updated_at = NOW()
    RETURNING count
  `;

  const count = Number(rows[0]?.count ?? 1);
  if (count > input.limit) {
    throw new Response("Too many requests", {
      status: 429,
      headers: { "Retry-After": String(input.windowSeconds) }
    });
  }

  void sql`
    DELETE FROM rate_limits
    WHERE updated_at < NOW() - INTERVAL '2 days'
  `.catch(() => undefined);
}
