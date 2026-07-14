import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    eyebrowText: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    highlightedTitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: false, strict: false }
);

const historySchema = new mongoose.Schema(
  {
    eyebrow: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    highlightedTitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    cardTitle: {
      type: String,
      default: "",
    },
    cardDescription: {
      type: String,
      default: "",
    },
  },
  { _id: false, strict: false }
);

const seoSchema = new mongoose.Schema(
  {
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
    keywords: {
      type: String,
      default: "",
    },
    ogImage: {
      type: String,
      default: "",
    },
  },
  { _id: false, strict: false }
); // <-- Yahan brackets galat band the, isse fix kiya gaya hai.

const brandCarouselSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    logoImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "",
    },
    featuredWork: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    accentColor: {
      type: String,
      default: "#D4AF37",
    },
    logo: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const metricSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    buttonLink: {
      type: String,
      default: "",
    },
    accentColor: {
      type: String,
      default: "#D4AF37",
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const processSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const testimonialSchema = new mongoose.Schema(
  {
    personName: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    quote: {
      type: String,
      default: "",
    },
    accentColor: {
      type: String,
      default: "#D4AF37",
    },
    avatar: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
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
  {
    _id: false,
    strict: false,
  }
);

const collaborationSchema = new mongoose.Schema(
  {
    hero: {
      type: heroSchema,
      default: () => ({}),
    },

    history: {
      type: historySchema,
      default: () => ({}),
    },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    brandCarousel: {
      type: [brandCarouselSchema],
      default: [],
    },

    partners: {
      type: [partnerSchema],
      default: [],
    },

    metrics: {
      type: [metricSchema],
      default: [],
    },

    campaigns: {
      type: [campaignSchema],
      default: [],
    },

    process: {
      type: [processSchema],
      default: [],
    },

    testimonials: {
      type: [testimonialSchema],
      default: [],
    },

    sectionSettings: {
      hero: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      brandCarousel: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      partners: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      metrics: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      campaigns: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      history: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      process: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      testimonials: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
      seo: {
        type: sectionSettingSchema,
        default: () => ({}),
      },
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Collaboration = mongoose.model("Collaboration", collaborationSchema);

export default Collaboration;