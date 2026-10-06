import type { Author } from "@/_data/mock";
import { CameraIcon } from "@/components/shared/icons";

export function ComposerPrompt({ user }: { user: Author }) {
  return (
    <button
      type="button"
      className="mb-6 flex w-full items-center gap-[14px] rounded-[18px] border border-line bg-surface px-[18px] py-[14px] text-left shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2937A] font-heading text-base font-semibold text-white">
        {user.initial}
      </div>
      <span className="flex-1 text-[15px] text-muted">
        Compartí un momento…
      </span>
      <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-brand-soft text-accent">
        <CameraIcon />
      </span>
    </button>
  );
}
