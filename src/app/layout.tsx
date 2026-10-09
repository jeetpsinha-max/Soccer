import type { Metadata } from "next";
import "./globals.css";
import { SportProvider } from "@/context/SportContext";
import { SeasonProvider } from "@/context/SeasonContext";
import { Navigation } from "@/components/ui/Navigation";
import { AppShell } from "@/components/ui/AppShell";
import { CouncilChatDrawer } from "@/components/ui/CouncilChatDrawer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SidelineScratchpad } from "@/components/ui/SidelineScratchpad";
import { CoachingQuickDeck } from "@/components/ui/CoachingQuickDeck";

export const metadata: Metadata = {
  title: "Peddie Athletics SAC • Multi-Sport Tactical Analytics & Coaching Platform",
  description: "Official Strategic Analytics and Coaching (SAC) Platform for The Peddie School Varsity Athletics — Soccer & Football (MAPL Conference).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-400 selection:text-slate-950 bg-slate-950 text-slate-100">
        <SportProvider>
          <SeasonProvider>
            <Navigation />
            <AppShell>
              {children}
            </AppShell>
            <CouncilChatDrawer />
            <CommandPalette />
            <SidelineScratchpad />
            <CoachingQuickDeck />
          </SeasonProvider>
        </SportProvider>
      </body>
    </html>
  );
}
