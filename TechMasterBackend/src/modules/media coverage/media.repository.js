import Media from "./media.model.js";

// Create Media
export const createMedia = async (data) => {
  return await Media.create(data);
};

// Get All Media
export const getAllMedia = async () => {
  return await Media.find().sort({ createdAt: -1 });
};

// Get Media By ID
export const getMediaById = async (id) => {
  return await Media.findById(id);
};

// Update Media
export const updateMedia = async (id, data) => {
  return await Media.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete Media
export const deleteMedia = async (id) => {
  return await Media.findByIdAndDelete(id);
};