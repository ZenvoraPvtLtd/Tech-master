import Joi from "joi";

export const updateSEOValidation = Joi.object({
  globalToggles: Joi.object({
    enableSEO: Joi.boolean(),
    allowIndexing: Joi.boolean(),
    autoSitemap: Joi.boolean(),
    autoRobots: Joi.boolean(),
    forceHTTPS: Joi.boolean(),
    enableSchema: Joi.boolean(),
  }),

  websiteName: Joi.string().allow("", null),
  websiteUrl: Joi.string().allow("", null),
  defaultTitle: Joi.string().allow("", null),
  canonicalURL: Joi.string().allow("", null),
  defaultDescription: Joi.string().allow("", null),
  defaultKeywords: Joi.string().allow("", null),

  defaultOGTitle: Joi.string().allow("", null),
  defaultOGDescription: Joi.string().allow("", null),
  defaultOGImage: Joi.string().allow("", null),

  twitterCard: Joi.string().allow("", null),
  twitterSite: Joi.string().allow("", null),
  twitterCreator: Joi.string().allow("", null),

  analytics: Joi.object({
    googleAnalyticsId: Joi.string().allow("", null),
    gtmId: Joi.string().allow("", null),
    metaPixelId: Joi.string().allow("", null),
    clarityId: Joi.string().allow("", null),
    linkedinInsight: Joi.string().allow("", null),
    customHeaderScript: Joi.string().allow("", null),
    customFooterScript: Joi.string().allow("", null),
  }),

  socialLinks: Joi.array().items(
    Joi.object({
      platform: Joi.string().required(),
      url: Joi.string().allow("", null),
      order: Joi.number().default(1),
    })
  ),

  businessInformation: Joi.object({
    name: Joi.string().allow("", null),
    type: Joi.string().allow("", null),
    email: Joi.string().email().allow("", null),
    phone: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    state: Joi.string().allow("", null),
    country: Joi.string().allow("", null),
    postalCode: Joi.string().allow("", null),
    latitude: Joi.string().allow("", null),
    longitude: Joi.string().allow("", null),
    logo: Joi.string().allow("", null),
  }),

  verificationCodes: Joi.object({
    google: Joi.string().allow("", null),
    bing: Joi.string().allow("", null),
    yandex: Joi.string().allow("", null),
    pinterest: Joi.string().allow("", null),
  }),

  robotsSettings: Joi.string().allow("", null),
  sitemapSettings: Joi.string().allow("", null),
});