import Link from "next/link";
import type { Kid } from "@/_data/kids";
import { ChevronRightIcon } from "@/components/shared/icons";

function parentsLabel(count: number): string {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

export function KidCard({ kid }: { kid: Kid }) {
  const allergy = kid.allergies[0];

  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-line bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition hover:-translate-y-0.5 hover:border-[#F2A78E]"
    >
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-full font-heading text-[19px] font-semibold"
        style={{ backgroundColor: kid.avatarBg, color: kid.avatarText }}
      >
        {kid.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-heading text-[16px] font-semibold text-ink">
          {kid.name}
        </div>
        <div className="text-[13px] text-muted">
          {kid.age} años · {parentsLabel(kid.parents.length)}
        </div>
      </div>
      {allergy ? (
        <span className="shrink-0 rounded-full bg-[#FBD8CC] px-[9px] py-[5px] text-[11px] font-extrabold text-[#D9684A]">
          {allergy}
        </span>
      ) : kid.parents.length === 0 ? (
        <span className="shrink-0 rounded-full bg-[#F9D2DE] px-[9px] py-[5px] text-[11px] font-extrabold text-[#C56486]">
          VINCULAR
        </span>
      ) : (
        <ChevronRightIcon className="shrink-0 text-[#CBB89F]" />
      )}
    </Link>
  );
}
