import * as repository from "./service.repository.js";

/* ===========================================================
   MAIN
=========================================================== */

export const getServiceData = async () => {
  let data = await repository.findService();
  if (!data) {
    data = await repository.createService({});
  }
  return data;
};

export const createServiceData = async (payload) => {
  const exists = await repository.findService();
  if (exists) {
    throw new Error("Service data already exists.");
  }
  return await repository.createService(payload);
};

export const deleteServiceData = async () => {
  const data = await repository.findService();
  if (!data) {
    throw new Error("Service data not found.");
  }
  await repository.deleteService(data._id);
  return true;
};

/* ===========================================================
   SINGLE SECTION UPDATE
=========================================================== */

export const updateHeroService = async (payload) => {
  return await repository.updateHero(payload);
};

export const updateCTAService = async (payload) => {
  return await repository.updateCTA(payload);
};

export const updateSEOService = async (payload) => {
  return await repository.updateSEO(payload);
};

/* ===========================================================
   ARRAY HELPERS
=========================================================== */

const addItemToArray = async (arrayName, payload) => {
  const doc = await repository.getDocument();
  if (!doc) throw new Error("Service not found.");
  doc[arrayName].push(payload);
  await repository.saveDocument(doc);
  return doc[arrayName];
};

const updateItemInArray = async (arrayName, id, payload) => {
  const doc = await repository.getDocument();
  if (!doc) throw new Error("Service not found.");
  const item = doc[arrayName].id(id);
  if (!item) throw new Error(`Item not found in ${arrayName}.`);
  Object.assign(item, payload);
  await repository.saveDocument(doc);
  return item;
};

const deleteItemFromArray = async (arrayName, id) => {
  const doc = await repository.getDocument();
  if (!doc) throw new Error("Service not found.");
  const item = doc[arrayName].id(id);
  if (!item) throw new Error(`Item not found in ${arrayName}.`);
  item.deleteOne();
  await repository.saveDocument(doc);
  return true;
};

const toggleItemStatusInArray = async (arrayName, id) => {
  const doc = await repository.getDocument();
  if (!doc) throw new Error("Service not found.");
  const item = doc[arrayName].id(id);
  if (!item) throw new Error(`Item not found in ${arrayName}.`);
  item.status = item.status === "Active" ? "Inactive" : "Active";
  await repository.saveDocument(doc);
  return item;
};

const reorderArrayItems = async (arrayName, itemsArray) => {
  if (!Array.isArray(itemsArray)) throw new Error("Items array is required.");
  const doc = await repository.getDocument();
  if (!doc) throw new Error("Service not found.");
  
  itemsArray.forEach((reqItem, index) => {
    const item = doc[arrayName].id(reqItem.id);
    if (item) {
      item.order = index + 1;
    }
  });
  doc[arrayName].sort((a, b) => a.order - b.order);
  await repository.saveDocument(doc);
  return doc[arrayName];
};

const toggleItemFeaturedInArray = async (arrayName, id) => {
  const doc = await repository.getDocument();
  if (!doc) throw new Error("Service not found.");
  const item = doc[arrayName].id(id);
  if (!item) throw new Error(`Item not found in ${arrayName}.`);
  item.isFeatured = !item.isFeatured;
  await repository.saveDocument(doc);
  return item;
};

/* ===========================================================
   CATEGORIES
=========================================================== */
export const addCategory = (payload) => addItemToArray("categories", payload);
export const updateCategory = (id, payload) => updateItemInArray("categories", id, payload);
export const deleteCategory = (id) => deleteItemFromArray("categories", id);
export const toggleCategoryStatus = (id) => toggleItemStatusInArray("categories", id);
export const reorderCategories = (items) => reorderArrayItems("categories", items);

/* ===========================================================
   CARDS
=========================================================== */
export const addCard = (payload) => addItemToArray("cards", payload);
export const updateCard = (id, payload) => updateItemInArray("cards", id, payload);
export const deleteCard = (id) => deleteItemFromArray("cards", id);
export const toggleCardStatus = (id) => toggleItemStatusInArray("cards", id);
export const toggleCardFeatured = (id) => toggleItemFeaturedInArray("cards", id);
export const reorderCards = (items) => reorderArrayItems("cards", items);

