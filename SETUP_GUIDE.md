# TechMaster Full Stack Setup Guide

## 📋 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  zenvora3d (Admin Dashboard)                                   │
│  - Frontend: React + TypeScript                                │
│  - Manages CMS content                                         │
│  - Makes API calls to Backend                                  │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    API Calls: http://localhost:5000/api/v1
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                                                                 │
│  TechMasterBackend (Express Server)                            │
│  - Port: 5000                                                  │
│  - Routes: /api/v1/admin, /api/v1/cms                          │
│  - Authenticates admin changes                                 │
│  - Stores/Fetches data from MongoDB                            │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                  MongoDB Connection (MONGO_URI in .env)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                                                                 │
│  MongoDB Database (Cloud or Local)                             │
│  - Database: techmaster                                        │
│  - Collections: CMSData, Admin, Enquiry                        │
│                                                                 │
└──────────────────────────────────────────────────────────────────┘
                             │
                   Fetches CMS Data (Read-only)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                                                                 │
│  TechMasterSher (Main Website)                                 │
│  - Frontend: React + TypeScript                                │
│  - Displays content from Backend API                           │
│  - http://localhost:5000/api/v1/cms                            │
│                                                                 │
└──────────────────────────────────────────────────────────────────┘
```

## 🚀 Step-by-Step Setup

### 1. Start MongoDB Connection

**Check if MongoDB is running:**
```bash
# Windows - Check MongoDB Atlas Connection
# Open: https://cloud.mongodb.com
# Login with credentials and check if cluster is active
```

### 2. Setup Backend (TechMasterBackend)

```bash
cd TechMasterBackend

# Install dependencies
npm install

# Verify .env file exists with:
# MONGO_URI=mongodb+srv://Noopur_11:Gunu%40123@cluster0.zsrsakf.mongodb.net/techmaster?retryWrites=true&w=majority
# JWT_SECRET=techmaster_secret_jwt_key_123
# PORT=5000
# NODE_ENV=development

# Start the server
npm start
# Output: Backend server successfully active on port 5000
```

### 3. Start Admin Dashboard (zenvora3d)

```bash
cd zenvora3d

# Install dependencies
npm install

# Start development server
npm run dev
# Usually opens at http://localhost:5173 or similar
```

### 4. Start Main Website (TechMasterSher)

```bash
cd TechMasterSher

# Install dependencies
npm install

# Start development server
npm run dev
# Usually opens at http://localhost:5174 or similar
```

## 🔄 How Data Flows

### Scenario 1: Admin Updates CMS Content
1. Admin logs in via zenvora3d dashboard
2. Admin makes changes (e.g., updates home page hero text)
3. Frontend calls: `POST http://localhost:5000/api/v1/cms/update`
   ```json
   {
     "key": "home",
     "value": { "hero": { "headline": "New Headline" }, ... }
   }
   ```
4. Backend receives the request
5. Backend finds/updates document in MongoDB collection `CMSData`
6. Frontend gets confirmation and updates UI

### Scenario 2: Website Fetches Latest Content
1. TechMasterSher loads or refreshes
2. Frontend calls: `GET http://localhost:5000/api/v1/cms`
3. Backend queries all CMS documents from MongoDB
4. Backend returns all data as key-value pairs
5. Frontend displays the content on website

## 🔧 Troubleshooting

### Issue 1: "Connection refused" error
**Problem:** Backend isn't running or port 5000 is blocked
**Solution:**
```bash
# Check if backend is running
# Kill any process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Then restart backend
npm start
```

### Issue 2: "Failed to connect to MongoDB"
**Problem:** MongoDB Atlas connection string is wrong or cluster is not running
**Solution:**
```bash
# 1. Go to https://cloud.mongodb.com
# 2. Select your cluster "cluster0"
# 3. Click "Connect" button
# 4. Copy connection string
# 5. Update in TechMasterBackend/.env MONGO_URI=
# 6. Make sure username:password has % escaped as %40 for special chars
# 7. Restart backend (npm start)
```

### Issue 3: Admin changes not appearing on website
**Problem:** Data isn't syncing between admin dashboard and website
**Check:**
```bash
# 1. Open browser DevTools (F12) on zenvora3d
# 2. Check Network tab when making changes
# 3. Look for POST http://localhost:5000/api/v1/cms/update
# 4. Check if response is { success: true }
# 5. If error, check backend console for error messages

# 2. Check if TechMasterSher is fetching data
# Open TechMasterSher in DevTools
# Check Network tab for GET http://localhost:5000/api/v1/cms
# Check if data is being returned
```

### Issue 4: CORS Error
**Problem:** Frontend can't communicate with backend
**Solution:** Already fixed in backend with:
```javascript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 📡 API Endpoints Reference

### CMS Endpoints
```
GET  /api/v1/cms                    - Fetch all CMS data
POST /api/v1/cms/update             - Update CMS data (requires auth)
POST /api/v1/cms/public/enquiry     - Submit enquiry (public)
```

### Admin Endpoints
```
POST /api/v1/admin/login            - Login admin
POST /api/v1/admin/logout           - Logout admin
PUT  /api/v1/admin/change-password  - Change password (requires auth)
POST /api/v1/admin/forgot-password  - Request password reset
```

## 🎯 Key Files to Watch

**Backend:**
- `/TechMasterBackend/.env` - Configuration
- `/TechMasterBackend/server.js` - Main server
- `/TechMasterBackend/src/config/db.js` - MongoDB connection

**Admin Dashboard:**
- `/zenvora3d/src/context/DatabaseContext.jsx` - Data management & API calls
- `/zenvora3d/.env` - Frontend config (if needed)

**Website:**
- `/TechMasterSher/src/context/DataContext.tsx` - Fetches from backend API

## 💡 Quick Start Commands

```bash
# Terminal 1 - Backend
cd TechMasterBackend
npm install
npm start

# Terminal 2 - Admin Dashboard
cd zenvora3d
npm install
npm run dev

# Terminal 3 - Main Website
cd TechMasterSher
npm install
npm run dev
```

Then open:
- Admin Dashboard: http://localhost:5173 (or port shown)
- Website: http://localhost:5174 (or port shown)
- Backend API: http://localhost:5000/api/v1

## 🔐 Default Admin Credentials
- Email: `admin@gmail.com`
- Password: `Admin@123`

(Can be changed in backend admin login)

## ✅ Testing the Connection

1. **Test MongoDB Connection:**
   - Open backend console
   - Should see: "MongoDB cluster connection established successfully."

2. **Test Admin Login:**
   - Go to admin dashboard
   - Login with credentials above
   - Should see: "Login successful"

3. **Test Data Sync:**
   - Make any change in admin dashboard
   - Check backend console for API calls
   - Refresh main website
   - Verify changes appear on website

