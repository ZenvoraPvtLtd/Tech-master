import express from "express";

import {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  replyEnquiry,
  deleteEnquiry,
} from "./faq.controller.js";

const validate = (schema) => (req, res, next) => next();

const router = express.Router();

// ==============================
// FAQ Routes
// ==============================

// Create FAQ
router.post("/create", createFAQ);

// Get All FAQs
router.get("/", getAllFAQs);

// Get FAQ By ID
router.get("/:id", getFAQById);

// Update FAQ
router.put("/:id", updateFAQ);

// Delete FAQ
router.delete("/:id", deleteFAQ);

// ==============================
// Enquiry Routes
// ==============================

// Create Enquiry
router.post("/enquiry/create", createEnquiry);

// Get All Enquiries
router.get("/enquiry", getAllEnquiries);

// Get Enquiry By ID
router.get("/enquiry/:id", getEnquiryById);

// Reply Enquiry
router.put("/enquiry/reply/:id", replyEnquiry);

// Delete Enquiry
router.delete("/enquiry/:id", deleteEnquiry);

export default router;