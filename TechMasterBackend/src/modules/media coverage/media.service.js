import {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from "./media.repository.js";

// Create
export const createMediaService = async (data) => {
  return await createMedia(data);
};

// Get All
export const getAllMediaService = async () => {
  return await getAllMedia();
};

// Get By ID
export const getMediaByIdService = async (id) => {
  const media = await getMediaById(id);

  if (!media) {
    throw new Error("Media not found");
  }

  return media;
};

// Update
export const updateMediaService = async (id, data) => {
  const media = await updateMedia(id, data);

  if (!media) {
    throw new Error("Media not found");
  }

  return media;
};

// Delete
export const deleteMediaService = async (id) => {
  const media = await deleteMedia(id);

  if (!media) {
    throw new Error("Media not found");
  }

  return media;
};