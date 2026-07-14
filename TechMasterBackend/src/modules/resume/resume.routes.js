import express from "express";
import upload from "../../middleware/upload.middleware.js";

import {
  createResume,
  getAllResume,
  getResumeById,
  updateResume,
  deleteResume,
  getPendingResume,
  getShortlistedResume,
} from "./resume.controller.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  createResume
);

router.get("/", getAllResume);

router.get("/pending", getPendingResume);

router.get("/shortlisted", getShortlistedResume);

router.get("/:id", getResumeById);

router.put(
  "/:id",
  upload.fields([
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateResume
);

router.delete("/:id", deleteResume);

export default router;