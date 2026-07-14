import mongoose from "mongoose";


const testimonialSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },


    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },


    role: {
      type: String,
      trim: true,
      default: "",
    },


    quote: {
      type: String,
      required: [true, "Quote is required"],
      trim: true,
    },


    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },


    avatarUrl: {
      type: String,
      default: "",
    },


    isActive: {
      type: Boolean,
      default: true,
    },

  },
  {
    timestamps: true,
  }
);



const Testimonial = mongoose.model(
  "Testimonial",
  testimonialSchema
);


export default Testimonial;