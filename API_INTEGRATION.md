# 🔗 API Integration Guide

## Complete Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  ADMIN DASHBOARD (zenvora3d)                │
│  React Frontend - Port: 5173                                │
│                                                             │
│  User edits content → Calls API → Data saved to MongoDB    │
└──────────────────────┬──────────────────────────────────────┘
                       │
              API Call (POST /api/v1/cms/update)
          Authentication: JWT Bearer Token
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS BACKEND (TechMasterBackend)             │
│  Port: 5000 - API Server                                   │
│                                                             │
│  - Validates request authentication                        │
│  - Processes data                                          │
│  - Stores in MongoDB                                       │
│  - Returns confirmation                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
              Database Write Operation
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│           MONGODB ATLAS (Cloud Database)                    │
│                                                             │
│  Collection: CMSData                                       │
│  Example Document:                                         │
│  {                                                         │
│    "_id": "...",                                           │
│    "key": "home",                                          │
│    "value": {                                              │
│      "hero": {                                             │
│        "headline": "Welcome to Tech Master"                │
│      }                                                     │
│    },                                                      │
│    "updatedAt": "2024-07-14T10:30:00Z"                    │
│  }                                                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
              Database Read Operation
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS BACKEND (TechMasterBackend)             │
│                                                             │
│  API Call: GET /api/v1/cms                                 │
│  - Reads all CMS data from MongoDB                         │
│  - Returns as JSON response                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
              API Response (JSON)
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│           MAIN WEBSITE (TechMasterSher)                     │
│  React Frontend - Port: 5174                               │
│                                                             │
│  Displays content from API on website                      │
└─────────────────────────────────────────────────────────────┘
```

---

## API Endpoints Reference

### Base URL
```
http://localhost:5000/api/v1
```

### CMS Endpoints

#### 1. GET /cms
**Fetch all CMS data**

```http
GET http://localhost:5000/api/v1/cms
```

**Response:**
```json
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

**Used by:** TechMasterSher (main website) to get all content

---

#### 2. POST /cms/update
**Update CMS data (requires authentication)**

```http
POST http://localhost:5000/api/v1/cms/update
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

{
  "key": "home",
  "value": {
    "hero": {
      "headline": "New Headline",
      "paragraph": "New paragraph..."
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Field home synchronized successfully.",
  "data": {
    "_id": "64a8f2c1d5e3f4g5h6i7j8k9",
    "key": "home",
    "value": { ... },
    "createdAt": "2024-07-14T09:00:00Z",
    "updatedAt": "2024-07-14T10:30:00Z"
  }
}
```

**Used by:** zenvora3d (admin dashboard) to save changes

**Error Responses:**
```json
// 401 - Not authenticated
{
  "success": false,
  "message": "Unauthorized"
}

// 400 - Missing key parameter
{
  "success": false,
  "message": "Field key parameter is missing."
}
```

---

#### 3. POST /cms/public/enquiry
**Submit enquiry (public endpoint, no auth required)**

```http
POST http://localhost:5000/api/v1/cms/public/enquiry
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "category": "Inquiry",
  "company": "ABC Corp",
  "message": "I'm interested in your services..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully.",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "category": "Inquiry",
    "company": "ABC Corp",
    "message": "...",
    "createdAt": "2024-07-14T10:30:00Z"
  }
}
```

**Used by:** TechMasterSher (Contact page) to submit enquiries

---

#### 4. GET /cms/public/resume
**Fetch resumes (public endpoint)**

```http
GET http://localhost:5000/api/v1/cms/public/resume
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "res-1",
      "name": "John Doe",
      "position": "Software Engineer",
      "email": "john@example.com",
      "phone": "+91-9876543210",
      "experienceYears": 5,
      "skills": ["React", "Node.js", "MongoDB"],
      "resumeUrl": "https://...",
      "status": "New",
      "createdAt": "2024-07-14T09:00:00Z"
    }
  ]
}
```

**Used by:** TechMasterSher (Career page) to display resumes

---

### Admin Endpoints

