"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreatePost({ subreddits }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [error, setError] = useState();
  const router = useRouter();

  function handleClickClear() {
    setTitle("");
    setMessage("");
    router.refresh();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        message: message,
        subredditId: subreddit,
      }),
    });
    const data = await response.json();

    if (!data.success) {
      setError(data.error);
    } else {
      setTitle("");
      setMessage("");
      router.push(`/subreddits/${subreddit}`);
      router.refresh();
    }
  }

  return (
    <>
      <h2>Form for post</h2>
      <div id="post-form-container">
        <form onSubmit={handleSubmit}>
          <select
            name=""
            id=""
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
          >
            <option value="">Choose a subreddit</option>
            {subreddits.map((subreddit) => {
              return (
                <option key={subreddit.id} value={subreddit.id}>
                  {subreddit.name}
                </option>
              );
            })}
          </select>
          <input
            className="post-input"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="post-input"
            placeholder="Text (required)"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="post-btn-container">
            <button onClick={handleClickClear}>Clear</button>
            <button type="submit">Post</button>
          </div>
          <p>{error}</p>
        </form>
      </div>
    </>
  );
}
