import postgres from "postgres";

const globalForDb = globalThis as unknown as { __anexSql?: ReturnType<typeof postgres> };

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://placeholder:placeholder@127.0.0.1:5432/anex_placeholder";

export const sql =
  globalForDb.__anexSql ??
  postgres(connectionString, {
    max: 3,
    prepare: false,
    ssl: process.env.DATABASE_URL ? "require" : false,
    idle_timeout: 20,
    connect_timeout: 15
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__anexSql = sql;
}
