import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { authenticate } from "../middlewares/auth";

import homepageRoutes from "./homepage.routes";
import aboutRoutes from "./about.routes";
import founderJourneyRoutes from "./founderJourney.routes";
import missionVisionRoutes from "./missionVision.routes";
import whatWeDoRoutes from "./whatWeDo.routes";
import serviceRoutes from "./service.routes";
import collaborationRoutes from "./collaboration.routes";
import campaignRoutes from "./campaign.routes";
import productLaunchRoutes from "./productLaunch.routes";
import eventRoutes from "./event.routes";
import portfolioRoutes from "./portfolio.routes";
import mediaGalleryRoutes from "./mediaGallery.routes";
import careerRoutes from "./career.routes";
import blogRoutes from "./blog.routes";
import faqRoutes from "./faq.routes";
import contactRoutes from "./contact.routes";
import websiteSettingsRoutes from "./websiteSettings.routes";

// Import models and repositories for the update and aggregate endpoints
import { Homepage } from "../models/Homepage";
import { About } from "../models/About";
import { FounderJourney } from "../models/FounderJourney";
import { MissionVision } from "../models/MissionVision";
import { WhatWeDo } from "../models/WhatWeDo";
import { Service } from "../models/Service";
import { Collaboration } from "../models/Collaboration";
import { Campaign } from "../models/Campaign";
import { ProductLaunch } from "../models/ProductLaunch";
import { Event } from "../models/Event";
import { Portfolio } from "../models/Portfolio";
import { MediaGallery } from "../models/MediaGallery";
import { Career } from "../models/Career";
import { Blog } from "../models/Blog";
import { Faq } from "../models/FAQ";
import { Contact } from "../models/Contact";
import { WebsiteSettings } from "../models/WebsiteSettings";
import { User } from "../models/User";

import {
  homepageRepository,
  aboutRepository,
  founderJourneyRepository,
  missionVisionRepository,
  whatWeDoRepository,
  serviceRepository,
  collaborationRepository,
  campaignRepository,
  productLaunchRepository,
  eventRepository,
  portfolioRepository,
  mediaGalleryRepository,
  careerRepository,
  blogRepository,
  faqRepository,
  contactRepository,
  websiteSettingsRepository,
} from "../repositories";

const router = Router();

// Aggregate endpoint for the public frontends
router.get("/", async (req, res, next) => {
  try {
    const [
      homepage,
      about,
      founderJourney,
      missionVision,
      whatWeDo,
      services,
      collaborations,
      campaigns,
      productLaunches,
      events,
      portfolio,
      mediaGallery,
      careers,
      blogs,
      faqs,
      contact,
      websiteSettings,
    ] = await Promise.all([
      homepageRepository.find(),
      aboutRepository.find(),
      founderJourneyRepository.find(),
      missionVisionRepository.find(),
      whatWeDoRepository.find(),
      serviceRepository.find(),
      collaborationRepository.find(),
      campaignRepository.find(),
      productLaunchRepository.find(),
      eventRepository.find(),
      portfolioRepository.find(),
      mediaGalleryRepository.find(),
      careerRepository.find(),
      blogRepository.find(),
      faqRepository.find(),
      contactRepository.find(),
      websiteSettingsRepository.find(),
    ]);

    // Singletons usually have only one active document
    const data = {
      homepage: homepage[0] || null,
      about: about[0] || null,
      founderJourney: founderJourney[0] || null,
      missionVision: missionVision[0] || null,
      whatWeDo: whatWeDo[0] || null,
      services,
      collaborations,
      campaigns,
      productLaunches,
      events,
      portfolio,
      mediaGallery,
      careers,
      blogs,
      faqs,
      contact: contact[0] || null,
      websiteSettings: websiteSettings[0] || null,
    };

    ApiResponse.success(res, "CMS aggregate data retrieved successfully", data);
  } catch (error) {
    next(error);
  }
});

// Section state update synchronizer endpoint for Admin Dashboard
router.post("/update", authenticate as any, async (req: any, res: any, next: any) => {
  try {
    const { key, value } = req.body;
    const userId = req.user?.id;

    if (!key) {
      ApiResponse.error(res, "Missing key parameter", 400);
      return;
    }

    const singletons: Record<string, any> = {
      homepage: Homepage,
      about: About,
      founderJourney: FounderJourney,
      missionVision: MissionVision,
      whatWeDo: WhatWeDo,
      contact: Contact,
      settings: WebsiteSettings,
    };

    const collections: Record<string, any> = {
      services: Service,
      collaborations: Collaboration,
      campaigns: Campaign,
      launches: ProductLaunch,
      events: Event,
      portfolio: Portfolio,
      mediaGallery: MediaGallery,
      careers: Career,
      blogs: Blog,
      faqs: Faq,
      users: User,
    };

    if (singletons[key]) {
      const Model = singletons[key];
      let doc = await Model.findOne({ isDeleted: false });
      if (!doc) {
        doc = new Model({ ...value, createdBy: userId, updatedBy: userId });
      } else {
        Object.assign(doc, { ...value, updatedBy: userId });
      }
      await doc.save();
      ApiResponse.success(res, `${key} updated successfully`, doc);
      return;
    }

    if (collections[key]) {
      const Model = collections[key];
      // Sync list by rewriting (standard mock-sync pattern)
      await Model.deleteMany({});
      
      const payloadArray = Array.isArray(value) ? value : [];
      const recordsToInsert = payloadArray.map((item: any) => {
        const cleanItem = { ...item };
        // Check if ID is a valid MongoDB ObjectId hex string. If not, mongoose will auto-assign _id
        if (cleanItem.id && /^[0-9a-fA-F]{24}$/.test(cleanItem.id)) {
          cleanItem._id = cleanItem.id;
        }
        cleanItem.createdBy = userId;
        cleanItem.updatedBy = userId;
        return cleanItem;
      });

      const insertedDocs = await Model.insertMany(recordsToInsert);
      ApiResponse.success(res, `${key} synchronized successfully`, insertedDocs);
      return;
    }

    ApiResponse.error(res, `Unknown section key: ${key}`, 400);
  } catch (error) {
    next(error);
  }
});

// Mount all CMS sub-routers
router.use("/homepage", homepageRoutes);
router.use("/about", aboutRoutes);
router.use("/founder-journey", founderJourneyRoutes);
router.use("/mission-vision", missionVisionRoutes);
router.use("/what-we-do", whatWeDoRoutes);
router.use("/services", serviceRoutes);
router.use("/collaborations", collaborationRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/product-launches", productLaunchRoutes);
router.use("/events", eventRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/media-gallery", mediaGalleryRoutes);
router.use("/careers", careerRoutes);
router.use("/blogs", blogRoutes);
router.use("/faqs", faqRoutes);
router.use("/contact", contactRoutes);
router.use("/website-settings", websiteSettingsRoutes);

export default router;
