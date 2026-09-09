# Mradul Garg Portfolio

This is Mradul Garg’s existing animated portfolio, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`.

## Resume manager setup

The public portfolio exposes only `GET /api/resume`, which serves the active PDF. Resume management is available at `/admin/resumes` after signing in at `/admin/login`.

Copy `.env.example` to `.env.local` and set:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH` — generate with `node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 12))" "your-password"`
- `SESSION_SECRET` — a random value of at least 32 characters
- `BLOB_READ_WRITE_TOKEN` — required for persistent Vercel Blob storage in production
- `CONTACT_EMAIL`, `CONTACT_EMAIL_PASSWORD`, and optional `CONTACT_CC` for the contact form

Without `BLOB_READ_WRITE_TOKEN`, local development stores uploaded PDFs in the ignored `.data/resumes` directory. Vercel deployments should use Blob storage because serverless local files are not persistent.

Resume uploads are PDF-only, limited to 5 MB, validated by MIME type, extension, and PDF signature. The active resume cannot be deleted; another version must be activated first.
