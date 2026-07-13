import express from "express";
import CMSData from "../models/CMS.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Retrieve all CMS key-value pairs
router.get("/", async (req, res, next) => {
  try {
    const documents = await CMSData.find({});
    const cmsMap = {};
    documents.forEach((doc) => {
      cmsMap[doc.key] = doc.data;
    });

    return res.status(200).json({
      success: true,
      data: cmsMap,
    });
  } catch (error) {
    next(error);
  }
});

// Update/Save dynamic CMS key-value pair
router.post("/update", authMiddleware, async (req, res, next) => {
  try {
    const { key, value } = req.body;
    if (!key) {
      return res.status(400).json({ success: false, message: "Key parameter is required" });
    }

    const updated = await CMSData.findOneAndUpdate(
      { key },
      { key, data: value },
      { returnDocument: "after", upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: `CMS key '${key}' saved successfully`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
});

// Helper promise to upload file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder: "techmaster_cms" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// Upload media to Cloudinary
router.post("/upload", authMiddleware, upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "auto");
    return res.status(200).json({
      success: true,
      message: "Media uploaded successfully",
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      size: result.bytes,
      width: result.width,
      height: result.height,
      resourceType: result.resource_type,
    });
  } catch (error) {
    next(error);
  }
});

// Submit Enquiry (Public)
router.post("/public/enquiry", async (req, res, next) => {
  try {
    const { name, email, message, company, category } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      senderName: name,
      email,
      company: company || "",
      category: category || "general",
      message,
      date: new Date().toISOString(),
      status: "Unread",
    };

    // Find and update enquiries list in CMSData
    const doc = await CMSData.findOne({ key: "enquiries" });
    let list = doc ? doc.data : [];
    if (!Array.isArray(list)) list = [];

    list.unshift(newEnquiry);

    await CMSData.findOneAndUpdate(
      { key: "enquiries" },
      { key: "enquiries", data: list },
      { returnDocument: "after", upsert: true }
    );

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: newEnquiry,
    });
  } catch (error) {
    next(error);
  }
});

// Submit Resume (Public)
router.post("/public/resume", upload.single("resume"), async (req, res, next) => {
  try {
    const { name, email, phone, jobTitle, experience, portfolio, coverLetter } = req.body;
    if (!name || !email || !jobTitle) {
      return res.status(400).json({ success: false, message: "Name, email, and job title are required" });
    }

    let fileUrl = "";
    let fileName = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "raw");
      fileUrl = result.secure_url;
      fileName = req.file.originalname;
    }

    const newResume = {
      id: `res-${Date.now()}`,
      candidateName: name,
      email,
      phone: phone || "",
      jobApplied: jobTitle,
      experienceYears: parseFloat(experience) || 0,
      portfolioLink: portfolio || "",
      status: "New",
      resumeFileName: fileName,
      resumeFileUrl: fileUrl,
      coverLetter: coverLetter || "",
      appliedAt: new Date().toISOString(),
    };

    const doc = await CMSData.findOne({ key: "resumes" });
    let list = doc ? doc.data : [];
    if (!Array.isArray(list)) list = [];

    list.unshift(newResume);

    await CMSData.findOneAndUpdate(
      { key: "resumes" },
      { key: "resumes", data: list },
      { returnDocument: "after", upsert: true }
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newResume,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
