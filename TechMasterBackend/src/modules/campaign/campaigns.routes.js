import express from "express";
import { campaignController, launchController } from "./campaigns.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validationMiddleware from "../../middleware/validation.middleware.js";
import {
  validateCampaignHero,
  validateCampaignCreate,
  validateCampaignUpdate,
  validateCampaignLifecycleCreate,
  validateCampaignLifecycleUpdate,
  validateSuccessStoryCreate,
  validateSuccessStoryUpdate,
  validateCampaignSeo,
  validateLaunchHero,
  validateProductCreate,
  validateProductUpdate,
  validateFeatureVideo,
  validateInitiativeCreate,
  validateInitiativeUpdate,
  validateLaunchSeo,
  validateId,
} from "./campaigns.validation..js";


const router = express.Router();

/* ==========================================================
   CAMPAIGN ROUTES  →  /api/v1/campaigns/...
========================================================== */

// Hero  (static — must be before /:id)
router.get("/hero", authMiddleware, (req, res, next) => campaignController.getHero(req, res, next));
router.put(
  "/hero",
  authMiddleware,
  validateCampaignHero,
  validationMiddleware,
  (req, res, next) => campaignController.updateHero(req, res, next)
);

// Lifecycle  (static — must be before /:id)
router.get("/lifecycle", authMiddleware, (req, res, next) => campaignController.getAllLifecycle(req, res, next));
router.post(
  "/lifecycle",
  authMiddleware,
  validateCampaignLifecycleCreate,
  validationMiddleware,
  (req, res, next) => campaignController.addLifecycle(req, res, next)
);
router.put(
  "/lifecycle/:id",
  authMiddleware,
  validateId,
  validateCampaignLifecycleUpdate,
  validationMiddleware,
  (req, res, next) => campaignController.updateLifecycle(req, res, next)
);
router.delete(
  "/lifecycle/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => campaignController.deleteLifecycle(req, res, next)
);

// Success Stories  (static — must be before /:id)
router.get("/success-stories", authMiddleware, (req, res, next) => campaignController.getAllSuccessStories(req, res, next));
router.post(
  "/success-stories",
  authMiddleware,
  validateSuccessStoryCreate,
  validationMiddleware,
  (req, res, next) => campaignController.addSuccessStory(req, res, next)
);
router.put(
  "/success-stories/:id",
  authMiddleware,
  validateId,
  validateSuccessStoryUpdate,
  validationMiddleware,
  (req, res, next) => campaignController.updateSuccessStory(req, res, next)
);
router.delete(
  "/success-stories/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => campaignController.deleteSuccessStory(req, res, next)
);

// SEO  (static — must be before /:id)
router.get("/seo", authMiddleware, (req, res, next) => campaignController.getSeo(req, res, next));
router.put(
  "/seo",
  authMiddleware,
  validateCampaignSeo,
  validationMiddleware,
  (req, res, next) => campaignController.updateSeo(req, res, next)
);

// Campaign List  (dynamic /:id must come LAST)
router.get("/", authMiddleware, (req, res, next) => campaignController.getAllCampaigns(req, res, next));
router.post(
  "/",
  authMiddleware,
  validateCampaignCreate,
  validationMiddleware,
  (req, res, next) => campaignController.addCampaign(req, res, next)
);
router.get(
  "/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => campaignController.getCampaignById(req, res, next)
);
router.put(
  "/:id",
  authMiddleware,
  validateId,
  validateCampaignUpdate,
  validationMiddleware,
  (req, res, next) => campaignController.updateCampaign(req, res, next)
);
router.delete(
  "/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => campaignController.deleteCampaign(req, res, next)
);


export { router as campaignRoutes };

/* ==========================================================
   LAUNCH ROUTES  →  /api/v1/launches/...
========================================================== */

const launchRouter = express.Router();

// Hero  (static — must be before dynamic)
launchRouter.get("/hero", authMiddleware, (req, res, next) => launchController.getHero(req, res, next));
launchRouter.put(
  "/hero",
  authMiddleware,
  validateLaunchHero,
  validationMiddleware,
  (req, res, next) => launchController.updateHero(req, res, next)
);

// Feature Video  (static)
launchRouter.get("/video", authMiddleware, (req, res, next) => launchController.getFeatureVideo(req, res, next));
launchRouter.put(
  "/video",
  authMiddleware,
  validateFeatureVideo,
  validationMiddleware,
  (req, res, next) => launchController.updateFeatureVideo(req, res, next)
);

// Initiatives  (static — must be before dynamic)
launchRouter.get("/initiatives", authMiddleware, (req, res, next) => launchController.getAllInitiatives(req, res, next));
launchRouter.post(
  "/initiatives",
  authMiddleware,
  validateInitiativeCreate,
  validationMiddleware,
  (req, res, next) => launchController.addInitiative(req, res, next)
);
launchRouter.put(
  "/initiatives/:id",
  authMiddleware,
  validateId,
  validateInitiativeUpdate,
  validationMiddleware,
  (req, res, next) => launchController.updateInitiative(req, res, next)
);
launchRouter.delete(
  "/initiatives/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => launchController.deleteInitiative(req, res, next)
);

// SEO  (static)
launchRouter.get("/seo", authMiddleware, (req, res, next) => launchController.getSeo(req, res, next));
launchRouter.put(
  "/seo",
  authMiddleware,
  validateLaunchSeo,
  validationMiddleware,
  (req, res, next) => launchController.updateSeo(req, res, next)
);

// Products  (dynamic /:id must come LAST)
launchRouter.get("/products", authMiddleware, (req, res, next) => launchController.getAllProducts(req, res, next));
launchRouter.post(
  "/products",
  authMiddleware,
  validateProductCreate,
  validationMiddleware,
  (req, res, next) => launchController.addProduct(req, res, next)
);
launchRouter.get(
  "/products/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => launchController.getProductById(req, res, next)
);
launchRouter.put(
  "/products/:id",
  authMiddleware,
  validateId,
  validateProductUpdate,
  validationMiddleware,
  (req, res, next) => launchController.updateProduct(req, res, next)
);
launchRouter.delete(
  "/products/:id",
  authMiddleware,
  validateId,
  validationMiddleware,
  (req, res, next) => launchController.deleteProduct(req, res, next)
);


export { launchRouter as launchRoutes };
