import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IOperationItem {
  title: string;
  description: string;
  icon?: string;
  status: "Active" | "Inactive";
}

export interface IServiceListItem {
  title: string;
  description: string;
  status: "Active" | "Inactive";
}

export interface IWhatWeDo extends Document, ICmsBase {
  hero?: {
    badgeText?: string;
    heading: string;
    description: string;
    mediaFile?: IMedia;
  };
  operations?: IOperationItem[];
  servicesList?: IServiceListItem[];
  quoteBanner?: {
    quote: string;
    author: string;
  };
  seo?: ISeo;
}

const WhatWeDoSchema = new Schema<IWhatWeDo>(
  {
    hero: {
      badgeText: { type: String, default: "" },
      heading: { type: String, default: "" },
      description: { type: String, default: "" },
      mediaFile: { type: MediaSchema },
    },
    operations: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: "" },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    servicesList: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    quoteBanner: {
      quote: { type: String, default: "" },
      author: { type: String, default: "" },
    },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const WhatWeDo = model<IWhatWeDo>("WhatWeDo", WhatWeDoSchema);
