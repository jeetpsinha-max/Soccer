import type { Metadata } from "next";
import "./globals.css";
import { SeasonProvider } from "@/context/SeasonContext";
import { Navigation } from "@/components/ui/Navigation";

export const metadata: Metadata = {
  title: "Peddie Soccer SAC • Broadcast-Grade Tactical Analytics & Coaching Platform",
  description: "Official Strategic Analytics and Coaching (SAC) Platform for The Peddie School Varsity Soccer Program (2026-2027 MAPL Campaign).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-400 selection:text-slate-950">
        <SeasonProvider>
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            {children}
          </main>
        </SeasonProvider>
      </body>
    </html>
  );
}
