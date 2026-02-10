# Panduan Deployment ke Vercel - Sistem Arsip Dokumen

## 📋 Daftar Isi
1. [Persiapan](#persiapan)
2. [Konfigurasi Lokal](#konfigurasi-lokal)
3. [Deploy ke Vercel](#deploy-ke-vercel)
4. [Setup Database](#setup-database)
5. [Troubleshooting](#troubleshooting)

---

## Persiapan

### Persyaratan
- Akun GitHub (untuk version control)
- Akun Vercel ([vercel.com](https://vercel.com))
- Node.js 18.x atau lebih baru
- Git terinstal di komputer Anda

### File yang Diperlukan
- ✅ `index.html` - Halaman landing utama (sudah dibuat)
- ✅ `login.html` - Halaman login (sudah dibuat)
- ✅ `package.json` - Konfigurasi Node.js (sudah dibuat)
- ✅ `vercel.json` - Konfigurasi Vercel (sudah dibuat)
- ✅ `.env.example` - Template environment variables (sudah dibuat)
- ✅ `.gitignore` - File ignore untuk Git (sudah dibuat)

---

## Konfigurasi Lokal

### Langkah 1: Setup Git Repository

```bash
cd "c:\laragon\www\PROJECT ARSIP LOKER"

# Inisialisasi git repository
git init

# Tambahkan ke staging
git add .

# Commit pertama
git commit -m "Initial commit - Vercel deployment ready"
```

### Langkah 2: Setup Environment Variables

```bash
# Copy .env.example ke .env
copy .env.example .env

# Edit .env dengan credential database Anda
```

Isi data berikut di file `.env`:
```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASS=
DATABASE_NAME=arsip_dokumen
NODE_ENV=production
APP_URL=https://your-app.vercel.app
SESSION_SECRET=your_random_secret_key_here
```

### Langkah 3: Install Dependencies Lokal

```bash
# Install Node modules
npm install

# Test aplikasi lokal
npm run dev
```

---

## Deploy ke Vercel

### Opsi 1: Menggunakan Vercel CLI (Disarankan)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login ke Vercel
```bash
vercel login
```

#### 3. Deploy Aplikasi
```bash
# Untuk production deployment
vercel --prod

# Atau untuk preview deployment terlebih dahulu
vercel
```

#### 4. Follow prompts:
- Project name: `sistem-arsip-dokumen`
- Framework: `Other`
- Root directory: `.` (current directory)
- Build command: `npm run build`
- Output directory: `.`

### Opsi 2: Connect GitHub Repository

#### 1. Push ke GitHub
```bash
# Add remote repository
git remote add origin https://github.com/your-username/your-repo.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

#### 2. Connect di Vercel Dashboard
1. Buka [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import GitHub Repository
4. Select repository Anda
5. Configuration:
   - Framework: `Other`
   - Build Command: `npm run build`
   - Output Directory: `.`
6. Click "Deploy"

#### 3. Setup Environment Variables di Vercel:
1. Buka project di Vercel Dashboard
2. Go to Settings > Environment Variables
3. Tambahkan semua variable dari `.env`:
   - `DATABASE_HOST`
   - `DATABASE_USER`
   - `DATABASE_PASS`
   - `DATABASE_NAME`
   - Dll...
4. Click "Save"

---

## Setup Database

### Opsi 1: Database Remote (Disarankan untuk Production)
Gunakan layanan managed database seperti:
- **AWS RDS MySQL**
- **DigitalOcean Managed MySQL**
- **PlanetScale (MySQL compatible)**
- **Render PostgreSQL/MySQL**

### Opsi 2: Database Connection String
```
mysql://user:password@host:port/database_name
```

Contoh configuration di file `.env` Vercel:
```
DATABASE_HOST=mysql-prod.example.com
DATABASE_USER=admin123
DATABASE_PASS=SecurePassword123!
DATABASE_NAME=arsip_dokumen_prod
DATABASE_PORT=3306
```

### Langkah Migration Database:
```bash
# 1. Export database lokal
mysqldump -u root -p arsip_dokumen > backup.sql

# 2. Import ke database remote
mysql -h host -u user -p database_name < backup.sql
```

---

## Konfigurasi Server Backend

Untuk menjalankan fitur lengkap (authentication, API) di Vercel, Anda memiliki beberapa opsi:

### Opsi A: Menggunakan Vercel Serverless Functions (Node.js)
Buat file `api/login.js`:
```javascript
// Serverless function untuk login
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;
    
    // Connect ke database dan verify credentials
    // ... implement authentication logic
    
    res.status(200).json({ success: true });
}
```

### Opsi B: Menggunakan Platform Terpisah untuk Backend PHP
- Deploy PHP backend ke: Heroku, Railway, Render, PythonAnywhere
- Frontend static tetap di Vercel
- Hubungkan dengan API calls

### Opsi C: Konversi ke Node.js/Express Full Stack
Buat `server.js` untuk backend:
```javascript
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Endpoints API
app.post('/api/login', async (req, res) => {
    // Authentication logic
});

app.listen(process.env.PORT || 3000);
```

---

## File Struktur untuk Vercel

```
PROJECT ARSIP LOKER/
├── index.html                 ← Landing page (entry point)
├── login.html                 ← Login page
├── dashboard.html             ← Admin dashboard
├── staff/
│   └── dashboard.html
├── superadmin/
│   └── dashboard.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── api/                        ← Serverless functions (optional)
│   ├── login.js
│   ├── users.js
│   └── documents.js
├── package.json               ← Dependencies
├── vercel.json               ← Vercel config
├── .env.example              ← Environment template
├── .gitignore                ← Git ignore rules
└── .env                      ← NOT committed (local only)
```

---

## URL Aplikasi

Setelah deployment berhasil, aplikasi Anda akan tersedia di:
```
https://sistem-arsip-dokumen.vercel.app/
https://sistem-arsip-dokumen.vercel.app/login.html
```

Vercel juga memberikan URL preview untuk setiap push:
```
https://sistem-arsip-dokumen-git-branch-name.vercel.app/
```

---

## Troubleshooting

### ❌ Error: "Cannot find module 'mysql2'"
**Solusi:**
```bash
npm install mysql2
git add package-lock.json
git commit -m "Add mysql2 dependency"
git push
```

### ❌ Error: "Database connection failed"
**Checklist:**
- [ ] Environment variables sudah di-set di Vercel
- [ ] Database remote accessible dari Vercel servers
- [ ] Firewall mengizinkan koneksi dari Vercel IP
- [ ] Username, password, host sesuai

### ❌ Error: ".php files not found"
**Alasan:** Vercel untuk static hosting tidak mendukung PHP
**Solusi:** Konversi PHP ke JavaScript atau Node.js API routes

### ❌ 404 Not Found untuk route tertentu
**Solusi:** Update `vercel.json` untuk menambah rules routing

### 🔄 Cache Issues
```bash
# Rebuild dan redeploy
vercel --prod --clearCache
```

---

## Best Practices

✅ **DO:**
- Gunakan environment variables untuk sensitif data
- Regular backup database
- Test di lingkungan staging terlebih dahulu
- Monitor logs di Vercel dashboard
- Version control semua perubahan code

❌ **DON'T:**
- Commit `.env` ke repository
- Hardcode credentials di code
- Deploy tanpa testing
- Mengubah vercel.json tanpa testing

---

## Monitoring & Debugging

### Lihat Logs di Vercel:
1. Dashboard → Project → Deployments
2. Click deployment yang ingin di-check
3. View logs

### CLI Logs:
```bash
vercel logs --project=sistem-arsip-dokumen --tail
```

---

## Next Steps

1. ✅ Setup git repository
2. ✅ Configure environment variables
3. ✅ Deploy ke Vercel
4. ✅ Setup database connection
5. ✅ Test aplikasi
6. ✅ Setup custom domain (optional)
7. ✅ Configure SSL (automatic di Vercel)

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vercel GitHub Integration:** https://vercel.com/docs/git/vercel-for-github
- **Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Serverless Functions:** https://vercel.com/docs/concepts/functions/serverless-functions

---

**Versi:** 1.0  
**Last Updated:** 2026-02-11  
**Status:** ✅ Ready for Deployment
