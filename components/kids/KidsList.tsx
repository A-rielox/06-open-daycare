"use client";

import { useState } from "react";
import type { Kid } from "@/_data/kids";
import { KidCard } from "@/components/kids/KidCard";
import { SearchIcon } from "@/components/shared/icons";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function KidsList({ kids, room }: { kids: Kid[]; room: string }) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query.trim());
  const visibleKids = normalizedQuery
    ? kids.filter((kid) => normalize(kid.name).includes(normalizedQuery))
    : kids;

  return (
    <>
      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-surface px-4 py-3">
        <SearchIcon className="shrink-0 text-[#B0A290]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar niño…"
          className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-[#B6A99B]"
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[.8px] text-ink">
          {room}
        </span>
        <span className="text-[13px] text-muted">{kids.length} niños</span>
        <span className="h-px flex-1 bg-divider-line" />
      </div>

      {visibleKids.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-line bg-surface px-4 py-10 text-center text-[14px] text-muted">
          No se encontraron niños
        </div>
      ) : (
        <div className="grid gap-[14px] md:grid-cols-2">
          {visibleKids.map((kid) => (
            <KidCard key={kid.id} kid={kid} />
          ))}
        </div>
      )}
    </>
  );
}
