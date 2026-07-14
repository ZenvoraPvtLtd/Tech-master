# 🚀 Quick Start - 3 Commands

## Windows Command Prompt / PowerShell

### Step 1: Start Backend
```bash
cd TechMasterBackend
npm install
npm start
```
✅ Wait for this message: `🚀 Backend server successfully active on port 5000`

---

### Step 2: Start Admin Dashboard (New Terminal)
```bash
cd zenvora3d
npm install
npm run dev
```
✅ Open: http://localhost:5173
Login: `admin@gmail.com` / `Admin@123`

---

### Step 3: Start Website (New Terminal)
```bash
cd TechMasterSher
npm install
npm run dev
```
✅ Open: http://localhost:5174

---

## Test It's Working

1. **Go to Admin Dashboard** (http://localhost:5173)
2. **Login** with admin@gmail.com / Admin@123
3. **Edit something** (e.g., Home Page section)
4. **Refresh Website** (http://localhost:5174)
5. **Check if changes appear** ✅

---

## MongoDB Troubleshooting

If backend won't start with MongoDB error:

1. Go to https://cloud.mongodb.com
2. Login to your account
3. Select "cluster0"
4. Check if cluster status is "Active"
5. Click "Connect" and verify your IP is whitelisted
6. Restart backend: `npm start`

---

## If Still Not Working

Run this from Backend folder:
```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "success": true,
  "message": "Backend is running"
}
```

If error, check [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md)
