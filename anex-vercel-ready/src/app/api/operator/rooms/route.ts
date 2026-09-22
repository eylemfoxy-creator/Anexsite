import { NextRequest, NextResponse } from "next/server";
import { requireOperatorRequest } from "@/lib/auth";
import { listOperatorRooms } from "@/lib/chat";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await requireOperatorRequest(request);
    return NextResponse.json({ rooms: await listOperatorRooms() });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "rooms_failed" }, { status: 500 });
  }
}
