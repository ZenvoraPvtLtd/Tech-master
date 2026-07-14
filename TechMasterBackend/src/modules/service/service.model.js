import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    smallLabel: { type: String, default: "" },
    headline: { type: String, default: "" },
    description: { type: String, default: "" },

    button1Text: { type: String, default: "" },
    button1Link: { type: String, default: "" },

    button2Text: { type: String, default: "" },
    button2Link: { type: String, default: "" },

    backgroundImage: {
      type: String,
      default: "",
    },
  },
  { _id: false, strict: false }
);

const serviceCategorySchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },

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
    timestamps: true, strict: false,
  }
);

const serviceCardSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    icon: { type: String, default: "" },
    image: { type: String, default: "" },

    isFeatured: {
      type: Boolean,
      default: false,
    },

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
    timestamps: true, strict: false,
  }
);

const serviceFeatureSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },

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
    timestamps: true, strict: false,
  }
);

const serviceProcessSchema = new mongoose.Schema(
  {
    stepNumber: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },

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
    timestamps: true, strict: false,
  }
);

const technologySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    icon: { type: String, default: "" },
    category: { type: String, default: "" },

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
    timestamps: true, strict: false,
  }
);

const whyChooseUsSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },

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
    timestamps: true, strict: false,
  }
);

const statisticSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    value: { type: String, default: "" },
    prefix: { type: String, default: "" },
    suffix: { type: String, default: "" },
    icon: { type: String, default: "" },

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
    timestamps: true, strict: false,
  }
);

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    price: { type: String, default: "" },
    billingCycle: { type: String, default: "" },
    description: { type: String, default: "" },
    features: [{ type: String }],
    
    buttonText: { type: String, default: "" },
    buttonLink: { type: String, default: "" },

    isPopular: {
      type: Boolean,
      default: false,
    },

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
    timestamps: true, strict: false,
  }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
    category: { type: String, default: "" },

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
    timestamps: true, strict: false,
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
  { _id: false, strict: false }
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
  { _id: false, strict: false }
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
  { _id: false, strict: false }
);

const serviceSchema = new mongoose.Schema(
  {
    hero: heroSchema,

    categories: [serviceCategorySchema],

    cards: [serviceCardSchema],

    features: [serviceFeatureSchema],

    process: [serviceProcessSchema],

    technologies: [technologySchema],

    whyChooseUs: [whyChooseUsSchema],

    statistics: [statisticSchema],

    pricingPlans: [pricingPlanSchema],

    faqs: [faqSchema],

    cta: ctaSchema,

    seo: seoSchema,

    sectionSettings: {
      hero: sectionSettingSchema,
      categories: sectionSettingSchema,
      cards: sectionSettingSchema,
      features: sectionSettingSchema,
      process: sectionSettingSchema,
      technologies: sectionSettingSchema,
      whyChooseUs: sectionSettingSchema,
      statistics: sectionSettingSchema,
      pricingPlans: sectionSettingSchema,
      faqs: sectionSettingSchema,
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
    timestamps: true, strict: false,
  }
);

export default mongoose.model("Service", serviceSchema);
