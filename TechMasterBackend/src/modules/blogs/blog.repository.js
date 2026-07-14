import { Blog } from "./blog.model.js";

// ==============================
// Create Blog
// ==============================

export const createBlogRepository = async (payload) => {
  return await Blog.create(payload);
};

// ==============================
// Get All Blogs
// ==============================

export const getAllBlogRepository = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

// ==============================
// Get Blog By ID
// ==============================

export const getBlogByIdRepository = async (id) => {
  return await Blog.findById(id);
};

// ==============================
// Update Blog
// ==============================

export const updateBlogRepository = async (id, payload) => {
  return await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

// ==============================
// Delete Blog
// ==============================

export const deleteBlogRepository = async (id) => {
  return await Blog.findByIdAndDelete(id);
};