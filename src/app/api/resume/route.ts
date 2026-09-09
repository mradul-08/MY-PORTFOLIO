import { NextResponse } from "next/server";
import { getActiveResume, readResumeFile } from "@/lib/resume-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const resume = await getActiveResume();
  if (!resume) return NextResponse.json({ error: "No active resume." }, { status: 404 });
  const file = await readResumeFile(resume);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${resume.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

