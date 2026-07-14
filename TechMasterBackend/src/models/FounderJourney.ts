import { Schema, model, Document } from "mongoose";
import { SeoSchema, CmsBaseFields, ICmsBase, ISeo } from "./shared";

export interface IMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  status: "Active" | "Inactive";
}

export interface IFounderJourney extends Document, ICmsBase {
  hero: {
    badgeText: string;
    heading: string;
    highlightWord: string;
    description: string;
    scrollIndicatorText: string;
  };
  milestones: IMilestone[];
  seo?: ISeo;
}

const FounderJourneySchema = new Schema<IFounderJourney>(
  {
    hero: {
      badgeText: { type: String, required: true },
      heading: { type: String, required: true },
      highlightWord: { type: String, required: true },
      description: { type: String, required: true },
      scrollIndicatorText: { type: String, required: true },
    },
    milestones: [
      {
        year: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, required: true },
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

export const FounderJourney = model<IFounderJourney>("FounderJourney", FounderJourneySchema);
