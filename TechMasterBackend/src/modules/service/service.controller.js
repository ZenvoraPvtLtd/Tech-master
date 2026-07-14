import * as service from "./service.service.js";

const handleRequest = async (res, action, successMessage, errorMessage, statusCode = 200) => {
  try {
    const data = await action();
    return res.status(statusCode).json({
      success: true,
      message: successMessage,
      ...(data && { data }),
    });
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    return res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message,
    });
  }
};

/* ==========================================================
   MAIN
========================================================== */

export const getService = (req, res) => 
  handleRequest(res, () => service.getServiceData(), "Service fetched successfully.", "Failed to fetch Service.");

export const createService = (req, res) => 
  handleRequest(res, () => service.createServiceData(req.body), "Service created successfully.", "Failed to create Service.", 201);

export const deleteService = (req, res) => 
  handleRequest(res, () => service.deleteServiceData(), "Service deleted successfully.", "Failed to delete Service.");

/* ==========================================================
   SINGLE SECTION UPDATE
========================================================== */

export const updateHero = (req, res) => 
  handleRequest(res, () => service.updateHeroService(req.body), "Hero updated successfully.", "Failed to update Hero.");

export const updateCTA = (req, res) => 
  handleRequest(res, () => service.updateCTAService(req.body), "CTA updated successfully.", "Failed to update CTA.");

export const updateSEO = (req, res) => 
  handleRequest(res, () => service.updateSEOService(req.body), "SEO updated successfully.", "Failed to update SEO.");

/* ==========================================================
   CATEGORIES
========================================================== */
export const addCategory = (req, res) => handleRequest(res, () => service.addCategory(req.body), "Category added successfully.", "Failed to add Category.", 201);
export const updateCategory = (req, res) => handleRequest(res, () => service.updateCategory(req.params.id, req.body), "Category updated successfully.", "Failed to update Category.");
export const deleteCategory = (req, res) => handleRequest(res, () => service.deleteCategory(req.params.id), "Category deleted successfully.", "Failed to delete Category.");
export const toggleCategoryStatus = (req, res) => handleRequest(res, () => service.toggleCategoryStatus(req.params.id), "Category status updated successfully.", "Failed to update Category status.");
export const reorderCategories = (req, res) => handleRequest(res, () => service.reorderCategories(req.body.items), "Categories reordered successfully.", "Failed to reorder Categories.");

/* ==========================================================
   CARDS
========================================================== */
export const addCard = (req, res) => handleRequest(res, () => service.addCard(req.body), "Card added successfully.", "Failed to add Card.", 201);
export const updateCard = (req, res) => handleRequest(res, () => service.updateCard(req.params.id, req.body), "Card updated successfully.", "Failed to update Card.");
export const deleteCard = (req, res) => handleRequest(res, () => service.deleteCard(req.params.id), "Card deleted successfully.", "Failed to delete Card.");
export const toggleCardStatus = (req, res) => handleRequest(res, () => service.toggleCardStatus(req.params.id), "Card status updated successfully.", "Failed to update Card status.");
export const toggleCardFeatured = (req, res) => handleRequest(res, () => service.toggleCardFeatured(req.params.id), "Card featured status updated successfully.", "Failed to update Card featured status.");
export const reorderCards = (req, res) => handleRequest(res, () => service.reorderCards(req.body.items), "Cards reordered successfully.", "Failed to reorder Cards.");

/* ==========================================================
   FEATURES
========================================================== */
export const addFeature = (req, res) => handleRequest(res, () => service.addFeature(req.body), "Feature added successfully.", "Failed to add Feature.", 201);
export const updateFeature = (req, res) => handleRequest(res, () => service.updateFeature(req.params.id, req.body), "Feature updated successfully.", "Failed to update Feature.");
export const deleteFeature = (req, res) => handleRequest(res, () => service.deleteFeature(req.params.id), "Feature deleted successfully.", "Failed to delete Feature.");
export const toggleFeatureStatus = (req, res) => handleRequest(res, () => service.toggleFeatureStatus(req.params.id), "Feature status updated successfully.", "Failed to update Feature status.");
export const reorderFeatures = (req, res) => handleRequest(res, () => service.reorderFeatures(req.body.items), "Features reordered successfully.", "Failed to reorder Features.");

/* ==========================================================
   PROCESS
========================================================== */
export const addProcess = (req, res) => handleRequest(res, () => service.addProcess(req.body), "Process step added successfully.", "Failed to add Process step.", 201);
export const updateProcess = (req, res) => handleRequest(res, () => service.updateProcess(req.params.id, req.body), "Process step updated successfully.", "Failed to update Process step.");
export const deleteProcess = (req, res) => handleRequest(res, () => service.deleteProcess(req.params.id), "Process step deleted successfully.", "Failed to delete Process step.");
export const toggleProcessStatus = (req, res) => handleRequest(res, () => service.toggleProcessStatus(req.params.id), "Process status updated successfully.", "Failed to update Process status.");
export const reorderProcess = (req, res) => handleRequest(res, () => service.reorderProcess(req.body.items), "Process steps reordered successfully.", "Failed to reorder Process steps.");

