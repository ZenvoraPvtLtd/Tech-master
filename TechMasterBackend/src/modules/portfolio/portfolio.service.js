import {
  createPortfolio,
  getAllPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  getFeaturedPortfolioRepository,
  getPortfolioByCategoryRepository,

} from "./portfolio.repository.js";

// Create
export const createPortfolioService = async (data) => {
  return await createPortfolio(data);
};

// Get All
export const getAllPortfolioService = async () => {
  return await getAllPortfolio();
};

// Get By Id
export const getPortfolioByIdService = async (id) => {
  const portfolio = await getPortfolioById(id);

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  return portfolio;
};

// Update
export const updatePortfolioService = async (id, data) => {
  const portfolio = await updatePortfolio(id, data);

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  return portfolio;
};

// Delete
export const deletePortfolioService = async (id) => {
  const portfolio = await deletePortfolio(id);

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  return portfolio;
};

// Get Featured Portfolio
export const getFeaturedPortfolioService = async () => {
  return await getFeaturedPortfolioRepository();
};

// Get Portfolio By Category
export const getPortfolioByCategoryService = async (category) => {
  return await getPortfolioByCategoryRepository(category);
};