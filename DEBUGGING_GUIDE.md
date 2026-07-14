# 🔍 TechMaster - Debugging Guide

## Problem: Data Not Syncing from Admin Dashboard to Website

### Quick Diagnosis Checklist

- [ ] Backend server is running on port 5000
- [ ] MongoDB is connected (check console for ✅ message)
- [ ] Admin dashboard can log in
- [ ] Admin makes changes in dashboard
- [ ] Website shows the updated data

---

## Step 1: Verify Backend is Running

### Check Backend Health

```bash
# Terminal 1
cd TechMasterBackend
npm start
```

**Expected Output:**
```
🔄 Attempting MongoDB connection...
📍 Database: techmaster
✅ MongoDB cluster connection established successfully.
📊 Connected to database: techmaster
🚀 Backend server successfully active on port 5000
📡 API Base URL: http://localhost:5000/api/v1
🏥 Health Check: http://localhost:5000/health
```

**If you see errors, see Troubleshooting section below.**

### Test Health Endpoint

Open browser and visit:
```
http://localhost:5000/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2024-07-14T10:30:00.000Z",
  "port": 5000
}
```

---

## Step 2: Verify MongoDB Connection

### Check Console Logs

Look at your backend console output after running `npm start`:

**✅ GOOD - Database is connected:**
```
✅ MongoDB cluster connection established successfully.
📊 Connected to database: techmaster
```

**❌ BAD - Connection failed:**
```
❌ MongoDB connection failure: connect ECONNREFUSED 127.0.0.1:27017
```

### Verify Connection String

Check your `.env` file in `TechMasterBackend/`:

```env
MONGO_URI=mongodb+srv://Noopur_11:Gunu%40123@cluster0.zsrsakf.mongodb.net/techmaster?retryWrites=true&w=majority
```

**Important Notes:**
- `%40` is the URL-encoded `@` symbol
- `%23` is the URL-encoded `#` symbol
- If password contains special chars, they must be URL-encoded

### Test MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Login with your credentials
3. Select "cluster0"
4. Click "Connect"
5. Verify your IP is whitelisted
6. Check cluster status is "Active"

---

## Step 3: Test Admin Dashboard Login

### Start Admin Dashboard

```bash
# Terminal 2
cd zenvora3d
npm run dev
```

**Open:** http://localhost:5173 (or shown port)

### Login with Default Credentials

- **Email:** `admin@gmail.com`
- **Password:** `Admin@123`

### Check Browser Console

Press `F12` to open Developer Tools:

1. Go to **Console** tab
2. Look for any error messages in red
3. Check for "Failed to fetch" errors

**✅ GOOD - Should see:**
```
Fetched CMS data: { home: {...}, about: {...}, ... }
```

**❌ BAD - Should NOT see:**
```
Failed to fetch CMS state from backend
TypeError: Cannot fetch from http://localhost:5000/api/v1/cms
```

---

## Step 4: Test Data Sync

### Make a Change in Admin Dashboard

1. Log in to admin dashboard
2. Go to any section (e.g., Home Page, About)
3. Edit any field (e.g., change headline text)
4. Save/Update the change

### Check Browser Network Tab

Press `F12` and go to **Network** tab:

1. Make a change in the dashboard
2. Look for a request to `http://localhost:5000/api/v1/cms/update`
3. Click on it to see details

**✅ GOOD - Status should be 200:**
```
POST http://localhost:5000/api/v1/cms/update 200 OK

Request Body:
{
  "key": "home",
  "value": { "hero": { "headline": "New Text" }, ... }
}

Response:
{
  "success": true,
  "message": "Field home synchronized successfully.",
  "data": { "_id": "...", "key": "home", "value": {...} }
}
```

**❌ BAD - Status should NOT be 401/403/500:**
```
POST http://localhost:5000/api/v1/cms/update 401 Unauthorized
POST http://localhost:5000/api/v1/cms/update 500 Internal Server Error
```

### Check Backend Console

Look at your backend terminal for logs:

**✅ GOOD:**
```
📝 Updating CMS data - Key: home
✅ CMS item updated - Key: home
```

**❌ BAD:**
```
❌ Error updating CMS data for key "home": [error message]
```

---

## Step 5: Verify Website Gets Updated Data

### Start Main Website

```bash
# Terminal 3
cd TechMasterSher
npm run dev
```

**Open:** http://localhost:5174 (or shown port)

### Check if Website Fetches Data

Press `F12` and go to **Network** tab:

1. Refresh the website page
2. Look for request to `http://localhost:5000/api/v1/cms`
3. Click on it to see details

**✅ GOOD - Should return all data:**
```
GET http://localhost:5000/api/v1/cms 200 OK

Response:
{
  "success": true,
  "data": {
    "home": { ... },
    "about": { ... },
    "services": { ... },
    ...
  }
}
```

**❌ BAD - Empty data:**
```
{
  "success": true,
  "data": {}
}
```

### Verify Changed Data Appears

1. Check if your admin changes are reflected in the website
2. Refresh the website page
3. Verify the new content shows up

---

## Common Issues & Solutions

### Issue 1: "Failed to connect to MongoDB"

**Symptoms:**
- Backend won't start
- Error: `connect ECONNREFUSED` or `ServerSelectionError`

**Solutions:**

A) **Check MongoDB Atlas is running:**
   - Go to https://cloud.mongodb.com
   - Login and select your cluster
   - Ensure cluster status is "Active" (not paused)

