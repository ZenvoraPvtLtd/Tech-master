import mongoose from "mongoose";

const { Schema, model } = mongoose;

/* ==========================================================
   COMMON MEDIA SCHEMA
========================================================== */

const mediaSchema = new Schema(
  {
    url: {
      type: String,
      default: "",
      trim: true,
    },

    publicId: {
      type: String,
      default: "",
      trim: true,
    },

    alt: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    size: {
      type: Number,
      default: 0,
    },

    mimeType: {
      type: String,
      default: "",
    },
  },
  { strict: false }
);

/* ==========================================================
   INTRODUCTION
========================================================== */

const introductionSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    subtitle: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    buttonText: {
      type: String,
      trim: true,
      default: "",
    },

    buttonLink: {
      type: String,
      trim: true,
      default: "",
    },

    profileImage: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   STORY
========================================================== */

const storySchema = new Schema(
  {
    heading: {
      type: String,
      trim: true,
      default: "",
    },

    storyContent: {
      type: String,
      default: "",
    },

    gallery: {
      type: [mediaSchema],
      default: [],
    },

    featuredVideo: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   VISION
========================================================== */

const visionSchema = new Schema(
  {
    visionTitle: {
      type: String,
      trim: true,
      default: "",
    },

    visionDescription: {
      type: String,
      default: "",
    },

    image: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);
/* ==========================================================
   HIGHLIGHTS
========================================================== */

const highlightSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

/* ==========================================================
   ACHIEVEMENTS
========================================================== */

const achievementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
    },

    image: {
      type: mediaSchema,
      default: () => ({}),
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

/* ==========================================================
   AWARDS
========================================================== */

const awardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    certificate: {
      type: mediaSchema,
      default: () => ({}),
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

/* ==========================================================
   EXPERIENCE
========================================================== */

const experienceSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    companyLogo: {
      type: mediaSchema,
      default: () => ({}),
    },

    order: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
/* ==========================================================
   SECTION SETTINGS
========================================================== */

const sectionSchema = new Schema(
  {
    status: {
      type: String,
      default: "Active",
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   SEO
========================================================== */

const seoSchema = new Schema(
  {
    metaTitle: {
      type: String,
      trim: true,
      default: "",
    },

    metaDescription: {
      type: String,
      trim: true,
      default: "",
    },

    keywords: [
      {
        type: String,
        trim: true,
      },
    ],

    canonicalUrl: {
      type: String,
      trim: true,
      default: "",
    },

    ogImage: {
      type: mediaSchema,
      default: () => ({}),
    },
  },
  {
    _id: false,
    strict: false,
  }
);

/* ==========================================================
   ABOUT SCHEMA
========================================================== */

const aboutSchema = new Schema(
  {
    introduction: {
      type: introductionSchema,
      default: () => ({}),
    },

    story: {
      type: storySchema,
      default: () => ({}),
    },

    vision: {
      type: visionSchema,
      default: () => ({}),
    },

    highlights: {
      type: [highlightSchema],
      default: [],
    },

    achievements: {
      type: [achievementSchema],
      default: [],
    },

    awards: {
      type: [awardSchema],
      default: [],
    },

    experience: {
      type: [experienceSchema],
      default: [],
    },

    sections: {
      introduction: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 1,
        }),
      },

      story: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 2,
        }),
      },

      vision: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 3,
        }),
      },

      highlights: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 4,
        }),
      },

      achievements: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 5,
        }),
      },

      awards: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 6,
        }),
      },

      experience: {
        type: sectionSchema,
        default: () => ({
          status: "Active",
          order: 7,
        }),
      },
    },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    publishStatus: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: false,
  }
);

/* ==========================================================
   INDEXES
========================================================== */

aboutSchema.index({ publishStatus: 1 });
aboutSchema.index({ updatedAt: -1 });

/* ==========================================================
   MODEL
========================================================== */
const About = model("About", aboutSchema);

export default About;
