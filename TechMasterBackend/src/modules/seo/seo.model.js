import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    timestamps: true,
  }
);

export default mongoose.model("SEO", seoSchema);