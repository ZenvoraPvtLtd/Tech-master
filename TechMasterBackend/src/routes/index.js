import express from "express";
import adminRoutes from "../modules/admin/admin.routes.js";
import founderJourneyRoutes from "../modules/founderJourney/founderJourney.routes.js";
import activityLogRoutes from "../modules/activityLog/activityLog.routes.js";
import homepageRoutes from "../modules/homepage/homepage.routes.js";
import aboutRoutes from "../modules/about/about.routes.js";
import cmsRoutes from "../modules/cms/cms.routes.js";

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/founder-journey", founderJourneyRoutes);
router.use("/logs", activityLogRoutes);
router.use("/homepage", homepageRoutes);
router.use("/about", aboutRoutes);
router.use("/cms", cmsRoutes);

export default router;