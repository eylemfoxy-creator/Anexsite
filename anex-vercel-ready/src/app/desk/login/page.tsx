import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DeskLoginForm } from "@/components/DeskLoginForm";
import { hasOperatorSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Operator Login",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function DeskLoginPage() {
  if (await hasOperatorSession()) redirect("/desk");

  return (
    <main className="desk-login">
      <section>
        <div className="brand-mark">ANEX</div>
        <h1>Operator Desk</h1>
        <p>Private access for the ANEX digital advisory desk.</p>
        <DeskLoginForm />
      </section>
    </main>
  );
}
