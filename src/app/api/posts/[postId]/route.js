import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";

// DELETE /api/posts/:postId
export async function DELETE(request, response) {
  try {
    const { postId } = response.params;
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    console.log(post);
    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that id found",
      });
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// PUT /posts/:postId
export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    // extract title & message from the body of the request
    const { title, message } = await request.json();
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with this id found",
      });
    }
    // edit the post on the database using prisma
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { title, message },
    });
    return NextResponse({ success: true, post: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
