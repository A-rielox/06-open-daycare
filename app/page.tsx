import { currentUser, posts, roomHeader } from "@/_data/mock";
import { AppShell } from "@/components/shared/AppShell";
import { Feed } from "@/components/home/Feed";

export default function Home() {
  return (
    <AppShell>
      <Feed header={roomHeader} user={currentUser} posts={posts} />
    </AppShell>
  );
}
