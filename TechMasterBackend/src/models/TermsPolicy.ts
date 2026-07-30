import { Schema, model, Document } from "mongoose";
import { SeoSchema, CmsBaseFields, ICmsBase, ISeo } from "./shared";

export interface ITermsSection {
  id?: string;
  title: string;
  body: string;
  order?: number;
  status?: string;
}

export interface ITermsPopupSettings {
  width?: string;
  maxHeight?: string;
  scrollEnable?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  overlayBlur?: boolean;
  bgGlassEffect?: boolean;
  shadowStyle?: string;
  borderRadius?: string;
  animation?: string;
  openTransition?: string;
  closeTransition?: string;
}

export interface ITermsCloseButtonSettings {
  showCloseButton?: boolean;
  position?: string;
  icon?: string;
  size?: string;
  color?: string;
  hoverColor?: string;
}

export interface ITermsLegalSettings {
  requireUserAcceptance?: boolean;
  showBeforeRegistration?: boolean;
  showBeforeContactForm?: boolean;
  showBeforeNewsletter?: boolean;
  mandatoryAcceptance?: boolean;
  versionTracking?: boolean;
}

export interface ITermsAnalytics {
  totalViews?: number;
  acceptanceCount?: number;
  currentVersion?: string;
  lastUpdated?: string;
  mostViewedSection?: string;
}

export interface ITermsPolicy extends Document, ICmsBase {
  popupTitle: string;
  effectiveDate: string;
  lastUpdatedDate?: string;
  versionNumber?: string;
  autoUpdateDate?: boolean;
  smallBadge?: string;
  subtitle?: string;
  introParagraph?: string;
  visibility?: boolean;
  sections?: ITermsSection[];
  popupSettings?: ITermsPopupSettings;
  closeButtonSettings?: ITermsCloseButtonSettings;
  legalSettings?: ITermsLegalSettings;
  analytics?: ITermsAnalytics;
  seo?: ISeo;
}

const TermsSectionSchema = new Schema<ITermsSection>({
  id: { type: String },
  title: { type: String, required: true },
  body: { type: String, required: true },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const TermsPolicySchema = new Schema<ITermsPolicy>(
  {
    popupTitle: { type: String, default: "Terms of Service" },
    effectiveDate: { type: String, default: "July 7, 2026" },
    lastUpdatedDate: { type: String, default: "July 7, 2026" },
    versionNumber: { type: String, default: "v3.1" },
    autoUpdateDate: { type: Boolean, default: false },
    smallBadge: { type: String, default: "LEGAL PROTOCOLS" },
    subtitle: { type: String, default: "TechMaster Terms" },
    introParagraph: { type: String, default: "By browsing this platform, subscribing to our mailing list, or submitting inquiries, you agree to these Terms of Service." },
    visibility: { type: Boolean, default: true },
    sections: [TermsSectionSchema],
    popupSettings: {
      width: { type: String, default: "max-w-2xl" },
      maxHeight: { type: String, default: "max-h-[80vh]" },
      scrollEnable: { type: Boolean, default: true },
      overlayColor: { type: String, default: "#000000" },
      overlayOpacity: { type: Number, default: 80 },
      overlayBlur: { type: Boolean, default: true },
      bgGlassEffect: { type: Boolean, default: true },
      shadowStyle: { type: String, default: "shadow-2xl shadow-gold/5" },
      borderRadius: { type: String, default: "rounded-3xl" },
      animation: { type: String, default: "scale" },
      openTransition: { type: String, default: "ease-out duration-300" },
      closeTransition: { type: String, default: "ease-in duration-200" }
    },
    closeButtonSettings: {
      showCloseButton: { type: Boolean, default: true },
      position: { type: String, default: "top-right" },
      icon: { type: String, default: "✕" },
      size: { type: String, default: "w-8 h-8" },
      color: { type: String, default: "text-gray-400" },
      hoverColor: { type: String, default: "hover:text-gold" }
    },
    legalSettings: {
      requireUserAcceptance: { type: Boolean, default: false },
      showBeforeRegistration: { type: Boolean, default: true },
      showBeforeContactForm: { type: Boolean, default: true },
      showBeforeNewsletter: { type: Boolean, default: false },
      mandatoryAcceptance: { type: Boolean, default: false },
      versionTracking: { type: Boolean, default: true }
    },
    analytics: {
      totalViews: { type: Number, default: 18450 },
      acceptanceCount: { type: Number, default: 17820 },
      currentVersion: { type: String, default: "v3.1" },
      lastUpdated: { type: String, default: "July 7, 2026" },
      mostViewedSection: { type: String, default: "Intellectual Property" }
    },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const TermsPolicy = model<ITermsPolicy>("TermsPolicy", TermsPolicySchema);

