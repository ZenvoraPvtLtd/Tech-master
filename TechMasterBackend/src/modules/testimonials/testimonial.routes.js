import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "./testimonial.controller.js";

import upload from "../../middleware/upload.middleware.js";


const router = express.Router();


// Create Testimonial
router.post(
  "/create",
  upload.fields([
    {
      name: "avatarUrl",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  create
);


// Get All Testimonials
router.get(
  "/",
  getAll
);


// Get Testimonial By ID
router.get(
  "/:id",
  getById
);


// Update Testimonial
router.put(
  "/:id",
  upload.fields([
    {
      name: "avatarUrl",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  update
);


// Delete Testimonial
router.delete(
  "/:id",
  remove
);


export default router;