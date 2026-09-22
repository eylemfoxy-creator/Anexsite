import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anexglobal.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ANEX | International Tax & European Tax Advisory",
    template: "%s | ANEX"
  },
  description:
    "London-based cross-border advisory for international tax, European tax law, company formation and tax disputes, with a five-language digital advisory desk.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "ANEX | International Tax & European Tax Advisory",
    description:
      "International tax, European tax law, company formation and tax disputes with a five-language digital advisory desk.",
    images: ["/assets/legacy/full188-p001-img02-MALI-VE-HUKUK-DANISMANLIK-LIMITED-SIRKETI-INGILTER.jpeg"]
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/assets/brand/anex-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/brand/anex-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/assets/brand/anex-180.png", sizes: "180x180", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#0e1714",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
