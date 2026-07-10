import Joi from "joi";

/**
 * Validation schema for creating a Journey Item (timeline / milestones)
 */
export const createItemValidation = Joi.object({
  type: Joi.string()
    .valid("timeline", "milestones")
    .required()
    .messages({
      "any.only": "Type must be either 'timeline' or 'milestones'",
      "string.empty": "Type is required",
    }),

  year: Joi.string()
    .required()
    .trim()
    .messages({
      "string.empty": "Year / time period is required",
    }),

  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .trim()
    .messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters",
      "string.max": "Title cannot exceed 100 characters",
    }),

  description: Joi.string().allow("").trim().default(""),

  image: Joi.object({
    url: Joi.string().uri().allow("").default(""),
    public_id: Joi.string().allow("").default(""),
  }).optional(),

  isActive: Joi.boolean().default(true),

  order: Joi.number().integer().optional(),
});

/**
 * Validation schema for updating a Journey Item
 */
export const updateItemValidation = Joi.object({
  type: Joi.string().valid("timeline", "milestones"),
  year: Joi.string().trim(),
  title: Joi.string().min(3).max(100).trim(),
  description: Joi.string().allow("").trim(),
  image: Joi.object({
    url: Joi.string().uri().allow(""),
    public_id: Joi.string().allow(""),
  }).optional(),
  isActive: Joi.boolean(),
  order: Joi.number().integer(),
});

/**
 * Validation schema for updating Section Settings & Future Vision Content
 */
export const updateSettingsValidation = Joi.object({
  sections: Joi.object({
    timeline: Joi.object({
      isActive: Joi.boolean().required(),
    }),
    milestones: Joi.object({
      isActive: Joi.boolean().required(),
    }),
    futureVision: Joi.object({
      isActive: Joi.boolean().required(),
    }),
  }).optional(),

  futureVision: Joi.object({
    futureHeading: Joi.string().min(3).max(150).trim(),
    futureDescription: Joi.string().allow("").trim(),
    image: Joi.object({
      url: Joi.string().uri().allow(""),
      public_id: Joi.string().allow(""),
    }).optional(),
  }).optional(),

  isDraft: Joi.boolean().optional(),
});

/**
 * Validation schema for reordering items (Move Up / Down)
 */
export const reorderItemsValidation = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      "string.empty": "Item ID is required for reordering",
    }),
  direction: Joi.string()
    .valid("up", "down")
    .required()
    .messages({
      "any.only": "Direction must be either 'up' or 'down'",
      "string.empty": "Direction is required",
    }),
});
