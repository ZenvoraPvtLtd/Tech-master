import { body, param } from "express-validator";

// ===============================
// Hero
// ===============================

export const validateHero = [
  body("eyebrowText").notEmpty().withMessage("Eyebrow Text is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("highlightedTitle").notEmpty().withMessage("Highlighted Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

// ===============================
// History
// ===============================

export const validateHistory = [
  body("eyebrow").notEmpty().withMessage("Eyebrow is required"),
  body("title").notEmpty().withMessage("Title is required"),
  body("highlightedTitle").notEmpty().withMessage("Highlighted Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

// ===============================
// SEO
// ===============================

export const validateSeo = [
  body("metaTitle").notEmpty().withMessage("Meta Title is required"),
  body("metaDescription").notEmpty().withMessage("Meta Description is required"),
];

// ===============================
// Brand
// ===============================

export const validateBrand = [
  body("brandName").notEmpty().withMessage("Brand Name is required"),
];

// ===============================
// Partner
// ===============================

export const validatePartner = [
  body("name").notEmpty().withMessage("Partner Name is required"),
  body("type").notEmpty().withMessage("Partner Type is required"),
];

// ===============================
// Metric
// ===============================

export const validateMetric = [
  body("value").notEmpty().withMessage("Metric Value is required"),
  body("label").notEmpty().withMessage("Metric Label is required"),
];

// ===============================
// Campaign
// ===============================

export const validateCampaign = [
  body("title").notEmpty().withMessage("Campaign Title is required"),
];

// ===============================
// Process
// ===============================

export const validateProcess = [
  body("stepNumber").notEmpty().withMessage("Step Number is required"),
  body("title").notEmpty().withMessage("Step Title is required"),
];

// ===============================
// Testimonial
// ===============================

export const validateTestimonial = [
  body("personName").notEmpty().withMessage("Person Name is required"),
  body("company").notEmpty().withMessage("Company Name is required"),
];

// ===============================
// ID Validation
// ===============================

export const validateId = [
  param("id").isMongoId().withMessage("Invalid Id"),
];