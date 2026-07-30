import { Schema, model, Document } from "mongoose";
import { SeoSchema, CmsBaseFields, ICmsBase, ISeo } from "./shared";

export interface IPrivacySection {
  id?: string;
  heading: string;
  description: string;
  order?: number;
  status?: string;
}

export interface IPopupSettings {
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

export interface ICloseButtonSettings {
  showCloseButton?: boolean;
  position?: string;
  icon?: string;
  size?: string;
  color?: string;
  hoverColor?: string;
}

export interface IPrivacySettings {
  requireAcceptance?: boolean;
  showOnFirstVisit?: boolean;
  showAfterLogin?: boolean;
  showOnRegistration?: boolean;
  cookieConsentIntegration?: boolean;
  autoExpiryReminderDays?: number;
}

export interface IPrivacyAnalytics {
  totalViews?: number;
  acceptanceRate?: string;
  lastUpdated?: string;
  currentVersion?: string;
  mostViewedSection?: string;
}

export interface IPrivacyPolicy extends Document, ICmsBase {
  popupTitle: string;
  effectiveDate: string;
  lastUpdatedDate?: string;
  versionNumber?: string;
  autoUpdateDate?: boolean;
  smallBadge?: string;
  introParagraph?: string;
  visibility?: boolean;
  sections?: IPrivacySection[];
  popupSettings?: IPopupSettings;
  closeButtonSettings?: ICloseButtonSettings;
  privacySettings?: IPrivacySettings;
  analytics?: IPrivacyAnalytics;
  seo?: ISeo;
}

const PrivacySectionSchema = new Schema<IPrivacySection>({
  id: { type: String },
  heading: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    popupTitle: { type: String, default: "Privacy Policy" },
    effectiveDate: { type: String, default: "July 7, 2026" },
    lastUpdatedDate: { type: String, default: "July 7, 2026" },
    versionNumber: { type: String, default: "v2.4" },
    autoUpdateDate: { type: Boolean, default: false },
    smallBadge: { type: String, default: "USER PRIVACY" },
    introParagraph: { type: String, default: "Aman & Tech Master Media Labs operates this portfolio and education portal. We respect your privacy and only collect direct email addresses when you subscribe to our newsletter." },
    visibility: { type: Boolean, default: true },
    sections: [PrivacySectionSchema],
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
    privacySettings: {
      requireAcceptance: { type: Boolean, default: false },
      showOnFirstVisit: { type: Boolean, default: true },
      showAfterLogin: { type: Boolean, default: false },
      showOnRegistration: { type: Boolean, default: false },
      cookieConsentIntegration: { type: Boolean, default: true },
      autoExpiryReminderDays: { type: Number, default: 30 }
    },
    analytics: {
      totalViews: { type: Number, default: 14892 },
      acceptanceRate: { type: String, default: "98.4%" },
      lastUpdated: { type: String, default: "July 7, 2026" },
      currentVersion: { type: String, default: "v2.4" },
      mostViewedSection: { type: String, default: "Data Collection & Use" }
    },
    seo: { type: SeoSchema },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const PrivacyPolicy = model<IPrivacyPolicy>("PrivacyPolicy", PrivacyPolicySchema);

