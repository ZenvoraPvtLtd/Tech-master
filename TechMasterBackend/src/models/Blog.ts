import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IBlog extends Document, ICmsBase {
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: Date;
  excerpt: string;
  content: string;
  image?: IMedia;
  seo?: ISeo;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    readTime: { type: String, required: true, default: "5 min read" },
    date: { type: Date, required: true, default: Date.now },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: MediaSchema },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Blog = model<IBlog>("Blog", BlogSchema);
