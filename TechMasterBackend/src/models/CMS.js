import mongoose from "mongoose";

const cmsDataSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CMSData = mongoose.model("CMSData", cmsDataSchema, "cmsdatas");

export default CMSData;
