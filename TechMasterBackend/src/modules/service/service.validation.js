import Joi from "joi";

/* ==========================================================
   HERO
========================================================== */

export const heroValidation = Joi.object({
  smallLabel: Joi.string().allow("").trim(),
  headline: Joi.string().required(),
  description: Joi.string().allow("").trim(),
  button1Text: Joi.string().allow("").trim(),
  button1Link: Joi.string().allow("").trim(),
  button2Text: Joi.string().allow("").trim(),
  button2Link: Joi.string().allow("").trim(),
  backgroundImage: Joi.string().allow("").trim(),
});

/* ==========================================================
   CATEGORY
========================================================== */

export const categoryValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").trim(),
  icon: Joi.string().allow("").trim(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   CARD
========================================================== */

export const cardValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").trim(),
  category: Joi.string().allow("").trim(),
  icon: Joi.string().allow("").trim(),
  image: Joi.string().allow("").trim(),
  isFeatured: Joi.boolean(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   FEATURE
========================================================== */

export const featureValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").trim(),
  icon: Joi.string().allow("").trim(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   PROCESS
========================================================== */

export const processValidation = Joi.object({
  stepNumber: Joi.string().allow("").trim(),
  title: Joi.string().required(),
  description: Joi.string().allow("").trim(),
  icon: Joi.string().allow("").trim(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   TECHNOLOGY
========================================================== */

export const technologyValidation = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().allow("").trim(),
  category: Joi.string().allow("").trim(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   WHY CHOOSE US
========================================================== */

export const whyChooseUsValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").trim(),
  icon: Joi.string().allow("").trim(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   STATISTIC
========================================================== */

export const statisticValidation = Joi.object({
  title: Joi.string().required(),
  value: Joi.string().required(),
  prefix: Joi.string().allow("").trim(),
  suffix: Joi.string().allow("").trim(),
  icon: Joi.string().allow("").trim(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   PRICING PLAN
========================================================== */

export const pricingPlanValidation = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  billingCycle: Joi.string().allow("").trim(),
  description: Joi.string().allow("").trim(),
  features: Joi.array().items(Joi.string()),
  buttonText: Joi.string().allow("").trim(),
  buttonLink: Joi.string().allow("").trim(),
  isPopular: Joi.boolean(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   FAQ
========================================================== */

export const faqValidation = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  category: Joi.string().allow("").trim(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  order: Joi.number(),
});

/* ==========================================================
   CTA
========================================================== */

export const ctaValidation = Joi.object({
  heading: Joi.string().required(),
  description: Joi.string().allow("").trim(),
  primaryButtonText: Joi.string().allow("").trim(),
  primaryButtonLink: Joi.string().allow("").trim(),
  secondaryButtonText: Joi.string().allow("").trim(),
  secondaryButtonLink: Joi.string().allow("").trim(),
  backgroundGradient: Joi.string().allow("").trim(),
});

/* ==========================================================
   SEO
========================================================== */

export const seoValidation = Joi.object({
  metaTitle: Joi.string().required(),
  metaDescription: Joi.string().allow("").trim(),
  metaKeywords: Joi.string().allow("").trim(),
  ogImageUrl: Joi.string().allow("").trim(),
});

/* ==========================================================
   SECTION SETTINGS
========================================================== */

export const sectionSettingValidation = Joi.object({
  order: Joi.number().required(),
  status: Joi.string().valid("Active", "Inactive").required(),
});
