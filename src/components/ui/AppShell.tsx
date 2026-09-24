'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFootball = pathname?.startsWith('/football');

  if (isFootball) {
    return (
      <main className="w-full min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      {children}
    </main>
  );
}
