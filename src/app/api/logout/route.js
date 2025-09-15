import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = cookies();
  cookieStore.delete("userEmail", { path: "/" });

  return NextResponse.json({ message: "Logged out" });
}
