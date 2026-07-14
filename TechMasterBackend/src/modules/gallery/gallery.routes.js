import express from "express";
import upload from "../../middleware/upload.middleware.js";

import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
  getGalleryByPortfolio,
  updateDisplayOrder,
  toggleGalleryStatus,
} from "./gallery.controller.js";

const router = express.Router();

// ==============================
// Gallery Routes
// ==============================

// Create Gallery
router.post(
  "/create",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createGallery
);

// Get All Gallery
router.get("/", getAllGallery);

// Get Gallery By Portfolio
router.get("/portfolio/:portfolioId", getGalleryByPortfolio);

// Get Gallery By ID
router.get("/:id", getGalleryById);

// Update Gallery
router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  updateGallery
);

// Delete Gallery
router.delete("/:id", deleteGallery);

// Update Display Order
router.put("/:id/display-order", updateDisplayOrder);

// Toggle Gallery Status
router.patch("/:id/status", toggleGalleryStatus);

export default router;