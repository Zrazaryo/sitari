# ✅ VERCEL DEPLOYMENT CHECKLIST

## Fase 1: Persiapan Lokal ✨

### Repository Setup
- [ ] Buka folder project di terminal
- [ ] Run `git init`
- [ ] Run `git add .`
- [ ] Run `git commit -m "Initial Vercel deployment"`

### Verify Files
- [ ] `index.html` - Landing page utama
- [ ] `login.html` - Halaman login
- [ ] `dashboard.html` - Admin dashboard
- [ ] `package.json` - Node.js config
- [ ] `vercel.json` - Vercel routing
- [ ] `.env.example` - Environment template
- [ ] `.gitignore` - Git rules
- [ ] `api/login.js` - Login serverless function
- [ ] `api/documents.js` - Documents API
- [ ] `api/health.js` - Health check
- [ ] `server.js` - Local dev server

### Environment Setup
- [ ] Copy `.env.example` → `.env`
- [ ] Set database credentials di `.env`
- [ ] Set SESSION_SECRET di `.env`

### Testing Lokal
- [ ] Run `npm install`
- [ ] Run `npm run dev` atau `node server.js`
- [ ] Open `http://localhost:3000` di browser
- [ ] Verifikasi landing page muncul
- [ ] Test button login navigate properly
- [ ] Verifikasi responsive di mobile

---

## Fase 2: GitHub Repository 📤

### Persiapan
- [ ] Create GitHub account (jika belum)
- [ ] Generate GitHub personal access token
- [ ] Create new repository di GitHub
- [ ] Repository name: `sistem-arsip-dokumen`

### Setup Remote
```bash
git remote add origin https://github.com/your-username/sistem-arsip-dokumen.git
git branch -M main
git push -u origin main
```

### Verifikasi
- [ ] Code sudah ada di GitHub
- [ ] Branch `main` adalah default
- [ ] `README.md` terlihat di GitHub

---

## Fase 3: Deploy ke Vercel 🚀

