import Joi from "joi";

export const createResumeValidation = Joi.object({
  fullName: Joi.string().trim().required().messages({
    "string.empty": "Full name is required",
    "any.required": "Full name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email",
    "any.required": "Email is required",
  }),

  phone: Joi.string().trim().required().messages({
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),

  job: Joi.string().required().messages({
    "string.empty": "Job is required",
    "any.required": "Job is required",
  }),

  experience: Joi.string().trim().allow("").optional(),

  currentCompany: Joi.string().trim().allow("").optional(),

  currentCTC: Joi.string().trim().allow("").optional(),

  expectedCTC: Joi.string().trim().allow("").optional(),

  noticePeriod: Joi.string().trim().allow("").optional(),

  linkedin: Joi.string().trim().allow("").optional(),

  portfolio: Joi.string().trim().allow("").optional(),

  coverLetter: Joi.string().trim().allow("").optional(),

  status: Joi.string()
    .valid(
      "Pending",
      "Reviewed",
      "Shortlisted",
      "Rejected",
      "Hired"
    )
    .optional(),

  rating: Joi.number().min(1).max(5).optional(),

  hrNotes: Joi.string().trim().allow("").optional(),
});

export const updateResumeValidation = Joi.object({
  fullName: Joi.string().trim(),

  email: Joi.string().email(),

  phone: Joi.string().trim(),

  job: Joi.string(),

  experience: Joi.string().trim().allow(""),

  currentCompany: Joi.string().trim().allow(""),

  currentCTC: Joi.string().trim().allow(""),

  expectedCTC: Joi.string().trim().allow(""),

  noticePeriod: Joi.string().trim().allow(""),

  linkedin: Joi.string().trim().allow(""),

  portfolio: Joi.string().trim().allow(""),

  coverLetter: Joi.string().trim().allow(""),

  status: Joi.string().valid(
    "Pending",
    "Reviewed",
    "Shortlisted",
    "Rejected",
    "Hired"
  ),

  rating: Joi.number().min(1).max(5),

  hrNotes: Joi.string().trim().allow(""),
});