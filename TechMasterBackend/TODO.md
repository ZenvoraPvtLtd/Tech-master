# TODO - Events module updates

## Step 1 (in progress)
Update `src/modules/events/events.routes.js`:
- ✅ Make specified GET routes public (no auth)
- ✅ Apply auth middleware only to POST/PUT/DELETE routes
- ⏳ Add existing validation middleware to routes
- ✅ Attach existing upload middleware via `upload.single(...)` (currently only `media`)
- ⏳ Add upload.single(...) for other supported media fields (Hero/thumbnail/url/heroImage) once payload mapping is implemented

## Step 2
Update `src/modules/events/events.controller.js`:
- Call `activityLogService.logAction(...)` on successful CRUD and page settings update
- Ensure action/module/details/itemId match required spec
- Preserve exact response format

## Step 3
Update `src/modules/events/events.service.js`:
- Wire uploaded file fields into the payload (req.file.* -> correct model fields) without changing middleware
- Keep repository/service architecture

## Step 4
Update `src/modules/events/events.repository.js`:
- Make only minimal changes if needed to persist the fields introduced by file uploads

## Step 5
Sanity checks
- Start server and verify:
  - Public GET does not require Authorization
  - Protected mutations do require Authorization
  - Activity logs are created
  - Upload endpoints populate correct fields


