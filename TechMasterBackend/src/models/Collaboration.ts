import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IBrandCarouselItem {
  name: string;
  logo: IMedia;
  link?: string;
  status: "Active" | "Inactive";
}

export interface IPartner {
  partnerName: string;
  logo: IMedia;
  description?: string;
  status: "Active" | "Inactive";
}

export interface ICollabMetric {
  number: string;
  label: string;
  status: "Active" | "Inactive";
}

export interface ICollabProcess {
  step: string;
  title: string;
  description: string;
  status: "Active" | "Inactive";
}

export interface ICollaboration extends Document, ICmsBase {
  hero?: {
    badgeText?: string;
    heading: string;
    description: string;
    mediaFile?: IMedia;
  };
  brandCarousel?: IBrandCarouselItem[];
  partners?: IPartner[];
  metrics?: ICollabMetric[];
  process?: ICollabProcess[];
  history?: {
    title?: string;
    description?: string;
  };
  seo?: ISeo;
}

const CollaborationSchema = new Schema<ICollaboration>(
  {
    hero: {
      badgeText: { type: String, default: "" },
      heading: { type: String, default: "" },
      description: { type: String, default: "" },
      mediaFile: { type: MediaSchema },
    },
    brandCarousel: [
      {
        name: { type: String, required: true },
        logo: { type: MediaSchema, required: true },
        link: { type: String, default: "" },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    partners: [
      {
        partnerName: { type: String, required: true },
        logo: { type: MediaSchema, required: true },
        description: { type: String, default: "" },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    metrics: [
      {
        number: { type: String, required: true },
        label: { type: String, required: true },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    process: [
      {
        step: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    history: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Collaboration = model<ICollaboration>("Collaboration", CollaborationSchema);
