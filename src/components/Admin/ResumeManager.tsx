"use client";

import { useEffect, useState } from "react";
import { spectralBridgeRegular } from "@/fonts/font";

type Resume = {
  id: string;
  filename: string;
  uploadedAt: string;
  size: number;
  status: "ACTIVE" | "ARCHIVED";
  isActive: boolean;
};

const formatSize = (size: number) => `${(size / 1024).toFixed(1)} KB`;

export default function ResumeManager() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const response = await fetch("/api/admin/resumes", { cache: "no-store" });
    if (response.status === 401) window.location.href = "/admin/login";
    if (response.ok) setResumes(await response.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function upload(file: File) {
    setError(""); setMessage("");
    const form = new FormData(); form.append("file", file);
    const response = await fetch("/api/admin/resumes", { method: "POST", body: form });
    const data = await response.json();
    if (!response.ok) setError(data.error ?? "Upload failed.");
    else { setMessage("Resume uploaded."); await load(); }
  }

  async function activate(id: string) {
    const response = await fetch(`/api/admin/resumes/${id}/activate`, { method: "PUT" });
    if (!response.ok) setError((await response.json()).error ?? "Could not activate resume.");
    else { setMessage("Active resume updated."); await load(); }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this archived resume?")) return;
    const response = await fetch(`/api/admin/resumes/${id}`, { method: "DELETE" });
    if (!response.ok) setError((await response.json()).error ?? "Could not delete resume.");
    else { setMessage("Resume deleted."); await load(); }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const activeResume = resumes.find((resume) => resume.isActive);

  return (
    <main className="min-h-screen px-[6vw] py-[6vh]">
      <div className="flex justify-between items-start gap-6">
        <div><p className="text-sm mb-4">Private area</p><h1 className={`${spectralBridgeRegular.className} text-[12vw] md:text-[7vw] leading-none`}>Resume manager</h1></div>
        <button onClick={logout} className="text-sm underline mt-2">Log out</button>
      </div>
      <section className="mt-12 border-t border-lightText20 dark:border-darkText20 pt-6">
        <div className="flex flex-wrap justify-between items-center gap-4"><div><p className="text-sm">Current active resume</p><p className="text-xl mt-2">{activeResume?.filename ?? "No resume uploaded yet"}</p>{activeResume && <div className="flex gap-4 mt-3 text-sm"><a href={`/api/admin/resumes/${activeResume.id}/file`} target="_blank" rel="noreferrer" className="underline">Preview</a><a href={`/api/admin/resumes/${activeResume.id}/file`} download={activeResume.filename} className="underline">Download</a></div>}</div><div className="flex gap-3"><label className="cursor-pointer rounded-full border border-lightText dark:border-darkText px-5 py-3 hover:bg-lightText hover:text-lightBg dark:hover:bg-darkText dark:hover:text-darkBg">{activeResume ? "Replace" : "Upload new resume"}<input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} /></label></div></div>
      </section>
      {message && <p className="mt-6 text-green-600">{message}</p>}{error && <p className="mt-6 text-red-500">{error}</p>}
      <section className="mt-8">
        <h2 className={`${spectralBridgeRegular.className} text-4xl`}>Resume versions</h2>
        {loading ? <p className="mt-6">Loading…</p> : resumes.length === 0 ? <p className="mt-6 text-lightText60 dark:text-darkText60">Upload your current PDF resume to create the first active version.</p> : <div className="mt-6 space-y-4">{resumes.map((resume) => <article key={resume.id} className="border-t border-lightText20 dark:border-darkText20 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4"><div><p className="text-lg">{resume.filename}</p><p className="text-sm text-lightText60 dark:text-darkText60">{new Date(resume.uploadedAt).toLocaleString()} · {formatSize(resume.size)} · {resume.status}</p></div><div className="flex flex-wrap gap-4 text-sm"><a href={`/api/admin/resumes/${resume.id}/file`} target="_blank" rel="noreferrer" className="underline">Preview</a>{!resume.isActive && <button onClick={() => activate(resume.id)} className="underline">Set active</button>}<button disabled={resume.isActive} onClick={() => remove(resume.id)} className="underline disabled:opacity-40">Delete</button></div></article>)}</div>}
      </section>
    </main>
  );
}
