import mongoose from "mongoose";


const portfolioSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },


    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },


    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },


    description: {
      type: String,
      trim: true,
    },


    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },


    clientName: {
      type: String,
      trim: true,
    },


    projectDate: {
      type: Date,
    },


    technologies: [
      {
        type: String,
      },
    ],


    images: [
      {
        type: String,
      },
    ],


    thumbnail: {
      type: String,
      default: "",
    },


    video: {
      type: String,
      default: "",
    },


    featured: {
      type: Boolean,
      default: false,
    },


    status: {
      type: String,
      default: "Active",
    },


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

  },
  {
    timestamps: true,
    strict: false,
  }
);



// ==========================
// Auto Generate Slug
// ==========================

portfolioSchema.pre("save", function () {

  if (this.isModified("title")) {

    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Math.random().toString(36).substring(2, 6);

  }

});



const Portfolio = mongoose.model(
  "Portfolio",
  portfolioSchema
);


export default Portfolio;