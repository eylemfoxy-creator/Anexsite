import fs from "node:fs";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const schema = fs.readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
const sql = postgres(url, { max: 1, prepare: false, ssl: "require" });

try {
  await sql.unsafe(schema);
  console.log("ANEX database schema applied.");
} finally {
  await sql.end({ timeout: 5 });
}
