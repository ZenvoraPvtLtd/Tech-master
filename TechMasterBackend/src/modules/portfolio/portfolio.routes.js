import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
  getFeaturedPortfolio,
  getPortfolioByCategory,
} from "./portfolio.controller.js";

import upload from "../../middleware/upload.middleware.js";


const router = express.Router();


// Create Portfolio
router.post(
  "/create",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  create
);


// Get All
router.get(
  "/",
  getAll
);


// Featured
router.get(
  "/featured",
  getFeaturedPortfolio
);


// Category
router.get(
  "/category/:category",
  getPortfolioByCategory
);


// Get By ID
router.get(
  "/:id",
  getById
);


// Update
router.put(
  "/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  update
);


// Delete
router.delete(
  "/:id",
  remove
);


export default router;