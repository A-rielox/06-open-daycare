import type { Author, Post, RoomHeader } from "@/_data/mock";
import { ComposerPrompt } from "@/components/home/ComposerPrompt";
import { FeedHeader } from "@/components/home/FeedHeader";
import { PostCard } from "@/components/home/PostCard";
import { SectionDivider } from "@/components/home/SectionDivider";

interface FeedProps {
  header: RoomHeader;
  user: Author;
  posts: Post[];
}

export function Feed({ header, user, posts }: FeedProps) {
  return (
    <div className="mx-auto w-full max-w-[760px] px-6 pt-[34px] pb-20 md:px-10">
      <FeedHeader header={header} />
      <ComposerPrompt user={user} />
      <SectionDivider label="PUBLICADO HOY" />
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
