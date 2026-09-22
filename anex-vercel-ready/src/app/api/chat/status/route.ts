import { NextResponse } from "next/server";
import { operatorOnline } from "@/lib/chat";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ online: await operatorOnline() });
  } catch {
    return NextResponse.json({ online: false });
  }
}
