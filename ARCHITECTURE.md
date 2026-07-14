# 🎯 Complete System Architecture & Data Flow

## System Overview

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                    YOUR TECHMASTER SYSTEM                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Three separate but connected applications:

┌─────────────────────────┐
│   ADMIN DASHBOARD       │          ┌──────────────────┐
│   (zenvora3d)           │          │  BACKEND API     │
│                         │◄────────►│  (TechMasterBE)  │
│  - React + TypeScript   │   HTTP   │  - Express.js    │
│  - Port: 5173           │          │  - Port: 5000    │
│  - Manage content       │          │  - Validates     │
│                         │          │  - Stores data   │
└─────────────────────────┘          └────────┬─────────┘
                                              │
                                              │ MongoDB
                                              │ Connection
                                              ▼
                                    ┌─────────────────┐
                                    │  MONGODB ATLAS  │
                                    │  (Cloud DB)     │
                                    │  - Stores ALL   │
                                    │    content      │
                                    └────────┬────────┘
                                             │
                                             │
                                    ┌────────▼──────────┐
┌─────────────────────────┐         │  BACKEND API      │
│   MAIN WEBSITE          │         │  (TechMasterBE)   │
│   (TechMasterSher)      │◄────────│  - Serves data    │
│                         │   HTTP  │  - Port: 5000     │
│  - React + TypeScript   │         └───────────────────┘
│  - Port: 5174           │
│  - Display content      │
│                         │
└─────────────────────────┘
```

---

## Data Flow Scenarios

### Scenario 1: Admin Makes Changes

```
Step 1: Admin Opens Dashboard
┌────────────────────┐
│  zenvora3d         │
│  http://localhost  │
│  :5173             │
└────────────────────┘
         │
         │ User logs in
         ▼
┌────────────────────────────────────────────┐
│ POST /api/v1/admin/login                   │
│ {"email": "admin@gmail.com",               │
│  "password": "Admin@123"}                  │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  TechMasterBackend (Port 5000)             │
│  - Validate credentials in MongoDB         │
│  - Generate JWT token                      │
│  - Return token                            │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  Admin Dashboard                           │
│  - Store token in localStorage             │
│  - Display admin panel                     │
└────────────────────────────────────────────┘

Step 2: Admin Edits Content
┌────────────────────────────────────────────┐
│  Admin Dashboard                           │
│  - Admin changes hero headline text        │
│  - Clicks "Save"                           │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│ POST /api/v1/cms/update                    │
│ Headers: Authorization: Bearer <TOKEN>     │
│ {"key": "home",                            │
│  "value": {                                │
│    "hero": {                               │
│      "headline": "New Text"                │
│    }                                       │
│  }}                                        │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  TechMasterBackend (Port 5000)             │
│  - Verify JWT token ✓                      │
│  - Find/create CMSData doc with key="home" │
│  - Update value in database                │
│  - Save to MongoDB                         │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  MONGODB ATLAS                             │
│  Collection: CMSData                       │
│  Document: {                               │
│    "key": "home",                          │
│    "value": {...updated data...},          │
│    "updatedAt": "2024-07-14T10:30:00Z"     │
│  }                                         │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  TechMasterBackend Response                │
│  {                                         │
│    "success": true,                        │
│    "message": "Field home synchronized..." │
│  }                                         │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  Admin Dashboard                           │
│  ✅ Shows success message                  │
│  Data saved!                               │
└────────────────────────────────────────────┘
```

### Scenario 2: Website Displays Updated Content

```
Step 1: User Opens Website
┌────────────────────┐
│  TechMasterSher    │
│  http://localhost  │
│  :5174             │
└────────────────────┘
         │
         │ Page loads
         ▼
