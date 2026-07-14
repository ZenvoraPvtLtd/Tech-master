import mongoose from "mongoose";

const redirectSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: Number,
      enum: [301, 302],
      default: 301,
    },

    status: {
      type: Boolean,
      default: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Redirect = mongoose.model("Redirect", redirectSchema);

export default Redirect;