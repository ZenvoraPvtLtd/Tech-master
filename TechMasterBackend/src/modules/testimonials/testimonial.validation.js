import Joi from "joi";

export const createTestimonialValidation = Joi.object({
  name: Joi.string().trim().required(),

  company: Joi.string().trim().required(),

  role: Joi.string().trim().optional(),

  quote: Joi.string().trim().required(),

  rating: Joi.number().min(1).max(5).optional(),

  avatarUrl: Joi.string().trim().optional(),

  isActive: Joi.boolean().optional(),
});