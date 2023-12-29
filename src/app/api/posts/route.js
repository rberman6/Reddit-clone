import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  try {
    const { title, message, subredditId } = await request.json();

    const user = await fetchUser();
    // if no user selects a subreddit
    if (!subredditId) {
      return NextResponse.json({
        success: false,
        error: "You must select a subreddit",
      });
    }
    // if no title or message exist
    if (!title || !message) {
      return NextResponse.json({
        success: false,
        error: "You must enter a title/text!",
      });
    }

    const newPost = await prisma.post.create({
      data: { title, message, userId: user.id, subredditId, parentId: null },
    });
    return NextResponse.json({
      success: true,
      newPost,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
