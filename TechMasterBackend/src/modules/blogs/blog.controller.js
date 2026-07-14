import { createCrud } from "../../common/crud.factory.js";
import Blog from "./blog.model.js";

// ==============================
// CRUD CONTROLLER
// ==============================

export const {
  create: createBlog,
  getAll: getAllBlogs,
  getById: getBlogById,
  update: updateBlog,
  delete: deleteBlog,
} = createCrud({
  Model: Blog,

  uploadFields: {
    coverImage: {
      folder: "blogs/images",
      multiple: false,
    },

    video: {
      folder: "blogs/videos",
      multiple: false,
    },
  },

  messages: {
    create: "Blog created successfully",

    getAll: "Blogs fetched successfully",

    getById: "Blog fetched successfully",

    update: "Blog updated successfully",

    delete: "Blog deleted successfully",
  },
});