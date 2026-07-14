import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IPortfolio extends Document, ICmsBase {
  title: string;
  slug: string;
  category: string;
  categories: string[];
  description: string;
  coverImage?: IMedia;
  link?: string;
  client?: string;
  seo?: ISeo;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    categories: [{ type: String, trim: true }],
    description: { type: String, required: true },
    coverImage: { type: MediaSchema },
    link: { type: String, default: "" },
    client: { type: String, default: "" },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Portfolio = model<IPortfolio>("Portfolio", PortfolioSchema);
