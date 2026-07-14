import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    timestamps: true,
  }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;