"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function CreateSubreddit() {
  const [subredditName, setSubredditName] = useState("r/");
  const [isCreate, setIsCreate] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  console.log(subredditName);

  function handleClickCreate() {
    console.log("clicked");
    setIsCreate(true);
    router.refresh();
  }

  function handleClickClose() {
    console.log("clicked");
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
    console.log(data);

    if (!data.success) {
      setError(data.error);
    } else {
      setSubredditName("");
      router.refresh();
    }
  }

  return (
    <div>
      <button onClick={handleClickCreate} className="subreddit-create-btn">
        Create Community
      </button>
      {isCreate && (
        <div className="create-subreddit-modal">
          <form onSubmit={handleSubmit}>
            <div className="subreddit-modal-conatiner">
              <div className="create-border">
                <h4>Create a community</h4>
                <h4 onClick={handleClickClose}>X</h4>
              </div>
              <label htmlFor="">Name</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter a Community's name"
                value={subredditName}
                onChange={(e) => setSubredditName(e.target.value)}
              />
              <div>
                <button type="submit" onClick={handleClickClose}>
                  Cancel
                </button>
                <button>Create Community</button>
              </div>
            </div>
          </form>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
