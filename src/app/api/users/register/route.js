import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request, response) {
  try {
    const cookieStore = cookies();
    // extract the username and password received from front end
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You must provide a username and password to register",
      });
    }
    const _user = await prisma.user.findFirst({
      where: { username, password },
    });
    if (_user) {
      return NextResponse.json({
        success: false,
        error: "Username already exists. Please login",
      });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    // create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET
    );
    // send token in the form of cookie to client
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
