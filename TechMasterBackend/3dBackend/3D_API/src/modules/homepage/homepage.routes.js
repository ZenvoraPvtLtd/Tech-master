import express from "express";
import homepageController from "./homepage.controller.js";
import {
  validateUpdateSettings,
  validateReorderSections,
  validateAddSection,
  validateCreateVideoSlider,
  validateUpdateVideoSlider,
  validateReorderVideoSlider,
  validateCreateReel,
  validateUpdateReel,
  validateReorderReels,
  validateCreateShort,
  validateUpdateShort,
  validateReorderShorts,
  validateCreateLongVideo,
  validateUpdateLongVideo,
  validateReorderLongVideos,
  validateCreateHeroSlider,
  validateUpdateHeroSlider,
  validateReorderHeroSliders,
} from "./homepage.validation.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import upload, { uploadMedia } from "../../middleware/upload.middleware.js";

const router = express.Router();

/**
 * Public Routes
 */
router.get("/public", homepageController.getPublic);

/**
 * Protected Admin Routes
 */
router.use(authMiddleware);

// Settings
router.get("/settings", homepageController.getSettings);
router.put(
  "/settings",
  validateUpdateSettings,
  homepageController.updateSettings
);

// Publish
router.post("/publish", homepageController.publishLive);

// Preview
router.get("/preview", homepageController.getPreview);

// Reset
router.post("/reset", homepageController.resetHomepage);

// Activity Logs
router.get("/logs", homepageController.getLogs);

// Sections
router.post(
  "/sections",
  validateAddSection,
  homepageController.addSection
);
router.delete("/sections/:type", homepageController.deleteSection);

router.patch(
  "/sections/reorder",
  validateReorderSections,
  homepageController.reorderSections
);
router.patch(
  "/sections/:type/toggle",
  homepageController.toggleSectionStatus
);


// ─────────────────────────────────────────────
//  VIDEO SLIDER ROUTES
// ─────────────────────────────────────────────

// GET all video sliders
router.get("/video-slider", homepageController.getVideoSliders);

// GET single video slider
router.get("/video-slider/:id", homepageController.getVideoSliderById);

// POST standalone upload (upload media files to an existing slider item)
// Define before /:id routes so "upload" is not treated as an :id param
router.post(
  "/video-slider/upload",
  (req,res,next)=>{
    console.log("video slider route hit");
    next();
  },
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  homepageController.uploadVideoSliderMedia
);

// PATCH reorder — define before /:id routes so "reorder" is not treated as :id
router.patch(
  "/video-slider/reorder",
  validateReorderVideoSlider,
  homepageController.reorderVideoSlider
);

// POST create (with optional video + thumbnail file fields)
router.post(
  "/video-slider",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateCreateVideoSlider,
  homepageController.addVideoSlider
);

// PUT update (with optional replacement video + thumbnail)
router.put(
  "/video-slider/:id",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateUpdateVideoSlider,
  homepageController.updateVideoSlider
);

// DELETE
router.delete("/video-slider/:id", homepageController.deleteVideoSlider);

// PATCH toggle
router.patch(
  "/video-slider/:id/toggle",
  homepageController.toggleVideoSlider
);

// ─────────────────────────────────────────────
//  REELS ROUTES
// ─────────────────────────────────────────────

// GET all reels
router.get("/reels", homepageController.getReels);

// GET single reel
router.get("/reels/:id", homepageController.getReelById);

// POST standalone upload (upload media files to an existing reel)
// Define before /:id routes so "upload" is not treated as an :id param
router.post(
  "/reels/upload",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  homepageController.uploadReelMedia
);

// PATCH reorder — define before /:id routes so "reorder" is not treated as :id
router.patch(
  "/reels/reorder",
  validateReorderReels,
  homepageController.reorderReels
);

// POST create (with optional video + thumbnail file fields)
router.post(
  "/reels",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateCreateReel,
  homepageController.addReel
);

// PUT update (with optional replacement video + thumbnail)
router.put(
  "/reels/:id",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateUpdateReel,
  homepageController.updateReel
);

// DELETE
router.delete("/reels/:id", homepageController.deleteReel);

// PATCH toggle
router.patch(
  "/reels/:id/toggle",
  homepageController.toggleReel
);

