import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";

export default async function Subreddit({ params }) {
  const user = await fetchUser();
  // you want to show posts associated with this subreddit using params.
  // Access the parameter
  const { subredditId } = params;

  const subreddit = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const posts = await prisma.post.findMany({
    where: { subredditId },
    select: {
      id: true,
      title: true,
      message: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  // console.log(posts);

  return (
    <section id="subreddit-id" className="wrapper">
      <div className="subreddit-title">
        <img src="/reddit-logo.png" alt="" />
        <h2>r/{subreddit.name}</h2>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="subreddit-post-container">
          <p className="posted-by-text">Posted by u/{post.user.username}</p>
          <h4>{post.title}</h4>
          <p>{post.message}</p>
        </div>
      ))}
    </section>
  );
}
