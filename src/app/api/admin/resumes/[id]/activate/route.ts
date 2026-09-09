import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin, requireAdmin } from "@/lib/admin-auth";
import { activateResume } from "@/lib/resume-store";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const resume = await activateResume(params.id);
  if (!resume) return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  const { storageKey, storageUrl, ...safe } = resume;
  return NextResponse.json(safe);
}

