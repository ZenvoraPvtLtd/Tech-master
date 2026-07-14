import Joi from "joi";

// ==============================
// CREATE JOB VALIDATION
// ==============================

export const createJobValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Job title is required",
    "any.required": "Job title is required",
  }),

  department: Joi.string().trim().required().messages({
    "string.empty": "Department is required",
    "any.required": "Department is required",
  }),

  team: Joi.string().trim().allow("").optional(),

  employmentType: Joi.string()
    .valid(
      "Full Time",
      "Part Time",
      "Internship",
      "Contract",
      "Remote",
      "Freelance"
    )
    .optional(),

  experience: Joi.string().trim().allow("").optional(),

  location: Joi.string().trim().allow("").optional(),

  salary: Joi.string().trim().allow("").optional(),

  vacancies: Joi.number().integer().min(1).optional(),

  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),

  responsibilities: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string().trim()
  ),

  requirements: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string().trim()
  ),

  featured: Joi.boolean().optional(),

  active: Joi.boolean().optional(),
});

// ==============================
// UPDATE JOB VALIDATION
// ==============================

export const updateJobValidation = Joi.object({
  title: Joi.string().trim(),

  department: Joi.string().trim(),

  team: Joi.string().trim().allow(""),

  employmentType: Joi.string().valid(
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Remote",
    "Freelance"
  ),

  experience: Joi.string().trim().allow(""),

  location: Joi.string().trim().allow(""),

  salary: Joi.string().trim().allow(""),

  vacancies: Joi.number().integer().min(1),

  description: Joi.string().trim(),

  responsibilities: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string().trim()
  ),

  requirements: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string().trim()
  ),

  featured: Joi.boolean(),

  active: Joi.boolean(),
});