# Quick Start Guide - Deploy ke Vercel

## 🚀 Deployment Vercel dalam 5 Menit

### ✅ Prerequisite Checklist
- [ ] Punya akun GitHub
- [ ] Punya akun Vercel ([vercel.com](https://vercel.com))
- [ ] Node.js 18+ terinstal
- [ ] Git terinstal

---

## 📝 Langkah-Langkah Deployment

### Step 1: Setup Repository Lokal (2 menit)
```bash
cd "c:\laragon\www\PROJECT ARSIP LOKER"

# Initialize git
git init
git add .
git commit -m "Initial Vercel deployment"

# Setup remote repository
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy ke Vercel (1 menit)

#### Option A: Vercel CLI (Fastest)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy ke production
vercel --prod
```

#### Option B: GitHub Integration (Recommended for Auto-Deploy)
1. Login ke [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Select GitHub repository
4. Settings:
   - Framework: `Other`
   - Build Command: `npm run build`
   - Output Dir: `.`
5. Click "Deploy" ✨

### Step 3: Setup Environment Variables (1 menit)
1. Buka project di Vercel Dashboard
2. Settings → Environment Variables
3. Tambahkan:
```
DATABASE_HOST=your_database_host
DATABASE_USER=your_user
DATABASE_PASS=your_password
DATABASE_NAME=arsip_dokumen
NODE_ENV=production
SESSION_SECRET=your_secret_key
```
4. Redeploy: Click "Deployments" → Click latest → "Redeploy"

### Step 4: Verifikasi (1 menit)
✅ Aplikasi live di: `https://your-project.vercel.app`
✅ Landing page: `https://your-project.vercel.app/`
✅ Login page: `https://your-project.vercel.app/login.html`

---

## 🔧 File yang Sudah Disiapkan

| File | Fungsi |
|------|--------|
| `index.html` | ✅ Landing page utama (UPDATED) |
| `login.html` | ✅ Halaman login |
| `vercel.json` | ✅ Routing config |
| `package.json` | ✅ Dependencies |
| `.env.example` | ✅ Environment template |
| `.gitignore` | ✅ Git ignore rules |

---

## ⚠️ Status Backend PHP

### Current State:
- ❌ PHP tidak didukung di Vercel static hosting
- ✅ Frontend HTML/CSS/JS berjalan lancar
- ⏳ Backend perlu di-setup terpisah

### Solusi:
Anda punya 3 opsi untuk backend:

**Opsi 1: Vercel Serverless Functions (Node.js)**
- Buat folder `/api` dengan file JavaScript
- Contoh: `api/login.js`, `api/documents.js`
- Paling mudah untuk scaling

**Opsi 2: Backend Terpisah**
- Deploy PHP ke: Heroku, Railway, atau Render
- Connect via API calls
- Frontend static di Vercel (free tier)

**Opsi 3: Konversi PHP → Node.js**
- Rewrite login, API, database logic ke Express.js
- Buat `server.js` di root folder
- Deploy sebagai serverless function

---

## 📚 Dokumentasi Lengkap

Lihat file `VERCEL_DEPLOYMENT_GUIDE.md` untuk panduan detail tentang:
- Database setup
- Development locally
- Troubleshooting
- Environment configuration
- CLI commands

---

## 🎯 Testing Lokal (Optional)

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build
npm run build
```

Akses di: `http://localhost:3000`

---

## 🆘 Troubleshooting Cepat

### ❌ Deployment gagal?
```bash
# Clear Vercel cache dan redeploy
vercel --prod --clearCache
```

### ❌ 404 error?
Check `vercel.json` routes sudah sesuai

### ❌ Environment variables tidak ter-load?
- Redeploy setelah setup env vars
- Clear browser cache

### ❌ Database connection error?
- Test koneksi database lokal terlebih dahulu
- Update DATABASE_HOST dan credentials
- Pastikan firewall mengizinkan koneksi dari Vercel

---

## 🔗 Useful Links

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Integration:** https://vercel.com/docs/git/vercel-for-github
- **Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Serverless Functions:** https://vercel.com/docs/concepts/functions/serverless-functions
- **Dashboard:** https://vercel.com/dashboard

---

## ✨ Next Steps

1. Deploy ke Vercel
2. Setup environment variables
3. Configure backend (pilih salah satu opsi di atas)
4. Setup database connection
5. Test aplikasi
6. Monitor di Vercel dashboard

---

**Status:** ✅ Ready to Deploy  
**Last Updated:** 2026-02-11
