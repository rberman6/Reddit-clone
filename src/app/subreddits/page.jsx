import { prisma } from "@/lib/prisma.js";

export default async function Subreddits() {
  // prisma fetch directly from the DB
  // const subreddits = await prisma.subreddit
  return (
    <section>
      <h2>Subreddits</h2>
    </section>
  );
}
