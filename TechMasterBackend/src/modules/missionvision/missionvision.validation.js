import Joi from "joi";

/* ==========================================================
   HERO
========================================================== */

export const heroValidation = Joi.object({
  smallLabel: Joi.string().allow("").trim(),

  headline: Joi.string().required(),

  highlightWord: Joi.string().allow("").trim(),

  description: Joi.string().allow("").trim(),

  button1Text: Joi.string().allow("").trim(),

  button1Link: Joi.string().allow("").trim(),

  button2Text: Joi.string().allow("").trim(),

  button2Link: Joi.string().allow("").trim(),

  scrollIndicatorVisible: Joi.boolean(),

  backgroundImage: Joi.string().allow("").trim(),
});

/* ==========================================================
   MISSION
========================================================== */

export const missionValidation = Joi.object({
  heading: Joi.string().required(),

  subHeading: Joi.string().allow("").trim(),

  description: Joi.string().allow("").trim(),

  leftBorderColor: Joi.string().allow("").trim(),

  missionIcon: Joi.string().allow("").trim(),

  buttonText: Joi.string().allow("").trim(),

  buttonUrl: Joi.string().allow("").trim(),

  glassEffect: Joi.boolean(),

  missionImage: Joi.string().allow("").trim(),
});

/* ==========================================================
   VISION
========================================================== */

export const visionValidation = Joi.object({
  heading: Joi.string().required(),

  subHeading: Joi.string().allow("").trim(),

  description: Joi.string().allow("").trim(),

  accentColor: Joi.string().allow("").trim(),

  visionIcon: Joi.string().allow("").trim(),

  buttonText: Joi.string().allow("").trim(),

  buttonUrl: Joi.string().allow("").trim(),

  visionImage: Joi.string().allow("").trim(),
});

/* ==========================================================
   CORE VALUE
========================================================== */

export const coreValueValidation = Joi.object({
  title: Joi.string().required(),

  icon: Joi.string().allow("").trim(),

  accentColor: Joi.string().allow("").trim(),

  description: Joi.string().allow("").trim(),

  status: Joi.string()
    .valid("Active", "Inactive")
    .default("Active"),

  order: Joi.number(),
});

/* ==========================================================
   BRAND PILLAR
========================================================== */

export const brandPillarValidation = Joi.object({
  title: Joi.string().required(),

  subtitle: Joi.string().allow("").trim(),

  icon: Joi.string().allow("").trim(),

  borderColor: Joi.string().allow("").trim(),

  hoverColor: Joi.string().allow("").trim(),

  description: Joi.string().allow("").trim(),

  status: Joi.string()
    .valid("Active", "Inactive")
    .default("Active"),

  order: Joi.number(),
});

/* ==========================================================
   ROADMAP
========================================================== */

export const roadmapValidation = Joi.object({
  quarter: Joi.string().required(),

  year: Joi.string().required(),

  title: Joi.string().required(),

  goal: Joi.string().allow("").trim(),

  accentColor: Joi.string().allow("").trim(),

  description: Joi.string().allow("").trim(),

  status: Joi.string()
    .valid(
      "Planning",
      "In Progress",
      "Completed",
      "Upcoming"
    )
    .default("Planning"),

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

  status: Joi.string()
    .valid("Active", "Inactive")
    .required(),
});