import { Schema, model, Document } from "mongoose";
import { CmsBaseFields, ICmsBase } from "./shared";

export interface IFaq extends Document, ICmsBase {
  question: string;
  answer: string;
  order: number;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Faq = model<IFaq>("Faq", FaqSchema);
