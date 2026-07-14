import Joi from "joi";

// ==============================
// Create Blog Validation
// ==============================

export const createBlogValidation = Joi.object({
  title: Joi.string().trim().required(),

  category: Joi.string()
    .valid(
      "Lifestyle",
      "Marketing",
      "Branding",
      "Creator Journey",
      "Tips",
      "Latest News"
    )
    .default("Branding"),

  author: Joi.string().trim().default("Akanksha Dua"),

  coverImage: Joi.string().allow("").default(""),

  // ✅ Video URL (Cloudinary)
  videoUrl: Joi.string().allow("").default(""),

  content: Joi.string().trim().required(),

  publishDate: Joi.date().optional(),

  readTime: Joi.string().trim().default("5 min read"),

  status: Joi.string()
    .valid("draft", "published")
    .default("published"),

  isActive: Joi.boolean().default(true),
});

// ==============================
// Update Blog Validation
// ==============================

export const updateBlogValidation = Joi.object({
  title: Joi.string().trim(),

  category: Joi.string().valid(
    "Lifestyle",
    "Marketing",
    "Branding",
    "Creator Journey",
    "Tips",
    "Latest News"
  ),

  author: Joi.string().trim(),

  coverImage: Joi.string().allow(""),

  // ✅ Video URL (Cloudinary)
  videoUrl: Joi.string().allow(""),

  content: Joi.string().trim(),

  publishDate: Joi.date(),

  readTime: Joi.string().trim(),

  status: Joi.string().valid("draft", "published"),

  isActive: Joi.boolean(),
});