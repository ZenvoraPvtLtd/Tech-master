import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  // Main
  getMissionVision,
  createMissionVision,
  deleteMissionVision,

  // Hero
  updateHero,

  // Mission
  updateMission,

  // Vision
  updateVision,

  // Core Values
  addCoreValue,
  updateCoreValue,
  deleteCoreValue,
  toggleCoreValueStatus,
  reorderCoreValues,

  // Brand Pillars
  addBrandPillar,
  updateBrandPillar,
  deleteBrandPillar,
  toggleBrandPillarStatus,
  reorderBrandPillars,

  // Roadmap
  addRoadmap,
  updateRoadmap,
  deleteRoadmap,
  toggleRoadmapStatus,
  reorderRoadmap,

  // CTA
  updateCTA,

  // SEO
  updateSEO,

  // Section Settings
  updateSectionSettings,

  // Publish
  saveDraft,
  publishMissionVision,
  unpublishMissionVision,

} from "./missionvision.controller.js";

import {
  heroValidation,
  missionValidation,
  visionValidation,
  coreValueValidation,
  brandPillarValidation,
  roadmapValidation,
  ctaValidation,
  seoValidation,
  sectionSettingValidation,
} from "./missionvision.validation.js";

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};

const router = express.Router();

/* =====================================================
   MAIN
===================================================== */

router.get("/", getMissionVision);

router.post("/", createMissionVision);

router.delete("/", deleteMissionVision);

/* =====================================================
   HERO
===================================================== */

router.put(
  "/hero",
  validate(heroValidation),
  updateHero
);

/* =====================================================
   MISSION
===================================================== */

router.put(
  "/mission",
  validate(missionValidation),
  updateMission
);

/* =====================================================
   VISION
===================================================== */

router.put(
  "/vision",
  validate(visionValidation),
  updateVision
);

/* =====================================================
   CORE VALUES
===================================================== */

router.get("/core-values", getMissionVision);

router.post(
  "/core-values",
  validate(coreValueValidation),
  addCoreValue
);

router.put(
  "/core-values/:id",
  validate(coreValueValidation),
  updateCoreValue
);

router.delete(
  "/core-values/:id",
  deleteCoreValue
);

router.patch(
  "/core-values/:id/status",
  toggleCoreValueStatus
);

router.patch(
  "/core-values/reorder",
  reorderCoreValues
);

/* =====================================================
   BRAND PILLARS
===================================================== */

router.get("/brand-pillars", getMissionVision);

router.post(
  "/brand-pillars",
  validate(brandPillarValidation),
  addBrandPillar
);

router.put(
  "/brand-pillars/:id",
  validate(brandPillarValidation),
  updateBrandPillar
);

router.delete(
  "/brand-pillars/:id",
  deleteBrandPillar
);

router.patch(
  "/brand-pillars/:id/status",
  toggleBrandPillarStatus
);

router.patch(
  "/brand-pillars/reorder",
  reorderBrandPillars
);

/* =====================================================
   ROADMAP
===================================================== */

router.get("/roadmap", getMissionVision);

router.post(
  "/roadmap",
  validate(roadmapValidation),
  addRoadmap
);

router.put(
  "/roadmap/:id",
  validate(roadmapValidation),
  updateRoadmap
);

router.delete(
  "/roadmap/:id",
  deleteRoadmap
);

router.patch(
  "/roadmap/:id/status",
  toggleRoadmapStatus
);

router.patch(
  "/roadmap/reorder",
  reorderRoadmap
);

/* =====================================================
   CTA
===================================================== */

router.put(
  "/cta",
  validate(ctaValidation),
  updateCTA
);

/* =====================================================
   SEO
===================================================== */

router.put(
  "/seo",
  validate(seoValidation),
  updateSEO
);

/* =====================================================
   SECTION SETTINGS
===================================================== */

router.patch(
  "/section-settings/:section",
  validate(sectionSettingValidation),
  updateSectionSettings
);

/* =====================================================
   DRAFT
===================================================== */

router.patch(
  "/draft",
  saveDraft
);

/* =====================================================
   PUBLISH
===================================================== */

router.patch(
  "/publish",
  publishMissionVision
);

router.patch(
  "/unpublish",
  unpublishMissionVision
);

export default router;