/* ===========================================================
   FEATURES
=========================================================== */
export const addFeature = (payload) => addItemToArray("features", payload);
export const updateFeature = (id, payload) => updateItemInArray("features", id, payload);
export const deleteFeature = (id) => deleteItemFromArray("features", id);
export const toggleFeatureStatus = (id) => toggleItemStatusInArray("features", id);
export const reorderFeatures = (items) => reorderArrayItems("features", items);

/* ===========================================================
   PROCESS
=========================================================== */
export const addProcess = (payload) => addItemToArray("process", payload);
export const updateProcess = (id, payload) => updateItemInArray("process", id, payload);
export const deleteProcess = (id) => deleteItemFromArray("process", id);
export const toggleProcessStatus = (id) => toggleItemStatusInArray("process", id);
export const reorderProcess = (items) => reorderArrayItems("process", items);

/* ===========================================================
   TECHNOLOGIES
=========================================================== */
export const addTechnology = (payload) => addItemToArray("technologies", payload);
export const updateTechnology = (id, payload) => updateItemInArray("technologies", id, payload);
export const deleteTechnology = (id) => deleteItemFromArray("technologies", id);
export const toggleTechnologyStatus = (id) => toggleItemStatusInArray("technologies", id);
export const reorderTechnologies = (items) => reorderArrayItems("technologies", items);

/* ===========================================================
   WHY CHOOSE US
=========================================================== */
export const addWhyChooseUs = (payload) => addItemToArray("whyChooseUs", payload);
export const updateWhyChooseUs = (id, payload) => updateItemInArray("whyChooseUs", id, payload);
export const deleteWhyChooseUs = (id) => deleteItemFromArray("whyChooseUs", id);
export const toggleWhyChooseUsStatus = (id) => toggleItemStatusInArray("whyChooseUs", id);
export const reorderWhyChooseUs = (items) => reorderArrayItems("whyChooseUs", items);

/* ===========================================================
   STATISTICS
=========================================================== */
export const addStatistic = (payload) => addItemToArray("statistics", payload);
export const updateStatistic = (id, payload) => updateItemInArray("statistics", id, payload);
export const deleteStatistic = (id) => deleteItemFromArray("statistics", id);
export const toggleStatisticStatus = (id) => toggleItemStatusInArray("statistics", id);
export const reorderStatistics = (items) => reorderArrayItems("statistics", items);

/* ===========================================================
   PRICING PLANS
=========================================================== */
export const addPricingPlan = (payload) => addItemToArray("pricingPlans", payload);
export const updatePricingPlan = (id, payload) => updateItemInArray("pricingPlans", id, payload);
export const deletePricingPlan = (id) => deleteItemFromArray("pricingPlans", id);
export const togglePricingPlanStatus = (id) => toggleItemStatusInArray("pricingPlans", id);
export const reorderPricingPlans = (items) => reorderArrayItems("pricingPlans", items);

/* ===========================================================
   FAQS
=========================================================== */
export const addFaq = (payload) => addItemToArray("faqs", payload);
export const updateFaq = (id, payload) => updateItemInArray("faqs", id, payload);
export const deleteFaq = (id) => deleteItemFromArray("faqs", id);
export const toggleFaqStatus = (id) => toggleItemStatusInArray("faqs", id);
export const reorderFaqs = (items) => reorderArrayItems("faqs", items);

/* ===========================================================
   SECTION SETTINGS
=========================================================== */
export const updateSectionSettingsService = async (section, payload) => {
  return await repository.updateSectionSettings(section, payload);
};

/* ===========================================================
   DRAFT / PUBLISH
=========================================================== */
export const saveDraftService = async () => {
  return await repository.saveDraft();
};

export const publishServiceStatus = async () => {
  return await repository.publishService();
};

export const unpublishServiceStatus = async () => {
  return await repository.unpublishService();
};
