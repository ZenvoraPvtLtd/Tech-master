import {
  getSEOService,
  updateSEOService,
} from "./seo.service.js";

import { updateSEOValidation } from "./seo.validation.js";

// Get SEO Settings
export const getSEO = async (req, res, next) => {
  try {
    const seo = await getSEOService();

    return res.status(200).json({
      success: true,
      message: "SEO settings fetched successfully.",
      data: seo,
    });
  } catch (error) {
    next(error);
  }
};

// Update SEO Settings
export const updateSEO = async (req, res, next) => {
  try {
    // Validation removed for bypass

    const seo = await updateSEOService(req.body);

    return res.status(200).json({
      success: true,
      message: "SEO settings updated successfully.",
      data: seo,
    });
  } catch (error) {
    next(error);
  }
};