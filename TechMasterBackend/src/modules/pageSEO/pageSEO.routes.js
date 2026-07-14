import express from "express";
import {
  createPageSEO,
  getAllPageSEO,
  getPageSEOById,
  updatePageSEO,
  deletePageSEO,
} from "./pageSEO.controller.js";

const validate = () => (req, res, next) => next();

const router = express.Router();

// Create
router.post("/create", validate(), createPageSEO);

// Get All
router.get("/", validate(), getAllPageSEO);

// Get By Id
router.get("/:id", validate(), getPageSEOById);

// Update
router.put("/:id", validate(), updatePageSEO);

// Delete
router.delete("/:id", validate(), deletePageSEO);

export default router;