┌────────────────────────────────────────────┐
│  GET /api/v1/cms                           │
│  (No authentication needed)                │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  TechMasterBackend (Port 5000)             │
│  - Query MongoDB CMSData collection        │
│  - Read all documents                      │
│  - Convert to key-value pairs              │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  MONGODB ATLAS                             │
│  Find all documents in CMSData             │
│  {"key": "home", "value": {...}}           │
│  {"key": "about", "value": {...}}          │
│  {"key": "services", "value": {...}}       │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  TechMasterBackend Response                │
│  {                                         │
│    "success": true,                        │
│    "data": {                               │
│      "home": {...},                        │
│      "about": {...},                       │
│      "services": {...}                     │
│    }                                       │
│  }                                         │
└────────┬─────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│  TechMasterSher                            │
│  ✅ Display content from API               │
│  - Hero section shows new headline         │
│  - All other content updated               │
└────────────────────────────────────────────┘
```

---

## File Structure & Responsibilities

```
TechMasterBackend/
├── server.js
│   ├── Starts Express server on port 5000
│   ├── Setup CORS (allow frontend requests)
│   ├── Mount routes
│   ├── Health check endpoint
│   └── Error handling
│
├── .env
│   ├── MONGO_URI (MongoDB connection string)
│   ├── JWT_SECRET (token signing key)
│   ├── PORT (server port)
│   └── NODE_ENV (development/production)
│
├── src/config/
│   └── db.js
│       └── Connect to MongoDB with error logging
│
├── src/models/
│   ├── Admin.js (admin users)
│   ├── CMSData.js (website content - KEY FILE!)
│   ├── Enquiry.js (contact form submissions)
│   └── Resume.js (career page resumes)
│
├── src/routes/
│   ├── adminRoutes.js
│   │   ├── POST /login
│   │   ├── POST /logout
│   │   ├── PUT /change-password
│   │   └── POST /forgot-password
│   │
│   └── cmsRoutes.js (KEY FILE!)
│       ├── GET / (fetch all CMS data)
│       ├── POST /update (save admin changes)
│       ├── GET /public/resume (website fetch resumes)
│       └── POST /public/enquiry (website submit enquiry)
│
├── src/controllers/
│   ├── adminController.js
│   │   └── Handles login, logout, password
│   │
│   ├── cmsController.js (KEY FILE!)
│   │   ├── getCMSData() - returns all data
│   │   ├── updateCMSData() - saves admin changes
│   │   └── getResumesByCategory() - returns resumes
│   │
│   └── enquiryController.js
│       └── createEnquiry() - saves contact forms
│
├── src/middleware/
│   └── auth.js
│       └── protect() - JWT verification middleware
│
└── src/seed/
    └── seed.js
        └── Initialize default admin & data

─────────────────────────────────────────────

zenvora3d/
├── src/
│   ├── App.jsx
│   │   └── Main admin dashboard app
│   │
│   ├── context/
│   │   └── DatabaseContext.jsx (KEY FILE!)
│   │       ├── apiFetch() - API helper with auth
│   │       ├── login() - authenticate admin
│   │       ├── addItem() - add new items
│   │       ├── updateItem() - update items
│   │       └── deleteItem() - delete items
│   │       (All these sync to backend via /cms/update)
│   │
│   └── pages/
│       ├── Dashboard.jsx
│       ├── Home.jsx (edit home page)
│       ├── About.jsx (edit about page)
│       ├── Services.jsx (manage services)
│       └── ... (all pages that edit content)
│
└── .env (if needed for API URL)

─────────────────────────────────────────────

TechMasterSher/
├── src/
│   ├── App.tsx
│   │   └── Main website app
│   │
│   ├── context/
│   │   └── DataContext.tsx (KEY FILE!)
│   │       ├── fetchCMSData() - GET /api/v1/cms
│   │       ├── setData() - store in state
│   │       └── useEffect() - fetch on mount
│   │
│   └── pages/
│       ├── Home.tsx (display home data)
│       ├── About.tsx (display about data)
│       ├── Services.tsx (display services)
│       ├── Career.tsx (display resumes)
│       ├── Contact.tsx (submit enquiry)
│       └── ... (all pages display from API)
│
└── .env (if needed for API URL)

─────────────────────────────────────────────

MONGODB ATLAS
└── techmaster (database)
    ├── admins (collection)
    │   └── Documents: {name, email, password, role}
    │
    ├── cmsdata (collection) ⭐ MAIN DATA!
    │   └── Documents: {key, value, timestamps}
    │       Examples:
    │       - {key: "home", value: {hero: {...}}}
    │       - {key: "about", value: {name: "..."}}
    │       - {key: "services", value: [{...}]}
    │
    ├── enquiries (collection)
    │   └── Documents: {name, email, message, status}
    │
    └── resumes (collection)
        └── Documents: {name, position, email, resume}
