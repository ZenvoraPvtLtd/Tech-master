import Gallery from "./gallery.model.js";

// Create Gallery
export const createGallery = async (data) => {
  return await Gallery.create(data);
};

// Get All Gallery
export const getAllGallery = async () => {
  return await Gallery.find().sort({ createdAt: -1 });
};

// Get Gallery By ID
export const getGalleryById = async (id) => {
  return await Gallery.findById(id);
};

// Update Gallery
export const updateGallery = async (id, data) => {
  return await Gallery.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// Delete Gallery
export const deleteGallery = async (id) => {
  return await Gallery.findByIdAndDelete(id);
};

// Get Gallery By Portfolio
export const getGalleryByPortfolio = async (portfolioId) => {
  return await Gallery.find({
    portfolioId,
    status: true,
  }).sort({ displayOrder: 1 });
};

// Update Display Order
export const updateDisplayOrder = async (id, displayOrder) => {
  return await Gallery.findByIdAndUpdate(
    id,
    { displayOrder },
    { new: true }
  );
};

// Toggle Gallery Status
export const toggleGalleryStatus = async (id, status) => {
  return await Gallery.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};