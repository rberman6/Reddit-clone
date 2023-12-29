"use client";

import { useRouter } from "next/navigation.js";
import Link from "next/link.js";

export default function CreatePostBtn() {
  const router = useRouter();

  function handleClickCreate() {
    console.log("click");
    router.refresh();
  }

  return (
    <>
      <Link href={"/submit"}>
        <div>
          <div
            onClick={handleClickCreate}
            className="create-post-btn-container"
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
            </svg>
            <p> Create post</p>
          </div>
        </div>
      </Link>
    </>
  );
}
