"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function EditPost({ post, subreddit }) {
  const [title, setTitle] = useState(post.title);
  const [message, setMessage] = useState(post.message);
  const [error, setError] = useState();

  const router = useRouter();
  console.log(post);

  async function handleSubmitEdit(e) {
    e.preventDefault();
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        message: message,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push(`/subreddits/${subreddit.id}`);
      router.refresh();
    } else {
      setError(data.error);
    }
  }

  function handleClickClear() {
    setTitle("");
    setMessage("");
    router.refresh("");
  }

  return (
    <>
      <form onSubmit={handleSubmitEdit}>
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
    </>
  );
}
