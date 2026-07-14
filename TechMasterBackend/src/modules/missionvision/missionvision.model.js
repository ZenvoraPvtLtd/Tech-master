import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    smallLabel: { type: String, default: "" },
    headline: { type: String, default: "" },
    highlightWord: { type: String, default: "" },
    description: { type: String, default: "" },

    button1Text: { type: String, default: "" },
    button1Link: { type: String, default: "" },

    button2Text: { type: String, default: "" },
    button2Link: { type: String, default: "" },

    scrollIndicatorVisible: {
      type: Boolean,
      default: true,
    },

    backgroundImage: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const missionSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "" },
    subHeading: { type: String, default: "" },
    description: { type: String, default: "" },

    leftBorderColor: { type: String, default: "" },
    missionIcon: { type: String, default: "" },

    buttonText: { type: String, default: "" },
    buttonUrl: { type: String, default: "" },

    glassEffect: {
      type: Boolean,
      default: true,
    },

    missionImage: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const visionSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "" },
    subHeading: { type: String, default: "" },
    description: { type: String, default: "" },

    accentColor: { type: String, default: "" },
    visionIcon: { type: String, default: "" },

    buttonText: { type: String, default: "" },
    buttonUrl: { type: String, default: "" },

    visionImage: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const coreValueSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    icon: { type: String, default: "" },
    accentColor: { type: String, default: "" },
    description: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const brandPillarSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    icon: { type: String, default: "" },

    borderColor: { type: String, default: "" },
    hoverColor: { type: String, default: "" },

    description: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const roadmapSchema = new mongoose.Schema(
  {
    quarter: { type: String, default: "" },
    year: { type: String, default: "" },

    title: { type: String, default: "" },
    goal: { type: String, default: "" },

    accentColor: { type: String, default: "" },

    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed", "Upcoming"],
      default: "Planning",
    },

    description: { type: String, default: "" },

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const ctaSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "" },
    description: { type: String, default: "" },

    primaryButtonText: { type: String, default: "" },
    primaryButtonLink: { type: String, default: "" },

    secondaryButtonText: { type: String, default: "" },
    secondaryButtonLink: { type: String, default: "" },

    backgroundGradient: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },

    ogImageUrl: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const sectionSettingSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { _id: false }
);

const missionVisionSchema = new mongoose.Schema(
  {
    hero: heroSchema,

    mission: missionSchema,

    vision: visionSchema,

    coreValues: [coreValueSchema],

    brandPillars: [brandPillarSchema],

    roadmap: [roadmapSchema],

    cta: ctaSchema,

    seo: seoSchema,

    sectionSettings: {
      hero: sectionSettingSchema,
      mission: sectionSettingSchema,
      vision: sectionSettingSchema,
      coreValues: sectionSettingSchema,
      brandPillars: sectionSettingSchema,
      roadmap: sectionSettingSchema,
      cta: sectionSettingSchema,
      seo: sectionSettingSchema,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    isDraft: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MissionVision", missionVisionSchema);