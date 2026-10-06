import { postKindStyles, type Post, type PostKind } from "@/_data/mock";
import {
  CommentIcon,
  HeartIcon,
  ImageIcon,
  MegaphoneIcon,
} from "@/components/shared/icons";

// El avatar no forma parte de PostKindStyle: achievement/activity comparten
// el color del niño; announcement usa el del anuncio.
const avatarStyles: Record<PostKind, { bg: string; text: string }> = {
  achievement: { bg: "#A9D9E8", text: "#1F7A93" },
  activity: { bg: "#A9D9E8", text: "#1F7A93" },
  announcement: { bg: "#CCD8F4", text: "#4E72C8" },
};

export function PostCard({ post }: { post: Post }) {
  const kindStyle = postKindStyles[post.kind];
  const avatar = avatarStyles[post.kind];

  return (
    <article className="rounded-[20px] border border-line bg-surface px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)]">
      <div className="mb-[14px] flex items-center gap-3">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full font-heading text-[17px] font-semibold"
          style={{ backgroundColor: avatar.bg, color: avatar.text }}
        >
          {post.kind === "announcement" ? (
            <MegaphoneIcon />
          ) : (
            post.author.initial
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-heading text-[16.5px] font-semibold text-ink">
            {post.author.name}
          </div>
          <div className="text-[12.5px] text-muted">
            {post.time} · {post.publishedBy}
          </div>
        </div>
        <div
          className="flex items-center gap-[7px] rounded-full px-3 py-1.5"
          style={{ backgroundColor: kindStyle.bubbleBg }}
        >
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: kindStyle.dot }}
          />
          <span
            className="text-[12px] font-extrabold tracking-[.5px]"
            style={{ color: kindStyle.text }}
          >
            {kindStyle.label}
          </span>
        </div>
      </div>

      <div className="mb-2.5 text-[12.5px] text-muted">{post.audience}</div>

      <p className="text-[15.5px] leading-[1.55] text-ink-soft">{post.body}</p>

      {post.photoLabel ? (
        <div className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-photo-border bg-photo-bg text-photo-text">
          <ImageIcon />
          <span className="text-[13.5px]">{post.photoLabel}</span>
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-[18px] border-t border-line-soft pt-[14px]">
        <span className="flex items-center gap-[7px] text-sm font-bold text-accent">
          <HeartIcon />
          {post.likes}
        </span>
        <button
          type="button"
          className="flex items-center gap-[7px] text-sm font-bold text-muted-strong"
        >
          <CommentIcon />
          {post.comments}
        </button>
        <span className="flex-1" />
        <button
          type="button"
          className="text-sm font-extrabold text-accent-strong"
        >
          Editar
        </button>
      </div>
    </article>
  );
}
