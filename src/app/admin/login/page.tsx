"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { spectralBridgeRegular } from "@/fonts/font";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) setError((await response.json()).error ?? "Unable to sign in.");
    else router.replace("/admin/resumes");
    setLoading(false);
  }

  return (
    <main className="min-h-screen px-[6vw] py-[10vh]">
      <div className="mx-auto max-w-xl">
        <p className="text-sm mb-4">Private area</p>
        <h1 className={`${spectralBridgeRegular.className} text-[12vw] md:text-[7vw] leading-none`}>Admin login</h1>
        <form onSubmit={submit} className="mt-12 space-y-6">
          <label className="block text-sm">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border-b border-lightText dark:border-darkText bg-transparent px-2 py-3 outline-none" /></label>
          <label className="block text-sm">Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border-b border-lightText dark:border-darkText bg-transparent px-2 py-3 outline-none" /></label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button disabled={loading} className="w-full rounded-full border border-lightText dark:border-darkText py-3 transition hover:bg-lightText hover:text-lightBg dark:hover:bg-darkText dark:hover:text-darkBg">{loading ? "Signing in…" : "Sign in"}</button>
        </form>
      </div>
    </main>
  );
}

