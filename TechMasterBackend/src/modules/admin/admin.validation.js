import Joi from "joi";

/**
 * LOGIN VALIDATION
 */
export const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email",
    }),

  password: Joi.string()
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 20 characters",
    }),
});

/**
 * FORGOT PASSWORD VALIDATION
 */
export const forgotPasswordValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email",
    }),
});

/**
 * RESET PASSWORD VALIDATION (token based)
 */
export const resetPasswordValidation = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
  }),

  newPassword: Joi.string()
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.empty": "New password is required",
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});

/**
 * CHANGE PASSWORD VALIDATION (logged-in user)
 */
export const changePasswordValidation = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).max(20).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});