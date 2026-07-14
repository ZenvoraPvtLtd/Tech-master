import {
  createWebsiteSettingsService,
  getWebsiteSettingsService,
  updateWebsiteSettingsService,
} from "./websiteSettings.service.js";

import { successResponse } from "../../utils/response.js";
import uploadFile from "../../utils/uploadFile.js";

// ==========================
// CREATE
// ==========================
export const createWebsiteSettings = async (req, res, next) => {
  try {
    let payload = {
      ...req.body,
    };

    // Upload Logo
    if (req.files?.logo?.length) {
      payload.logo = await uploadFile(
        req.files.logo[0].path,
        "website-settings"
      );
    }

    // Upload Favicon
    if (req.files?.favicon?.length) {
      payload.favicon = await uploadFile(
        req.files.favicon[0].path,
        "website-settings"
      );
    }

    // Upload Apple Touch Icon
    if (req.files?.appleTouchIcon?.length) {
      payload.appleTouchIcon = await uploadFile(
        req.files.appleTouchIcon[0].path,
        "website-settings"
      );
    }

    const data = await createWebsiteSettingsService(payload);

    return successResponse(
      res,
      "Website Settings created successfully.",
      data,
      201
    );
  } catch (error) {
    next(error);
  }
};

// ==========================
// GET
// ==========================
export const getWebsiteSettings = async (req, res, next) => {
  try {
    const data = await getWebsiteSettingsService();

    return successResponse(
      res,
      "Website Settings fetched successfully.",
      data
    );
  } catch (error) {
    next(error);
  }
};

// ==========================
// UPDATE
// ==========================
export const updateWebsiteSettings = async (req, res, next) => {
  try {
    let payload = {
      ...req.body,
    };

    // Upload Logo
    if (req.files?.logo?.length) {
      payload.logo = await uploadFile(
        req.files.logo[0].path,
        "website-settings"
      );
    }

    // Upload Favicon
    if (req.files?.favicon?.length) {
      payload.favicon = await uploadFile(
        req.files.favicon[0].path,
        "website-settings"
      );
    }

    // Upload Apple Touch Icon
    if (req.files?.appleTouchIcon?.length) {
      payload.appleTouchIcon = await uploadFile(
        req.files.appleTouchIcon[0].path,
        "website-settings"
      );
    }

    const data = await updateWebsiteSettingsService(payload);

    return successResponse(
      res,
      "Website Settings updated successfully.",
      data
    );
  } catch (error) {
    next(error);
  }
};