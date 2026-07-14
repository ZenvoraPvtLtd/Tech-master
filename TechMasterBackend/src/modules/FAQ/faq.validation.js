import Joi from "joi";

// ==============================
// FAQ Validation
// ==============================

export const createFAQValidation = Joi.object({
  question: Joi.string().trim().required(),

  answer: Joi.string().trim().required(),

  category: Joi.string()
    .valid(
      "General",
      "Booking",
      "Services",
      "Pricing",
      "Production"
    )
    .default("General"),

  isActive: Joi.boolean().default(true),
});

export const updateFAQValidation = Joi.object({
  question: Joi.string().trim(),

  answer: Joi.string().trim(),

  category: Joi.string().valid(
    "General",
    "Booking",
    "Services",
    "Pricing",
    "Production"
  ),

  isActive: Joi.boolean(),
});

// ==============================
// Enquiry Validation
// ==============================

export const createEnquiryValidation = Joi.object({
  senderName: Joi.string().trim().required(),

  email: Joi.string().email().required(),

  subject: Joi.string().trim().required(),

  message: Joi.string().trim().required(),

  category: Joi.string()
    .valid(
      "Question",
      "General",
      "Feedback",
      "Booking",
      "Sponsorship"
    )
    .default("Question"),
});

export const replyEnquiryValidation = Joi.object({
  reply: Joi.string().trim().required(),
});