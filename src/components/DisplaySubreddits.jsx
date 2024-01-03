import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function DisplaySubreddits() {
  const subreddits = await prisma.subreddit.findMany();
  return (
    <section>
      <ul>
        {subreddits.map((subreddit) => {
          return (
            <li className="subreddit-item" key={subreddit.id}>
              <Link href={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