#### 1. POST /admin/login
**Authenticate admin user**

```http
POST http://localhost:5000/api/v1/admin/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "64a8f2c1d5e3f4g5h6i7j8k9",
      "name": "Aman",
      "email": "admin@gmail.com",
      "role": "Master Admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Used by:** zenvora3d (admin dashboard login page)

---

#### 2. POST /admin/logout
**Logout admin user**

```http
POST http://localhost:5000/api/v1/admin/logout
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 3. PUT /admin/change-password
**Change admin password**

```http
PUT http://localhost:5000/api/v1/admin/change-password
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

{
  "oldPassword": "Admin@123",
  "newPassword": "NewPassword@456",
  "confirmPassword": "NewPassword@456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

#### 4. POST /admin/forgot-password
**Request password reset**

```http
POST http://localhost:5000/api/v1/admin/forgot-password
Content-Type: application/json

{
  "email": "admin@gmail.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reset link sent to your email"
}
```

---

### Utility Endpoints

#### Health Check
**Check if backend is running**

```http
GET http://localhost:5000/health
```

**Response:**
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2024-07-14T10:30:00Z",
  "port": 5000
}
```

**Use this to test if backend is running without needing authentication**

---

## Frontend Integration Examples

### React Component - Fetching CMS Data

```jsx
// TechMasterSher/src/context/DataContext.tsx
const fetchCMSData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/cms");
    if (!response.ok) throw new Error("Failed to fetch");
    
    const result = await response.json();
    if (result.success && result.data) {
      setData(result.data);
      console.log('Fetched data:', result.data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// Call on component mount
useEffect(() => {
  fetchCMSData();
}, []);
```

### React Component - Updating CMS Data

```jsx
// zenvora3d/src/context/DatabaseContext.jsx
const updateCMSData = async (key, value) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/api/v1/cms/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ key, value })
    });
    
    const result = await response.json();
    if (result.success) {
      console.log("Update successful:", result.data);
      return { success: true };
    } else {
      console.error("Update failed:", result.message);
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error("API error:", error);
    return { success: false, message: error.message };
  }
};
```

---

## Authentication Flow

### JWT Token Flow

```
1. Admin Login
   POST /admin/login
   {email, password}
        ↓
   Backend validates credentials
   Backend generates JWT token
   Returns token to frontend
        ↓
2. Store Token in Frontend
   localStorage.setItem('token', response.data.token)
        ↓
3. Use Token for Protected Endpoints
   POST /cms/update
   Header: Authorization: Bearer <token>
        ↓
4. Backend Validates Token
   Middleware checks Authorization header
   Verifies JWT signature with JWT_SECRET
   If valid → Process request
   If invalid → Return 401 Unauthorized
```

### Token Structure

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiQW1hbiIsImlhdCI6MTUxNjIzOTAyMn0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

## Data Sync Confirmation

### Successful Update Flow

```
Admin Dashboard (zenvora3d)
  ↓
User edits field and clicks "Save"
  ↓
Frontend makes POST request
  ↓
Backend receives request
  ↓
Backend writes to MongoDB
  ↓
Frontend gets ✅ confirmation
  ↓
Main Website (TechMasterSher)
  ↓
Website makes GET request to /api/v1/cms
  ↓
Backend returns updated data
  ↓
Website displays new content
```

---

## Monitoring & Debugging

### Backend Console Logs

When admin updates data, you should see in backend console:

```
📝 Updating CMS data - Key: home
✅ CMS item updated - Key: home
```

When website fetches data:

```
✅ CMS Data fetched successfully: ['home', 'about', 'services']
```

### Frontend Console Logs

In admin dashboard browser console:

```javascript
// When updating
console.log("Update successful")

// When fetching
console.log("Fetched CMS data:", {data object})
```

### Network Tab Monitoring

**Admin Dashboard Update:**
```
Request: POST /api/v1/cms/update
Status: 200 OK
Response: {success: true, data: {...}}
```

**Website Fetch:**
```
Request: GET /api/v1/cms
Status: 200 OK
Response: {success: true, data: {...}}
```

