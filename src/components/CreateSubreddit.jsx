"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function CreateSubreddit() {
  const [subredditName, setSubredditName] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleClickCreate() {
    setIsCreate(true);
    router.refresh();
  }

  function handleClickClose() {
    setIsCreate(false);
    router.refresh();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`/api/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: subredditName,
      }),
    });
    const data = await response.json();

    if (!data.success) {
      setError(data.error);
    } else {
      setSubredditName("");
      setIsCreate(false);
      router.refresh();
    }
  }

  return (
    <div>
      <div onClick={handleClickCreate} className="create-comm-btn-container">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
        </svg>
        <p>Create Community</p>
      </div>
      {isCreate && (
        <div className="create-subreddit-modal">
          <form onSubmit={handleSubmit}>
            <div className="subreddit-modal-container">
              <div className="create-border">
                <div className="modal-heading">
                  <img
                    className="subreddit-img"
                    src="/subreddit-img.png"
                    alt="subreddit image"
                  />
                  <h4>Create a community</h4>
                </div>
                <h4 className="close-btn" onClick={handleClickClose}>
                  X
                </h4>
              </div>
              <label htmlFor="">Name:</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter a Community's name"
                value={subredditName}
                onChange={(e) => setSubredditName(e.target.value)}
              />
              <div className="modal-btn-container">
                <button
                  className="subreddit-modal-btn"
                  type="submit"
                  onClick={handleClickClose}
                >
                  Cancel
                </button>
                <button className="subreddit-modal-btn">
                  Create community
                </button>
              </div>
              <p>{error}</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
