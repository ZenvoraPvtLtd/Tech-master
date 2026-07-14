import express from "express";
// import authMiddleware from "../../middleware/auth.middleware.js";

import {
  // Main
  getService,
  createService,
  updateEntireService,
  deleteService,

  // Single sections
  updateHero,
  updateCTA,
  updateSEO,

  // Categories
  addCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  reorderCategories,

  // Cards
  addCard,
  updateCard,
  deleteCard,
  toggleCardStatus,
  toggleCardFeatured,
  reorderCards,

  // Features
  addFeature,
  updateFeature,
  deleteFeature,
  toggleFeatureStatus,
  reorderFeatures,

  // Process
  addProcess,
  updateProcess,
  deleteProcess,
  toggleProcessStatus,
  reorderProcess,

  // Technologies
  addTechnology,
  updateTechnology,
  deleteTechnology,
  toggleTechnologyStatus,
  reorderTechnologies,

  // Why Choose Us
  addWhyChooseUs,
  updateWhyChooseUs,
  deleteWhyChooseUs,
  toggleWhyChooseUsStatus,
  reorderWhyChooseUs,

  // Statistics
  addStatistic,
  updateStatistic,
  deleteStatistic,
  toggleStatisticStatus,
  reorderStatistics,

  // Pricing Plans
  addPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
  togglePricingPlanStatus,
  reorderPricingPlans,

  // FAQs
  addFaq,
  updateFaq,
  deleteFaq,
  toggleFaqStatus,
  reorderFaqs,

  // Settings & Status
  updateSectionSettings,
  saveDraft,
  publishService,
  unpublishService,

} from "./service.controller.js";

import {
  heroValidation,
  categoryValidation,
  cardValidation,
  featureValidation,
  processValidation,
  technologyValidation,
  whyChooseUsValidation,
  statisticValidation,
  pricingPlanValidation,
  faqValidation,
  ctaValidation,
  seoValidation,
  sectionSettingValidation,
} from "./service.validation.js";

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};

const router = express.Router();

/* =====================================================
   MAIN
===================================================== */
router.get("/", getService);
router.post('/', createService);
router.put('/', updateEntireService);
router.delete("/", deleteService);

/* =====================================================
   HERO
===================================================== */
router.get("/hero", getService);
router.put("/hero", validate(heroValidation), updateHero);

/* =====================================================
   CATEGORIES
===================================================== */
router.get("/categories", getService);
router.post("/categories", validate(categoryValidation), addCategory);
router.put("/categories/:id", validate(categoryValidation), updateCategory);
router.delete("/categories/:id", deleteCategory);
router.patch("/categories/:id/status", toggleCategoryStatus);
router.patch("/categories/reorder", reorderCategories);

/* =====================================================
   CARDS
===================================================== */
router.get("/cards", getService);
router.post("/cards", validate(cardValidation), addCard);
router.put("/cards/:id", validate(cardValidation), updateCard);
router.delete("/cards/:id", deleteCard);
router.patch("/cards/:id/status", toggleCardStatus);
router.patch("/cards/:id/featured", toggleCardFeatured);
router.patch("/cards/reorder", reorderCards);

/* =====================================================
   FEATURES
===================================================== */
router.get("/features", getService);
router.post("/features", validate(featureValidation), addFeature);
router.put("/features/:id", validate(featureValidation), updateFeature);
router.delete("/features/:id", deleteFeature);
router.patch("/features/:id/status", toggleFeatureStatus);
router.patch("/features/reorder", reorderFeatures);

/* =====================================================
   PROCESS
===================================================== */
router.get("/process", getService);
router.post("/process", validate(processValidation), addProcess);
router.put("/process/:id", validate(processValidation), updateProcess);
router.delete("/process/:id", deleteProcess);
router.patch("/process/:id/status", toggleProcessStatus);
router.patch("/process/reorder", reorderProcess);

/* =====================================================
   TECHNOLOGIES
===================================================== */
router.get("/technologies", getService);
router.post("/technologies", validate(technologyValidation), addTechnology);
router.put("/technologies/:id", validate(technologyValidation), updateTechnology);
router.delete("/technologies/:id", deleteTechnology);
router.patch("/technologies/:id/status", toggleTechnologyStatus);
router.patch("/technologies/reorder", reorderTechnologies);

/* =====================================================
   WHY CHOOSE US
===================================================== */
router.get("/why-choose-us", getService);
router.post("/why-choose-us", validate(whyChooseUsValidation), addWhyChooseUs);
router.put("/why-choose-us/:id", validate(whyChooseUsValidation), updateWhyChooseUs);
router.delete("/why-choose-us/:id", deleteWhyChooseUs);
router.patch("/why-choose-us/:id/status", toggleWhyChooseUsStatus);
router.patch("/why-choose-us/reorder", reorderWhyChooseUs);

/* =====================================================
   STATISTICS
===================================================== */
router.get("/statistics", getService);
router.post("/statistics", validate(statisticValidation), addStatistic);
router.put("/statistics/:id", validate(statisticValidation), updateStatistic);
router.delete("/statistics/:id", deleteStatistic);
router.patch("/statistics/:id/status", toggleStatisticStatus);
router.patch("/statistics/reorder", reorderStatistics);

/* =====================================================
   PRICING PLANS
===================================================== */
router.get("/pricing", getService);
router.post("/pricing", validate(pricingPlanValidation), addPricingPlan);
router.put("/pricing/:id", validate(pricingPlanValidation), updatePricingPlan);
router.delete("/pricing/:id", deletePricingPlan);
router.patch("/pricing/:id/status", togglePricingPlanStatus);
router.patch("/pricing/reorder", reorderPricingPlans);

/* =====================================================
   FAQS
===================================================== */
router.get("/faqs", getService);
router.post("/faqs", validate(faqValidation), addFaq);
router.put("/faqs/:id", validate(faqValidation), updateFaq);
router.delete("/faqs/:id", deleteFaq);
router.patch("/faqs/:id/status", toggleFaqStatus);
router.patch("/faqs/reorder", reorderFaqs);

/* =====================================================
   CTA
===================================================== */
router.get("/cta", getService);
router.put("/cta", validate(ctaValidation), updateCTA);

/* =====================================================
   SEO
===================================================== */
router.get("/seo", getService);
router.put("/seo", validate(seoValidation), updateSEO);

/* =====================================================
   SECTION SETTINGS
===================================================== */
router.patch("/section-settings/:section", validate(sectionSettingValidation), updateSectionSettings);

/* =====================================================
   DRAFT / PUBLISH
===================================================== */
router.patch("/draft", saveDraft);
router.patch("/publish", publishService);
router.patch("/unpublish", unpublishService);

export default router;
