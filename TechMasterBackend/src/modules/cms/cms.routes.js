import express from "express";
import cmsController from "./cms.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

// Fetch all settings/data
router.get("/", cmsController.getCMSData);

// Save / Update dynamic key
router.post("/update", authMiddleware, cmsController.updateCMSKey);

// Staged uploading (Cloudinary endpoint)
router.post("/upload", authMiddleware, upload.single("file"), cmsController.uploadMedia);

// Public forms (Enquiries & Resumes)
router.post("/public/enquiry", cmsController.publicSubmitEnquiry);
router.post("/public/resume", upload.single("resume"), cmsController.publicSubmitResume);

export default router;
