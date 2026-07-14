import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse";

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

// Import repositories for the aggregate endpoint
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
