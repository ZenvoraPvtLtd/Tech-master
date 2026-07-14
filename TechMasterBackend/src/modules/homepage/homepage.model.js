import mongoose from "mongoose";

const homepageSettingSchema = new mongoose.Schema(
  {
    heroSlider: [
      {
        title: { type: String, trim: true, default: "" },
        subtitle: { type: String, trim: true, default: "" },
        description: { type: String, trim: true, default: "" },
        button: {
          label: { type: String, trim: true, default: "" },
          link: { type: String, trim: true, default: "" },
        },
        media: {
          url: { type: String, trim: true, default: "" },
          public_id: { type: String, trim: true, default: "" },
          type: { type: String, enum: ["image", "video"], default: "image" },
        },
        mobileMedia: {
          url: { type: String, trim: true, default: "" },
          public_id: { type: String, trim: true, default: "" },
          type: { type: String, enum: ["image", "video"], default: "image" },
        },
        overlay: {
          enabled: { type: Boolean, default: false },
          color: { type: String, trim: true, default: "" },
          opacity: { type: Number, default: 0 },
        },
        textPosition: { type: String, trim: true, default: "" },
        alignment: { type: String, trim: true, default: "" },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],

    // ─────────────────────────────────────────────
    //  VIDEO SLIDER
    // ─────────────────────────────────────────────

    videoSlider: [
      {
        title: {
          type: String,
          trim: true,
          default: "",
        },
        description: {
          type: String,
          trim: true,
          default: "",
        },
        video: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
          type: {
            type: String,
            enum: ["video"],
            default: "video",
          },
        },
        thumbnail: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
        },
        order: {
          type: Number,
          default: 0,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // ─────────────────────────────────────────────
    //  REELS
    // ─────────────────────────────────────────────

    reels: [
      {
        title: {
          type: String,
          trim: true,
          default: "",
        },
        description: {
          type: String,
          trim: true,
          default: "",
        },
        reelVideo: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
          duration: {
            type: Number,
            default: 0,
          },
          type: {
            type: String,
            enum: ["video"],
            default: "video",
          },
        },
        thumbnail: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
        },
        order: {
          type: Number,
          default: 0,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
         
    // ─────────────────────────────────────────────
    //  SHORTS
    // ─────────────────────────────────────────────

    shorts: [
      {
        title: {
          type: String,
          trim: true,
          default: "",
        },
        description: {
          type: String,
          trim: true,
          default: "",
        },
        shortVideo: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
          duration: {
            type: Number,
            default: 0,
          },
          type: {
            type: String,
            enum: ["video"],
            default: "video",
          },
        },
        thumbnail: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
        },
        order: {
          type: Number,
          default: 0,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // ─────────────────────────────────────────────
    //  LONG VIDEOS
    // ─────────────────────────────────────────────

    longVideos: [
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
        category: {
          type: String,
          trim: true,
          default: "",
        },
        duration: {
          type: Number,
          default: 0,
        },
        video: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
          type: {
            type: String,
            enum: ["video"],
            default: "video",
          },
        },
        thumbnail: {
          url: {
            type: String,
            trim: true,
            default: "",
          },
          public_id: {
            type: String,
            trim: true,
            default: "",
          },
        },
        order: {
          type: Number,
          default: 0,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    sections: [
      {
        type: {
          type: String,
          enum: [
            "hero",
            "video_slider",
            "reels",
            "shorts",
            "long_videos",
            "featured_services",
            "journey_highlights",
            "brand_collaborations",
            "featured_campaigns",
            "testimonials",
            "statistics",
            "newsletter",
            "contact",
          ],
          required: true,
        },
        customName: {
          type: String,
          trim:true,
          default: "",
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
    ],

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

const HomepageSetting = mongoose.model(
  "HomepageSetting",
  homepageSettingSchema
);

export { HomepageSetting };
export default HomepageSetting;
