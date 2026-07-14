import express from "express";

import collaborationController from "./collaboration.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

import validationMiddleware from "../../middleware/validation.middleware.js";
import {
  validateHero,
  validateHistory,
  validateSeo,
  validateBrand,
  validatePartner,
  validateMetric,
  validateCampaign,
  validateProcess,
  validateTestimonial,
  validateId,
} from "./collaboration.validation..js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| COLLABORATION CMS ROUTES
|--------------------------------------------------------------------------
*/

// ===========================
// Section: Hero
// ===========================
router.put(
  "/hero",
  authMiddleware,
  validateHero,
  validationMiddleware,
  (req, res, next) => collaborationController.updateHero(req, res, next)
);

// ===========================
// Section: History
// ===========================
router.put(
  "/history",
  authMiddleware,
  validateHistory,
  validationMiddleware,
  (req, res, next) => collaborationController.updateHistory(req, res, next)
);

// ===========================
// Section: SEO
// ===========================
router.put(
  "/seo",
  authMiddleware,
  validateSeo,
  validationMiddleware,
  (req, res, next) => collaborationController.updateSeo(req, res, next)
);

// ===========================
// Collab root
// ===========================
router.post(
  "/",
  authMiddleware,
  (req, res, next) => collaborationController.create(req, res, next)
);

router.get(
  "/",
  authMiddleware,
  (req, res, next) => collaborationController.get(req, res, next)
);

// ===========================
// Brands
// ===========================
router.post(
  "/brands",
  authMiddleware,
  validateBrand,
  validationMiddleware,
  (req, res, next) => collaborationController.addBrand(req, res, next)
);

router.put(
  "/brands/:id",
  authMiddleware,
  validateId,
  validateBrand,
  validationMiddleware,
  (req, res, next) => collaborationController.updateBrand(req, res, next)
);

router.delete(
  "/brands/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => collaborationController.deleteBrand(req, res, next)
);

// ===========================
// Partners
// ===========================
router.post(
  "/partners",
  authMiddleware,
  validatePartner,
  validationMiddleware,
  (req, res, next) => collaborationController.addPartner(req, res, next)
);

router.put(
  "/partners/:id",
  authMiddleware,
  validateId,
  validatePartner,
  validationMiddleware,
  (req, res, next) => collaborationController.updatePartner(req, res, next)
);

router.delete(
  "/partners/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => collaborationController.deletePartner(req, res, next)
);

// ===========================
// Metrics
// ===========================
router.post(
  "/metrics",
  authMiddleware,
  validateMetric,
  validationMiddleware,
  (req, res, next) => collaborationController.addMetric(req, res, next)
);

router.put(
  "/metrics/:id",
  authMiddleware,
  validateId,
  validateMetric,
  validationMiddleware,
  (req, res, next) => collaborationController.updateMetric(req, res, next)
);

router.delete(
  "/metrics/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => collaborationController.deleteMetric(req, res, next)
);

// ===========================
// Campaigns
// ===========================
router.post(
  "/campaigns",
  authMiddleware,
  validateCampaign,
  validationMiddleware,
  (req, res, next) => collaborationController.addCampaign(req, res, next)
);

router.put(
  "/campaigns/:id",
  authMiddleware,
  validateId,
  validateCampaign,
  validationMiddleware,
  (req, res, next) => collaborationController.updateCampaign(req, res, next)
);

router.delete(
  "/campaigns/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => collaborationController.deleteCampaign(req, res, next)
);

// ===========================
// Process
// ===========================
router.post(
  "/process",
  authMiddleware,
  validateProcess,
  validationMiddleware,
  (req, res, next) => collaborationController.addProcess(req, res, next)
);

router.put(
  "/process/:id",
  authMiddleware,
  validateId,
  validateProcess,
  validationMiddleware,
  (req, res, next) => collaborationController.updateProcess(req, res, next)
);

router.delete(
  "/process/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => collaborationController.deleteProcess(req, res, next)
);

// ===========================
// Testimonials
// ===========================
router.post(
  "/testimonials",
  authMiddleware,
  validateTestimonial,
  validationMiddleware,
  (req, res, next) => collaborationController.addTestimonial(req, res, next)
);

router.put(
  "/testimonials/:id",
  authMiddleware,
  validateId,
  validateTestimonial,
  validationMiddleware,
  (req, res, next) => collaborationController.updateTestimonial(req, res, next)
);

router.delete(
  "/testimonials/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => collaborationController.deleteTestimonial(req, res, next)
);

// ===========================
// Section settings
// ===========================
router.put(
  "/settings",
  authMiddleware,
  (req, res, next) => collaborationController.updateSectionSettings(req, res, next)
);

// ===========================
// Delete collaboration document
// ===========================
router.delete(
  "/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => collaborationController.delete(req, res, next)
);

export default router;

