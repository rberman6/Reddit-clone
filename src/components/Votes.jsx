"use client";

import { useRouter } from "next/navigation.js";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { useState } from "react";
// import { useEffect } from "react";

export default function Votes({ post, user }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const totalVotes = post.votes.reduce(
    (total, vote) => total + (vote.IsUpvote ? 1 : -1),
    0
  );
  async function handleClickVote(boolean) {
    const response = await fetch(`/api/votes`, {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
        isUpvote: boolean,
      }),
    });
    const data = await response.json();

    if (!data.success) {
      setError(data.error);
    } else {
      router.refresh();
    }
  }

  return (
    <>
      <div className="votes-container">
        <div onClick={() => handleClickVote(true)}>
          <TbArrowBigUp className="up-arrow-icon" />
        </div>
        <p>{totalVotes}</p>
        <div onClick={() => handleClickVote(false)}>
          <TbArrowBigDown className="down-arrow-icon" />
        </div>
        <p className="vote-error-msg">{error}</p>
      </div>
    </>
  );
}
