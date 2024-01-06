"use client";
import { useRouter } from "next/navigation.js";
import { CiTrash } from "react-icons/ci";

export default function DeletePost({ post, subredditId }) {
  const router = useRouter();
  async function handleClickDelete() {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    });
    router.push(`/subreddits/${subredditId}`);
    router.refresh();
  }

  return (
    <>
      <button className="delete-btn" onClick={handleClickDelete}>
        <CiTrash />
      </button>
    </>
  );
}
