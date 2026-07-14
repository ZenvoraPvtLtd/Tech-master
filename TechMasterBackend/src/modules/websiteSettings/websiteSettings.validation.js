import Joi from "joi";

export const websiteSettingsValidation = Joi.object({
  // ==========================
  // General Settings
  // ==========================
  siteName: Joi.string().trim(),

  siteTagline: Joi.string().trim(),

  maintenanceMode: Joi.boolean(),

  timezone: Joi.string().trim(),

  language: Joi.string().trim(),

  // ==========================
  // Logo & Favicon
  // ==========================
  logo: Joi.string().allow("", null),

  favicon: Joi.string().allow("", null),

  appleTouchIcon: Joi.string().allow("", null),

  // ==========================
  // Social Links
  // ==========================
  facebook: Joi.string().allow("", null),

  instagram: Joi.string().allow("", null),

  linkedin: Joi.string().allow("", null),

  twitter: Joi.string().allow("", null),

  youtube: Joi.string().allow("", null),

  // ==========================
  // Contact Details
  // ==========================
  email: Joi.string().email().allow("", null),

  phone: Joi.string().allow("", null),

  whatsapp: Joi.string().allow("", null),

  address: Joi.string().allow("", null),

  googleMap: Joi.string().allow("", null),

  // ==========================
  // Footer Settings
  // ==========================
  copyright: Joi.string().allow("", null),

  footerDescription: Joi.string().allow("", null),

  footerLinks: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      url: Joi.string().required(),
    })
  ),

  // ==========================
  // Email Configuration
  // ==========================
  smtpHost: Joi.string().allow("", null),

  smtpPort: Joi.number(),

  smtpUser: Joi.string().allow("", null),

  smtpPassword: Joi.string().allow("", null),

  smtpFromEmail: Joi.string().email().allow("", null),

  smtpFromName: Joi.string().allow("", null),
});