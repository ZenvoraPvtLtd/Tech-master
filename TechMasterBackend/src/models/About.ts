import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IHighlight {
  prefix?: string;
  number: number;
  suffix?: string;
  label: string;
  status: "Active" | "Inactive";
}

export interface IAbout extends Document, ICmsBase {
  introduction: {
    founderName: string;
    designation: string;
    shortDescription: string;
    profileImage?: IMedia;
  };
  philosophy: {
    title: string;
    description: string;
    image?: IMedia;
  };
  highlights: IHighlight[];
  seo?: ISeo;
}

const AboutSchema = new Schema<IAbout>(
  {
    introduction: {
      founderName: { type: String, required: true },
      designation: { type: String, required: true },
      shortDescription: { type: String, required: true },
      profileImage: { type: MediaSchema },
    },
    philosophy: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: MediaSchema },
    },
    highlights: [
      {
        prefix: { type: String, default: "" },
        number: { type: Number, required: true },
        suffix: { type: String, default: "" },
        label: { type: String, required: true },
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

export const About = model<IAbout>("About", AboutSchema);
