import Joi from "joi";

export const pageSEOValidation = Joi.object({
  pageName: Joi.string().trim().required().messages({
    "string.empty": "Page name is required",
    "any.required": "Page name is required",
  }),

  slug: Joi.string().trim().required().messages({
    "string.empty": "Slug is required",
    "any.required": "Slug is required",
  }),

  useGlobalSEO: Joi.boolean().optional(),

  metaTitle: Joi.string().allow("").optional(),

  metaDescription: Joi.string().allow("").optional(),

  keywords: Joi.string().allow("").optional(),

  canonicalURL: Joi.string().allow("").optional(),

  ogTitle: Joi.string().allow("").optional(),

  ogDescription: Joi.string().allow("").optional(),

  ogImage: Joi.string().allow("").optional(),

  robots: Joi.string()
    .valid(
      "index, follow",
      "noindex, nofollow",
      "noindex, follow"
    )
    .optional(),

  priority: Joi.number().min(0).max(1).optional(),

  changeFrequency: Joi.string()
    .valid(
      "always",
      "hourly",
      "daily",
      "weekly",
      "monthly",
      "yearly",
      "never"
    )
    .optional(),

  lastModified: Joi.date().optional(),
});