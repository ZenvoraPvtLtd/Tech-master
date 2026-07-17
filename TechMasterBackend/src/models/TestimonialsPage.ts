import { Schema, model, Document } from "mongoose";
import { SeoSchema, CmsBaseFields, ICmsBase, ISeo } from "./shared";

export interface ISuccessStat {
  label: string;
  value: string;
  suffix?: string;
  icon?: string;
  color?: string;
  order?: number;
  status?: string;
}

export interface IVideoTestimonial {
  name: string;
  role: string;
  company: string;
  thumbnail: string;
  video: string;
  duration?: string;
  description?: string;
  rating?: number;
  featured?: boolean;
  order?: number;
  status?: string;
}

export interface IWrittenTestimonial {
  name: string;
  designation: string;
  company: string;
  photo: string;
  review: string;
  rating?: number;
  logo?: string;
  featured?: boolean;
  status?: string;
  order?: number;
}

export interface ICategoryItem {
  title: string;
  description?: string;
  icon?: string;
  order?: number;
  status?: string;
}

export interface IWhatWeDoItem {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  status?: string;
}

export interface ITestimonialsPage extends Document, ICmsBase {
  hero: {
    title: string;
    smallBadge: string;
    highlightText: string;
    description: string;
    bgImage?: string;
    bgOverlay?: string;
    bgOpacity?: number;
    bgGradient?: string;
    status?: string;
    order?: number;
  };
  successStats?: ISuccessStat[];
  videoTestimonials?: IVideoTestimonial[];
  writtenTestimonials?: IWrittenTestimonial[];
  categories?: ICategoryItem[];
  featuredQuote?: {
    quote: string;
    author: string;
    subtitle?: string;
    background?: string;
    accentColor?: string;
    showSection?: boolean;
    order?: number;
  };
  whatWeDo?: IWhatWeDoItem[];
  seo?: ISeo;
  sectionSettings?: Record<string, any>;
}

const SuccessStatSchema = new Schema<ISuccessStat>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  suffix: { type: String, default: "" },
  icon: { type: String, default: "" },
  color: { type: String, default: "" },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const VideoTestimonialSchema = new Schema<IVideoTestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  thumbnail: { type: String, default: "" },
  video: { type: String, default: "" },
  duration: { type: String, default: "" },
  description: { type: String, default: "" },
  rating: { type: Number, default: 5 },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const WrittenTestimonialSchema = new Schema<IWrittenTestimonial>({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  company: { type: String, required: true },
  photo: { type: String, default: "" },
  review: { type: String, required: true },
  rating: { type: Number, default: 5 },
  logo: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  status: { type: String, default: "Active" },
  order: { type: Number, default: 1 },
});

const CategoryItemSchema = new Schema<ICategoryItem>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "" },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const WhatWeDoItemSchema = new Schema<IWhatWeDoItem>({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  description: { type: String, default: "" },
  icon: { type: String, default: "" },
  image: { type: String, default: "" },
  buttonText: { type: String, default: "" },
  buttonLink: { type: String, default: "" },
  order: { type: Number, default: 1 },
  status: { type: String, default: "Active" },
});

const TestimonialsPageSchema = new Schema<ITestimonialsPage>(
  {
    hero: {
      title: { type: String, default: "Student Placements & Academics Success" },
      smallBadge: { type: String, default: "COMMUNITY ACCLAIM" },
      highlightText: { type: String, default: "Academics Success" },
      description: { type: String, default: "Discover reviews from Aman's mentored students." },
      bgImage: { type: String, default: "" },
      bgOverlay: { type: String, default: "rgba(0, 0, 0, 0.7)" },
      bgOpacity: { type: Number, default: 70 },
      bgGradient: { type: String, default: "linear-gradient(to bottom, transparent, #060606)" },
      status: { type: String, default: "Active" },
      order: { type: Number, default: 1 },
    },
    successStats: [SuccessStatSchema],
    videoTestimonials: [VideoTestimonialSchema],
    writtenTestimonials: [WrittenTestimonialSchema],
    categories: [CategoryItemSchema],
    featuredQuote: {
      quote: { type: String, default: "" },
      author: { type: String, default: "" },
      subtitle: { type: String, default: "" },
      background: { type: String, default: "" },
      accentColor: { type: String, default: "" },
      showSection: { type: Boolean, default: true },
      order: { type: Number, default: 6 },
    },
    whatWeDo: [WhatWeDoItemSchema],
    seo: { type: SeoSchema },
    sectionSettings: { type: Schema.Types.Mixed, default: {} },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const TestimonialsPage = model<ITestimonialsPage>("TestimonialsPage", TestimonialsPageSchema);
