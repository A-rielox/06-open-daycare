"use client";

import { useState, type ReactNode } from "react";
import { MenuIcon, CloseIcon } from "@/components/shared/icons";
import { Sidebar } from "@/components/shared/Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen md:block">
        <Sidebar />
      </div>

      {isDrawerOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 cursor-default bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0">
            <Sidebar />
          </div>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-lg bg-cream text-ink shadow-[0_4px_14px_-6px_rgba(63,54,46,.6)]"
            onClick={() => setIsDrawerOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
      ) : null}

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur md:hidden">
          <button
            type="button"
            aria-label="Abrir menú"
            className="flex size-10 items-center justify-center rounded-xl border border-line bg-cream text-ink"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </button>
          <span className="font-heading text-base font-semibold text-ink">
            OpenDayCare
          </span>
        </div>

        {children}
      </main>
    </div>
  );
}
