export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-[14px] flex items-center gap-[14px]">
      <span className="text-[12.5px] font-extrabold tracking-[.8px] text-divider-label">
        {label}
      </span>
      <span className="h-px flex-1 bg-divider-line" />
    </div>
  );
}
