import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.model(
  "WebsiteSettings",
  websiteSettingsSchema
);