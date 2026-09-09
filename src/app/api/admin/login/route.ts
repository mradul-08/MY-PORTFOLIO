import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  isSameOrigin,
  setSessionCookie,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= 5) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const valid = await verifyAdminCredentials(email, password);
  if (!valid) {
    attempts.set(ip, {
      count: (current?.resetAt && current.resetAt > now ? current.count : 0) + 1,
      resetAt: current?.resetAt && current.resetAt > now ? current.resetAt : now + 15 * 60 * 1000,
    });
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
  attempts.delete(ip);
  const response = NextResponse.json({ ok: true });
  setSessionCookie(response, await createSession(email));
  return response;
}

