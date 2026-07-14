import { Schema, model, Document } from "mongoose";
import { MediaSchema, SeoSchema, CmsBaseFields, ICmsBase, IMedia, ISeo } from "./shared";

export interface IContactInfoItem {
  type: "email" | "phone" | "address" | "office-hours" | string;
  value: string;
  label: string;
  status: "Active" | "Inactive";
}

export interface IFormFieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | string;
  required: boolean;
  options?: string[];
  status: "Active" | "Inactive";
}

export interface IContact extends Document, ICmsBase {
  heroSetup?: {
    badgeText?: string;
    heading: string;
    description: string;
    mediaFile?: IMedia;
  };
  infoSetup?: IContactInfoItem[];
  whatsAppSetup?: {
    phoneNumber: string;
    messageText?: string;
    status: "Active" | "Inactive";
  };
  mapSetup?: {
    embedUrl: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
  };
  formConfig?: {
    submitButtonText?: string;
    successMessage?: string;
    recipientEmail?: string;
  };
  formFields?: IFormFieldConfig[];
  categories?: string[];
  socialLinks?: {
    platform: string;
    url: string;
    icon?: string;
    status: "Active" | "Inactive";
  }[];
  seo?: ISeo;
}

const ContactSchema = new Schema<IContact>(
  {
    heroSetup: {
      badgeText: { type: String, default: "" },
      heading: { type: String, default: "" },
      description: { type: String, default: "" },
      mediaFile: { type: MediaSchema },
    },
    infoSetup: [
      {
        type: { type: String, required: true },
        value: { type: String, required: true },
        label: { type: String, required: true },
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    whatsAppSetup: {
      phoneNumber: { type: String, default: "" },
      messageText: { type: String, default: "" },
      status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    },
    mapSetup: {
      embedUrl: { type: String, default: "" },
      latitude: { type: Number },
      longitude: { type: Number },
      zoom: { type: Number },
    },
    formConfig: {
      submitButtonText: { type: String, default: "Send Enquiry" },
      successMessage: { type: String, default: "Your enquiry has been sent successfully." },
      recipientEmail: { type: String, default: "" },
    },
    formFields: [
      {
        name: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, required: true },
        required: { type: Boolean, default: true },
        options: [{ type: String }],
        status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
      },
    ],
    categories: [{ type: String }],
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, default: "" },
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

export const Contact = model<IContact>("Contact", ContactSchema);
