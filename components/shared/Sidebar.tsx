"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { currentUser, navItems, roomHeader } from "@/_data/mock";
import {
  AccountIcon,
  BellIcon,
  ChildrenIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SunLogoIcon,
} from "@/components/shared/icons";

const navIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  feed: HomeIcon,
  children: ChildrenIcon,
  notices: BellIcon,
  account: AccountIcon,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-line bg-surface px-4 py-6">
      <a
        href="#"
        className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]"
      >
        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(155deg,#F8C3A8,#F2937A)]">
          <SunLogoIcon />
        </div>
        <div>
          <div className="font-heading text-[17px] leading-none font-semibold text-ink">
            OpenDayCare
          </div>
          <div className="mt-0.5 text-[11.5px] text-muted">
            {roomHeader.room}
          </div>
        </div>
      </a>

      <button
        type="button"
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-3 py-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]"
      >
        <PlusIcon />
        Nueva publicación
      </button>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = navIcons[item.id];
          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);
          const className = isActive
            ? "flex items-center gap-3 rounded-xl bg-brand-soft px-3 py-[11px] text-[14.5px] font-extrabold text-brand"
            : "flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] font-semibold text-nav";

          if (item.href === "#") {
            return (
              <button key={item.id} type="button" className={className}>
                {Icon ? <Icon /> : null}
                {item.label}
              </button>
            );
          }

          return (
            <Link key={item.id} href={item.href} className={className}>
              {Icon ? <Icon /> : null}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-2.5 border-t border-line pt-3.5">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#F2937A] font-heading text-base font-semibold text-white">
            {currentUser.initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-extrabold text-ink">
              {currentUser.name}
            </div>
            <div className="truncate text-xs text-muted">
              {currentUser.role} · {currentUser.room}
            </div>
          </div>
          <a
            href="#"
            title="Cerrar sesión"
            className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-cream text-muted-strong"
          >
            <LogoutIcon />
          </a>
        </div>
      </div>
    </aside>
  );
}
