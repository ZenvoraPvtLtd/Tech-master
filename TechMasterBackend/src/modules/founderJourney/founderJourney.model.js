import mongoose from "mongoose";

const founderJourneyItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["timeline", "milestones"],
        message: "{VALUE} is not a valid milestone type",
      },
    },
    year: {
      type: String,
      required: [true, "Year / time period is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title name is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexing for faster sorting and fetching
founderJourneyItemSchema.index({ type: 1, order: 1 });

const founderJourneySettingSchema = new mongoose.Schema(
  {
    sections: {
      timeline: {
        isActive: { type: Boolean, default: true },
      },
      milestones: {
        isActive: { type: Boolean, default: true },
      },
      futureVision: {
        isActive: { type: Boolean, default: true },
      },
    },
    futureVision: {
      futureHeading: {
        type: String,
        required: [true, "Future Vision heading is required"],
        default: "The Horizon of Immersive Media",
      },
      futureDescription: {
        type: String,
        default: "Driving dynamic visual architectures across global operations networks.",
      },
      image: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
      },
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FounderJourneyItem = mongoose.model(
  "FounderJourneyItem",
  founderJourneyItemSchema
);
const FounderJourneySetting = mongoose.model(
  "FounderJourneySetting",
  founderJourneySettingSchema
);

export { FounderJourneyItem, FounderJourneySetting };
export default {
  FounderJourneyItem,
  FounderJourneySetting,
};
