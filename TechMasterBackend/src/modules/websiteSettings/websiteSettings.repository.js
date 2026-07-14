import WebsiteSettings from "./websiteSettings.model.js";

// ==========================
// CREATE
// ==========================
export const createWebsiteSettingsRepository = async (data) => {
  return await WebsiteSettings.create(data);
};

// ==========================
// GET
// ==========================
export const getWebsiteSettingsRepository = async () => {
  return await WebsiteSettings.findOne();
};

// ==========================
// UPDATE
// ==========================
export const updateWebsiteSettingsRepository = async (data) => {
  return await WebsiteSettings.findOneAndUpdate(
    {},
    data,
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
};