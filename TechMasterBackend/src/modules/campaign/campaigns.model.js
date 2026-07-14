import mongoose from "mongoose";

/* ==========================================================
   CAMPAIGN CMS — MongoDB Model
========================================================== */

const campaignItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    sponsor: { type: String, default: "", trim: true },
    reach: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    highlights: [{ type: String }],
    accentColor: { type: String, default: "#D4AF37" },
    coverImage: { type: String, default: "" },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const lifecycleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const successStorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    linkText: { type: String, default: "", trim: true },
    accentColor: { type: String, default: "#D4AF37" },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const campaignSchema = new mongoose.Schema(
  {
    hero: {
      smallBadge: { type: String, default: "" },
      highlightWord: { type: String, default: "" },
      headline: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    campaignsList: [campaignItemSchema],
    lifecycle: [lifecycleSchema],
    successStories: [successStorySchema],
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      metaKeywords: { type: String, default: "" },
      ogImageUrl: { type: String, default: "" },
    },
  },
  { timestamps: true, strict: false }
);

/* ==========================================================
   PRODUCT LAUNCH CMS — MongoDB Model
========================================================== */

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tagline: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    icon: { type: String, default: "Laptop" },
    accentColor: { type: String, default: "#D4AF37" },
    status: { type: String, default: "Active Launch" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const initiativeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    status: { type: String, default: "Active" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

const launchSchema = new mongoose.Schema(
  {
    hero: {
      smallBadge: { type: String, default: "" },
      highlightWord: { type: String, default: "" },
      headline: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    products: [productSchema],
    featureVideo: {
      smallBadge: { type: String, default: "" },
      headline: { type: String, default: "" },
      description: { type: String, default: "" },
      trailerBtnText: { type: String, default: "" },
      notesBtnText: { type: String, default: "" },
      videoUrl: { type: String, default: "" },
      thumbnailUrl: { type: String, default: "" },
    },
    initiatives: [initiativeSchema],
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      metaKeywords: { type: String, default: "" },
      ogImageUrl: { type: String, default: "" },
    },
  },
  { timestamps: true, strict: false }
);

export const Campaign = mongoose.model("Campaign", campaignSchema);
export const Launch = mongoose.model("Launch", launchSchema);
