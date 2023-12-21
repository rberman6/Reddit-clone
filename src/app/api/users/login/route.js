import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";
import { cookies } from "next/headers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request, response) {
  //  receive the request from the user
  try {
    const cookieStore = cookies();
    const { username, password } = await request.json();
    // find the user in DB
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    // if statement if user doesn't exist in the DB, alert them to register/sign up
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Username does not exist, please register.",
      });
    }

    // verify their password matches in the DB
    const isPasswordVerified = await bcrypt.compare(password, user.password);
    // if the user's username and/or password doesnt match from the DB
    if (!isPasswordVerified) {
      return NextResponse.json({
        success: false,
        error: "Incorrect username/password entered. Please try again.",
      });
    }
    delete user.password;
    // create the token that we can send in the cookie
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, user: token });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
