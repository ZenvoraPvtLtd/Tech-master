import Portfolio from "./portfolio.model.js";
import { createCrud } from "../../common/crud.factory.js";

import {
  getFeaturedPortfolioService,
  getPortfolioByCategoryService,
} from "./portfolio.service.js";

import { successResponse } from "../../utils/response.js";


// ==========================
// Common CRUD
// ==========================

export const {
  create,
  getAll,
  getById,
  update,
  delete: remove,
} = createCrud({

  Model: Portfolio,

  uploadFields: {

    thumbnail: {
      folder: "portfolio/images",
    },

    images: {
      folder: "portfolio/images",
      multiple: true,
    },

    video: {
      folder: "portfolio/videos",
    },

  },

  messages: {

    create: "Portfolio created successfully",

    getAll:
      "Portfolio fetched successfully",

    getById:
      "Portfolio fetched successfully",

    update:
      "Portfolio updated successfully",

    delete:
      "Portfolio deleted successfully",

  },

});



// ==========================
// Get Featured Portfolio
// ==========================

export const getFeaturedPortfolio = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await getFeaturedPortfolioService();


    return successResponse(
      res,
      "Featured Portfolio fetched successfully",
      data
    );


  } catch(error){

    next(error);

  }

};




// ==========================
// Get Portfolio By Category
// ==========================

export const getPortfolioByCategory = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await getPortfolioByCategoryService(
        req.params.category
      );


    return successResponse(
      res,
      "Portfolio category fetched successfully",
      data
    );


  } catch(error){

    next(error);

  }

};