import Joi from "joi";

const VALID_SECTIONS = [
  "hero",
  "video_slider",
  "reels",
  "shorts",
  "long_videos",
  "featured_services",
  "journey_highlights",
  "brand_collaborations",
  "featured_campaigns",
  "testimonials",
  "statistics",
  "newsletter",
  "contact",
];
const validate = (schema) => (req, res, next) => {
  const normalizedBody = normalizeBodyKeys(req.body);
  const { error, value } = schema.validate(normalizedBody, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  req.body = value;

  next();
};

const normalizeBodyKeys = (body = {}) => {
  if (!body || Array.isArray(body) || typeof body !== "object") {
    return {};
  }

  return Object.entries(body).reduce((normalized, [key, value]) => {
    const trimmedKey = key.trim();
    const normalizedKey = trimmedKey
      ? trimmedKey.charAt(0).toLowerCase() + trimmedKey.slice(1)
      : trimmedKey;

    normalized[normalizedKey] = value;
    return normalized;
  }, {});
};
// ─────────────────────────────────────────────
//  EXISTING SCHEMAS
// ─────────────────────────────────────────────

const updateSettingsSchema = Joi.object({
  sections: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid(...VALID_SECTIONS)
          .required(),
        customName: Joi.string().allow("").optional(),
        isActive: Joi.boolean().default(true),
        order: Joi.number().integer().min(1).required(),
      })
    )
    .optional(),
  isDraft: Joi.boolean().optional(),
});

const reorderSectionsSchema = Joi.object({
  type: Joi.string()
    .valid(...VALID_SECTIONS)
    .required(),
  direction: Joi.string().valid("up", "down").required(),
});

const addSectionSchema = Joi.object({
  type: Joi.string()
    .valid(...VALID_SECTIONS)
    .required(),
  customName: Joi.string().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
});

export const validateUpdateSettings = validate(updateSettingsSchema);

export const validateReorderSections = validate(reorderSectionsSchema);

export const validateAddSection = validate(addSectionSchema);

// ─────────────────────────────────────────────
//  VIDEO SLIDER SCHEMAS
// ─────────────────────────────────────────────

const createVideoSliderSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const updateVideoSliderSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const reorderVideoSliderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        order: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
});


export const validateCreateVideoSlider = validate(createVideoSliderSchema);

export const validateUpdateVideoSlider = validate(updateVideoSliderSchema);

export const validateReorderVideoSlider = validate(reorderVideoSliderSchema);

// ─────────────────────────────────────────────
//  REELS SCHEMAS
// ─────────────────────────────────────────────

const createReelSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const updateReelSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const reorderReelsSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        order: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
});


export const validateCreateReel = validate(createReelSchema);

export const validateUpdateReel = validate(updateReelSchema);

export const validateReorderReels = validate(reorderReelsSchema);
// ─────────────────────────────────────────────
//  SHORTS SCHEMAS
// ─────────────────────────────────────────────

const createShortSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const updateShortSchema = Joi.object({
  title: Joi.string().trim().optional(),
  description: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const reorderShortsSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        order: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
});


export const validateCreateShort = validate(createShortSchema);

export const validateUpdateShort = validate(updateShortSchema);

export const validateReorderShorts = validate(reorderShortsSchema);


// ─────────────────────────────────────────────
//  LONG VIDEOS SCHEMAS
// ─────────────────────────────────────────────

const createLongVideoSchema = Joi.object({
  title: Joi.string().trim().required(),
  subtitle: Joi.string().trim().allow("").optional(),
  description: Joi.string().trim().allow("").optional(),
  category: Joi.string().trim().allow("").optional(),
  duration: Joi.number().min(0).optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const updateLongVideoSchema = Joi.object({
  title: Joi.string().trim().optional(),
  subtitle: Joi.string().trim().allow("").optional(),
  description: Joi.string().trim().allow("").optional(),
  category: Joi.string().trim().allow("").optional(),
  duration: Joi.number().min(0).optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const reorderLongVideosSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        order: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

export const validateCreateLongVideo = validate(createLongVideoSchema);

export const validateUpdateLongVideo = validate(updateLongVideoSchema);

export const validateReorderLongVideos = validate(reorderLongVideosSchema);

// ─────────────────────────────────────────────
//  HERO SLIDER SCHEMAS
// ─────────────────────────────────────────────

const createHeroSliderSchema = Joi.object({
  title: Joi.string().trim().required(),
  subtitle: Joi.string().trim().allow("").optional(),
  description: Joi.string().trim().allow("").optional(),
  button: Joi.object({
    label: Joi.string().trim().allow("").optional(),
    link: Joi.string().trim().allow("").optional(),
  }).optional(),
  overlay: Joi.object({
    enabled: Joi.boolean().optional(),
    color: Joi.string().trim().allow("").optional(),
    opacity: Joi.number().min(0).max(1).optional(),
  }).optional(),
  textPosition: Joi.string().trim().allow("").optional(),
  alignment: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const updateHeroSliderSchema = Joi.object({
  title: Joi.string().trim().optional(),
  subtitle: Joi.string().trim().allow("").optional(),
  description: Joi.string().trim().allow("").optional(),
  button: Joi.object({
    label: Joi.string().trim().allow("").optional(),
    link: Joi.string().trim().allow("").optional(),
  }).optional(),
  overlay: Joi.object({
    enabled: Joi.boolean().optional(),
    color: Joi.string().trim().allow("").optional(),
    opacity: Joi.number().min(0).max(1).optional(),
  }).optional(),
  textPosition: Joi.string().trim().allow("").optional(),
  alignment: Joi.string().trim().allow("").optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
});

const reorderHeroSlidersSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        order: Joi.number().integer().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

export const validateCreateHeroSlider = validate(createHeroSliderSchema);

export const validateUpdateHeroSlider = validate(updateHeroSliderSchema);

export const validateReorderHeroSliders = validate(reorderHeroSlidersSchema);
