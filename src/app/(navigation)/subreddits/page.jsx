import CreateSubreddit from "@/components/CreateSubreddit.jsx";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function Subreddits() {
  // prisma fetch directly from the DB
  const subreddits = await prisma.subreddit.findMany();
  // console.log(subreddits);
  return (
    <section id="subreddit-section" className="wrapper">
      <div className="side-border">
        <h2 className="subreddit-heading">Communities</h2>
        <CreateSubreddit />
        <ul className="subreddit-list">
          {subreddits.map((subreddit) => (
            <li className="subreddit-item" key={subreddit.id}>
              <Link href={`/subreddits/${subreddit.id}`}>{subreddit.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
