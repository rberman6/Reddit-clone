import CreatePost from "@/components/CreatePost.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function Submit() {
  const user = await fetchUser();

  const subreddits = await prisma.subreddit.findMany();

  return (
    <section id="create-post-section" className="create-post-container">
      <CreatePost subreddits={subreddits} />
    </section>
  );
}
