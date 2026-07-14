import Joi from "joi";

export const createUserValidation = Joi.object({
  name: Joi.string().trim().required(),

  email: Joi.string().email().trim().required(),

  role: Joi.string()
    .valid(
      "Super Admin",
      "Editor",
      "Analyst",
      "Writer"
    )
    .optional(),

  status: Joi.string()
    .valid(
      "Active",
      "Suspended"
    )
    .optional(),

  imageUrl: Joi.string()
    .allow("")
    .optional(),
});

export const updateUserValidation =
  createUserValidation.fork(
    ["name", "email"],
    (field) => field.optional()
  );