"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link.js";
import { CgNotes } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { HiLink } from "react-icons/hi2";
import { BiPoll } from "react-icons/bi";

export default function CreatePost({ subreddits }) {
  // subredditId is stored in subreddit state
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
      //   subreddit is state that contains subredditid
      router.push(`/subreddits/${subreddit}`);
      router.refresh();
    }
  }

  return (
    <>
      <h3 className="create-post-title">Create a post</h3>
      <div>
        <form id="post-form-container" onSubmit={handleSubmit}>
          <select
            className="subreddit-dropdown"
            id=""
            value={subreddit}
            required
            onChange={(e) => setSubreddit(e.target.value)}
          >
            <option value="" disabled>
              Choose a community
            </option>
            {subreddits.map((subreddit) => {
              return (
                <option key={subreddit.id} value={subreddit.id}>
                  {subreddit.name}
                </option>
              );
            })}
          </select>
          <div className="new-post-input-container">
            <div className="tab-container">
              <div className="tab">
                <CgNotes />
                <h5>Post</h5>
              </div>
              <div className="tab">
                <CiImageOn />
                <h5>Image & Video</h5>
              </div>
              <div className="tab">
                <HiLink />
                <h5>Link</h5>
              </div>
              <div className="tab">
                <BiPoll />
                <h5>Poll</h5>
              </div>
            </div>
            <div className="input-flex">
              <input
                className="post-input-title"
                placeholder="Title (required)"
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="post-input-text"
                placeholder="Text (required)"
                type="text"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="post-btn-container">
              <Link href={"/"}>
                <button className="clear-post-btn">Cancel</button>
              </Link>
              <button className="create-post-btn" type="submit">
                Post
              </button>
            </div>
            <p className="error-msg">{error}</p>
          </div>
        </form>
      </div>
    </>
  );
}
