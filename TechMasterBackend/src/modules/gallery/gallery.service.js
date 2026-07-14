import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
  getGalleryByPortfolio,
  updateDisplayOrder,
  toggleGalleryStatus,
} from "./gallery.repository.js";

// Create Gallery
export const createGalleryService = async (data) => {
  return await createGallery(data);
};

// Get All Gallery
export const getAllGalleryService = async () => {
  return await getAllGallery();
};

// Get Gallery By ID
export const getGalleryByIdService = async (id) => {
  const gallery = await getGalleryById(id);

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  return gallery;
};

// Update Gallery
export const updateGalleryService = async (id, data) => {
  const gallery = await updateGallery(id, data);

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  return gallery;
};

// Delete Gallery
export const deleteGalleryService = async (id) => {
  const gallery = await deleteGallery(id);

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  return gallery;
};

// Get Gallery By Portfolio
export const getGalleryByPortfolioService = async (portfolioId) => {
  return await getGalleryByPortfolio(portfolioId);
};

// Update Display Order
export const updateDisplayOrderService = async (id, displayOrder) => {
  const gallery = await updateDisplayOrder(id, displayOrder);

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  return gallery;
};

// Toggle Gallery Status
export const toggleGalleryStatusService = async (id, status) => {
  const gallery = await toggleGalleryStatus(id, status);

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  return gallery;
};