/* ==========================================================
   TECHNOLOGIES
========================================================== */
export const addTechnology = (req, res) => handleRequest(res, () => service.addTechnology(req.body), "Technology added successfully.", "Failed to add Technology.", 201);
export const updateTechnology = (req, res) => handleRequest(res, () => service.updateTechnology(req.params.id, req.body), "Technology updated successfully.", "Failed to update Technology.");
export const deleteTechnology = (req, res) => handleRequest(res, () => service.deleteTechnology(req.params.id), "Technology deleted successfully.", "Failed to delete Technology.");
export const toggleTechnologyStatus = (req, res) => handleRequest(res, () => service.toggleTechnologyStatus(req.params.id), "Technology status updated successfully.", "Failed to update Technology status.");
export const reorderTechnologies = (req, res) => handleRequest(res, () => service.reorderTechnologies(req.body.items), "Technologies reordered successfully.", "Failed to reorder Technologies.");

/* ==========================================================
   WHY CHOOSE US
========================================================== */
export const addWhyChooseUs = (req, res) => handleRequest(res, () => service.addWhyChooseUs(req.body), "Why Choose Us added successfully.", "Failed to add Why Choose Us.", 201);
export const updateWhyChooseUs = (req, res) => handleRequest(res, () => service.updateWhyChooseUs(req.params.id, req.body), "Why Choose Us updated successfully.", "Failed to update Why Choose Us.");
export const deleteWhyChooseUs = (req, res) => handleRequest(res, () => service.deleteWhyChooseUs(req.params.id), "Why Choose Us deleted successfully.", "Failed to delete Why Choose Us.");
export const toggleWhyChooseUsStatus = (req, res) => handleRequest(res, () => service.toggleWhyChooseUsStatus(req.params.id), "Why Choose Us status updated successfully.", "Failed to update Why Choose Us status.");
export const reorderWhyChooseUs = (req, res) => handleRequest(res, () => service.reorderWhyChooseUs(req.body.items), "Why Choose Us reordered successfully.", "Failed to reorder Why Choose Us.");

/* ==========================================================
   STATISTICS
========================================================== */
export const addStatistic = (req, res) => handleRequest(res, () => service.addStatistic(req.body), "Statistic added successfully.", "Failed to add Statistic.", 201);
export const updateStatistic = (req, res) => handleRequest(res, () => service.updateStatistic(req.params.id, req.body), "Statistic updated successfully.", "Failed to update Statistic.");
export const deleteStatistic = (req, res) => handleRequest(res, () => service.deleteStatistic(req.params.id), "Statistic deleted successfully.", "Failed to delete Statistic.");
export const toggleStatisticStatus = (req, res) => handleRequest(res, () => service.toggleStatisticStatus(req.params.id), "Statistic status updated successfully.", "Failed to update Statistic status.");
export const reorderStatistics = (req, res) => handleRequest(res, () => service.reorderStatistics(req.body.items), "Statistics reordered successfully.", "Failed to reorder Statistics.");

/* ==========================================================
   PRICING PLANS
========================================================== */
export const addPricingPlan = (req, res) => handleRequest(res, () => service.addPricingPlan(req.body), "Pricing Plan added successfully.", "Failed to add Pricing Plan.", 201);
export const updatePricingPlan = (req, res) => handleRequest(res, () => service.updatePricingPlan(req.params.id, req.body), "Pricing Plan updated successfully.", "Failed to update Pricing Plan.");
export const deletePricingPlan = (req, res) => handleRequest(res, () => service.deletePricingPlan(req.params.id), "Pricing Plan deleted successfully.", "Failed to delete Pricing Plan.");
export const togglePricingPlanStatus = (req, res) => handleRequest(res, () => service.togglePricingPlanStatus(req.params.id), "Pricing Plan status updated successfully.", "Failed to update Pricing Plan status.");
export const reorderPricingPlans = (req, res) => handleRequest(res, () => service.reorderPricingPlans(req.body.items), "Pricing Plans reordered successfully.", "Failed to reorder Pricing Plans.");

/* ==========================================================
   FAQS
========================================================== */
export const addFaq = (req, res) => handleRequest(res, () => service.addFaq(req.body), "FAQ added successfully.", "Failed to add FAQ.", 201);
export const updateFaq = (req, res) => handleRequest(res, () => service.updateFaq(req.params.id, req.body), "FAQ updated successfully.", "Failed to update FAQ.");
export const deleteFaq = (req, res) => handleRequest(res, () => service.deleteFaq(req.params.id), "FAQ deleted successfully.", "Failed to delete FAQ.");
export const toggleFaqStatus = (req, res) => handleRequest(res, () => service.toggleFaqStatus(req.params.id), "FAQ status updated successfully.", "Failed to update FAQ status.");
export const reorderFaqs = (req, res) => handleRequest(res, () => service.reorderFaqs(req.body.items), "FAQs reordered successfully.", "Failed to reorder FAQs.");

/* ==========================================================
   SECTION SETTINGS
========================================================== */
export const updateSectionSettings = (req, res) => handleRequest(res, () => service.updateSectionSettingsService(req.params.section, req.body), "Section Settings updated successfully.", "Failed to update Section Settings.");

/* ==========================================================
   DRAFT / PUBLISH
========================================================== */
export const saveDraft = (req, res) => handleRequest(res, () => service.saveDraftService(), "Draft saved successfully.", "Failed to save draft.");
export const publishService = (req, res) => handleRequest(res, () => service.publishServiceStatus(), "Service published successfully.", "Failed to publish Service.");
export const unpublishService = (req, res) => handleRequest(res, () => service.unpublishServiceStatus(), "Service unpublished successfully.", "Failed to unpublish Service.");
import Service from './service.model.js';
export const updateEntireService = (req, res) => handleRequest(res, async () => await Service.findOneAndUpdate({}, req.body, { new: true, upsert: true }), 'Service updated.', 'Failed to update.');
