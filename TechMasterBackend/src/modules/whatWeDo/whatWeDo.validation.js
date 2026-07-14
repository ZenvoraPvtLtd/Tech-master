import Joi from "joi";

// Hero
export const validateHero=Joi.object({
  smallBadge:Joi.string().allow("").optional(),
  headline:Joi.string().allow("").optional(),
  highlightWord:Joi.string().allow("").optional(),
  glowEnabled:Joi.boolean().optional(),
  description:Joi.string().allow("").optional()
});

// Operations
export const validateOperationsCreate=Joi.object({
  title:Joi.string().required().trim(),
  subtitle:Joi.string().allow("").optional().trim(),
  icon:Joi.string().allow("").optional().trim(),
  accent:Joi.string().allow("").optional().trim(),
  description:Joi.string().allow("").optional().trim(),
  status:Joi.string().valid("Active","Inactive").optional(),
  order:Joi.number().optional()
});

export const validateOperationsUpdate=Joi.object({
  title:Joi.string().optional().trim(),
  subtitle:Joi.string().allow("").optional().trim(),
  icon:Joi.string().allow("").optional().trim(),
  accent:Joi.string().allow("").optional().trim(),
  description:Joi.string().allow("").optional().trim(),
  status:Joi.string().valid("Active","Inactive").optional(),
  order:Joi.number().optional()
});

// Services
export const validateServicesCreate=Joi.object({
  tag:Joi.string().required().trim(),
  status:Joi.string().valid("Active","Inactive").optional(),
  order:Joi.number().optional()
});

export const validateServicesUpdate=Joi.object({
  tag:Joi.string().optional().trim(),
  status:Joi.string().valid("Active","Inactive").optional(),
  order:Joi.number().optional()
});

// Quote Banner
export const validateQuote=Joi.object({
  authorName:Joi.string().allow("").optional().trim(),
  quoteText:Joi.string().allow("").optional().trim()
});

// SEO
export const validateSeo=Joi.object({
  metaTitle:Joi.string().allow("").optional().trim(),
  metaDescription:Joi.string().allow("").optional().trim(),
  metaKeywords:Joi.string().allow("").optional().trim(),
  ogImageUrl:Joi.string().allow("").optional().trim()
});

// Section Settings
export const validateSectionSettings=Joi.object({
  hero:Joi.object({
    order:Joi.number().optional(),
    status:Joi.string().valid("Active","Inactive").optional()
  }).optional(),

  operations:Joi.object({
    order:Joi.number().optional(),
    status:Joi.string().valid("Active","Inactive").optional()
  }).optional(),

  servicesList:Joi.object({
    order:Joi.number().optional(),
    status:Joi.string().valid("Active","Inactive").optional()
  }).optional(),

  quoteBanner:Joi.object({
    order:Joi.number().optional(),
    status:Joi.string().valid("Active","Inactive").optional()
  }).optional(),

  seo:Joi.object({
    order:Joi.number().optional(),
    status:Joi.string().valid("Active","Inactive").optional()
  }).optional()
});

// ID
export const validateId=Joi.object({
  id:Joi.string().required()
});

// Draft Save
export const validateDraft=Joi.object({
  section:Joi.string().required(),
  data:Joi.object().required()
});

// Publish
export const validatePublish=Joi.object({
  status:Joi.string().valid("Published","Draft").optional()
});