import type { Metadata } from "next";
import { kids, kidsRoomHeader } from "@/_data/kids";
import { KidsList } from "@/components/kids/KidsList";
import { AppShell } from "@/components/shared/AppShell";
import { PlusIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Niños · OpenDayCare",
};

export default function KidsPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[880px] px-6 pt-[34px] pb-20 md:px-10">
        <div className="mb-[22px] flex items-end justify-between gap-4">
          <div>
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-brand">
              {kidsRoomHeader.eyebrow}
            </div>
            <h1 className="font-heading text-[30px] font-semibold text-ink">
              {kidsRoomHeader.title}
            </h1>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.7)]"
          >
            <PlusIcon />
            Agregar niño
          </button>
        </div>
        <KidsList kids={kids} room={kidsRoomHeader.room} />
      </div>
    </AppShell>
  );
}
