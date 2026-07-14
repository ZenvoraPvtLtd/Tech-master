import { body, param } from "express-validator";

const optionalString = (name) =>
  body(name).optional().isString().withMessage(`${name} must be a string`);

/* ==========================================================
   CAMPAIGN CMS
========================================================== */

export const validateCampaignHero = [
  optionalString("smallBadge"),
  optionalString("highlightWord"),
  optionalString("headline"),
  optionalString("description"),
];

export const validateCampaignCreate = [
  body("title").notEmpty().withMessage("title is required"),
  optionalString("sponsor"),
  optionalString("reach"),
  optionalString("description"),
  body("highlights")
    .optional()
    .isArray()
    .withMessage("highlights must be an array of strings"),
  optionalString("accentColor"),
  optionalString("coverImage"),
  optionalString("status"),
];

export const validateCampaignUpdate = [
  optionalString("title"),
  optionalString("sponsor"),
  optionalString("reach"),
  optionalString("description"),
  body("highlights")
    .optional()
    .isArray()
    .withMessage("highlights must be an array of strings"),
  optionalString("accentColor"),
  optionalString("coverImage"),
  optionalString("status"),
];

export const validateCampaignLifecycleCreate = [
  body("title").notEmpty().withMessage("title is required"),
  optionalString("description"),
  optionalString("status"),
];

export const validateCampaignLifecycleUpdate = [
  optionalString("title"),
  optionalString("description"),
  optionalString("status"),
];

export const validateSuccessStoryCreate = [
  body("title").notEmpty().withMessage("title is required"),
  optionalString("description"),
  optionalString("linkText"),
  optionalString("accentColor"),
  optionalString("status"),
];

export const validateSuccessStoryUpdate = [
  optionalString("title"),
  optionalString("description"),
  optionalString("linkText"),
  optionalString("accentColor"),
  optionalString("status"),
];

export const validateCampaignSeo = [
  optionalString("metaTitle"),
  optionalString("metaDescription"),
  optionalString("metaKeywords"),
  optionalString("ogImageUrl"),
];

/* ==========================================================
   PRODUCT LAUNCH CMS
========================================================== */

export const validateLaunchHero = [
  optionalString("smallBadge"),
  optionalString("highlightWord"),
  optionalString("headline"),
  optionalString("description"),
];

export const validateProductCreate = [
  body("title").notEmpty().withMessage("title is required"),
  optionalString("tagline"),
  optionalString("description"),
  optionalString("icon"),
  optionalString("accentColor"),
  optionalString("status"),
];

export const validateProductUpdate = [
  optionalString("title"),
  optionalString("tagline"),
  optionalString("description"),
  optionalString("icon"),
  optionalString("accentColor"),
  optionalString("status"),
];

export const validateFeatureVideo = [
  optionalString("smallBadge"),
  optionalString("headline"),
  optionalString("description"),
  optionalString("trailerBtnText"),
  optionalString("notesBtnText"),
  optionalString("videoUrl"),
  optionalString("thumbnailUrl"),
];

export const validateInitiativeCreate = [
  body("title").notEmpty().withMessage("title is required"),
  optionalString("description"),
  optionalString("status"),
];

export const validateInitiativeUpdate = [
  optionalString("title"),
  optionalString("description"),
  optionalString("status"),
];

export const validateLaunchSeo = [
  optionalString("metaTitle"),
  optionalString("metaDescription"),
  optionalString("metaKeywords"),
  optionalString("ogImageUrl"),
];

export const validateId = [param("id").notEmpty().withMessage("id is required")];

