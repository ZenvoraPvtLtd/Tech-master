import Joi from "joi";

export const createPortfolioValidation = Joi.object({
  title: Joi.string().trim().required(),

  slug: Joi.string().trim().optional(),

  shortDescription: Joi.string().trim().required(),

  description: Joi.string().trim().optional(),

  category: Joi.string().trim().required(),

  clientName: Joi.string().trim().optional(),

  projectDate: Joi.date().optional(),

  technologies: Joi.array().items(Joi.string()).optional(),

  images: Joi.array().items(Joi.string()).optional(),

  thumbnail: Joi.string().optional(),

  featured: Joi.boolean().optional(),

  status: Joi.boolean().optional(),
});