import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  try {
    const { postId, isUpvote } = await request.json();
    // console.log(postId, isUpvote);
    const user = await fetchUser();
    // error handling for user that is not logged in.
    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "You must be logged in to vote",
      });
    }

    // check if vote exists.
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });
    console.log(existingVote);
    let vote;
    if (existingVote) {
      if (existingVote.IsUpvote === isUpvote) {
        // if vote exists and is the same type, delete the vote
        vote = await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
        vote = null;
      } else {
        vote = await prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            IsUpvote: isUpvote,
          },
        });
      }
    } else {
      // if it does not exist, create a newVote
      vote = await prisma.vote.create({
        data: {
          postId,
          userId: user.id,
          IsUpvote: isUpvote,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: vote,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
