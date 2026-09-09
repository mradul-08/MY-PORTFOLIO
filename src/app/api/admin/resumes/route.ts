import { NextRequest, NextResponse } from "next/server";
import { isSameOrigin, requireAdmin } from "@/lib/admin-auth";
import {
  getResumeRecords,
  looksLikePdf,
  saveResume,
  validateResumeFile,
} from "@/lib/resume-store";

export const dynamic = "force-dynamic";

function publicRecord(record: Awaited<ReturnType<typeof getResumeRecords>>[number]) {
  const { storageKey, storageUrl, ...safe } = record;
  return safe;
}

export async function GET(request: NextRequest) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return NextResponse.json((await getResumeRecords()).map(publicRecord));
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !validateResumeFile(file) || !(await looksLikePdf(file))) {
    return NextResponse.json({ error: "Upload a valid PDF under 5 MB." }, { status: 400 });
  }
  const resume = await saveResume(file);
  return NextResponse.json(publicRecord(resume), { status: 201 });
}

