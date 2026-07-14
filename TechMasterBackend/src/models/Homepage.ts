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
  seo?: ISeo;
}

const HomepageSchema = new Schema<IHomepage>(
  {
    hero: {
      title: { type: String, required: true },
      highlightTitle: { type: String, required: true },
      description: { type: String, required: true },
      ctaButtonText: { type: String, required: true },
      ctaButtonUrl: { type: String, required: true },
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
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Homepage = model<IHomepage>("Homepage", HomepageSchema);
