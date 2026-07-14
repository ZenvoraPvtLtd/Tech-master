import express from "express";
import founderJourneyController from "./founderJourney.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";

import {
  createItemValidation,
  updateItemValidation,
  updateSettingsValidation,
  reorderItemsValidation,
} from "./founderJourney.validation.js";

const router = express.Router();


// Joi Request Body Validation Middleware
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }
  req.body = value;
  next();
};

// --- PUBLIC ROUTES (Used by live portfolio frontend) ---
router.get("/items", founderJourneyController.getItems);
router.get("/settings", founderJourneyController.getSettings);

// --- ADMIN SECURED ROUTES (Used by admin control dashboard) ---
router.post(
  "/items",
  authMiddleware,
  validate(createItemValidation),
  founderJourneyController.createItem
);

router.put(
  "/items/:id",
  authMiddleware,
  validate(updateItemValidation),
  founderJourneyController.updateItem
);

router.delete(
  "/items/:id",
  authMiddleware,
  founderJourneyController.deleteItem
);

router.patch(
  "/items/:id/status",
  authMiddleware,
  founderJourneyController.toggleItemStatus
);

router.patch(
  "/items/reorder",
  authMiddleware,
  validate(reorderItemsValidation),
  founderJourneyController.reorderItems
);

router.put(
  "/settings",
  authMiddleware,
  validate(updateSettingsValidation),
  founderJourneyController.updateSettings
);

router.post(
  "/settings/publish",
  authMiddleware,
  founderJourneyController.publishLive
);

// Task 2: POST /items/:id/upload (Admin -> Multer -> Cloudinary)
router.post(
  "/items/:id/upload",
  authMiddleware,
  upload.single("image"),
  founderJourneyController.uploadMedia
);

export default router;
