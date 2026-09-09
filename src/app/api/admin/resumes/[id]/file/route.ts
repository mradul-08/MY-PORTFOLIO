import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getResume, readResumeFile } from "@/lib/resume-store";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin(request))) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const resume = await getResume(params.id);
  if (!resume) return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  const file = await readResumeFile(resume);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${resume.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

