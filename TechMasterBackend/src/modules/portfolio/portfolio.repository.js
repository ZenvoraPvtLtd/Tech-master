import Portfolio from "./portfolio.model.js";
import createSlug from "../../utils/slugify.js";

// Create
export const createPortfolio = async (data) => {
  data.slug = createSlug(data.title);

  return await Portfolio.create(data);
};

// Get All
export const getAllPortfolio = async () => {
  return await Portfolio.find().sort({ createdAt: -1 });
};

// Get By Id
export const getPortfolioById = async (id) => {
  return await Portfolio.findById(id);
};

// Update
export const updatePortfolio = async (id, data) => {
  if (data.title) {
    data.slug = createSlug(data.title);
  }

  return await Portfolio.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete
export const deletePortfolio = async (id) => {
  return await Portfolio.findByIdAndDelete(id);
};

// Get Featured Portfolio
export const getFeaturedPortfolioRepository = async () => {
  return await Portfolio.find({
    featured: true,
    status: true,
  }).sort({ createdAt: -1 });
};

// Get Portfolio By Category
export const getPortfolioByCategoryRepository = async (category) => {
  return await Portfolio.find({
    category,
    status: true,
  }).sort({ createdAt: -1 });
};