B) **Check connection string format:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.zsrsakf.mongodb.net/techmaster?retryWrites=true&w=majority
   ```
   - Replace `username` with your MongoDB user
   - Replace `password` (URL-encoded)
   - Ensure database name is correct

C) **Check IP Whitelist:**
   - MongoDB Atlas → Network Access
   - Add your IP address
   - Or add `0.0.0.0/0` to allow all (development only)

D) **Test connection manually:**
   ```bash
   # Windows PowerShell
   Test-NetConnection -ComputerName cluster0.zsrsakf.mongodb.net -Port 27017
   ```

---

### Issue 2: "Backend server refused connection"

**Symptoms:**
- Admin dashboard shows error: "Cannot fetch from localhost:5000"
- Website shows error: "Failed to fetch from backend"

**Solutions:**

A) **Check if backend is running:**
   ```bash
   cd TechMasterBackend
   npm start
   # Should see: 🚀 Backend server successfully active on port 5000
   ```

B) **Check if port 5000 is already in use:**
   ```powershell
   # Windows
   netstat -ano | findstr :5000
   # If shows a PID, kill it:
   taskkill /PID <PID_NUMBER> /F
   
   # Then restart backend
   npm start
   ```

C) **Check firewall:**
   - Windows Firewall might block port 5000
   - Add exception for Node.js in firewall

---

### Issue 3: "401 Unauthorized" when updating data

**Symptoms:**
- Admin makes changes
- Network tab shows: `POST .../cms/update 401 Unauthorized`

**Solutions:**

A) **Check admin is logged in:**
   - Refresh admin dashboard
   - Re-login with credentials
   - Check browser console for errors

B) **Check token is being sent:**
   - Press F12 → Network
   - Look at request headers for `Authorization: Bearer <token>`
   - If missing, login isn't working

C) **Verify JWT secret in .env:**
   ```env
   JWT_SECRET=techmaster_secret_jwt_key_123
   ```

---

### Issue 4: "Changes appear in admin dashboard but not on website"

**Symptoms:**
- Admin updates data
- Sees confirmation message
- Website still shows old data

**Solutions:**

A) **Check if data is saved to MongoDB:**
   - Look at backend console
   - Should see: `✅ CMS item updated - Key: home`
   - If not, update isn't reaching database

B) **Check website is fetching new data:**
   - Refresh website (Ctrl+F5 to clear cache)
   - Open DevTools Network tab
   - Should see GET request to `/api/v1/cms`
   - Check if response contains updated data

C) **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cache and refresh website

D) **Check if website is reading from correct backend:**
   - Look for hardcoded API URL in website code
   - Should be: `http://localhost:5000/api/v1/cms`

---

### Issue 5: "CORS Error" when frontend tries to connect

**Symptoms:**
- Error: `Access to XMLHttpRequest blocked by CORS policy`
- Admin dashboard/Website can't reach backend

**Solutions:**

✅ **Already fixed in backend** with:
```javascript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

If still getting CORS error:
- Restart backend (the CORS fix requires restart)
- Check that you're using `http://` not `https://` for localhost

---

## Testing API Endpoints Manually

### Using Postman or cURL

**Test 1: Health Check**
```bash
curl http://localhost:5000/health
```

**Test 2: Get All CMS Data**
```bash
curl http://localhost:5000/api/v1/cms
```

**Test 3: Admin Login**
```bash
curl -X POST http://localhost:5000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"Admin@123"}'
```

**Test 4: Update CMS Data** (requires token from login)
```bash
curl -X POST http://localhost:5000/api/v1/cms/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{"key":"home","value":{"hero":{"headline":"Test"}}}'
```

---

## Check MongoDB Data Directly

### Use MongoDB Atlas UI

1. Go to https://cloud.mongodb.com
2. Login → Select Cluster
3. Collections → Select `techmaster` database
4. Browse collections:
   - `cmsdata` - Contains your website content
   - `admins` - Admin users
   - `enquiries` - Submitted enquiries

You should see documents like:
```json
{
  "_id": "...",
  "key": "home",
  "value": { ... },
  "createdAt": "2024-07-14T...",
  "updatedAt": "2024-07-14T..."
}
```

---

## Full Testing Workflow

```bash
# 1. Start Backend
cd TechMasterBackend
npm start
# Wait for: ✅ MongoDB cluster connection established

# 2. Test Health Endpoint
# Open: http://localhost:5000/health
# Should see success: true

# 3. Start Admin Dashboard
# Terminal 2
cd zenvora3d
npm run dev

# 4. Login to Admin Dashboard
# http://localhost:5173
# Email: admin@gmail.com
# Password: Admin@123

# 5. Make a Test Change
# Edit any field and save

# 6. Check Backend Console
# Should see: ✅ CMS item updated

# 7. Start Main Website
# Terminal 3
cd TechMasterSher
npm run dev

# 8. Verify Change on Website
# http://localhost:5174
# Refresh and check if change appears

# 9. Check Browser DevTools
# Network tab should show successful requests
```

---

## Getting Help

If you're still stuck, collect the following information:

1. **Backend Console Output:**
   ```
   (Copy entire console output)
   ```

2. **Network Tab Screenshot:**
   - Browser DevTools → Network tab
   - Screenshot of requests/responses

3. **Error Message:**
   - Full error text from console or browser

4. **Steps to Reproduce:**
   - What you did
   - What you expected
   - What actually happened

