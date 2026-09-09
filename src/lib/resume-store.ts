import { del, list, put } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export type ResumeStatus = "ACTIVE" | "ARCHIVED";
export type ResumeRecord = {
  id: string;
  filename: string;
  storageKey: string;
  storageUrl?: string;
  uploadedAt: string;
  size: number;
  mimeType: "application/pdf";
  status: ResumeStatus;
  isActive: boolean;
};

const LOCAL_DIR = path.join(process.cwd(), ".data", "resumes");
const INDEX_NAME = "resume-index.json";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MAX_RESUME_SIZE = MAX_FILE_SIZE;

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readLocalIndex() {
  try {
    return JSON.parse(
      await fs.readFile(path.join(LOCAL_DIR, INDEX_NAME), "utf8")
    ) as ResumeRecord[];
  } catch {
    return [];
  }
}

async function readBlobIndex() {
  const result = await list({ prefix: INDEX_NAME });
  const index = result.blobs.find((blob) => blob.pathname === INDEX_NAME);
  if (!index) return [];
  const response = await fetch(index.url, { cache: "no-store" });
  if (!response.ok) return [];
  return (await response.json()) as ResumeRecord[];
}

export async function getResumeRecords() {
  return hasBlobStorage() ? readBlobIndex() : readLocalIndex();
}

async function writeIndex(records: ResumeRecord[]) {
  if (hasBlobStorage()) {
    await put(INDEX_NAME, JSON.stringify(records), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(
    path.join(LOCAL_DIR, INDEX_NAME),
    JSON.stringify(records, null, 2),
    "utf8"
  );
}

export async function getResume(id: string) {
  return (await getResumeRecords()).find((resume) => resume.id === id) ?? null;
}

export async function getActiveResume() {
  return (await getResumeRecords()).find((resume) => resume.isActive) ?? null;
}

export async function saveResume(file: File) {
  const id = crypto.randomUUID();
  const safeKey = `resume-${id}.pdf`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const records = await getResumeRecords();
  let storageUrl: string | undefined;

  if (hasBlobStorage()) {
    const blob = await put(safeKey, bytes, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/pdf",
    });
    storageUrl = blob.url;
  } else {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(path.join(LOCAL_DIR, safeKey), bytes);
  }

  const record: ResumeRecord = {
    id,
    filename: file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-160) || `${id}.pdf`,
    storageKey: safeKey,
    storageUrl,
    uploadedAt: new Date().toISOString(),
    size: bytes.byteLength,
    mimeType: "application/pdf",
    status: records.length === 0 ? "ACTIVE" : "ARCHIVED",
    isActive: records.length === 0,
  };

  await writeIndex(
    [record, ...records].map((item) => ({
      ...item,
      status: item.isActive ? "ACTIVE" : "ARCHIVED",
    }))
  );
  return record;
}

export async function readResumeFile(record: ResumeRecord) {
  if (hasBlobStorage() && record.storageUrl) {
    const response = await fetch(record.storageUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Resume storage could not be read.");
    return Buffer.from(await response.arrayBuffer());
  }
  return fs.readFile(path.join(LOCAL_DIR, record.storageKey));
}

export async function activateResume(id: string) {
  const records = await getResumeRecords();
  if (!records.some((record) => record.id === id)) return null;
  const updated = records.map((record) => ({
    ...record,
    isActive: record.id === id,
    status: record.id === id ? "ACTIVE" : "ARCHIVED",
  })) as ResumeRecord[];
  await writeIndex(updated);
  return updated.find((record) => record.id === id) ?? null;
}

export async function deleteResume(id: string) {
  const records = await getResumeRecords();
  const record = records.find((item) => item.id === id);
  if (!record || record.isActive) return { deleted: false, reason: "active" as const };
  if (hasBlobStorage() && record.storageUrl) await del(record.storageUrl);
  if (!hasBlobStorage()) await fs.rm(path.join(LOCAL_DIR, record.storageKey), { force: true });
  await writeIndex(records.filter((item) => item.id !== id));
  return { deleted: true };
}

export function validateResumeFile(file: File) {
  const filename = file.name.toLowerCase();
  return (
    filename.endsWith(".pdf") &&
    file.type === "application/pdf" &&
    file.size > 0 &&
    file.size <= MAX_FILE_SIZE
  );
}

export async function looksLikePdf(file: File) {
  const header = Buffer.from(await file.slice(0, 5).arrayBuffer()).toString("ascii");
  return header === "%PDF-";
}
