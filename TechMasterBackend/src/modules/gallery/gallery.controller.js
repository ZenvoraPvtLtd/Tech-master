import { createCrud } from "../../common/crud.factory.js";
// import { Gallery } from "./gallery.model.js";
import Gallery from "./gallery.model.js";

import {
  getGalleryByPortfolioService,
  updateDisplayOrderService,
  toggleGalleryStatusService,
} from "./gallery.service.js";

import { successResponse } from "../../utils/response.js";

// ==============================
// COMMON CRUD
// ==============================

export const {
  create: createGallery,
  getAll: getAllGallery,
  getById: getGalleryById,
  update: updateGallery,
  delete: deleteGallery,
} = createCrud({
  Model: Gallery,

  uploadFields: {
    image: {
      folder: "gallery/images",
      multiple: false,
    },

    video: {
      folder: "gallery/videos",
      multiple: false,
    },
  },

  messages: {
    create: "Gallery created successfully",
    getAll: "Gallery fetched successfully",
    getById: "Gallery fetched successfully",
    update: "Gallery updated successfully",
    delete: "Gallery deleted successfully",
  },
});

// ==========================
// Get Gallery By Portfolio
// ==========================

export const getGalleryByPortfolio = async (req, res, next) => {
  try {
    const data = await getGalleryByPortfolioService(
      req.params.portfolioId
    );

    return successResponse(
      res,
      "Gallery fetched successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};

// ==========================
// Update Display Order
// ==========================

export const updateDisplayOrder = async (req, res, next) => {
  try {
    const data = await updateDisplayOrderService(
      req.params.id,
      req.body.displayOrder
    );

    return successResponse(
      res,
      "Gallery display order updated successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};

// ==========================
// Toggle Gallery Status
// ==========================

export const toggleGalleryStatus = async (req, res, next) => {
  try {
    const data = await toggleGalleryStatusService(
      req.params.id,
      req.body.status
    );

    return successResponse(
      res,
      "Gallery status updated successfully",
      data
    );
  } catch (error) {
    next(error);
  }
};