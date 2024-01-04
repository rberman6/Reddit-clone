import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";

// api/posts/
export async function POST(request, response) {
  try {
    const { title, message, subredditId, parentId } = await request.json();

    const user = await fetchUser();

    // if user is not logged in
    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "You must login/register to create a post.",
      });
    }

    // if no user selects a subreddit
    if (!subredditId) {
      return NextResponse.json({
        success: false,
        error: "You must select a subreddit",
      });
    }
    // if no message exists
    if (!message) {
      return NextResponse.json({
        success: false,
        error: "You must enter a message!",
      });
    }

    const newPost = await prisma.post.create({
      data: { title, message, userId: user.id, subredditId, parentId },
    });
    return NextResponse.json({
      success: true,
      newPost,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
