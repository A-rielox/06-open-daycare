import type { RoomHeader } from "@/_data/mock";

export function FeedHeader({ header }: { header: RoomHeader }) {
  return (
    <div className="mb-6">
      <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-brand">
        GUARDERÍA · {header.room.toUpperCase()}
      </div>
      <h1 className="font-heading text-[30px] font-semibold text-ink">
        Buenas, {header.greetingName}
      </h1>
      <p className="mt-[5px] text-[14.5px] text-muted-strong">
        {header.childCount} niños · {header.dateLabel}
      </p>
    </div>
  );
}
