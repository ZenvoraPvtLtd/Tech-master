import {
  getSEORepository,
  updateSEORepository,
} from "./seo.repository.js";

// Get SEO Settings
export const getSEOService = async () => {
  return await getSEORepository();
};

// Update SEO Settings
export const updateSEOService = async (data) => {
  return await updateSEORepository(data);
};