import express from "express";
import upload from "../../middleware/upload.middleware.js";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "./blog.controller.js";

const router = express.Router();

// ==============================
// Blog Routes
// ==============================

// Create Blog
router.post(
  "/create",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createBlog
);

// Get All Blogs
router.get("/", getAllBlogs);

// Get Blog By ID
router.get("/:id", getBlogById);

// Update Blog
router.put(
  "/:id",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  updateBlog
);

// Delete Blog
router.delete("/:id", deleteBlog);

export default router;