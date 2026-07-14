import Joi from "joi";

export const redirectValidation = Joi.object({
  from: Joi.string().trim().required().messages({
    "string.empty": "From URL is required",
    "any.required": "From URL is required",
  }),

  to: Joi.string().trim().required().messages({
    "string.empty": "To URL is required",
    "any.required": "To URL is required",
  }),

  type: Joi.number().valid(301, 302).default(301).messages({
    "any.only": "Redirect type must be 301 or 302",
  }),

  status: Joi.boolean().default(true),

  description: Joi.string().allow("").optional(),
});