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

export interface IBrandPartner {
  id?: string;
  brandName: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  showYouTube?: boolean;
  showInstagram?: boolean;
  brandLogo?: string;
  logo?: string;
  website?: string;
  themeColor?: string;
  status?: string;
  order?: number;
}

export interface IBrandCollaborationItem {
  id?: string;
  brandName: string;
  logo?: string;
  brandLogo?: string;
  status?: string;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFeaturedVideoItem {
  id?: string;
  youtubeUrl: string;
  videoId: string;
  startTime?: string | number;
  endTime?: string | number;
  order?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  brandPartners?: IBrandPartner[];
  brandCollaborationsList?: IBrandCollaborationItem[];
  featuredVideos?: IFeaturedVideoItem[];
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
    brandPartners: [
      {
        brandName: { type: String, required: true },
        youtubeUrl: { type: String, default: "" },
        instagramUrl: { type: String, default: "" },
        showYouTube: { type: Boolean, default: true },
        showInstagram: { type: Boolean, default: true },
        brandLogo: { type: String, default: "" },
        logo: { type: String, default: "" },
        website: { type: String, default: "" },
        themeColor: { type: String, default: "#D4AF37" },
        status: { type: String, default: "Active" },
        order: { type: Number, default: 0 },
      },
    ],
    brandCollaborationsList: [
      {
        brandName: { type: String, required: true },
        logo: { type: String, default: "" },
        brandLogo: { type: String, default: "" },
        status: { type: String, default: "Active" },
        order: { type: Number, default: 0 },
      },
    ],
    featuredVideos: [
      {
        youtubeUrl: { type: String, required: true },
        videoId: { type: String, required: true },
        startTime: { type: Schema.Types.Mixed, default: "0:00" },
        endTime: { type: Schema.Types.Mixed, default: "" },
        order: { type: Number, default: 0 },
        status: { type: String, default: "Active" },
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
