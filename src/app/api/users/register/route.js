import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";
import { bcrypt } from "bcrypt";

export async function POST(request, response) {
  try {
    const { username, password } = await request.json();
    // console.log(username, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
