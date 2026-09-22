import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DeskClient } from "@/components/DeskClient";
import { hasOperatorSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Operator Desk",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function DeskPage() {
  if (!(await hasOperatorSession())) redirect("/desk/login");
  return <DeskClient />;
}
