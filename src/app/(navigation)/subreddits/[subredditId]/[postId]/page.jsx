import EditPost from "@/components/EditPost.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function Post({ params }) {
  const user = await fetchUser();

  const { postId, subredditId } = params;

  const post = await prisma.post.findFirst({ where: { id: postId } });

  const subreddit = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  return (
    <>
      <EditPost subreddit={subreddit} post={post} />
    </>
  );
}
