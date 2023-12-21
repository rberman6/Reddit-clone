import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";

export async function POST(r) {
  // deleting the cookie called token when user logs out
  const cookieStore = cookies();
  cookieStore.delete("token");
  return NextResponse.json({ success: true });
}
