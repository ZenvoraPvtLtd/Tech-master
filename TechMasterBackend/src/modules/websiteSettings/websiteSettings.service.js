import {
  createWebsiteSettingsRepository,
  getWebsiteSettingsRepository,
  updateWebsiteSettingsRepository,
} from "./websiteSettings.repository.js";

import { websiteSettingsValidation } from "./websiteSettings.validation.js";

// ==========================
// CREATE
// ==========================
export const createWebsiteSettingsService = async (data) => {
  const { error } = websiteSettingsValidation.validate(data);

  if (error) {
    throw new Error(error.details[0].message);
  }

  // Sirf ek hi document allow hoga
  const existing = await getWebsiteSettingsRepository();

  if (existing) {
    throw new Error("Website Settings already exist.");
  }

  return await createWebsiteSettingsRepository(data);
};

// ==========================
// GET
// ==========================
export const getWebsiteSettingsService = async () => {
  return await getWebsiteSettingsRepository();
};

// ==========================
// UPDATE
// ==========================
export const updateWebsiteSettingsService = async (data) => {
  const { error } = websiteSettingsValidation.validate(data);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const existing = await getWebsiteSettingsRepository();

  // Agar document nahi hai to create kar do
  if (!existing) {
    return await createWebsiteSettingsRepository(data);
  }

  // Warna update karo
  return await updateWebsiteSettingsRepository(data);
};