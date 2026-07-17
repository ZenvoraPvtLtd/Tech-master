import { Schema, model, Document } from "mongoose";
import { SeoSchema, CmsBaseFields, ICmsBase, ISeo } from "./shared";

export interface IPrivacySection {
  heading: string;
  description: string;
  order?: number;
  status?: string;
}

export interface IPrivacyPolicy extends Document, ICmsBase {
  popupTitle: string;
  effectiveDate: string;
  smallBadge?: string;
  introParagraph?: string;
  sections?: IPrivacySection[];
  seo?: ISeo;
}

const PrivacySectionSchema = new Schema<IPrivacySection>({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    popupTitle: { type: String, default: "Privacy Policy" },
    effectiveDate: { type: String, default: "July 7, 2026" },
    smallBadge: { type: String, default: "USER PRIVACY" },
    introParagraph: { type: String, default: "We respect your privacy." },
    sections: [PrivacySectionSchema],
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const PrivacyPolicy = model<IPrivacyPolicy>("PrivacyPolicy", PrivacyPolicySchema);
