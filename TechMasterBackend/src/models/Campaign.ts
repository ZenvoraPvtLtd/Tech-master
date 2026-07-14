import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface ICampaign extends Document, ICmsBase {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  coverImage?: IMedia;
  accentColor?: string;
  seo?: ISeo;
}

const CampaignSchema = new Schema<ICampaign>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: MediaSchema },
    accentColor: { type: String, default: "#D4AF37" },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Campaign = model<ICampaign>("Campaign", CampaignSchema);
