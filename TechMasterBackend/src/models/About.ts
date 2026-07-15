import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IHighlight {
  prefix?: string;
  number: number;
  suffix?: string;
  label: string;
  status: "Active" | "Inactive";
}

export interface ICoreCollaborator {
  id: string;
  name: string;
  role?: string;
  company?: string;
  description?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  active?: boolean;
  order?: number;
}

export interface ICoreCollaboratorsSection {
  sectionTag?: string;
  smallHeading?: string;
  mainHeading?: string;
  highlightHeading?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  enableSection?: boolean;
  list?: ICoreCollaborator[];
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
  coreCollaborators?: ICoreCollaboratorsSection;
  seo?: ISeo;
}

const AboutSchema = new Schema<IAbout>(
  {
    introduction: {
      founderName: { type: String, default: "" },
      designation: { type: String, default: "" },
      shortDescription: { type: String, default: "" },
      profileImage: { type: MediaSchema },
    },
    philosophy: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
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
    coreCollaborators: {
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
          name: { type: String, required: true },
          role: { type: String, default: "" },
          company: { type: String, default: "" },
          description: { type: String, default: "" },
          image: { type: String, default: "" },
          linkedin: { type: String, default: "" },
          twitter: { type: String, default: "" },
          instagram: { type: String, default: "" },
          website: { type: String, default: "" },
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

export const About = model<IAbout>("About", AboutSchema);
