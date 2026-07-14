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

// Import models and repositories
import { CMSData } from "../models/CMSData";
import { Service } from "../models/Service";
import { Career } from "../models/Career";
import { Blog } from "../models/Blog";
import { Faq } from "../models/FAQ";
import { Event } from "../models/Event";
import { Portfolio } from "../models/Portfolio";
import { MediaGallery } from "../models/MediaGallery";

import {
  serviceRepository,
  blogRepository,
  careerRepository,
  faqRepository,
  eventRepository,
  portfolioRepository,
  mediaGalleryRepository,
  collaborationRepository,
  campaignRepository,
  productLaunchRepository,
  contactRepository,
  websiteSettingsRepository,
} from "../repositories";

const router = Router();

// Aggregate endpoint for the public frontends
router.get("/", async (req, res, next) => {
  try {
    // 1. Fetch all CMSData generic key-value documents
    const cmsDocs = await CMSData.find({});
    const cmsDataMap: Record<string, any> = {};
    for (const doc of cmsDocs) {
      cmsDataMap[doc.key] = doc.value;
    }

    // 2. Fetch all collections in parallel for fallback
    const [
      services,
      blogs,
      careers,
      faqs,
      events,
      portfolio,
      mediaGallery,
      collaborations,
      campaigns,
      productLaunches,
      contact,
      websiteSettings,
    ] = await Promise.all([
      serviceRepository.find(),
      blogRepository.find(),
      careerRepository.find(),
      faqRepository.find(),
      eventRepository.find(),
      portfolioRepository.find(),
      mediaGalleryRepository.find(),
      collaborationRepository.find(),
      campaignRepository.find(),
      productLaunchRepository.find(),
      contactRepository.find(),
      websiteSettingsRepository.find(),
    ]);

    // 3. Construct aggregated CMS state
    const data = {
      services,
      blogs,
      careers,
      faqs,
      events,
      portfolio,
      mediaGallery,
      collaborations,
      campaigns,
      productLaunches,
      contact: contact[0] || null,
      websiteSettings: websiteSettings[0] || null,
      ...cmsDataMap, // Dynamically override and inject any updated flat keys
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

    if (!key) {
      ApiResponse.error(res, "Missing key parameter", 400);
      return;
    }

    // 1. Update CMSData key-value collection
    const doc = await CMSData.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );

    // 2. Sync to structured model if it's a known collection
    const ModelMap: Record<string, any> = {
      services: Service,
      careers: Career,
      blogs: Blog,
      faqs: Faq,
      events: Event,
      portfolio: Portfolio,
      mediaGallery: MediaGallery,
    };

    if (ModelMap[key]) {
      const Model = ModelMap[key];
      await Model.deleteMany({});
      
      const payloadArray = Array.isArray(value) ? value : [];
      const recordsToInsert = payloadArray.map((item: any) => {
        const cleanItem = { ...item };
        if (cleanItem.id && /^[0-9a-fA-F]{24}$/.test(cleanItem.id)) {
          cleanItem._id = cleanItem.id;
        }
        return cleanItem;
      });

      await Model.insertMany(recordsToInsert);
    }

    ApiResponse.success(res, `${key} synchronized successfully`, doc);
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
