import { NextRequest, NextResponse } from "next/server";
import { requireOperatorRequest, isValidOperatorToken, OPERATOR_COOKIE } from "@/lib/auth";
import { requireVisitorRoom } from "@/lib/visitor-auth";
import { getOperatorMessages, getVisitorMessages } from "@/lib/chat";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const roomId = request.nextUrl.searchParams.get("roomId") || undefined;
    const operatorToken = request.cookies.get(OPERATOR_COOKIE)?.value;
    const isOperator = await isValidOperatorToken(operatorToken);

    if (isOperator) {
      if (!roomId) return NextResponse.json({ error: "room_required" }, { status: 400 });
      await requireOperatorRequest(request);
      return NextResponse.json({ messages: await getOperatorMessages(roomId) });
    }

    const visitor = await requireVisitorRoom(request, roomId);
    return NextResponse.json({ roomId: visitor.roomId, messages: await getVisitorMessages(visitor.roomId) });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("messages failed", error);
    return NextResponse.json({ error: "messages_failed" }, { status: 500 });
  }
}
