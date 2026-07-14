import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IProductLaunch extends Document, ICmsBase {
  productName: string;
  slug: string;
  brandDetails?: string;
  launchEventTitle: string;
  description: string;
  launchDate?: Date;
  coverImage?: IMedia;
  featureVideo?: IMedia;
  accentColor?: string;
  seo?: ISeo;
}

const ProductLaunchSchema = new Schema<IProductLaunch>(
  {
    productName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    brandDetails: { type: String, default: "" },
    launchEventTitle: { type: String, required: true },
    description: { type: String, required: true },
    launchDate: { type: Date },
    coverImage: { type: MediaSchema },
    featureVideo: { type: MediaSchema },
    accentColor: { type: String, default: "#D4AF37" },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const ProductLaunch = model<IProductLaunch>("ProductLaunch", ProductLaunchSchema);
