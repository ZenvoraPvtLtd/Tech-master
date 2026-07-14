import express from "express";

import aboutController from "./about.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";
import upload, { uploadMedia } from "../../middleware/upload.middleware.js";

const router = express.Router();


/*
|--------------------------------------------------------------------------
| ABOUT CMS ROUTES
|--------------------------------------------------------------------------
*/


/**
 * Get About Data
 */
router.get(
  "/",
  authMiddleware,
  aboutController.getAbout
);



router.put(
  "/update-section/:sectionKey",
  authMiddleware,
  aboutController.updateSectionData
);

/**
 * INTRODUCTION
 */

// Update Introduction + Profile Image
router.put(
  "/introduction",
  authMiddleware,
  upload.single("profileImage"),
  aboutController.updateIntroduction
);



/**
 * STORY
 */

// Update Story Content
router.put(
  "/story",
  authMiddleware,
  upload.none(),
  aboutController.updateStory
);


// Upload Story Image
router.post(
  "/story/image",
  authMiddleware,
  upload.single("image"),
  aboutController.uploadStoryImage
);


// Delete Story Image
router.delete(
  "/story/image/:imageId",
  authMiddleware,
  aboutController.deleteStoryImage
);


// Upload Story Video
router.post(
  "/story/video",
  authMiddleware,
  uploadMedia.single("video"),
  aboutController.uploadStoryVideo
);


// Delete Story Video
router.delete(
  "/story/video",
  authMiddleware,
  aboutController.deleteStoryVideo
);



/**
 * VISION
 */

// Update Vision Content
router.put(
  "/vision",
  authMiddleware,
  aboutController.updateVision
);


// Upload Vision Image
router.post(
  "/vision/image",
  authMiddleware,
  upload.single("image"),
  aboutController.uploadVisionImage
);


// Delete Vision Image
router.delete(
  "/vision/image",
  authMiddleware,
  aboutController.deleteVisionImage
);



/**
 * HIGHLIGHTS
 */

router.put(
  "/highlights",
  authMiddleware,
  aboutController.updateHighlights
);


router.put(
  "/highlights/reorder",
  authMiddleware,
  aboutController.reorderHighlights
);



/**
 * ACHIEVEMENTS
 */

router.post(
  "/achievements",
  authMiddleware,
  upload.single("image"),
  aboutController.addAchievement
);


router.put(
  "/achievements/:id",
  authMiddleware,
  upload.single("image"),
  aboutController.updateAchievement
);


router.delete(
  "/achievements/:id",
  authMiddleware,
  aboutController.deleteAchievement
);

/**
 * AWARDS
 */

router.post(
  "/awards",
  authMiddleware,
  upload.single("certificate"),
  aboutController.addAward
);


router.put(
  "/awards/:id",
  authMiddleware,
  upload.single("certificate"),
  aboutController.updateAward
);


router.delete(
  "/awards/:id",
  authMiddleware,
  aboutController.deleteAward
);



/**
 * EXPERIENCE
 */

router.post(
  "/experience",
  authMiddleware,
  upload.single("companyLogo"),
  aboutController.addExperience
);


router.put(
  "/experience/:id",
  authMiddleware,
  upload.single("companyLogo"),
  aboutController.updateExperience
);


router.delete(
  "/experience/:id",
  authMiddleware,
  aboutController.deleteExperience
);



/**
 * SEO
 */

router.put(
  "/seo",
  authMiddleware,
  aboutController.updateSeo
);



/**
 * SECTION MANAGEMENT
 */

// Enable / Disable Section
router.patch(
  "/section/:section",
  authMiddleware,
  aboutController.updateSectionStatus
);


// Reorder Sections
router.put(
  "/section/reorder",
  authMiddleware,
  aboutController.reorderSections
);



/**
 * PUBLISH
 */

router.patch(
  "/publish",
  authMiddleware,
  aboutController.updatePublishStatus
);



/**
 * DELETE COMPLETE ABOUT CMS
 */

router.delete(
  "/",
  authMiddleware,
  aboutController.deleteAbout
);



export default router;