// ─────────────────────────────────────────────
//  SHORTS ROUTES
// ─────────────────────────────────────────────

// GET all shorts
router.get("/shorts", homepageController.getShorts);

// GET single short
router.get("/shorts/:id", homepageController.getShortById);

// POST standalone upload (upload media files to an existing short)
// Define before /:id routes so "upload" is not treated as an :id param
router.post(
  "/shorts/upload",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  homepageController.uploadShortMedia
);

// PATCH reorder — define before /:id routes so "reorder" is not treated as :id
router.patch(
  "/shorts/reorder",
  validateReorderShorts,
  homepageController.reorderShorts
);

// POST create (with optional video + thumbnail file fields)
router.post(
  "/shorts",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateCreateShort,
  homepageController.addShort
);

// PUT update (with optional replacement video + thumbnail)
router.put(
  "/shorts/:id",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  validateUpdateShort,
  homepageController.updateShort
);

// DELETE
router.delete("/shorts/:id", homepageController.deleteShort);

// PATCH toggle
router.patch(
  "/shorts/:id/toggle",
  homepageController.toggleShort
);

// ─────────────────────────────────────────────
//  LONG VIDEOS ROUTES
// ─────────────────────────────────────────────

// GET all long videos
router.get("/long-videos", homepageController.getLongVideos);

// GET single long video — define before upload/reorder to avoid conflicts
router.get("/long-videos/:id", homepageController.getLongVideoById);

// POST standalone upload (video and/or thumbnail for an existing long video)
// Define before /:id routes so "upload" is not treated as an :id param
router.post(
  "/long-videos/upload",
  uploadMedia.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  homepageController.uploadLongVideoMedia
);

// PATCH reorder — define before /:id routes so "reorder" is not treated as :id
router.patch(
  "/long-videos/reorder",
  validateReorderLongVideos,
  homepageController.reorderLongVideos
);

// POST create (with optional video + thumbnail file fields)
router.post(
  "/long-videos",
  uploadMedia.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  validateCreateLongVideo,
  homepageController.addLongVideo
);

// PUT update (with optional replacement video + thumbnail)
router.put(
  "/long-videos/:id",
  uploadMedia.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  validateUpdateLongVideo,
  homepageController.updateLongVideo
);

// DELETE
router.delete("/long-videos/:id", homepageController.deleteLongVideo);

// PATCH toggle
router.patch(
  "/long-videos/:id/toggle",
  homepageController.toggleLongVideo
);

// ─────────────────────────────────────────────
//  HERO SLIDER ROUTES
// ─────────────────────────────────────────────

// GET all hero sliders
router.get("/hero-slider", homepageController.getHeroSliders);

// GET single hero slider
router.get("/hero-slider/:id", homepageController.getHeroSliderById);

// POST standalone upload (upload media files to an existing hero slider item)
// Define before /:id routes so "upload" is not treated as an :id param
router.post(
  "/hero-slider/upload",
  uploadMedia.fields([
    { name: "media", maxCount: 1 },
    { name: "mobileMedia", maxCount: 1 },
  ]),
  homepageController.uploadHeroSliderMedia
);

// PATCH reorder — define before /:id routes so "reorder" is not treated as :id
router.patch(
  "/hero-slider/reorder",
  validateReorderHeroSliders,
  homepageController.reorderHeroSliders
);

// POST create (with optional media + mobileMedia file fields)
router.post(
  "/hero-slider",
  uploadMedia.fields([
    { name: "media", maxCount: 1 },
    { name: "mobileMedia", maxCount: 1 },
  ]),
  validateCreateHeroSlider,
  homepageController.addHeroSlider
);

// PUT update (with optional replacement media + mobileMedia)
router.put(
  "/hero-slider/:id",
  uploadMedia.fields([
    { name: "media", maxCount: 1 },
    { name: "mobileMedia", maxCount: 1 },
  ]),
  validateUpdateHeroSlider,
  homepageController.updateHeroSlider
);

// DELETE
router.delete("/hero-slider/:id", homepageController.deleteHeroSlider);

// PATCH toggle
router.patch(
  "/hero-slider/:id/toggle",
  homepageController.toggleHeroSlider
);

export default router;