```

---

## Critical Data Flow Path

```
The MOST IMPORTANT data flow:

┌─────────────────────────────────────────────────────────┐
│ Admin Dashboard (zenvora3d)                             │
│ - User edits content                                    │
│ - Calls: apiFetch("/cms/update", {...})                │
└────────┬────────────────────────────────────────────────┘
         │
         │ POST http://localhost:5000/api/v1/cms/update
         │ Authorization: Bearer <token>
         │ {key: "home", value: {...}}
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ Backend (server.js → cmsRoutes → cmsController)         │
│ - Verify token in middleware (auth.js)                 │
│ - Find CMSData doc with key="home"                      │
│ - Update value field                                    │
│ - Save to MongoDB                                       │
└────────┬────────────────────────────────────────────────┘
         │
         │ await CMSData.findOne({key})
         │ → cmsItem.value = value
         │ → cmsItem.save()
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ MongoDB Atlas Database                                   │
│ Database: techmaster                                    │
│ Collection: cmsdata                                     │
│ Document updated in MongoDB                            │
└────────┬────────────────────────────────────────────────┘
         │
         │ Data now stored ✅
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ Main Website (TechMasterSher)                           │
│ - Page loads or refreshes                              │
│ - Calls: fetch("/api/v1/cms")                          │
└────────┬────────────────────────────────────────────────┘
         │
         │ GET http://localhost:5000/api/v1/cms
         │ (No auth needed)
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ Backend (cmsController.getCMSData)                      │
│ - Query: CMSData.find({})                              │
│ - Return all documents as {key: value} map             │
└────────┬────────────────────────────────────────────────┘
         │
         │ Database query executes
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ MongoDB Atlas Database                                   │
│ Returns all CMSData documents                          │
└────────┬────────────────────────────────────────────────┘
         │
         │ {success: true, data: {
         │   home: {...updated data...},
         │   about: {...},
         │   services: {...}
         │ }}
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│ Website Display                                         │
│ ✅ Shows updated content to visitors                    │
│ - New hero text appears                                │
│ - All other content updated                            │
└─────────────────────────────────────────────────────────┘
```

---

## Required Environment Variables

### TechMasterBackend/.env
```env
# MongoDB connection (copy from MongoDB Atlas)
MONGO_URI=mongodb+srv://Noopur_11:Gunu%40123@cluster0.zsrsakf.mongodb.net/techmaster?retryWrites=true&w=majority

# JWT secret for authentication
JWT_SECRET=techmaster_secret_jwt_key_123

# Server port
PORT=5000

# Environment
NODE_ENV=development
```

---

## API Authentication Flow

```
┌──────────────────────────────────────────────────────────┐
│ PROTECTED ENDPOINTS (require JWT token)                 │
│ - POST /api/v1/cms/update                              │
│ - PUT /api/v1/admin/change-password                    │
└──────────────────────────────────────────────────────────┘

Request with Token:
```
POST /api/v1/cms/update
Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Body: {"key": "home", "value": {...}}
```

Backend Middleware (auth.js):
1. Extract token from Authorization header
2. Remove "Bearer " prefix
3. Verify token signature using JWT_SECRET
4. If valid ✓ → Continue to controller
5. If invalid ✗ → Return 401 Unauthorized

```
┌──────────────────────────────────────────────────────────┐
│ PUBLIC ENDPOINTS (no auth required)                     │
│ - GET /api/v1/cms                                      │
│ - GET /api/v1/cms/public/resume                        │
│ - POST /api/v1/cms/public/enquiry                      │
│ - GET /health                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Troubleshooting Quick Reference

| Symptom | Check | Solution |
|---------|-------|----------|
| "Backend connection refused" | Backend running? | `npm start` in TechMasterBackend |
| "MongoDB connect ECONNREFUSED" | .env MONGO_URI? | Copy from MongoDB Atlas |
| "Cannot POST /cms/update" | Token valid? | Re-login to admin dashboard |
| "Cannot GET /cms/public/resume" | Route exists? | Pull latest code |
| "Changes not appearing on website" | Backend logs? | Check for ✅ success message |
| "CORS errors" | CORS config? | Restart backend server |

