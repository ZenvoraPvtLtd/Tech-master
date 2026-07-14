import {
  createBlogRepository,
  getAllBlogRepository,
  getBlogByIdRepository,
  updateBlogRepository,
  deleteBlogRepository,
} from "./blog.repository.js";

import {
  createBlogValidation,
  updateBlogValidation,
} from "./blog.validation.js";

// ==============================
// Create Blog
// ==============================

export const createBlogService = async (payload) => {
  const { error, value } = createBlogValidation.validate(payload);

  if (error) throw new Error(error.details[0].message);

  return await createBlogRepository(value);
};

// ==============================
// Get All Blogs
// ==============================

export const getAllBlogService = async () => {
  return await getAllBlogRepository();
};

// ==============================
// Get Blog By ID
// ==============================

export const getBlogByIdService = async (id) => {
  const blog = await getBlogByIdRepository(id);

  if (!blog) throw new Error("Blog not found");

  return blog;
};

// ==============================
// Update Blog
// ==============================

export const updateBlogService = async (id, payload) => {
  const { error, value } = updateBlogValidation.validate(payload);

  if (error) throw new Error(error.details[0].message);

  const blog = await updateBlogRepository(id, value);

  if (!blog) throw new Error("Blog not found");

  return blog;
};

// ==============================
// Delete Blog
// ==============================

export const deleteBlogService = async (id) => {
  const blog = await deleteBlogRepository(id);

  if (!blog) throw new Error("Blog not found");

  return blog;
};