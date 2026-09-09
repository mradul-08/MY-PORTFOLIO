import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin-auth";
import ResumeManager from "@/components/Admin/ResumeManager";

export const dynamic = "force-dynamic";

export default async function ResumeManagerPage() {
  if (!(await getSession())) redirect("/admin/login");
  return <ResumeManager />;
}

