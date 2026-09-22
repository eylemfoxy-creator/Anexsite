import type { SiteLang } from "@/lib/types";

const DEEPL_CODES: Record<SiteLang, string> = {
  EN: "EN",
  DE: "DE",
  TR: "TR",
  RU: "RU",
  ZH: "ZH-HANS"
};

export type TranslationResult = {
  text: string;
  status: "not_needed" | "translated" | "unavailable" | "failed";
};

export async function translateText(
  text: string,
  source: SiteLang,
  target: SiteLang
): Promise<TranslationResult> {
  if (source === target) return { text, status: "not_needed" };

  const key = process.env.DEEPL_API_KEY?.trim();
  if (!key) return { text, status: "unavailable" };

  const base = (process.env.DEEPL_API_URL || "https://api-free.deepl.com").replace(/\/+$/, "");

  try {
    const body = new URLSearchParams();
    body.set("text", text);
    body.set("source_lang", DEEPL_CODES[source].replace("-HANS", ""));
    body.set("target_lang", DEEPL_CODES[target]);

    const response = await fetch(`${base}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${key}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) return { text, status: "failed" };

    const data = (await response.json()) as {
      translations?: Array<{ text?: string }>;
    };
    const translated = data.translations?.[0]?.text?.trim();
    return translated
      ? { text: translated, status: "translated" }
      : { text, status: "failed" };
  } catch {
    return { text, status: "failed" };
  }
}
