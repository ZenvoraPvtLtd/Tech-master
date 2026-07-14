import Joi from "joi";

export const createGalleryValidation = Joi.object({
  portfolioId: Joi.string().required(),

  title: Joi.string().trim().required(),

  image: Joi.string().trim().required(),

  alt: Joi.string().trim().optional(),

  displayOrder: Joi.number().optional(),

  status: Joi.boolean().optional(),
});

export const updateGalleryValidation = Joi.object({
  portfolioId: Joi.string().optional(),

  title: Joi.string().trim().optional(),

  image: Joi.string().trim().optional(),

  alt: Joi.string().trim().optional(),

  displayOrder: Joi.number().optional(),

  status: Joi.boolean().optional(),
});