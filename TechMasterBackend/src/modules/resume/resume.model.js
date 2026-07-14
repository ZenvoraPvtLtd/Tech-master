import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    experience: {
      type: String,
      trim: true,
    },

    currentCompany: {
      type: String,
      trim: true,
    },

    currentCTC: {
      type: String,
      trim: true,
    },

    expectedCTC: {
      type: String,
      trim: true,
    },

    noticePeriod: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
      default: "",
    },

    portfolio: {
      type: String,
      trim: true,
      default: "",
    },

    coverLetter: {
      type: String,
      trim: true,
      default: "",
    },

    resume: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Reviewed",
        "Shortlisted",
        "Rejected",
        "Hired",
      ],
      default: "Pending",
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    hrNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;