### Option A: CLI Deployment (Quick)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B: GitHub Integration (Recommended)
1. [ ] Login ke [vercel.com](https://vercel.com)
2. [ ] Click "Add New Project"
3. [ ] Select "Import Git Repository"
4. [ ] Pilih repository GitHub Anda
5. [ ] Configure:
   - [ ] Framework: `Other`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `.`
6. [ ] Click "Deploy"
7. [ ] Wait untuk deployment selesai

### Verifikasi
- [ ] Vercel dashboard show "Deployment Successful"
- [ ] URL aplikasi di-generate (misalnya: `https://sistem-arsip-dokumen.vercel.app`)
- [ ] Open URL di browser
- [ ] Landing page muncul dengan benar

---

## Fase 4: Environment Variables ⚙️

### Setup di Vercel Dashboard
1. [ ] Open deployed project di [vercel.com](https://vercel.com)
2. [ ] Go to "Settings" → "Environment Variables"
3. [ ] Add variables:

```
DATABASE_HOST     = your_database_host
DATABASE_USER     = your_db_user
DATABASE_PASS     = your_db_password
DATABASE_NAME     = arsip_dokumen
DATABASE_PORT     = 3306

NODE_ENV          = production
APP_URL           = https://your-app.vercel.app
SESSION_SECRET    = your_secret_key_min_32_chars

ENABLE_GPS        = true
CORS_ORIGIN       = *
```

4. [ ] Click "Save"
5. [ ] Redeploy aplikasi:
   - [ ] Go to "Deployments"
   - [ ] Click latest deployment
   - [ ] Click "Redeploy"
   - [ ] Wait 1-2 menit

### Verifikasi
- [ ] App masih load dengan baik
- [ ] Check API health: `https://your-app.vercel.app/api/health`
- [ ] Should return JSON response

---

## Fase 5: Database Configuration 💾

### Pilih Opsi:

#### Opsi A: Remote Database (Recommended)
- [ ] Create account di MySQL hosting (PlanetScale, DigitalOcean, AWS RDS)
- [ ] Create database
- [ ] Get connection string
- [ ] Update environment variables di Vercel
- [ ] Test connection

#### Opsi B: Local Database
- [ ] Setup MySQL di local
- [ ] Whitelist Vercel IP di firewall
- [ ] Update DATABASE_HOST dengan public IP
- [ ] Test connection dari Vercel

### Migration Data
- [ ] Export current database:
  ```bash
  mysqldump -u root -p arsip_dokumen > backup.sql
  ```
- [ ] Import ke remote database:
  ```bash
  mysql -h host -u user -p database_name < backup.sql
  ```
- [ ] Verify data integrity

---

## Fase 6: Backend Integration 🔧

### Setup API Endpoints (Choose One):

#### Opsi 1: Vercel Serverless Functions (Node.js)
- [ ] Sudah punya template di `/api` folder
- [ ] Implement `/api/login.js`
- [ ] Implement `/api/documents.js`
- [ ] Add database connection
- [ ] Test endpoints dengan Postman
- [ ] Push perubahan ke GitHub
- [ ] Vercel auto-redeploy

#### Opsi 2: Separate Backend Server
- [ ] Convert PHP code ke Node.js Express
- [ ] Deploy ke Heroku/Railway/Render
- [ ] Update frontend API URLs
- [ ] Setup CORS
- [ ] Test API integration

#### Opsi 3: PHP Backend Terpisah
- [ ] Deploy PHP ke hosting yang support PHP
- [ ] Setup database connection
- [ ] Update API endpoints di frontend
- [ ] Test API calls

---

## Fase 7: Frontend Integration 🎨

### Update HTML Files
- [ ] Update API URLs di JavaScript
- [ ] Replace `localhost:3000` dengan Vercel domain
- [ ] Test API calls dari frontend
- [ ] Implement error handling

### Test All Pages
- [ ] Landing page responsive
- [ ] Login form functional
- [ ] Dashboard loads
- [ ] Navigation working
- [ ] Mobile view optimal

### Performance Check
- [ ] Run Lighthouse audit
- [ ] Target score: 90+
- [ ] Check Core Web Vitals
- [ ] Test on slow network

---

## Fase 8: Testing & QA 🧪

### Functional Testing
- [ ] Landing page loads
- [ ] Button navigation working
- [ ] Form validation works
- [ ] Error messages display
- [ ] Login flow works (if backend ready)
- [ ] Dashboard displays
- [ ] Mobile responsive

### Security Testing
- [ ] HTTPS enabled (auto di Vercel)
- [ ] CORS configured
- [ ] Session secrets set
- [ ] No sensitive data in repo
- [ ] Environment variables secure

### Performance Testing
- [ ] Page load < 3 seconds
- [ ] CDN caching working
- [ ] Images optimized
- [ ] CSS/JS minified

---

## Fase 9: Monitoring & Logging 📊

### Setup Vercel Analytics
- [ ] Enable Analytics di Dashboard
- [ ] Monitor page performance
- [ ] Check error logs
- [ ] Setup alerts

### Monitor API
- [ ] Check `/api/health` regularly
- [ ] Monitor response times
- [ ] Check error logs in Vercel

### Database Monitoring
- [ ] Monitor query performance
- [ ] Check connection limits
- [ ] Monitor storage usage

---

## Fase 10: Documentation & Maintenance 📚

### Documentation
- [ ] Update README.md dengan live URL
- [ ] Document API endpoints
- [ ] Document setup process
- [ ] Add troubleshooting guide

### Maintenance Plan
- [ ] Schedule weekly health checks
- [ ] Plan database backups
- [ ] Monitor performance metrics
- [ ] Keep dependencies updated

---

## ❌ BLOCKERS & SOLUTIONS

### PHP Pages Tidak Muncul
**Problem:** PHP files tidak berjalan di Vercel
**Solution:** Konversi ke HTML atau deploy backend terpisah

### Database Connection Gagal
**Problem:** Cannot connect to database
**Solution:** 
- Verify credentials di `.env`
- Check firewall rules
- Test connection lokal terlebih dahulu

### 404 Errors
**Problem:** Routes tidak found
**Solution:**
- Check `vercel.json` routing
- Verify file paths
- Check case sensitivity

### Deployment Gagal
**Problem:** Build or deployment error
**Solution:**
- Check build logs di Vercel dashboard
- Verify `package.json` scripts
- Clear cache: `vercel --prod --clearCache`

---

## 🎯 SUCCESS CRITERIA

✅ **Deployment Success:**
- [ ] App live di Vercel URL
- [ ] Landing page loads < 2 seconds
- [ ] Mobile responsive
- [ ] All links working
- [ ] No console errors

✅ **Functionality:**
- [ ] Role selection working
- [ ] Login flow works (if backend ready)
- [ ] Dashboard displays
- [ ] Forms respond to input

✅ **Performance:**
- [ ] Lighthouse score > 90
- [ ] First paint < 1s
- [ ] Interactive < 2.5s

✅ **Security:**
- [ ] HTTPS enabled
- [ ] No sensitive data exposed
- [ ] Environment variables secured
- [ ] CORS properly configured

---

## 📞 QUICK LINKS

| Resource | Link |
|----------|------|
| Vercel Dashboard | https://vercel.com/dashboard |
| Project Settings | https://vercel.com/dashboard/settings |
| Deployments | https://vercel.com/dashboard/deployments |
| Docs | https://vercel.com/docs |
| CLI Docs | https://vercel.com/cli |

---

## 📋 NOTES

### Current Status:
- ✅ Frontend ready
- ✅ Vercel config ready
- ⏳ Backend needs setup
- ⏳ Database needs connection
- ⏳ API endpoints needs implementation

### Next Priority:
1. Deploy landing page ke Vercel ← START HERE
2. Setup database connection
3. Implement login API
4. Test authentication
5. Implement dashboard API
6. Full integration testing

---

**Last Updated:** 11 Feb 2026  
**Status:** Ready for Phase 1 ✅
