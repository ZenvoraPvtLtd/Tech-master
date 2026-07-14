import express from "express";
import {
  createRedirect,
  getAllRedirects,
  getRedirectById,
  updateRedirect,
  deleteRedirect,
} from "./redirect.controller.js";

const router = express.Router();

// Create
router.post("/create", createRedirect);

// Get All
router.get("/", getAllRedirects);

// Get By Id
router.get("/:id", getRedirectById);

// Update
router.put("/:id", updateRedirect);

// Delete
router.delete("/:id", deleteRedirect);

export default router;