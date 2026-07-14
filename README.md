# 📚 TechMaster Documentation Index

Welcome! This is your complete guide to the TechMaster system. Start here to find what you need.

---

## 🎯 Quick Navigation

### I want to...

#### 🚀 **Get Started Immediately**
→ Read: [QUICK_START.md](./QUICK_START.md)
- 3 simple commands to start everything
- Takes 5 minutes
- Best for first-time setup

#### 🔧 **Set Up the System Properly**
→ Read: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Complete step-by-step guide
- Architecture overview
- Troubleshooting common issues
- Understanding how it all connects

#### 🔍 **Debug Problems**
→ Read: [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)
- Diagnosis checklist
- Verify each component works
- Solutions for 5 common issues
- Test APIs manually

#### 📖 **Understand the Architecture**
→ Read: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Visual diagrams
- Data flow scenarios
- File structure & responsibilities
- Critical paths explained

#### 💻 **Integrate with APIs**
→ Read: [API_INTEGRATION.md](./API_INTEGRATION.md)
- All endpoints explained
- Request/response examples
- React code examples
- JWT authentication details

#### 📋 **Review What Was Fixed**
→ Read: [FIXES_SUMMARY.md](./FIXES_SUMMARY.md)
- Problems identified
- Fixes applied
- Documentation created
- Testing procedures

---

## 📂 Document Quick Reference

| Document | Purpose | Read Time | For |
|----------|---------|-----------|-----|
| [QUICK_START.md](./QUICK_START.md) | Get running in 3 commands | 5 min | Everyone |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Complete setup with details | 20 min | First-time setup |
| [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md) | Fix problems step-by-step | 15 min | Troubleshooting |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Understand system design | 25 min | Learning system |
| [API_INTEGRATION.md](./API_INTEGRATION.md) | API reference for devs | 30 min | Development |
| [FIXES_SUMMARY.md](./FIXES_SUMMARY.md) | What was fixed and improved | 10 min | Understanding changes |

---

## 🎯 Quick Start

### Step 1: Start Backend
```bash
cd TechMasterBackend
npm install
npm start
```
✅ Wait for: `🚀 Backend server successfully active on port 5000`

### Step 2: Start Admin Dashboard (New Terminal)
```bash
cd zenvora3d
npm install
npm run dev
```
✅ Open: http://localhost:5173
Login: `admin@gmail.com` / `Admin@123`

### Step 3: Start Main Website (New Terminal)
```bash
cd TechMasterSher
npm install
npm run dev
```
✅ Open: http://localhost:5174

---

## 🧪 Test It Works

1. Go to Admin Dashboard
2. Edit any section (e.g., Home Page)
3. Change a field and save
4. Refresh Main Website
5. Check if change appears ✅

If not working, check [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)

---

## 🚨 Troubleshooting Quick Links

**Backend won't start?**
→ [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)

**Can't connect to MongoDB?**
→ [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)

**Admin login not working?**
→ [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)

**Changes not appearing on website?**
→ [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)

**CORS errors?**
→ [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)

---

## 📊 Data Flow Visualization

```
ADMIN CHANGES DATA
    ↓
Admin Dashboard edits content
    ↓
POST /api/v1/cms/update
    ↓
Backend validates & saves
    ↓
MongoDB stores data ✅
    ↓
---
    ↓
WEBSITE DISPLAYS DATA
    ↓
Website loads or refreshes
    ↓
GET /api/v1/cms
    ↓
Backend fetches from MongoDB
    ↓
Returns all data as JSON
    ↓
Website displays content ✅
```

---

## 🔐 Default Credentials

**Admin Dashboard Login:**
- Email: `admin@gmail.com`
- Password: `Admin@123`

**MongoDB Connection:**
- Cluster: `cluster0.zsrsakf.mongodb.net`
- Database: `techmaster`
- User: `Noopur_11`

---

## 📞 Key Files to Know

### Backend
- `TechMasterBackend/server.js`
- `TechMasterBackend/src/config/db.js`
- `TechMasterBackend/src/controllers/cmsController.js`
- `TechMasterBackend/src/routes/cmsRoutes.js`

### Admin Dashboard
- `zenvora3d/src/context/DatabaseContext.jsx`

### Website
- `TechMasterSher/src/context/DataContext.tsx`

### Database
- MongoDB Atlas: `techmaster` database

---

## ✅ Checklist: Everything Working

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] `http://localhost:5000/health` returns success
- [ ] Admin dashboard loads on `http://localhost:5173`
- [ ] Admin login works
- [ ] Main website loads on `http://localhost:5174`
- [ ] Changes appear on website after refresh

---

## 📚 Next Steps

- Read [QUICK_START.md](./QUICK_START.md)
- Use [SETUP_GUIDE.md](./SETUP_GUIDE.md) for full setup
- Use [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md) for issues
- Use [API_INTEGRATION.md](./API_INTEGRATION.md) for API details
- Use [ARCHITECTURE.md](./ARCHITECTURE.md) for system design

---

**Last Updated:** July 14, 2026

Happy coding! 🚀
