import DisplayPosts from "@/components/DisplayPosts.jsx";
import DisplaySubreddits from "@/components/DisplaySubreddits.jsx";

export default async function Home() {
  return (
    <main className="wrapper">
      <section id="homepage">
        <div className="display-subreddits">
          <DisplaySubreddits />
        </div>
        <div className="display-posts">
          <DisplayPosts />
        </div>
      </section>
    </main>
  );
}
