import CreatePost from "@/components/CreatePost.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function Submit() {
  const user = await fetchUser();

  const subreddits = await prisma.subreddit.findMany();

  return (
    <section>
      <h2>Create post</h2>
      <CreatePost subreddits={subreddits} />
    </section>
  );
}
