import mongoose from "mongoose";

const pageSEOSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    timestamps: true,
  }
);

const PageSEO = mongoose.model("PageSEO", pageSEOSchema);

export default PageSEO;