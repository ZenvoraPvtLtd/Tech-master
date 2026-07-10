import mongoose from "mongoose";

const cmsDataSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "blogs", "globalSEO", "contactHeroSetup", etc.
    data: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("CMSData", cmsDataSchema);
