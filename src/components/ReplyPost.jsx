"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function ReplyPost({ subredditId }) {
  const [text, setText] = useState("");
  const [subreddit, setSubreddit] = useState(subredditId);
  const router = useRouter();

  // POST/posts
  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={text}
          className="comment-input"
          placeholder="Add a comment"
          onChange={(e) => setText(e.target.value)}
        />
        <button className="comment-btn" type="submit">
          Comment
        </button>
      </form>
    </>
  );
}
