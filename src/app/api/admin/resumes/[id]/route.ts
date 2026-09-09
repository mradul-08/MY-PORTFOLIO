import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin, requireAdmin } from "@/lib/admin-auth";
import { deleteResume, getResume } from "@/lib/resume-store";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const resume = await getResume(params.id);
  if (!resume) return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  const { storageKey, storageUrl, ...safe } = resume;
  return NextResponse.json(safe);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const result = await deleteResume(params.id);
  if (result.reason === "active") return NextResponse.json({ error: "Activate another resume first." }, { status: 409 });
  if (!result.deleted) return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

