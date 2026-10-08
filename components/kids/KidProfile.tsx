import Link from "next/link";
import type { Kid, Parent, ParentStatus } from "@/_data/kids";
import {
  AlertIcon,
  ArrowLeftIcon,
  PlusIcon,
  SunLogoIcon,
} from "@/components/shared/icons";

const badgeStyles: Record<ParentStatus, string> = {
  active: "bg-[#CFEBD8] text-[#3E9B6C]",
  pending: "bg-[#F7E7A6] text-[#9A7B1E]",
};

const parentAvatarBg = ["#C9B6E8", "#A9C7E8"];

function isMother(role: string): boolean {
  return role === "Mamá";
}

function parentSubtitle(parent: Parent): string {
  if (parent.status === "pending") return `${parent.role} · invitación enviada`;
  return `${parent.role} · ${isMother(parent.role) ? "activa" : "activo"}`;
}

function parentBadge(parent: Parent): string {
  if (parent.status === "pending") return "PENDIENTE";
  return isMother(parent.role) ? "ACTIVA" : "ACTIVO";
}

function ParentRow({ parent, index }: { parent: Parent; index: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-base font-semibold text-white"
        style={{ backgroundColor: parentAvatarBg[index % parentAvatarBg.length] }}
      >
        {parent.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-extrabold text-ink">
          {parent.name}
        </div>
        <div className="text-[12.5px] text-muted">{parentSubtitle(parent)}</div>
      </div>
      <span
        className={`shrink-0 rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${badgeStyles[parent.status]}`}
      >
        {parentBadge(parent)}
      </span>
    </div>
  );
}

export function KidProfile({ kid }: { kid: Kid }) {
  return (
    <div className="mx-auto w-full max-w-[820px] px-6 pt-[34px] pb-20 md:px-10">
      <Link
        href="/kids"
        className="mb-5 flex w-fit items-center gap-[7px] text-[14px] font-bold text-muted-strong"
      >
        <ArrowLeftIcon />
        Volver a Niños
      </Link>

      <div className="flex flex-wrap items-start gap-[26px]">
        <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
          <div className="flex items-center gap-[18px]">
            <div
              className="flex size-[84px] shrink-0 items-center justify-center rounded-full font-heading text-[34px] font-semibold"
              style={{ backgroundColor: kid.avatarBg, color: kid.avatarText }}
            >
              {kid.initial}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-[28px] font-semibold text-ink">
                {kid.name}
              </h1>
              <p className="mt-0.5 text-[15px] text-muted-strong">
                {kid.age} años · Sala {kid.room}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-[12px] border-[1.5px] border-line bg-surface px-4 py-[9px] text-[14px] font-bold text-nav"
            >
              Editar
            </button>
          </div>

          {kid.allergyNote ? (
            <div className="flex gap-[14px] rounded-2xl bg-[#FBDAD6] px-[18px] py-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#F4A8A0] text-white">
                <AlertIcon />
              </div>
              <div>
                <div className="mb-0.5 text-[15px] font-extrabold text-[#C5413A]">
                  Alergias y notas
                </div>
                <div className="text-[14.5px] leading-[1.5] text-[#B25249]">
                  {kid.allergyNote}
                </div>
              </div>
            </div>
          ) : null}

          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex justify-between border-b border-line-soft px-[18px] py-[15px]">
              <span className="text-[14.5px] text-muted-strong">
                Fecha de nacimiento
              </span>
              <span className="text-[14.5px] font-extrabold text-ink">
                {kid.birthDateLabel}
              </span>
            </div>
            <div className="flex justify-between border-b border-line-soft px-[18px] py-[15px]">
              <span className="text-[14.5px] text-muted-strong">Sala</span>
              <span className="text-[14.5px] font-extrabold text-ink">
                {kid.room}
              </span>
            </div>
            <div className="flex justify-between px-[18px] py-[15px]">
              <span className="text-[14.5px] text-muted-strong">Ingreso</span>
              <span className="text-[14.5px] font-extrabold text-ink">
                {kid.joinedLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-[300px] flex-none flex-col gap-[14px]">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink py-[13px] text-[15px] font-extrabold text-white"
          >
            <SunLogoIcon />
            Resumen del día
          </button>

          <div className="rounded-2xl border border-line bg-surface px-[18px] py-4">
            <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[.8px] text-divider-label">
              PADRES VINCULADOS
            </div>
            <div className="flex flex-col gap-[14px]">
              {kid.parents.map((parent, index) => (
                <ParentRow key={parent.id} parent={parent} index={index} />
              ))}
              <button
                type="button"
                className="flex items-center gap-3 pt-2 text-left"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-[#B0A290]">
                  <PlusIcon width={18} height={18} stroke="currentColor" />
                </span>
                <span className="text-[14.5px] font-extrabold text-accent-strong">
                  Vincular otro padre
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
