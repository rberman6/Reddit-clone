"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function EditPost({ post, subreddit }) {
  const [title, setTitle] = useState(post.title);
  const [message, setMessage] = useState(post.message);
  const [error, setError] = useState();

  const router = useRouter();

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
      <form id="edit-form-container" onSubmit={handleSubmitEdit}>
        <h3 className="edit-post-title">Edit post</h3>
        <div className="edit-form-box">
          <input
            className="post-input"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="post-input-text"
            placeholder="Text (required)"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="edit-border">
            <div className="post-btn-container">
              <button className="clear-btn" onClick={handleClickClear}>
                Clear
              </button>
              <button className="save-btn" type="submit">
                Save
              </button>
            </div>
          </div>
          <p>{error}</p>
        </div>
      </form>
    </>
  );
}
