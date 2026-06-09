import type { Metadata } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

// UI / body — neutral workhorse for forms, tables, dense app UI.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Display / headings — Scandinavian grotesque, grain-style heavy weights.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bedrift Utility — Timeplaner uten kaos",
  description:
    "Bedrift Utility samler tilgjengelighet, vaktplanlegging og timetelling på ett sted — så du bruker tiden på teamet, ikke på regnearket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${inter.variable} ${schibsted.variable}`}>
      <body>{children}</body>
    </html>
  );
}
