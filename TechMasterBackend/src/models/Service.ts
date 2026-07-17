import { Schema, model, Document } from "mongoose";
import { SeoSchema, CmsBaseFields, ICmsBase, ISeo } from "./shared";

export interface IService extends Document, ICmsBase {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  icon?: string;
  accentColor?: string;
  overview?: string;
  benefits?: string[];
  process?: string[];
  gallery?: string[];
  ctaText?: string;
  ctaUrl?: string;
  displayOrder?: number;
  seo?: ISeo;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String, required: true }],
    icon: { type: String, default: "Cpu" },
    accentColor: { type: String, default: "#D4AF37" },
    overview: { type: String },
    benefits: [{ type: String }],
    process: [{ type: String }],
    gallery: [{ type: String }],
    ctaText: { type: String },
    ctaUrl: { type: String },
    displayOrder: { type: Number, default: 0 },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Service = model<IService>("Service", ServiceSchema);
