import { prisma } from "@/lib/prisma.js";

export default async function DisplayPosts() {
  const posts = await prisma.post.findMany({
    where: {
      parentId: null,
    },
  });
  return (
    <section>
      {posts.map((post) => {
        return (
          <div key={post.id} className="posts-container">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-message">{post.message}</p>
          </div>
        );
      })}
    </section>
  );
}
