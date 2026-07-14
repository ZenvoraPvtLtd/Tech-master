import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface ICoreValueItem {
  title: string;
  description: string;
  icon?: string;
  status: "Active" | "Inactive";
}

export interface IBrandPillar {
  title: string;
  description: string;
  image?: IMedia;
  status: "Active" | "Inactive";
}

export interface IRoadmapItem {
  phase: string;
  title: string;
  description: string;
  dateRange: string;
  status: "Active" | "Inactive";
}

export interface IMissionVision extends Document, ICmsBase {
  hero?: {
    badgeText?: string;
    heading: string;
    description: string;
    mediaFile?: IMedia;
  };
  mission?: {
    title: string;
    description: string;
    mediaFile?: IMedia;
  };
  vision?: {
    title: string;
    description: string;
    mediaFile?: IMedia;
  };
  coreValues?: ICoreValueItem[];
  brandPillars?: IBrandPillar[];
  roadmap?: IRoadmapItem[];
  cta?: {
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  seo?: ISeo;
}

const MissionVisionSchema = new Schema<IMissionVision>(
  {
    hero: {
      badgeText: { type: String, default: "" },
      heading: { type: String, default: "" },
      description: { type: String, default: "" },
      mediaFile: { type: MediaSchema },
    },
    mission: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      mediaFile: { type: MediaSchema },
    },
    vision: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      mediaFile: { type: MediaSchema },
    },
    coreValues: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: "" },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    brandPillars: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: MediaSchema },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    roadmap: [
      {
        phase: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        dateRange: { type: String, default: "" },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    cta: {
      heading: { type: String, default: "" },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "" },
      buttonUrl: { type: String, default: "" },
    },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const MissionVision = model<IMissionVision>("MissionVision", MissionVisionSchema);
