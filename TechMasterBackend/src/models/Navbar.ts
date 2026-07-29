import { Schema, model, Document } from "mongoose";
import { MediaSchema, CmsBaseFields, ICmsBase, IMedia } from "./shared";

export interface IMenuItem {
  id: string;
  name: string;
  slug: string;
  pageUrl: string;
  target: "_self" | "_blank";
  visibility: boolean;
  displayOrder: number;
  icon?: string;
  isHighlight?: boolean;
  isActive?: boolean;
  status: "Published" | "Draft";
}

export interface ISocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  visibility: boolean;
  order: number;
}

export interface INavbar extends Document, ICmsBase {
  logo: {
    primaryLogo?: IMedia;
    mobileLogo?: IMedia;
    stickyLogo?: IMedia;
    transparentLogo?: IMedia;
    retinaLogo?: IMedia;
    altText?: string;
  };
  menus: {
    desktopLinks: IMenuItem[];
    identityItems: IMenuItem[];
    engagementItems: IMenuItem[];
    quickLinksItems: IMenuItem[];
  };
  viewsCounter: {
    enabled: boolean;
    label: string;
    counterValue: number;
    prefix: string;
    suffix: string;
    formatting: "comma" | "raw" | "abbreviated";
    animation: boolean;
    visibility: boolean;
    displayPosition: string;
  };
  letsTalkButton: {
    enabled: boolean;
    buttonText: string;
    buttonUrl: string;
    buttonIcon: string;
    target: "_self" | "_blank";
    visibility: boolean;
    styleVariant: string;
  };
  headerSettings: {
    stickyHeader: boolean;
    transparentHeader: boolean;
    blurEffect: boolean;
    glassEffect: boolean;
    shadow: boolean;
    desktopHeight: number;
    tabletHeight: number;
    mobileHeight: number;
  };
  colors: {
    textColor: string;
    hoverColor: string;
    activeColor: string;
    borderColor: string;
    glowColor: string;
    buttonColor: string;
  };
  scrollSettings: {
    stickyOnScroll: boolean;
    hideOnScroll: boolean;
    showOnScrollUp: boolean;
    scrollThreshold: number;
  };
  responsiveSettings: {
    desktopVisibility: boolean;
    tabletVisibility: boolean;
    mobileVisibility: boolean;
    menuBreakpoint: string;
    mobileDrawerWidth: string;
  };
  mobileMenu: {
    showLogo: boolean;
    showSocials: boolean;
    showContactBtn: boolean;
    overlayBlur: boolean;
  };
  socialLinks: ISocialMediaLink[];
  seo: {
    structuredData?: string;
    logoSchema?: string;
    navigationSchema?: string;
  };
}

const MenuItemSchema = new Schema<IMenuItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, default: "" },
  pageUrl: { type: String, required: true },
  target: { type: String, enum: ["_self", "_blank"], default: "_self" },
  visibility: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
  icon: { type: String, default: "" },
  isHighlight: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  status: { type: String, enum: ["Published", "Draft"], default: "Published" },
});

const SocialMediaLinkSchema = new Schema<ISocialMediaLink>({
  id: { type: String, required: true },
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: "" },
  visibility: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

const NavbarSchema = new Schema<INavbar>(
  {
    logo: {
      primaryLogo: { type: MediaSchema },
      mobileLogo: { type: MediaSchema },
      stickyLogo: { type: MediaSchema },
      transparentLogo: { type: MediaSchema },
      retinaLogo: { type: MediaSchema },
      altText: { type: String, default: "Tech Master Logo" },
    },
    menus: {
      desktopLinks: { type: [MenuItemSchema], default: [] },
      identityItems: { type: [MenuItemSchema], default: [] },
      engagementItems: { type: [MenuItemSchema], default: [] },
      quickLinksItems: { type: [MenuItemSchema], default: [] },
    },
    viewsCounter: {
      enabled: { type: Boolean, default: true },
      label: { type: String, default: "VIEWS" },
      counterValue: { type: Number, default: 25000000000 },
      prefix: { type: String, default: "" },
      suffix: { type: String, default: "+" },
      formatting: { type: String, enum: ["comma", "raw", "abbreviated"], default: "comma" },
      animation: { type: Boolean, default: true },
      visibility: { type: Boolean, default: true },
      displayPosition: { type: String, default: "right" },
    },
    letsTalkButton: {
      enabled: { type: Boolean, default: true },
      buttonText: { type: String, default: "Let's Talk" },
      buttonUrl: { type: String, default: "contact" },
      buttonIcon: { type: String, default: "ArrowUpRight" },
      target: { type: String, enum: ["_self", "_blank"], default: "_self" },
      visibility: { type: Boolean, default: true },
      styleVariant: { type: String, default: "gold-sweep" },
    },
    headerSettings: {
      stickyHeader: { type: Boolean, default: true },
      transparentHeader: { type: Boolean, default: true },
      blurEffect: { type: Boolean, default: true },
      glassEffect: { type: Boolean, default: true },
      shadow: { type: Boolean, default: true },
      desktopHeight: { type: Number, default: 80 },
      tabletHeight: { type: Number, default: 70 },
      mobileHeight: { type: Number, default: 60 },
    },
    colors: {
      textColor: { type: String, default: "#9CA3AF" },
      hoverColor: { type: String, default: "#D4AF37" },
      activeColor: { type: String, default: "#D4AF37" },
      borderColor: { type: String, default: "rgba(212, 175, 55, 0.3)" },
      glowColor: { type: String, default: "rgba(212, 175, 55, 0.6)" },
      buttonColor: { type: String, default: "#D4AF37" },
    },
    scrollSettings: {
      stickyOnScroll: { type: Boolean, default: true },
      hideOnScroll: { type: Boolean, default: false },
      showOnScrollUp: { type: Boolean, default: true },
      scrollThreshold: { type: Number, default: 50 },
    },
    responsiveSettings: {
      desktopVisibility: { type: Boolean, default: true },
      tabletVisibility: { type: Boolean, default: true },
      mobileVisibility: { type: Boolean, default: true },
      menuBreakpoint: { type: String, default: "lg" },
      mobileDrawerWidth: { type: String, default: "100%" },
    },
    mobileMenu: {
      showLogo: { type: Boolean, default: true },
      showSocials: { type: Boolean, default: true },
      showContactBtn: { type: Boolean, default: true },
      overlayBlur: { type: Boolean, default: true },
    },
    socialLinks: { type: [SocialMediaLinkSchema], default: [] },
    seo: {
      structuredData: { type: String, default: "" },
      logoSchema: { type: String, default: "" },
      navigationSchema: { type: String, default: "" },
    },
    ...CmsBaseFields,
  },
  {
    timestamps: true,
  }
);

export const Navbar = model<INavbar>("Navbar", NavbarSchema);
