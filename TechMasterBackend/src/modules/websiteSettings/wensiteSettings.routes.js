import express from "express";

import {
  createWebsiteSettings,
  getWebsiteSettings,
  updateWebsiteSettings,
} from "./websiteSettings.controller.js";

import upload from "../../middleware/upload.middleware.js";

const router = express.Router();

// ==========================
// CREATE
// ==========================
router.post(
  "/",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "favicon",
      maxCount: 1,
    },
    {
      name: "appleTouchIcon",
      maxCount: 1,
    },
  ]),
  createWebsiteSettings
);

// ==========================
// GET
// ==========================
router.get("/", getWebsiteSettings);

// ==========================
// UPDATE
// ==========================
router.put(
  "/",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "favicon",
      maxCount: 1,
    },
    {
      name: "appleTouchIcon",
      maxCount: 1,
    },
  ]),
  updateWebsiteSettings
);

export default router;