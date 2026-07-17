import { Router } from "express";
import { ApiResponse } from "../utils/apiResponse";
import { authenticate } from "../middlewares/auth";
import { parseDocument } from "../middlewares/upload.middleware";
import CloudinaryService from "../services/cloudinary.service";

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
import testimonialsPageRoutes from "./testimonialsPage.routes";
import legalRoutes from "./legal.routes";

// Import models and repositories
import { CMSData } from "../models/CMSData";
import { Service } from "../models/Service";
import { Career } from "../models/Career";
import { Blog } from "../models/Blog";
import { Faq } from "../models/FAQ";
import { Event } from "../models/Event";
import { Portfolio } from "../models/Portfolio";
import { MediaGallery } from "../models/MediaGallery";
import { MissionVision } from "../models/MissionVision";
import { Contact } from "../models/Contact";
import { WebsiteSettings } from "../models/WebsiteSettings";
import { ServicesPage } from "../models/ServicesPage";
import { TestimonialsPage } from "../models/TestimonialsPage";
import { TermsPolicy } from "../models/TermsPolicy";
import { PrivacyPolicy } from "../models/PrivacyPolicy";
import { CookiePolicy } from "../models/CookiePolicy";
import { LegalSettings } from "../models/LegalSettings";

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
  servicesPageRepository,
  missionVisionRepository,
  testimonialsPageRepository,
  termsPolicyRepository,
  privacyPolicyRepository,
  cookiePolicyRepository,
  legalSettingsRepository,
} from "../repositories";

const router = Router();

// Public endpoint for submitting a resume/career application
router.post("/public/resume", parseDocument, async (req: any, res: any, next: any) => {
  try {
    const { name, email, phone, jobTitle, experience, message, coverLetter } = req.body;
    let resumeUrl = "";
    let publicId = "";
    
    if (req.file) {
      // Upload to cloudinary as auto
      const result = await CloudinaryService.uploadBuffer(req.file.buffer, "techmaster/resumes", "auto");
      resumeUrl = result.secure_url;
      publicId = result.public_id;
    }

    // Append to CMSData 'resumes' array
    const doc = await CMSData.findOne({ key: "resumes" });
    let resumes = [];
    if (doc && Array.isArray(doc.value)) {
      resumes = doc.value;
    } else if (doc && typeof doc.value === 'object') {
      resumes = [];
    }

    const newResume = {
      id: `resume-${Date.now()}`,
      candidateName: name,
      email,
      phone,
      jobApplied: jobTitle,
      portfolioUrl: experience,
      message,
      coverLetter,
      resumeFileUrl: resumeUrl,
      resumeFileName: req.file?.originalname || 'resume.pdf',
      publicId: publicId,
      status: "New",
      createdAt: new Date().toISOString()
    };

    resumes.unshift(newResume); // Add to top

    await CMSData.findOneAndUpdate(
      { key: "resumes" },
      { value: resumes },
      { upsert: true, new: true }
    );

    ApiResponse.success(res, "Resume submitted successfully", newResume);
  } catch (error) {
    next(error);
  }
});

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
      servicesPage,
      missionVision,
      testimonialsPage,
      termsPolicy,
      privacyPolicy,
      cookiePolicy,
      legalSettings,
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
      servicesPageRepository.find(),
      missionVisionRepository.find(),
      testimonialsPageRepository.find(),
      termsPolicyRepository.find(),
      privacyPolicyRepository.find(),
      cookiePolicyRepository.find(),
      legalSettingsRepository.find(),
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
      servicesPage: servicesPage[0] || null,
      missionVision: missionVision[0] || null,
      testimonialsPage: testimonialsPage[0] || null,
      termsPolicy: termsPolicy[0] || null,
      privacyPolicy: privacyPolicy[0] || null,
      cookiePolicy: cookiePolicy[0] || null,
      legalSettings: legalSettings[0] || null,
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
      missionVision: MissionVision,
      contact: Contact,
      websiteSettings: WebsiteSettings,
      servicesPage: ServicesPage,
      testimonialsPage: TestimonialsPage,
      termsPolicy: TermsPolicy,
      privacyPolicy: PrivacyPolicy,
      cookiePolicy: CookiePolicy,
      legalSettings: LegalSettings,
    };

    if (ModelMap[key]) {
      const Model = ModelMap[key];
      await Model.deleteMany({});
      
      if (Array.isArray(value)) {
        const payloadArray = value;
        const recordsToInsert = payloadArray.map((item: any) => {
          const cleanItem = { ...item };
          if (cleanItem.id && /^[0-9a-fA-F]{24}$/.test(cleanItem.id)) {
            cleanItem._id = cleanItem.id;
          }
          return cleanItem;
        });
        await Model.insertMany(recordsToInsert);
      } else if (value && typeof value === 'object') {
        const cleanItem = { ...value };
        if (cleanItem.id && /^[0-9a-fA-F]{24}$/.test(cleanItem.id)) {
          cleanItem._id = cleanItem.id;
        }
        await Model.create(cleanItem);
      }
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
router.use("/testimonials-page", testimonialsPageRoutes);
router.use("/legal", legalRoutes);

export default router;
