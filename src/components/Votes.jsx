"use client";

import { useRouter } from "next/navigation.js";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";

export default function Votes({ post }) {
  const router = useRouter();

  async function handleClickVote() {
    console.log("click");
    const response = await fetch(`api/votes`, {
      method: "POST",
      body: JSON.stringify({
        postId: post.id,
        isUpvote: true,
      }),
    });
  }

  return (
    <>
      <div className="votes-container">
        <div onClick={handleClickVote}>
          <TbArrowBigUp className="react-icon" />
        </div>
        <div onClick={handleClickVote}>
          <TbArrowBigDown className="react-icon" />
        </div>
      </div>
    </>
  );
}
