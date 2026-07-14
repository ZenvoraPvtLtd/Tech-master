import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    team: {
      type: String,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
        "Remote",
        "Freelance",
      ],
      default: "Full Time",
    },

    experience: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    salary: {
      type: String,
      trim: true,
    },

    vacancies: {
      type: Number,
      default: 1,
      min: 1,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    companyLogo: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;