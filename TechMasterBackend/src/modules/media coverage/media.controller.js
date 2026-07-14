import Media from "./media.model.js";
import { createCrud } from "../../common/crud.factory.js";

export const {
  create,
  getAll,
  getById,
  update,
  delete: remove,
} = createCrud({
  Model: Media,

  uploadFields: {
    thumbnail: {
      folder: "media/images",
    },
    video: {
      folder: "media/videos",
    },
  },

  messages: {
    create: "Media created successfully",
    getAll: "Media fetched successfully",
    getById: "Media fetched successfully",
    update: "Media updated successfully",
    delete: "Media deleted successfully",
  },
});