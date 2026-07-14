import express from "express";
import {
  getSEO,
  updateSEO,
} from "./seo.controller.js";

const validate = () => (req, res, next) => next();

const router = express.Router();

// Get SEO Settings
router.get("/", validate(), getSEO);

// Update SEO Settings
router.put("/", validate(), updateSEO);

export default router;