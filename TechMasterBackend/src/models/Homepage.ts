import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IStatCounter {
  prefix?: string;
  number: number;
  suffix?: string;
  label: string;
  status: "Active" | "Inactive";
}

export interface ICoreValue {
  title: string;
  description: string;
  icon?: string;
  status: "Active" | "Inactive";
}

export interface IEventCard {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  category?: string;
  image?: string;
  banner?: string;
  thumbnail?: string;
  galleryImages?: string[];
  video?: string;
  reel?: string;
  ctaText?: string;
  ctaUrl?: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
}

export interface ICampaignCard {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  video?: string;
  galleryImages?: string[];
  ctaText?: string;
  ctaUrl?: string;
  featured?: boolean;
  active?: boolean;
  order?: number;
}

export interface IFeaturedCampaigns {
  sectionTag?: string;
  smallHeading?: string;
  mainHeading?: string;
  highlightHeading?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  enableSection?: boolean;
  list?: ICampaignCard[];
}

export interface IEventHighlights {
  sectionTag?: string;
  smallHeading?: string;
  mainHeading?: string;
  highlightHeading?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  enableSection?: boolean;
  list?: IEventCard[];
}

export interface IHomepage extends Document, ICmsBase {
  hero: {
    title: string;
    highlightTitle: string;
    description: string;
    ctaButtonText: string;
    ctaButtonUrl: string;
    mediaFile?: IMedia;
  };
  statisticsCounters: IStatCounter[];
  coreValues: ICoreValue[];
  featuredCampaigns?: IFeaturedCampaigns;
  eventHighlights?: IEventHighlights;
  seo?: ISeo;
}

const HomepageSchema = new Schema<IHomepage>(
  {
    hero: {
      title: { type: String, default: "" },
      highlightTitle: { type: String, default: "" },
      description: { type: String, default: "" },
      ctaButtonText: { type: String, default: "" },
      ctaButtonUrl: { type: String, default: "" },
      mediaFile: { type: MediaSchema },
    },
    statisticsCounters: [
      {
        prefix: { type: String, default: "" },
        number: { type: Number, required: true },
        suffix: { type: String, default: "" },
        label: { type: String, required: true },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    coreValues: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: "" },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    featuredCampaigns: {
      sectionTag: { type: String, default: "" },
      smallHeading: { type: String, default: "" },
      mainHeading: { type: String, default: "" },
      highlightHeading: { type: String, default: "" },
      description: { type: String, default: "" },
      backgroundImage: { type: String, default: "" },
      backgroundVideo: { type: String, default: "" },
      enableSection: { type: Boolean, default: true },
      list: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, default: "" },
          coverImage: { type: String, default: "" },
          video: { type: String, default: "" },
          galleryImages: [{ type: String }],
          ctaText: { type: String, default: "" },
          ctaUrl: { type: String, default: "" },
          featured: { type: Boolean, default: false },
          active: { type: Boolean, default: true },
          order: { type: Number, default: 0 }
        }
      ]
    },
    eventHighlights: {
      sectionTag: { type: String, default: "" },
      smallHeading: { type: String, default: "" },
      mainHeading: { type: String, default: "" },
      highlightHeading: { type: String, default: "" },
      description: { type: String, default: "" },
      backgroundImage: { type: String, default: "" },
      backgroundVideo: { type: String, default: "" },
      enableSection: { type: Boolean, default: true },
      list: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, default: "" },
          date: { type: String, default: "" },
          time: { type: String, default: "" },
          location: { type: String, default: "" },
          category: { type: String, default: "" },
          image: { type: String, default: "" },
          banner: { type: String, default: "" },
          thumbnail: { type: String, default: "" },
          galleryImages: [{ type: String }],
          video: { type: String, default: "" },
          reel: { type: String, default: "" },
          ctaText: { type: String, default: "" },
          ctaUrl: { type: String, default: "" },
          featured: { type: Boolean, default: false },
          active: { type: Boolean, default: true },
          order: { type: Number, default: 0 }
        }
      ]
    },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Homepage = model<IHomepage>("Homepage", HomepageSchema);
