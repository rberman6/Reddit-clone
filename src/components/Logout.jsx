"use client";
import Link from "next/link.js";
import { useRouter } from "next/navigation.js";

export default function Logout() {
  const router = useRouter();
  return (
    <div className="logout">
      <Link
        onClick={async () => {
          // sending a request to logout to the server
          const response = await fetch(`/api/users/logout`, { method: "POST" });
          const info = await response.json();
          router.refresh();
        }}
        // return to the home page after logging out
        href={"/"}
      >
        Logout
      </Link>
    </div>
  );
}
