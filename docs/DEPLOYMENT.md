# BellaWoman — Production Deployment & Operations Guide

This guide covers deploying BellaWoman to production on **Vercel**, **Docker**, or any modern Node.js hosting platform.

---

## 1. Local Development Setup

### Prerequisites
- Node.js 18+ (tested up to Node 26)
- npm or pnpm

### Quickstart
```bash
# 1. Clone & install dependencies
git clone <repo-url>
cd Bellawoman
npm install

# 2. Configure environment
cp .env.example .env

# 3. Synchronize database & seed catalog
npx prisma db push
npm run seed

# 4. Start local development server
npm run dev
```

Visit:
- Public Storefront: `http://localhost:3000`
- Admin Portal: `http://localhost:3000/admin`
- Default Admin Credentials: `admin@bellawoman.com` / `admin123`

---

## 2. Deploying to Vercel

1. **Connect Repository:** Import the BellaWoman repository into Vercel.
2. **Environment Variables:**
   - `DATABASE_URL`: Your production database URL.
     - For PostgreSQL (recommended on Vercel): Use Supabase, Neon, or Vercel Postgres.
     - In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
   - `ADMIN_SESSION_SECRET`: A strong 64-character random string (e.g., generated with `openssl rand -hex 32`).
   - `NEXT_PUBLIC_BASE_URL`: Your live domain (e.g., `https://bellawoman.com`).
3. **Build Command:** `npx prisma generate && next build`
4. **Deploy:** Hit deploy. Run `npm run seed` once to initialize the activewear catalogue and default admin user.

---

## 3. Remote Media Storage (Cloudinary / S3)

Currently, uploaded images are saved to `public/uploads/`. For serverless cloud hosting where the filesystem is ephemeral (like Vercel):
1. Configure Cloudinary, Cloudflare R2, or AWS S3 in `src/app/api/admin/upload/route.ts`.
2. The endpoint returns the permanent public URL string stored in `ProductImage.imagePath`.

---

## 4. Admin Credentials Maintenance

To change the admin password in production:
```bash
# Run a quick node script or seed update:
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YOUR_NEW_PASSWORD', 10).then(console.log);"
```
Update the `passwordHash` field in the `AdminUser` record in your production database.
