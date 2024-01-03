import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  try {
    const { postId, isUpvote } = await request.json();
    const user = await fetchUser();
    // error handling for user that is not logged in.

    // check if vote exists.
    //  if vote exists change the vote
    // if it does exist create a newVote
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
