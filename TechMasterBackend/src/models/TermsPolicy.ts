import { Schema, model, Document } from "mongoose";
import { SeoSchema, CmsBaseFields, ICmsBase, ISeo } from "./shared";

export interface ITermsSection {
  title: string;
  body: string;
  order?: number;
  status?: string;
}

export interface ITermsPolicy extends Document, ICmsBase {
  popupTitle: string;
  effectiveDate: string;
  smallBadge?: string;
  subtitle?: string;
  introParagraph?: string;
  sections?: ITermsSection[];
  seo?: ISeo;
}

const TermsSectionSchema = new Schema<ITermsSection>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const TermsPolicySchema = new Schema<ITermsPolicy>(
  {
    popupTitle: { type: String, default: "Terms of Service" },
    effectiveDate: { type: String, default: "July 7, 2026" },
    smallBadge: { type: String, default: "LEGAL PROTOCOLS" },
    subtitle: { type: String, default: "TechMaster Terms" },
    introParagraph: { type: String, default: "By browsing this platform, you agree to these Terms." },
    sections: [TermsSectionSchema],
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const TermsPolicy = model<ITermsPolicy>("TermsPolicy", TermsPolicySchema);
