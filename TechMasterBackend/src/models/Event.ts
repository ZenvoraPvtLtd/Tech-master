import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IEvent extends Document, ICmsBase {
  title: string;
  slug: string;
  date: Date;
  location: string;
  description: string;
  category: string;
  image?: IMedia;
  seo?: ISeo;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    image: { type: MediaSchema },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Event = model<IEvent>("Event", EventSchema);
