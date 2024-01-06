"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from "next/link.js";

export default function ReplyPost({ postId, subredditId }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState();
  const router = useRouter();

  // POST/posts
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        message: message,
        subredditId,
        parentId: postId,
      }),
    });
    const data = await response.json();
    if (!data.success) {
      setError(data.error);
    } else {
      setMessage("");
      router.refresh();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={message}
          className="comment-input"
          placeholder="Add a comment"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="replypost-btn-container">
          <Link href={`/subreddits/${subredditId}`}>
            <button className="comment-btn">Cancel</button>
          </Link>
          <button className="comment-btn" type="submit">
            Comment
          </button>
        </div>
        <p className="error-reg-login-msg">{error}</p>
      </form>
    </>
  );
}
