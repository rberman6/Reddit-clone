import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  try {
    const { name } = await request.json();
    // fetch the user from the database so you can link the user with the subreddit
    const user = await fetchUser();
    if (!user.id) {
      return NextResponse.json({
        success: false,
        error: "You must login/register to create a subreddit",
      });
    }

    // if no subreddit name entered add error handling
    if (!name) {
      return NextResponse.json({
        success: false,
        error: "You must enter a community name",
      });
    }
    // check if same subreddit already exists
    const subRedditExists = await prisma.subreddit.findFirst({
      where: { name },
    });
    if (subRedditExists) {
      return NextResponse.json({
        success: false,
        error: "This subreddit already exists, please enter a new one",
      });
    }

    const subreddit = await prisma.subreddit.create({
      data: { name, userId: user.id },
    });
    return NextResponse.json({
      success: true,
      subreddit,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
